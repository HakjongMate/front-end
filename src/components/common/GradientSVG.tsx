import React from "react";

const GradientSVG: React.FC = () => (
  <svg width="0" height="0">
    <defs>
      <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#007BFF" />
        <stop offset="100%" stopColor="#0F4ABE" />
      </linearGradient>
    </defs>
  </svg>
);

export default GradientSVG;
