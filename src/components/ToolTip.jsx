import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Reusable Tooltip wrapper
const ToolTip = ({ id, children, content, place = "top" }) => {
  return (
    <>
      {/* Wrap the trigger element */}
      <span data-tooltip-id={id} data-tooltip-content={content}>
        {children}
      </span>

      {/* Tooltip itself */}
      <Tooltip id={id} place={place} className="!bg-primary !text-white !px-2 !py-1 !rounded-md !text-sm" />
    </>
  );
};

export {ToolTip};
