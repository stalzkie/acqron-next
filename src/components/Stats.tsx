"use client";

const stats = [
  {
    num: "8wks",
    desc: "Average time from kickoff to working MVP",
    img: "/8-weeks.jpg",
  },
  {
    num: "100%",
    desc: "Client satisfaction on every engagement",
    img: "/client-satisfaction.jpg",
  },
  {
    num: "3+",
    desc: "Products shipped and live in market",
    img: "/shipped.jpg",
  },
  {
    num: "0",
    desc: "Clients who left without results",
    img: "/leaving.jpg",
  },
];

export default function Stats() {
  return (
    <div className="container">
      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "var(--card-gap)",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className={`stat-card hero-reveal delay-${i + 1}`}
            style={{
              background: "var(--dark-bg)",
              aspectRatio: "1 / 1",
              position: "relative",
              overflow: "hidden",
              borderRadius: 2,
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            }}
          >
            {/* Image placeholder — swap src when you have real photos */}
            <img
              src={s.img}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                opacity: 0.55,
              }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />

            {/* Gradient overlay at 40% opacity over the image */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #EF4444 0%, #F97316 50%, #F59E0B 100%)",
              opacity: 0.10,
            }} />

            {/* Dark base layer so cards look good without a photo */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(17,17,16,0.30)" }} />

            {/* Corner gradient square */}
            <div style={{ position: "absolute", top: -0.9, right: -0.9, width: 20, height: 20, background: "linear-gradient(135deg,#EF4444,#F97316 50%,#F59E0B)", zIndex: 2 }} />

            {/* Content: number top-left, desc bottom-left */}
            <div style={{
              position: "absolute", inset: 0,
              padding: "clamp(14px, 2cqw, 24px)",
              display: "flex", flexDirection: "column",
              justifyContent: "space-between",
              zIndex: 3,
            }}>
              <div style={{
                fontWeight: 800, color: "#fff",
                lineHeight: 0.88, letterSpacing: "-0.05em",
                fontSize: "clamp(1.6rem, 16cqw, 8rem)",
              }}>
                {s.num}
              </div>
              <div style={{
                fontWeight: 400, color: "rgba(245,245,244,0.72)",
                lineHeight: 1.35, letterSpacing: "-0.02em",
                fontSize: "clamp(10px, 3.6cqw, 14px)",
                maxWidth: "72cqw",
              }}>
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
