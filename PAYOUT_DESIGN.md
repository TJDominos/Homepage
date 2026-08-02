# Payout 页面 — 需求评估与设计说明

> 背景：移动端 History 页按「游戏 × 批次」展示，非 batch 游戏（如 Keno）落入
> 整页空态（"No batch information available" + "Batch data unavailable"）。
> 计划将 History 升级为站点级 **Payout 汇总页**，并增加个人视角收益率。
> 本仓库 = 原站桌面端完整代码 + 已接入 `/payout` 路由的 Payout 页面；
> 除 Payout 页内容外，其余代码与原站导出保持一致（差异清单见 README）。

## 一、需求评估结论

**方向成立。** 汇总表让用户一屏看全站，消灭了「逐个游戏翻空页」的负体验；
非 batch / 无数据的游戏在表中只是某几列显示 `–`，行不消失。公开 RTP 与派彩
数据是 provably-fair 定位的信任基建。新版桌面站已预留 payout 路由、导航与
SEO（`prerender.js` 中 `/payout` 已配置），本页只是补上页面本体。

原方案（附图2 的表格）有四处修正：

| 问题 | 修正 |
| --- | --- |
| 两列同名 "Actual Payout"（$ 与 %） | 拆分为 **Actual RTP（%）** 与 **Paid Out（$）**，与 Theoretical RTP 构成「期望 vs 实际」对照 |
| 币种混排（$ / ICP / Gcoin） | 全站统一 **USD 主显 + 原币种小字副显**（"$4,515.70 / 150 ICP"） |
| 小样本误导（如 Lucky Nickel 批次 148.08% 只卖出 26 票） | 表格只展示**全生命周期**口径（批次口径留在游戏内页）；plays < 1000 追加 "low volume" 标注；Actual RTP 列头挂 tooltip 说明波动 |
| 个人收益率的劝退风险（多数玩家长期 < 100%） | 登录后才显示；「My RTP」列 + 顶部个人汇总卡（投入/赢取/净盈亏）成套呈现；未玩过的游戏显示 `–`。透明化本身也是负责任博彩的加分项 |

另外：Payout 是站点级公示页，**个人票据历史不能因 History 改名而消失**——
需确认 Money → Record 覆盖个人投注记录，否则要补入口。

## 二、页面结构（自上而下）

**内容边界原则**（2026-07 精简决策）：Payout 页只承载三件事——
站点级透明度数字、个人收益率、去玩的入口。**游戏内已有的数据不在此
重复**（批次详情、玩法说明、每游戏近期中奖都归游戏自己的页面）；
**中奖类内容语义上归 Rank 页**（见文末「Rank 承接建议」）。

1. **Hero 汇总条**（吸引力核心）
   - Total paid out to players：全页唯一 hero 数字（count-up 动画、金币金图标）；
   - Live jackpot pool：聚合各游戏奖池，标注覆盖游戏数；
   - Site-wide actual RTP：与加权理论值并排，作信任锚点。
2. **个人区**
   - 登录：紫渐变「My payout stats」卡（对标 Rank 页 You 卡）：总投入 / 总赢取 / 整体 RTP + 净盈亏；
   - 未登录：一行 Sign-in 引导条（锁形图标 + 黑色主按钮）。
3. **游戏汇总表**（核心，纯平表、无展开）
   - 列：Game（logo + 名称 + Batch draw / Instant 标签）｜Live Jackpot（金币图标，无则 `–`）｜
     Theoretical RTP｜Actual RTP（无注单显示 `–` + "no plays yet"）｜Total Plays｜
     Paid Out｜My RTP（仅登录）｜行尾紫色 tonal **Play 小按钮**直达游戏。
   - 数值旁不加派生小字（±pp vs theo、净盈亏等已按产品决策移除，2026-07）；
     RTP 波动性的解释统一放在列头 tooltip 与页脚口径说明。
   - 列头可排序（默认 Jackpot 降序，空值恒排最后）；RTP 两列挂术语 tooltip；
     数字右对齐 + `tabular-nums`。
4. **Smallprint**：口径说明（USD 等值、Actual vs Theoretical、provably fair 可验证）。

**已删减的内容及去向**：Latest wins ticker、每游戏 Recent winners →
Rank 页承接；行内展开的批次详情网格、玩法一句话 → 游戏自己的页面
（原 History 卡内容本就来自游戏内）。删减同时简化了契约：payout 接口
不再需要 Batch Config 与 winner 数据。

## 三、视觉与规范（RS 设计系统落地）

