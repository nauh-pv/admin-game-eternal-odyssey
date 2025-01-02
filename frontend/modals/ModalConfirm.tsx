import React from "react";
import { Modal } from "antd";

interface DeleteProps {
  modal: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handelFunction: any;
  t: (key: string) => string;
  userID: string;
}

const ModalConfirm = ({
  modal,
  open,
  setOpen,
  handelFunction,
  t,
  userID,
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
            {t("youWantToDelete")}
            <label className="text-red">&nbsp;{userID && userID}&nbsp;</label>?
          </p>
        </Modal>
      )}
    </>
  );
};

export default ModalConfirm;
