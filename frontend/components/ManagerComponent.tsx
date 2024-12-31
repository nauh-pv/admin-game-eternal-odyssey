import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment, useState } from "react";
import { CiSearch } from "react-icons/ci";
import dynamic from "next/dynamic";
import ModalConfirm from "@/modals/ModalConfirm";
import { ClipLoader } from "react-spinners";
import ButtonGradient from "./ButtonGradient";
const TableData = dynamic(() => import("@/components/TableData"), {
  ssr: false,
});

interface ManagerComponentProps {
  list: any;
  setIsOpenModalConfirmAuto?: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubcribedAuto?: () => void;
  listPagesId?: any[];
  setListPagesId?: React.Dispatch<React.SetStateAction<any[]>>;
  setAccessTokenPageSelect?: React.Dispatch<React.SetStateAction<string>>;
  isOpenModalConfirmAuto?: boolean;
  columnName: any;
  componentName: string;
  onChangeAuto?: any;
  handleAddNew?: () => void;
  isLoadingButtonAddNew?: boolean;
  setPageData?: React.Dispatch<React.SetStateAction<any>>;
  handleUpdateListPage?: any;
  isLoadingUpdate?: boolean;
}

const ManagerComponent = ({
  list,
  setIsOpenModalConfirmAuto,
  handleSubcribedAuto,
  listPagesId,
  setListPagesId,
  setAccessTokenPageSelect,
  isOpenModalConfirmAuto,
  columnName,
  componentName,
  onChangeAuto,
  handleAddNew,
  isLoadingButtonAddNew,
  setPageData,
  handleUpdateListPage,
  isLoadingUpdate,
}: ManagerComponentProps) => {
  const [isFileManagerOpen, setFileManagerOpen] = useState(false);
  const [querySearch, setQuerySearch] = useState<string>("");
  const [listSelected, setListSelected] = useState<React.Key[]>([]);

  const toggleFileManager1 = () => {
    setFileManagerOpen(false);
  };

  return (
    <Fragment>
      <Seo title={`${componentName} Manager`} />
      <div className="file-manager-container p-2 gap-2 sm:!flex !block text-defaulttextcolor text-defaultsize custom-background-table">
        <div
          className={`file-manager-folders ${isFileManagerOpen ? "open" : ""}`}
        >
          <div className="flex p-4 flex-wrap gap-2 items-center justify-between border-b dark:border-defaultborder/10">
            <div>
              <h6 className="font-semibold mb-0 text-[1rem]">
                {componentName} Manager
              </h6>
            </div>
            <div className="flex gap-2">
              {componentName === "Page" && (
                <div>
                  <ButtonGradient
                    {...{
                      handleButton: handleUpdateListPage,
                      buttonName: isLoadingUpdate ? (
                        <ClipLoader color="#ffffff" size={24} />
                      ) : (
                        "Update"
                      ),
                    }}
                  />
                </div>
              )}
              {handleAddNew && (
                <div>
                  <ButtonGradient
                    {...{
                      handleButton: handleAddNew,
                      buttonName: isLoadingButtonAddNew ? (
                        <ClipLoader color="#ffffff" size={24} />
                      ) : (
                        "Add New"
                      ),
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className="px-4 pt-4 pb-20 file-folders-container !max-h-full !h-full overflow-scroll"
            id="file-folders-container"
          >
            <div className="flex mb-2 items-center justify-between">
              <p className="mb-0 font-semibold text-[.875rem]">Filter</p>
            </div>
            <div className="w-full flex justify-between items-center mb-4">
              <div className="relative max-w-md">
                <input
                  type="text"
                  value={querySearch}
                  onChange={(e) => setQuerySearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-4 pr-12 text-sm py-1.5 text-gray-700 bg-white rounded-md outline-none dark:bg-black dark:bg-opacity-0"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1 bottom-1 bg-blue-500 px-2 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out text-black dark:text-white"
                >
                  <CiSearch size={20} />
                </button>
              </div>
            </div>
            <TableData
              {...{
                list: list,
                listSelected,
                setListSelected,
                columnName,
                searchTerm: querySearch,
                componentName,
                setPageData,
              }}
            />
            {handleSubcribedAuto &&
              isOpenModalConfirmAuto &&
              setIsOpenModalConfirmAuto && (
                <ModalConfirm
                  {...{
                    modal: "Confirm",
                    open: isOpenModalConfirmAuto,
                    setOpen: setIsOpenModalConfirmAuto,
                    handelFunction: handleSubcribedAuto,
                  }}
                />
              )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ManagerComponent.layout = "Contentlayout";
export default ManagerComponent;
