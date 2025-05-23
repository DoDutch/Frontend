import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Xbutton } from "../icons/Xbutton.svg";
import { ReactComponent as CopyBox } from "../icons/Copy.svg";
import axiosInstance from "../api/axios.js";

const TravelJoin = () => {

  const { tripId } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
 // 이걸로 바꿔야함


//더미 데이터
//  const [userData, setUserData] = useState({
//    tripName: "매드크리스마스",
//    startDate: "2024-12-24",
//    endDate: "2024-12-25",
//    place: "제주특별자치도 서귀포시",
//    tripImageUrl: "/asset/제주도도.jpg",
//    joinCode: "123456",
//  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/trip/share/${tripId}`);
        if (response.data.success) {
          setUserData(response.data.data);
        } else {
          console.error("데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("네트워크 오류:", error);
      }
    };

    fetchData();
  }, [tripId]);
    
  const handleCopy = () => {
    navigator.clipboard.writeText(userData.joinCode)
      .then(() => {
        alert("참여 코드가 복사되었습니다!");
      })
      .catch(err => {
        console.error("복사 실패:", err);
      });
  };


return (
    <Container>
      <Header>
        <Title>참여 코드</Title>
        <Button onClick={() => navigate(`/travel/detail/${tripId}`)}>
          <Xbutton />
        </Button>
      </Header>
      <CreateBox>
        <CircleWrapper>
          <Circle>
            {userData.tripImageUrl && (
              // 코드 수정 들어갔음. 원래는 <img src={userData.tripImageUrl}
              <img src={userData.tripImageUrl} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            )}
          </Circle>
        </CircleWrapper>
        <DateText>{`${userData.startDate} ~ ${userData.endDate}`}</DateText>
        <TripName>{userData.name}</TripName>
        <Place>{userData.place}</Place>
      </CreateBox>
      <CopyBoxWrapper onClick={handleCopy}>
        <CopyBox />
      </CopyBoxWrapper>
    </Container>
  );
};

const CopyBoxWrapper = styled.div`
  cursor: pointer;
  margin-top: 20px;
`;


const DateText = styled.div`
  display: inline-flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  background: var(--main-red, #FF5234);

  color: var(--Grayscale-White, #FFF);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  margin-top: 10px;
`;

const TripName = styled.div`
  color: var(--Grayscale-9, #141414);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
  margin: 16px 0;
`;

const Place = styled.div`
  color: var(--Grayscale-5, #7A7A7A);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 27px */
`;

const CircleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  width: 247px;
  height: 247px;
  border-radius: 50%;
  background-color: #f9f9f9;
  margin-bottom: 20px;
  margin-top: 40px;
  position: relative;
  overflow: hidden;
`;

export default TravelJoin

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
margin-top: 48px;
`;


const Header = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
margin-bottom: 28px;
position: relative;
`;

const CreateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 476px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--Grayscale-9, #141414);
  font-weight: 600;
`;


const Title = styled.h1`
  color: var(--Grayscale-7, #474747);
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  margin: 0 auto;
`;
