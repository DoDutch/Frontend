import React from "react";
import { useEffect } from "react";
import { reset } from "styled-reset";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./fonts/Pretendard.css";
import { createGlobalStyle } from "styled-components";
import { DayCost } from "./Components/DayCost";
import TravelCreate from "./Travel/TravelCreate";
import TravelMain from "./Travel/TravelMain";
import TravelJoin from "./Travel/TravelJoin";
import TravelSearch from "./Travel/TravelSearch";
import { TravelDetail } from "./travelSpecific/TravelDetail";
import { TravelDetailEdit } from "./travelSpecific/TravelDetailEdit";
import { ExpAdd } from "./expAdd/ExpAdd";
import Expense from "./Calculate/Expense";
import CalDetail from "./Calculate/CalDetail";
import CalTotal from "./Calculate/CalTotal";
import { TravelPictureLook } from "./travelSpecific/TravelPictureLook";
import MainPage from './Main/Mainpage';

function App() {
  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
  
          <Route path="/trip" element={<TravelCreate />} />
          <Route path="/trip/share/:tripId" element={<TravelJoin/>} />
      
          
          <Route path="/tripSearch" element={<TravelSearch />} />
          <Route path="/tripMain" element={<TravelMain />} />
          <Route path='/travel/detail/:tripId' element={<TravelDetail />} />
           {/* 여기 뒤에 /:tripId 추가해야함 */}

          <Route path="/travel/detail/edit/:tripId" element={<TravelDetailEdit />} />
          <Route path="/expAdd/:tripId" element={<ExpAdd />} />
          {/* 여기 뒤에 /:tripId 추가해야함 */}
          <Route path="/expense/:tripId" element={<Expense />} />
          {/* 여기 뒤에 /:tripId 추가해야함 */}

          <Route path="/calculate/detail/:tripId" element={<CalDetail />} />
          {/* 여기 뒤에 /:tripId 추가해야함 */}

          <Route path="/calculate/total" element={<CalTotal />} />
        
          <Route path="/main" element={<MainPage />} />
          <Route path='/pictureLook/:tripId' element={<TravelPictureLook/>}/>  
          {/* 여기 뒤에 /:tripId 추가해야함 */}

        </Routes>
      </Router>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  ${reset}
  #root {
    max-width: 375px;
    height: var(--app-height, 100vh);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Pretendard";
    padding: 20px 20px 0;
    background-color: #fff;
    border: 2px solid #f4f4f4;
  }
`;
