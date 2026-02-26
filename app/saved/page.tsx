"use client";
import { useState, useEffect } from "react";

interface SearchFilter {
  id: string;
  name: string;
  filters: string;
}

export default function SavedPage() {
  const [saved, setSaved] = useState<SearchFilter[]>([]);
  const [name, setName] = useState("");
  const [filters, setFilters] = useState("");

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("vc_saved_searches");
    if (stored) setSaved(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("vc_saved_searches", JSON.stringify(saved));
  }, [saved]);

  function saveSearch() {
    if (!name.trim() || !filters.trim()) return;
    setSaved([
      ...saved,
      { id: Date.now().toString(), name: name.trim(), filters: filters.trim() },
    ]);
    setName("");
    setFilters("");
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Saved Searches</h1>
      <div className="mb-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Search name"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={filters}
          onChange={e => setFilters(e.target.value)}
          placeholder="Filters (e.g. industry:AI, location:NY)"
          className="border p-2 mr-2"
        />
        <button
          onClick={saveSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Search
        </button>
      </div>
      {saved.length === 0 ? (
        <p>No saved searches yet.</p>
      ) : (
        <ul>
          {saved.map(s => (
            <li key={s.id} className="mb-4 border p-4 rounded">
              <div className="font-semibold">{s.name}</div>
              <div className="text-gray-700 text-sm">{s.filters}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
