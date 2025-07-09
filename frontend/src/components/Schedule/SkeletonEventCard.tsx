const SkeletonEventCard = () => {
  return (
    <div className="bg-primary border-2 border-red rounded-xl shadow flex flex-col justify-between">
      <div className="flex flex-col h-[108px] p-4 gap-3">
        <div className="h-5 w-2/3 bg-slate-600 rounded animate-pulse" />
        <div className="h-6 w-full bg-slate-600 rounded animate-pulse" />
      </div>
      <div className="h-16 bg-secondary rounded-b-xl"></div>
    </div>
  )
}

export default SkeletonEventCard
