interface Props {
  text: string;
  isRequired?: boolean;
  errorMessage?: string;
}

export default function FormLabel({ text, isRequired, errorMessage }: Props) {
  return (
    <div className="flex items-center gap-1">
      <label className="text-body-s leading-body text-slate-S400 md:text-body md:leading-body">{text}</label>
      {isRequired && <span className="text-system-S200 font-bold">﹡</span>}
      <p className="text-label leading-label text-system-S200 font-semibold">{errorMessage}</p>
    </div>
  );
}
