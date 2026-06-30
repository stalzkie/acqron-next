"use client";
import { useEffect, useRef, useState } from "react";
import { useTyping } from "@/hooks/useTyping";
import { useWordFade } from "@/hooks/useWordFade";

const projects = [
  {
    key: "artbliss",
    cat: "Hospitality · Boutique Lodging",
    title: "Artbliss Hotel",
    fullTitle: "Artbliss Hotel — Boutique Cabin Retreat Website",
    desc: "Marketing site for a design-forward boutique retreat in Washington's Columbia River Gorge, featuring A-frame cabin accommodations. Built to convey a sense of place and convert browsers into bookings.",
    tags: ["Website", "Hospitality", "Booking UX"],
    img: "/work/artbliss.jpg",
    hero: "/work/artbliss.jpg",
    link: "https://www.artblisshotel.com/",
  },
  {
    key: "coastal-haven",
    cat: "Construction · Home Remodeling",
    title: "Coastal Haven Design + Build",
    fullTitle: "Coastal Haven Design + Build — Construction & Remodeling Website",
    desc: "Marketing and portfolio site for a Tampa Bay area residential construction and remodeling firm — showcasing kitchen, bathroom, pool, and home addition projects to drive client inquiries.",
    tags: ["Website", "Construction", "Portfolio"],
    img: "/work/coastal.png",
    hero: "/work/coastal.png",
    link: "https://www.coastalhaven-design-build.com",
  },
  {
    key: "dwell",
    cat: "Vacation Rentals · Property Management",
    title: "Dwell Luxury Rentals",
    fullTitle: "Dwell Luxury Rentals — Flagstaff Vacation Rental Platform",
    desc: "Property management and direct booking site for a luxury vacation rental company in Flagstaff, Arizona — serving both guests looking for premium accommodations and homeowners seeking full-service management.",
    tags: ["Website", "Vacation Rentals", "Property Management"],
    img: "/work/dwell.webp",
    hero: "/work/dwell.webp",
    link: "https://www.dwelluxuryrentals.com",
  },
  {
    key: "hometeam",
    cat: "Vacation Rentals · Hospitality",
    title: "Home Team Luxury Rentals",
    fullTitle: "Home Team Luxury Rentals — Luxury Vacation Rental & Management Platform",
    desc: "Dual-purpose platform for a luxury vacation rental management company — enabling guests to book premium properties across the US while helping property owners maximize their rental ROI through full-service management.",
    tags: ["Website", "Booking Platform", "Property Management"],
    img: "/work/hometeam.jpg",
    hero: "/work/hometeam.jpg",
    link: "https://hometeamluxuryrentals.com",
  },
  {
    key: "simplabots",
    cat: "AI Automation · SaaS",
    title: "SimplaBots",
    fullTitle: "SimplaBots — AI Automation Platform for Small Business",
    desc: "AI agent platform that helps founders and small teams scale operations without hiring — handling customer service, lead capture, calls, emails, and content creation around the clock through customizable AI agents.",
    tags: ["SaaS", "AI / Automation", "React", "Node.js"],
    img: "/work/simplabots.png",
    hero: "/work/simplabots.png",
    link: "https://simplabots.com",
  },
  {
    key: "rise-collective",
    cat: "Real Estate · Multi-Brand Portfolio",
    title: "Rise Collective",
    fullTitle: "Rise Collective — Real Estate & Hospitality Parent Company Site",
    desc: "Central hub for a multi-brand holding company spanning vacation rentals, real estate investment, property management, construction, tax advisory, and lending — connecting guests, investors, and partners across their full ecosystem.",
    tags: ["Website", "Real Estate", "Multi-Brand", "Investment"],
    img: "/work/rise.png",
    hero: "/work/rise.png",
    link: "https://rise-collective.com",
  },
  {
    key: "bnb-turnkey",
    cat: "Real Estate Investment · STR Management",
    title: "BNB Turnkey",
    fullTitle: "BNB Turnkey — Done-For-You Short-Term Rental Investment Platform",
    desc: "End-to-end platform for passive short-term rental investors — covering property selection, interior design, furnishing, and ongoing management so investors earn income without the operational overhead.",
    tags: ["Website", "STR Investing", "Property Management"],
    img: "/work/bnbturnkey.jpg",
    hero: "/work/bnbturnkey.jpg",
    link: "https://bnb-turnkey.com",
  },
  {
    key: "paradiso",
    cat: "Luxury Rentals · Membership Platform",
    title: "Paradiso Homes",
    fullTitle: "Paradiso Homes — Ultra-Luxury Private Residence Network",
    desc: "Membership-based platform giving access to a curated network of ultra-luxury private residences across the US — delivering hotel-level reliability and concierge services in large private homes.",
    tags: ["Website", "Luxury Rentals", "Membership", "Hospitality"],
    img: "/work/paradiso.jpg",
    hero: "/work/paradiso.jpg",
    link: "https://paradiso-homes.com",
  },
  {
    key: "str-report",
    cat: "STR Investing · Community Platform",
    title: "The STR Report",
    fullTitle: "The STR Report — Short-Term Rental Investment Community & Education Hub",
    desc: "Free community platform providing education, market insights, investment strategies, and property analysis tools for short-term rental investors pursuing financial freedom through STR ownership.",
    tags: ["Website", "Community Platform", "STR Investing", "Education"],
    img: "/work/strreport.jpg",
    hero: "/work/strreport.jpg",
    link: "https://thestrreport.com",
  },
  {
    key: "sandkey",
    cat: "Vacation Rentals · Texas Gulf Coast",
    title: "Sand Key Vacation Rentals",
    fullTitle: "Sand Key Vacation Rentals — Texas Gulf Coast Rental Platform",
    desc: "Vacation rental booking and property management site serving Port Aransas, Corpus Christi, Rockport, and Padre Island — offering travelers homes, condos, and townhomes while providing owners full-service rental management.",
    tags: ["Website", "Vacation Rentals", "Booking Platform"],
    img: "/work/sandkey.jpg",
    hero: "/work/sandkey.jpg",
    link: "https://www.sandkeyvacationrentals.com",
  },
  {
    key: "bnb-construction",
    cat: "Construction · STR Renovation",
    title: "BNB Construction",
    fullTitle: "BNB Construction — Short-Term Rental Renovation & Optimization",
    desc: "Construction and renovation company specializing in transforming properties for the short-term rental market — optimizing layouts, finishes, and amenities to increase bookings and maximize revenue for STR owners.",
    tags: ["Website", "Construction", "STR Renovation", "Portfolio"],
    img: "/work/bnbconstruction.png",
    hero: "/work/bnbconstruction.png",
    link: "https://bnbconstruction.co",
  },
  {
    key: "cedar-run",
    cat: "Hospitality · Vacation Resort",
    title: "Cedar Run Resort",
    fullTitle: "Cedar Run Resort — Family & Pet-Friendly Vacation Rentals in Bradenton",
    desc: "Resort booking site for a family and dog-friendly vacation rental community in Bradenton, Florida — featuring 2 and 3-bedroom properties near Anna Maria Island and IMG Academy with full resort amenities.",
    tags: ["Website", "Vacation Rentals", "Hospitality", "Booking UX"],
    img: "/work/cedarrun.png",
    hero: "/work/cedarrun.png",
    link: "https://cedarrunresort.com",
  },
];

