import "./index.css";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import DeleteModal from "../DeleteModal";
import UpdateTransactionModal from "../UpdateTransactionModal";
import { useState } from "react";

const LastTransactionItem = (props) => {
  const { details } = props;
  const { amount, transaction_name, category, date, type } = details;
  const dateString = date;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openUpdateModal = (id) => {
    setUpdateModalIsOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const formateDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${day} ${month}, ${formattedHours}.${formattedMinutes} ${ampm}`;
  };

  const statusSymbol = type === "credit" ? "+" : "-";
  const amountColor = type === "credit" ? "green" : "red";

  return (
    <li className="list-item">
      <div className="trans-name">
        {type === "debit" ? (
          <BsArrowDownCircle className="down-arrow-icon" />
        ) : (
          <BsArrowUpCircle className="up-arrow-icon" />
        )}

        <p className="t-name">{transaction_name}</p>
      </div>
      <div className="trans-middle">
        <p className="t-category">{category}</p>
        <p className="t-date t-category">{formateDate(dateString)}</p>
        <p className={`t-amount ${amountColor}`}>
          {statusSymbol}${amount}
        </p>
      </div>
      <div className="trans-end">
        <div className="pencil-icon" onClick={openUpdateModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clipPath="url(#clip0_1_1510)">
              <path
                d="M14.9998 1.66669L18.3332 5.00002M1.6665 18.3334L2.73017 14.4332C2.79957 14.1788 2.83426 14.0516 2.88753 13.9329C2.93482 13.8276 2.99294 13.7274 3.06093 13.6341C3.13752 13.529 3.23076 13.4358 3.41726 13.2493L12.0284 4.63809C12.1934 4.47308 12.2759 4.39058 12.3711 4.35967C12.4548 4.33248 12.5449 4.33248 12.6286 4.35967C12.7237 4.39058 12.8062 4.47308 12.9712 4.63809L15.3618 7.02862C15.5268 7.19362 15.6093 7.27613 15.6402 7.37126C15.6674 7.45495 15.6674 7.54509 15.6402 7.62878C15.6093 7.72391 15.5268 7.80642 15.3618 7.97143L6.75059 16.5826C6.5641 16.7691 6.47085 16.8623 6.36574 16.9389C6.27241 17.0069 6.17227 17.065 6.06693 17.1123C5.94829 17.1656 5.82107 17.2003 5.56662 17.2697L1.6665 18.3334Z"
                stroke="#2D60FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_1510">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="del-icon" onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M13.3333 5.00002V4.33335C13.3333 3.39993 13.3333 2.93322 13.1517 2.5767C12.9919 2.2631 12.7369 2.00813 12.4233 1.84834C12.0668 1.66669 11.6001 1.66669 10.6667 1.66669H9.33333C8.39991 1.66669 7.9332 1.66669 7.57668 1.84834C7.26308 2.00813 7.00811 2.2631 6.84832 2.5767C6.66667 2.93322 6.66667 3.39993 6.66667 4.33335V5.00002M8.33333 9.58335V13.75M11.6667 9.58335V13.75M2.5 5.00002H17.5M15.8333 5.00002V14.3334C15.8333 15.7335 15.8333 16.4336 15.5608 16.9683C15.3212 17.4387 14.9387 17.8212 14.4683 18.0609C13.9335 18.3334 13.2335 18.3334 11.8333 18.3334H8.16667C6.76654 18.3334 6.06647 18.3334 5.53169 18.0609C5.06129 17.8212 4.67883 17.4387 4.43915 16.9683C4.16667 16.4336 4.16667 15.7335 4.16667 14.3334V5.00002"
              stroke="#FE5C73"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <DeleteModal isOpen={modalIsOpen} onRequestClose={closeModal} />
      <UpdateTransactionModal
        isUpdateOpen={updateModalIsOpen}
        onRequestUpdateClose={closeUpdateModal}
        singleItem={details}
      />
    </li>
  );
};

export default LastTransactionItem;
