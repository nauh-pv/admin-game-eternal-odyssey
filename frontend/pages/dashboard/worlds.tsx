import { useCallback, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PiCopySimpleLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import ManagerComponent from "@/components/ManagerComponent";
import { WorldData } from "@/shared/types/commonTypes";
import { handleCopy } from "@/ultis/function";
import {
  deleteAUser,
  deleteAWorld,
  getAllWorlds,
  patchUpdateWorldDetails,
} from "@/services/apiServicesAdmin";
import ModalConfirm from "@/modals/ModalConfirm";
import ModalWorld from "@/modals/ModalWorld";
import ModalConfirmDeleteWorld from "@/modals/ModalConfirmDeleteWorld";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["world", "commonModal"])),
  },
});

const WorldsManager = () => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [isOpenModalWorld, setIsOpenModalWorld] = useState<boolean>(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState<boolean>(false);
  const [worldData, setWorldData] = useState<WorldData>({
    worldID: "",
    name: "",
    status: 0,
    startAt: "",
    endAt: "",
    code: "",
  });
  const [worldDataBefore, setWorldDataBefore] = useState<WorldData>({
    worldID: "",
    name: "",
    status: 0,
    startAt: "",
    endAt: "",
    code: "",
  });
  const [listWorlds, setListWorlds] = useState<WorldData[]>([]);

  const { t } = useTranslation(["world", "commonModal"]);

  const columnName = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "World ID",
      dataIndex: "worldID",
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
      title: "Created At",
      dataIndex: "startAt",
    },
    {
      title: "End At",
      dataIndex: "endAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        return status === "0" ? (
          <p className="text-green uppercase">Đang hoạt động</p>
        ) : (
          <p className="text-red uppercase">Đang ngoại tuyến</p>
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

  const fetchListWorlds = useCallback(async () => {
    try {
      const response = await getAllWorlds();
      console.log("response worlds:", response);
      if (response.status === 200) {
        const worldsList = response.data.data.map((item: any) => ({
          worldID: item.world_id,
          name: item.name,
          startAt: item.startAt,
          endAt: item.endAt,
          status: item.status,
          code: item.code,
        }));
        setListWorlds([...worldsList]);
      }
    } catch (error) {
      console.log("error worlds:", error);
    }
  }, []);

  const handleUpdateListPage = () => {};

  const handleOpenModalUser = (world: WorldData) => {
    setIsOpenModalWorld(true);
    setWorldData(world);
    setWorldDataBefore(world);
  };

  const handleCloseModalWorld = () => {
    setIsOpenModalWorld(false);
  };

  const checkDataUserUpdate = () => {
    let worldDataUpdate = {};
    if (worldDataBefore.code !== worldData.code)
      worldDataUpdate = { ...worldDataUpdate, code: worldData.code };
    if (worldDataBefore.name !== worldData.name)
      worldDataUpdate = { ...worldDataUpdate, name: worldData.name };
    if (worldDataBefore.status !== worldData.status)
      worldDataUpdate = { ...worldDataUpdate, status: worldData.status };
    return worldDataUpdate;
  };

  const handleUpdateUserDetails = async () => {
    try {
      const worldDataUpdate = checkDataUserUpdate();
      if (Object.keys(worldDataUpdate).length === 0) {
        message.error("No data change to update");
        return;
      }

      const res = await patchUpdateWorldDetails(
        worldData.worldID,
        worldDataUpdate
      );
      if (res.status === 200) {
        setWorldData((prev) => ({
          ...prev,
          email: res.data.data.email,
          username: res.data.data.username,
          role: res.data.data.role,
          status: res.data.data.status,
        }));
        setWorldDataBefore((prev) => ({
          ...prev,
          email: res.data.data.email,
          username: res.data.data.username,
          role: res.data.data.role,
          status: res.data.data.status,
        }));

        const indexUserUpdate = listWorlds.findIndex(
          (world) => world.worldID === res.data.data.world_id
        );

        if (indexUserUpdate !== -1) {
          setListWorlds((prev) => {
            const newList = [...prev];
            newList[indexUserUpdate].code = res.data.data.code;
            newList[indexUserUpdate].status = res.data.data.status;
            return newList;
          });
        }
      }
    } catch (error) {
      message.error("Update world details failed");
      console.log(error);
    } finally {
      setIsOpenModalWorld(false);
      message.success("Update world details successfully");
    }
  };

  const handleOpenModalConfirmDelete = (record: WorldData) => {
    setIsOpenModalConfirmDelete(true);
    setWorldData(record);
  };

  const setDataUserDefault = () => {
    setWorldData({
      worldID: "",
      name: "",
      status: 0,
      startAt: "",
      endAt: "",
      code: "",
    });
    setWorldDataBefore({
      worldID: "",
      name: "",
      status: 0,
      startAt: "",
      endAt: "",
      code: "",
    });
  };

  const handleDeleteWorld = async () => {
    try {
      const res = await deleteAWorld(worldData.worldID);
      if (res.status === 200) {
        const indexUserDelete = listWorlds.findIndex(
          (world) => world.worldID === worldData.worldID
        );

        if (indexUserDelete !== -1) {
          setListWorlds((prev) => {
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

  useEffect(() => {
    fetchListWorlds();
  }, []);

  return (
    <>
      <ManagerComponent
        {...{
          list: listWorlds,
          columnName,
          componentName: "Worlds",
          nameButton: "",
          setWorldData,
          handleUpdateListPage,
          isLoadingUpdate,
        }}
      />
      <ModalWorld
        {...{
          isOpenModalWorld: isOpenModalWorld,
          handleCloseModalWorld,
          worldData,
          setWorldData,
          t,
          handleSubmitModal: handleUpdateUserDetails,
        }}
      />
      <ModalConfirmDeleteWorld
        {...{
          open: isOpenModalConfirmDelete,
          setOpen: setIsOpenModalConfirmDelete,
          handelFunction: handleDeleteWorld,
          modal: t("worldDashboard.deleteWorld"),
          t,
          worldID: worldData.worldID,
        }}
      />
    </>
  );
};

WorldsManager.layout = "Contentlayout";
export default WorldsManager;
