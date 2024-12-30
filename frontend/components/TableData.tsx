import { Table } from "antd";
import React from "react";

interface TableDataProps {
  list: any[];
  listSelected: React.Key[];
  setListSelected: React.Dispatch<React.SetStateAction<any[]>>;
  columnName: any[];
  setSelectedFileDetail?: React.Dispatch<React.SetStateAction<any>>;
  searchTerm: string;
  componentName: string;
  setPageData?: React.Dispatch<React.SetStateAction<any>>;
}

const TableData = ({
  list,
  listSelected,
  setListSelected,
  columnName,
  setSelectedFileDetail,
  searchTerm,
  componentName,
  setPageData,
}: TableDataProps) => {
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const selectedRows = list.filter((item) =>
      newSelectedRowKeys.includes(item.key)
    );
    if (componentName === "Page" && selectedRows.length > 0) {
      const selectedPage = selectedRows[0];
      setPageData &&
        setPageData({
          facebook: selectedPage.facebook || "",
          page: selectedPage.page || "",
          facebookID: selectedPage.facebookID || "",
          pageID: selectedPage.pageID || "",
          file: selectedPage.file || [],
          config: selectedPage.config || "",
          actionType: selectedPage.actionType || [],
          key: selectedPage.key || "",
        });
    }

    console.log("Selected Rows:", selectedRows);
    setListSelected(selectedRows);
  };

  const rowSelection = {
    listSelected,
    onChange: onSelectChange,
  };

  const handleRowClick = (record: any) => {
    if (record && setSelectedFileDetail) {
      setSelectedFileDetail(record);
    }
  };

  const filteredList = list.filter((item) => {
    if (componentName === "File") {
      return (
        item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.collectionName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (componentName === "Identity") {
      return (
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.info?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.story?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (componentName === "Page") {
      return item.page?.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (componentName === "Procedure") {
      return (
        item.procedureName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.procedure?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (componentName === "Config") {
      return (
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.target?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mission?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.note?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (componentName === "PostSchedule") {
      return (
        item.pageID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numberIterations
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.customFrequency?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return false;
  });

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="xl:col-span-12 col-span-12">
        <div className="table-responsive border border-bottom-0 dark:border-defaultborder/10">
          <Table
            rowClassName={() => "no-hover"}
            rowSelection={rowSelection}
            columns={columnName}
            dataSource={filteredList.reverse()}
            style={{ height: "100%" }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default TableData;
