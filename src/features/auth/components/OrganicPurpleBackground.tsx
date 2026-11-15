export function OrganicPurpleBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none -z-10 bg-[#f8f6fe]">
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Latar Dasar Lembut (Base Light Lilac) */}
          <linearGradient id="bgBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#faf8fe" />
            <stop offset="50%" stopColor="#f4f0fe" />
            <stop offset="100%" stopColor="#ede6fc" />
          </linearGradient>

          {/* Gelombang Tengah Lembut */}
          <linearGradient id="wave1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ebe4fd" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#e5dcfa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ded3f9" stopOpacity="0.9" />
          </linearGradient>

          {/* Gelombang Bawah */}
          <linearGradient id="wave2Grad" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#e0d4fa" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#d9cbfa" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#d3c2f7" stopOpacity="0.9" />
          </linearGradient>

          {/* Halus Filter Bayangan */}
          <filter id="softWaveShadow" x="-5%" y="-5%" width="110%" height="120%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="16"
              floodColor="#6534d9"
              floodOpacity="0.03"
            />
          </filter>
        </defs>

        {/* 1. Latar Belakang Penuh */}
        <rect width="1440" height="900" fill="url(#bgBaseGrad)" />

        {/* 2. Gelombang 1 (Memanjang dari kiri tengah ke kanan) */}
        <path
          d="M -20 270
             C 180 280, 360 390, 700 380
             C 1040 370, 1240 310, 1460 330
             L 1460 920
             L -20 920 Z"
          fill="url(#wave1Grad)"
          filter="url(#softWaveShadow)"
        />

        {/* 3. Gelombang 2 (Aksen Lengkung Bawah) */}
        <path
          d="M -20 540
             C 260 520, 520 600, 800 590
             C 1080 580, 1260 530, 1460 545
             L 1460 920
             L -20 920 Z"
          fill="url(#wave2Grad)"
          filter="url(#softWaveShadow)"
        />
      </svg>
    </div>
  )
}

export default OrganicPurpleBackground
