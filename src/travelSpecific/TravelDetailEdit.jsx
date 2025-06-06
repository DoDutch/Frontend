import styled from "styled-components";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios.js';
import { useEffect } from "react";


const EditContainor=styled.div`
    width:375px;
    height:900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    //background-color: whitesmoke;
`

const TitleAndBtn=styled.div`
    width:331px;
    height:30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top:100px;
    //background-color: blue;

    .material-symbols-outlined{
        width:30px;
        height:21px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size:20px;
        color: gray;
        border: none;
    }

    .title{
        width:120px;
        height:21px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 21px */
        //background-color: red;
        margin-right: 100px;
    }

`


const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  //margin-bottom: 20px;
  position: relative;

  &::before {
    content: "~";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #aaa;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  width: 93%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #ccc;
  background: none;
  outline: none;
  text-align: center;
  color: var(--Grayscale-3, #ADADAD);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.36px;
`;
const DateInput = styled(Input)`
  width: 40%;
  text-align: center;
  border-bottom: 1px solid #ccc;
  background: none;
  outline: none;
  color: #333;

  &:not(:valid) {
    color: transparent;
  }

  /* placeholder 스타일 */
  &::placeholder {
    color: #ADADAD;
  }
`;


const TravelInfoEdit=styled.div`
    width:331px;
    margin-top: 60px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: white;
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.1);
    //background-color: gray;

    .travelTitle{
        width:331px;
        height:32px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ddd;
        margin-top: 10px;
        //background-color: aqua;

        .travelNameInput{
            width:331px;
            height:32px;
            border: none;
            outline: none;
            color: var(--Grayscale-9, #141414);
            text-align: center;
            font-family: Pretendard;
            font-size: 18px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%; /* 27px */
            letter-spacing: 0.36px;


            margin: 0;
            padding: 0;
            //background-color: red;
        }
    }
    

    .travelPlace{
        width:331px;
        height:32px;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ddd;

        .travelPlaceInput{
            width:331px;
            height:32px;
            border: none;
            outline: none;
            background-color: transparent;
            color: black;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
            text-align: center;
        }
    }

    .goalExp{
        width:331px;
        height:52px;
        margin-top: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ddd;
        //background-color: aqua;

        /* .goalExpText{
            color: #000;
            font-family: Pretendard;
            font-size: 9px;
            font-style: normal;
            font-weight: 600;
            //line-height: 150%; 
            opacity: 0.3;
            margin: 0;
        } */

        .goalExpInput{
            width:331px;
            height:32px;
            border: none;
            outline: none;
            font-family: Pretendard;
            background-color: transparent;
            color: black;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
            text-align: center;
        }

        .goalExpNum{
            color: #000;
            text-align: center;
            font-family: Pretendard;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            //line-height: 150%;
            margin: 0;
            margin-top: 10px;
        }
    }

    .realExp{
        width:375px;
        height:52px;
        margin-top: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ddd;
        //background-color: aqua;

        .realExpText{
            color: #000;
            font-family: Pretendard;
            font-size: 9px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%; 
            opacity: 0.3;
            margin: 0;
        }

        .realExpNum{
            color: #000;
            text-align: center;
            font-family: Pretendard;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%;
            margin: 0;
            margin-top: 10px;
        }
    }
`



const MembersSection = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    //align-items: center;
    margin-top:30px;
    //background-color: aqua;
`;

const MemberItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px 0;
    //border-bottom: 1px solid #ddd;
    font-size: 25px;

    .remove {
        color: red;
        cursor: pointer;
        margin-right: 10px;

        .minusCircle{
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            margin-left: 5px;
            background-color: red;

            p{
                color: white;
                //margin-top: 1px;
                margin-bottom: 1px;
            }
        }
    }

    .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: lightgray;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: white;
    }

    .memberName{
        color: #000;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;
        margin-left: 10px;
    }
`;

const AddMemberButton = styled.div`
    width: 200px;
    height:30px;
    display: flex;
    flex-direction: row;
    //padding: 10px 0;
    cursor: pointer;
    margin-top: 30px;
    //background-color: beige;
    margin-bottom: 50px;

    .plusCircle{
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            background-color: black;
            margin-top:4px;
            margin-left: 5px;
            .plusLogo{
                color: white;
                //margin-top: 13px;
                margin-bottom: 3px;
                font-size: 20px;
            }
    }

    .plusText{
        width:100px;
        height:30px;
        //background-color: red;
        margin-top: 5px;
        margin-left: 10px;
        color: #000;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        opacity:0.5;
        
    }
`;

const CompleteBtn=styled.div`
    width:331px;
    height:56px;
    background-color: var(--main-red, #FF5234);
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    
    color: var(--Grayscale-White, #FFF);
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 27px */
`

export function TravelDetailEdit(){

    const navigate = useNavigate();
    const { tripId } = useParams();

    

    const [members, setMembers] = useState([]);

    const [tripName,setTripName]=useState("");
    const [tripPlace,setTripPlace]=useState("");
    const [tripStartDate,setTripStartDate]=useState("");
    const [tripEndDate,setTripEndDate]=useState("");
    const [tripGoalExp,setTripGoalExp]=useState("");
  
    const patchTripData=async()=>{  //성공 but 인원 정보 수정은 구현안됨

        try{
            const updatedTripData={
                tripName: tripName,
                startDate: tripStartDate,
                endDate: tripEndDate,
                place: tripPlace,
                budget: tripGoalExp,
            }
            const response=await axiosInstance.patch(`/trip/${tripId}`, updatedTripData);
            console.log(response);
            navigate(`/travel/detail/${tripId}`);
            alert("여행 정보 수정 완료");
        }
        catch(error){
            console.error("Error patching travel data:", error);
        }
    }
    
    const handleRemoveMember = (index) => {
        const updatedMembers = members.filter((_, i) => i !== index);
        setMembers(updatedMembers);
    };

    const handleTripNameChange=(e)=>{
        setTripName(e.target.value);
    }
    
    const handleTripPlaceChange=(e)=>{
        setTripPlace(e.target.value);
    }
    
    const handleTripStartDateChange=(e)=>{
        setTripStartDate(e.target.value);
    }
    
    const handleTripEndDateChange=(e)=>{
        setTripEndDate(e.target.value);
    }

    const handleTripGoalExpChange=(e)=>{
        setTripGoalExp(e.target.value);
    }

    const fetchTripData=async()=>{ 
        try{
            const response=await axiosInstance.get(`/trip/${tripId}`);
            setTripName(response.data.data.tripName);
            setTripPlace(response.data.data.place);
            setTripStartDate(response.data.data.startDate);
            setTripEndDate(response.data.data.endDate);
            setTripGoalExp(response.data.data.budget);
            setMembers(response.data.data.members);
             
            console.log(response);
        }catch(error){
            console.error("Error fetching travel data:", error);
        }
    }
    
    useEffect(()=>{
        fetchTripData();
    },[]);

    return(
        <EditContainor>
            <TitleAndBtn>
                <div className="material-symbols-outlined" onClick={ () => {navigate(`/travel/detail/${tripId}`)}}>
                    arrow_back_ios
                </div>
                <div className='title'>
                    <p>여행 정보 수정</p>
                </div>
            </TitleAndBtn>

            {/* 여행 정보 수정 영역 */}
            {/* value는 받아온 데이터로 넣어줘야함 -> 초기값 설정 기능 */}
            <TravelInfoEdit>
                <div className='travelTitle'>
                    <input type="text" className="travelNameInput" value={tripName} placeholder="여행 이름을 입력해주세요" onChange={handleTripNameChange} required/>
                </div>
                <DateContainer>
                    <DateInput type="date" value={tripStartDate} onChange={handleTripStartDateChange} required/>
                    <DateInput type="date" value={tripEndDate} onChange={handleTripEndDateChange} required/>
                </DateContainer>
                <div className='travelPlace'>
                    <input type="text" className="travelPlaceInput" value={tripPlace} placeholder="여행 장소를 입력해주세요" onChange={handleTripPlaceChange} required/>
                </div>
                <div className='goalExp'>
                    <p className='goalExpText'>목표금액</p>
                    <input type="text" className="goalExpInput" value={tripGoalExp} placeholder="목표금액을 입력해주세요" onChange={handleTripGoalExpChange} required/>
                </div>

                {/* fetchTripData로 받아온 인원들 아래에 넣어야함 */}
                <MembersSection>
                    {members.map((member, index) => (
                        <MemberItem key={index}>
                            <span className="remove" onClick={() => handleRemoveMember(index)}>
                                <div className='minusCircle'>
                                    <p>-</p>
                                </div>
                            </span>
                            {/* <div className='avatar'>

                            </div> */}
                            <span className='memberName'>{member.nickName}</span>
                        </MemberItem>
                    ))}
                    <AddMemberButton onClick={()=>navigate(`/trip/share/${tripId}`)}>
                        <div className='plusCircle'>
                            <p className='plusLogo'>+</p>
                        </div>
                        <p className='plusText'>구성원 추가</p>
                    </AddMemberButton>
                </MembersSection>
            </TravelInfoEdit>

            <CompleteBtn onClick={()=>patchTripData()}>
                <p>완료</p>
            </CompleteBtn>

            {/* 성공 시에 `/travel/detail/${tripId}` 로 이동 */}
        </EditContainor>
    );
}