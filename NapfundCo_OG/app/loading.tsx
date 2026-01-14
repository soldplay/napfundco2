export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-label="Seite wird geladen"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary-200" />
          <div className="absolute inset-2 animate-pulse rounded-full bg-primary-400" />
          <div className="absolute inset-4 rounded-full bg-primary-600" />
        </div>
        <p className="text-warmgray-600">Wird geladen...</p>
      </div>
    </div>
  )
}

