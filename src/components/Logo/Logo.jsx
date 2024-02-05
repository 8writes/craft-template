import Link from "next/link";
import Typography from "../Fonts/Typography";

const Logo = () => {

  const subdomain = window.location.hostname.split('.')[0]

  return (
    <>
      <Link href='/' className='text-gray-700 grid'>
        <Typography variant='h2'>{subdomain}</Typography>
      </Link>
    </>
  )
};

export default Logo;
