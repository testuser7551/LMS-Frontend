import React from "react";

const Progress = ({ percentage }) => {
  return (
    <div
      className="p-8 rounded-2xl shadow-sm w-full  mx-auto xl:px-30 lg:px-20 md:px-10"
      style={{ backgroundColor: "var(--color-bgcolor)" }}
    >
      {/* Header with percentage */}
      <div className="flex justify-between items-center mb-4">
        <h3
          className="font-semibold text-lg"
          style={{ color: "var(--color-headtext)" }}
        >
          Course Progress
        </h3>
        <span className="font-semibold" style={{ color: "var(--color-text)" }}>
          {percentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="w-full rounded-full h-3 mb-3"
        style={{ backgroundColor: "var(--color-secondarybgcolor)" }}
      >
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: "var(--color-primary)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
