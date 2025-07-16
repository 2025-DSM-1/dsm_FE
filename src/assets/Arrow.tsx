import type { IconProps } from "./interface";

interface ArrowProps extends IconProps {
  rotate?: "top" | "bottom" | "left" | "right";
}

const rotationAngles: { [key: string]: string } = {
  right: "90",
  top: "0",
  bottom: "180",
  left: "-90",
};

export const Arrow = ({ size = 24, color = "#000", rotate = 'top', onClick }: ArrowProps) => {
  const rotation = rotationAngles[rotate] || rotationAngles["top"];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path fill={color} fillRule="evenodd" d="M7.293 14.707a1 1 0 0 0 1.414 0L12 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414l-4-4a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 0 1.414Z" clipRule="evenodd" />
    </svg>
  )
}