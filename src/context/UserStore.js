import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  // 배경색에 대한 전역 상태 관리, 새로고침 문제를 해결하기 위해 localStorage 사용
  const [color, setColor] = useState(
    localStorage.getItem("bgcolor") || "orange" // bgcolor있으면 그거 쓰고, 없으면 default값이 orange
  );
  const [name, setName] = useState(
    localStorage.getItem("name") || "이름을 입력해주세요."
  );
  useEffect(() => {
    localStorage.setItem("bgcolor", color); // bgcolor에 color를 넣음
  }, [color]); // 새로 고침때 color가 사라지는걸 방지하기 위해서 저장된 color값을 가져와서 세팅하도록.
  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  return (
    <UserContext.Provider value={{ color, setColor, name, setName }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
