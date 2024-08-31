import { RotatingLines } from "react-loader-spinner";

export const LoadSpinner = () => {
  return (
    <RotatingLines
      strokeColor="blue"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  )
}
