import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";

const Home = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const rsp = await AxiosApi.memberList(); // 매개변수 없기때문에 이렇게 하면 됨.
        console.log(rsp.data);
        setMembers(rsp.data);
      } catch (e) {
        alert("서버가 응답하지 않습니다.", e);
        console.log(e);
      }
    };
    getMembers();
  }, []);

  return (
    <>
      <h1>회원 정보 조회</h1>
      <table>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>가입일</th>
        </tr>
        {members &&
          members.map((member) => (
            <tr key={member.email}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.date}</td>
            </tr>
          ))}
      </table>
    </>
  );
};

// const Home = () => {
//   const [members, setMembers] = useState([]);

//   useEffect(() => {
//     const fetchMemberList = async () => {
//       const response = await AxiosApi.memberList();
//       setMembers(response.data); // 서버에서 받은 데이터를 상태에 저장
//     };
//     fetchMemberList();
//   }, []);
//   return (
//     <div>
//       <h1>Home</h1>
//       <p>여기가 Home입니다.</p>
//       {members.length > 0 ? (
//         <ul>
//           {members.map((member) => (
//             <li key={member.id}>{`${member.name} (${member.email})`}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>회원 정보가 없습니다.</p>
//       )}
//     </div>
//   );
// };

export default Home;
