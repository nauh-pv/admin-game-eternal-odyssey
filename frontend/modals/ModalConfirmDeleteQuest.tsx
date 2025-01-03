import React from "react";
import { Modal } from "antd";

interface DeleteProps {
  modal: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handelFunction: any;
  t: (key: string) => string;
  questID: string;
}

const ModalConfirmDeleteQuest = ({
  modal,
  open,
  setOpen,
  handelFunction,
  t,
  questID,
}: DeleteProps) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Modal
          title={modal}
          open={open}
          onOk={handelFunction}
          onCancel={handleCancel}
        >
          <p>
            {t("youWantToDeleteQuest")}
            <label className="text-red">&nbsp;{questID && questID}&nbsp;</label>
            ?
          </p>
        </Modal>
      )}
    </>
  );
};

export default ModalConfirmDeleteQuest;
