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
    <div className="flex w-full">
      <div className="flex items-center">
        <img src={imageSrc} className="w-30 h-auto"></img>
      </div>
      <div className="p-4 border-b border-gray-200">
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
          <button className="px-3 py-1 border border-black text-sm">
            리뷰 요약
          </button>
          <button className="px-3 py-1 bg-black text-white text-sm">
            핏 확인하기
          </button>
          <button className="px-3 py-1 border border-black text-sm">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyFolderItem;
