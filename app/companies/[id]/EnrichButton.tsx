"use client";

import { useState } from "react";

export default function EnrichButton({ website }: { website: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEnrich = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: website })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to enrich");
      }
      const data = await res.json();
      setResult({
        summary: data.summary || "",
        whatTheyDo: data.whatTheyDo || "",
        keywords: data.keywords || [],
        signals: data.signals || [],
        sources: data.sources || [],
        timestamp: new Date().toLocaleString(),
      });
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <button
        style={{
          padding: "0.6rem 1.5rem",
          fontSize: "1rem",
          borderRadius: 6,
          border: "none",
          background: loading ? "#888" : "#222",
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          minWidth: 120,
        }}
        onClick={handleEnrich}
        disabled={loading}
      >
        {loading ? "Enriching..." : "Enrich"}
      </button>
      {loading && (
        <div style={{ marginTop: 12 }}>
          <span className="loader" /> Loading...
        </div>
      )}
      {error && (
        <div style={{ color: "#b91c1c", marginTop: 12 }}>{error}</div>
      )}
      {result && (
        <div style={{ marginTop: 24, background: "#f3f4f6", borderRadius: 8, padding: 16 }}>
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Summary</h3>
          <div style={{ marginBottom: 12 }}>{result.summary}</div>
          <h4 style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>What they do</h4>
          <div style={{ marginBottom: 8 }}>{result.whatTheyDo || "-"}</div>
          <h4 style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>Keywords</h4>
          <div style={{ marginBottom: 8 }}>
            {Array.isArray(result.keywords) ? result.keywords.join(", ") : result.keywords || "-"}
          </div>
          <h4 style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>Signals</h4>
          <div style={{ marginBottom: 8 }}>
            {Array.isArray(result.signals) ? result.signals.join(", ") : result.signals || "-"}
          </div>
          <h4 style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>Sources</h4>
          <div style={{ marginBottom: 8 }}>
            {Array.isArray(result.sources) ? result.sources.join(", ") : result.sources || "-"}
          </div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 10 }}>Timestamp: {result.timestamp}</div>
        </div>
      )}
    </div>
  );
}