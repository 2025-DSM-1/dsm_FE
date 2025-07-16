import type { IconProps } from "./interface"

export const X = ({ size = 24, color = '#000', onClick }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" onClick={onClick}>
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.758 17.243 12 12l5.243 5.243m0-10.486L12 12 6.758 6.757" />
    </svg>
  )
}