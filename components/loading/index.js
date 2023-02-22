import React from "react";

function Loading({ width = 50, height = 50 }) {
  return (
    <div id="splash-screen" className="splash-screen">
      <svg
        width={width}
        height={height}
        viewBox="0 0 50 50"
        className="splash-spinner"
      >
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
}

export default Loading;
