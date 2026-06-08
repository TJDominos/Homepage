import React from "react";
import svgPaths from "../imports/svg-401s87trfk";
import "./BottomNav.scss";

type BottomNavTab = "money" | "play" | "inbox" | "history";

interface BottomNavProps {
  activeTab?: BottomNavTab;
  onTabChange?: (tab: BottomNavTab) => void;
}

const navItems: Array<{
  id: BottomNavTab;
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
}> = [
  {
    id: "money",
    label: "Money",
    href: "/money",
    icon: (active) => (
      <svg className="tab-svg" viewBox="0 0 27 27" fill="none" aria-hidden="true">
        <rect fill="transparent" height="27" width="27" />
        <path d={svgPaths.p1bf39e00} fill="currentColor" fillOpacity={active ? "1" : "0.65"} />
      </svg>
    )
  },
  {
    id: "play",
    label: "Play",
    href: "/",
    icon: (active) => (
      <svg className="tab-svg" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <circle cx="15" cy="15" fill="currentColor" fillOpacity={active ? "1" : "0.65"} r="15" />
        <g>
          <path d={svgPaths.p170a5300} stroke="#fff" strokeOpacity="1" strokeWidth="1.4728" />
          <path d={svgPaths.p12adf040} stroke="#fff" strokeOpacity="1" strokeWidth="1.26015" />
          <circle cx="20.8592" cy="20.1715" r="2.27122" stroke="#fff" strokeOpacity="1" strokeWidth="1.18139" />
        </g>
      </svg>
    )
  },
  {
    id: "inbox",
    label: "Inbox",
    href: "/inbox",
    icon: (active) => (
      <svg className="tab-svg" viewBox="0 0 27 27" fill="none" aria-hidden="true">
        <path d={svgPaths.p213e89c0} fill="currentColor" fillOpacity={active ? "1" : "0.65"} />
      </svg>
    )
  },
  {
    id: "history",
    label: "History",
    href: "/history",
    icon: (active) => (
      <svg className="tab-svg" viewBox="0 0 27 27" fill="none" aria-hidden="true">
        <path d={svgPaths.p2891d1d0} fill="currentColor" fillOpacity={active ? "1" : "0.65"} />
      </svg>
    )
  }
];

const BottomNav: React.FC<BottomNavProps> = ({ activeTab = "play", onTabChange }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: BottomNavTab) => {
    onTabChange?.(id);

    if (event.currentTarget.getAttribute("href") !== "/") {
      event.preventDefault();
    }
  };

  return (
    <nav className="bottom-nav" aria-label="Primary">
      <div className="bottom-nav-box">
        <div className="bottom-nav-box-container">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => handleClick(event, item.id)}
                className={`nav-link${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <div className={`tab-icon ${item.id}`}>{item.icon(isActive)}</div>
                <div className="label">{item.label}</div>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
