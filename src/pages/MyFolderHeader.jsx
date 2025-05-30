import React, { useState } from "react";
import MyFolderEditModal from "./MyFolderEditModal";

const MyFolderHeader = ({ folderName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between w-full pb-5 border-b border-gray-200">
        <h1 className="text-2xl">{folderName}</h1>
        <div className="flex gap-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 border border-black text-sm"
          >
            장바구니 기준 수정
          </button>
          <button className="px-3 py-1 border border-black text-sm">
            장바구니 삭제
          </button>
        </div>
      </div>

      {isModalOpen && (
        <MyFolderEditModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default MyFolderHeader;
