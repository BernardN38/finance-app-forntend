import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TransactionsChart from "./TransactionsChart";
import TransactionsList from "./TransactionsList";
import capitalize from "../../textHelpers/capitalize";
import serverUrl from "../../config";

const initDataset = {
  label: "# of Votes",
  data: [12, 19, 3, 5, 2, 3],
  backgroundColor: [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(110, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ],
  borderWidth: 1,
};

const initData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [initDataset],
};
const options = {
  maintainAspectRatio: false,
};

export default function TransactionsContainer() {
  
  const [resData, setResData] = useState([]);
  const [chartData, setChartData] = useState(initData);
  const [listItemAmount, setListItemAmount] = useState(15);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { type } = useParams();
  console.log("transactions")
  useEffect(() => {
    let resData = {};
    const getData = async () => {
      let res;
      try {
        res = await axios.get(
          `${serverUrl}/api/v1/user/${auth.token.user_id}/transactions/limit?type=${type}&limit=${listItemAmount}`,
          { withCredentials: true }
        );
      } catch (err) {
        if (err.response.status === 401) {
          console.log(err.response)
          navigate("/login");
          return;
        }
        navigate("/");
        return;
      }
      for (let item of res.data) {
        if (
          !resData[item.description] &&
          item.description != "investment_total"
        ) {
          resData[item.description] = 0;
        }

        switch (item.description) {
          case "investment_total":
            console.log(item);
            continue;
          case "investment_intrest":
            resData[item.description] += item.deposit;
            continue;
          case "pay_day":
            resData[item.description] += item.deposit;
            continue;
          default:
            resData[item.description] += item.withdrawal;
        }
      }
      resData = Object.entries(resData)
        .sort(([, a], [, b]) => a - b)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      setChartData({
        labels: Object.keys(resData).map((key) => capitalize(key)),
        datasets: [{ ...initDataset, data: Object.values(resData) }],
      });
      setResData(res.data);
    };

    try {
      getData();
    } catch (err) {
      console.log(err);
    }
  }, [listItemAmount]);
  return (
    <div>
      <Typography sx={{ textAlign: "center", fontSize: "2rem" }}>
        {capitalize(type)}
      </Typography>
      <TransactionsChart data={chartData} options={options} />
      <TransactionsList
        type={type}
        data={resData}
        listItemAmount={listItemAmount}
        setListItemAmount={setListItemAmount}
      />
    </div>
  );
}
