import styled from "styled-components";
import * as XLSX from "xlsx";
import React, { useState } from "react";

const CountStyle = styled.section`
  height: 110vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    height: auto;
    padding: 10px;
  }
`;

const SendMessages = styled.div`
  height: 90%;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50px;
  box-shadow: 1px 1px 3px 3px gray;
  gap: 20px;
  padding: 20px;
  background-color: white;

  @media (max-width: 1024px) {
    width: 80%;
    height: auto;
  }

  @media (max-width: 480px) {
    width: 100%;
    border-radius: 20px;
    padding: 15px;
    gap: 15px;
  }
`;

const UserAddDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
  width: 90%;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
`;

const UserAddInp = styled.input`
  text-align: center;
  border: 1px solid #b8a4ed;
  height: 50px;
  width: 80%;
  border-radius: 20px 0 0 20px;
  font-size: 18px;
  outline: none;
  transition: all 0.3s;
  z-index: 0;

  &:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 5px rgba(108, 99, 255, 0.5);
  }

  @media (max-width: 480px) {
    width: 100%;
    border-radius: 20px;
  }
`;

const ButtonSend = styled.button`
  padding: 10px;
  border: 1px solid #b8a4ed;
  border-radius: 0 20px 20px 0;
  height: 50px;
  width: 20%;
  margin-left: -5px;
  z-index: 1;
  background-color: white;
  color: #343a40;
  transition: all 0.3s;

  &:hover {
    background-color: #6c63ff;
    color: white;
    border: 1px solid #6c63ff;
  }

  @media (max-width: 480px) {
    width: 100%;
    border-radius: 20px;
    margin-left: 0;
  }
`;

const UserNameListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 90%;
  border-radius: 20px;
  overflow-y: auto;
  padding: 8px;
  gap: 10px;

  @media (max-width: 480px) {
    height: 150px;
    width: 100%;
  }
`;

const UsernameSellStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  border: 1px solid gray;
  border-radius: 20px;
  background-color: white;
  padding: 10px;

  @media (max-width: 480px) {
    height: 40px;
    padding: 8px;
  }
`;

const SendMessage_ExleFile = styled.div`
  width: 90%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    width: 100%;
    gap: 15px;
  }
`;

const Message = styled.textarea`
  height: 100%;
  width: 60%;
  text-align: right;
  padding: 15px;
  direction: rtl;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid #b8a4ed;
  background-color: #f8f9fa;
  resize: none;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 8px rgba(108, 99, 255, 0.4);
    background-color: white;
  }

  &::placeholder {
    color: #aaa;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
  }
`;

const UploadLabel = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #6c63ff;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #554bd8;
  }

  @media (max-width: 768px) {
    height: 50px;
    width: 100%;
  }
`;

const SendMessage = styled.button`
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

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const TitleStyle = styled.h1`
  font-size: 40px;
  color: gray;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;
const DelUserName = styled.button`
  font-size: 20px;
  background-color: white;
  border: none;
  color: #ac4b55;
  transition: all 0.3s;

  &:hover {
    color: red;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

function PanelPage() {
  const [usernames, setUsernames] = useState([]);
  const [inpValue, setInpValue] = useState("");
  const [exlFile, setExlFile] = useState([]);
  const [message, setMessage] = useState("");

  const usernameRegex = /^@?[a-zA-Z0-9_]{5,32}$/;

  const safeMessageRegex = /^[\u0600-\u06FFa-zA-Z0-9\s.,?!،؛:\-()'"«»\n\r]+$/;

  const addUserHandeler = () => {
    const trimmedValue = inpValue.trim();

    if (!trimmedValue) {
      alert("لطفاً یک نام کاربری وارد کنید.");
      return;
    }

    if (!usernameRegex.test(trimmedValue)) {
      alert(
        "فرمت نام کاربری معتبر نیست. فقط حروف، عدد و _ مجازه (بین ۵ تا ۳۲ کاراکتر)."
      );
      return;
    }

    setUsernames([...usernames, trimmedValue]);
    setInpValue("");
  };

  const delBtnHandeler = (index) => {
    const newUsernames = usernames.filter((_, i) => i !== index);
    setUsernames(newUsernames);
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("فقط فایل‌های اکسل با پسوند .xls یا .xlsx مجاز هستند.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      setExlFile(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const sendMessageHandler = () => {
    if (!message.trim()) {
      alert("پیام نمی‌تواند خالی باشد.");
      return;
    }

    if (!safeMessageRegex.test(message)) {
      alert(
        "پیام شامل کاراکترهای غیرمجاز است. لطفا فقط از حروف فارسی و انگلیسی، اعداد و علائم نگارشی استفاده کنید."
      );
      return;
    }

    if (usernames.length === 0) {
      alert("لطفا حداقل یک نام کاربری وارد کنید.");
      return;
    }

    console.log("ارسال پیام به کاربران:", usernames);
    console.log("متن پیام:", message);
    console.log("داده‌های اکسل:", exlFile);

    alert("پیام با موفقیت ارسال شد!");

    setMessage("");
    setUsernames([]);
    setExlFile([]);
  };

  return (
    <>
      <CountStyle>
        <SendMessages>
          <TitleStyle>پنل ارسال پیام</TitleStyle>
          <UserAddDiv>
            <UserAddInp
              placeholder="نام کاربری مورد نظر رو وارد کنید"
              value={inpValue}
              onChange={(e) => setInpValue(e.target.value)}
            />
            <ButtonSend onClick={addUserHandeler}>افزودن</ButtonSend>
          </UserAddDiv>

          <UserNameListStyle>
            {usernames.map((e, index) => (
              <UsernameSellStyle key={index}>
                <h2>{e}</h2>
                <DelUserName onClick={() => delBtnHandeler(index)}>
                  حذف
                </DelUserName>
              </UsernameSellStyle>
            ))}
          </UserNameListStyle>

          <SendMessage_ExleFile>
            <Message
              placeholder="متن پیام رو وارد کنید"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <UploadLabel htmlFor="excel-upload">بارگذاری فایل اکسل</UploadLabel>
            <HiddenInput
              id="excel-upload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleExcelUpload}
            />
          </SendMessage_ExleFile>

          <SendMessage onClick={sendMessageHandler}>ارسال پیام</SendMessage>
        </SendMessages>
      </CountStyle>
    </>
  );
}

export default PanelPage;
