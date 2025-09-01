import Link from "next/link";

type Props = { href: string; title: string; desc: string; tag?: string };

export default function ToolCard({ href, title, desc, tag }: Props) {
  return (
    <Link href={href} className="card">
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
      >
        <h3 style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.3 }}>
          {title}
        </h3>
        {tag ? <span className="badge">{tag}</span> : null}
      </div>
      <p className="text-muted" style={{ marginTop: 8, fontSize: 14 }}>
        {desc}
      </p>
      <div className="text-muted" style={{ marginTop: 12, fontSize: 12 }}>
        Open tool →
      </div>
    </Link>
  );
}
