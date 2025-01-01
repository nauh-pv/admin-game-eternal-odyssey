import { Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import data from "@/shared/data/user-data.json";
import { UsersData } from "@/shared/types/commonTypes";

interface ModalUserPostProps {
  isOpenModalUser: boolean;
  handleCloseModalUser: () => void;
  userData: UsersData;
  setUserData: React.Dispatch<React.SetStateAction<UsersData>>;
}
const ModalUser = ({
  isOpenModalUser,
  handleCloseModalUser,
  userData,
  setUserData,
}: ModalUserPostProps) => {
  const handleRoleChange = (value: string) => {
    setUserData({ ...userData, role: value });
  };

  const handleStatusChange = (value: boolean) => {
    setUserData({ ...userData, status: value });
  };

  const handleSubmitModal = () => {};

  return (
    <div>
      <Modal
        title={"User Detail"}
        open={isOpenModalUser}
        onOk={handleSubmitModal}
        okText={"Update User"}
        onCancel={handleCloseModalUser}
        width={1000}
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 flex flex-col gap-1">
            <p>
              User ID<label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="User ID"
              value={userData.id}
              disabled
              autoSize={{ minRows: 1, maxRows: 1 }}
            />
          </div>
          <div className="col-span-3 flex flex-col gap-1">
            <p>
              Email<label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext !h-fit"
              placeholder="Email"
              autoSize={{ minRows: 1, maxRows: 1 }}
              value={userData.email}
            />
          </div>
          <div className="col-span-3 flex flex-col gap-1">
            <p>
              Username<label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="Customer Idea"
              autoSize={{ minRows: 1, maxRows: 20 }}
              value={userData.username}
            />
          </div>
          <div className="col-span-3 flex flex-col gap-1">
            <p>
              Created At<label className="text-red">&nbsp;&#42;</label>
            </p>
            <TextArea
              className="custom-areatext"
              placeholder="Customer Idea"
              autoSize={{ minRows: 1, maxRows: 20 }}
              disabled
              value={userData.createdAt}
            />
          </div>
          <div className="col-span-3 flex flex-col gap-1">
            <p>
              Role<label className="text-red">&nbsp;&#42;</label>
            </p>
            <Select
              value={userData.role}
              onChange={handleRoleChange}
              options={data.roleSelectOptions}
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-span-3 flex flex-col gap-1">
            <p>
              Status<label className="text-red">&nbsp;&#42;</label>
            </p>
            <Select
              value={userData.status}
              onChange={handleStatusChange}
              options={data.statusSelectOptions}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ModalUser;
