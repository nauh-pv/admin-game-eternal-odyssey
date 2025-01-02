import Image from "next/image";
import Link from "next/link";
import data from "@/shared/data/landing.json";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import dataHeader from "@/shared/data/header.json";
import ProfileDropdown from "@/components/ProfileDropdown";
import { basePath } from "@/next.config";
import { TbMessageChatbot } from "react-icons/tb";
import { SlSocialFacebook } from "react-icons/sl";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineNavigateNext } from "react-icons/md";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userFunctions = [
    {
      name: "Chatbot PDF",
      path: "/chatbot/chatbot-pdf",
      icon: <TbMessageChatbot size={20} />,
    },
    {
      name: "Social Media Bot",
      path: "/user-dashboard",
      icon: <SlSocialFacebook size={20} />,
    },
    {
      name: "Generate Image",
      path: "/user-function-3",
      icon: <CiImageOn size={20} />,
    },
  ];

  return (
    <aside className="app-sidebar sticky !topacity-0" id="sidebar">
      <div className="container-xl xl:!p-0">
        <div className="main-sidebar mx-0">
          <nav className="main-menu-container nav nav-pills flex-column sub-open">
            <div className="landing-logo-container my-auto hidden lg:block">
              <div className="responsive-logo">
                <Link href="/" aria-label="Brand">
                  <Image
                    src="/assets/images/brand-logos/logo.png"
                    alt="logo"
                    width={150}
                    height={150}
                  />
                </Link>
              </div>
            </div>
            <div className="slide-left hidden" id="slide-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
            </div>
            <ul className="main-menu">
              {data.itemMenuHeader &&
                data.itemMenuHeader.map((item, index) => {
                  return (
                    <li className="slide" key={index}>
                      <Link className="side-menu__item" href={item.path}>
                        <span className="side-menu__label">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              <li className="slide relative group">
                <Link className="side-menu__item" href={"/user-dashboard"}>
                  <span className="side-menu__label">Sản phẩm</span>
                </Link>
                <ul className="absolute left-[900px] top-full hidden hover:block group-hover:block bg-bgDark shadow-lg rounded-lg p-4 space-y-1 z-10 transition-all duration-200 ease-in-out bg-opacity-90">
                  <div className="bg-bgDarkReduce pl-4 pr-8 py-4 rounded-lg">
                    <div className="text-blueColor uppercase text-[10px] mb-3">
                      Sản phẩm
                    </div>
                    {userFunctions.map((func, idx) => (
                      <li
                        key={idx}
                        className={`flex items-center ${
                          userFunctions.length === idx + 1 ? "mb-0" : "mb-4"
                        } custom-hover`}
                      >
                        <div className="p-1 text-greenColorShadow rounded-sm bg-white bg-opacity-10 icon-hover">
                          {func.icon}
                        </div>
                        <Link
                          href={func.path}
                          className="block text-xs text-textColorDark hover:bg-bgDarkReduce rounded font-extrabold ml-2"
                        >
                          {func.name}
                        </Link>
                        <div className="w-6 pl-[2px] next-icon-hover">
                          <MdOutlineNavigateNext />
                        </div>
                      </li>
                    ))}
                  </div>
                </ul>
              </li>
            </ul>
            <div className="slide-right hidden" id="slide-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
              </svg>
            </div>
            <div className="lg:flex hidden space-x-2 rtl:space-x-reverse">
              {accessToken && user ? (
                <div className="header-element md:!px-[0.65rem] px-2 hs-dropdown !items-center ti-dropdown [--placement:bottom-left]">
                  <button
                    id="dropdown-profile"
                    type="button"
                    className="hs-dropdown-toggle ti-dropdown-toggle !gap-2 !p-0 flex-shrink-0 sm:me-2 me-0 !rounded-full !shadow-none text-xs align-middle !border-0 !shadow-transparent "
                  >
                    <Image
                      width={32}
                      height={32}
                      className="inline-block rounded-full "
                      src={`${
                        process.env.NODE_ENV === "production" ? basePath : ""
                      }/assets/images/apps/user.png`}
                      alt="Image Description"
                    />
                  </button>
                  <div className="md:block hidden dropdown-profile">
                    <p className="font-semibold mb-0 leading-none text-[#536485] text-[0.813rem] ">
                      {user.user?.name}
                    </p>
                    <span className="opacity-[0.7] font-normal text-[#536485] block text-[0.6875rem] ">
                      {user.user?.role}
                    </span>
                  </div>
                  <ProfileDropdown
                    {...{ dropdownItems: dataHeader.dropdownItems }}
                  />
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="ti-btn w-[6.375rem] ti-btn-primary-full m-0 p-2"
                >
                  Sign In
                </Link>
              )}
              {/* <Link
                aria-label="anchor"
                href="#!"
                className="ti-btn m-0 p-2 px-3 ti-btn-light !font-medium"
                data-hs-overlay="#hs-overlay-switcher"
              >
                <i className="ri-settings-3-line animate-spin-slow"></i>
              </Link> */}
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
};
export default Header;
