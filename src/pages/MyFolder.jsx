import React from "react";
import MyFolderItem from "./MyfolderItem";

const items = [
  {
    platform: "zigzag",
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
    platform: "zigzag",
    brandName: "다른브랜드이름",
    productTitle: "여름신상루즈핏셔츠멋있어보이는코디용셔츠",
    discount: {
      rate: 30,
      label: "30%",
    },
    price: {
      amount: 25900,
      currency: "KRW",
      formatted: "25,900원",
    },
    breadcrumbs: ["카테고리", "상의", "셔츠"],
    hashtags: ["셔츠", "여름신상", "루즈핏", "코디"],
  },
];

const MyFolder = () => {
  return (
    <div>
      {items.map((item, idx) => (
        <MyFolderItem key={idx} itemInfo={item} />
      ))}
    </div>
  );
};

export default MyFolder;
