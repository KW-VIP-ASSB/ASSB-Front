import MyFolderHeader from "./MyFolderHeader";
import MyFolderItem from "./MyFolderItem";

const folderName = "새 장바구니1";
const items = [
  {
    imageSrc: "/assets/item1.png",
    platform: "지그재그",
    brandName: "대충브랜드이름",
    productTitle: "봄신상새내기개강룩어쩌고저쩌고대충가디건",
    discount: {
      rate: 45,
      label: "45%",
    },
    price: {
      amount: 12345,
      currency: "KRW",
      formatted: "12,345원",
    },
    breadcrumbs: ["카테고리", "상의", "아우터", "가디건"],
    hashtags: ["가디건", "상의", "가디건", "가디건", "가디건"],
  },
  {
    imageSrc: "/assets/item2.png",
    platform: "무신사",
    brandName: "다른브랜드이름",
    productTitle: "세미 오버핏 가디건 - 3color",
    discount: {
      rate: 90,
      label: "90%",
    },
    price: {
      amount: 2345,
      currency: "KRW",
      formatted: "25,900원",
    },
    breadcrumbs: ["카테고리", "상의", "셔츠"],
    hashtags: ["상의", "봄신상", "가디건"],
  },
];

const MyFolder = () => {
  return (
    <div className="p-5">
      <MyFolderHeader folderName={folderName} />

      {items.map((item, idx) => (
        <MyFolderItem key={idx} itemInfo={item} />
      ))}
    </div>
  );
};

export default MyFolder;
