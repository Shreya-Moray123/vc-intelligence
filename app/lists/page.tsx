"use client";
import { useState, useEffect } from "react";

interface Company {
  id: string;
  name: string;
}

interface List {
  id: string;
  name: string;
  companies: Company[];
}

export default function ListsPage() {
  const [lists, setLists] = useState<List[]>([]);
  const [newListName, setNewListName] = useState("");

  // Load lists from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("vc_lists");
    if (stored) setLists(JSON.parse(stored));
  }, []);

  // Save lists to localStorage
  useEffect(() => {
    localStorage.setItem("vc_lists", JSON.stringify(lists));
  }, [lists]);

  function createList() {
    if (!newListName.trim()) return;
    setLists([
      ...lists,
      { id: Date.now().toString(), name: newListName, companies: [] },
    ]);
    setNewListName("");
  }

  function addCompany(listId: string, company: Company) {
    setLists(lists.map(list =>
      list.id === listId
        ? { ...list, companies: [...list.companies, company] }
        : list
    ));
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Lists</h1>
      <div className="mb-6">
        <input
          type="text"
          value={newListName}
          onChange={e => setNewListName(e.target.value)}
          placeholder="New list name"
          className="border p-2 mr-2"
        />
        <button
          onClick={createList}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create List
        </button>
      </div>
      {lists.length === 0 ? (
        <p>No lists yet. Create one above!</p>
      ) : (
        <ul>
          {lists.map(list => (
            <li key={list.id} className="mb-4 border p-4 rounded">
              <div className="font-semibold mb-2">{list.name}</div>
              <div>
                <strong>Companies:</strong>
                <ul className="ml-4">
                  {list.companies.length === 0 ? (
                    <li className="text-gray-500">No companies saved.</li>
                  ) : (
                    list.companies.map(c => (
                      <li key={c.id}>{c.name}</li>
                    ))
                  )}
                </ul>
              </div>
              {/* Example add company UI */}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Company name"
                  className="border p-1 mr-2"
                  id={`company-input-${list.id}`}
                />
                <button
                  onClick={() => {
                    const input = document.getElementById(`company-input-${list.id}`) as HTMLInputElement;
                    if (input && input.value.trim()) {
                      addCompany(list.id, {
                        id: Date.now().toString(),
                        name: input.value.trim(),
                      });
                      input.value = "";
                    }
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Save Company
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
