interface PolaroidProps {
  accentColor: string
  className?: string
  photoAlt: string
  photoUrl?: string
}

export function Polaroid({
  accentColor,
  className = '',
  photoAlt,
  photoUrl,
}: PolaroidProps) {
  return (
    <figure
      className={`relative m-0 aspect-[0.9] bg-[#fffdf8] p-[5%] pb-[17%] shadow-[0_4px_10px_rgb(64_51_45_/_16%)] ring-1 ring-[#eadfd2] ${className}`}
    >
      <div className="aspect-square w-full overflow-hidden rounded-[2%] bg-[#f3ebe3] shadow-inner">
        {photoUrl && (
          <img
            alt={photoAlt}
            className="size-full object-cover object-center"
            draggable="false"
            src={photoUrl}
          />
        )}
      </div>

      <div
        aria-hidden="true"
        className="absolute -top-[8%] left-1/2 flex h-[13%] w-[48%] -translate-x-1/2 items-center justify-center shadow-sm"
        style={{
          backgroundColor: accentColor,
          clipPath: 'polygon(3% 7%, 97% 0, 100% 88%, 95% 100%, 4% 94%, 0 12%)',
        }}
      >
        <svg
          className="h-[62%] w-[82%]"
          fill="none"
          viewBox="0 0 120 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10C7 4 15 3 18 9C21 3 29 4 29 10C29 17 18 23 18 23S7 17 7 10Z"
            stroke="#FFFDF8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <path
            d="M47 13C47 8 53 7 56 12C59 7 65 8 65 13C65 19 56 24 56 24S47 19 47 13Z"
            stroke="#FFFDF8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <path
            d="M84 8C84 2 92 2 95 8C98 2 106 2 106 8C106 15 95 21 95 21S84 15 84 8Z"
            stroke="#FFFDF8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </svg>
      </div>

      <svg
        aria-hidden="true"
        className="absolute bottom-[4.5%] left-[7%] h-[11%] w-[15%]"
        fill={accentColor}
        viewBox="0 0 64 52"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="11" cy="19" rx="6" ry="8" />
        <ellipse cx="25" cy="10" rx="6" ry="8" />
        <ellipse cx="40" cy="11" rx="6" ry="8" />
        <ellipse cx="52" cy="20" rx="5" ry="7" />
        <path d="M9 41C9 31 18 23 30 23C42 23 50 31 49 41C48 49 40 51 31 47C22 52 9 49 9 41Z" />
      </svg>

      <svg
        aria-hidden="true"
        className="absolute -top-[2%] -right-[9%] h-[19%] w-[20%]"
        fill="none"
        viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg"
      >
      </svg>
    </figure>
  )
}
