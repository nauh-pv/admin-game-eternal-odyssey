import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PiCopySimpleLight } from "react-icons/pi";

import ManagerComponent from "@/components/ManagerComponent";
import { useDashboardContext } from "@/shared/context/DashboardContext";
import { UsersData } from "@/shared/types/commonTypes";
import { handleCopy } from "@/ultis/function";
import ModalUser from "@/modals/ModelUser";
import { useTranslation } from "react-i18next";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["user"])),
  },
});

const UsersManager = () => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [isOpenModalUser, setIsOpenModalUser] = useState<boolean>(false);

  const { t } = useTranslation("user");

  const [userData, setUserData] = useState<UsersData>({
    username: "",
    id: "",
    email: "",
    role: "",
    createdAt: "",
    status: false,
  });

  const dataContextApp = useDashboardContext();
  const { listUsers, setListUsers } = dataContextApp;

  const columnName = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "User ID",
      dataIndex: "id",
      render: (id: string) => {
        return (
          <p
            className="text-primary group flex items-center gap-2 cursor-pointer"
            onClick={() => handleCopy(id)}
          >
            {`${id.slice(0, 5)}...${id.slice(-5)}`}
            <PiCopySimpleLight className="group-hover:opacity-100 opacity-0" />
          </p>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email: string) => {
        return (
          <p
            className="text-primary group flex items-center gap-2 cursor-pointer"
            onClick={() => handleCopy(email)}
          >
            {email}
            <PiCopySimpleLight className="group-hover:opacity-100 opacity-0" />
          </p>
        );
      },
    },
    {
      title: "Username",
      dataIndex: "username",
      render: (username: string) => {
        return (
          <p
            className="text-primary group flex items-center gap-2 cursor-pointer"
            onClick={() => handleCopy(username)}
          >
            {username}
            <PiCopySimpleLight className="group-hover:opacity-100 opacity-0" />
          </p>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role: string) => {
        return role === "user" ? (
          <p className="uppercase">User</p>
        ) : (
          <p className="text-red uppercase">Admin</p>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        return status === "1" ? (
          <p className="text-green uppercase">Đang hoạt động</p>
        ) : (
          <p className="text-red uppercase">Đã khóa</p>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
          <button
            onClick={() => handleOpenModalUser(record)}
            aria-label="view"
            className="ti-btn ti-btn-icon ti-btn-wave !rounded-full !border-info/10 !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"
          >
            <i className="ri-eye-line"></i>
          </button>
          <button
            aria-label="delete"
            className="ti-btn ti-btn-icon ti-btn-wave !rounded-full !border-danger/10 !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ),
    },
  ];

  const handleUpdateListPage = () => {};

  const handleOpenModalUser = (user: UsersData) => {
    setIsOpenModalUser(true);
    setUserData(user);
  };

  const handleCloseModalUser = () => {
    setIsOpenModalUser(false);
  };

  return (
    <>
      <ManagerComponent
        {...{
          list: listUsers,
          columnName,
          componentName: "Users",
          nameButton: "",
          setUserData,
          handleUpdateListPage,
          isLoadingUpdate,
        }}
      />
      <ModalUser
        {...{
          isOpenModalUser: isOpenModalUser,
          handleCloseModalUser,
          userData,
          setUserData,
          t,
        }}
      />
    </>
  );
};

UsersManager.layout = "Contentlayout";
export default UsersManager;
