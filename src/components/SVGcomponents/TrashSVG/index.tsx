import { FC } from "react";

const TrashSVG: FC<{ width?: string; strokeColor?: string }> = ({
  width,
  strokeColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "36"}
      height={width ? width : "36"}
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor || "#000"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
};

export default TrashSVG;
