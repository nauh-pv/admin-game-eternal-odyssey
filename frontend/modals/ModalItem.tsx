import { Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import { ItemData } from "@/shared/types/commonTypes";
import data from "@/shared/data/user-data.json";

interface ModalItemProps {
  isOpenModalItem: boolean;
  handleCloseModalItem: () => void;
  itemData: ItemData;
  setItemData: React.Dispatch<React.SetStateAction<ItemData>>;
  t: (key: string) => string;
  handleSubmitModal: () => void;
  isEditMode: boolean;
}

const ModalItem = ({
  isOpenModalItem,
  handleCloseModalItem,
  itemData,
  setItemData,
  t,
  handleSubmitModal,
  isEditMode,
}: ModalItemProps) => {
  const handleRoleChange = (value: number) => {
    setItemData({ ...itemData, type: value });
  };

  return (
    <div>
      <Modal
        title={isEditMode ? t("modalItem.item") : t("modalItem.createItem")}
        open={isOpenModalItem}
        onOk={handleSubmitModal}
        okText={
          isEditMode ? t("modalItem.updateItem") : t("modalItem.createItem")
        }
        onCancel={handleCloseModalItem}
        cancelText={t("modalItem.cancelButton")}
        width={1000}
      >
        <p className="font-bold mb-2">{t("modalItem.ItemDetails")}</p>
        <div className="grid grid-cols-12 gap-6">
          {isEditMode && (
            <div className="col-span-modal-6">
              <p>
                {t("modalItem.ItemID")}
                <label className="text-red">&nbsp;&#42;</label>
              </p>
              <TextArea
                className="custom-areatext"
                placeholder="Item ID"
                value={itemData.itemID}
                disabled
                autoSize={{ minRows: 1, maxRows: 1 }}
              />
            </div>
          )}
          <div className="col-span-modal-6">
            <p>
              {t("modalItem.name")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="title"
              autoSize={{ minRows: 1, maxRows: 20 }}
              value={itemData.name}
              onChange={(e) =>
                setItemData({ ...itemData, name: e.target.value })
              }
            />
          </div>
          <div className="col-span-12">
            <p>
              {t("modalItem.description")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="description"
              autoSize={{ minRows: 1, maxRows: 20 }}
              value={itemData.description}
              onChange={(e) =>
                setItemData({ ...itemData, description: e.target.value })
              }
            />
          </div>
          <div className="col-span-modal-3">
            <p>
              {t("modalItem.usingTime")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="Using time"
              autoSize={{ minRows: 1, maxRows: 20 }}
              onChange={(e) =>
                setItemData({
                  ...itemData,
                  usingTime: +e.target.value,
                })
              }
              value={itemData.usingTime}
            />
          </div>{" "}
          <div className="col-span-modal-3">
            <p>
              {t("modalItem.createTime")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="Create time"
              autoSize={{ minRows: 1, maxRows: 20 }}
              onChange={(e) =>
                setItemData({
                  ...itemData,
                  createTime: +e.target.value,
                })
              }
              value={itemData.createTime}
            />
          </div>
          <div className="col-span-modal-3">
            <p>
              {t("modalUser.type")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <Select
              value={itemData.type}
              onChange={handleRoleChange}
              options={data.typeSelectOptions}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ModalItem;
