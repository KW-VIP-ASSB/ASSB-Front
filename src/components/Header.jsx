import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Settings } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="p-2">
      <div className="flex justify-between mb-2">
        <div>Super Fitting</div>
        <div className="flex gap-2">
          <ShoppingCart strokeWidth={1.5} onClick={() => navigate("/folder")} />
          <User strokeWidth={1.5} onClick={() => navigate("/userInfo")} />
          <Settings strokeWidth={1.5} />
        </div>
      </div>
      <hr />
    </div>
  );
};
export default Header;
