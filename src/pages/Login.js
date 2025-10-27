import styled from "styled-components";
import React, { useState } from "react";

const CountStyle = styled.section`
  background-color: #eef1f6;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoginCount = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 60%;
  max-width: 600px;
  height: auto;
  padding: 40px 20px;
  border-radius: 30px;
  border: 1px solid #e2dded;
  box-shadow: 1px 1px 3px 2px #c5c4c7;
  background-color: white;

  @media (max-width: 768px) {
    width: 90%;
    padding: 30px 15px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
    padding: 25px 10px;
  }
`;

const InpStyle = styled.input`
  text-align: center;
  border: 1px solid #b8a4ed;
  height: 50px;
  width: 80%;
  border-radius: 20px;
  font-size: 18px;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 5px rgba(108, 99, 255, 0.5);
  }

  @media (max-width: 768px) {
    width: 90%;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    height: 45px;
  }
`;

const BtnStyle = styled.button`
  background-color: #50d8d7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: none;
  width: 70%;
  height: 50px;
  font-size: 20px;
  color: white;
  border-radius: 30px;
  transition: all 0.4s;

  &:hover {
    background-color: white;
    color: #50d8d7;
    border: solid 1px #50d8d7;
    box-shadow: 1px 1px 10px 1px;
  }

  @media (max-width: 768px) {
    width: 85%;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 95%;
    font-size: 16px;
    height: 45px;
  }
`;
const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;


const WarningStyle = styled.h3`
  color: red;
  font-size: 16px;
  margin: 0;
  word-wrap: break-word;
  text-align: center;
  padding: 0 10px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const SuccessStyle = styled.h3`
  color: green;
  font-size: 16px;
  margin: 0;
  word-wrap: break-word;
  text-align: center;
  padding: 0 10px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;



function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState(0);
  const [usererr, setUserErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [telErr, setTelErr] = useState("");

  const usernameRegex = /^[a-z0-9_-]{3,15}$/;
  const emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const telRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandeler = (e) => {
    setPassword(e.target.value);
  };

  const telHandeler = (e) => {
    setTel(e.target.value);
  };

  const clickHandler = (e) => {
    e.preventDefault();

    const RegexTests = () => {
      if (!usernameRegex.test(username)) {
        setUserErr(
          "نام کاربری باید ۳ تا ۱۵ کاراکتر، شامل حروف کوچک، عدد، _ یا - باشد"
        );
      } else {
        setUserErr("درسته ✅");
      }
      if (!emailRegex.test(email)) {
        setEmailErr("!ایمیل نامعتبر");
      } else {
        setEmailErr("درسته ✅");
      }
      if (!passwordRegex.test(password)) {
        setPasswordErr("پسورد قوی تری انتخاب کنید");
      } else {
        setPasswordErr("درسته ✅");
      }
      if (!telRegex.test(tel)) {
        setTelErr("شماره تلفن نامعتبر است");
      } else {
        setTelErr("درسته ✅");
      }
    };
    RegexTests();
  };

  if (
    emailErr === "درسته ✅" &&
    usererr === "درسته ✅" &&
    passwordErr === "درسته ✅" &&
    telErr === "درسته ✅"
  ) {
    localStorage.setItem("loggined", true);
    window.location.href = "/";
  }

  return (
    <>
      <CountStyle>
        <LoginCount>
          <Title>فرم ساخت اکانت</Title>

          <InpStyle
            placeholder="ایمیلتون رو وارد کنید"
            type="email"
            onChange={emailHandler}
          />
          {emailErr === "درسته ✅" ? (
            <SuccessStyle>{emailErr}</SuccessStyle>
          ) : (
            <WarningStyle>{emailErr}</WarningStyle>
          )}

          <InpStyle
            placeholder="یک نام کاربری انتخاب کنید"
            type="text"
            onChange={usernameHandler}
          />
          {usererr === "درسته ✅" ? (
            <SuccessStyle>{usererr}</SuccessStyle>
          ) : (
            <WarningStyle>{usererr}</WarningStyle>
          )}

          <InpStyle
            placeholder="رمز عبور خودتون رو انتخاب کنید"
            type="password"
            onChange={passwordHandeler}
          />
          {passwordErr === "درسته ✅" ? (
            <SuccessStyle>{passwordErr}</SuccessStyle>
          ) : (
            <WarningStyle>{passwordErr}</WarningStyle>
          )}
          <InpStyle
            placeholder="شماره تلفن خودتون رو وارد کنید"
            type="tel"
            onChange={telHandeler}
          />
          {telErr === "درسته ✅" ? (
            <SuccessStyle>{telErr}</SuccessStyle>
          ) : (
            <WarningStyle>{telErr}</WarningStyle>
          )}

          <BtnStyle type="submit" onClick={clickHandler}>
            ثبت نام
          </BtnStyle>
        </LoginCount>
      </CountStyle>
    </>
  );
}

export default Login;