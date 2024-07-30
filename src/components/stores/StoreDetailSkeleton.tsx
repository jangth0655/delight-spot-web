export default function StoreDetailSkeleton() {
  return (
    <div className="pt-[5rem] *:animate-pulse">
      <div className="flex flex-col gap-4 *:bg-slate-400 *:rounded-xl">
        <div className="w-full h-9" />
        <div className="w-full h-[22.5rem]" />
        <div className="w-24 h-8" />
        <div className="w-24 h-8" />
        <div className="w-3/4 h-8" />
      </div>
      <div />
      <div className="flex flex-col gap-2 mt-10 *:rounded-xl">
        <div className="w-24 h-8 bg-slate-400" />
        <div className="h-8 bg-slate-400" />
        <div className="h-8 bg-slate-400" />
        <div className="h-8 bg-slate-400" />
        <div className="h-8 bg-slate-400" />
        <div className="h-8 bg-slate-400" />
        <div className="h-8 bg-slate-400" />
      </div>
    </div>
  );
}
