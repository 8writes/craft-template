const Typography = ({ variant, children }) => {
  let className = "";

  switch (variant) {
    case "h1":
      className =
        "font-Plus-Jakarta-Sans   text-[2rem] md:text-[4rem] font-bold leading-[1.2] md:leading-none";
      break;
    case "h2":
      className =
        "font-Plus-Jakarta-Sans   text-2xl md:text-[2rem] font-bold md:leading-tight";
      break;
    case "p":
      className =
        "font-montserrat   text-base md:text-lg leading-loose-light md:leading-loose-strong";
      break;
    case "p.medium":
      className =
        "font-montserrat font-medium text-[0.8125rem]   md:text-sm leading-loose-strong md:leading-loose-strong";
      break;
    case "p.link":
      className =
        "font-montserrat hover:text-purple-800 font-medium text-base md:text-base leading-loose-light md:leading-loose-strong";
      break;
    default:
      break;
  }

  return (
    <>
      <span className={className}>{children}</span>
    </>
  );
};

export default Typography;
