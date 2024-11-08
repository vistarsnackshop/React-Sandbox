// src/App.jsx
import React, { useState } from "react";
import ReadGemini from "./components/readGemini";
import WriteGemini from "./components/writeGemini";

const modules = [
  { id: 1, name: "Installation", content: '../components/readGemini.tsx' },
  { id: 2, name: "Read Gemini Data", content: <ReadGemini /> },
  { id: 3, name: "Write Gemini Data", content: <WriteGemini /> },
  { id: 4, name: "Read SQL Data", content: "Dive deeper in Module 3." },
  { id: 5, name: "Write SQL Data", content: "Dive deeper in Module 3." },
  { id: 6, name: "Import Excel Data", content: "Dive deeper in Module 3." },
  { id: 7, name: "Export Excel Data", content: "Dive deeper in Module 3." },
];

export default function App() {
  const [selectedModule, setSelectedModule] = useState(modules[0]);

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-600 text-white p-5 space-y-4">
        <h2 className="text-xl font-bold mb-4">Modules</h2>
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setSelectedModule(module)}
            className={`block w-full text-left px-4 py-2 rounded-md hover:bg-blue-700 ${
              selectedModule.id === module.id ? "bg-blue-700" : ""
            }`}
          >
            {module.name}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">{selectedModule.name}</h1>
        <p className="text-lg">{selectedModule.content}</p>
      </div>
    </div>
  );
}
