type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};
export default function Section({
  title,
  subtitle,
  children,
  className,
}: Props) {
  return (
    <section className={className ?? ""}>
      <h2 className="h2">{title}</h2>
      {subtitle ? (
        <p className="text-muted" style={{ marginTop: 6 }}>
          {subtitle}
        </p>
      ) : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}
