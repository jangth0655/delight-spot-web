interface Props {
  title?: string;
  custom?: React.ReactNode;
  height?: number | string;
}

export default function EmptyNotice({ custom, title, height }: Props) {
  return (
    <div
      style={{ height }}
      className="flex flex-col items-center justify-center gap-2 text-h4 leading-h4 font-semibold text-slate-S800 border rounded-lg p-4"
    >
      <h1>{title ?? '내용이 없어요.'}</h1>
      <div>{custom}</div>
    </div>
  );
}
