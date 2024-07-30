interface Props {
  children: React.ReactNode;
}

export default function MenuItem({ children }: Props) {
  return (
    <li className="text-body leading-body font-bold flex justify-center items-center h-12 group relative">
      <div className="hidden group-hover:block absolute left-0 rounded-full transition-all w-1 bg-system-S200 h-full" />
      {children}
    </li>
  );
}
