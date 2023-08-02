import NavBar from "../NavBar";
import SideBar from "../SideBar";
import AllTransactionsBody from "../AllTransactionsBody";
import { ToastContainer } from "react-toastify";

const AllTransactions = () => {
  return (
    <>
      <SideBar />
      <NavBar />
      <AllTransactionsBody />
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
    </>
  );
};

export default AllTransactions;
