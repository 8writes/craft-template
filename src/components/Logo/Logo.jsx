import { Typography } from "@mui/material";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href='/' className='text-gray-700 grid'>
        <Typography variant='h4'
          sx={{ textTransform: 'uppercase' }}>
          Storex
        </Typography>
      </Link>
    </>
  )
};

export default Logo;
