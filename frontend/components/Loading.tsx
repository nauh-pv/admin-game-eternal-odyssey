import Image from "next/image";
import { ClipLoader } from "react-spinners";

export const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Logo Facebook */}
      <div className="flex flex-col items-center justify-center flex-1">
        <Image
          width={200}
          height={200}
          className="w-[150px] h-fit"
          alt="logo loading"
          src={"/assets/images/brand-logos/logoSingle.png"}
        />
      </div>
      <ClipLoader color="#2784c4" size={20} />
      <div className="mb-6 text-center text-gray-400 flex items-center gap-1">
        <p className="text-sm font-medium">from</p>
        <Image
          src={"/assets/images/brand-logos/logo.png"}
          alt="MekongAI Logo"
          width={100}
          height={100}
          className="w-fit h-[27px]"
        />
      </div>
    </div>
  );
};
