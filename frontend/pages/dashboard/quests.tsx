import { useCallback, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PiCopySimpleLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { message, Tooltip } from "antd";

import ManagerComponent from "@/components/ManagerComponent";
import { QuestData } from "@/shared/types/commonTypes";
import { handleCopy } from "@/ultis/function";
import {
  deleteAQuest,
  getAllQuests,
  patchUpdateQuestDetails,
  postCreateQuest,
} from "@/services/apiServicesAdmin";
import ModalQuest from "@/modals/ModalQuest";
import ModalConfirmDeleteQuest from "@/modals/ModalConfirmDeleteQuest";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["quest", "commonModal"])),
  },
});

const QuestManager = () => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [isOpenModalQuest, setIsOpenModalQuest] = useState<boolean>(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState<boolean>(false);
  const [questData, setQuestData] = useState<QuestData>({
    questID: "",
    description: "",
    targetDescription: "",
    title: "",
    completionConditions: [],
    reward: { rewardItem: [], xp: 0 },
  });
  const [questDataBefore, setQuestDataBefore] = useState<QuestData>({
    questID: "",
    description: "",
    targetDescription: "",
    title: "",
    completionConditions: [],
    reward: { rewardItem: [], xp: 0 },
  });
  const [listQuests, setListQuests] = useState<QuestData[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoadingAddNewQuest, setIsLoadingAddNewQuest] =
    useState<boolean>(false);

  const { t } = useTranslation(["quest", "commonModal"]);

  const truncateText = (text: string, maxLines: number = 8) => {
    const lines = text.split("\n");
    if (lines.length <= maxLines) return text;
    return lines.slice(0, maxLines).join("\n") + " ...";
  };

  const columnName = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Quest ID",
      dataIndex: "questID",
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
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      render: (description: string) => (
        <Tooltip title={truncateText(description, 8)}>
          <div
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "pre-wrap",
            }}
          >
            {description.trim()}
          </div>
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Target Description",
      dataIndex: "targetDescription",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
          <button
            onClick={() => handleOpenModalQuest(record)}
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

  const fetchListQuests = useCallback(async () => {
    try {
      const response = await getAllQuests();
      if (response.status === 200) {
        const questsList = response.data.data.map((item: any) => ({
          questID: item.questId,
          title: item.title,
          description: item.description,
          targetDescription: item.target_description,
          completionConditions: item.completionConditions,
          reward: item.reward,
        }));
        setListQuests([...questsList]);
      }
    } catch (error) {
      console.log("error quests:", error);
    }
  }, []);

  const handleUpdateListPage = () => {};

  const handleOpenModalQuest = (quest: QuestData) => {
    setIsOpenModalQuest(true);
    setQuestData(quest);
    setQuestDataBefore(quest);
    setIsEditMode(true);
  };

  const handleCloseModalQuest = () => {
    setIsOpenModalQuest(false);
    setDataUserDefault();
    setIsEditMode(false);
  };

  const checkDataUserUpdate = () => {
    let questDataUpdate = {};
    if (questDataBefore.title !== questData.title)
      questDataUpdate = { ...questDataUpdate, title: questData.title };
    if (questDataBefore.description !== questData.description)
      questDataUpdate = {
        ...questDataUpdate,
        description: questData.description,
      };
    if (questDataBefore.targetDescription !== questData.targetDescription)
      questDataUpdate = {
        ...questDataUpdate,
        targetDescription: questData.targetDescription,
      };
    return questDataUpdate;
  };

  const handleUpdateQuestDetails = async () => {
    try {
      const questDataUpdate = checkDataUserUpdate();
      if (Object.keys(questDataUpdate).length === 0) {
        message.error("No data change to update");
        return;
      }
      const res = await patchUpdateQuestDetails(
        questData.questID,
        questDataUpdate
      );

      console.log("Check res update quest:", res);

      if (res.status === 200) {
        const updatedData = res.data.data;

        setQuestData((prev) => ({
          ...prev,
          ...(updatedData.title !== undefined && { title: updatedData.title }),
          ...(updatedData.description !== undefined && {
            description: updatedData.description,
          }),
          ...(updatedData.target_description !== undefined && {
            targetDescription: updatedData.target_description,
          }),
        }));
        setQuestDataBefore((prev) => ({
          ...prev,
          ...(updatedData.title !== undefined && { title: updatedData.title }),
          ...(updatedData.description !== undefined && {
            description: updatedData.description,
          }),
          ...(updatedData.target_description !== undefined && {
            targetDescription: updatedData.target_description,
          }),
        }));
        const indexQuestUpdate = listQuests.findIndex(
          (quest) => quest.questID === updatedData.quest_id
        );
        if (indexQuestUpdate !== -1) {
          setListQuests((prev) => {
            const newList = [...prev];
            if (updatedData.title !== undefined)
              newList[indexQuestUpdate].title = updatedData.title;
            if (updatedData.description !== undefined)
              newList[indexQuestUpdate].description = updatedData.description;
            if (updatedData.target_description !== undefined)
              newList[indexQuestUpdate].targetDescription =
                updatedData.target_description;
            return newList;
          });
        }
      }
      message.success("Update quest details successfully");
    } catch (error) {
      message.error("Update quest details failed");
      console.log(error);
    } finally {
      setIsOpenModalQuest(false);
    }
  };

  const handleOpenModalConfirmDelete = (record: QuestData) => {
    setIsOpenModalConfirmDelete(true);
    setQuestData(record);
  };

  const setDataUserDefault = () => {
    setQuestData({
      questID: "",
      description: "",
      targetDescription: "",
      title: "",
      completionConditions: [],
      reward: { rewardItem: [], xp: 0 },
    });
    setQuestDataBefore({
      questID: "",
      description: "",
      targetDescription: "",
      title: "",
      completionConditions: [],
      reward: { rewardItem: [], xp: 0 },
    });
  };

  const handleDeleteQuest = async () => {
    try {
      const res = await deleteAQuest(questData?.questID);
      if (res.status === 200) {
        const indexUserDelete = listQuests.findIndex(
          (quest) => quest.questID === questData.questID
        );

        if (indexUserDelete !== -1) {
          setListQuests((prev) => {
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

  const handleAddNewQuest = async () => {
    setIsLoadingAddNewQuest(true);
    const questDataNew = {
      ...questData,
      questID: `quest_0${listQuests.length + 1}`,
    };
    try {
      const res = await postCreateQuest(questDataNew);
      console.log("Check res add new quest:", res);

      if (res.status === 200) {
        setListQuests((prev) => [
          ...prev,
          {
            questID: res.data.data.questId,
            title: res.data.data.title,
            description: res.data.data.description,
            targetDescription: res.data.data.target_description,
            completionConditions: res.data.data.completionConditions,
            reward: res.data.data.reward,
          },
        ]);
        message.success("Add new quest successfully");
      }
    } catch (error) {
      console.log(error);
      setIsLoadingAddNewQuest(false);
    } finally {
      setIsLoadingAddNewQuest(false);
      setIsOpenModalQuest(false);
    }
  };

  const handleOpenModalAddNewQuest = () => {
    setIsOpenModalQuest(true);
  };

  const handleSubmitModal = () => {
    if (isEditMode) {
      handleUpdateQuestDetails();
    } else {
      handleAddNewQuest();
    }
  };

  useEffect(() => {
    fetchListQuests();
  }, []);

  return (
    <>
      <ManagerComponent
        {...{
          list: listQuests,
          columnName,
          componentName: "Quests",
          nameButton: "",
          setQuestData,
          handleUpdateListPage,
          isLoadingUpdate,
          handleAddNew: handleOpenModalAddNewQuest,
        }}
      />
      <ModalQuest
        {...{
          isOpenModalQuest: isOpenModalQuest,
          handleCloseModalQuest,
          questData,
          setQuestData,
          t,
          handleSubmitModal,
          isEditMode,
        }}
      />
      <ModalConfirmDeleteQuest
        {...{
          open: isOpenModalConfirmDelete,
          setOpen: setIsOpenModalConfirmDelete,
          handelFunction: handleDeleteQuest,
          modal: t("dashboardQuest.deleteQuest"),
          t,
          questID: questData.questID,
        }}
      />
    </>
  );
};

QuestManager.layout = "Contentlayout";
export default QuestManager;
