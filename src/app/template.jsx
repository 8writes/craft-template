import { Footer, Header } from "@/containers/common";

export default function Template({ showHeader, children, showFooter }) {
  return (
    
    <>
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}
