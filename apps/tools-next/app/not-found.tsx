import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container main" style={{ textAlign: "center" }}>
      <div className="card" style={{ padding: "40px 24px" }}>
        <Compass size={36} aria-hidden="true" />
        <h1 className="h1" style={{ marginTop: 12 }}>
          Page not found
        </h1>
        <p className="text-muted" style={{ marginTop: 8 }}>
          We couldn’t find what you’re looking for.
        </p>
        <div style={{ marginTop: 16 }}>
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link
            href="/tools"
            className="btn btn-secondary"
            style={{ marginLeft: 10 }}
          >
            View Tools
          </Link>
        </div>
      </div>
    </main>
  );
}
