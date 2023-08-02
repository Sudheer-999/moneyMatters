import "./index.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TransactionItem from "../TransactionItem";
import AppContext from "../AppContext";
import { ColorRing } from "react-loader-spinner";

const AllTransactionsBody = () => {
  const [allTransactions, setAllTransactions] = useState([]);

  const { activeTransactions } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  const [fakeImages, setFakeImages] = useState([]);

  const loginId = Cookies.get("loginId");

  useEffect(() => {
    const getAllTransactions = async () => {
      setIsLoading(true);
      const url =
        "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";

      const params = {
        limit: 100,
        offset: 0,
      };

      const userHeaders = {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": loginId,
      };

      const adminHeaders = {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "admin",
      };

      let headers = loginId === "3" ? adminHeaders : userHeaders;

      try {
        const response = await axios.get(url, {
          headers: headers,
          params: params,
        });

        const responseData = await response.data;

        const { transactions } = responseData;

        setAllTransactions(transactions);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllTransactions();
  }, [loginId]);

  useEffect(() => {
    const getFakeData = async () => {
      const fakeImageUrl =
        "https://mockapi.io/projects/64bcc2ab7b33a35a44474f0b";

      try {
        const fakeImageResponse = await axios.get(fakeImageUrl);

        const fakeImageData = await fakeImageResponse.data;
        setFakeImages(fakeImageData);
      } catch (error) {
        console.log(error);
      }
    };
    getFakeData();
  }, []);

  const debitTransactions = allTransactions.filter(
    (eachItem) => eachItem.type === "debit"
  );
  const creditTransactions = allTransactions.filter(
    (eachItem) => eachItem.type === "credit"
  );

  let transactionItems;

  switch (activeTransactions) {
    case "debit":
      transactionItems = debitTransactions;
      break;
    case "credit":
      transactionItems = creditTransactions;
      break;
    default:
      transactionItems = allTransactions;
      break;
  }

  const pullRight = loginId === "3" ? "pull" : "";

  console.log(fakeImages);

  return (
    <div className="all-transactions-body">
      {isLoading ? (
        <div className="loader">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#2D60FF", "#2D60FF", "#2D60FF", "#2D60FF", "#2D60FF"]}
          />
        </div>
      ) : (
        <table className="table-container">
          <thead>
            <tr className="thead-row">
              <td className="line">Transaction Name</td>
              <td className="line">Category</td>
              <td className="line">Date</td>
              <td className="line">
                <div className={pullRight}>Amount</div>
              </td>
              <td className="line"></td>
            </tr>
          </thead>
          <tbody>
            {transactionItems.map((eachItem, index) => (
              <TransactionItem
                key={eachItem.id}
                transactionDetails={eachItem}
                itemNumber={index + 1}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllTransactionsBody;
