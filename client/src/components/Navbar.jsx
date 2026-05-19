import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className="nav-center">
        {/* LEFT */}
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        {/* CENTER */}
        <div className="logo-container">
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>

        {/* RIGHT */}
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
