import Button from "@mui/material/Button";

const ThemeButton = ({ children, linkSrc, variant, style }) => {
  let className = "";

  switch (style) {
    case "theme":
      className = "";
      break;
    case "normal":
      className = "";
      break;
    default:
      break;
  }
  return (
    <>
      <Button href={linkSrc} variant={variant} className={className}>
        {children}
      </Button>
    </>
  );
};

export default ThemeButton;
