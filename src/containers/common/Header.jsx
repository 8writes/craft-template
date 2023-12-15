import MobileNavbar from "./MobileNav";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <section>
        <Navbar />
        <MobileNavbar />
      </section>
    </>
  );
};

export default Header;
