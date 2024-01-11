import Link from "next/link";
import Typography from "../Fonts/Typography";

const Logo = () => {
  return (
    <>
      <Link href="/" className="text-gray-700 grid">
        <Typography variant="h2">craaft</Typography>
      </Link>
    </>
  );
};

export default Logo;
