// UrlDropper.jsx
import React from "react";
import { useLocation } from "react-router-dom";

export default function UrlDropper({ items, setItems, onFinished }) {
  const location = useLocation();
  const basketName = new URLSearchParams(location.search).get("name") || null;

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    try {
      const urlString =
        e.dataTransfer.getData("text/uri-list") ||
        e.dataTransfer.getData("text/plain");
      if (!urlString) {
        onFinished();
        return;
      }

      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const parsed = new URL(urlString);

      // 1) style_id: 마지막 경로 세그먼트
      const segments = parsed.pathname.split("/");
      const styleId = segments.filter((seg) => seg.length > 0).pop() || "";

      // 2) site_id: 호스트네임 분기
      const hostname = parsed.hostname.toLowerCase();
      let siteId = "";
      if (hostname.includes("zigzag.kr")) {
        siteId = "vPu2SsvYkCYXDCiz";
      } else if (hostname.includes("musinsa.com")) {
        siteId = "iylQhcSbkgVxi0Ye";
      } else {
        alert("지원하지 않는 사이트입니다: " + hostname);
        onFinished();
        return;
      }

      // 3) POST /api/styles
      const stylePayload = [{ site_id: siteId, style_id: styleId }];
      const styleResp = await fetch(`${baseUrl}/api/styles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stylePayload),
      });
      if (!styleResp.ok) {
        console.error("POST /api/styles 실패:", await styleResp.text());
        alert("스타일 등록에 실패했습니다.");
        onFinished();
        return;
      }

      // 4) 응답 JSON 파싱
      const rawResponse = await styleResp.json();
      const entries = Object.entries(rawResponse); // [[rawKey, styleObj], ...]

      // 5) 매핑
      const mappedNewItems = entries.map(([rawKey, style]) => {
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

      // 6) setItems + PUT /api/baskets (drop 시 한 번만)
      const updatedItems = [...items, ...mappedNewItems];
      setItems(updatedItems);

      const token = localStorage.getItem("token");
      if (token) {
        const putUrl = `${baseUrl}/api/baskets/${basketName}?token=${encodeURIComponent(
          token
        )}`;
        const payloadObject = {};
        updatedItems.forEach((item) => {
          payloadObject[item.rawKey] = item.rawData;
        });

        const putResp = await fetch(putUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadObject),
        });
        if (!putResp.ok) {
          console.error("PUT /api/baskets 실패:", await putResp.text());
        }
      }

      alert(
        `style_id: ${styleId}\nsite_id: ${siteId} → 정상 등록 및 저장 완료`
      );
    } catch (err) {
      console.error("드롭 처리 중 에러:", err);
      alert("유효한 URL을 드롭해주세요.");
    } finally {
      onFinished();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-white bg-opacity-80 flex items-center justify-center"
      onDragOver={handleDragOver}
      onDragLeave={(e) => {
        e.preventDefault();
        onFinished();
      }}
      onDrop={handleDrop}
    >
      <div className="border-2 border-dashed border-gray-400 p-10 text-center rounded-lg bg-white">
        <p className="text-sm text-gray-700">
          여기에 URL을 드래그 앤 드롭하세요
        </p>
      </div>
    </div>
  );
}
