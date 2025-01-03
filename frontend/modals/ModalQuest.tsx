import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

import { QuestData } from "@/shared/types/commonTypes";

interface ModalQuestProps {
  isOpenModalQuest: boolean;
  handleCloseModalQuest: () => void;
  questData: QuestData;
  setQuestData: React.Dispatch<React.SetStateAction<QuestData>>;
  t: (key: string) => string;
  handleSubmitModal: () => void;
  isEditMode: boolean;
}

const modalQuest = ({
  isOpenModalQuest,
  handleCloseModalQuest,
  questData,
  setQuestData,
  t,
  handleSubmitModal,
  isEditMode,
}: ModalQuestProps) => {
  return (
    <div>
      <Modal
        title={isEditMode ? t("modalQuest.quest") : t("modalQuest.createQuest")}
        open={isOpenModalQuest}
        onOk={handleSubmitModal}
        okText={
          isEditMode ? t("modalQuest.updateQuest") : t("modalQuest.createQuest")
        }
        onCancel={handleCloseModalQuest}
        cancelText={t("modalQuest.cancelButton")}
        width={1000}
      >
        <p className="font-bold mb-2">{t("modalQuest.questDetails")}</p>
        <div className="grid grid-cols-12 gap-6">
          {isEditMode && (
            <div className="col-span-modal-6">
              <p>
                {t("modalQuest.questID")}
                <label className="text-red">&nbsp;&#42;</label>
              </p>
              <TextArea
                className="custom-areatext"
                placeholder="Quest ID"
                value={questData.questID}
                disabled
                autoSize={{ minRows: 1, maxRows: 1 }}
              />
            </div>
          )}
          <div className="col-span-modal-6">
            <p>
              {t("modalQuest.title")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="title"
              autoSize={{ minRows: 1, maxRows: 20 }}
              value={questData.title}
              onChange={(e) =>
                setQuestData({ ...questData, title: e.target.value })
              }
            />
          </div>
          <div className="col-span-12">
            <p>
              {t("modalQuest.description")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="description"
              autoSize={{ minRows: 1, maxRows: 20 }}
              value={questData.description}
              onChange={(e) =>
                setQuestData({ ...questData, description: e.target.value })
              }
            />
          </div>
          <div className="col-span-12">
            <p>
              {t("modalQuest.targetDescription")}
              <label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="Target Description"
              autoSize={{ minRows: 1, maxRows: 20 }}
              onChange={(e) =>
                setQuestData({
                  ...questData,
                  targetDescription: e.target.value,
                })
              }
              value={questData.targetDescription}
            />
          </div>
        </div>
        <p className="font-bold mt-5 mb-2">
          {t("modalQuest.completionConditions")}
        </p>
        {questData &&
          questData.completionConditions &&
          questData.completionConditions.length > 0 &&
          questData.completionConditions.map((condition, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <p>{condition.itemId}</p>
                {/* <Image src={"@/public"}/> */}
                <p>{condition.quantity}</p>
              </div>
            );
          })}

        <p className="font-bold mb-2">{t("modalQuest.questsWorld")}</p>
      </Modal>
    </div>
  );
};
export default modalQuest;
