import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearAccessToken } from "@/shared/redux/authSlice";
import { useRouter } from "next/router";
import { message } from "antd";
import { postLogout } from "@/services/apiServices";
import { RootState } from "@/shared/redux/store";
interface BadgeProps {
  text: string;
  color: string;
  bgColor: string;
}

interface DropdownItem {
  href: string;
  icon: string;
  label: string;
  badge?: BadgeProps;
}

interface ProfileDropdownProps {
  dropdownItems: DropdownItem[];
}

const Badge = ({ text, color, bgColor }: BadgeProps) => (
  <span
    className={`!py-1 !px-[0.45rem] !font-semibold !rounded-sm ${color} text-[0.75em] ${bgColor} ms-auto`}
  >
    {text}
  </span>
);

const ProfileDropdown = ({ dropdownItems }: ProfileDropdownProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const res = await postLogout();
      if (res.status === 200) {
        dispatch(clearAccessToken());
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("listConfig");
        localStorage.removeItem("listProcedure");
        localStorage.removeItem("listIdentity");
        localStorage.removeItem("listPage");
        router.push("/sign-in");
        message.success("Logout success.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="hs-dropdown-menu ti-dropdown-menu !-mt-3 border-0 w-[11rem] !p-0 border-defaultborder hidden main-header-dropdown pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
      aria-labelledby="dropdown-profile"
    >
      <ul className="text-defaulttextcolor font-medium dark:text-[#8c9097] dark:text-white/50">
        {dropdownItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex"
            >
              <i
                className={`${item.icon} text-[1.125rem] me-2 opacity-[0.7]`}
              ></i>
              {item.badge && (
                <Badge
                  text={item.badge.text}
                  color={item.badge.color}
                  bgColor={item.badge.bgColor}
                />
              )}
            </Link>
          </li>
        ))}
        <li>
          <button
            className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex"
            onClick={handleLogOut}
          >
            <i className="ti ti-logout text-[1.125rem] me-2 opacity-[0.7]"></i>
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
