interface Props {
  title: string;
}

export default function StoreDetailSubtitle({ title }: Props) {
  return <p className="text-h4 leading-h4 font-bold">{title}</p>;
}
