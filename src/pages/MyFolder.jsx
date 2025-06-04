// MyFolder.jsx
import React, { useState, useEffect } from "react";
import MyFolderHeader from "./MyFolderHeader";
import MyFolderItem from "./MyFolderItem";
import UrlDropper from "../components/UrlDropper";

export default function MyFolder() {
  const [folderName, setFolderName] = useState("로딩 중...");
  const [items, setItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const basketName = "test1";

  // useEffect(() => {
  //   console.log(isDragging);
  // }, [isDragging]);

  // 1) 컴포넌트 마운트 시 GET 요청으로 기존 장바구니 불러오기 (한 번만)
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
          method: "GET",
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
        const entries = Object.entries(styleInfos); // [ [rawKey, styleObj], ... ]

        const mappedItems = entries.map(([rawKey, style]) => {
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

          const breadcrumbs =
            Array.isArray(style.facets.category) &&
            style.facets.category.length > 0
              ? style.facets.category[0].split("->").map((s) => s.trim())
              : [];

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

  // 2) 항목 삭제 시 호출: items에서 제거 + PUT 요청
  const handleDelete = async (rawKeyToDelete) => {
    // 2-1) state에서 삭제
    const filtered = items.filter((item) => item.rawKey !== rawKeyToDelete);
    setItems(filtered);

    // 2-2) PUT 요청: filtered 배열을 rawKey/rawData 형태로 전송
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const url = `${baseUrl}/api/baskets/${basketName}?token=${encodeURIComponent(
        token
      )}`;

      const payloadObject = {};
      filtered.forEach((item) => {
        payloadObject[item.rawKey] = item.rawData;
      });

      const putResp = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadObject),
      });
      if (!putResp.ok) {
        console.error("삭제 후 PUT 실패:", await putResp.text());
      }
    } catch (err) {
      console.error("삭제 후 PUT 에러:", err);
    }
  };

  // 드래그 화면 이탈 시
  const handleDragLeave = (e) => {
    e.preventDefault();
    console.log("handleDragLeave");
    // setIsDragging(false);
  };

  // 드래그 진입 시
  const handleDragEnter = (e) => {
    e.preventDefault();
    if (isDragging) {
      console.log("handleDragEnter");
      setIsDragging(true);
    }
  };

  // 드래그 화면 위 이동 시
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragging) {
      console.log("handleDragOver");
      setIsDragging(true);
    }
  };

  // 드롭 시
  const handleDrop = (e) => {
    e.preventDefault();
    console.log("handleDrop");
    setIsDragging(false);
  };

  return (
    <div
      className="relative h-[90vh]"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-5">
        <MyFolderHeader folderName={folderName} />
        <div className="mt-6 space-y-4">
          {items.map((item, idx) => (
            <MyFolderItem
              key={idx}
              itemInfo={item}
              onDelete={() => handleDelete(item.rawKey)}
            />
          ))}
        </div>
      </div>

      {isDragging && (
        <UrlDropper
          items={items}
          setItems={setItems}
          onFinished={() => setIsDragging(false)}
        />
      )}
    </div>
  );
}
