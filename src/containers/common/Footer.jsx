import Link from "next/link";
import { Typography } from "@/components";

const Footer = () => {
  return (
    <>
      <section className="flex justify-center py-10 bg-slate-100 text-gray-700">
        <Typography variant="p.medium">Copyright © 2023.</Typography>
        <Typography variant="p.medium">
          &nbsp; powered by <Link href="https://twitter.com/8mmnuel">craaft.</Link>{" "}
        </Typography>
      </section>
    </>
  );
};

export default Footer;
