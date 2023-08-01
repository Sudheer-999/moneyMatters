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

      const headers = {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": loginId,
      };

      const response = await axios.get(url, {
        headers: headers,
        params: params,
      });

      const responseData = await response.data;

      const { transactions } = responseData;
      setIsLoading(false);

      setAllTransactions(transactions);
    };

    getAllTransactions();
  }, [loginId]);

  const debitTransactions = allTransactions.filter(
    (eachItem) => eachItem.type === "debit"
  );
  const creditTransactions = allTransactions.filter(
    (eachItem) => eachItem.type === "credit"
  );

  console.log(activeTransactions);

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
              <td className="line">Amount</td>
              <td className="line"></td>
            </tr>
          </thead>
          <tbody>
            {transactionItems.map((eachItem) => (
              <TransactionItem
                key={eachItem.id}
                transactionDetails={eachItem}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllTransactionsBody;
