interface Props {
  length?: number;
  paddingTop?: number;
}

export default function StoreListSkeleton({ length = 1, paddingTop }: Props) {
  return (
    <div style={{ paddingTop }}>
      {Array.from({ length }).map((_, index) => (
        <div className="flex gap-2 *:animate-pulse *:rounded-xl relative mt-8 last:m-0" key={index}>
          <div className="w-[8rem] h-[8rem] bg-slate-400" />
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 h-full *:bg-slate-400 *:h-4 *:rounded-xl">
              <div className="w-20" />
              <div className="w-16" />
              <div className="w-14" />
              <div className="w-12" />
            </div>

            <div className="w-[8rem] h-4 bg-slate-400 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
