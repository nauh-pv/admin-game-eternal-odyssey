import { Modal, Select, Table } from "antd";
import TextArea from "antd/es/input/TextArea";

import data from "@/shared/data/world-data.json";
import { WorldData } from "@/shared/types/commonTypes";
import { useEffect, useState } from "react";
import { getWorldDetails } from "@/services/apiServicesAdmin";
import { PiCopySimpleLight } from "react-icons/pi";
import { handleCopy } from "@/ultis/function";

interface ModalWorldPostProps {
  isOpenModalWorld: boolean;
  handleCloseModalWorld: () => void;
  worldData: WorldData;
  setWorldData: React.Dispatch<React.SetStateAction<WorldData>>;
  t: (key: string) => string;
  handleSubmitModal: () => void;
}

interface Inventory {
  itemID: string;
  quantity: number;
}

interface PlayerWorld {
  userID: string;
  role: number;
  inventory: Inventory[];
  playerDetails: any;
}

interface QuestWorld {
  questID: string;
  status: number;
  progress: any;
}

const modalWorld = ({
  isOpenModalWorld,
  handleCloseModalWorld,
  worldData,
  setWorldData,
  t,
  handleSubmitModal,
}: ModalWorldPostProps) => {
  const [isLoadingWorldDetails, setIsLoadingWorldDetails] =
    useState<boolean>(false);
  const [usersWorld, setUserWorlds] = useState<PlayerWorld[]>([]);
  const [questWorlds, setQuestWorlds] = useState<QuestWorld[]>([]);

  const columnNamePlayer = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "User ID",
      dataIndex: "userID",
      render: (userID: string) => {
        return (
          <p
            className="text-primary group flex items-center gap-2 cursor-pointer"
            onClick={() => handleCopy(userID)}
          >
            {`${userID.slice(0, 5)}...${userID.slice(-5)}`}{" "}
            <PiCopySimpleLight className="group-hover:opacity-100 opacity-0" />
          </p>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role: number) => {
        return role === 0 ? (
          <p className="text-green uppercase">Chủ</p>
        ) : (
          <p className="text-red uppercase">Người chơi</p>
        );
      },
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      render: (inventory: any) => {
        return (
          <p className="text-green">
            {inventory ? `${inventory.length} items` : `0 item`}
          </p>
        );
      },
    },
    {
      title: "Player Details",
      dataIndex: "playerDetails",
      render: (playerDetails: string) => {
        return (
          <p className="text-blue uppercase">
            {playerDetails ? `${playerDetails.length} settings` : "0 setting"}
          </p>
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

  const columnNameQuest = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Quest ID",
      dataIndex: "questID",
      render: (questID: string) => {
        return (
          <p
            className="text-primary group flex items-center gap-2 cursor-pointer"
            onClick={() => handleCopy(questID)}
          >
            {`${questID.slice(0, 5)}...${questID.slice(-5)}`}{" "}
            <PiCopySimpleLight className="group-hover:opacity-100 opacity-0" />
          </p>
        );
      },
    },
    {
      title: "Quest Name",
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
      render: (inventory: any) => {
        return (
          <p className="text-green">
            {inventory ? `${inventory.length} items` : `0 item`}
          </p>
        );
      },
    },
    {
      title: "Progress",
      dataIndex: "progess",
      render: (progess: string) => {
        return (
          <p className="text-blue uppercase">
            {progess ? `${progess.length} entities` : "0 entity"}
          </p>
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

  const handleStatusChange = (value: number) => {
    setWorldData({ ...worldData, status: value });
  };

  const handleRowClick = (record: any) => {
    console.log("record:", record);
  };

  const handleOpenModalWorld = (record: any) => {
    console.log("record:", record);
  };

  const fetchWorldDetails = async (worldID: string) => {
    setIsLoadingWorldDetails(true);

    try {
      const res = await getWorldDetails(worldID);
      console.log("res world details:", res);
      if (res.status === 200 && res.data && res.data.playerWorld) {
        const listUserData = Object.values(res.data.playerWorld).map(
          (user: any) => {
            return {
              userID: user.userId,
              role: user.role,
              inventory: user.inventory,
              playerDetails: user.playerDetails,
            };
          }
        );
        setUserWorlds([...listUserData]);
      }

      if (res.status === 200 && res.data && res.data.questWorld) {
        const listQuestData = res.data.questWorld.map((quest: any) => {
          return {
            questID: quest.questId,
            status: quest.status,
            progress: quest.progress,
          };
        });
        setQuestWorlds([...listQuestData]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingWorldDetails(false);
    }
  };

  useEffect(() => {
    if (isOpenModalWorld && worldData.worldID) {
      fetchWorldDetails(worldData.worldID);
    }
  }, [isOpenModalWorld, worldData]);

  return (
    <div>
      <Modal
        title={t("modalWorld.world")}
        open={isOpenModalWorld}
        onOk={handleSubmitModal}
        okText={t("modalWorld.updateButton")}
        onCancel={handleCloseModalWorld}
        cancelText={t("modalWorld.cancelButton")}
        width={1000}
      >
        <p className="font-bold mb-2">{t("modalWorld.worldDetails")}</p>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-modal-3">
            <p>
              {t("modalWorld.worldID")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="World ID"
              value={worldData.worldID}
              disabled
              autoSize={{ minRows: 1, maxRows: 1 }}
            />
          </div>
          <div className="col-span-modal-3">
            <p>
              {t("modalWorld.name")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="Name"
              autoSize={{ minRows: 1, maxRows: 20 }}
              value={worldData.name}
              disabled
            />
          </div>
          <div className="col-span-modal-3">
            <p>
              {t("modalWorld.code")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="Code"
              autoSize={{ minRows: 1, maxRows: 20 }}
              value={worldData.name}
              disabled
            />
          </div>
          <div className="col-span-modal-3">
            <p>
              {t("modalWorld.createdAt")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="Customer Idea"
              autoSize={{ minRows: 1, maxRows: 20 }}
              disabled
              value={worldData.startAt}
            />
          </div>{" "}
          <div className="col-span-modal-3">
            <p>
              {t("modalWorld.endAt")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="Customer Idea"
              autoSize={{ minRows: 1, maxRows: 20 }}
              disabled
              value={worldData.endAt}
            />
          </div>
          <div className="col-span-modal-3">
            <p>
              {t("modalWorld.status")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <Select
              value={worldData.status}
              onChange={handleStatusChange}
              options={data.statusSelectOptions}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <p className="font-bold mt-5 mb-2">{t("modalWorld.playersWorld")}</p>
        {isLoadingWorldDetails ? (
          <p>Loading...</p>
        ) : (
          <div>
            {usersWorld.length > 0 ? (
              <Table
                rowClassName={() => "no-hover"}
                columns={columnNamePlayer}
                dataSource={usersWorld.reverse()}
                style={{ height: "100%" }}
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            ) : (
              <div>{t("modalWorld.notUsersInWorld")}</div>
            )}
          </div>
        )}

        <p className="font-bold mb-2">{t("modalWorld.questsWorld")}</p>
        {isLoadingWorldDetails ? (
          <p>Loading...</p>
        ) : (
          <div>
            {questWorlds.length > 0 ? (
              <Table
                rowClassName={() => "no-hover"}
                columns={columnNameQuest}
                dataSource={questWorlds}
                style={{ height: "100%" }}
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            ) : (
              <div>{t("modalWorld.notQuestsInWorld")}</div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
export default modalWorld;
