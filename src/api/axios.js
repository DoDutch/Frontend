import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_SERVER_PORT,
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//   },
// });
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "http://localhost:8080",
  headers: {
      'Content-Type': 'application/json',
      // "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
  },
});


// export const axiosInstance=axios.create({
//   baseURL: process.env.REACT_APP_SERVER_PORT,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     console.log("저장된 토큰:", token); // 토큰 값 확인
    
//     if(token) {
//       config.headers = {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       };
//       console.log("요청 헤더:", config.headers); // 실제 전송되는 헤더 확인
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response)=>response,
//   async(error)=>{

//     if (error.config.url === '/auth/signup') {
//       return Promise.reject(error);
//     }

//     if(error.response?.status===401 && !error.config._retry){ // 이 코드는 API 요청 시 토큰이 만료되었을 때(401 에러) 그리고 아직 재시도하지 않았을 때(_retry가 false일 때) 실행됩니다. 토큰을 재발급 받고 API를 재요청하기 위한 조건문입니다.
//       try{
//         const refreshToken=localStorage.getItem("refresh_token");
//         const response = await axiosInstance.post("/auth/kakao/token_reissue",
//           {
//             refreshToken:refreshToken,
//           }
//         )
//         localStorage.setItem("access_token",response.data.data.accessToken);
//         localStorage.setItem("refresh_token",response.data.data.refreshToken);

//         const newToken=localStorage.getItem("access_token");

//         error.config._retry=true; //명시적 flag역할
//         error.config.headers.Authorization = `Bearer ${newToken}`;
//         return axiosInstance(error.config);

//       } catch(refreshTokenError){
//          // refresh token도 만료된 경우
//          localStorage.clear();
//          //window.location.href = '/login'; //refresh token도 만료된 경우 로그인 페이지로 이동
//          return Promise.reject(refreshTokenError); //api 호출부에서 catch로 넘어가게 하기 위한 장치
//       }
//     }
//     return Promise.reject(error); //401에러 외 다른 에러 처리 가능하게 하기 위해
//   })


export default axiosInstance;
