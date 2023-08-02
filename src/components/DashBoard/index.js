import NavBar from "../NavBar";
import SideBar from "../SideBar";
import DashboardBody from "../DashboardBody";
import { ToastContainer } from "react-toastify";

const DashBoard = () => {
  return (
    <div>
      <SideBar />
      <NavBar />
      <DashboardBody />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default DashBoard;
