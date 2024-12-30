import { Table } from "antd";
import React from "react";

interface TableDataProps {
  list: any[];
  listSelected: React.Key[];
  setListSelected: React.Dispatch<React.SetStateAction<any[]>>;
  columnName: any[];
  setSelectedFileDetail?: React.Dispatch<React.SetStateAction<any>>;
  searchTerm: string;
}

const TableData = ({
  list,
  listSelected,
  setListSelected,
  columnName,
  setSelectedFileDetail,
  searchTerm,
}: TableDataProps) => {
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const selectedRows = list
      .filter((item) => newSelectedRowKeys.includes(item.key))
      .map((item) => ({
        fileName: item.fileName,
        collectionName: item.collectionName,
      }));
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

  // const filteredList = list.filter(
  //   (item) =>
  //     item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.collectionName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="xl:col-span-12 col-span-12">
        <div className="table-responsive border border-bottom-0 dark:border-defaultborder/10">
          <Table
            rowSelection={rowSelection}
            columns={columnName}
            dataSource={list}
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
