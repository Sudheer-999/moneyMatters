import "./index.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Label,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RoundedBar = (props) => {
  const { x, y, width, height, radius } = props;
  const adjustedRadius = height > 0 ? radius : 0;

  return (
    <g>
      {height > 0 ? (
        <path
          d={`M${x},${y + adjustedRadius} 
            L${x},${y + height - adjustedRadius} 
            Q${x},${y + height} ${x + adjustedRadius},${y + height} 
            L${x + width - adjustedRadius},${y + height} 
            Q${x + width},${y + height} ${x + width},${
            y + height - adjustedRadius
          } 
            L${x + width},${y + adjustedRadius} 
            Q${x + width},${y} ${x + width - adjustedRadius},${y} 
            L${x + adjustedRadius},${y} 
            Q${x},${y} ${x},${y + adjustedRadius}`}
          fill={props.fill}
        />
      ) : (
        <rect x={x} y={y} width={width} height={height} fill={props.fill} />
      )}
    </g>
  );
};

const BarChartItem = () => {
  const [weekTransactions, setWeekTransactions] = useState([]);

  const loginId = Cookies.get("loginId");

  const getWeekTransactions = useCallback(async () => {
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days";

    const headers = {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": "user",
      "x-hasura-user-id": loginId,
    };

    const response = await axios.get(url, {
      headers: headers,
    });

    const responseData = await response.data;
    const { last_7_days_transactions_credit_debit_totals } = responseData;

    setWeekTransactions(last_7_days_transactions_credit_debit_totals);
  }, [loginId]);

  useEffect(() => {
    getWeekTransactions();
  }, [getWeekTransactions]);

  const groupedData = weekTransactions.reduce((acc, entry) => {
    const date = new Date(entry.date).toISOString().substring(0, 10); // Extract the date without the time
    if (!acc[date]) {
      acc[date] = { date, debitSum: 0, creditSum: 0 };
    }
    if (entry.type === "debit") {
      acc[date].debitSum += entry.sum;
    } else if (entry.type === "credit") {
      acc[date].creditSum += entry.sum;
    }
    return acc;
  }, {});

  const totalDebitItem = weekTransactions.filter(
    (eachItem) => eachItem.type === "debit"
  );

  const totalCreditItem = weekTransactions.filter(
    (eachItem) => eachItem.type === "credit"
  );

  const totalDebit = totalDebitItem.reduce((acc, obj) => acc + obj.sum, 0);

  const totalCredit = totalCreditItem.reduce((acc, obj) => acc + obj.sum, 0);

  const processedData = Object.values(groupedData);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="barchart-background">
      <p className="chart-info">
        <span className="week-amount">${totalDebit}</span> Debited{" "}
        <span className="week-amount">${totalCredit}</span> Credited in this
        week
      </p>
      <ResponsiveContainer width="100%" height={364}>
        <BarChart
          data={processedData}
          margin={{
            top: 28,
            left: 12,
            bottom: 14,
            right: 18,
          }}
        >
          <Label value="My Bar Chart Heading" position="top" offset={0} />
          <CartesianGrid
            stroke="#F3F3F5"
            strokeDasharray="0 0"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => weekdays[new Date(tick).getDay()]}
            axisLine={false}
            tickSize={0}
            tickMargin={10}
            tick={{ fill: "#718EBF", fontFamily: "Inter", fontSize: "14" }}
          />
          <YAxis
            axisLine={false}
            tickSize={0}
            tickMargin={10}
            tick={{ fill: "#718EBF", fontFamily: "Inter", fontSize: "13" }}
          />
          <Legend
            wrapperStyle={{
              padding: 10,
            }}
            legendMargin={20}
            layout="horizontal"
            verticalAlign="top"
            align="right"
            iconType="square"
          />
          <Tooltip />
          <Bar
            dataKey="debitSum"
            name="Debit"
            fill="#4D78FF"
            shape={<RoundedBar radius={10} />}
            barSize={35}
          />
          <Bar
            dataKey="creditSum"
            name="Credit"
            fill="#FCAA0B"
            shape={<RoundedBar radius={10} />}
            barSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartItem;
