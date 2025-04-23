import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserStore";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Container,
  UserContainer,
  UserImage,
  UserAndName,
  StyledSideMenu,
  StyledMenuList,
  StyledMenuItem,
  MenuIcon,
  StyledLink,
  Dummy,
} from "../styles/LayoutStyle";
import { GiCancel, GiHamburgerMenu } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { FaHome, FaClipboardList, FaRegNewspaper } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { LuListTodo } from "react-icons/lu";
import AxiosApi from "../api/AxiosApi";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Side Bar 메뉴 열고 닫기
  const [member, setMember] = useState(""); // 회원정보 업데이트
  const { color } = useContext(UserContext);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // 토글
  };

  const goToSetting = () => {
    navigate("/setting");
  };

  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        const rsp = await AxiosApi.memberInfo(email);
        setMember(rsp.data);
      } catch (e) {
        alert("서버가 응답하지 않습니다.");
      }
    };
    getMemberInfo();
  }, []);

  return (
    <Container color={color}>
      <header className="head">
        <div onClick={toggleMenu}>
          {isMenuOpen ? (
            <GiCancel size={32} color="white" />
          ) : (
            <GiHamburgerMenu size={32} color="white"></GiHamburgerMenu>
          )}
        </div>
        <div onClick={goToSetting}>
          <FiSettings size={32} color="white" />
        </div>
      </header>
      <StyledSideMenu isOpen={isMenuOpen} onClick={toggleMenu}>
        <StyledMenuList>
          <UserContainer>
            <UserImage
              src={member.image || "http://via.placeholder.com/160"}
              alt="User"
            />
            <UserAndName>
              <span>{member.name}</span>
              <span>{member.email}</span>
            </UserAndName>
          </UserContainer>
          {[
            { icon: <FaHome />, label: "Home", to: "/home" },
            { icon: <FaClipboardList />, label: "Boards", to: "/Boards" },
            { icon: <FaRegNewspaper />, label: "News", to: "/News" },
            { icon: <CgProfile />, label: "Members", to: "/Members" },
            { icon: <BiCameraMovie />, label: "Movies", to: "/Movies" },
            { icon: <LuListTodo />, label: "Chat", to: "/Chat" },
          ].map((item, index) => (
            <StyledMenuItem key={index}>
              <MenuIcon>{item.icon}</MenuIcon>
              <StyledLink to={item.to}>{item.label}</StyledLink>
            </StyledMenuItem>
          ))}
        </StyledMenuList>
      </StyledSideMenu>
      <main className="body">
        <Outlet />
      </main>
    </Container>
  );
};

export default Layout;
