// MyFolderItem.jsx
import { useEffect, useState } from "react";

const MyFolderItem = ({ itemInfo, onDelete, rawItems }) => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [fitOpen, setFitOpen] = useState(false);
  const [reviewSummary, setReviewSummary] = useState("");
  const [fitAnalysis, setFitAnalysis] = useState("");

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
    rawKey, // added rawKey to destructuring
  } = itemInfo;

  useEffect(() => {
    if (itemInfo.review) setReviewOpen(true);
    if (itemInfo.fit) setFitOpen(true);
  }, [itemInfo.review, itemInfo.fit]);

  // --- (기존) 리뷰 요약 포매팅 함수 ---
  const formatReviewSummary = (data) => {
    if (!data || !data.overall_rating) return "";

    const { overall_rating, pros, cons, summary } = data;

    let formatted = "";

    // 전체 평가
    formatted += `📊 전체 평가\n`;
    formatted += `평점: ${overall_rating.score}/5.0\n`;
    formatted += `추천도: ${overall_rating.recommendation}\n`;
    formatted += `만족도: ${overall_rating.satisfaction}\n\n`;

    // 장점
    if (pros && pros.length > 0) {
      formatted += `✅ 장점\n`;
      pros.forEach((pro) => {
        formatted += `• ${pro}\n`;
      });
      formatted += `\n`;
    }

    // 단점
    if (cons && cons.length > 0) {
      formatted += `❌ 단점\n`;
      cons.forEach((con) => {
        formatted += `• ${con}\n`;
      });
      formatted += `\n`;
    }

    // 요약
    if (summary) {
      formatted += `📝 종합 의견\n`;
      formatted += `${summary}`;
    }

    return formatted;
  };

  // --- (추가) 핏 확인 결과 포매팅 함수 ---
  const formatFitAnalysis = (data) => {
    if (!data) return "";

    const {
      body_type,
      fit_type,
      recommendation,
      season,
      size_feedback,
      style_compatibility,
      explanation,
      score,
    } = data;

    let formatted = "";

    // 🧍 체형 (body_type)
    if (Array.isArray(body_type) && body_type.length > 0) {
      formatted += `🧍 체형 정보\n`;
      formatted += `${body_type.join(" / ")}\n\n`;
    }

    // 👕 핏 타입 (fit_type)
    if (fit_type) {
      formatted += `👕 핏 타입\n`;
      formatted += `${fit_type}\n\n`;
    }

    // 👍 추천 여부 (recommendation)
    if (recommendation) {
      formatted += `👍 추천 여부\n`;
      formatted += `${recommendation}\n\n`;
    }

    // 🌡 계절 (season)
    if (Array.isArray(season) && season.length > 0) {
      formatted += `🌡 계절 추천\n`;
      formatted += `${season.join(" / ")}\n\n`;
    }

    // 🎯 사이즈 피드백 (size_feedback)
    if (size_feedback) {
      formatted += `🎯 사이즈 피드백\n`;
      formatted += `${size_feedback}\n\n`;
    }

    // ⭐️ 스타일 호환도 (style_compatibility)
    if (style_compatibility) {
      formatted += `⭐️ 스타일 호환도\n`;
      if (style_compatibility.score) {
        formatted += `- 점수: ${style_compatibility.score}/5\n`;
      }
      if (style_compatibility.explanation) {
        formatted += `- 설명: ${style_compatibility.explanation}\n\n`;
      }
    }

    // ✏️ 추가 설명 (explanation, score 등이 top-level에 있는 경우)
    // (이미 style_compatibility.explanation을 넣었지만,
    // 별도 explanation 또는 score가 있을 때 추가로 표시)
    if (explanation && !style_compatibility) {
      formatted += `✏️ 추가 설명\n`;
      formatted += `${explanation}\n\n`;
    }
    if (score && !style_compatibility) {
      formatted += `📈 종합 점수\n`;
      formatted += `${score}/5\n\n`;
    }

    return formatted.trim(); // 마지막 공백 제거
  };

  const fetchReviewSummarize = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("토큰이 없습니다.");

      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const url = `${baseUrl}/llm/summarize`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          style_id: rawKey, // Use rawKey here
        }),
      });

      if (!response.ok) {
        console.error("POST 실패:", response.statusText);
        return;
      }

      const result = await response.json();

      // 포매팅된 텍스트로 변환하여 저장
      const formattedSummary = formatReviewSummary(result.data);
      setReviewSummary(formattedSummary);
    } catch (error) {
      console.error("Error fetching review summary:", error);
    }
  };

  const fetchFitAnalysis = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("토큰이 없습니다.");

      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const url = `${baseUrl}/llm/fit-analysis`;

      // itemInfo 및 rawItems에서 필요한 데이터 추출
      const matchedEntry = rawItems.find((entry) => entry[0] == rawKey);
      if (!matchedEntry) {
        console.error(
          `rawItems에서 rawKey=${rawKey}인 항목을 찾을 수 없습니다.`
        );
        return;
      }
      const styleData = matchedEntry[1];

      const requestBody = {
        token: token,
        site_id: styleData.site_id || "",
        style_data: {
          ...styleData, // rawItems에서 추출한 객체 전체를 style_data로 전달
          name: itemInfo.productTitle || styleData.name,
          price: itemInfo.price || styleData.price,
          image: { src: itemInfo.imageSrc || styleData.image.origin },
          metadata: {
            brandName: itemInfo.brandName || styleData.metadata.brandName,
            discount: itemInfo.discount || styleData.price,
            breadcrumbs: itemInfo.breadcrumbs || [],
            hashtags: itemInfo.hashtags || [],
          },
          facets: itemInfo.facets || styleData.facets,
          url: itemInfo.url || styleData.url,
          success: true,
        },
      };

      console.log("핏 분석 요청 본문:", requestBody);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error(
          "핏 분석 POST 실패:",
          response.status,
          response.statusText
        );
        const errorText = await response.text();
        console.error("에러 응답:", errorText);
        return;
      }

      const result = await response.json();
      console.log("핏 분석 응답:", result);

      // result.data를 포매팅해서 상태값에 저장
      const formattedFit = formatFitAnalysis(result.data);
      setFitAnalysis(formattedFit);
    } catch (error) {
      console.error("Error fetching fit analysis:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full py-4">
        <div className="flex w-1/5 items-center">
          <img src={imageSrc} className="w-40 h-auto" alt={productTitle} />
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
                fetchReviewSummarize(); // Trigger fetch when button is clicked
              }}
              className="px-3 py-1 border border-black text-sm cursor-pointer duration-150 hover:bg-black hover:text-white"
            >
              리뷰 요약
            </button>
            <button
              onClick={() => {
                setFitOpen(true);
                fetchFitAnalysis(); // 핏 분석 API 호출 추가
              }}
              className="px-3 py-1 border border-black bg-black text-white text-sm cursor-pointer duration-150 hover:bg-white hover:text-black"
            >
              핏 확인하기
            </button>
            <button
              onClick={() => onDelete(rawKey)}
              className="px-3 py-1 border border-black text-sm cursor-pointer hover:bg-black hover:text-white"
            >
              삭제
            </button>
          </div>
        </div>
      </div>

      {reviewOpen && (
        <div className="overflow-hidden">
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
          {reviewOpen && (
            <div className="p-3 border text-sm whitespace-pre-line">
              {reviewSummary}
            </div>
          )}
        </div>
      )}

      {fitOpen && (
        <div className="overflow-hidden">
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
          {fitOpen && (
            <div className="p-3 border text-sm whitespace-pre-line">
              {fitAnalysis || fit}
            </div>
          )}
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
