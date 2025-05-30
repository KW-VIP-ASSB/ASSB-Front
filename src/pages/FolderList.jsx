import React, { useState } from "react";
import { PlusCircle, X, Edit, Trash } from "lucide-react";

const initialCarts = [
  { id: 1, title: "Default" },
  { id: 2, title: "니트" },
  { id: 3, title: "청바지" },
  { id: 4, title: "청바지" },
  { id: 5, title: "꽃놀이" },
];

const NewCartModal = ({ onClose, onCreateOrUpdate, editCart }) => {
  const [cartName, setCartName] = useState(editCart ? editCart.title : "");
  const [styleDesc, setStyleDesc] = useState(
    editCart ? editCart.description || "" : ""
  );
  const [fit, setFit] = useState(
    editCart ? editCart.fit || "스탠다드핏" : "스탠다드핏"
  );
  const [season, setSeason] = useState(
    editCart
      ? editCart.season || "봄(부드러운, 포근한)"
      : "봄(부드러운, 포근한)"
  );
  const [price, setPrice] = useState(
    editCart ? editCart.price || "프리미엄" : "프리미엄"
  );

  const handleSubmit = () => {
    const nameToUse = cartName.trim() === "" ? "default" : cartName.trim();

    onCreateOrUpdate({
      id: editCart ? editCart.id : null,
      title: nameToUse,
      description: styleDesc,
      fit,
      season,
      price,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999] pointer-events-none">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative pointer-events-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">
          {editCart ? "장바구니 수정" : "새 장바구니 생성"}
        </h2>
        <p className="text-gray-600 mb-6">
          옷을 고르는 기준을 알려주세요. 나중에 수정할 수 있어요.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="cartName">
              장바구니 이름
            </label>
            <input
              id="cartName"
              type="text"
              value={cartName}
              onChange={(e) => setCartName(e.target.value)}
              placeholder="장바구니 이름을 입력하세요 (비워두면 default)"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* 사이즈/핏 */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">사이즈/핏</h3>
            <div className="flex space-x-6">
              {["슬림핏", "스탠다드핏", "오버핏"].map((item) => (
                <label
                  key={item}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="fit"
                    className="form-radio"
                    checked={fit === item}
                    onChange={() => setFit(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 계절감 */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">계절감</h3>
            <div className="flex space-x-6 flex-wrap">
              {[
                "겨울(두터운, 따듯한)",
                "봄(부드러운, 포근한)",
                "여름(얇은, 시원한)",
                "가을(포근한, 도톰한)",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="season"
                    className="form-radio"
                    checked={season === item}
                    onChange={() => setSeason(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 가격 */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">가격</h3>
            <div className="flex space-x-6">
              {["가성비", "프리미엄"].map((item) => (
                <label
                  key={item}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="price"
                    className="form-radio"
                    checked={price === item}
                    onChange={() => setPrice(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 스타일 설명 */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-2">
              기존 코디와 매치되는 스타일
            </h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows="3"
              placeholder="매치하고 싶은 기존 코디에 대한 설명을 적어주세요.
예시) 회색 와이드핏 바지, 검정색 가죽자켓"
              value={styleDesc}
              onChange={(e) => setStyleDesc(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-black text-white font-bold py-3 rounded-md hover:bg-gray-800 transition"
          >
            {editCart ? "수정 완료" : "장바구니 생성"}
          </button>
        </form>
      </div>
    </div>
  );
};

const FolderList = () => {
  const [carts, setCarts] = useState(initialCarts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCart, setEditCart] = useState(null);

  // 새 장바구니 생성 또는 수정
  const handleCreateOrUpdateCart = (cartData) => {
    if (cartData.id) {
      setCarts((prev) =>
        prev.map((c) => (c.id === cartData.id ? { ...c, ...cartData } : c))
      );
    } else {
      const maxId = carts.reduce((max, c) => (c.id > max ? c.id : max), 0);
      const newCart = { ...cartData, id: maxId + 1 };
      setCarts((prev) => [...prev, newCart]);
    }
  };

  const handleDeleteCart = (id) => {
    if (window.confirm("정말 이 장바구니를 삭제하시겠습니까?")) {
      setCarts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const openEditModal = (cart) => {
    setEditCart(cart);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditCart(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">장바구니 목록</h2>

        <div className="grid grid-cols-3 gap-4">
          {carts.map((cart) => (
            <div
              key={cart.id}
              className="bg-gray-200 h-48 relative flex items-end justify-center p-4 text-lg font-medium break-words group"
              title={cart.description}
            >
              {cart.title}

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex space-x-2 transition-opacity">
                <button
                  onClick={() => openEditModal(cart)}
                  className="p-1 bg-white rounded hover:bg-gray-100"
                  aria-label="수정"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteCart(cart.id)}
                  className="p-1 bg-white rounded hover:bg-gray-100"
                  aria-label="삭제"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}

          <div
            onClick={openCreateModal}
            className="border-2 border-dashed border-gray-300 h-48 flex flex-col justify-center items-center text-center text-gray-500 cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition"
          >
            <PlusCircle className="w-8 h-8 mb-2" />
            <span className="font-semibold">
              여기를 눌러
              <br />새 장바구니를 생성하세요
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <NewCartModal
          onClose={() => setIsModalOpen(false)}
          onCreateOrUpdate={handleCreateOrUpdateCart}
          editCart={editCart}
        />
      )}
    </>
  );
};

export default FolderList;