export default function Work() {
  const [active, setActive] = useState<typeof projects[0] | null>(null);
  const { ref: headRef, displayed, done } = useTyping("Ideas turned into reality.", 42);
  const subRef = useWordFade("Websites, platforms, and tools we've shipped — across real estate, short-term rentals, hospitality, and beyond.", 40);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".work-reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("in");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const openProject = (p: typeof projects[0]) => {
    setActive(p);
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    setActive(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section ref={sectionRef} id="work" style={{ padding: "var(--section-py) 0", borderTop: "0.9px solid var(--border)" }}>
        <div className="container">

          {/* Header */}
          <div style={{ marginBottom: 56 }}>
            <h2
              ref={headRef as React.RefObject<HTMLHeadingElement>}
              className={!done ? "typing-cursor" : ""}
              style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.04em", marginTop: 14, marginBottom: 14, color: "var(--ink)" }}
            >
              {displayed}
            </h2>
            <p
              ref={subRef as React.RefObject<HTMLParagraphElement>}
              className="word-fade-up"
              style={{ fontSize: 14, lineHeight: 1.65, color: "var(--muted)", letterSpacing: "-0.02em", maxWidth: 440 }}
            />
          </div>

          {/* Cards — Poetic: wide 16/10 landscape image + thin 56px metadata strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(6px, 0.6vw, 12px)" }} className="work-grid">
            {projects.map((p, i) => (
              <div
                key={p.key}
                className={`work-reveal reveal delay-${i + 1}`}
                onClick={() => openProject(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProject(p); } }}
                style={{ border: "0.9px solid var(--border)", borderRadius: 2, overflow: "hidden", background: "var(--cream)", cursor: "pointer", transition: "box-shadow 280ms var(--ease), transform 280ms var(--ease)", boxShadow: "0 1px 4px rgba(26,25,22,0.04)", position: "relative" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 12px 48px rgba(26,25,22,0.10)"; el.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 1px 4px rgba(26,25,22,0.04)"; el.style.transform = "none"; }}
              >
                {/* Image: Poetic uses 16/10 landscape — wider than tall, cinematic */}
                <div style={{ width: "100%", aspectRatio: "16 / 10", overflow: "hidden", position: "relative" }}>
                  <img
                    src={p.img} alt={p.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 600ms var(--ease)", display: "block" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
                  />
                </div>
                {/* Metadata strip — Poetic keeps this very compact, ~56px tall */}
                <div style={{ height: 56, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "0.9px solid var(--border)" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-2)", marginBottom: 1, letterSpacing: "0.01em" }}>{p.cat}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: 2, border: "0.9px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 12, background: "var(--bg)", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:900px){ .work-grid { grid-template-columns: 1fr 1fr !important; } }
          @media(max-width:540px){ .work-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* Overlay */}
      <div
        className={`work-overlay fixed inset-0 z-[200] flex items-end ${active ? "open" : ""}`}
        aria-hidden={!active}
      >
        <div className="absolute inset-0" style={{ background: "rgba(26,25,22,0.4)", backdropFilter: "blur(8px)" }} onClick={close} />
        <div className="work-panel no-scrollbar relative z-10 w-full overflow-y-auto" style={{ maxHeight: "90vh", background: "var(--bg)", borderRadius: "2px 2px 0 0" }}>
          {active && (
            <>
              <button onClick={close} aria-label="Close" style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: 2, background: "rgba(253,253,252,0.9)", border: "0.9px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
              <img src={active.hero} alt={active.fullTitle} style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "32px 40px 60px", maxWidth: 800, margin: "0 auto" }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 }}>{active.cat}</div>
                <h2 style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16, color: "var(--ink)" }}>{active.fullTitle}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted)", marginBottom: 28, letterSpacing: "-0.01em" }}>{active.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                  {active.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 2, border: "0.9px solid var(--border)", color: "var(--muted)" }}>{t}</span>
                  ))}
                </div>
                <a href={active.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)", borderBottom: "0.9px solid var(--border)", paddingBottom: 3, textDecoration: "none" }}>
                  View Live Project
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
