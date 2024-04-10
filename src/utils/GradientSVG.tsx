function GradientSVG() {
    const idCSS = "gradient";
    const gradientTransform = `rotate(90)`;
    return (
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={idCSS} gradientTransform={gradientTransform}>
            <stop offset="16.29%" stopColor="#1d4ed8" />
            <stop offset="85.56%" stopColor="#7e22ce" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  
  export default GradientSVG;
  