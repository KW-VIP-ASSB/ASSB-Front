import React, { useState, useEffect } from "react";
import MyFolderHeader from "./MyFolderHeader";
import MyFolderItem from "./MyFolderItem";
import UrlDropper from "../components/UrlDropper";

export default function MyFolder() {
  const [folderName, setFolderName] = useState("로딩 중...");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        // (1) 로그인 시 localStorage에 저장된 토큰을 꺼내온다
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("토큰이 없습니다. 로그인 후 다시 시도하세요.");
          return;
        }

        // (2) 백엔드 URL (환경 변수 또는 하드코딩)
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const basketName = "test1"; // 요청할 장바구니 이름
        const url = `${baseUrl}/api/baskets/${basketName}?token=${encodeURIComponent(
          token
        )}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error(
            "장바구니 데이터를 불러오지 못했습니다:",
            response.statusText
          );
          return;
        }

        const json = await response.json();
        if (!json.success || !json.data) {
          console.error("서버 응답이 올바르지 않습니다:", json.message);
          return;
        }

        // (3) 폴더 이름 세팅
        setFolderName(json.data.name || "이름 없음");

        // (4) style_infos 객체를 배열 형태로 변환
        const styleInfos = json.data.style_infos || {};
        const mappedItems = Object.values(styleInfos).map((style) => {
          const originalPrice = style.price.original_price;
          const salePrice = style.price.price;
          // const discountRate = Math.round(
          //   ((originalPrice - salePrice) / originalPrice) * 100
          // );

          // "셔츠/남방/블라우스->셔츠/남방" → ["셔츠/남방/블라우스", "셔츠/남방"]
          let breadcrumbs = [];
          if (
            Array.isArray(style.facets.category) &&
            style.facets.category.length > 0
          ) {
            const rawCat = style.facets.category[0];
            breadcrumbs = rawCat.split("->").map((part) => part.trim());
          }

          // 해시태그: 브랜드명 + 카테고리 전체 (필요시 "/" 기준 분리 가능)
          const hashtags = [];
          if (
            Array.isArray(style.facets.brand) &&
            style.facets.brand.length > 0
          ) {
            hashtags.push(style.facets.brand[0]);
          }
          if (
            Array.isArray(style.facets.category) &&
            style.facets.category.length > 0
          ) {
            hashtags.push(style.facets.category[0]);
          }

          let discountRate = 0;
          let discountLabel = "";
          if (
            typeof originalPrice === "number" &&
            typeof salePrice === "number" &&
            originalPrice > 0
          ) {
            discountRate = Math.round(
              ((originalPrice - salePrice) / originalPrice) * 100
            );
            discountLabel = `${discountRate}%`;
          }

          return {
            imageSrc: style.image.origin,
            platform:
              style.site_id === "iylQhcSbkgVxi0Ye"
                ? "무신사"
                : style.site_id === "vPu2SsvYkCYXDCiz"
                ? "지그재그"
                : style.site_id || "",
            brandName: Array.isArray(style.facets.brand)
              ? style.facets.brand[0]
              : "",
            productTitle: style.name,
            discount: {
              rate: discountRate,
              label: discountLabel,
            },
            price: {
              amount: salePrice,
              currency: style.price.currency,
              formatted: `${salePrice.toLocaleString()}원`,
            },
            breadcrumbs,
            hashtags,
            review: style.metadata?.description || "",
            fit: "",
          };
        });

        setItems(mappedItems);
      } catch (error) {
        console.error("장바구니 데이터 요청 중 오류 발생:", error);
      }
    };

    fetchFolder();
  }, []);

  useEffect(() => {
    console.log(items);
  });

  return (
    <div className="p-5">
      <MyFolderHeader folderName={folderName} />
      <UrlDropper items={items} setItems={setItems} />
      {items.map((item, idx) => (
        <MyFolderItem key={idx} itemInfo={item} />
      ))}
    </div>
  );
}
