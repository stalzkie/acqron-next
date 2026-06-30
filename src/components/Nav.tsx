"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > lastY.current && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => { setOpen(false); document.body.style.overflow = ""; };
  const toggle = () => {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: "var(--nav-h)",
          zIndex: 40,
          background: scrolled ? "rgba(253,253,252,0.92)" : "var(--bg)",
          borderBottom: `0.9px solid ${scrolled ? "rgba(26,25,22,0.10)" : "transparent"}`,
          backdropFilter: scrolled ? "blur(20px)" : undefined,
          WebkitBackdropFilter: scrolled ? "blur(20px)" : undefined,
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          transition: "background 300ms, border-color 300ms, transform 350ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Inner: centered, max-width capped, fluid padding — never stretches on zoom-out */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          maxWidth: "var(--content-w)",
          margin: "0 auto",
          padding: "0 var(--page-px)",
          gap: 32,
        }}>
          {/* Logo */}
          <a href="#home" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
            <Image src="/acron-logo.png" alt="Acqron" width={120} height={40} style={{ objectFit: "contain", height: 36, width: "auto" }} priority />
          </a>

          {/* Center links — flex-1 so they truly center between logo and buttons */}
          <ul className="nav-links" style={{ display: "flex", alignItems: "center", gap: 40, flex: 1, justifyContent: "center", listStyle: "none", margin: 0, padding: 0 }}>
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className="nav-link"
                  style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.01em", textDecoration: "none" }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right buttons */}
          <div className="nav-btns" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <a href="#contact" style={blackBtn}>Work With Us</a>
          </div>

          {/* Hamburger */}
          <button
            className="nav-ham"
            onClick={toggle}
            aria-label="Toggle menu"
            aria-expanded={open}
            style={{ display: "none", flexDirection: "column", gap: 5, padding: 8, cursor: "pointer", border: "none", background: "transparent" }}
          >
            <span style={hamLine(open, 1)} />
            <span style={hamLine(open, 2)} />
            <span style={hamLine(open, 3)} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`drawer ${open ? "open" : ""}`}
        style={{ position: "fixed", left: 0, right: 0, bottom: 0, top: "var(--nav-h)", zIndex: 39, display: "flex", flexDirection: "column", background: "var(--bg)", borderTop: "0.9px solid var(--border)", padding: "28px 24px 40px" }}
      >
        {[...links, { href: "#contact", label: "Contact" }].map(l => (
          <a key={l.href} href={l.href} onClick={close}
            style={{ display: "block", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink)", padding: "16px 0", borderBottom: "0.9px solid var(--border)", textDecoration: "none" }}>
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={close} style={{ ...blackBtn, marginTop: 24, alignSelf: "flex-start", padding: "14px 28px", fontSize: 15 }}>
          Work With Us
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-btns  { display: none !important; }
          .nav-ham   { display: flex !important; }
        }
      `}</style>
    </>
  );
}

const base: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 7,
  padding: "12px 22px", borderRadius: 9999,
  fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em",
  lineHeight: 1, whiteSpace: "nowrap", textDecoration: "none", cursor: "pointer",
  transition: "opacity 150ms, transform 150ms",
};
const blackBtn: React.CSSProperties = { ...base, background: "var(--ink-2)", color: "#fbfbf9" };

function hamLine(open: boolean, n: number): React.CSSProperties {
  const s: React.CSSProperties = { display: "block", width: 22, height: 1.5, background: "var(--ink)", borderRadius: 2, transition: "transform 250ms, opacity 250ms" };
  if (open && n === 1) return { ...s, transform: "translateY(6.5px) rotate(45deg)" };
  if (open && n === 2) return { ...s, opacity: 0 };
  if (open && n === 3) return { ...s, transform: "translateY(-6.5px) rotate(-45deg)" };
  return s;
}