页面样式**全部走 RS 设计系统的 tokens 与组件**，零硬编码值：

- **接入方式**：`src/styles/rs/` 下是设计系统构建产物的逐字拷贝
  （`dist/tokens.css` + `src/css/button.css` + `src/css/refresh.css`），
  `src/styles/payout.css` 在其上定义页面级类（全部引用 token），由
  `PayoutPage.tsx` 导入；颜色类一律通过 Tailwind v4 的 `text-(--token)` /
  `bg-(--token)` 变量简写引用 token。站点外壳不受影响（无类名冲突，
  `index.css` 保持原版）。
- **直接使用的 RS 组件**：`.btn .btn--solid`（Sign in 主按钮）、
  `.btn--solid.btn--accent`（Play CTA——RS 规范的紫色按钮是 tonal：紫 50 底
  + 紫 600 字，系统中不存在紫底白字变体）、`.refresh`（数据刷新控件，
  `refresh--busy` 常转表示加载中）。
- **token 映射**：强调紫 `--text-accent`/`--bg-subtle`；金币金 `--color-coin`
  （仅图标点缀，不作正文色以保 AA）；表面 = 白底 + `--color-black-alpha-10`
  发丝边 + `--radius-lg`(12px) + `--shadow-dropdown`；表头 `--color-neutral-100`；
  行 hover `--select-option-hover-bg`；展开面板 `--color-neutral-50`；
  tooltip 复用 toast 表面 token（`--toast-bg`/`--toast-text` + `--shadow-popover`）；
  chips 按 token 注释用 `--radius-sm`(4px)；头像尺寸 `--size-avatar-sm/lg/xl`。
- **文字层级**：主 `--text-primary` → 次 `--text-subtle`(65%) →
  三级 `--color-black-alpha-50` → 空值/禁用 `--text-disabled`；
  字号走 token 刻度（xs/sm/md/2xl/3xl/4xl；标题 3xl=32px 由
  `.payout-title` 定义，Tailwind 的 text-3xl 与 RS 刻度不同故不用）。
- **焦点可见**：排序/展开等自定义交互元素补 `--focus-ring` 紫色
  `:focus-visible` 外圈（RS 组件自带）。
- **有意保留的站点适配**（两处，均有注释）：字体族继承站点
  `--app-font-family`（覆盖 RS 组件的 system-ui 栈，保证与外壳一致）；
  页面背景沿用站点薰衣草渐变（外壳资产，非页面样式）。
- 偏差标注（±pp vs theo）用中性墨色 + 方向箭头，不用红绿——避免「低于理论=坏」
  的误读，也不依赖颜色传达方向（无障碍）。
- 动效尊重 `prefers-reduced-motion`（count-up 直达终值、ticker 停走、
  refresh 停转——后者由 RS 组件自带）。

## 四、数据契约（真实接口需提供）

见 `src/api/payoutMock.ts` 的 TypeScript 接口：

- `GamePayoutStats`：gameId/name/logo/kind(batch|instant)/ticketPriceUsd/
  jackpotUsd(+jackpotNative)/theoreticalRtp/actualRtp(null=无数据)/totalPlays/
  totalPaidOutUsd。**不含批次详情与 winner 数据**——批次归游戏内页，
  中奖内容归 Rank，payout 接口只需上表聚合值。
- `MyPayoutSummary`：plays/wageredUsd/wonUsd + 每游戏 `MyGameStats`
  （My RTP = wonUsd ÷ wageredUsd，前端推导）。
- 口径约定：全部为**全生命周期**聚合（周期切换为可选增强）。

## 五、后台字段对齐（2026-07 测试环境盘点）

对照各游戏管理后台（Roulette / Keno / Fruits Garden / Quick Quid Batch
Config / Mines）做的**字段盘点**。范围约定：测试环境数值的正确性/真实性
一律不在关注范围（全部游戏同理）——本节只回答「后台有哪些字段、公示页
用哪些、怎么映射」。

**契约字段映射**（真实接口按此接线，代码注释同步在 `payoutMock.ts` 顶部）：

| Payout 页字段 | 管理后台字段 |
| --- | --- |
| `totalPlays` | 注单/Record 数（**不是 Rounds**——Roulette 存在 0 票的空轮） |
| `actualRtp` | Payout ÷ Wagers（与后台 Actual RTP 同口径，已逐一对账） |
| `kind` | 有 Batch Config 的产品 = batch，其余 = instant（仅驱动类型标签） |

