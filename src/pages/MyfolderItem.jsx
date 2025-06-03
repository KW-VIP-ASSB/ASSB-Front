// 각 장바구니 내부의 아이템
import { useEffect, useState } from "react";

const MyFolderItem = ({ itemInfo }) => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [fitOpen, setFitOpen] = useState(false);

  const {
    imageSrc,
    platform,
    brandName,
    productTitle,
    discount,
    price,
    breadcrumbs,
    hashtags,
    review,
    fit,
  } = itemInfo;

  useEffect(() => {
    if (itemInfo.review) setReviewOpen(true);
    if (itemInfo.fit) setFitOpen(true);
  }, [itemInfo.review, itemInfo.fit]);

  return (
    <div className="w-full">
      <div className="flex w-full py-4">
        <div className="flex w-1/5 items-center">
          <img src={imageSrc} className="w-40 h-auto"></img>
        </div>
        <div className="px-4 w-4/5">
          <div className="text-xs text-gray-500">{platform}</div>
          <div className="mt-1 text-sm">{brandName}</div>
          <div className="mt-2 text-xl font-medium leading-snug">
            {productTitle}
          </div>

          <div className="flex items-baseline mt-2 mb-2">
            <span className="text-red-500 font-bold text-base mr-2">
              {discount.label}
            </span>
            <span className="text-base">{price.formatted}</span>
          </div>

          <div className="text-xs text-gray-400 mb-2">
            {breadcrumbs.join(" > ")}
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {hashtags.map((tag, idx) => (
              <span key={idx} className="text-xs text-gray-600">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setReviewOpen(true);
              }}
              className="px-3 py-1 border border-black text-sm cursor-pointer duration-150 hover:bg-black hover:text-white"
            >
              리뷰 요약
            </button>
            <button
              onClick={() => {
                setFitOpen(true);
              }}
              className="px-3 py-1 border border-black bg-black text-white text-sm cursor-pointer duration-150 hover:bg-white hover:text-black"
            >
              핏 확인하기
            </button>
            <button className="px-3 py-1 border border-black text-sm cursor-pointer hover:bg-black hover:text-white">
              삭제
            </button>
          </div>
        </div>
      </div>

      {reviewOpen && (
        <div className="overflow-hidden">
          {/* 헤더: 클릭하면 open 토글 */}
          <div
            className="flex justify-between items-center cursor-pointer select-none"
            onClick={() => setReviewOpen((o) => !o)}
          >
            <h2 className="flex text-sm">
              <span className="w-40 truncate">{productTitle}</span>에 대한 리뷰
              요약
            </h2>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                reviewOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* open 상태일 때만 본문 */}
          {reviewOpen && <p className="p-3 border text-sm">{review}</p>}
        </div>
      )}

      {fitOpen && (
        <div className="overflow-hidden">
          {/* 헤더: 클릭하면 open 토글 */}
          <div
            className="flex justify-between items-center cursor-pointer select-none"
            onClick={() => setFitOpen((o) => !o)}
          >
            <h2 className="flex text-sm">
              <span className="w-40 truncate">{productTitle}</span>에 대한 핏
              확인 요약
            </h2>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                fitOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* open 상태일 때만 본문 */}
          {fitOpen && <p className="p-3 border text-sm">{fit}</p>}
          {fitOpen && (
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 border border-black text-sm cursor-pointer hover:bg-black hover:text-white">
                원하는 스타일 변경하고 다시 생성하기
              </button>
              <button className="px-3 py-1 border border-black text-sm cursor-pointer hover:bg-black hover:text-white">
                내 핏 정보 변경하고 다시 생성하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyFolderItem;
