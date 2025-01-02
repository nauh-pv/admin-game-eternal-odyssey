import React from "react";
import { Modal } from "antd";

interface ModalDeletePageManagerProps {
  modelName: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pageName?: string;
  actionType?: string;
  handelFunction: any;
  setDefault: React.Dispatch<React.SetStateAction<void>>;
}

const ModalDeletePageConfig = ({
  modelName,
  open,
  setOpen,
  handelFunction,
  pageName,
  actionType,
  setDefault,
}: ModalDeletePageManagerProps) => {
  const handleCancel = () => {
    setOpen(false);
    setDefault();
  };
  return (
    <>
      {open && (
        <Modal
          title={modelName}
          open={open}
          onOk={handelFunction}
          onCancel={handleCancel}
        >
          {modelName === "Delete Page Manager" ? (
            <p>
              Do you really want to
              <label className="text-red">&nbsp;delete&nbsp;</label>
              this
              <label className="text-blue">&nbsp;{pageName}&nbsp;</label>of
              function
              <label className="text-blue">&nbsp;{actionType}</label>?
            </p>
          ) : (
            <p>
              Do you really want to
              <label className="text-red">&nbsp;delete&nbsp;</label>
              this
              <label className="text-blue">&nbsp;{pageName}</label>?
            </p>
          )}
        </Modal>
      )}
    </>
  );
};

export default ModalDeletePageConfig;