> Batch Config 各字段（Total Draw / Draw Count / Single Payout / Actual
> Payout / Win Rate / Auto Start Next / Start·End Time）与 winner 明细
> 属于**游戏内页 / Rank** 的数据面，payout 接口不需要下发。

**已按后台事实修正 mock 与页面**：Keno 实为 instant（逐注 VRF）且以
Bonus 结算——不再按「batch 未开」建模；Quick Quid 实为 batch 游戏；
Actual RTP 列在 plays < 1000 时追加 "low volume" 标注（小样本下实际值
天然大幅波动，公示时必须带该语境）。

**后台有、公示页有意不展示的字段**（接口无需下发给公开端）：

- Net Profit / Profit（平台盈亏视角，玩家页面绝不展示）；
- Pending / Processed Payout Errors、Sessions、Backfill 等运维数据；
- Canister ID、Status、config 内部参数（fee bps、multiplier
  threshold/hard cap、session timeout、min/max bet——后两者若做「玩法
  说明」可放游戏详情页，不属于 payout 汇总）；
- 玩家 principal（公示用 username + 头像，经 user 表映射，同 Rank 页）；
- Game Records 明细（公示只取 recentWinners 摘要；`VRF Seed Index`
  字段留作后续 provably-fair 验证链接的素材，见 §六）。

**契约层仍需与后端确认的语义（与数值无关）**：

1. **Bonus 币种口径**：Keno / Fruits Garden 以 Bonus（促销币）结算，
   全站 USD 汇总需要 Gcoin/Bonus/ICP 的换算率来源；以及 Bonus 局是否
   计入公开 RTP（建议仅真钱游戏，或分区/加注说明）。
2. **plays 语义**：统一为注单/Record 数（后台 Rounds 含 0 票空轮，
   不能直接当 plays 用）；建议接口直接下发注单数。
3. **周期维度**：公示接口每游戏统一提供
   `{wagers, payout, plays, actualRtp} × {alltime, today, 7d, 30d}`
   （后台 Keno 已有四周期卡、Roulette 有周期 tab，Mines Dashboard 目前
   只有 alltime——字段需补齐），周期一律 UTC 并在前台标注。
4. **展示精度**：公示页金额 2 位小数、RTP 2 位小数（后台 Avg. Bet 的
   6-8 位小数仅内部使用）。

## 六、后续可选增强

- Jackpot 数值 WebSocket/轮询实时跳动（复用 `useWltPrice` 的 5min interval 模式）；
- 时间范围切换（7d / 30d / All）——需要后端按窗口聚合；
- My RTP 列头点击排序已支持，可加「只看我玩过的」过滤；
- 移动端进一步收敛列（当前 <768px 隐藏 Theoretical/Plays/Paid Out，可再优化）。

## 七、Rank 承接建议（主站实施；本仓库 RanksPage 保持原版未动）

从 Payout 页删减下来的中奖类内容，语义上都属于 Rank：

1. **全站 Latest wins ticker**：放 Rank 页排行榜上方（组件此前已在
   payout 实现过，样式为 token 化胶囊滚动条，可从 git 历史
   `307751f` 直接取回移植）；
2. **每游戏中奖榜**：Rank 页现有 Bonus/WLT/Gcoin 子 tab + 时间筛选，
   再加一个「按游戏」筛选即可承接原 Winner Board 的逐游戏视角；
3. **Winner 头像弹窗**：`WinnerPopoverContent` 组件主站已有，配合
   上述两处使用。

## 八、当前渲染

| 状态 | 截图 |
| --- | --- |
| 登录态默认（真实站点外壳） | `docs/screenshots/payout-desktop.png` |
| 未登录态 | `docs/screenshots/payout-desktop-signedout.png` |
| 移动端（原版 TabSwitch 底栏） | `docs/screenshots/payout-mobile.png` |
| 行展开 · 桌面（对齐 Live Jackpot / Paid Out 列） | `docs/screenshots/payout-row-expanded.png` |
| 行展开 · 平板 820px（全列可见，同桌面对齐） | `docs/screenshots/payout-tablet-expanded.png` |
| 行展开 · 移动端（列不全：两组两端对齐填满面板，组内标签与美元总额左对齐为组头、各币种金额右对齐成数字脊柱；无奖池游戏只显示 Paid Out） | `docs/screenshots/payout-mobile-expanded.png` |
| 个人卡片展开 | `docs/screenshots/payout-mycard-expanded.png` |

> 截图在无 SF Pro / Segoe UI 字体的容器中拍摄，标题回退为衬线字体；
> 原站字体栈未改动，真实设备上渲染为无衬线。
