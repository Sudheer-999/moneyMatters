import Modal from "react-modal";
import "./index.css";
import { PiWarning } from "react-icons/pi";
import { MdClose } from "react-icons/md";
import Cookies from "js-cookie";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteModal = ({ isOpen, onRequestClose, singleItem }) => {
  const { id } = singleItem;

  const loginId = Cookies.get("loginId");

  const notify = () => {
    toast.error("Deleted Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    onRequestClose();
  };

  const handleDeleteItem = async () => {
    try {
      const url =
        "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction";

      const headers = {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": loginId,
      };

      const data = {
        id: id,
      };

      const response = await axios.delete(url, {
        headers: headers,
        data: data,
      });

      const responseData = await response.data;

      if (responseData.delete_transactions_by_pk === null) {
        console.log("Deleted successfully, but the record was not found.");
      } else {
        console.log("Deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
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
            <PiWarning className="warning-icon" />
          </div>
        </div>
        <div className="del-details">
          <h1 className="delete-head">Are you sure you want to Delete?</h1>
          <p className="delete-description">
            This transaction will be deleted immediately. You can’t undo this
            action.
          </p>
          <div className="delete-buttons">
            <button
              className="del delete-confirm"
              onClick={() => {
                handleDeleteItem();
                notify();
              }}
            >
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

export default DeleteModal;
