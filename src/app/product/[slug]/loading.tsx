export default function ProductLoading() {
  return (
    <div className="container-lux py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="aspect-[4/5] shimmer" />
        <div className="space-y-6">
          <div className="h-6 w-24 shimmer" />
          <div className="h-12 w-3/4 shimmer" />
          <div className="h-6 w-1/2 shimmer" />
          <div className="h-24 w-full shimmer" />
          <div className="h-12 w-full shimmer" />
          <div className="h-12 w-full shimmer" />
        </div>
      </div>
    </div>
  );
}
