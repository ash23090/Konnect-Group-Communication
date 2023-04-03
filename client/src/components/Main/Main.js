import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import socket from "../../socket";

const Main = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    socket.on("FE-error-user-exist", ({ error }) => {
      if (!error) {
        const roomName = roomRef.current.value;
        const userName = userRef.current.value;

        sessionStorage.setItem("user", userName);
        props.history.push(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg("User name already exist");
      }
    });
  }, [props.history]);

  function clickJoin() {
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg("Enter Room Name or User Name");
    } else {
      socket.emit("BE-check-user", { roomId: roomName, userName });
    }
  }

  return (
    <>
      <header>
        <h1
          className='title'
          style={{ fontSize: "60px", marginBottom: "50px", color: "cream" }}
        >
          Konnect
        </h1>
        <h1
          className='headerText'
          style={{ fontSize: "40px", marginBottom: "40px" }}
        >
          Communicate without any hassle
        </h1>
      </header>
      <MainContainer>
        <Row>
          <Label htmlFor='roomName'>
            <h1>Room Name</h1>
          </Label>
          <Input type='text' id='roomName' ref={roomRef} />
        </Row>
        <Row>
          <Label htmlFor='userName'>
            <h1>User Name</h1>
          </Label>
          <Input type='text' id='userName' ref={userRef} />
        </Row>
        <JoinButton onClick={clickJoin}> Join </JoinButton>
        {err ? <Error>{errMsg}</Error> : null}
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 150px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;

  :focus {
    border: solid 3px #ffa260;
    transform: scale(1.1);
    box-shadow: 0 0.5em 0.5em -0.4em #ffa260;
  }
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;
// eslint-disable-next-line
const h = styled.h1`
  font-size: 500px;
  font-weight: bold;
`;
const JoinButton = styled.button`
 
  font-size: 10px;
  font-weight: 500; */
  }
  background:none;
  color: #ffa260;
  
  
  background-color: #000;
  border: solid 2px #ffa260;
  display: block;
  margin: auto;
  margin-top: 20%;
  border-radius: 0.5em;
  padding: 0.7em 2em;
  font-size: 2em;
  transition: all 0.05s;
  :hover {
    transform:scale(1.2);
    box-shadow: 0 0.5em 0.5em -0.4em #ffa260;
    cursor: pointer;
    color: white;
    border-color: #f1ff5c;
    transform: translateY(-0.25em);
  }
`;

export default Main;
