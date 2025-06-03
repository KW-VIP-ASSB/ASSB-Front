import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        gender: "남성",
        birthDate: "",
        height: "",
        weight: "",
        footSize: "",
        personalColor1: "여름쿨",
        personalColor2: "뮤트",
    });

    const [selectedStyles, setSelectedStyles] = useState({
        regular: [],
        challenge: [],
    });

    const personalColor1Options = [
        { id: "spring", label: "봄웜" },
        { id: "summer", label: "여름쿨" },
        { id: "autumn", label: "가을웜" },
        { id: "winter", label: "겨울쿨" },
    ];

    const personalColor2Options = [
        { id: "dark", label: "다크" },
        { id: "mute", label: "뮤트" },
        { id: "bright", label: "브라이트" },
    ];

    const styleOptions = ["캐주얼", "모던", "빈티지", "스포티"];

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleStyle = (type, style) => {
        setSelectedStyles((prev) => ({
            ...prev,
            [type]: prev[type].includes(style)
                ? prev[type].filter((s) => s !== style)
                : [...prev[type], style],
        }));
    };

    const handleSubmit = async () => {
        const requestData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            is_active: true,
            data: {
                additionalProp1: {
                    gender: formData.gender,
                    birthDate: formData.birthDate,
                    height: formData.height,
                    weight: formData.weight,
                    footSize: formData.footSize,
                    personalColor1: formData.personalColor1,
                    personalColor2: formData.personalColor2,
                },
            },
        };
        console.log(requestData);
        const res = await fetch(`${baseUrl}/api/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        if (res.ok) {
            alert("회원가입 성공");
            navigate("/");
        } else {
            alert("회원가입 실패");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white border border-black rounded-lg p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-normal mb-2">회원가입</h1>
                    <p className="text-gray-500 text-base">
                        가장 똑똑한 방법으로 옷을 골라보세요
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Required Information */}
                    <div className="space-y-3">
                        {/* Name */}
                        <div className="flex items-center gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700">
                                이름*
                            </label>
                            <input
                                value={formData.username}
                                onChange={(e) =>
                                    handleInputChange(
                                        "username",
                                        e.target.value
                                    )
                                }
                                className="flex-1 h-8 text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                placeholder="Name"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700">
                                이메일*
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    handleInputChange("email", e.target.value)
                                }
                                className="flex-1 h-8 text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                placeholder="Email"
                            />
                            <button
                                type="button"
                                className="h-8 px-3 text-xs whitespace-nowrap border border-black text-black hover:bg-gray-100 rounded transition-colors"
                            >
                                중복확인
                            </button>
                        </div>

                        {/* Password */}
                        <div className="flex items-center gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700">
                                비밀번호*
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    handleInputChange(
                                        "password",
                                        e.target.value
                                    )
                                }
                                className="flex-1 h-8 text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-3">
                        {/* Gender */}
                        <div className="flex items-center gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700">
                                성별
                            </label>
                            <div className="flex-1 flex gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="남성"
                                        checked={formData.gender === "남성"}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "gender",
                                                e.target.value
                                            )
                                        }
                                        className="accent-black"
                                    />
                                    <label
                                        htmlFor="male"
                                        className="text-xs text-gray-500"
                                    >
                                        남성
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="여성"
                                        checked={formData.gender === "여성"}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "gender",
                                                e.target.value
                                            )
                                        }
                                        className="accent-black"
                                    />
                                    <label
                                        htmlFor="female"
                                        className="text-xs text-gray-500"
                                    >
                                        여성
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Birth Date */}
                        <div className="flex items-center gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700">
                                생년월일
                            </label>
                            <input
                                value={formData.birthDate}
                                onChange={(e) =>
                                    handleInputChange(
                                        "birthDate",
                                        e.target.value
                                    )
                                }
                                className="flex-1 h-8 text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                placeholder="2000.01.01"
                            />
                        </div>
                    </div>

                    {/* Physical Information */}
                    <div className="space-y-3">
                        {/* Height */}
                        <div className="flex items-center gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700">
                                키
                            </label>
                            <input
                                value={formData.height}
                                onChange={(e) =>
                                    handleInputChange("height", e.target.value)
                                }
                                className="flex-1 h-8 text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                placeholder="180cm"
                            />
                        </div>

                        {/* Weight */}
                        <div className="flex items-center gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700">
                                몸무게
                            </label>
                            <input
                                value={formData.weight}
                                onChange={(e) =>
                                    handleInputChange("weight", e.target.value)
                                }
                                className="flex-1 h-8 text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                placeholder="50kg"
                            />
                        </div>

                        {/* Foot Size */}
                        <div className="flex items-center gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700">
                                발 사이즈
                            </label>
                            <input
                                value={formData.footSize}
                                onChange={(e) =>
                                    handleInputChange(
                                        "footSize",
                                        e.target.value
                                    )
                                }
                                className="flex-1 h-8 text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                placeholder="250"
                            />
                        </div>
                    </div>

                    {/* Personal Color */}
                    <div className="space-y-3">
                        {/* Personal Color 1 */}
                        <div className="flex items-center gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700">
                                퍼스널컬러1
                            </label>
                            <div className="flex-1 flex flex-wrap gap-2">
                                {personalColor1Options.map((option) => (
                                    <div
                                        key={option.id}
                                        className="flex items-center gap-1"
                                    >
                                        <input
                                            type="radio"
                                            id={`pc1-${option.id}`}
                                            name="personalColor1"
                                            value={option.label}
                                            checked={
                                                formData.personalColor1 ===
                                                option.label
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "personalColor1",
                                                    e.target.value
                                                )
                                            }
                                            className="accent-black"
                                        />
                                        <label
                                            htmlFor={`pc1-${option.id}`}
                                            className="text-xs text-gray-500"
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Personal Color 2 */}
                        <div className="flex items-center gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700">
                                퍼스널컬러2
                            </label>
                            <div className="flex-1 flex gap-2">
                                {personalColor2Options.map((option) => (
                                    <div
                                        key={option.id}
                                        className="flex items-center gap-1"
                                    >
                                        <input
                                            type="radio"
                                            id={`pc2-${option.id}`}
                                            name="personalColor2"
                                            value={option.label}
                                            checked={
                                                formData.personalColor2 ===
                                                option.label
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "personalColor2",
                                                    e.target.value
                                                )
                                            }
                                            className="accent-black"
                                        />
                                        <label
                                            htmlFor={`pc2-${option.id}`}
                                            className="text-xs text-gray-500"
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Style Preferences */}
                    <div className="space-y-3">
                        {/* Regular Style */}
                        <div className="flex items-start gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700 mt-2">
                                평소 스타일
                            </label>
                            <div className="flex-1 flex flex-wrap gap-2">
                                {styleOptions.map((style, index) => (
                                    <span
                                        key={`regular-${index}`}
                                        className={`inline-block rounded-full text-xs px-3 py-1 cursor-pointer transition-colors border ${
                                            selectedStyles.regular.includes(
                                                style
                                            )
                                                ? "bg-black text-white border-black"
                                                : "border-gray-400 text-gray-600 hover:bg-gray-100"
                                        }`}
                                        onClick={() =>
                                            toggleStyle("regular", style)
                                        }
                                    >
                                        {style}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Challenge Style */}
                        <div className="flex items-start gap-2">
                            <label className="w-16 text-xs font-medium text-gray-700 mt-2">
                                도전 스타일
                            </label>
                            <div className="flex-1 flex flex-wrap gap-2">
                                {styleOptions.map((style, index) => (
                                    <span
                                        key={`challenge-${index}`}
                                        className={`inline-block rounded-full text-xs px-3 py-1 cursor-pointer transition-colors border ${
                                            selectedStyles.challenge.includes(
                                                style
                                            )
                                                ? "bg-black text-white border-black"
                                                : "border-gray-400 text-gray-600 hover:bg-gray-100"
                                        }`}
                                        onClick={() =>
                                            toggleStyle("challenge", style)
                                        }
                                    >
                                        {style}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full h-12 bg-black text-white font-bold text-xs mt-6 rounded transition-colors hover:bg-gray-800"
                    >
                        Sign Up
                    </button>

                    {/* Login Link */}
                    <div className="text-center text-xs mt-4">
                        <span className="text-gray-500">
                            기존 계정이 있으신가요?{" "}
                        </span>
                        <a href="#" className="text-black underline">
                            로그인
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
