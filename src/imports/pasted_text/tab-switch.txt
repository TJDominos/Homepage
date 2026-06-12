import "./index.scss";
import React, { useState, useEffect, useMemo } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCommonStore } from "@/store/commonStore";
import { useUser } from '@/componentp/UserProvider';
import WLDialog from "@/components/WLDialog";
import WLButton from "@/components/Button";
import { Popup, Checkbox } from "@nutui/nutui-react";
import { isMobileDevice, isMobileBrowser, isIOS } from "@/common/utils";
import { useNotifications } from "@/hooks/useNotifications";

import IILoginEntry from "../../componentp/IILoginEntry";
import { useSigninPopupControl } from "@/components/SigninPopup/useSigninPopupControl";

const TabSwitch = () => {
  const user = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [tabName, setTabName] = useState('')
  const [browserName, setBrowserName] = useState('')
  const [neverShow, setNeverShow] = useState(false)
  const [pwaInstallPopupVisible, setPwaInstallPopupVisible] = useState(false)
  const [signInDialogVisible, setSignInDialogVisible] = useState(false);
  const { selectedPlayPath, notificationDialogVisible, setNotificationDialogVisible } = useCommonStore()
  const { unread, setUnread, refresh, unreadComment, unreadCommentMention } = useNotifications();
  const signinPopupControl = useSigninPopupControl();
  const showTabsRoutes = useMemo(() => ['/money', '/', '/inbox', '/history'].includes(location.pathname), [location.pathname]);

  const tabActive = (tabName) => {
    setTabName(tabName)
  }

  // 处理Inbox点击事件，包含notification逻辑
  const handleInboxClick = async (e) => {
    const isLogin = await user.isLogin();
    if (!isLogin) {
      e.preventDefault(); // 阻止NavLink的默认跳转
      setSignInDialogVisible(true);
      return;
    }
    // 如果已登录，清除未读状态，让NavLink处理跳转
    setUnread(0);
    tabActive("inbox");
  };

  const handleLogin = () => {
    signinPopupControl.show();
    setSignInDialogVisible(false);
  };

  useEffect(() => {
    const init = async () => {
      const pwaInstallPopupVisibleLocal = localStorage.getItem('pwaInstallPopupVisible')
      if (isMobileDevice && isIOS() && !pwaInstallPopupVisibleLocal && !window.Notification) {
        const browserName = getBrowserName()
        setBrowserName(browserName)
        setPwaInstallPopupVisible(true)
      }
      if (!localStorage.getItem('NotificationDialogLocal') && Notification?.permission === 'default') {
        setNotificationDialogVisible(true)
      }
      if (Notification?.permission === 'granted' && user?.principal_id) {
        window.OneSignalDeferred.push(async function(OneSignal) {
          await OneSignal.Notifications.requestPermission()
          await OneSignal.login(user.principal_id);
        })
      }
      localStorage.setItem('NotificationDialogLocal', 'false')
    };
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined' && user.principal_id) {
      init()
    }
  }, [user.principal_id]);

  // 当组件可见时刷新通知数据
  useEffect(() => {
    refresh();
  }, [location.pathname]);

  const getBrowserName = () => {
    const mobileBrowser = isMobileBrowser()
    if (mobileBrowser.isChrome) {
      return 'Chrome'
    } else if (mobileBrowser.isFirefox) {
      return 'Firefox'
    } else if (mobileBrowser.isSafari) {
      return 'Safari'
    } else if (mobileBrowser.isEdge) {
      return 'Edge'
    } else {
      return 'Safari'
    }
  }
  const getCheckboxIcon = (agree) => {
    return agree? <span className="checkbox-input-checked" /> : <span className="checkbox-input" />
  }
  const handleCheckboxChange = () => {
    console.log('handleCheckboxChange', neverShow)
    setNeverShow(!neverShow)
    if (neverShow) {
      localStorage.removeItem('pwaInstallPopupVisible')
    } else {
      localStorage.setItem('pwaInstallPopupVisible', 'false')
    }
  }
  const handleOpenNotification = () => {
    setNotificationDialogVisible(false)
    window.OneSignalDeferred.push(async function(OneSignal) {
      await OneSignal.Notifications.requestPermission()
      await OneSignal.login(user.principal_id);
    })
  }
  
  return (
    <div className={`tab-switch-page-v2 ${tabName == "money" ? "money-tab" : ""} flex flex-col h-screen w-full max-w-[var(--max-content-width)]`}>
      <div className={`tab-switch-page-v2-content flex-grow overflow-y-auto`}>
        <div className="container" id="container">
          <div className="outlet-wrap">
            <Outlet />
          </div>
        </div>
      </div>
      
      <IILoginEntry tabName={tabName} />
      {showTabsRoutes && (
      <div
        className="tab-switch-page-v2-bottom flex justify-center  items-center fixed bottom-0 left-[50%] w-full max-w-[var(--max-content-width)]"
        style={{ transform: "translateX(-50%)" }}
      >
        <div className="tab-switch-page-v2-bottom-box">
          <div className="tab-switch-page-v2-bottom-box-container">
            <NavLink
              to="/money"
              onClick={() => { tabActive("money") }}
              className={({ isActive }) => {
                return isActive ? "nav-link active" : "nav-link"
              }}
            >
              <div className="tab-icon money"></div>
              <div className="label">Money</div>
            </NavLink>
            <NavLink
                to="/"
              onClick={() => { tabActive("play") }}
              className={({ isActive }) => {
                return isActive ? "nav-link active" : "nav-link"
              }}
            >
              <div className="tab-icon play"></div>
              <div className="label">Play</div>
            </NavLink>
            
            {/* Inbox按钮 - 集成notification功能 */}
            <NavLink
              to="/inbox"
              onClick={handleInboxClick}
              className={({ isActive }) => {
                return `${isActive ? "nav-link active" : "nav-link"} relative`
              }}
            >
              {/* 通知小红点和数字 */}
              {(unreadComment + unreadCommentMention) > 0 && (
                <div className="absolute w-[20rem] h-[12rem] top-[4rem] right-[15rem] rounded-full bg-red-600 text-[8rem] text-white flex items-center justify-center z-10">
                  {(unreadComment + unreadCommentMention) > 99 ? '99+' : (unreadComment + unreadCommentMention)}
                </div>
              )}
              {(unread > 0 && (unreadComment + unreadCommentMention) === 0) && (
                <div className="absolute w-[8rem] h-[8rem] top-[5rem] right-[25rem] rounded-full bg-red-600 z-10"></div>
              )}
              <div className="tab-icon inbox"></div>
              <div className="label">Inbox</div>
            </NavLink>

            <NavLink
              to="/history"
              onClick={() => { tabActive("history") }}
              className={({ isActive }) => {
                return isActive ? "nav-link active" : "nav-link"
              }}
            >
              <div className="tab-icon history"></div>
              <div className="label">History</div>
            </NavLink>
          </div>
        </div>
      </div>
      )}

      {/* 登录提示对话框 */}
      <WLDialog
        title="Please sign in"
        visible={signInDialogVisible}
        footer={null}
        height={168}
        onConfirm={handleLogin}
        confirmText='Sign in'
        onClose={() => {
          setSignInDialogVisible(false);
        }}
      >
        <div style={{
          padding: '10rem 14rem 20rem 14rem',
          color: '#000',
          fontFamily: 'PingFang SC',
          fontSize: '12rem',
          fontWeight: 400,
          textAlign: 'center'
        }}>
          You are in guest mode.
        </div>
      </WLDialog>

      <WLDialog
        visible={notificationDialogVisible}
        onClose={() => {
          setNotificationDialogVisible(false)
        }}
        closeIconPosition="bottom"
        closeOnOverlayClick={false}
        width="304rem"
        className="tab-switch-dialog"
      >
        <div className="notification-dialog-content">
          <div className="notification-dialog-content-icon"></div>
          <div className="notification-dialog-content-text">
          Turn on notifications to receive exclusive benefits
          </div>
          <div className="notification-dialog-content-buttons">
           <WLButton style={{width: '115rem', height: '40rem', fontSize: '14rem'}} txt='Think again' type="cancel" onClick={() => {
             setNotificationDialogVisible(false)
           }} />
           <WLButton style={{width: '115rem', height: '40rem', fontSize: '14rem'}} txt='Enable Now' onClick={handleOpenNotification} />
          </div>
        </div>
      </WLDialog>
      <Popup
        visible={pwaInstallPopupVisible} 
        position="bottom"
        title="Add to home screen" >
        <div className="pwa-popup-content">
          <div className="pwa-popup-content-text">
          To receive notifications and to receive exclusive benefits,we recommend that you add Randseed to your home screen.
          </div>
          <div className="pwa-popup-content-images">
            <div className={`${browserName}-1`}></div>
            <div className={`${browserName}-2`}></div>
          </div>
          <div className="pwa-popup-content-bottom">
          <Checkbox 
            defaultChecked={neverShow} 
            checked={neverShow}
            onChange={handleCheckboxChange} 
            icon={getCheckboxIcon(false)} 
            activeIcon={getCheckboxIcon(true)} /> Don't show me this again
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default TabSwitch;
