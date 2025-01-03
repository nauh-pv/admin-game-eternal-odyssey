import { Modal, Select, Table } from "antd";
import TextArea from "antd/es/input/TextArea";

import data from "@/shared/data/user-data.json";
import { UsersData } from "@/shared/types/commonTypes";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/services/apiServicesAdmin";
import { PiCopySimpleLight } from "react-icons/pi";
import { handleCopy } from "@/ultis/function";

interface ModalUserPostProps {
  isOpenModalUser: boolean;
  handleCloseModalUser: () => void;
  userData: UsersData;
  setUserData: React.Dispatch<React.SetStateAction<UsersData>>;
  t: (key: string) => string;
  handleSubmitModal: () => void;
}

interface UserWorlds {
  worldID: string;
  name: string;
  status: boolean;
  createdAt: string;
  endAt: string;
  role: string;
}

const ModalUser = ({
  isOpenModalUser,
  handleCloseModalUser,
  userData,
  setUserData,
  t,
  handleSubmitModal,
}: ModalUserPostProps) => {
  const [isLoadingUserDetails, setIsLoadingUserDetails] =
    useState<boolean>(false);
  const [userWorlds, setUserWorlds] = useState<UserWorlds[]>([]);

  const columnName = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "World ID",
      dataIndex: "worldID",
      render: (worldID: string) => {
        return (
          <p
            className="text-primary group flex items-center gap-2 cursor-pointer"
            onClick={() => handleCopy(worldID)}
          >
            {worldID}
            <PiCopySimpleLight className="group-hover:opacity-100 opacity-0" />
          </p>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name: string) => {
        return (
          <p
            className="text-primary group flex items-center gap-2 cursor-pointer"
            onClick={() => handleCopy(name)}
          >
            {name}
            <PiCopySimpleLight className="group-hover:opacity-100 opacity-0" />
          </p>
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
          <p className="text-red uppercase">Không hoạt động</p>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "End At",
      dataIndex: "endAt",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role: string) => {
        return role === "1" ? (
          <p className="text-green uppercase">Chủ thế giới</p>
        ) : (
          <p className="text-blue uppercase">Người chơi</p>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
          <button
            onClick={() => handleOpenModalWorld(record)}
            aria-label="view"
            className="ti-btn ti-btn-icon ti-btn-wave !rounded-full !border-info/10 !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"
          >
            <i className="ri-eye-line"></i>
          </button>
        </div>
      ),
    },
  ];

  const fetchUserDetails = async (userID: string) => {
    setIsLoadingUserDetails(true);
    console.log("fetch user details:", userID);

    try {
      const res = await getUserDetails(userID);
      console.log("res user details:", res);
      if (res.status === 200 && res.data) {
        const worldsList = res.data.data.worlds.map((world: any) => {
          return {
            worldID: world.world_id,
            name: world.name,
            status: world.status,
            createdAt: world.created_at,
            endAt: world.end_at,
            role: world.role,
          };
        });

        setUserWorlds([...worldsList]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingUserDetails(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setUserData({ ...userData, role: value });
  };

  const handleStatusChange = (value: string) => {
    setUserData({ ...userData, status: value });
  };

  const handleRowClick = (record: any) => {
    console.log("record:", record);
  };

  const handleOpenModalWorld = (record: any) => {
    console.log("record:", record);
  };

  const handleOnChangeUsername = (value: string) => {
    setUserData({ ...userData, username: value });
  };

  useEffect(() => {
    if (isOpenModalUser && userData.id) {
      fetchUserDetails(userData.id);
    }
  }, [isOpenModalUser]);

  return (
    <div>
      <Modal
        title={t("modalUser.user")}
        open={isOpenModalUser}
        onOk={handleSubmitModal}
        okText={t("modalUser.updateButton")}
        onCancel={handleCloseModalUser}
        cancelText={t("modalUser.cancelButton")}
        width={1000}
      >
        <p className="font-bold mb-2">{t("modalUser.userDetails")}</p>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-modal-3">
            <p>
              {t("modalUser.userId")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="User ID"
              value={userData.id}
              disabled
              autoSize={{ minRows: 1, maxRows: 1 }}
            />
          </div>
          <div className="col-span-modal-3">
            <p>
              {t("modalUser.email")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext !h-fit"
              placeholder="Email"
              autoSize={{ minRows: 1, maxRows: 1 }}
              value={userData.email}
              disabled
            />
          </div>
          <div className="col-span-modal-3">
            <p>
              {t("modalUser.username")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="Customer Idea"
              autoSize={{ minRows: 1, maxRows: 20 }}
              value={userData.username}
              disabled
            />
          </div>
          <div className="col-span-modal-3">
            <p>
              {t("modalUser.createdAt")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="Customer Idea"
              autoSize={{ minRows: 1, maxRows: 20 }}
              disabled
              value={userData.createdAt}
            />
          </div>
          <div className="col-span-modal-3">
            <p>
              {t("modalUser.role")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <Select
              value={userData.role}
              onChange={handleRoleChange}
              options={data.roleSelectOptions}
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-span-modal-3">
            <p>
              {t("modalUser.status")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <Select
              value={userData.status}
              onChange={handleStatusChange}
              options={data.statusSelectOptions}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <p className="font-bold mt-5 mb-2">{t("modalUser.userWorlds")}</p>
        {isLoadingUserDetails ? (
          <p>Loading...</p>
        ) : (
          <div>
            {userWorlds.length > 0 ? (
              <Table
                rowClassName={() => "no-hover"}
                columns={columnName}
                dataSource={userWorlds.reverse()}
                style={{ height: "100%" }}
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            ) : (
              <div>{t("modalUser.notInWorld")}</div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
export default ModalUser;
