import React from "react";

export default function UrlDropper({ items, setItems }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    const urlString =
      e.dataTransfer.getData("text/uri-list") ||
      e.dataTransfer.getData("text/plain");
    if (!urlString) return;

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const parsed = new URL(urlString);

      // 1) style_id: 마지막 세그먼트
      const segments = parsed.pathname.split("/");
      const styleId = segments.filter((seg) => seg.length > 0).pop() || "";

      // 2) site_id: 호스트네임으로 분기
      const hostname = parsed.hostname.toLowerCase();
      let siteId = "";
      if (hostname.includes("zigzag.kr")) {
        siteId = "vPu2SsvYkCYXDCiz";
      } else if (hostname.includes("musinsa.com")) {
        siteId = "iylQhcSbkgVxi0Ye";
      } else {
        alert("지원하지 않는 사이트입니다: " + hostname);
        return;
      }

      // 3) API 요청
      const payload = [{ site_id: siteId, style_id: styleId }];
      const response = await fetch(`${baseUrl}/api/styles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        console.error("API 요청 실패:", await response.text());
        alert("스타일 등록에 실패했습니다.");
        return;
      }

      // 4) 원본 JSON 파싱: { "8074": { … }, ... }
      const rawData = await response.json();
      // rawData 안의 값들(StyleInfoResponse 객체들)만 꺼내서 배열로 만들고
      const rawArray = Object.values(rawData);

      // 5) UI용 itemInfo 구조로 매핑
      const mappedNewItems = rawArray.map((style) => {
        // 가격/할인 계산
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

        // breadcrumbs: "카테고리1->카테고리2" → ["카테고리1", "카테고리2"]
        const breadcrumbs =
          Array.isArray(style.facets.category) &&
          style.facets.category.length > 0
            ? style.facets.category[0].split("->").map((p) => p.trim())
            : [];

        // hashtags: 브랜드 + 카테고리 전체
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
          imageSrc: style.image.origin,
          platform:
            style.site_id === "vPu2SsvYkCYXDCiz"
              ? "지그재그"
              : style.site_id === "iylQhcSbkgVxi0Ye"
              ? "무신사"
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

      // 6) 기존 items 뒤에 새로 매핑된 아이템들을 합쳐서 업데이트
      setItems((prev) => [...prev, ...mappedNewItems]);

      alert(`style_id: ${styleId}\nsite_id: ${siteId} → 정상 등록 완료`);
    } catch (err) {
      console.error("잘못된 URL 형식입니다:", err);
      alert("유효한 URL을 드롭해주세요.");
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-400 p-10 text-center rounded-lg"
    >
      <p>여기에 URL을 드래그 앤 드롭하세요</p>
    </div>
  );
}
