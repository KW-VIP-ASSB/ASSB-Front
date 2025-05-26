// 각 장바구니 내부의 아이템
const MyFolderItem = ({ itemInfo }) => {
  const {
    imageSrc,
    platform,
    brandName,
    productTitle,
    discount,
    price,
    breadcrumbs,
    hashtags,
  } = itemInfo;

  return (
    <div className="flex w-full border-t border-gray-200">
      <div className="flex items-center">
        <img src={imageSrc} className="w-40 h-auto"></img>
      </div>
      <div className="p-4">
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
          <button className="px-3 py-1 border border-black text-sm cursor-pointer duration-150 hover:bg-black hover:text-white">
            리뷰 요약
          </button>
          <button className="px-3 py-1 border border-black bg-black text-white text-sm cursor-pointer duration-150 hover:bg-white hover:text-black">
            핏 확인하기
          </button>
          <button className="px-3 py-1 border border-black text-sm cursor-pointer hover:bg-black hover:text-white">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyFolderItem;
