export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(120deg, #f3f4f6 0%, #a5b4fc 60%, #4f46e5 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "4rem"
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: 900,
          color: "#4f46e5",
          letterSpacing: "-0.03em",
          marginBottom: "1rem",
          textShadow: "0 2px 8px rgba(79,70,229,0.10)"
        }}
      >
        VC <span style={{ color: '#1e293b' }}>Intelligence</span>
      </h1>
      <span
        style={{
          fontSize: "1.35rem",
          color: "#6366f1",
          fontWeight: 600,
          letterSpacing: "0.01em",
          marginBottom: "2.5rem",
          display: "inline-block"
        }}
      >
        Your startup search platform
      </span>

      {/* Why use VC Intelligence section removed as requested */}

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#6366f1", marginBottom: "0.5rem", textAlign: "center" }}>Featured Companies</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center", marginBottom: "2rem" }}>
        {[
          { name: "Stripe", industry: "Fintech" },
          { name: "Notion", industry: "Productivity" },
          { name: "OpenAI", industry: "AI" },
          { name: "Airbnb", industry: "Travel" },
          { name: "Tesla", industry: "Automotive" },
          { name: "Shopify", industry: "E-commerce" },
          { name: "Meta", industry: "Social Media" },
          { name: "SpaceX", industry: "Aerospace" }
        ].map((c) => (
          <div key={c.name} style={{
            background: "none",
            borderRadius: "0.75rem",
            padding: "0.75rem 1.25rem",
            minWidth: 120,
            textAlign: "center",
            fontWeight: 500,
            color: "#3730a3",
            border: "1px solid #e0e7ff"
          }}>
            <div style={{ fontSize: "1.1rem" }}>{c.name}</div>
            <div style={{ fontSize: "0.95rem", color: "#6366f1" }}>{c.industry}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <a
          href="/companies"
          style={{
            background: "#6366f1",
            color: "#fff",
            padding: "0.85rem 2.2rem",
            borderRadius: "0.75rem",
            fontWeight: 700,
            fontSize: "1.15rem",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(99,102,241,0.10)",
            transition: "background 0.2s"
          }}
        >
          Start Exploring Companies →
        </a>
      </div>
    </div>
  );
}