import Link from "next/link";
import { Typography } from "@/components";

const Footer = () => {
  return (
    <>
      <section className="flex justify-center py-10 bg-gray-100 text-gray-700">
        <Typography variant="p.medium">Copyright © 2023.</Typography>
        <Typography variant="p.medium">
          &nbsp; Built by <Link href="https://twitter.com/8mmnuel">eight.</Link>{" "}
        </Typography>
      </section>
    </>
  );
};

export default Footer;
