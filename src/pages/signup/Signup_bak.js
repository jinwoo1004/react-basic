import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import OvilleImage from "../../images/OVille.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 5vh;
`;
const StyledTextField = styled(TextField)`
  && {
    // && : 원래 material 스타일을 재정의하라는 뜻
    margin-top: 20px;
    width: 300px;
  }
`;
const StyledButton = styled(Button)`
  && {
    margin-top: 30px;
    width: 300px;
    font-size: 16px;
  }
`;
const StyledImg = styled.img`
  width: 20vh;
  margin-bottom: 2vh;
  cursor: pointer;
`;

const Signup = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    nickname: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));

    switch (name) {
      case "email":
        validEmail(value);
        break;
      case "password":
        validPassword(value);
        break;
      case "confirmPassword":
        validConfirmPassword(value);
        break;
      case "nickname":
        validNickname(value);
        break;
      default:
        break;
    }
  };

  const validEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsValid((prevValid) => ({
      ...prevValid,
      email: emailRegex.test(email),
    }));
  };
  const validPassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    setIsValid((prevValid) => ({
      ...prevValid,
      password: passwordRegex.test(password),
    }));
  };
  const validConfirmPassword = (confirmPassword) => {
    setIsValid((prevValid) => ({
      ...prevValid,
      confirmPassword: confirmPassword === userData.password,
    }));
  };
  const validNickname = (nickname) => {
    setIsValid((prevValid) => ({
      ...prevValid,
      nickname: nickname.length > 1,
    }));
  };

  return (
    <Container>
      <StyledImg src={OvilleImage} alt={"이미지 없음"} />
      <h1>회원가입</h1>
      <StyledTextField
        label="E-mail"
        name="email"
        variant="outlined"
        value={userData.email}
        onChange={handleInputChange}
        error={!isValid.email && userData.email.length > 0}
        helperText={
          !isValid.email && userData.email.length > 0
            ? "올바른 이메일 형식이 아닙니다."
            : ""
        }
      />
      <StyledTextField
        label="Password"
        name="password"
        variant="outlined"
        type="password"
        value={userData.password}
        onChange={handleInputChange}
        error={!isValid.password && userData.password.length > 0}
        helperText={
          !isValid.password && userData.password.length > 0
            ? "숫자+영문자 조합으로 8자리 이상 입력해주세요!"
            : ""
        }
      />
      <StyledTextField
        label="Password 확인"
        name="confirmPassword"
        variant="outlined"
        type="password"
        value={userData.confirmPassword}
        onChange={handleInputChange}
        error={!isValid.confirmPassword && userData.confirmPassword.length > 0}
        helperText={
          !isValid.confirmPassword && userData.confirmPassword.length > 0
            ? "비밀번호가 일치하지 않습니다."
            : ""
        }
      />
      <StyledTextField
        label="Nickname"
        name="nickname"
        variant="outlined"
        value={userData.nickname}
        onChange={handleInputChange}
        error={!isValid.nickname && userData.nickname.length > 0}
        helperText={
          !isValid.nickname && userData.nickname.length > 0
            ? "2글자 이상 입력해주세요."
            : ""
        }
      />
      <StyledButton
        variant="contained"
        color="primary"
        disabled={!Object.values(isValid).every((value) => value)}
        onClick={() => navigate("/")}
      >
        Sign Up
      </StyledButton>
    </Container>
  );
};

export default Signup;
