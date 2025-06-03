import React, { useState, useEffect } from "react";
import MyFolderHeader from "./MyFolderHeader";
import MyFolderItem from "./MyFolderItem";
import UrlDropper from "../components/UrlDropper";

export default function MyFolder() {
  const [folderName, setFolderName] = useState("로딩 중...");
  const [items, setItems] = useState([]);
  const basketName = "test1";

  // → 컴포넌트 마운트 시 한 번만 기존 장바구니 정보(GET) 가져오기
  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.error("토큰이 없습니다.");

        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const url = `${baseUrl}/api/baskets/${basketName}?token=${encodeURIComponent(
          token
        )}`;

        const response = await fetch(url, {
          method: "GET", // ← 여기서만 GET
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          console.error("GET 실패:", response.statusText);
          return;
        }

        const json = await response.json();
        if (!json.success || !json.data) {
          console.error("올바르지 않은 응답:", json.message);
          return;
        }

        setFolderName(json.data.name || "이름 없음");
        const styleInfos = json.data.style_infos || {};
        const entries = Object.entries(styleInfos); // [ [rawKey, styleObj], … ]

        const mappedItems = entries.map(([rawKey, style]) => {
          // → 가격과 할인 계산
          const originalPrice = style.price?.original_price;
          const salePrice = style.price?.price;
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

          // → breadcrumbs 파싱
          const breadcrumbs =
            Array.isArray(style.facets.category) &&
            style.facets.category.length > 0
              ? style.facets.category[0].split("->").map((s) => s.trim())
              : [];

          // → hashtags 수집
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

          return {
            rawKey,
            rawData: style,

            style_id: style.style_idx,
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
            discount: { rate: discountRate, label: discountLabel },
            price: {
              amount: salePrice || 0,
              currency: style.price?.currency || "",
              formatted:
                salePrice != null ? `${salePrice.toLocaleString()}원` : "",
            },
            breadcrumbs,
            hashtags,
            review: style.metadata?.description || "",
            fit: "",
          };
        });

        setItems(mappedItems);
      } catch (err) {
        console.error("GET 에러:", err);
      }
    };

    fetchFolder();
  }, []);

  return (
    <div className="p-5">
      <MyFolderHeader folderName={folderName} />

      {/* UrlDropper가 드롭 이벤트 발생 시 setItems + PUT 요청을 내부에서 단 한 번만 처리 */}
      <UrlDropper items={items} setItems={setItems} />

      <div className="mt-6 space-y-4">
        {items.map((item, idx) => (
          <MyFolderItem key={idx} itemInfo={item} />
        ))}
      </div>
    </div>
  );
}
