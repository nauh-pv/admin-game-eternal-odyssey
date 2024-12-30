import {
  Modal,
  Select,
  DatePicker,
  Input,
  InputNumber,
  InputNumberProps,
} from "antd";
import { repeatOptions, imageOptions } from "@/shared/data/dashboardData";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { PostScheduleData } from "@/shared/types/commonTypes";
import ModalListImagePosting from "./ModalListImagePosting";
import { IoAdd } from "react-icons/io5";
import { usePostingContext } from "@/shared/context/PostingContext";
import Image from "next/image";
import { FiMinus } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

interface AddNewSchedulePostProps {
  isOpenModalSchedulePost: boolean;
  handleCloseModalSchedulePost: () => void;
  customFrequency: string;
  setCustomFrequency: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitModalSchedule?: () => void;
  postSchedule: PostScheduleData;
  setPostSchedule: React.Dispatch<React.SetStateAction<PostScheduleData>>;
  isLoadingAddNewSchedule: boolean;
  listPageSelect: any[];
  isEditMode: boolean;
}
const AddNewSchedulePost = ({
  isOpenModalSchedulePost,
  handleCloseModalSchedulePost,
  customFrequency,
  setCustomFrequency,
  handleSubmitModalSchedule,
  postSchedule,
  setPostSchedule,
  isLoadingAddNewSchedule,
  listPageSelect,
  isEditMode,
}: AddNewSchedulePostProps) => {
  const handleRepeatChange = (value: string) => {
    setPostSchedule((prev) => ({ ...prev, repeat: value }));
    if (value !== "custom") {
      setCustomFrequency("");
    }
  };
  const [isOpenModalListImage, setIsOpenModalListImage] =
    useState<boolean>(false);

  const postingContext = usePostingContext();
  const { listImageUsingPost, setListImageUsingPost } = postingContext;

  const onChangeSelectPage = (item: any) => {
    setPostSchedule((prev) => ({ ...prev, pageID: item }));
  };

  const handleChangeNumberIterations: InputNumberProps["onChange"] = (
    value
  ) => {
    if (value)
      setPostSchedule((prev) => ({ ...prev, numberIterations: +value }));
  };

  const handleAddSelectImages = () => {
    setIsOpenModalListImage(false);
  };

  const handleOpenModalListImages = () => {
    setIsOpenModalListImage(!isOpenModalListImage);
  };

  const handleDeleteImageUsing = (image: string) => {
    setListImageUsingPost((prev) => {
      return prev.filter((item) => item !== image);
    });
  };

  return (
    <div>
      {isOpenModalSchedulePost && (
        <Modal
          title="Add New Posting Schedule"
          open={isOpenModalSchedulePost}
          onOk={handleSubmitModalSchedule}
          okText={
            isLoadingAddNewSchedule ? (
              <ClipLoader color="#000000" size={20} />
            ) : isEditMode ? (
              "Update Schedule"
            ) : (
              "Add Schedule"
            )
          }
          onCancel={handleCloseModalSchedulePost}
          width={1000}
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 flex flex-col gap-1">
              <p>
                Customer Idea<label className="text-red">&nbsp;&#42;</label>
              </p>
              <TextArea
                className="custom-areatext"
                placeholder="Customer Idea"
                onChange={(e) =>
                  setPostSchedule((prev) => ({ ...prev, idea: e.target.value }))
                }
                autoSize={{ minRows: 2, maxRows: 20 }}
                value={postSchedule.idea}
              />
            </div>
            <div className="col-span-6 flex flex-col gap-1">
              <p>
                Select Page / Group
                <label className="text-red">&nbsp;&#42;</label>
              </p>
              <Select
                style={{ width: "100%" }}
                value={postSchedule.pageID}
                onChange={onChangeSelectPage}
                options={listPageSelect}
              />
            </div>
            <div className="col-span-6 flex flex-col gap-1">
              <p>
                Time<label className="text-red">&nbsp;&#42;</label>
              </p>
              <DatePicker
                showTime
                value={postSchedule.time}
                onChange={(value) =>
                  setPostSchedule((prev) => ({ ...prev, time: value }))
                }
              />
            </div>
            {postSchedule.repeat !== "-1" && (
              <div className="col-span-3 flex flex-col gap-1">
                <p>Repeat</p>
                <div className="flex items-center gap-2">
                  <Select
                    value={postSchedule.repeat}
                    onChange={handleRepeatChange}
                    options={repeatOptions}
                    defaultValue={"0"}
                    style={{ width: "100%" }}
                  />
                  {postSchedule.repeat === "custom" && (
                    <Input
                      type="text"
                      className="custom-input"
                      placeholder="Days"
                      disabled={false}
                      value={customFrequency}
                      onChange={(e) => setCustomFrequency(e.target.value)}
                    />
                  )}
                </div>
              </div>
            )}
            {postSchedule.numberIterations !== -1 && (
              <div className="col-span-3 flex flex-col gap-1">
                <p>Number of iterations</p>
                <InputNumber
                  width="100%"
                  min={1}
                  max={50}
                  value={postSchedule.numberIterations}
                  onChange={handleChangeNumberIterations}
                />
              </div>
            )}
            <div className="col-span-6 flex flex-col gap-1">
              <p>
                Image<label className="text-red">&nbsp;&#42;</label>
              </p>
              <Select
                options={imageOptions}
                style={{ width: "100%" }}
                onChange={(value) =>
                  setPostSchedule((prev) => ({ ...prev, typeImage: value }))
                }
                value={postSchedule.typeImage}
              />
            </div>
            {postSchedule.typeImage === "from_library" && (
              <div className="col-span-12 border p-2 flex gap-2 items-center">
                {listImageUsingPost.length > 0 &&
                  listImageUsingPost.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className="container-image-item relative group"
                      >
                        <div
                          className="absolute delete-image"
                          onClick={() => handleDeleteImageUsing(image)}
                        >
                          <FiMinus />
                        </div>
                        <Image
                          width={400}
                          height={400}
                          src={image}
                          alt="item list"
                          className="image-item-selected"
                        />
                      </div>
                    );
                  })}
                <div
                  className="select-image-posting"
                  onClick={handleOpenModalListImages}
                >
                  <IoAdd size={17} />
                  <p>Select Images</p>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
      <ModalListImagePosting
        {...{
          isOpenModalListImage,
          handleAddSelectImages,
          handleOpenModalListImages,
          listImages: [],
        }}
      />
    </div>
  );
};
export default AddNewSchedulePost;
