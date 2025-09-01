// components/ToolShell.tsx
export default function ToolShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="tool container">
      <header className="tool-header">
        <h1 className="h1">{title}</h1>
        {subtitle && (
          <p className="help" style={{ marginTop: 4 }}>
            {subtitle}
          </p>
        )}
      </header>
      {children}
    </div>
  );
}
