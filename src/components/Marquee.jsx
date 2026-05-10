/**
 * Pure-CSS dual-loop marquee. The track contains the children twice;
 * we translate -50% so the second copy seamlessly takes over.
 */
export default function Marquee({ children, className = '', reverse = false, speed = 40 }) {
  const items = [0, 1].map((i) => (
    <div key={i} className="flex shrink-0 items-center gap-12 pr-12">
      {children}
    </div>
  ))
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {items}
      </div>
    </div>
  )
}
