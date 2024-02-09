import { useRouter } from "next/navigation";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded' 

const SecondaryNav = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div className='flex flex-wrap mx-5 md:mx-20 md:px-1 lg:mx-7 xl:mx-14 max-w-fit '>
        <div className='w-full md:w-fit my-2'>
          <button
            onClick={goBack}
            className='text-black border font-Plus-Jakarta-Sans border-white flex gap-2 px-2 py-2 rounded-md '>
            <KeyboardBackspaceRoundedIcon />
            BACK
          </button>
        </div>
      </div>
    </>
  )
};

export default SecondaryNav;
