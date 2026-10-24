"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { consultationHref, navLinks } from "@/config/site";
import { serviceHref, services } from "@/config/services";
import { ButtonLink } from "../ui/Button";
import { Logo } from "../ui/Logo";

const ease = [0.22, 1, 0.36, 1] as const;
const norm = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);

export function Navbar() {
  const pathname = norm(usePathname() ?? "/");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus after navigating (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setMobileOpen(false);
  }

  // Desktop services menu: Escape or outside click closes it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [menuOpen]);

  // Mobile menu: lock scroll, Escape closes and returns focus.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    const h = norm(href);
    return h === "/" ? pathname === "/" : pathname.startsWith(h);
  };

  const openSoon = () => {
    clearTimeout(hoverTimer.current);
    setMenuOpen(true);
  };
  const closeSoon = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMenuOpen(false), 150);
  };

  const linkCls = (active: boolean) =>
    `relative inline-flex h-[72px] items-center gap-1 px-3.5 text-[15px] transition-colors duration-(--dur-fast) after:absolute after:inset-x-3.5 after:bottom-0 after:h-0.5 after:origin-left after:bg-blue after:transition-transform after:duration-(--dur-base) ${
      active ? "text-navy after:scale-x-100" : "text-muted hover:text-navy after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-[border-color,box-shadow] duration-(--dur-base) ${
        scrolled || mobileOpen ? "border-line shadow-[0_6px_24px_-18px_rgb(16_29_54/0.35)]" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="Srivofy home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center lg:flex">
          {navLinks.map((link) =>
            link.label === "Services" ? (
              <li
                key={link.label}
                ref={menuRef}
                className="relative"
                onPointerEnter={(e) => e.pointerType === "mouse" && openSoon()}
                onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
              >
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls="services-menu"
                  onClick={() => setMenuOpen((v) => !v)}
                  className={linkCls(isActive(link.href) || menuOpen)}
                >
                  Services
                  <ChevronDown aria-hidden className={`size-4 transition-transform duration-(--dur-base) ${menuOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      id="services-menu"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
                      transition={{ duration: 0.2, ease }}
                      className="absolute top-full left-1/2 w-[min(760px,calc(100vw-2rem))] -translate-x-1/2"
                    >
                      <div className="grid grid-cols-[1fr_1fr] gap-px overflow-hidden rounded-lg border border-line bg-line shadow-[0_24px_60px_-24px_rgb(16_29_54/0.35)]">
                        {services.map((s) => (
                          <Link
                            key={s.id}
                            href={serviceHref(s)}
                            className="group flex gap-4 bg-white p-5 transition-colors hover:bg-paper"
                          >
                            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-blue-50 text-blue">
                              <s.icon aria-hidden className="size-5" />
                            </span>
                            <span>
                              <span className="flex items-center gap-1.5 text-[15px] font-medium text-navy">
                                {s.name}
                                <ArrowRight aria-hidden className="size-3.5 -translate-x-1 opacity-0 transition-all duration-(--dur-base) group-hover:translate-x-0 group-hover:opacity-100" />
                              </span>
                              <span className="mt-1 block text-[13px] leading-snug text-muted">{s.summary}</span>
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/services/"
                          className="flex items-center justify-between bg-navy p-5 text-[15px] font-medium text-white transition-colors hover:bg-navy-2"
                        >
                          View all services
                          <ArrowRight aria-hidden className="size-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <Link href={link.href} aria-current={isActive(link.href) ? "page" : undefined} className={linkCls(isActive(link.href))}>
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href={consultationHref}>Request a Consultation</ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-line text-navy lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 72px)" }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.18 } }}
            transition={{ duration: 0.28, ease }}
            className="overflow-y-auto border-t border-line bg-white lg:hidden"
          >
            <ul className="container-page py-4">
              {navLinks.map((link) => (
                <li key={link.label} className="border-b border-line">
                  {link.label === "Services" ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileServices}
                        aria-controls="mobile-services"
                        onClick={() => setMobileServices((v) => !v)}
                        className="flex min-h-14 w-full items-center justify-between text-lg font-medium text-navy"
                      >
                        Services
                        <ChevronDown aria-hidden className={`size-5 text-muted transition-transform duration-(--dur-base) ${mobileServices ? "rotate-180" : ""}`} />
                      </button>
                      <div
                        id="mobile-services"
                        className={`grid transition-[grid-template-rows] duration-(--dur-base) ease-(--ease-out) ${mobileServices ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                        inert={!mobileServices}
                      >
                        <ul className="overflow-hidden">
                          {services.map((s) => (
                            <li key={s.id}>
                              <Link href={serviceHref(s)} onClick={() => setMobileOpen(false)} className="flex min-h-12 items-center gap-3 text-[15px] text-muted hover:text-navy">
                                <s.icon aria-hidden className="size-4.5 text-blue" />
                                {s.name}
                              </Link>
                            </li>
                          ))}
                          <li className="pb-3">
                            <Link href="/services/" onClick={() => setMobileOpen(false)} className="flex min-h-12 items-center gap-2 text-[15px] font-medium text-blue">
                              View all services <ArrowRight aria-hidden className="size-4" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link href={link.href} onClick={() => setMobileOpen(false)} className="flex min-h-14 items-center text-lg font-medium text-navy">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="container-page pb-10">
              <ButtonLink href={consultationHref} size="lg" className="w-full" arrow>
                Request a Consultation
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
