import { Checkbox } from "antd";
import { useState } from "react";
import { TbMessageCircleUp } from "react-icons/tb";
import { VscCommentUnresolved } from "react-icons/vsc";

import ManagerComponent from "@/components/ManagerComponent";
import { useDashboardContext } from "@/shared/context/DashboardContext";
import { UsersData } from "@/shared/types/commonTypes";

const UsersManager = () => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const [userData, setUserData] = useState<UsersData>({
    username: "",
    id: "",
    email: "",
    role: "",
    createdAt: "",
    updatedAt: "",
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
      title: "Facebook Account",
      dataIndex: "facebook",
    },
    {
      title: "Page",
      dataIndex: "page",
    },
    {
      title: "Auto",
      key: "subscribed",
      render: (_: any, record: any) => (
        <div className="flex items-center">
          {record.actionType === 1 && (
            <div className="flex items-center justify-center gap-1">
              <button
                aria-label="Subscribe Message"
                className="ti-btn ti-btn-icon ti-btn-wave !rounded-full !border-info/10 !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"
              >
                <TbMessageCircleUp />
              </button>
              <Checkbox
                checked={record.subscribed?.messages === 1 && true}
              ></Checkbox>{" "}
            </div>
          )}
          {record.actionType === 0 && (
            <div className="flex items-center justify-center gap-1">
              <button
                aria-label="Subscribe Comment"
                className="ti-btn ti-btn-icon ti-btn-primary !rounded-full !border-info/10 !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"
              >
                <VscCommentUnresolved />
              </button>
              <Checkbox
                checked={record.subscribed?.comments === 1 && true}
              ></Checkbox>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
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
    </>
  );
};

UsersManager.layout = "Contentlayout";
export default UsersManager;
