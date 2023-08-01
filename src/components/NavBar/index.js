import "./index.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useContext, useState } from "react";
import AppContext from "../AppContext";
import AddTransactionModal from "../AddTransactionModal";

const NavBar = () => {
  const { activeTab, setActiveTransactions, activeTransactions } = useContext(
    AppContext
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  let navHead;

  switch (activeTab) {
    case "dashboard":
      navHead = "Accounts";
      break;
    case "transactions":
      navHead = "Transactions";
      break;
    default:
      navHead = "Profile";
      break;
  }

  const handleActiveTab = (item) => {
    setActiveTransactions(item);
  };

  const showNav = activeTab === "transactions" ? "show" : "hide";
  const padBottom = activeTab === "transactions" && "pad-bottom";

  return (
    <>
      <div className={`nav-container ${padBottom}`}>
        <div className="normal-navs">
          <p className="nav-head">{navHead}</p>
          <button className="nav-button" onClick={openModal}>
            <AiOutlinePlus className="plus-button" /> Add Transaction
          </button>
        </div>
        <div className={`transaction-navs ${showNav}`}>
          <p
            className={`t-nav ${
              activeTransactions === "all" ? "active-tab" : "inactive-tab"
            }`}
            onClick={() => handleActiveTab("all")}
          >
            All Transactions
          </p>
          <p
            className={`t-nav ${
              activeTransactions === "debit" ? "active-tab" : "inactive-tab"
            }`}
            onClick={() => handleActiveTab("debit")}
          >
            Debit
          </p>
          <p
            className={`t-nav ${
              activeTransactions === "credit" ? "active-tab" : "inactive-tab"
            }`}
            onClick={() => handleActiveTab("credit")}
          >
            Credit
          </p>
        </div>
      </div>
      <AddTransactionModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </>
  );
};

export default NavBar;
