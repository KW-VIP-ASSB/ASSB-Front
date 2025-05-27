import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen px-4 bg-white">
            <Card className="w-full max-w-sm">
                <CardContent className="flex flex-col items-center gap-6 py-16 w-full">
                    {/* Title */}
                    <h1 className="text-[32px] font-normal text-black">
                        Super Fitting
                    </h1>
                    <p className="text-base text-black/50 font-normal">
                        가장 똑똑한 방법으로 옷을 골라보세요
                    </p>

                    {/* Form */}
                    <form className="w-full space-y-4">
                        {/* 이메일 */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-black">이메일</label>
                            <Input
                                type="email"
                                placeholder="Email"
                                className="px-4 py-2 h-auto rounded border border-black/40 text-xs"
                            />
                        </div>

                        {/* 비밀번호 */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-black">
                                비밀번호
                            </label>
                            <Input
                                type="password"
                                placeholder="Password"
                                className="px-4 py-2 h-auto rounded border border-black/40 text-xs"
                            />
                        </div>

                        {/* 로그인 버튼 */}
                        <Button
                            type="submit"
                            className="w-full bg-black text-white text-xs py-2 rounded"
                        >
                            Login
                        </Button>
                    </form>

                    {/* 회원가입 링크 */}
                    <p className="text-xs text-black/60">
                        계정이 아직 없으신가요?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-black underline cursor-pointer"
                        >
                            회원가입
                        </span>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
