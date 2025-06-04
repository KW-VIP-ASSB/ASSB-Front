import React, { useState, useEffect, useCallback } from "react";
import { PlusCircle, X, Edit, Trash } from "lucide-react";

const API_BASE_URL = "http://superfitting.duckdns.org/api";
const TOKEN = "Ng%3D%3D";

// Placeholder body for creating/updating basket items, based on your cURL examples
const DEFAULT_STYLE_INFOS_BODY = {
  additionalProp1: {
    style_idx: "string",
    site_id: "string",
    name: "string",
    url: "string",
    data: {},
    price: { additionalProp1: {} },
    image: { additionalProp1: {} },
    metadata: {},
    facets: { additionalProp1: {} },
    success: true,
  },
  additionalProp2: {
    style_idx: "string",
    site_id: "string",
    name: "string",
    url: "string",
    data: {},
    price: { additionalProp1: {} },
    image: { additionalProp1: {} },
    metadata: {},
    facets: { additionalProp1: {} },
    success: true,
  },
  additionalProp3: {
    style_idx: "string",
    site_id: "string",
    name: "string",
    url: "string",
    data: {},
    price: { additionalProp1: {} },
    image: { additionalProp1: {} },
    metadata: {},
    facets: { additionalProp1: {} },
    success: true,
  },
};

