import { FC } from "react";

const RecyclingSVG: FC<{ width?: string; fill?: string }> = ({ width, fill }) => {
  return (
    <svg
      width={width?width:"800px"}
      height={width?width:"800px"}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M20.285 34.582l6.094 3.52l-8.031-14.238L2 24.027l6.098 3.518l-4.894 8.475c-.496.858-1.018 2.248-.294 3.504l8.308 14.387c1.488 2.578 4.08 2.563 5.957 2.563h13.278V41.055H16.547l3.738-6.473"
        fill={fill?fill:"#000"}
      ></path>
      <path
        d="M60.567 32.636l-6.64-11.499l-13.353 7.708l6.952 12.042l-7.473-.001v-7.034L31.74 47.925L40.057 62l-.002-7.039h9.783c.992 0 2.458-.243 3.182-1.497l8.307-14.387c1.487-2.58.179-4.815-.76-6.441"
        fill={fill?fill:"#000"}
      ></path>
      <path
        d="M32.563 13.044l3.735 6.474l-6.093 3.52l16.347.161l8.031-14.24l-6.095 3.521l-4.891-8.473C43.1 3.148 42.156 2 40.709 2H24.096c-2.978 0-4.261 2.252-5.198 3.878l-6.64 11.499l13.353 7.709l6.952-12.042"
        fill={fill?fill:"#000"}
      ></path>
    </svg>
  );
};

export default RecyclingSVG;
