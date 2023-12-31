import "./index.css";
import { LuLogOut } from "react-icons/lu";

import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AppContext from "../AppContext";
import LogoutModal from "../LogoutModal";

const SideBar = () => {
  const navigate = useNavigate();

  const { activeTab, setActiveTab } = useContext(AppContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onLogout = () => {
    openModal();
  };

  const handleTab = (text) => {
    setActiveTab(text);

    if (text === "transactions") {
      navigate("/transactions");
    } else if (text === "profile") {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (activeTab === "transactions") {
      navigate("/transactions");
    } else if (activeTab === "profile") {
      navigate("/profile");
    } else {
      navigate("/");
    }
  }, [activeTab, navigate]);

  const activeDashboard = activeTab === "dashboard";
  const activeTransactions = activeTab === "transactions";
  const activeProfile = activeTab === "profile";

  const dashColor = activeDashboard ? "#2d60ff" : "#505887";
  const transColor = activeTransactions ? "#2d60ff" : "#505887";
  const proColor = activeProfile ? "#2d60ff" : "#505887";

  return (
    <div className="sidebar-container">
      <div>
        <img
          src="https://res.cloudinary.com/djzsbpran/image/upload/v1690601481/Frame_507_rs1im3.png"
          alt="logo"
          className="logo"
        />

        <ul className="nav-options">
          <li
            className={`nav-option ${
              activeTab === "dashboard" ? "active" : "inactive"
            }`}
            onClick={() => handleTab("dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <g clipPath="url(#clip0_1_1817)">
                <path
                  d="M24.3255 10.8738C24.3249 10.8732 24.3243 10.8727 24.3238 10.8721L14.1257 0.674438C13.6911 0.239563 13.1131 0 12.4984 0C11.8837 0 11.3057 0.239372 10.8709 0.674248L0.678172 10.8667C0.674739 10.8702 0.671305 10.8738 0.667872 10.8772C-0.224767 11.775 -0.223241 13.2317 0.672259 14.1272C1.08139 14.5365 1.62174 14.7736 2.19947 14.7984C2.22293 14.8006 2.24658 14.8018 2.27043 14.8018H2.67688V22.3066C2.67688 23.7917 3.88519 25 5.37063 25H9.36042C9.76478 25 10.0928 24.6721 10.0928 24.2676V18.3838C10.0928 17.7061 10.6441 17.1549 11.3217 17.1549H13.675C14.3527 17.1549 14.9039 17.7061 14.9039 18.3838V24.2676C14.9039 24.6721 15.2318 25 15.6364 25H19.6262C21.1116 25 22.3199 23.7917 22.3199 22.3066V14.8018H22.6968C23.3113 14.8018 23.8893 14.5624 24.3243 14.1275C25.2208 13.2305 25.2212 11.7714 24.3255 10.8738Z"
                  fill={dashColor}
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1817">
                  <rect width="25" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="option-text">Dashboard</span>
          </li>
          <li
            className={`nav-option ${
              activeTab === "transactions" ? "active" : "inactive"
            }`}
            onClick={() => handleTab("transactions")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <g clipPath="url(#clip0_1_1799)">
                <path
                  d="M5.2085 22.9167C5.20915 23.469 5.42885 23.9986 5.81941 24.3891C6.20997 24.7797 6.7395 24.9994 7.29183 25H17.7085C18.2608 24.9994 18.7904 24.7797 19.1809 24.3891C19.5715 23.9986 19.7912 23.469 19.7918 22.9167V22.0052H5.2085V22.9167Z"
                  fill={transColor}
                />
                <path
                  d="M19.7918 2.08333C19.7912 1.531 19.5715 1.00148 19.1809 0.610917C18.7904 0.220358 18.2608 0.00065473 17.7085 0L7.29183 0C6.7395 0.00065473 6.20997 0.220358 5.81941 0.610917C5.42885 1.00148 5.20915 1.531 5.2085 2.08333V3.125H19.7918V2.08333Z"
                  fill={transColor}
                />
                <path
                  d="M24.7096 6.70052L21.5846 3.44531L20.0817 4.88802L21.3892 6.25H19.7915V8.33333H21.5015L20.1125 9.66459L21.5539 11.1688L24.6789 8.17396C24.7777 8.07926 24.8569 7.96602 24.9119 7.8407C24.9669 7.71538 24.9967 7.58045 24.9996 7.44361C25.0024 7.30677 24.9783 7.17071 24.9285 7.04321C24.8788 6.91571 24.8044 6.79926 24.7096 6.70052Z"
                  fill={transColor}
                />
                <path
                  d="M16.6668 6.24996H19.7918V4.16663H5.2085V16.6666H8.3335V18.75H5.2085V20.8333H19.7918V8.33329H16.6668V6.24996ZM15.6252 10.4166H11.9793C11.8412 10.4166 11.7087 10.4715 11.611 10.5692C11.5134 10.6669 11.4585 10.7993 11.4585 10.9375C11.4585 11.0756 11.5134 11.2081 11.611 11.3057C11.7087 11.4034 11.8412 11.4583 11.9793 11.4583H13.021C13.6668 11.4576 14.2898 11.697 14.7691 12.1298C15.2484 12.5627 15.5497 13.1582 15.6146 13.8007C15.6795 14.4433 15.5033 15.087 15.1203 15.607C14.7373 16.1269 14.1747 16.486 13.5418 16.6145V17.7083H11.4585V16.6666H9.37516V14.5833H13.021C13.1591 14.5833 13.2916 14.5284 13.3893 14.4307C13.487 14.3331 13.5418 14.2006 13.5418 14.0625C13.5418 13.9243 13.487 13.7919 13.3893 13.6942C13.2916 13.5965 13.1591 13.5416 13.021 13.5416H11.9793C11.3335 13.5423 10.7105 13.3029 10.2312 12.8701C9.75197 12.4372 9.45063 11.8417 9.38573 11.1992C9.32083 10.5566 9.49699 9.9129 9.88001 9.39294C10.263 8.87298 10.8256 8.51389 11.4585 8.38538V7.29163H13.5418V8.33329H15.6252V10.4166Z"
                  fill={transColor}
                />
                <path
                  d="M3.49828 16.6667L4.88734 15.3355L3.44593 13.8313L0.320931 16.8261C0.222115 16.9208 0.142929 17.034 0.0879011 17.1594C0.0328728 17.2847 0.00308028 17.4196 0.000226477 17.5564C-0.00262733 17.6933 0.0215135 17.8293 0.0712692 17.9568C0.121025 18.0843 0.19542 18.2008 0.290202 18.2995L3.4152 21.5547L4.91807 20.112L3.61064 18.75H5.2083V16.6667H3.49828Z"
                  fill={transColor}
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1799">
                  <rect width="25" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="option-text">Transactions</span>
          </li>
          <li
            className={`nav-option ${
              activeTab === "profile" ? "active" : "inactive"
            }`}
            onClick={() => handleTab("profile")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <g clipPath="url(#clip0_1_1809)">
                <path
                  d="M12.3218 12.0426C13.9762 12.0426 15.4088 11.4492 16.5794 10.2785C17.7499 9.10793 18.3433 7.67571 18.3433 6.02109C18.3433 4.36705 17.7499 2.93463 16.5792 1.76372C15.4085 0.593374 13.976 0 12.3218 0C10.6672 0 9.23494 0.593374 8.0644 1.76391C6.89386 2.93444 6.30029 4.36686 6.30029 6.02109C6.30029 7.67571 6.89386 9.10813 8.06459 10.2787C9.23532 11.449 10.6677 12.0426 12.3218 12.0426Z"
                  fill={proColor}
                />
                <path
                  d="M22.8579 19.2237C22.8241 18.7366 22.7558 18.2052 22.6553 17.644C22.5538 17.0787 22.4232 16.5443 22.2668 16.0558C22.1052 15.5509 21.8855 15.0523 21.6139 14.5745C21.332 14.0786 21.0009 13.6468 20.6293 13.2915C20.2408 12.9197 19.7651 12.6209 19.215 12.4028C18.6668 12.186 18.0593 12.0761 17.4095 12.0761C17.1543 12.0761 16.9075 12.1808 16.4309 12.4912C16.1375 12.6825 15.7944 12.9037 15.4114 13.1484C15.0839 13.3571 14.6402 13.5526 14.0923 13.7296C13.5576 13.9026 13.0148 13.9903 12.479 13.9903C11.9432 13.9903 11.4006 13.9026 10.8654 13.7296C10.318 13.5528 9.87434 13.3573 9.54723 13.1486C9.16786 12.9062 8.82454 12.6849 8.5268 12.491C8.05073 12.1806 7.80373 12.0759 7.54852 12.0759C6.8985 12.0759 6.2912 12.186 5.74322 12.403C5.19352 12.6207 4.71764 12.9195 4.32873 13.2917C3.95737 13.6472 3.62606 14.0788 3.34454 14.5745C3.07312 15.0523 2.85339 15.5507 2.69165 16.056C2.53544 16.5444 2.40479 17.0787 2.30331 17.644C2.2028 18.2044 2.13451 18.736 2.10075 19.2243C2.06757 19.7026 2.05078 20.1991 2.05078 20.7005C2.05078 22.0055 2.46563 23.062 3.28369 23.8412C4.09164 24.61 5.16071 25.0001 6.46076 25.0001H18.4984C19.7985 25.0001 20.8672 24.6102 21.6753 23.8412C22.4936 23.0626 22.9084 22.0059 22.9084 20.7003C22.9082 20.1966 22.8912 19.6998 22.8579 19.2237Z"
                  fill={proColor}
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1809">
                  <rect width="25" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="option-text">Profile</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <img
          src="https://res.cloudinary.com/djzsbpran/image/upload/v1690608337/Avatar_jieksf.png"
          className="profile-pic"
          alt="profile-pic"
        />
        <div className="sidebar-sub">
          <div className="sidebar-logout">
            <span className="name">Rhye</span>
            <p className="email">olivia@untitledui.com</p>
          </div>
          <LuLogOut onClick={onLogout} className="logout-icon" />
        </div>
      </div>
      <LogoutModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default SideBar;
