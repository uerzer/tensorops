import React, { useEffect } from "react";
import { StoreProvider, useStore } from "./lib/store";
import { Sidebar, SearchModal, Ticker, Toasts, TopBar } from "./components/Chrome";
import Overview from "./views/Overview";
import Briefing from "./views/Briefing";
import Work from "./views/Work";
import Stack from "./views/Stack";
import People from "./views/People";
import Blog from "./views/Blog";
import Careers from "./views/Careers";
import Application from "./views/Application";
import SystemView from "./views/SystemView";

function Shell() {
  const { route, searchOpen, setSearchOpen, mobileNav, setMobileNav } = useStore();

  // global ⌘K / Ctrl+K
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [searchOpen, setSearchOpen]);

  const view = (() => {
    switch (route) {
      case "briefing": return <Briefing />;
      case "work": return <Work />;
      case "stack": return <Stack />;
      case "people": return <People />;
      case "blog": return <Blog />;
      case "careers": return <Careers />;
      case "application": return <Application />;
      case "system": return <SystemView />;
      default: return <Overview />;
    }
  })();

  return (
    <div className="min-h-screen gridpaper">
      <TopBar />
      <Ticker />
      <div className="flex items-stretch">
        <div className="hidden lg:block sticky top-[83px] self-start h-[calc(100vh-83px)]">
          <Sidebar className="h-full" />
        </div>

        {/* mobile drawer */}
        {mobileNav && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 anim-fade" style={{ background: "rgba(10,14,20,0.55)" }} onClick={() => setMobileNav(false)} />
            <div className="absolute left-0 top-0 bottom-0 anim-rise card !rounded-none border-r hairline w-[290px] max-w-[85vw] overflow-hidden flex">
              <Sidebar className="h-full !w-full" />
            </div>
          </div>
        )}

        <main className="flex-1 min-w-0">
          <div key={route} className="anim-fade">{view}</div>
          <footer className="border-t hairline mt-4 px-4 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-3 max-w-[1120px] mx-auto">
            <span className="kicker !text-[9.5px]">T·DOSSIER — an independent candidate compilation. Not affiliated with TensorOps. All trademarks belong to their owners.</span>
            <span className="kicker !text-[9.5px] text-accent">built as the application, not beside it</span>
          </footer>
        </main>
      </div>
      <SearchModal />
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
