import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment, useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { CiSearch } from "react-icons/ci";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Tooltip } from "antd";
import withAuth from "@/HOC/WithAuth";
import AddNewSchedulePost from "@/modals/AddNewSchedulePost";
import ButtonGradient from "./ButtonGradient";
import { ClipLoader } from "react-spinners";
import { PostScheduleItem, PostScheduleData } from "@/shared/types/commonTypes";
import { postAutoPost } from "@/services/apiServices";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { usePostingContext } from "@/shared/context/PostingContext";
import dynamic from "next/dynamic";
import {
  postListPostSchedule,
  postUpdatePostSchedule,
} from "@/services/apiServicesPostSchedule";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/ultis/localstoragePageManager";
import { useAppContext } from "@/shared/context/ContextApp";
import { diff } from "deep-diff";
const TableData = dynamic(() => import("@/components/TableData"), {
  ssr: false,
});
import dayjs from "dayjs";

const PostSchedule = () => {
  const [isFileManagerOpen, setFileManagerOpen] = useState(false);
  const [listPostSchedule, setListPostSchedule] = useState<PostScheduleItem[]>(
    []
  );
  const [isOpenModalSchedulePost, setIsOpenModalUploadFile] =
    useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [customFrequency, setCustomFrequency] = useState<string>("");
  const [isLoadingAddNewSchedule, setIsLoadingAddNewSchedule] =
    useState<boolean>(false);
  const [postSchedule, setPostSchedule] = useState<PostScheduleData>({
    key: "",
    idea: "",
    pageID: "",
    time: "",
    typeImage: "from_library",
    repeat: "1",
    numberIterations: 3,
  });
  const [querySearch, setQuerySearch] = useState<string>("");
  const [listSelected, setListSelected] = useState<React.Key[]>([]);
  const [listPageSelect, setListPageSelect] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const { listImageUsingPost, setListImageUsingPost } = usePostingContext();

  const context = useAppContext();
  const listAccountFB = context.listAccountFB;
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
      extra: "⌘P",
    },
    {
      key: "3",
      label: "Billing",
      extra: "⌘B",
    },
    {
      key: "4",
      label: "Settings",
      icon: <SettingOutlined />,
      extra: "⌘S",
    },
  ];

  const columnName = [
    {
      title: "STT",
      dataIndex: "key",
      width: 60,
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Page",
      dataIndex: "pageName",
      render: (pageName: string) => (
        <div
          style={{
            minWidth: "100px",
          }}
        >
          {pageName}
        </div>
      ),
    },
    {
      title: "Images",
      dataIndex: "imagesList",
      render: (imagesList: string[]) => (
        <p
          style={{
            minWidth: "70px",
          }}
        >
          (<label className="font-medium text-red">{imagesList.length}</label>)
          images
        </p>
      ),
    },
    {
      title: "Content",
      dataIndex: "content",
      render: (text: string) => (
        <Tooltip title={truncateText(text, 8)}>
          <div
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "pre-wrap",
            }}
          >
            {text.trim()}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "URL Post",
      dataIndex: "linkPost",
      render: (linkPost: string) => {
        return linkPost === "null" ? (
          ""
        ) : (
          <a
            style={{
              minWidth: "70px",
            }}
            href={linkPost}
            className="text-blue"
          >
            Go to post
          </a>
        );
      },
    },
    {
      title: "Post Date",
      dataIndex: "postDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: number) => {
        return status === 1 ? (
          <p className="text-green uppercase">Posted</p>
        ) : (
          <p className="text-red uppercase">Not posted</p>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
          <button
            onClick={() => handleViewPostScheduleItem(record)}
            aria-label="view"
            className="ti-btn ti-btn-icon ti-btn-wave !rounded-full !border-info/10 !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"
          >
            <i className="ri-eye-line"></i>
          </button>
          <button
            aria-label="delete"
            className="ti-btn ti-btn-icon ti-btn-wave !rounded-full !border-danger/10 !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ),
    },
  ];

  const truncateText = (text: string, maxLines: number = 8) => {
    const lines = text.split("\n");
    if (lines.length <= maxLines) return text;
    return lines.slice(0, maxLines).join("\n") + " ...";
  };

  const handleOpenModalSchedulePost = () => {
    setIsOpenModalUploadFile(!isOpenModalSchedulePost);
  };

  const validateDataPostSchedule = () => {
    if (!postSchedule.idea) {
      message.error("Please input idea");
      return false;
    }
    if (!postSchedule.pageID) {
      message.error("Please select page");
      return false;
    }
    if (!postSchedule.time) {
      message.error("Please select time");
      return false;
    }
    if (!postSchedule.typeImage) {
      message.error("Please select type image");
      return false;
    }
    if (!postSchedule.repeat) {
      message.error("Please select repeat");
      return false;
    }
    if (postSchedule.repeat === "custom" && customFrequency.length === 0) {
      message.error("Please input custom frequency");
      return false;
    }
    if (!postSchedule.numberIterations) {
      message.error("Please input number iterations");
      return false;
    }
    if (!postSchedule.typeImage) {
      message.error("Please select repeat");
      return false;
    }
    return true;
  };

  const setDefaultData = () => {
    setPostSchedule({
      key: "",
      idea: "",
      pageID: "",
      time: "",
      typeImage: "from_library",
      repeat: "1",
      numberIterations: 3,
    });
    setListImageUsingPost([]);
  };

  const handleAddSchedulePost = async () => {
    if (!user?.userId) return;
    setIsLoadingAddNewSchedule(true);
    handleOpenModalSchedulePost();
    try {
      const res = await postAutoPost(
        user.userId.toString(),
        postSchedule.pageID,
        postSchedule.idea,
        listImageUsingPost,
        postSchedule.time.format("YYYY-MM-DD HH:mm:ss"),
        postSchedule?.numberIterations ? postSchedule.numberIterations : 0,
        postSchedule.repeat
          ? postSchedule.repeat === "custom"
            ? +customFrequency
            : +postSchedule.repeat
          : 0
      );
      console.log("Check add schedule post", res);
      if (res.data.status === 200) {
        message.success("Add schedule post success");
        setDefaultData();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingAddNewSchedule(false);
    }
  };

  const fetchListPostSchedule = async () => {
    if (!user) return;
    try {
      const res = await postListPostSchedule(user?.userId.toString());
      if (
        res.data.status === 200 &&
        res.data.data &&
        res.data.data.length > 0
      ) {
        const newListPostSchedule = res.data.data.map((item: any) => {
          let imagesList = [];
          try {
            imagesList = item.images ? JSON.parse(item.images) : [];
          } catch (error) {
            console.error("Error parsing images:", error);
          }
          const postDate = new Date(item.post_date);

          const pageName = findPageName(item.page_id);
          return {
            key: item.post_id,
            content: item.content,
            pageID: item.page_id,
            postDate:
              postDate instanceof Date && !isNaN(postDate.getTime())
                ? postDate.toLocaleString("vi-VN")
                : "Invalid date",
            imagesList: imagesList,
            linkPost: item.link_post,
            status: item.status,
            pageName: pageName,
          };
        });
        setListPostSchedule(() => [...newListPostSchedule]);
        saveToLocalStorage("listPostSchedule", newListPostSchedule);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const findPageName = (pageID: string) => {
    const page = listPageSelect.find((item) => item.value === pageID);
    return page ? page.label : "";
  };

  const convertListFbToPageSelect = () => {
    const listAccountFBNew = [...listAccountFB];
    const listPageSelectNew = listAccountFBNew.flatMap((item) => {
      return item.children.map((child: any) => {
        return {
          label: `${item.title} - ${child.title}`,
          value: child.key,
        };
      });
    });
    return listPageSelectNew;
  };

  const fetchListPage = () => {
    const listPage = convertListFbToPageSelect();
    setListPageSelect(listPage);
  };

  const handleViewPostScheduleItem = (record: PostScheduleItem) => {
    setIsEditMode(true);
    setIsOpenModalUploadFile(true);
    setPostSchedule({
      key: record.key,
      idea: record.content,
      pageID: record.pageID,
      time: dayjs(record.postDate, "HH:mm:ss D/M/YYYY"),
      typeImage: "from_library",
      repeat: "-1",
      numberIterations: -1,
    });
    setListImageUsingPost(record.imagesList);
  };

  const handleCloseModalSchedulePost = () => {
    setIsOpenModalUploadFile(false);
    setDefaultData();
    if (isEditMode) {
      setIsEditMode(false);
    }
  };

  const handleUpdateSchedulePost = async () => {
    try {
      const res = await postUpdatePostSchedule("sd");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitModalSchedule = async () => {
    if (!validateDataPostSchedule()) {
      return;
    }
    setIsLoadingAddNewSchedule(true);

    try {
      if (isEditMode) {
        await handleUpdateSchedulePost();
      } else {
        await handleAddSchedulePost();
      }
    } catch (err) {
      setIsLoadingAddNewSchedule(false);
      console.log(err);
    } finally {
      setDefaultData();
      setIsLoadingAddNewSchedule(false);
    }
  };

  useEffect(() => {
    if (listPageSelect.length > 0) {
      fetchListPostSchedule();
      const localPostSchedule = loadFromLocalStorage("listPostSchedule") || [];
      const differences = diff(listPostSchedule, localPostSchedule);
      if (differences) {
        saveToLocalStorage("listPostSchedule", listPostSchedule);
        setListPostSchedule(listPostSchedule);
      }
    }
  }, [user, listPageSelect]);

  useEffect(() => {
    fetchListPage();
  }, [listAccountFB]);

  return (
    <Fragment>
      <Seo title={"Post Schedule Manager"} />
      <div className="file-manager-container p-2 gap-2 sm:!flex !block text-defaulttextcolor text-defaultsize">
        <div
          className={`file-manager-folders ${isFileManagerOpen ? "open" : ""}`}
        >
          <div className="flex p-4 flex-wrap gap-2 items-center justify-between border-b dark:border-defaultborder/10">
            <div>
              <h6 className="font-semibold mb-0 text-[1rem]">
                Post Schedule Manager
              </h6>
            </div>
            <div>
              <ButtonGradient
                {...{
                  disabled: isLoadingAddNewSchedule,
                  handleButton: handleOpenModalSchedulePost,
                  buttonName: isLoadingAddNewSchedule ? (
                    <ClipLoader color="#ffffff" size={24} />
                  ) : (
                    "Add New Schedule"
                  ),
                }}
              />
            </div>
          </div>
          <div
            className="p-4 file-folders-container overflow-scroll"
            id="file-folders-container"
          >
            <div className="flex mb-2 items-center justify-between">
              <p className="mb-0 font-semibold text-[.875rem]">Filter</p>
            </div>
            <div className="w-full md:flex block justify-between items-center mb-4">
              <div className="flex gap-6 items-center">
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      Hover me
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      Hover me
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className="relative max-w-md md:mt-0 mt-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-4 pr-12 text-sm py-1.5 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1 bottom-1 bg-blue-500 px-2 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
                >
                  <CiSearch color="black" size={20} />
                </button>
              </div>
            </div>
            <TableData
              {...{
                list: listPostSchedule,
                listSelected,
                setListSelected,
                columnName,
                searchTerm: querySearch,
                componentName: "PostSchedule",
              }}
            />
          </div>
        </div>
      </div>
      <AddNewSchedulePost
        {...{
          isOpenModalSchedulePost,
          handleCloseModalSchedulePost,
          customFrequency,
          setCustomFrequency,
          handleSubmitModalSchedule,
          postSchedule,
          setPostSchedule,
          setIsLoadingAddNewSchedule,
          isLoadingAddNewSchedule,
          listPageSelect,
          isEditMode,
        }}
      />
    </Fragment>
  );
};

export default withAuth(PostSchedule, {
  requiredRole: "user",
  layout: "Contentlayout",
});
