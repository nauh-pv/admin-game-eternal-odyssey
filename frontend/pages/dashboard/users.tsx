import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PiCopySimpleLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";

import ManagerComponent from "@/components/ManagerComponent";
import { useDashboardContext } from "@/shared/context/DashboardContext";
import { UsersData } from "@/shared/types/commonTypes";
import { handleCopy } from "@/ultis/function";
import ModalUser from "@/modals/ModelUser";
import {
  deleteAUser,
  patchUpdateUserDetails,
} from "@/services/apiServicesAdmin";
import { message } from "antd";
import ModalConfirm from "@/modals/ModalConfirm";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["user", "commonModal"])),
  },
});

const UsersManager = () => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [isOpenModalUser, setIsOpenModalUser] = useState<boolean>(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<UsersData>({
    username: "",
    id: "",
    email: "",
    role: "",
    createdAt: "",
    status: "0",
  });
  const [userDataBefore, setUserDataBefore] = useState<UsersData>({
    username: "",
    id: "",
    email: "",
    role: "",
    createdAt: "",
    status: "0",
  });

  const { t } = useTranslation(["user", "commonModal"]);

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
            onClick={() => handleOpenModalConfirmDelete(record)}
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
    setUserDataBefore(user);
  };

  const handleCloseModalUser = () => {
    setIsOpenModalUser(false);
  };

  const checkDataUserUpdate = () => {
    let userDataUpdate = {};
    if (userDataBefore.username !== userData.username)
      userDataUpdate = { ...userDataUpdate, username: userData.username };
    if (userDataBefore.email !== userData.email)
      userDataUpdate = { ...userDataUpdate, email: userData.email };
    if (userDataBefore.role !== userData.role)
      userDataUpdate = { ...userDataUpdate, role: userData.role };
    if (userDataBefore.status !== userData.status)
      userDataUpdate = { ...userDataUpdate, status: userData.status };
    return userDataUpdate;
  };

  const handleUpdateUserDetails = async () => {
    try {
      const userDataUpdate = checkDataUserUpdate();
      if (Object.keys(userDataUpdate).length === 0) {
        message.error("No data change to update");
        return;
      }

      const res = await patchUpdateUserDetails(userData.id, userDataUpdate);
      if (res.status === 200) {
        setUserData((prev) => ({
          ...prev,
          email: res.data.data.email,
          username: res.data.data.username,
          role: res.data.data.role,
          status: res.data.data.status,
        }));
        setUserDataBefore((prev) => ({
          ...prev,
          email: res.data.data.email,
          username: res.data.data.username,
          role: res.data.data.role,
          status: res.data.data.status,
        }));

        const indexUserUpdate = listUsers.findIndex(
          (user) => user.id === res.data.data.user_id
        );

        if (indexUserUpdate !== -1) {
          setListUsers((prev) => {
            const newList = [...prev];
            newList[indexUserUpdate].role = res.data.data.role;
            newList[indexUserUpdate].status = res.data.data.status;
            return newList;
          });
        }
      }
    } catch (error) {
      message.error("Update user details failed");
      console.log(error);
    } finally {
      setIsOpenModalUser(false);
      message.success("Update user details successfully");
    }
  };

  const handleOpenModalConfirmDelete = (record: UsersData) => {
    setIsOpenModalConfirmDelete(true);
    setUserData(record);
  };

  const setDataUserDefault = () => {
    setUserData({
      username: "",
      id: "",
      email: "",
      role: "",
      createdAt: "",
      status: "0",
    });
    setUserDataBefore({
      username: "",
      id: "",
      email: "",
      role: "",
      createdAt: "",
      status: "0",
    });
  };

  const handleDeleteUser = async () => {
    try {
      const res = await deleteAUser(userData.id);
      if (res.status === 200) {
        const indexUserDelete = listUsers.findIndex(
          (user) => user.id === userData.id
        );

        if (indexUserDelete !== -1) {
          setListUsers((prev) => {
            const newList = [...prev];
            newList.splice(indexUserDelete, 1);
            return newList;
          });
        }
      }
    } catch (error) {
      message.error("Delete user failed");
      console.log(error);
    } finally {
      setIsOpenModalConfirmDelete(false);
      setDataUserDefault();
      message.success("Delete user successfully");
    }
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
          handleSubmitModal: handleUpdateUserDetails,
        }}
      />
      <ModalConfirm
        {...{
          open: isOpenModalConfirmDelete,
          setOpen: setIsOpenModalConfirmDelete,
          handelFunction: handleDeleteUser,
          modal: t("userDashboard.deleteUser"),
          t,
          userID: userData.id,
        }}
      />
    </>
  );
};

UsersManager.layout = "Contentlayout";
export default UsersManager;
