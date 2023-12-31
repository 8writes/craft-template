
import Template from "./template";
import Products from "@/containers/home/Products";

export default function Page() {

  return (
    <Template showHeader={true} showFooter={true}>
      <main className='bg-white pt-36 min-h-screen'>
        <Products />
      </main>
    </Template>
  )
}