const NewCartModal = ({
  onClose,
  onCreateOrUpdate,
  editCart,
  existingCartTitles,
}) => {
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

    if (!editCart && existingCartTitles) {
      const isDuplicate = existingCartTitles.some(
        (title) => title.trim().toLowerCase() === nameToUse.toLowerCase()
      );
      if (isDuplicate) {
        alert("이미 사용 중인 장바구니 이름입니다. 다른 이름을 사용해주세요.");
        return;
      }
    }

    onCreateOrUpdate({
      ...(editCart || {}),
      id: editCart ? editCart.id : null, // id는 유지 (DB 식별자)
      title: nameToUse, // title은 API의 name으로 사용됨
      description: styleDesc,
      fit,
      season,
      price,
      style_ids: editCart ? editCart.style_ids : undefined,
      style_infos: editCart ? editCart.style_infos : undefined,
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
          {editCart
            ? "장바구니 내용을 수정합니다."
            : "새 장바구니를 생성합니다. 기본 아이템이 포함됩니다."}
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
              placeholder="장바구니 이름을 입력하세요"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!!editCart}
            />
            {editCart && (
              <p className="text-xs text-gray-500 mt-1">옵션을 수정해주세요.</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">사이즈/핏 (참고용)</h3>
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
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">계절감 (참고용)</h3>
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
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">가격 (참고용)</h3>
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
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-2">스타일 설명 (참고용)</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows="3"
              placeholder="매치하고 싶은 기존 코디에 대한 설명을 적어주세요."
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
  const [carts, setCarts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCart, setEditCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCarts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/baskets/?token=${TOKEN}&skip=0&limit=100`,
        {
          headers: { accept: "application/json" },
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `HTTP error! status: ${response.status}, Message: ${
            errorData.detail || response.statusText
          }`
        );
      }
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        const fetchedCarts = result.data.map((apiCart) => ({
          id: apiCart.id, // DB의 고유 ID
          title: apiCart.name, // API에서 name 필드가 장바구니 이름
          style_ids: apiCart.style_ids || [],
          style_infos: apiCart.style_infos || {},
          created_at: apiCart.created_at,
          updated_at: apiCart.updated_at,
          description: "",
          fit: "스탠다드핏",
          season: "봄(부드러운, 포근한)",
          price: "프리미엄",
        }));
        setCarts(fetchedCarts);
      } else {
        throw new Error(
          result.message || "Failed to fetch carts or invalid data format."
        );
      }
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch carts:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  const handleCreateOrUpdateCart = async (cartData) => {
    setIsLoading(true);
    setError(null);
    let localCartUpdate = { ...cartData };

    try {
      if (cartData.id) {
        // ---- UPDATE existing cart ----
        const bodyForPut =
          cartData.style_infos && Object.keys(cartData.style_infos).length > 0
            ? cartData.style_infos
            : DEFAULT_STYLE_INFOS_BODY;

        const basketNameForURL = encodeURIComponent(cartData.title);
        const response = await fetch(
          `${API_BASE_URL}/baskets/${basketNameForURL}?token=${TOKEN}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            body: JSON.stringify(bodyForPut),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            `Failed to update cart. Status: ${response.status}. ${
              errorData.detail ||
              JSON.stringify(errorData) ||
              response.statusText
            }`
          );
        }
        const result = await response.json();
        if (result.success && result.data) {
          const updatedApiCart = result.data;
          localCartUpdate = {
            ...localCartUpdate,
            id: updatedApiCart.id,
            title: updatedApiCart.name,
            style_ids: updatedApiCart.style_ids,
            style_infos: updatedApiCart.style_infos,
            created_at: updatedApiCart.created_at,
            updated_at: updatedApiCart.updated_at,
          };
          setCarts((prevCarts) =>
            prevCarts.map((c) =>
              c.id === updatedApiCart.id ? localCartUpdate : c
            )
          );
        } else {
          throw new Error(
            result.message ||
              "Failed to update cart via API (success:false or no data)."
          );
        }
      } else {
        // ---- CREATE new cart ----
        const response = await fetch(
          `${API_BASE_URL}/baskets/?token=${TOKEN}&name=${encodeURIComponent(
            cartData.title
          )}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            body: JSON.stringify(DEFAULT_STYLE_INFOS_BODY),
          }
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          let errorMessage = `Failed to create cart. Status: ${response.status}. `;
          if (errorData.detail) {
            if (
              typeof errorData.detail === "string" &&
              errorData.detail.includes("uix_basket_user_name")
            ) {
              errorMessage += `이미 사용 중인 장바구니 이름입니다: '${cartData.title}'. 다른 이름을 사용해주세요. (DB: uix_basket_user_name constraint violation)`;
            } else {
              errorMessage += `${JSON.stringify(errorData.detail)}`;
            }
          } else {
            errorMessage += `${
              JSON.stringify(errorData) || response.statusText
            }`;
          }
          throw new Error(errorMessage);
        }
        const result = await response.json();

        if (result.success && result.data) {
          const newApiCart = result.data;
          localCartUpdate = {
            ...localCartUpdate,
            id: newApiCart.id,
            title: newApiCart.name,
            style_ids: newApiCart.style_ids || [],
            style_infos: newApiCart.style_infos || {},
            created_at: newApiCart.created_at,
            updated_at: newApiCart.updated_at,
          };
          setCarts((prevCarts) => [...prevCarts, localCartUpdate]);
        } else {
          throw new Error(
            result.message ||
              "Failed to create cart via API (success:false or no data)."
          );
        }
      }
    } catch (err) {
      setError(err.message);
      console.error("Failed to save cart:", err);
      alert(`오류: ${err.message}`);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  // handleDeleteCart 함수 수정: cartId 대신 cartTitle (장바구니 이름)을 받도록 변경 가능하나,
  // UI에서는 cart.id를 전달하고 있으므로, 내부에서 cart.title을 사용하도록 조정합니다.
  const handleDeleteCart = async (cartIdToDelete) => {
    const cartToDelete = carts.find((cart) => cart.id === cartIdToDelete);

    if (!cartToDelete) {
      alert("삭제할 장바구니를 찾을 수 없습니다.");
      return;
    }

    if (
      window.confirm(
        `'${cartToDelete.title}' 장바구니를 정말 삭제하시겠습니까?`
      )
    ) {
      setIsLoading(true);
      setError(null);
      try {
        // API 명세에 따라 URL에 장바구니 이름(cartToDelete.title)을 사용
        const basketNameForURL = encodeURIComponent(cartToDelete.title);
        const response = await fetch(
          `${API_BASE_URL}/baskets/${basketNameForURL}?token=${TOKEN}`, // 수정됨
          {
            method: "DELETE",
            headers: { accept: "application/json" },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            `Failed to delete cart. Status: ${response.status}. ${
              errorData.detail ||
              JSON.stringify(errorData) ||
              response.statusText
            }`
          );
        }

        const result = await response.json();

        if (result.success) {
          console.log(
            `Basket (Name: '${result.data?.name}') deleted successfully. Local ID was: ${cartToDelete.id}`
          );
          // 로컬 상태에서는 여전히 고유한 ID로 필터링
          setCarts((prevCarts) =>
            prevCarts.filter((c) => c.id !== cartToDelete.id)
          );
        } else {
          throw new Error(
            result.message ||
              "Failed to delete cart via API (API reported success:false)."
          );
        }
      } catch (err) {
        setError(err.message);
        console.error("Failed to delete cart:", err);
        alert(`삭제 오류: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openEditModal = (cart) => {
    setEditCart({
      id: cart.id, // 숫자 ID
      title: cart.title, // 이름
      style_ids: cart.style_ids,
      style_infos: cart.style_infos,
      description: cart.description || "",
      fit: cart.fit || "스탠다드핏",
      season: cart.season || "봄(부드러운, 포근한)",
      price: cart.price || "프리미엄",
    });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditCart(null);
    setIsModalOpen(true);
  };

  if (isLoading && carts.length === 0) {
    return <div className="p-4 text-center">장바구니를 불러오는 중...</div>;
  }

  if (error && carts.length === 0) {
    return (
      <div className="p-4 text-center text-red-500">오류 발생: {error}</div>
    );
  }

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">장바구니 목록</h2>
        {isLoading && carts.length > 0 && (
          <p className="text-sm text-gray-500">데이터 처리 중...</p>
        )}
        {error && !isLoading && (
          <p className="text-red-500 mb-2">최근 작업 오류: {error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {carts.map((cart) => (
            <div
              key={cart.id} // React key는 고유한 cart.id 사용
              className="bg-gray-200 h-48 relative flex flex-col items-center justify-center p-4 text-lg font-medium break-words group"
              title={cart.description || cart.title}
            >
              <span className="text-center">{cart.title}</span>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex space-x-2 transition-opacity">
                <button
                  onClick={() => openEditModal(cart)}
                  className="p-1 bg-white rounded hover:bg-gray-100"
                  aria-label="수정"
                  disabled={isLoading}
                >
                  <Edit size={18} />
                </button>
                <button
                  // handleDeleteCart에는 cart.id (숫자 ID)를 전달하여 내부에서 title을 참조하도록 함
                  onClick={() => handleDeleteCart(cart.id)}
                  className="p-1 bg-white rounded hover:bg-gray-100"
                  aria-label="삭제"
                  disabled={isLoading}
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}

          <div
            onClick={!isLoading ? openCreateModal : undefined}
            className={`border-2 border-dashed border-gray-300 h-48 flex flex-col justify-center items-center text-center text-gray-500 transition ${
              isLoading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-gray-100 hover:border-gray-400"
            }`}
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
          existingCartTitles={carts.map((cart) => cart.title)}
        />
      )}
    </>
  );
};

export default FolderList;
