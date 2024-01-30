import ClockLoader from "react-spinners/ClockLoader";

export const PostLoader = () => {
  const cssOverride = {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return <ClockLoader color="black" cssOverride={cssOverride} size={50} />;
};
