import React from 'react';

/**
 * ShopSphereLogo
 * Props:
 *   height       — overall height in px (default 40)
 *   showWordmark — show text beside icon (default true)
 *   theme        — 'light' (dark text) | 'dark' (white text)
 *   className    — extra classes on wrapper
 */
const ShopSphereLogo = ({
  height = 40,
  showWordmark = true,
  theme = 'light',
  className = '',
}) => {
  const iconSize = height;
  const gap = Math.round(height * 0.28);
  const fontSize = Math.round(height * 0.58);

  // wordmark colors
  const shopColor  = theme === 'dark' ? '#ffffff' : '#1E293B';
  const sphereColor = '#16A34A';

  return (
    <div
      className={`flex items-center select-none ${className}`}
      style={{ gap }}
    >
      {/* ── Bag icon (inline SVG) ── */}
      <svg
        width={iconSize * 0.88}
        height={iconSize}
        viewBox="0 0 60 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ss-grad" x1="0" y1="0" x2="60" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
        </defs>

        {/* Handle */}
        <path
          d="M15 32 C15 14 45 14 45 32"
          stroke="url(#ss-grad)"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Bag body */}
        <rect x="3" y="28" width="54" height="38" rx="12" fill="url(#ss-grad)" />

        {/* White S letterform */}
        <text
          x="30"
          y="55"
          textAnchor="middle"
          fill="white"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="900"
          fontSize="27"
          letterSpacing="-0.5"
        >
          S
        </text>

        {/* Leaf at bottom of bag */}
        <ellipse
          cx="13"
          cy="62"
          rx="7"
          ry="3.5"
          fill="white"
          opacity="0.75"
          transform="rotate(-35 13 62)"
        />
      </svg>

      {/* ── Wordmark ── */}
      {showWordmark && (
        <span
          style={{
            fontSize,
            fontWeight: 900,
            lineHeight: 1,
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            letterSpacing: '-0.03em',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* "Shop" */}
          <span style={{ color: shopColor }}>Shop</span>

          {/* "sphere" with tiny leaf above S */}
          <span style={{ color: sphereColor, position: 'relative' }}>
            {/* Leaf above S */}
            <svg
              style={{
                position: 'absolute',
                top: -Math.round(fontSize * 0.38),
                left: 0,
                width: Math.round(fontSize * 0.32),
                height: Math.round(fontSize * 0.32),
                overflow: 'visible',
              }}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 11 C6 11 1 7 1 4 C1 1.5 3.5 0 6 2 C8.5 0 11 1.5 11 4 C11 7 6 11 6 11Z"
                fill="#16A34A"
              />
            </svg>
            sphere
          </span>
        </span>
      )}
    </div>
  );
};

export default ShopSphereLogo;
