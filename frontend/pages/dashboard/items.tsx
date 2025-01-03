import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PiCopySimpleLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { message, Tooltip } from "antd";

import ManagerComponent from "@/components/ManagerComponent";
import { ItemData } from "@/shared/types/commonTypes";
import { handleCopy, normalizeString } from "@/ultis/function";
import {
  deleteAItem,
  patchUpdateItemDetails,
  postCreateItem,
  postCreateQuest,
} from "@/services/apiServicesAdmin";
import ModalConfirmDeleteQuest from "@/modals/ModalConfirmDeleteQuest";
import { useDashboardContext } from "@/shared/context/DashboardContext";
import ModalItem from "@/modals/ModalItem";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["item", "commonModal"])),
  },
});

const ItemManager = () => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [isOpenModalItem, setIsOpenModalItem] = useState<boolean>(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState<boolean>(false);
  const [itemData, setItemData] = useState<ItemData>({
    itemID: "",
    createTime: 0,
    description: "",
    name: "",
    type: 0,
    attributes: {
      attackSpeed: 0,
      damage: { from: 0, to: 0 },
      health: { from: 0, to: 0 },
      crit: 0,
      intelligence: 0,
      resistance: 0,
      runSpeed: 0,
    },
    usingTime: 0,
  });
  const [itemDataBefore, setItemDataBefore] = useState<ItemData>({
    itemID: "",
    createTime: 0,
    description: "",
    name: "",
    type: 0,
    attributes: {
      attackSpeed: 0,
      damage: { from: 0, to: 0 },
      health: { from: 0, to: 0 },
      crit: 0,
      intelligence: 0,
      resistance: 0,
      runSpeed: 0,
    },
    usingTime: 0,
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoadingAddNewQuest, setIsLoadingAddNewQuest] =
    useState<boolean>(false);

  const dashboardContext = useDashboardContext();

  const { listItems, setListItems } = dashboardContext;

  const { t } = useTranslation(["item", "commonModal"]);

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
      width: 100,
    },
    {
      title: "Item ID",
      dataIndex: "itemID",
      render: (itemID: string) => {
        return (
          <p
            className="text-primary group flex items-center gap-2 cursor-pointer"
            onClick={() => handleCopy(itemID)}
          >
            {itemID}
            <PiCopySimpleLight className="group-hover:opacity-100 opacity-0" />
          </p>
        );
      },
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Create Time",
      dataIndex: "createTime",
    },
    {
      title: "Using Time",
      dataIndex: "usingTime",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (status: number) => {
        return status === 0 ? (
          <p className="text-blue uppercase">Normal</p>
        ) : status === 1 ? (
          <p className="text-yellow uppercase">Rare</p>
        ) : (
          <p className="text-red uppercase">Legendary</p>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
          <button
            onClick={() => handleOpenModalItem(record)}
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

  const handleOpenModalItem = (item: ItemData) => {
    setIsOpenModalItem(true);
    setItemData(item);
    setItemDataBefore(item);
    setIsEditMode(true);
  };

  const handleCloseModalItem = () => {
    setIsOpenModalItem(false);
    setDataUserDefault();
    setIsEditMode(false);
  };

  const checkDataItemUpdate = () => {
    let itemDataUpdate = {};
    if (itemDataBefore.name !== itemData.name)
      itemDataUpdate = { ...itemDataUpdate, name: itemData.name };
    if (itemDataBefore.description !== itemData.description)
      itemDataUpdate = {
        ...itemDataUpdate,
        description: itemData.description,
      };
    if (itemDataBefore.usingTime !== itemData.usingTime)
      itemDataUpdate = {
        ...itemDataUpdate,
        usingTime: itemData.usingTime,
      };
    if (itemDataBefore.createTime !== itemData.createTime)
      itemDataUpdate = {
        ...itemDataUpdate,
        createTime: itemData.createTime,
      };
    return itemDataUpdate;
  };

  const handleUpdateQuestDetails = async () => {
    try {
      const itemDataUpdate = checkDataItemUpdate();
      if (Object.keys(itemDataUpdate).length === 0) {
        message.error("No data change to update");
        return;
      }
      const res = await patchUpdateItemDetails(itemData.itemID, itemDataUpdate);

      console.log("Check res update item:", res);

      if (res.status === 200) {
        const updatedData = res.data.data;

        setItemData((prev) => ({
          ...prev,
          ...(updatedData.name !== undefined && { name: updatedData.name }),
          ...(updatedData.description !== undefined && {
            description: updatedData.description,
          }),
          ...(updatedData.usingTime !== undefined && {
            usingTime: updatedData.usingTime,
          }),
          ...(updatedData.createTime !== undefined && {
            createTime: updatedData.createTime,
          }),
        }));

        setItemDataBefore((prev) => ({
          ...prev,
          ...(updatedData.name !== undefined && { name: updatedData.name }),
          ...(updatedData.description !== undefined && {
            description: updatedData.description,
          }),
          ...(updatedData.usingTime !== undefined && {
            usingTime: updatedData.usingTime,
          }),
          ...(updatedData.createTime !== undefined && {
            createTime: updatedData.createTime,
          }),
        }));
        const indexItemUpdate = listItems.findIndex(
          (item) => item.questID === updatedData.quest_id
        );

        if (indexItemUpdate !== -1) {
          const indexNew = listItems.length - indexItemUpdate - 1;
          console.log("Check index new:", indexNew);

          setListItems((prev) => {
            const newList = [...prev];
            if (updatedData.name !== undefined)
              newList[indexNew].name = updatedData.name;
            if (updatedData.description !== undefined)
              newList[indexNew].description = updatedData.description;
            if (updatedData.usingTime !== undefined)
              console.log(
                "Check using time:",
                updatedData.usingTime,
                newList[indexNew]
              );

            newList[indexNew].usingTime = updatedData.usingTime;
            if (updatedData.createTime !== undefined)
              newList[indexNew].createTime = updatedData.createTime;
            return newList;
          });
        }
      }
      message.success("Update item details successfully");
    } catch (error) {
      message.error("Update item details failed");
      console.log(error);
    } finally {
      setIsOpenModalItem(false);
    }
  };

  const handleOpenModalConfirmDelete = (record: ItemData) => {
    setIsOpenModalConfirmDelete(true);
    setItemData(record);
  };

  const setDataUserDefault = () => {
    setItemData({
      itemID: "",
      createTime: 0,
      description: "",
      name: "",
      type: 0,
      attributes: {
        attackSpeed: 0,
        damage: { from: 0, to: 0 },
        health: { from: 0, to: 0 },
        crit: 0,
        intelligence: 0,
        resistance: 0,
        runSpeed: 0,
      },
      usingTime: 0,
    });
    setItemDataBefore({
      itemID: "",
      createTime: 0,
      description: "",
      name: "",
      type: 0,
      attributes: {
        attackSpeed: 0,
        damage: { from: 0, to: 0 },
        health: { from: 0, to: 0 },
        crit: 0,
        intelligence: 0,
        resistance: 0,
        runSpeed: 0,
      },
      usingTime: 0,
    });
  };

  const handleItemQuest = async () => {
    try {
      const res = await deleteAItem(itemData?.itemID);
      if (res.status === 200) {
        const indexItemDelete = listItems.findIndex(
          (item) => item.itemID === itemData.itemID
        );

        if (indexItemDelete !== -1) {
          setListItems((prev) => {
            const newList = [...prev];
            newList.splice(indexItemDelete, 1);
            return newList;
          });
        }
      }
    } catch (error) {
      message.error("Delete item failed");
      console.log(error);
    } finally {
      setIsOpenModalConfirmDelete(false);
      setDataUserDefault();
      message.success("Delete item successfully");
    }
  };

  const handleAddNewItem = async () => {
    setIsLoadingAddNewQuest(true);
    const itemDataNew = { ...itemData, itemID: normalizeString(itemData.name) };
    try {
      const res = await postCreateItem(itemDataNew);
      console.log("Check res add new item:", res);

      if (res.status === 200) {
        setListItems((prev) => [
          ...prev,
          {
            itemID: res.data.data.itemId,
            createTime: res.data.data.createTime,
            description: res.data.data.description,
            name: res.data.data.name,
            type: res.data.data.type,
            attributes: {
              attackSpeed: res.data.data.attributes.attackSpeed,
              damage: res.data.data.attributes.damage,
              health: res.data.data.attributes.health,
              crit: res.data.data.attributes.crit,
              intelligence: res.data.data.attributes.intelligence,
              resistance: res.data.data.attributes.resistance,
              runSpeed: res.data.data.attributes.runSpeed,
            },
            usingTime: res.data.data.usingTime,
          },
        ]);
        message.success("Add new item successfully");
      }
    } catch (error) {
      console.log(error);
      setIsLoadingAddNewQuest(false);
    } finally {
      setIsLoadingAddNewQuest(false);
      setIsOpenModalItem(false);
    }
  };

  const handleOpenModalAddNewQuest = () => {
    setIsOpenModalItem(true);
  };

  const handleSubmitModal = () => {
    if (isEditMode) {
      handleUpdateQuestDetails();
    } else {
      handleAddNewItem();
    }
  };

  return (
    <>
      <ManagerComponent
        {...{
          list: listItems,
          columnName,
          componentName: "Quests",
          nameButton: "",
          setItemData,
          handleUpdateListPage,
          isLoadingUpdate,
          handleAddNew: handleOpenModalAddNewQuest,
        }}
      />
      <ModalItem
        {...{
          isOpenModalItem: isOpenModalItem,
          handleCloseModalItem,
          itemData,
          setItemData,
          t,
          handleSubmitModal,
          isEditMode,
        }}
      />
      <ModalConfirmDeleteQuest
        {...{
          open: isOpenModalConfirmDelete,
          setOpen: setIsOpenModalConfirmDelete,
          handelFunction: handleItemQuest,
          modal: t("dashboardQuest.deleteQuest"),
          t,
          questID: itemData.itemID,
        }}
      />
    </>
  );
};

ItemManager.layout = "Contentlayout";
export default ItemManager;
