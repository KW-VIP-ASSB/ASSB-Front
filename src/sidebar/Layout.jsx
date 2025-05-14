import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="">
      <Header />
      {/* 이 자리에 경로에 따른 다른 자식 컴포넌트를 로딩 */}
      <Outlet />
    </div>
  );
}
