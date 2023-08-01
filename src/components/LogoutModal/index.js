import Modal from "react-modal";
import "./index.css";
import { MdClose } from "react-icons/md";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

const LogoutModal = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();

  const onLogoutButton = () => {
    Cookies.remove("loginId");
    navigate("/login");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="custom-overlay"
      shouldCloseOnOverlayClick={false}
      className="custom-modal-content"
    >
      <div className="delete-modal-content">
        <div className="warning-con">
          <div className="warning-inner">
            <LuLogOut className="warning-icon" />
          </div>
        </div>
        <div>
          <h1 className="delete-head">Are you sure you want to Delete?</h1>
          <p className="delete-description">
            This transaction will be deleted immediately. You can’t undo this
            action.
          </p>
          <div className="delete-buttons">
            <button className="del delete-confirm" onClick={onLogoutButton}>
              Yes, Delete
            </button>
            <button onClick={onRequestClose} className=" del delete-skip">
              No, Leave it
            </button>
          </div>
        </div>
      </div>
      <button onClick={onRequestClose} className="close-button">
        <MdClose className="close-icon" />
      </button>
    </Modal>
  );
};

export default LogoutModal;
