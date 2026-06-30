"use client";
import { useEffect, useRef, useState } from "react";
import { useTyping } from "@/hooks/useTyping";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { ref: headRef, displayed, done } = useTyping("Let's build the system your firm actually needs.", 36);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".contact-reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("in");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fn = (form.elements.namedItem("fn") as HTMLInputElement).value.trim();
    const em = (form.elements.namedItem("em") as HTMLInputElement).value.trim();
    const ch = (form.elements.namedItem("ch") as HTMLTextAreaElement).value.trim();
    const errs: string[] = [];
    if (!fn) errs.push("fn");
    if (!em) errs.push("em");
    if (!ch) errs.push("ch");
    setErrors(errs);
    if (errs.length) return;
    setTimeout(() => setSent(true), 1100);
  };

  const inp: React.CSSProperties = {
    width: "100%", background: "transparent",
    border: "0.9px solid rgba(26,25,22,0.10)", borderRadius: 2,
    color: "var(--ink)", fontFamily: "inherit",
    fontSize: 14, fontWeight: 400, letterSpacing: "-0.01em",
    padding: "12px 14px", outline: "none",
  };

  return (
    <section ref={sectionRef} id="contact" style={{ padding: "var(--section-py) 0", borderTop: "0.9px solid var(--border)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }} className="contact-grid">

          <div>
            {/* Typing heading — hook controls visibility */}
            <h2
              ref={headRef as React.RefObject<HTMLHeadingElement>}
              className={!done ? "typing-cursor" : ""}
              style={{ fontSize: "clamp(2.25rem,3.5vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.98, marginBottom: 20, color: "var(--ink)" }}
            >
              {displayed}
            </h2>
            <p className="contact-reveal reveal delay-2" style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted)", marginBottom: 32, maxWidth: 420 }}>
              Book a free 30-minute strategy call. We&rsquo;ll dig into your challenge and tell you exactly how we&rsquo;d approach it — no fluff, no hard sell.
            </p>
            <div className="contact-reveal reveal delay-3" style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
              {[
                { icon: "mail", text: "hello@acqron.com" },
                { icon: "pin", text: "Bacolod City, Philippines" },
                { icon: "clock", text: "Response within 24 hours" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(26,25,22,0.28)" strokeWidth="1.5">
                    {row.icon === "mail" && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>}
                    {row.icon === "pin" && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>}
                    {row.icon === "clock" && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                  </svg>
                  {row.icon === "mail"
                    ? <a href="mailto:hello@acqron.com" style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--muted)", textDecoration: "none" }}>{row.text}</a>
                    : <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--muted)" }}>{row.text}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          <div className="contact-reveal reveal delay-2" style={{ border: "0.9px solid var(--border)", borderRadius: 2, padding: "32px 28px", position: "relative", overflow: "hidden", boxShadow: "0 2px 24px rgba(26,25,22,0.05)" }}>
            <div style={{ position: "absolute", top: -0.9, right: -0.9, width: 20, height: 20, background: "linear-gradient(135deg,#EF4444,#F97316 50%,#F59E0B)" }} />

            {sent ? (
              <div style={{ textAlign: "center", padding: "28px 0" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(22,163,74,0.08)", border: "0.9px solid rgba(22,163,74,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 6 }}>Message sent!</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>We&rsquo;ll be in touch within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }} className="form-row">
                  <Field label="First Name *" name="fn" placeholder="Ron" error={errors.includes("fn")} style={inp} onFocus={() => setErrors(e => e.filter(x => x !== "fn"))} />
                  <Field label="Last Name" name="ln" placeholder="Paragoso" style={inp} />
                </div>
                <Field label="Email Address *" name="em" type="email" placeholder="you@company.com" error={errors.includes("em")} style={inp} onFocus={() => setErrors(e => e.filter(x => x !== "em"))} wrapStyle={{ marginBottom: 12 }} />
                <Field label="Business Name" name="biz" placeholder="Your Company" style={inp} wrapStyle={{ marginBottom: 12 }} />
                <Field label="Industry" name="industry" placeholder="e.g. E-commerce, Healthcare, SaaS…" style={inp} wrapStyle={{ marginBottom: 12 }} />
                <div style={{ marginBottom: 12 }}>
                  <label style={labelSt}>Message <span style={{ color: "#F97316" }}>*</span></label>
                  <textarea name="ch" placeholder="Tell us about your project or what you need help with." required style={{ ...inp, resize: "vertical", minHeight: 96 }} onFocus={() => setErrors(e => e.filter(x => x !== "ch"))} className={errors.includes("ch") ? "err" : ""} />
                </div>
                <button type="submit" style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center", padding: "14px 28px", borderRadius: 9999, fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1, border: "none", cursor: "pointer", color: "#fff", background: "linear-gradient(135deg,#EF4444 0%,#F97316 50%,#F59E0B 100%)", boxShadow: "0 2px 16px rgba(249,115,22,0.28)", marginTop: 6 }}>
                  Book My Free Discovery Call
                </button>
                <p style={{ textAlign: "center", fontSize: 11, fontWeight: 500, color: "var(--muted-2)", marginTop: 10 }}>Free · 30 minutes · No commitment required</p>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .contact-grid{grid-template-columns:1fr!important;gap:44px!important} }
        @media(max-width:480px){ .form-row{grid-template-columns:1fr!important} }
        .err { border-color: rgba(239,68,68,0.6) !important; }
      `}</style>
    </section>
  );
}

const labelSt: React.CSSProperties = { display: "block", fontSize: 10, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted-2)", marginBottom: 6 };

function Field({ label, name, type = "text", placeholder, error, style, onFocus, wrapStyle }: { label: string; name: string; type?: string; placeholder?: string; error?: boolean; style: React.CSSProperties; onFocus?: () => void; wrapStyle?: React.CSSProperties }) {
  return (
    <div style={wrapStyle}>
      <label style={labelSt}>{label}</label>
      <input type={type} name={name} placeholder={placeholder} style={{ ...style, borderColor: error ? "rgba(239,68,68,0.6)" : undefined }} onFocus={onFocus} />
    </div>
  );
}
