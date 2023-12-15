import Cart from "@/containers/cart/cart";
import Template from "../template";

const Page = () => {
  return (
    <Template showHeader={true} showFooter={true}>
      <>
        <Cart />
      </>
    </Template>
  );
};

export default Page;
