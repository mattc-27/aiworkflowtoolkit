"use client";
export default function ChangelogPage() {
  const items = [
    {
      date: "2025-08-27",
      title: "Model comparison in Token → Cost",
      body: "Compare estimated cost across models for the same request.",
    },
    {
      date: "2025-08-26",
      title: "Prompt Compression improvements",
      body: "Aggressive mode and bridge to cost calculator.",
    },
    {
      date: "2025-08-25",
      title: "Prompt → JSON Schema",
      body: "Describe fields in plain text and download a ready-to-use schema.",
    },
  ];
  return (
    <main id="main" className="container main">
      <h1 className="h1">Changelog</h1>
      <div className="card" style={{ marginTop: 16 }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: 14,
          }}
        >
          {items.map((i) => (
            <li key={i.title} className="chg">
              <div className="chg-date">{i.date}</div>
              <div className="chg-title">{i.title}</div>
              <p className="text-muted" style={{ marginTop: 4 }}>
                {i.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
