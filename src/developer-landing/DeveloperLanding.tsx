import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  CircleDollarSign,
  CloudUpload,
  Code2,
  Compass,
  Gamepad2,
  Gauge,
  Gift,
  Layers3,
  MessageCircleMore,
  MousePointer2,
  Network,
  Play,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wallet,
  WalletCards,
  Zap,
} from "lucide-react";
import Footer from "../components/Footer";
import { WalletConnectModal } from "../components/WalletConnectModal";
import "./DeveloperLanding.css";

const PUBLISH_URL =
  "mailto:support@randseed.org?subject=Publish%20a%20game%20on%20RandSeed";

function RandseedMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      role="img"
      aria-label="RandSeed"
    >
      <path
        fill="#f68532"
        d="M50 42C42 31 25 26 25 11c0-8 6-11 12-11 7 0 11 5 13 10 2-5 6-10 13-10 6 0 12 3 12 11 0 15-17 20-25 31Z"
      />
      <path
        fill="#39aaa1"
        d="M58 50c11-8 16-25 31-25 8 0 11 6 11 12 0 7-5 11-10 13 5 2 10 6 10 13 0 6-3 12-11 12-15 0-20-17-31-25Z"
      />
      <path
        fill="#2878c7"
        d="M50 58c8 11 25 16 25 31 0 8-6 11-12 11-7 0-11-5-13-10-2 5-6 10-13 10-6 0-12-3-12-11 0-15 17-20 25-31Z"
      />
      <path
        fill="#61369a"
        d="M42 50c-11 8-16 25-31 25C3 75 0 69 0 63c0-7 5-11 10-13-5-2-10-6-10-13 0-6 3-12 11-12 15 0 20 17 31 25Z"
      />
      <circle cx="50" cy="50" r="10" fill="#09090b" />
    </svg>
  );
}

const heroGames = [
  { title: "Neon Dash", genre: "Arcade", tone: "violet", icon: Zap },
  { title: "Lucky Drop", genre: "Chance", tone: "orange", icon: Gift },
  { title: "Grid Run", genre: "Puzzle", tone: "cyan", icon: Gamepad2 },
  { title: "Crown Clash", genre: "Strategy", tone: "blue", icon: Trophy },
  { title: "Orbit", genre: "Skill", tone: "lime", icon: MousePointer2 },
];

function HeroGameDeck() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % heroGames.length),
      2600,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-game-stage" aria-label="Featured game previews">
      <div className="hero-stage-glow" />
      {heroGames.map((game, index) => {
        const position =
          (index - activeIndex + heroGames.length) % heroGames.length;
        const Icon = game.icon;
        return (
          <article
            className={`hero-game-card hero-game-card--${position} game-art--${game.tone}`}
            key={game.title}
            aria-hidden={position > 2}
          >
            <div className="game-art-grid" />
            <div className="game-art-orbit" />
            <div className="game-art-icon">
              <Icon aria-hidden="true" />
            </div>
            <div className="game-card-shine" />
            <div className="game-card-meta">
              <span>{game.genre}</span>
              <h3>{game.title}</h3>
            </div>
            {position === 0 && (
              <div className="game-playing-badge">
                <span />
                Live preview
              </div>
            )}
          </article>
        );
      })}
      <div className="hero-deck-dots" aria-hidden="true">
        {heroGames.map((game, index) => (
          <span
            key={game.title}
            className={index === activeIndex ? "is-active" : ""}
          />
        ))}
      </div>
    </div>
  );
}

const discoveryFeatures = [
  {
    icon: Compass,
    title: "Discovery feed",
    text: "Help players find your game alongside titles they already enjoy.",
  },
  {
    icon: Users,
    title: "Community events",
    text: "Join game jams, seasonal campaigns, and community spotlights.",
  },
  {
    icon: Network,
    title: "Cross-game discovery",
    text: "Stay discoverable as players explore new experiences on RandSeed.",
  },
];

const earningFeatures = [
  {
    icon: BadgeDollarSign,
    title: "Launch bounties",
    text: "Earn WLT rewards when eligible games launch and meet platform quality requirements.",
  },
  {
    icon: WalletCards,
    title: "Player-powered revenue",
    text: "Let players support your work through tips, purchases, and participation.",
  },
  {
    icon: CircleDollarSign,
    title: "Transparent reward pools",
    text: "Join on-chain reward pools with rules and payouts anyone can verify.",
  },
];

const showcaseGames = [
  { title: "Neon Dash", genre: "Arcade", tone: "violet", icon: Zap },
  { title: "Lucky Drop", genre: "Chance", tone: "orange", icon: Gift },
  { title: "Grid Run", genre: "Puzzle", tone: "cyan", icon: Gamepad2 },
  { title: "Crown Clash", genre: "Strategy", tone: "blue", icon: Trophy },
  { title: "Orbit", genre: "Skill", tone: "lime", icon: MousePointer2 },
  { title: "Vault 9", genre: "Adventure", tone: "rose", icon: Layers3 },
];

