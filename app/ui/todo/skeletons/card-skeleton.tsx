export default function TodoCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="skeleton h-10 w-80"></div>
      <div className="skeleton h-10 w-80"></div>
      <div className="skeleton h-10 w-80"></div>
      <div className="skeleton h-10 w-80"></div>
      <div className="skeleton h-10 w-80"></div>
    </div>
  );
}
