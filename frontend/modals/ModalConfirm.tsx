import React from "react";
import { Modal } from "antd";

interface DeleteProps {
  modal: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listFileChange?: any[];
  handelFunction: any;
}

const ModalConfirm = ({
  modal,
  open,
  setOpen,
  listFileChange,
  handelFunction,
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
          {modal === "Delete file" && (
            <p>
              Do you really want to
              <label className="text-red">&nbsp;delete&nbsp;</label>
              this{" "}
              <label>
                {listFileChange &&
                  listFileChange.length > 0 &&
                  listFileChange.map((item, index) => {
                    return (
                      <label key={index} className="text-blue">
                        {item.fileName}
                        {index < listFileChange.length - 1 && ", "}&nbsp;
                      </label>
                    );
                  })}
              </label>
              file?
            </p>
          )}
          {modal === "Subscribe Comment" && (
            <p>
              Do you want to sign up for automatic
              <label className="text-red">&nbsp;comment&nbsp;</label>
              replies using AI?
            </p>
          )}
          {modal === "Unsubscribe Comment" && (
            <p>
              Do you want to unsubscribe automatic
              <label className="text-red">&nbsp;comment&nbsp;</label>
              replies using AI?
            </p>
          )}
          {modal === "Subscribe Message" && (
            <p>
              Do you want to sign up for automatic{" "}
              <label className="text-red">&nbsp;message&nbsp;</label>
              replies using AI?
            </p>
          )}
          {modal === "Unsubscribe Message" && (
            <p>
              Do you want to unsubscribe automatic{" "}
              <label className="text-red">&nbsp;message&nbsp;</label>
              replies using AI?
            </p>
          )}
        </Modal>
      )}
    </>
  );
};

export default ModalConfirm;
