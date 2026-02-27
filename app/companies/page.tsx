"use client";
import { companies as companiesData } from "../../data/companies";
import React, { useState, useEffect } from "react";
import Link from "next/link";

type Company = {
  id: string;
  name: string;
  website: string;
  industry: string;
};

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      try {
        setCompanies(companiesData);
        setLoading(false);
      } catch (e) {
        setError("Failed to load companies. Please try again later.");
        setLoading(false);
      }
    }, 700);
  }, []);

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "2.5rem 0 0 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 800,
          marginBottom: "1.5rem",
          color: "#3730a3",
          letterSpacing: "-0.02em",
        }}
      >
        Companies
      </h1>

      <input
        type="text"
        placeholder="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "0.75rem 1.25rem",
          marginBottom: "2rem",
          width: "100%",
          maxWidth: 420,
          border: "1.5px solid #c7d2fe",
          borderRadius: 10,
          fontSize: "1.08rem",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(99,102,241,0.04)",
          outline: "none",
          transition: "border 0.2s",
        }}
      />

      {loading ? (
        <div
          style={{
            margin: "2.5rem 0",
            color: "#6366f1",
            fontWeight: 600,
            fontSize: "1.2rem",
          }}
        >
          Loading companies...
        </div>
      ) : error ? (
        <div
          style={{
            margin: "2.5rem 0",
            color: "#dc2626",
            fontWeight: 600,
            fontSize: "1.2rem",
            background: "#fee2e2",
            padding: "1rem 2rem",
            borderRadius: 8,
          }}
        >
          {error}
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: 900,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(99,102,241,0.07)",
            padding: "2rem 2.5rem",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "1.08rem",
            }}
          >
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={{ textAlign: "left", padding: "12px 10px", color: "#6366f1" }}>
                  Name
                </th>
                <th style={{ textAlign: "left", padding: "12px 10px", color: "#6366f1" }}>
                  Website
                </th>
                <th style={{ textAlign: "left", padding: "12px 10px", color: "#6366f1" }}>
                  Industry
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      textAlign: "center",
                      padding: "2.5rem 0",
                      color: "#64748b",
                      fontStyle: "italic",
                    }}
                  >
                    No companies found.
                  </td>
                </tr>
              ) : (
                filtered.map((company, idx) => (
                  <tr
                    key={company.id}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#eef2ff")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background =
                        idx % 2 === 0 ? "#fff" : "#f9fafb")
                    }
                    style={{
                      background: idx % 2 === 0 ? "#fff" : "#f9fafb",
                      transition: "background 0.18s",
                      cursor: "pointer",
                    }}
                  >
                    <td style={{ padding: "12px 10px" }}>
                      <Link
                        href={`/companies/${company.id}`}
                        style={{
                          color: "#4f46e5",
                          textDecoration: "underline",
                          fontWeight: 600,
                        }}
                      >
                        {company.name}
                      </Link>
                    </td>

                    <td style={{ padding: "12px 10px" }}>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#0ea5e9",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {company.website.replace(/^https?:\/\//, "")}
                      </a>
                    </td>

                    <td style={{ padding: "12px 10px", color: "#334155" }}>
                      {company.industry}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}