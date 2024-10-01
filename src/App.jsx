import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Test from "./components/Test";
import MapTest from "./components/MapTest";
import Heatmap from "./components/MapTest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NGOEventListingPage from "./components/NGOEventListingPage";
import "remixicon/fonts/remixicon.css";
import { Activity } from "./components/Activity";
import Layout from "./components/Layout";
import AIGrantLetter from "./components/AIGrantLetter";
import SupplierList from "./components/Suppliers/Suppliers";
import MatchMaking from "./components/MatchMaking";
import SupplierDetails from "./components/Suppliers/SupplierDetails";
import EventPage from "./components/EventDetails";
import FeedbackRecorder from "./components/FeedbackRecorder";
import TestMap from "./components/Maps/TestMap";
import MyHeatmap from "./components/Maps/MyHeatmap";
import NGOMaps from "./components/Maps/NGOMaps";
import CommunityForum from "./components/CommunityForum";
import LandingPage from "./components/LandingPage";

function App() {
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isPaycheckOpen, setIsPaycheckOpen] = useState(false);
  const [expenseArr, setExpenseArray] = useState([]);
  const [paycheckAmt, setPaycheckAmt] = useState(0);

  let totalAmount = 0;
  let totalFoodAmount = 0;
  let totalBillsAmount = 0;
  let totalEntertainmentAmount = 0;
  let totalMiscAmount = 0;

  function AddTotalAmount() {
    for (let i = 0; i < expenseArr.length; i++) {
      if (expenseArr[i].spent == true) {
        totalAmount = totalAmount + expenseArr[i].amount;
      }
    }
    return totalAmount;
  }

  function AddFoodAmount() {
    for (let i = 0; i < expenseArr.length; i++) {
      if (expenseArr[i].type == "food") {
        totalFoodAmount = totalFoodAmount + expenseArr[i].amount;
      }
    }
    return totalFoodAmount;
  }

  function AddBillsAmount() {
    for (let i = 0; i < expenseArr.length; i++) {
      if (expenseArr[i].type == "bills") {
        totalBillsAmount = totalBillsAmount + expenseArr[i].amount;
      }
    }
    return totalBillsAmount;
  }

  function AddEntertainmentAmount() {
    for (let i = 0; i < expenseArr.length; i++) {
      if (expenseArr[i].type == "entertainment") {
        totalEntertainmentAmount =
          totalEntertainmentAmount + expenseArr[i].amount;
      }
    }
    return totalEntertainmentAmount;
  }

  function AddMiscAmount() {
    for (let i = 0; i < expenseArr.length; i++) {
      if (expenseArr[i].type == "misc") {
        totalMiscAmount = totalMiscAmount + expenseArr[i].amount;
      }
    }
    return totalMiscAmount;
  }

  let total = {
    full: AddTotalAmount(),
    food: AddFoodAmount(),
    bills: AddBillsAmount(),
    entertainment: AddEntertainmentAmount(),
    misc: AddMiscAmount(),
  };

  function handleIsExpenseOpen() {
    setIsExpenseOpen(!isExpenseOpen);
  }

  function handleIsPaycheckOpen() {
    setIsPaycheckOpen(!isPaycheckOpen);
  }

  const dashboardProps = {
    isExpenseOpen,
    expenseArr,
    isPaycheckOpen,
    setIsPaycheckOpen,
    setExpenseArray,
    handleIsExpenseOpen,
    handleIsPaycheckOpen,
    total,
    paycheckAmt,
    setPaycheckAmt,
    // budgetDash,
    // setBudgetDash
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/supplier-list" element={<SupplierList />} />
        <Route
          path="/supplier-details/:supplierId"
          element={<SupplierDetails />}
        />
        {/* <Route path="/test-map" element={<TestMap />} /> */}
        <Route path="/literacy-map" element={<TestMap />} />
        <Route path="/ngo-work-map" element={<MyHeatmap />} />
        <Route path="/events" element={<NGOEventListingPage />} />
        <Route path="/budget" element={<Activity {...dashboardProps} />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/volunteer-heatmap" element={<MapTest />} />
        <Route path="/ngomaps" element={<NGOMaps />} />
        <Route path="/grants" element={<AIGrantLetter />} />
        <Route path="/record-feedback" element={<FeedbackRecorder />} />
        <Route path="/test" element={<Test />} />
        <Route path="/event-details/:eventId" element={<EventPage />} />
        <Route path="/community" element={<CommunityForum />} />
        <Route path="/newtest" element={<MatchMaking />} />
        {/* <Route path="/landing" element={<Landing />} /> */}
      </Routes>
    </>
  );
}

export default App;
