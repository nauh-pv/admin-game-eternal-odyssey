import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearAccessToken } from "@/shared/redux/authSlice";
import { useRouter } from "next/router";
import { message } from "antd";
import { postLogout } from "@/services/apiServices";
import store, { RootState } from "@/shared/redux/store";
import { auth } from "@/ultis/firebase";
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

  const handleLogout = async () => {
    try {
      await auth.signOut();
      store.dispatch(clearAccessToken());
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      window.location.href = "/";
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    } finally {
      message.success("Đăng xuất thành công");
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
            onClick={handleLogout}
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
