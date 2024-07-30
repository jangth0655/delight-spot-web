interface Props {
  type: 'lg' | 'md' | 'sm';
}

const styleMap = {
  sm: 'h-[0.0625rem]',
  md: 'h-[0.25rem]',
  lg: 'h-[0.5rem]',
};

export default function Divider({ type }: Props) {
  const style = styleMap[type];

  return <div data-testid="divider" className={`w-full bg-slate-S200 ${style}`}></div>;
}
