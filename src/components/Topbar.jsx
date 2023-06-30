import Image from "next/image";
import cadt from "./../../public/cadt.png";
const Topbar = () => {
  return (
    <div className=" flex overflow-hidden bg-gray-100 px-6 py-2.5 sm:px-3.5 md:px-7 ">
      <div className="w-64 sm:w-96">
        <Image src={cadt}></Image>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          style={{ color: "#182c4c" }}
        >
          <span className="font-bold border border-grey-50 rounded-md border-[2px] p-1 sm:p-3">
            Our Team
          </span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
