import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TransactionsChart from "../chart/TransactionsChart";
import LedgerList from "./LedgerList";
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

export default function Dashboard() {
  const [resData, setResData] = useState([]);
  const [chartData, setChartData] = useState(initData);
  const [listItemAmount, setListItemAmount] = useState(15);
  const auth = useSelector((state=>state.auth))
  const { type } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    let resData = { income: 0, expenses: 0 };

    const getData = async () => {
      let res;
      console.log(auth)
      try {
        res = await axios.get(
          `${serverUrl}/api/v1/user/${auth.token.user_id}/transactions/limit?limit=${listItemAmount}`,
          { withCredentials: true }
        );
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/login");
          return;
        }
        navigate("/");
        return;
      }
      console.log(res);
      for (let item of res.data) {
        resData["income"] += item.deposit;
        resData["expenses"] += item.withdrawal;
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
    getData();
  }, [listItemAmount, type]);
  return (
    <div>
      <TransactionsChart data={chartData} options={options} />
      <LedgerList
        data={resData}
        listItemAmount={listItemAmount}
        setListItemAmount={setListItemAmount}
      />
    </div>
  );
}
