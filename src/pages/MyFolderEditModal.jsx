import React, { useState } from "react";

const MyFolderEditModal = ({ onClose }) => {
  const [sizeFit, setSizeFit] = useState("standard");
  const [season, setSeason] = useState("spring");
  const [price, setPrice] = useState("premium");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 서버로 수정 요청 보내기
    console.log({ sizeFit, season, price, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">새 장바구니1</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* 본문 폼 */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <p className="text-gray-600 text-sm">
            옷을 고르는 기준을 알려주세요. 나중에 수정할 수 있어요.
          </p>

          {/* 사이즈/핏 */}
          <div>
            <p className="font-medium">사이즈/핏</p>
            <div className="flex gap-4 mt-2">
              {[
                { value: "slim", label: "슬림핏" },
                { value: "standard", label: "스탠다드핏" },
                { value: "over", label: "오버핏" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center">
                  <input
                    type="radio"
                    name="sizeFit"
                    value={opt.value}
                    checked={sizeFit === opt.value}
                    onChange={() => setSizeFit(opt.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 계절감 */}
          <div>
            <p className="font-medium">계절감</p>
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                { value: "winter", label: "겨울(두터운, 따뜻한)" },
                { value: "spring", label: "봄(부드러운, 포근한)" },
                { value: "summer", label: "여름(얇은, 시원한)" },
                { value: "autumn", label: "가을(포근한, 도톰한)" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center">
                  <input
                    type="radio"
                    name="season"
                    value={opt.value}
                    checked={season === opt.value}
                    onChange={() => setSeason(opt.value)}
                    className="form-radio"
                  />
                  <span className="ml-2 text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 가격 */}
          <div>
            <p className="font-medium">가격</p>
            <div className="flex gap-4 mt-2">
              {[
                { value: "economy", label: "가성비" },
                { value: "premium", label: "프리미엄" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    value={opt.value}
                    checked={price === opt.value}
                    onChange={() => setPrice(opt.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 설명 */}
          <div>
            <p className="font-medium">기존 코디와 매치되는 스타일</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="매치하고 싶은 기존 코디에 대한 설명을 적어주세요. 예시) 회색 와이드핏 바지, 검정색 가죽자켓"
              className="w-full border border-gray-300 rounded-md p-2 text-sm h-24 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-md"
          >
            장바구니 수정
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyFolderEditModal;
