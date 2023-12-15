import { ProductInfo } from "@/containers/home";
import Template from "../template";

const Page = () => {
  return (
    <Template showHeader={true} showFooter={true}>
      <>
        <ProductInfo />
      </>
    </Template>
  );
};

export default Page;
