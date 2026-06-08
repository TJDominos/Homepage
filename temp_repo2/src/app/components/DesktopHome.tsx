import { useState } from "react";
import { Header } from "./Header";
import { DesktopPlayPage } from "./DesktopPlayPage";
import { TabSwitch } from "./TabSwitch";

export function DesktopHome() {
  const [activePage, setActivePage] = useState<'money' | 'play' | 'inbox' | 'history'>('play');

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#D5D6F7] via-[#E1E2F9] to-white">
      {/* Header */}
      <Header />

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1024px] mx-auto px-6 py-3">
          {activePage === 'play' && <DesktopPlayPage />}
          {activePage === 'money' && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-black mb-4">Money Page</h2>
              <p className="text-black/65">Coming soon...</p>
            </div>
          )}
          {activePage === 'inbox' && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-black mb-4">Inbox Page</h2>
              <p className="text-black/65">Coming soon...</p>
            </div>
          )}
          {activePage === 'history' && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-black mb-4">History Page</h2>
              <p className="text-black/65">Coming soon...</p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <TabSwitch activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}