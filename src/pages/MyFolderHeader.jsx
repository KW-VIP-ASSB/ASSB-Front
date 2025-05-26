// 장바구니 이름과 장바구니 설정 버튼
const MyFolderHeader = ({ folderName }) => {
  return (
    <div className="flex justify-between w-full mb-5">
      <h1 className="text-2xl">{folderName}</h1>
      <div className="flex gap-5">
        <button className="px-3 py-1 border border-black text-sm">
          장바구니 기준 수정
        </button>
        <button className="px-3 py-1 border border-black text-sm">
          장바구니 삭제
        </button>
      </div>
    </div>
  );
};

export default MyFolderHeader;
