import { Button, message, Modal } from "antd";
import Image from "next/image";
import { MdOutlineDone } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import {
  getImagesByUser,
  postDeleteImage,
  postUploadImages,
} from "@/services/apiServices";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { ClipLoader } from "react-spinners";
import { usePostingContext } from "@/shared/context/PostingContext";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/ultis/localstoragePageManager";
import { diff } from "deep-diff";

interface ModalListImagePostingProps {
  isOpenModalListImage: boolean;
  handleAddSelectImages: () => void;
  handleOpenModalListImages: () => void;
}

const ModalListImagePosting = ({
  isOpenModalListImage,
  handleAddSelectImages,
  handleOpenModalListImages,
}: ModalListImagePostingProps) => {
  const [listImagesUpload, setListImageUpload] = useState<File[]>([]);
  const [listImagesUploaded, setListUploadUploaded] = useState<any>([]);
  const [isLoadingUploadImage, setIsLoadingUploadImage] =
    useState<boolean>(false);

  const postingContext = usePostingContext();

  const { listImageUsingPost, setListImageUsingPost } = postingContext;

  const { user } = useSelector((state: RootState) => state.auth);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    handleFileChange(acceptedFiles);
  }, []);

  const allowedFileTypes: Record<string, boolean> = {
    "image/png": true,
    "image/jpeg": true,
    "image/jpg": true,
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  const checkExistFile = (selectedFile: any) => {
    return false;
  };

  const handleFileChange = (selectedFile: File[]) => {
    if (!selectedFile || selectedFile.length === 0) {
      return;
    }

    const check = checkExistFile(selectedFile);
    if (check) {
      return;
    }

    const isInvalidFile = selectedFile.some(
      (file) => !allowedFileTypes[file.type]
    );

    if (!isInvalidFile) {
      setListImageUpload((prevList) => {
        if (Array.isArray(prevList)) {
          return [...prevList, ...selectedFile];
        } else {
          return selectedFile;
        }
      });
    } else {
      message.error("Please upload files in allowed formats.");
    }
  };

  const handleDeleteImageUploaded = (imageName: string) => {
    setListImageUpload((prev) => {
      const newList = prev.filter((file) => file.name !== imageName);
      return newList;
    });
  };

  const handleUploadImage = async () => {
    if (!user?.userId) return;
    setIsLoadingUploadImage(true);
    try {
      const res = await postUploadImages(
        user?.userId.toString(),
        "",
        listImagesUpload
      );
      if (res.data.status === 200 && res.data.data) {
        message.success("Upload image success!");
        setIsLoadingUploadImage(false);
        setListUploadUploaded((prev: any) => [...prev, ...res.data.data]);
        setListImageUpload([]);
      }
    } catch (e) {
      console.log(e);
      setIsLoadingUploadImage(false);
      message.error("Upload file fail!");
    }
  };
  const isCheckDisableButtonUpload = useCallback(() => {
    if (isLoadingUploadImage || listImagesUpload.length === 0) {
      return true;
    }
    return false;
  }, [isLoadingUploadImage, listImagesUpload]);

  const fetchListImagesUploaded = async () => {
    const listImagesLocal = loadFromLocalStorage("listImages") || [];
    if (listImagesLocal.length > 0) {
      setListUploadUploaded([...listImagesLocal]);
    }
    if (user)
      try {
        const res = await getImagesByUser(user?.userId);
        console.log(res);
        if (res.data.status === 200) {
          const differences = diff(res.data.data, listImagesLocal);
          if (differences) {
            console.log("Vào đâyyy.");

            setListUploadUploaded([...res.data.data]);
            saveToLocalStorage("listImages", res.data.data);
          }
        }
      } catch (e) {
        console.log(e);
      }
  };

  const chooseImageUsingPosting = (imageLink: string) => {
    if (listImageUsingPost.includes(imageLink)) {
      setListImageUsingPost((prev) => {
        const newList = prev.filter((file) => file !== imageLink);
        return newList;
      });
    } else {
      setListImageUsingPost([...listImageUsingPost, imageLink]);
    }
  };

  const handleDeleteImage = async (imageID: number) => {
    try {
      const res = await postDeleteImage(imageID);
      if (res.data.status === 200) {
        message.success("Delete image success!");
        setListUploadUploaded((prev: any) => {
          const newList = prev.filter((file: any) => file.image_id !== imageID);
          return newList;
        });
      }
    } catch (e) {
      message.error("Delete image failt!");
      console.log(e);
    }
  };

  useEffect(() => {
    fetchListImagesUploaded();
  }, [user]);

  return (
    <div>
      {isOpenModalListImage && (
        <Modal
          title="Select Image For Post"
          open={isOpenModalListImage}
          onOk={handleAddSelectImages}
          okText="Select Image"
          onCancel={handleOpenModalListImages}
          width={1200}
        >
          <div
            {...getRootProps({
              className:
                "dropzone col-span-12 border p-2 flex justify-between items-center",
            })}
          >
            <div className="flex gap-2">
              {listImagesUpload && listImagesUpload.length > 0 && (
                <div className="flex gap-2 items-center justify-center">
                  {listImagesUpload.map((image: File, index: number) => {
                    const fileUrl = URL.createObjectURL(image);
                    return (
                      <div className="select-image-posting relative group">
                        <div
                          className="absolute delete-image"
                          onClick={() => handleDeleteImageUploaded(image?.name)}
                        >
                          <FiMinus />
                        </div>
                        <Image
                          key={index}
                          width={100}
                          height={100}
                          src={fileUrl}
                          alt="Item image list"
                          className="h-[100%] w-fit"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="flex gap-2">
                <label className="select-image-posting" htmlFor="upload">
                  <IoAdd size={17} />
                  <p> {isDragActive ? "Selected Image" : "Upload Image"}</p>
                </label>
              </div>
              <input id="upload" type="file" hidden {...getInputProps()} />
            </div>
            <div>
              <Button
                disabled={isCheckDisableButtonUpload()}
                color="danger"
                variant="filled"
                onClick={handleUploadImage}
                style={{ width: "100px" }}
              >
                {isLoadingUploadImage ? (
                  <ClipLoader color="#000000" size={24} />
                ) : (
                  "Upload Image"
                )}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 title-list-image">
              <p className="text-lg font-medium">List Image</p>
              {listImageUsingPost.length > 0 && (
                <p>
                  Selected (
                  <label className="text-red">
                    {listImageUsingPost.length}
                  </label>
                  ) photos
                </p>
              )}
            </div>
            {listImagesUploaded.length > 0 &&
              listImagesUploaded.map((image: any, index: number) => {
                const isSelected = listImageUsingPost.includes(
                  image.link_images
                );
                return (
                  <div
                    key={index}
                    className="container-image-item relative group"
                  >
                    <div
                      className="absolute delete-image"
                      onClick={() => handleDeleteImage(image?.image_id)}
                    >
                      <FiMinus />
                    </div>
                    <div
                      className="relative group"
                      onClick={() => chooseImageUsingPosting(image.link_images)}
                    >
                      {isSelected && (
                        <div className="item-select-image">
                          <MdOutlineDone
                            size={20}
                            className="text-white text-4xl"
                          />
                        </div>
                      )}
                      <Image
                        width={400}
                        height={400}
                        src={image.link_images}
                        alt="item list"
                        className="image-item"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </Modal>
      )}
    </div>
  );
};
export default ModalListImagePosting;
