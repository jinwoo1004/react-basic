import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import OvilleImage from "../../images/OVille.png";
import { useNavigate } from "react-router-dom";
// image를 public폴더에 두면 import 안해도 되는데 src 폴더에 있어서 import 해야됨

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

const Login = () => {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value.trim());
    e.target.value.trim().length >= 5 ? setIsEmail(true) : setIsEmail(false);
  };
  const onChangePw = (e) => {
    setInputPw(e.target.value.trim());
    e.target.value.trim().length >= 5 ? setIsPw(true) : setIsPw(false);
  };

  return (
    <Container>
      <StyledImg src={OvilleImage} alt={"이미지 없음"} />
      <h1>로그인</h1>
      <StyledTextField
        label="E-mail"
        variant="outlined"
        onChange={onChangeEmail}
      />
      <StyledTextField
        label="Password"
        variant="outlined"
        type="password"
        onChange={onChangePw}
      />
      <StyledButton
        variant="contained"
        color="primary"
        disabled={!(isEmail && isPw)}
        onClick={() => navigate("/")}
      >
        Login
      </StyledButton>
    </Container>
  );
};

export default Login;
