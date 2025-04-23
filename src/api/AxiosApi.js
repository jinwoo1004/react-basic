import axios from "axios";
import AxiosInstance from "./AxiosInstance";
const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  login: async (email, pw) => {
    console.log("이메일 : ", email);
    console.log("비밀번호 : ", pw);
    const login = {
      email: email,
      pwd: pw,
    };
    return await axios.post(KH_DOMAIN + "/auth/login", login);
  },
  regCheck: async (email) => {
    return await axios.get(KH_DOMAIN + `/auth/exists/${email}`);
  },
  signup: async (email, pw, name) => {
    const member = {
      email: email,
      pwd: pw,
      name: name,
      imgPath: "",
    };
    return await axios.post(KH_DOMAIN + `/auth/signup`, member);
  },
  // memberList: async () => {
  //   return await axios.get(KH_DOMAIN + "/auth/memberAll");
  // },
  // 전체 회원 조회
  memberList: async () => {
    // return await axios.get(KH_DOMAIN + "/member/getInfo");
    return await AxiosInstance.get("/member/getInfo");
  },
  // 개별 회원 조회
  memberInfo: async (email) => {
    return await AxiosInstance.get(`/member/getInfo`, {
      params: {
        email: email,
      },
    });
  },
  // 채팅방 목록 가져오기
  chatList: async () => {
    return await axios.get(KH_DOMAIN + "/chat/list");
  },
  // 채팅방 생성하기
  chatCreate: async (email, name) => {
    const chat = {
      email: email,
      name: name,
    };
    return await axios.post(KH_DOMAIN + "/chat/new", chat);
  },
  // 채팅방 정보 가져오기
  chatDetail: async (roomId) => {
    return await axios.get(KH_DOMAIN + `/chat/room/${roomId}`);
  },
};

export default AxiosApi;
