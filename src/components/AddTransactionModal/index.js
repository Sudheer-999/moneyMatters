import Modal from "react-modal";
import "./index.css";
import { MdClose } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTransactionModal = ({ isOpen, onRequestClose }) => {
  const loginId = Cookies.get("loginId");

  const [addName, setAddName] = useState("");
  const [addAmount, setAddAmount] = useState(0);
  const [addCategory, setAddCategory] = useState("");
  const [addType, setAddType] = useState("");
  const [addDate, setAddDate] = useState("");

  const parsedDate = addDate ? new Date(addDate) : null;

  const formatDateToISO = (dateString) => {
    if (!dateString) {
      return ""; // Return an empty string if the dateString is empty
    }

    const dateObj = new Date(dateString);
    const isoDateString = dateObj.toISOString();
    return isoDateString;
  };

  const isoDate = formatDateToISO(addDate);

  const notify = () => {
    toast.success("Added Successfully", {
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

  const handleAddData = async () => {
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";

    const body = {
      user_id: loginId,
      name: addName,
      type: addType,
      category: addCategory,
      amount: addAmount,
      date: isoDate,
    };

    const headers = {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": "user",
      "x-hasura-user-id": loginId,
    };

    try {
      const response = await axios.post(url, body, { headers });

      const responseData = await response.data;
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="custom-overlay"
      shouldCloseOnOverlayClick={false}
      className="add-modal-content"
    >
      <div className="">
        <div>
          <h1 className="add-head">Add Transaction</h1>
          <p className="add-description">
            Fill the details to add transaction.
          </p>
          <div className="add-fields">
            <label className="add-label" htmlFor="trans-name">
              Transaction Name
            </label>
            <input
              type="text"
              id="trans-name"
              className="input-field"
              placeholder="Enter Name"
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
            />

            <label className="add-label" htmlFor="trans-name">
              Transaction Type
            </label>
            <select
              className="add-dropdown"
              value={addType}
              onChange={(e) => setAddType(e.target.value)}
            >
              <option>Credit</option>
              <option>Debit</option>
            </select>

            <label className="add-label" htmlFor="trans-category">
              Category
            </label>
            <select
              htmlFor="trans-category"
              className="add-dropdown"
              value={addCategory}
              onChange={(e) => setAddCategory(e.target.value)}
            >
              <option>Entertainment</option>
              <option>Food</option>
              <option>Shopping</option>
              <option>Travel</option>
            </select>

            <label className="add-label" htmlFor="trans-amount">
              Amount
            </label>
            <input
              type="number"
              id="trans-amount"
              className="input-field"
              placeholder="Enter Your Amount"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
            />

            <label className="add-label" htmlFor="trans-name">
              Date
            </label>
            <DatePicker
              selected={parsedDate}
              onChange={(date) => setAddDate(date)}
              className="custom-datepicker"
              placeholderText="Select Date"
            />
            <button
              type="submit"
              onClick={() => {
                handleAddData();
                notify();
              }}
              className="add-trans-button"
            >
              Add Transaction
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

export default AddTransactionModal;
