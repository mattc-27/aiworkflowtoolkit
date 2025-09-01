// apps/tools-next/components/PageTitle.tsx
type Props = { title: string; lead?: string; cta?: React.ReactNode };
export default function PageTitle({ title, lead, cta }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {title}
        </h1>
        {lead ? <p className="muted mt-2 max-w-2xl leading-7">{lead}</p> : null}
      </div>
      {cta ? <div className="shrink-0">{cta}</div> : null}
    </div>
  );
}
