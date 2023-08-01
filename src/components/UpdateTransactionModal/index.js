import Modal from "react-modal";
import "./index.css";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import Cookies from "js-cookie";

import "react-datepicker/dist/react-datepicker.css";

const UpdateTransactionModal = ({
  isUpdateOpen,
  onRequestUpdateClose,
  singleItem,
}) => {
  console.log(singleItem);

  const loginId = Cookies.get("loginId");

  const { amount, transaction_name, type, category, date, id } = singleItem;

  const [updateTransName, setUpdateTransName] = useState(transaction_name);

  const [updateAmount, setUpdateAmount] = useState(amount);

  const [updateType, setUpdateType] = useState(type);

  const [updateCategory, setUpdateCategory] = useState(category);

  const [updateDate, setUpdateDate] = useState(date);

  const parsedDate = new Date(updateDate);

  const formatDateToISO = (dateString) => {
    const dateObj = new Date(dateString);
    const isoDateString = dateObj.toISOString();
    return isoDateString;
  };

  const isoDate = formatDateToISO(updateDate);

  const handleUpdateSuccess = () => {
    onRequestUpdateClose();
  };

  const handleUpdate = async () => {
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";

    const body = {
      id: id,
      name: updateTransName,
      type: updateType,
      category: updateCategory,
      amount: updateAmount,
      date: isoDate,
    };

    const headers = {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": "user",
      "x-hasura-user-id": loginId,
    };

    const response = await axios.post(url, body, { headers });

    const responseData = await response.data;

    if (responseData.update_transactions_by_pk === null) {
      console.log("Update successful, but the record was not found.");
    } else {
      console.log("Update successful.");
      handleUpdateSuccess();
    }
  };

  return (
    <Modal
      isOpen={isUpdateOpen}
      onRequestClose={onRequestUpdateClose}
      overlayClassName="custom-overlay"
      shouldCloseOnOverlayClick={false}
      className="add-modal-content"
    >
      <div className="">
        <div>
          <h1 className="add-head">Update Transaction</h1>
          <p className="add-description">
            You can update your transaction here
          </p>
          <div className="add-fields">
            <label className="add-label" htmlFor="trans-name">
              Transaction Name
            </label>
            <input
              type="text"
              id="trans-name"
              className="input-field"
              value={updateTransName}
              onChange={(e) => setUpdateTransName(e.target.value)}
            />

            <label className="add-label" htmlFor="trans-name">
              Transaction Type
            </label>
            <select
              className="add-dropdown"
              value={updateType}
              onChange={(e) => setUpdateType(e.target.value)}
            >
              <option>Credit</option>
              <option>Debit</option>
            </select>

            <label className="add-label" htmlFor="trans-category">
              Category
            </label>
            <select
              htmlFor="trans-category"
              value={updateCategory}
              className="add-dropdown"
              onChange={(e) => setUpdateCategory(e.target.value)}
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
              value={updateAmount}
              onChange={(e) => setUpdateAmount(e.target.value)}
            />

            <label className="add-label" htmlFor="trans-name">
              Date
            </label>

            <DatePicker
              selected={parsedDate}
              onChange={(date) => setUpdateDate(date)}
              className="custom-datepicker"
            />

            <button
              type="button"
              onClick={handleUpdate}
              className="add-trans-button"
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>
      <button onClick={onRequestUpdateClose} className="close-button">
        <MdClose className="close-icon" />
      </button>
    </Modal>
  );
};

export default UpdateTransactionModal;
