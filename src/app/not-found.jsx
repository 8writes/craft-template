
import { Typography } from "@/components";
import { ThemeButton } from "@/components/Buttons";

export default function NotFound() {
  return (
    <>
      <div className="flex justify-center bg-white min-h-screen">
        <div className="grid gap-5 justify-items-center text-center my-auto px-5">
          <Typography variant="h1">404</Typography>
          <Typography variant="h2">NOT FOUND</Typography>
          <Typography variant="p">
            The requested resources does not exist or has been moved.
          </Typography>{" "}
          <ThemeButton linkSrc="/" variant="outlined" className="normal">
            Return Home
          </ThemeButton>
        </div>
      </div>
    </>
  );
}
