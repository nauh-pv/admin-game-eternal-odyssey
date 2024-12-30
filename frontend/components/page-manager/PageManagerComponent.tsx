import ManagerComponent from "@/components/ManagerComponent";
import { useAppContext } from "@/shared/context/ContextApp";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { Checkbox, message, Select, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "@/shared/data/page-manager.json";
import {
  postDeleteManagerConfig,
  postSubscribeAutoReply,
  postUpdateManagerConfig,
} from "@/services/apiServices";
import { PageManager } from "@/shared/types/commonTypes";
import { deletePage, updatePage } from "@/shared/redux/list/fileSelector";
import { VscCommentUnresolved } from "react-icons/vsc";
import { TbMessageCircleUp } from "react-icons/tb";
import ModalConfirm from "@/modals/ModalConfirm";
import ModalDeletePageManager from "@/modals/ModalDeletePageConfig";

interface DataSubscribe {
  name: string;
  pageID: string;
  pageAccessToken: string;
  action: number;
  key: string;
}

const PageManagerComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [listFileSelectValue, setListFileSelectValue] = useState<{
    [key: string]: string[];
  }>({});
  const [listFileSelect, setListFileSelect] = useState<any[]>([]);
  const [listConfigSelect, setListConfigSelect] = useState<any[]>([]);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [isOpenModalConfirmAuto, setIsOpenModalConfirmAuto] =
    useState<boolean>(false);
  const [isOpenDeletePageManagerModal, setIsOpenDeletePageManagerModal] =
    useState<boolean>(false);
  const [dataSubscribe, setDataSubscribe] = useState<DataSubscribe>({
    name: "",
    pageID: "",
    pageAccessToken: "",
    action: 0,
    key: "",
  });
  const [pageData, setPageData] = useState<PageManager>({
    facebook: "",
    page: "",
    facebookID: "",
    pageID: "",
    file: [],
    config: "",
    actionType: "",
    key: "",
    subscribed: {
      comments: 0,
      messages: 0,
    },
  });

  const user = useSelector((state: RootState) => state.auth.user);
  const context = useAppContext();
  const { listFile, listAccountFB } = context;
  const { listConfig, listPage } = useSelector(
    (state: RootState) => state.list
  );

  const columnName = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Facebook Account",
      dataIndex: "facebook",
    },
    {
      title: "Page",
      dataIndex: "page",
    },
    {
      title: "File",
      dataIndex: "file",
      render: (_: any, record: any) => {
        return (
          <Select
            mode="multiple"
            style={{ width: "150px", maxWidth: "150px" }}
            placeholder="Select File"
            options={listFileSelect}
            maxTagCount={0}
            maxTagPlaceholder={(omittedValues) => `+${omittedValues.length}...`}
            value={listFileSelectValue[record.key] || []}
            onChange={(selectedValues) =>
              handleFileSelect(record.key, selectedValues)
            }
          />
        );
      },
    },
    {
      title: "Config",
      dataIndex: "config",
      render: (text: string, record: any) => (
        <Select
          onChange={(value) => handleChangeConfigSelect(value, record)}
          options={listConfigSelect}
          style={{ width: "150px", maxWidth: "150px" }}
          value={record.config}
        />
      ),
    },
    {
      title: "Action Type",
      dataIndex: "actionType",
      render: (_: any, record: any) => (
        <p>{data.listActionType[record.actionType ? record.actionType : 0]}</p>
      ),
    },
    {
      title: "Auto",
      key: "subscribed",
      render: (_: any, record: any) => (
        <div className="flex items-center">
          {record.actionType === 1 && (
            <div className="flex items-center justify-center gap-1">
              <Tooltip
                title="Subscribe auto message reply"
                className="flex items-center justify-center gap-1"
                overlayInnerStyle={{
                  fontSize: "12px",
                }}
              >
                <button
                  onClick={() =>
                    onChangeAutoReply(
                      {
                        target: { checked: record.subscribed?.messages !== 1 },
                      },
                      "Message",
                      record
                    )
                  }
                  aria-label="Subscribe Message"
                  className="ti-btn ti-btn-icon ti-btn-wave !rounded-full !border-info/10 !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"
                >
                  <TbMessageCircleUp />
                </button>
                <Checkbox
                  checked={record.subscribed?.messages === 1 && true}
                  onChange={(e) => onChangeAutoReply(e, "Message", record)}
                ></Checkbox>{" "}
              </Tooltip>
            </div>
          )}
          {record.actionType === 0 && (
            <div className="flex items-center justify-center gap-1">
              <Tooltip
                title="Subscribe auto comment reply"
                className="flex items-center justify-center gap-1"
                overlayInnerStyle={{
                  fontSize: "12px",
                }}
              >
                <button
                  onClick={() =>
                    onChangeAutoReply(
                      {
                        target: { checked: record.subscribed?.comments !== 1 },
                      },
                      "Comment",
                      record
                    )
                  }
                  aria-label="Subscribe Comment"
                  className="ti-btn ti-btn-icon ti-btn-primary !rounded-full !border-info/10 !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"
                >
                  <VscCommentUnresolved />
                </button>
                <Checkbox
                  checked={record.subscribed?.comments === 1 && true}
                  onChange={(e) => onChangeAutoReply(e, "Comment", record)}
                ></Checkbox>
              </Tooltip>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
          <button
            onClick={() => handleClickDelete(record)}
            aria-label="delete"
            className="ti-btn ti-btn-icon ti-btn-wave !rounded-full !border-danger/10 !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ),
    },
  ];

  const handleFileSelect = (key: string, selectedValues: string[]) => {
    const selectedFiles = listFile.filter((file) =>
      selectedValues.includes(file.collectionName)
    );
    setListFileSelectValue((prev) => ({
      ...prev,
      [key]: selectedValues,
    }));
    const listUpdatedPage = {
      ...listPage.find((page) => page.key === key),
      file: selectedFiles.map((file) => ({
        collectionName: file.collectionName,
        fileName: file.fileName,
      })),
    } as PageManager;
    dispatch(updatePage(listUpdatedPage));
  };

  const convertListFileForSelect = () => {
    const listFileNew = listFile.map((file, index) => {
      return {
        value: file.collectionName,
        label: file.fileName,
      };
    });
    setListFileSelect(listFileNew);
  };

  const handleChangeConfigSelect = (value: string, record: any) => {
    const listUpdatedPage = {
      ...listPage.find((page) => page.key === record.key),
      config: value,
    } as PageManager;

    dispatch(updatePage(listUpdatedPage));
  };

  const convertConfigToSelect = () => {
    const listConfigNew = listConfig.map((config) => {
      return {
        value: config.key,
        label: config.name,
      };
    });
    setListConfigSelect(listConfigNew);
  };

  const handleUpdateListPage = async () => {
    if (!user) return;
    setIsLoadingUpdate(true);
    console.log(pageData);

    try {
      const res = await postUpdateManagerConfig(
        user?.userId,
        pageData.key.toString(),
        pageData.facebook,
        pageData.pageID,
        pageData.page,
        pageData.file,
        pageData.config,
        +pageData.actionType
      );
      if (res.data.status === 200) {
        message.success("Update success");
      }
    } catch (e) {
      console.log(e);
      setIsLoadingUpdate(false);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const convertListFileOfPage = useCallback(() => {
    if (listPage.length > 0) {
      const initialFileSelectValue = listPage.reduce((acc, page) => {
        acc[page.key] = page.file.map((file) => file.collectionName);
        return acc;
      }, {} as { [key: string]: string[] });
      setListFileSelectValue(initialFileSelectValue);
    }
  }, [listPage]);

  const findAccessToken = (pageID: string) => {
    const account = listAccountFB.find((acc: any) =>
      acc.children?.some((child: any) => child.key === pageID)
    );

    if (account) {
      const child = account.children.find((child: any) => child.key === pageID);
      return child?.accessToken || null;
    }

    return null;
  };

  const onChangeAutoReply = (e: any, name: string, record: PageManager) => {
    console.log(record);
    const accessToken = findAccessToken(record.pageID);
    if (e.target.checked) {
      setDataSubscribe((prev) => ({
        ...prev,
        action: 1,
        name: `Subscribe ${name}`,
        key: record.key,
        pageID: record.pageID,
        pageAccessToken: accessToken,
      }));
      setIsOpenModalConfirmAuto(true);
    } else {
      setDataSubscribe((prev) => ({
        ...prev,
        action: 0,
        name: `Unsubscribe ${name}`,
        key: record.key,
        pageID: record.pageID,
        pageAccessToken: accessToken,
      }));
      setIsOpenModalConfirmAuto(true);
    }
  };

  const handleSubscribedAutoReply = async () => {
    if (!user?.userId) return;
    try {
      console.log(
        user?.userId.toString(),
        dataSubscribe.pageID,
        dataSubscribe.pageAccessToken,
        dataSubscribe.name,
        dataSubscribe.action
      );

      const res = await postSubscribeAutoReply(
        user?.userId.toString(),
        dataSubscribe.pageID,
        dataSubscribe.pageAccessToken,
        dataSubscribe.name,
        dataSubscribe.action
      );
      if (res.data.status === 200) {
        message.success(
          `Successfully ${dataSubscribe.name} reply automatically!`
        );
        const pageToUpdate = listPage.find(
          (page) => page.key === dataSubscribe.key
        );

        if (pageToUpdate) {
          const updatedSubscribed = {
            ...pageToUpdate.subscribed,
            ...(dataSubscribe.name === "Subscribe Comment" ||
            dataSubscribe.name === "Unsubscribe Comment"
              ? { comments: Number(dataSubscribe.action) }
              : { messages: Number(dataSubscribe.action) }),
          };

          const listUpdatedPage = {
            ...pageToUpdate,
            subscribed: updatedSubscribed,
          } as PageManager;

          dispatch(updatePage(listUpdatedPage));
          setIsOpenModalConfirmAuto(false);
        } else {
          console.error("Page to update not found in listPage");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeletePageManager = async () => {
    if (!user?.userId) return;
    try {
      const res = await postDeleteManagerConfig(
        user?.userId,
        pageData.key.toString()
      );
      if (res.data.status === 200) {
        message.success("Delete success");
        dispatch(deletePage(pageData.key));
        setIsOpenDeletePageManagerModal(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setDefaultData();
    }
  };

  const handleClickDelete = (record: any) => {
    const newPageData = {
      ...pageData,
      page: record.page,
      actionType:
        record.actionType === 0
          ? "Comment"
          : record.actionType === 1
          ? "Message"
          : "Post",
      key: record.key,
    };
    setPageData(newPageData);
    setIsOpenDeletePageManagerModal(true);
  };

  const setDefaultData = () => {
    setPageData({
      facebook: "",
      page: "",
      facebookID: "",
      pageID: "",
      file: [],
      config: "",
      actionType: "",
      key: "",
      subscribed: {
        comments: 0,
        messages: 0,
      },
    });
  };

  useEffect(() => {
    convertListFileForSelect();
  }, [listFile]);

  useEffect(() => {
    convertConfigToSelect();
  }, [listConfig]);

  useEffect(() => {
    convertListFileOfPage();
  }, [listPage]);

  return (
    <>
      <ManagerComponent
        {...{
          list: listPage,
          columnName,
          componentName: "Page",
          nameButton: "Add Page Config",
          setPageData,
          handleUpdateListPage,
          isLoadingUpdate,
        }}
      />
      <ModalConfirm
        {...{
          modal: dataSubscribe.name,
          open: isOpenModalConfirmAuto,
          setOpen: setIsOpenModalConfirmAuto,
          handelFunction: handleSubscribedAutoReply,
        }}
      />
      <ModalDeletePageManager
        {...{
          modal: "Delete Page Manager",
          open: isOpenDeletePageManagerModal,
          setOpen: setIsOpenDeletePageManagerModal,
          handelFunction: handleDeletePageManager,
          pageName: pageData.page,
          actionType: pageData.actionType,
          setDefault: setDefaultData,
        }}
      />
    </>
  );
};
export default PageManagerComponent;
