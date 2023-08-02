import "./index.css";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { useState } from "react";
import Modal from "react-modal";
import DeleteModal from "../DeleteModal";
import UpdateTransactionModal from "../UpdateTransactionModal";
import Cookies from "js-cookie";
import fakeImageData from "../fakeImages.json";

Modal.setAppElement("#root");

const TransactionItem = (props) => {
  const { transactionDetails, itemNumber } = props;
  const { amount, category, date, transaction_name, type } = transactionDetails;

  const loginId = Cookies.get("loginId");

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

  const transactionDate = date;

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

  const currencySign = type === "credit" ? "+" : "-";
  const currencyColor = type === "credit" ? "green" : "red";

  const showOptions = loginId === "3" ? "hide-option" : "show-option";
  const pullRight = loginId === "3" ? "pull" : "";

  const filteredImage = fakeImageData.filter(
    (each) => each.id === itemNumber.toString()
  );

  const { avatar, name } = filteredImage[0];
  console.log(name);

  const showContent = loginId === "3" ? "show-image" : "hide-image";

  const nameField = loginId === "3" ? name : transaction_name;

  return (
    <tr className="transaction-item">
      <td className="line">
        <div className="transaction-title">
          {type === "credit" ? (
            <BsArrowUpCircle className="arrow" />
          ) : (
            <BsArrowDownCircle className="arrow" />
          )}
          <div className={` image-block ${showContent}`}>
            <img src={avatar} alt="person" className="person-image" />
          </div>
          <p className="trans-name">{nameField}</p>
        </div>
      </td>
      <td className="line">{category}</td>
      <td className="line">{formateDate(transactionDate)}</td>
      <td className={`line currency ${currencyColor}`}>
        <div className={pullRight}>
          {currencySign}${amount}
        </div>
      </td>
      <td className="line">
        <div className={`icons-con ${showOptions}`}>
          <div className="pencil-icon" onClick={openUpdateModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clipPath="url(#clip0_1_2359)">
                <path
                  d="M14.9998 1.66663L18.3332 4.99996M1.6665 18.3333L2.73017 14.4332C2.79957 14.1787 2.83426 14.0515 2.88753 13.9329C2.93482 13.8275 2.99294 13.7274 3.06093 13.6341C3.13752 13.5289 3.23076 13.4357 3.41726 13.2492L12.0284 4.63803C12.1934 4.47302 12.2759 4.39052 12.3711 4.35961C12.4548 4.33242 12.5449 4.33242 12.6286 4.35961C12.7237 4.39052 12.8062 4.47302 12.9712 4.63803L15.3618 7.02855C15.5268 7.19356 15.6093 7.27607 15.6402 7.3712C15.6674 7.45489 15.6674 7.54503 15.6402 7.62872C15.6093 7.72385 15.5268 7.80636 15.3618 7.97136L6.75059 16.5825C6.5641 16.769 6.47085 16.8623 6.36574 16.9389C6.27241 17.0069 6.17227 17.065 6.06693 17.1123C5.94829 17.1655 5.82107 17.2002 5.56662 17.2696L1.6665 18.3333Z"
                  stroke="#2D60FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_2359">
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
                d="M13.3333 4.99996V4.33329C13.3333 3.39987 13.3333 2.93316 13.1517 2.57664C12.9919 2.26304 12.7369 2.00807 12.4233 1.84828C12.0668 1.66663 11.6001 1.66663 10.6667 1.66663H9.33333C8.39991 1.66663 7.9332 1.66663 7.57668 1.84828C7.26308 2.00807 7.00811 2.26304 6.84832 2.57664C6.66667 2.93316 6.66667 3.39987 6.66667 4.33329V4.99996M8.33333 9.58329V13.75M11.6667 9.58329V13.75M2.5 4.99996H17.5M15.8333 4.99996V14.3333C15.8333 15.7334 15.8333 16.4335 15.5608 16.9683C15.3212 17.4387 14.9387 17.8211 14.4683 18.0608C13.9335 18.3333 13.2335 18.3333 11.8333 18.3333H8.16667C6.76654 18.3333 6.06647 18.3333 5.53169 18.0608C5.06129 17.8211 4.67883 17.4387 4.43915 16.9683C4.16667 16.4335 4.16667 15.7334 4.16667 14.3333V4.99996"
                stroke="#FE5C73"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <DeleteModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          singleItem={transactionDetails}
        />
        <UpdateTransactionModal
          isUpdateOpen={updateModalIsOpen}
          onRequestUpdateClose={closeUpdateModal}
          singleItem={transactionDetails}
        />
      </td>
    </tr>
  );
};

export default TransactionItem;
