import "./index.css";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import LastTransactionItem from "../LastTransactionItem";

const LastTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const loginId = Cookies.get("loginId");

  const getTransactions = useCallback(async () => {
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";

    const body = { limit: 100, offset: 0 };

    const headers = {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": "user",
      "x-hasura-user-id": loginId,
    };

    const response = await axios.get(url, {
      params: body,
      headers: headers,
    });

    const responseData = await response.data;
    const { transactions } = responseData;
    setTransactions(transactions);
  }, [loginId]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const filteredData = transactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const recentTransactions = filteredData.slice(0, 3);

  return (
    <div className="last-transactions-card">
      <ul className="recent-transactions">
        {recentTransactions.map((transactionItem) => (
          <LastTransactionItem
            details={transactionItem}
            key={transactionItem.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default LastTransactions;
