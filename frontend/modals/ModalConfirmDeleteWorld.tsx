import React from "react";
import { Modal } from "antd";

interface DeleteProps {
  modal: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handelFunction: any;
  t: (key: string) => string;
  worldID: string;
}

const ModalConfirmDeleteWorld = ({
  modal,
  open,
  setOpen,
  handelFunction,
  t,
  worldID,
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
            {t("youWantToDeleteWorld")}
            <label className="text-red">&nbsp;{worldID && worldID}&nbsp;</label>
            ?
          </p>
        </Modal>
      )}
    </>
  );
};

export default ModalConfirmDeleteWorld;
