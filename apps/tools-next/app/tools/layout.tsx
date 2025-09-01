import "../globals.css";
import "./style.css";
import ToolsClientLayout from "./ToolsClientLayout";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // SERVER COMPONENT – keeps CSS imports and wraps with client-only layer if needed
  return (
    <div className="container main">
      <ToolsClientLayout>{children}</ToolsClientLayout>
    </div>
  );
}
