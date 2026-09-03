import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Coverage, Route } from "../data/dossier";
import { REQUIREMENTS, ROUTES } from "../data/dossier";

export interface Profile { name: string; email: string; github: string; focus: string; }
export interface Toast { id: number; msg: string; tone: "ok" | "warn" | "info"; }

interface Store {
  route: Route;
  nav: (r: Route) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  visited: Route[];
  profile: Profile;
  setProfile: (p: Profile) => void;
  assess: Record<string, Coverage>;
  setCoverage: (id: string, c: Coverage) => void;
  searchOpen: boolean;
  setSearchOpen: (b: boolean) => void;
  mobileNav: boolean;
  setMobileNav: (b: boolean) => void;
  toasts: Toast[];
  toast: (msg: string, tone?: Toast["tone"]) => void;
  resetAll: () => void;
  progressPct: number;
}

const Ctx = createContext<Store | null>(null);

const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
};
const save = (key: string, v: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* private mode */ }
};

const defaultAssess = () =>
  Object.fromEntries(REQUIREMENTS.map((r) => [r.id, r.defaultCoverage])) as Record<string, Coverage>;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<Route>(() => {
    const r = load<Route>("td.route", "overview");
    return (ROUTES as readonly string[]).includes(r) ? r : "overview";
  });
  const [theme, setTheme] = useState<"light" | "dark">(() => load("td.theme", "light"));
  const [visited, setVisited] = useState<Route[]>(() => load("td.visited", ["overview"] as Route[]));
  const [profile, setProfileState] = useState<Profile>(() =>
    load("td.profile", { name: "", email: "", github: "", focus: "Generative AI · ML · MLOps" })
  );
  const [assess, setAssess] = useState<Record<string, Coverage>>(() => ({ ...defaultAssess(), ...load("td.assess", {}) }));
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    save("td.theme", theme);
  }, [theme]);
  useEffect(() => save("td.route", route), [route]);
  useEffect(() => save("td.visited", visited), [visited]);
  useEffect(() => save("td.profile", profile), [profile]);
  useEffect(() => save("td.assess", assess), [assess]);

  const toast = useCallback((msg: string, tone: Toast["tone"] = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-3), { id, msg, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const nav = useCallback((r: Route) => {
    setRoute(r);
    setVisited((v) => (v.includes(r) ? v : [...v, r]));
    setSearchOpen(false);
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);
  const setProfile = useCallback((p: Profile) => setProfileState(p), []);
  const setCoverage = useCallback((id: string, c: Coverage) => setAssess((a) => ({ ...a, [id]: c })), []);

  const resetAll = useCallback(() => {
    ["td.route", "td.theme", "td.visited", "td.profile", "td.assess"].forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  }, []);

  const progressPct = useMemo(() => Math.round((visited.length / ROUTES.length) * 100), [visited]);

  const value: Store = {
    route, nav, theme, toggleTheme, visited, profile, setProfile, assess, setCoverage,
    searchOpen, setSearchOpen, mobileNav, setMobileNav, toasts, toast, resetAll, progressPct,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}
