import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import React from "react";

export default function Frame() {
    // Form field data
    const personalColor1Options = [
        { id: "spring", label: "봄웜", checked: false },
        { id: "summer", label: "여름쿨", checked: true },
        { id: "autumn", label: "가을웜", checked: false },
        { id: "winter", label: "겨울쿨", checked: false },
    ];

    const personalColor2Options = [
        { id: "dark", label: "다크", checked: false },
        { id: "mute", label: "뮤트", checked: true },
        { id: "bright", label: "브라이트", checked: false },
    ];

    const styleOptions = ["캐주얼", "모던", "빈티지", "스포티"];

    return (
        <div className="flex flex-col items-center gap-[15px] py-[15px] relative bg-white border border-solid border-black">
            <main className="flex flex-col items-center justify-center gap-5 px-0 py-2.5 relative flex-1 self-stretch w-full">
                <h1 className="relative w-fit [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
                    회원가입
                </h1>

                <p className="relative w-fit [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#00000080] text-base tracking-[0] leading-[normal] whitespace-nowrap">
                    가장 똑똑한 방법으로 옷을 골라보세요
                </p>

                {/* Required Information Section */}
                <form className="flex flex-col items-center gap-5">
                    <div className="inline-flex flex-col items-start gap-2.5 relative">
                        {/* Name Field */}
                        <div className="flex w-[342px] items-center gap-[5px] relative">
                            <Label className="w-[60px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-xs">
                                이름*
                            </Label>
                            <Input
                                className="flex-1 h-[32px] px-[15px] py-[7px] rounded-[5px] border border-solid border-[#00000040] text-xs"
                                placeholder="Name"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="flex w-[440px] items-center gap-[5px] relative">
                            <Label className="w-[60px] text-xs">이메일*</Label>
                            <Input
                                className="flex-1 h-[32px] px-[15px] py-[7px] rounded-[5px] border border-[#00000040] text-xs"
                                placeholder="Email"
                            />
                            <Button
                                variant="outline"
                                className="h-[32px] px-[10px] py-[7px] rounded-[5px] border border-black text-xs whitespace-nowrap"
                            >
                                중복확인
                            </Button>
                        </div>

                        {/* Password Field */}
                        <div className="flex w-[342px] items-center gap-[5px] relative">
                            <Label className="w-[60px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-xs">
                                비밀번호*
                            </Label>
                            <Input
                                type="password"
                                className="flex-1 h-[32px] px-[15px] py-[7px] rounded-[5px] border border-solid border-[#00000040] text-xs"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="inline-flex flex-col items-start gap-2.5 relative">
                        {/* Gender Selection */}
                        <div className="flex w-[342px] h-7 items-center gap-[5px] relative">
                            <Label className="w-[60px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-xs">
                                성별
                            </Label>
                            <RadioGroup
                                defaultValue="male"
                                className="flex items-center gap-2.5 relative flex-1"
                            >
                                <div className="flex items-center gap-[5px]">
                                    <RadioGroupItem id="male" value="male" />
                                    <Label
                                        htmlFor="male"
                                        className="text-[#00000080] [font-family:'Pretendard-Regular',Helvetica] font-normal text-xs"
                                    >
                                        남성
                                    </Label>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <RadioGroupItem
                                        id="female"
                                        value="female"
                                    />
                                    <Label
                                        htmlFor="female"
                                        className="text-[#00000080] [font-family:'Pretendard-Regular',Helvetica] font-normal text-xs"
                                    >
                                        여성
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Birth Date */}
                        <div className="flex w-[342px] items-center gap-[5px] relative">
                            <Label className="w-[60px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-xs">
                                생년월일
                            </Label>
                            <Input
                                className="flex-1 h-[32px] px-[15px] py-[7px] rounded-[5px] border border-solid border-[#00000040] text-xs"
                                placeholder="2000.01.01."
                            />
                        </div>
                    </div>

                    {/* Physical Information Section */}
                    <div className="inline-flex flex-col items-start gap-2.5 relative">
                        {/* Height */}
                        <div className="flex w-[342px] items-center gap-[5px] relative">
                            <Label className="w-[60px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-xs">
                                키
                            </Label>
                            <Input
                                className="flex-1 h-[32px] px-[15px] py-[7px] rounded-[5px] border border-solid border-[#00000040] text-xs"
                                placeholder="180cm"
                            />
                        </div>

                        {/* Weight */}
                        <div className="flex w-[342px] items-center gap-[5px] relative">
                            <Label className="w-[60px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-xs">
                                몸무게
                            </Label>
                            <Input
                                className="flex-1 h-[32px] px-[15px] py-[7px] rounded-[5px] border border-solid border-[#00000040] text-xs"
                                placeholder="50kg"
                            />
                        </div>

                        {/* Foot Size */}
                        <div className="flex w-[342px] items-center gap-[5px] relative">
                            <Label className="w-[60px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-xs">
                                발 사이즈
                            </Label>
                            <Input
                                className="flex-1 h-[32px] px-[15px] py-[7px] rounded-[5px] border border-solid border-[#00000040] text-xs"
                                placeholder="250"
                            />
                        </div>
                    </div>

                    {/* Personal Color Section */}
                    <div className="inline-flex flex-col items-start gap-2.5 relative">
                        {/* Personal Color 1 */}
                        <div className="flex w-[342px] h-7 items-center gap-[5px] relative">
                            <Label className="w-[60px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-xs">
                                퍼스널컬러1
                            </Label>
                            <RadioGroup
                                defaultValue="summer"
                                className="flex items-center gap-2.5 relative flex-1"
                            >
                                {personalColor1Options.map((option) => (
                                    <div
                                        key={option.id}
                                        className="inline-flex items-center gap-[5px] relative"
                                    >
                                        <RadioGroupItem
                                            id={option.id}
                                            value={option.id}
                                        />
                                        <Label
                                            htmlFor={option.id}
                                            className="text-[#00000080] [font-family:'Pretendard-Regular',Helvetica] font-normal text-xs"
                                        >
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Personal Color 2 */}
                        <div className="flex w-[342px] h-7 items-center gap-[5px] relative">
                            <Label className="w-[60px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-xs">
                                퍼스널컬러2
                            </Label>
                            <RadioGroup
                                defaultValue="mute"
                                className="flex items-center gap-2.5 relative flex-1"
                            >
                                {personalColor2Options.map((option) => (
                                    <div
                                        key={option.id}
                                        className="inline-flex items-center gap-[5px] relative"
                                    >
                                        <RadioGroupItem
                                            id={option.id}
                                            value={option.id}
                                        />
                                        <Label
                                            htmlFor={option.id}
                                            className="text-[#00000080] [font-family:'Pretendard-Regular',Helvetica] font-normal text-xs"
                                        >
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Style Preferences Section */}
                    <div className="inline-flex flex-col items-start gap-2.5 relative">
                        {/* Regular Style */}
                        <div className="flex w-[342px] items-center gap-[5px] relative">
                            <Label className="w-[60px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-xs">
                                평소 스타일
                            </Label>
                            <div className="flex flex-wrap w-[277px] items-center gap-[5px_5px] relative">
                                {styleOptions.map((style, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="bg-transparent h-auto px-[15px] py-[7px] rounded-[20px] border border-solid border-[#00000080] text-[#00000080] [font-family:'Pretendard-Regular',Helvetica] font-normal text-xs"
                                    >
                                        {style}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Challenge Style */}
                        <div className="flex w-[342px] items-center gap-[5px] relative">
                            <Label className="w-[60px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-black text-xs">
                                도전 스타일
                            </Label>
                            <div className="flex flex-wrap w-[277px] items-center gap-[5px_5px] relative">
                                {styleOptions.map((style, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="bg-transparent h-auto px-[15px] py-[7px] rounded-[20px] border border-solid border-[#00000080] text-[#00000080] [font-family:'Pretendard-Regular',Helvetica] font-normal text-xs"
                                    >
                                        {style}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <Button className="w-[342px] h-auto bg-black text-white rounded-[5px] [font-family:'Pretendard-Bold',Helvetica] font-bold text-xs">
                        Sign Up
                    </Button>

                    {/* Login Link */}
                    <div className="relative w-fit [font-family:'Pretendard-Regular',Helvetica] font-normal text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                        <span className="text-[#00000080]">
                            기존 계정이 있으신가요?{" "}
                        </span>
                        <a href="#" className="text-black underline">
                            로그인
                        </a>
                    </div>
                </form>
            </main>
        </div>
    );
}
