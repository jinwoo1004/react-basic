import axios from "axios";
import moment from "moment"; // 시간을 경과시간 형태로 표시
import "moment/locale/ko";
moment.locale("ko"); // 한국 시간 적용

const Commons = {
  KH_DOMAIN: "http://localhost:8111",
  KH_SOCKET_URL: "ws://localhost:8111/ws/chat",

  timeFromNow: (timestamp) => {
    return moment(timestamp).fromNow();
  },
  formatDate: (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading 0 if needed
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  },
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },
  setAccessToken: (token) => {
    console.log("여기서 액세스 토큰 저장해줌", token);
    localStorage.setItem("accessToken", token);
  },
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },
  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },

  // 401 에러 처리 함수 (토큰이 만료됐거나.. 그럴때)
  handleUnauthorized: async () => {
    console.log("handleUnauthorized");
    const accessToken = Commons.getAccessToken();
    const refreshToken = Commons.getRefreshToken();
    const config = {
      headers: {
        Authrization: `Bearer ${accessToken}`,
      },
    };
    try {
      const rsp = await axios.post(
        `${Commons.KH_DOMAIN}/auth/refresh`,
        refreshToken,
        config
      );
      console.log("이건 결과!!", rsp.data);
      Commons.setAccessToken(rsp.data.accessToken);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
export default Commons;