export default function DeveloperLanding() {
  const [isWalletConnectModalOpen, setWalletConnectModalOpen] = useState(false);
  const [signedInAccount, setSignedInAccount] = useState<string | null>(null);
  const signInButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Build on RandSeed — Launch, Grow & Earn";
    document.documentElement.classList.add("developer-landing-active");
    return () => {
      document.title = previousTitle;
      document.documentElement.classList.remove("developer-landing-active");
    };
  }, []);

  return (
    <div className="developer-landing">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="landing-nav">
        <div className="landing-container landing-nav__inner">
          <a className="landing-brand" href="/" aria-label="RandSeed home">
            <RandseedMark className="landing-brand__mark" />
            <span>RandSeed</span>
          </a>
          <nav className="landing-nav__links" aria-label="Primary navigation">
            <a href="#grow">Grow</a>
            <a href="#earn">Earn</a>
            <a href="#technology">Technology</a>
          </nav>
          <button
            ref={signInButtonRef}
            className="landing-nav__cta"
            type="button"
            onClick={() => setWalletConnectModalOpen(true)}
          >
            <Wallet aria-hidden="true" />
            {signedInAccount ? "Signed In" : "Sign In"}
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="landing-hero">
          <div className="landing-hero__shape landing-hero__shape--one" />
          <div className="landing-hero__shape landing-hero__shape--two" />
          <div className="landing-container landing-hero__grid">
            <div className="landing-hero__copy">
              <p className="landing-eyebrow">
                <span />
                The launchpad for web games
              </p>
              <h1>
                Launch your game.
                <br />
                <em>Grow your audience.</em>
              </h1>
              <p className="landing-hero__lede">
                Publish faster, reach real players, and earn through
                transparent, player-powered rewards—without SDK integrations,
                custom payment infrastructure, or intrusive ads.
              </p>
              <div className="landing-actions">
                <a className="button button--primary" href={PUBLISH_URL}>
                  Publish Your Game
                  <ArrowRight aria-hidden="true" />
                </a>
              </div>
              <div className="landing-hero__proof" aria-label="Key benefits">
                <span>
                  <Check aria-hidden="true" /> Zero SDK
                </span>
                <span>
                  <Check aria-hidden="true" /> Fast review
                </span>
                <span>
                  <Check aria-hidden="true" /> Free player feedback
                </span>
              </div>
            </div>
            <HeroGameDeck />
          </div>
        </section>

        <section className="capability-strip" aria-label="Platform capabilities">
          <div className="landing-container capability-strip__grid">
            <div>
              <strong>0</strong>
              <span>SDK dependencies</span>
            </div>
            <div>
              <strong>Fast</strong>
              <span>from upload to review</span>
            </div>
            <div>
              <strong>VRF</strong>
              <span>verifiable randomness</span>
            </div>
            <div>
              <strong>No ads</strong>
              <span>required to monetize</span>
            </div>
          </div>
        </section>

        <section className="landing-section landing-section--light" id="grow">
          <div className="landing-container">
            <div className="section-heading section-heading--center">
              <p className="landing-eyebrow">Reach real players</p>
              <h2>Your game, in front of the right audience</h2>
              <p>
                RandSeed gives web games a place to be discovered, played, and
                shared through curated collections, community activity, and
                platform-wide discovery.
              </p>
            </div>
            <div className="feature-grid">
              {discoveryFeatures.map(({ icon: Icon, title, text }, index) => (
                <article className="feature-card" key={title}>
                  <span className="feature-card__number">0{index + 1}</span>
                  <div className="feature-card__icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section landing-section--dark" id="earn">
          <div className="dark-grid-pattern" />
          <div className="landing-container">
            <div className="section-heading">
              <p className="landing-eyebrow">Player-friendly monetization</p>
              <h2>
                Earn from engagement—
                <br />
                not interruptions.
              </h2>
              <p>
                Replace disruptive advertising with publishing bounties, WLT
                rewards, player payments, and transparent community reward
                pools.
              </p>
            </div>
            <div className="earning-grid">
              {earningFeatures.map(({ icon: Icon, title, text }) => (
                <article className="earning-card" key={title}>
                  <div className="earning-card__icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="earning-card__line" />
                </article>
              ))}
            </div>
            <p className="dark-manifesto">
              No ad breaks. No attention traps.{" "}
              <strong>Just games worth playing.</strong>
            </p>
          </div>
        </section>

        <section className="landing-section landing-section--process">
          <div className="landing-container process-layout">
            <div className="section-heading">
              <p className="landing-eyebrow">From build to players</p>
              <h2>
                Ship fast.
                <br />
                Learn faster.
              </h2>
              <p>
                Upload through a streamlined workflow, complete review, and
                start learning from real players.
              </p>
              <a className="text-link" href={PUBLISH_URL}>
                Submit your game <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <ol className="process-list">
              <li>
                <span className="process-list__step">01</span>
                <div className="process-list__icon">
                  <CloudUpload aria-hidden="true" />
                </div>
                <div>
                  <h3>Upload</h3>
                  <p>Upload your game bundle or connect an existing web build.</p>
                </div>
              </li>
              <li>
                <span className="process-list__step">02</span>
                <div className="process-list__icon">
                  <Gauge aria-hidden="true" />
                </div>
                <div>
                  <h3>Review</h3>
                  <p>
                    Complete a fast review covering performance, compatibility,
                    and quality.
                  </p>
                </div>
              </li>
              <li>
                <span className="process-list__step">03</span>
                <div className="process-list__icon">
                  <MessageCircleMore aria-hidden="true" />
                </div>
                <div>
                  <h3>Go live</h3>
                  <p>
                    Publish, collect free player feedback, and update whenever
                    you are ready.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section
          className="landing-section landing-section--technology"
          id="technology"
        >
          <div className="landing-container">
            <div className="section-heading section-heading--center">
              <p className="landing-eyebrow">Everything you need, built in</p>
              <h2>Zero SDK. Full power.</h2>
              <p>
                RandSeed provides identity, payments, and verifiable randomness
                through its host runtime—without adding platform dependencies
                to your game.
              </p>
            </div>
            <div className="technology-grid">
              <div className="code-window">
                <div className="code-window__bar">
                  <div aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <p>game.ts</p>
                  <span>Connected</span>
                </div>
                <pre>
                  <code>
                    <span className="code-muted">
                      {"// Your game stays a standard web app"}
                    </span>
                    {"\n"}
                    <span className="code-purple">window</span>.parent.postMessage(
                    {"\n  {"}
                    <span className="code-blue"> type</span>:{" "}
                    <span className="code-green">"randseed:ready"</span>
                    {",\n    "}
                    <span className="code-blue">version</span>:{" "}
                    <span className="code-orange">1</span>
                    {"\n  },\n  hostOrigin\n);"}
                  </code>
                </pre>
                <div className="code-window__status">
                  <ShieldCheck aria-hidden="true" />
                  Host runtime connected
                </div>
              </div>
              <div className="technology-list">
                <article>
                  <Code2 aria-hidden="true" />
                  <div>
                    <h3>No SDK, no lock-in</h3>
                    <p>
                      Your game remains a standard web application. Take it
                      anywhere.
                    </p>
                  </div>
                </article>
                <article>
                  <ShieldCheck aria-hidden="true" />
                  <div>
                    <h3>Verifiable fairness</h3>
                    <p>
                      On-chain VRF lets players verify randomized outcomes.
                    </p>
                  </div>
                </article>
                <article>
                  <Sparkles aria-hidden="true" />
                  <div>
                    <h3>Built-in game mechanics</h3>
                    <p>
                      Connect prize pools, micro-stakes, and badge progression
                      without building a backend.
                    </p>
                  </div>
                </article>
                <article>
                  <CircleDollarSign aria-hidden="true" />
                  <div>
                    <h3>Payments, not ads</h3>
                    <p>
                      Monetize through tips, purchases, and community rewards.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section landing-section--showcase">
          <div className="landing-container">
            <div className="showcase-heading">
              <div>
                <p className="landing-eyebrow">Play what’s next</p>
                <h2>Games on RandSeed</h2>
              </div>
              <a className="text-link" href="/">
                Explore all games <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <div className="showcase-grid">
              {showcaseGames.map(({ title, genre, tone, icon: Icon }, index) => (
                <article
                  className={`showcase-card game-art--${tone}`}
                  key={title}
                >
                  <div className="game-art-grid" />
                  <div className="game-art-orbit" />
                  <div className="showcase-card__icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <div className="showcase-card__overlay">
                    <span>{genre}</span>
                    <h3>{title}</h3>
                    <div className="showcase-card__play" aria-hidden="true">
                      <Play />
                    </div>
                  </div>
                  {index === 1 && (
                    <span className="showcase-card__badge">
                      <ShieldCheck aria-hidden="true" /> Verified fair
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-cta" id="start">
          <div className="closing-cta__shape closing-cta__shape--one" />
          <div className="closing-cta__shape closing-cta__shape--two" />
          <div className="landing-container closing-cta__inner">
            <RandseedMark className="closing-cta__mark" />
            <h2>Your next game deserves real players.</h2>
            <p>
              Publish on RandSeed, get feedback from the community, and unlock
              new ways to grow and earn.
            </p>
            <div className="landing-actions">
              <a className="button button--light" href={PUBLISH_URL}>
                Publish Your Game <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <p className="closing-cta__tagline">
              Launch fast. Play fair. Earn together.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      <WalletConnectModal
        isOpen={isWalletConnectModalOpen}
        onClose={(verifiedId) => {
          setWalletConnectModalOpen(false);
          if (typeof verifiedId === "string") {
            setSignedInAccount(verifiedId);
          }
          signInButtonRef.current?.focus();
        }}
      />
    </div>
  );
}
