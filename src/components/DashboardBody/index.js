import "./index.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import LastTransactions from "../LastTransactions";
import BarChartItem from "../BarChartItem";
import { ColorRing } from "react-loader-spinner";

const DashboardBody = () => {
  const loginId = Cookies.get("loginId");

  const [creditTotal, setCreditTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [debitTotal, setDebitTotal] = useState(0);

  useEffect(() => {
    const getTotalCredits = async () => {
      setIsLoading(true);
      const url =
        loginId === "3"
          ? "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin"
          : "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";

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
        });

        const responseData = await response.data;

        let creditDebitTotals;

        if (loginId === "3") {
          const { transaction_totals_admin } = responseData;
          creditDebitTotals = transaction_totals_admin;
        } else {
          const { totals_credit_debit_transactions } = responseData;
          creditDebitTotals = totals_credit_debit_transactions;
        }

        if (creditDebitTotals.length !== 0) {
          const totalCreditItem = creditDebitTotals.filter(
            (eachItem) => eachItem.type === "credit"
          );

          if (totalCreditItem.length !== 0) {
            const totalCredit = totalCreditItem[0].sum;
            setCreditTotal(totalCredit);
          }

          const totalDebitItem = creditDebitTotals.filter(
            (eachItem) => eachItem.type === "debit"
          );

          if (totalDebitItem.length !== 0) {
            const totalDebit = totalDebitItem[0].sum;
            setDebitTotal(totalDebit);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getTotalCredits();
  }, [loginId]);

  return (
    <div className="main-body-container">
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
        <>
          <div className="top-section">
            <div className="credit-card card1">
              <div className="credit-details">
                <p className="amount">${creditTotal}</p>
                <p className="credit-text">Credit</p>
              </div>
              <img
                src="https://res.cloudinary.com/djzsbpran/image/upload/v1690724395/Group_2_ztscbb.png"
                alt="credit"
                className="credit-image"
              />
            </div>
            <div className="credit-card">
              <div className="credit-details">
                <p className="amount debit-amnt">${debitTotal}</p>
                <p className="credit-text">Debit</p>
              </div>
              <img
                src="https://res.cloudinary.com/djzsbpran/image/upload/v1690723686/Group_1_fdkayp.png"
                alt="credit"
                className="debit-image"
              />
            </div>
          </div>
          <div className="middle-section">
            <h1 className="side-head">Last Transaction</h1>
            <LastTransactions />
          </div>
          <div className="end-section">
            <h1 className="side-head debit-sidehead">
              Debit & Credit Overview
            </h1>
            <BarChartItem />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardBody;
