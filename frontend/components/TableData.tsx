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
    if (componentName === "Users") {
      return (
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (componentName === "Worlds") {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.worldID.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (componentName === "Quests") {
      return (
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.questID.toLowerCase().includes(searchTerm.toLowerCase())
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
