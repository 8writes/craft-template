import Skeleton from "@mui/material/Skeleton";

const Loading = ({ children, item, className }) => {
  return (
    <>
      {item ? (
        <>{children}</>
      ) : (
        <Skeleton animation="wave" variant="rectangular" className={className} />
      )}
    </>
  );
};

export default Loading;
