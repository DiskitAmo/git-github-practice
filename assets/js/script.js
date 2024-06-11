var textWrapper = document.querySelector(".text_box .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

import React from "react";
import style from "./footer.module.css";
import Messages from "../messages/messages";
import { useEffect, useState, useRef } from "react";
export default function Footer() {
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const inputRef = useRef("");
  const [myObj, setMyObj] = useState([
    {
      text: [{ label: "bring it on", figure: "" }],
      id: "bot",
      date: `${date.getDate()} ${
        months[date.getMonth()]
      }, ${date.getFullYear()}`,
    },
  ]);
  const handleEnter = () => {
    setMyObj((previousMyObj) => {
      console.log("previous object value", previousMyObj);
      return [
        ...previousMyObj,
        {
          text: inputRef.current.value,
          id: "user",
          date: `${date.getDate()} ${
            months[date.getMonth()]
          }, ${date.getFullYear()}`,
        },
        {
          text: handleReply(inputRef.current.value),
          id: "bot",
          date: `${date.getDate()} ${
            months[date.getMonth()]
          }, ${date.getFullYear()}`,
        },
      ];
    });
    Timeout();
  };
  const handleClick = (e) => {
    e.preventDefault();
    setMyObj((previousMyObj) => [
      ...previousMyObj,
      {
        text: inputRef.current.value,
        id: "user",
        date: `${date.getDate()} ${
          months[date.getMonth()]
        }, ${date.getFullYear()}`,
      },
      {
        text: handleReply(inputRef.current.value),
        id: "bot",
        date: `${date.getDate()} ${
          months[date.getMonth()]
        }, ${date.getFullYear()}`,
      },
    ]);

    inputRef.current.value = "";

    Timeout();
  };
  const handleReply = (input) => {
    return result;
  };

  const timeoutId = useRef(1);
  function debouncing() {
    timeoutId.current = setTimeout(() => {
      setMyObj((previousMyObj) => [
        ...previousMyObj,
        {
          text: [{ label: "are you still there?", figure: "" }],
          id: "bot",
          date: `${date.getDate()} ${
            months[date.getMonth()]
          }, ${date.getFullYear()}`,
        },
      ]);
      console.log("the timeout that was the first timeout has run");
    }, 5000);
  }
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    debouncing();
  }, []);

  function Timeout() {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      console.log("the timeout that was cleared is", timeoutId.current);
    }
    console.log("the object that the timeout got is", myObj);
    timeoutId.current = setTimeout(() => {
      setMyObj((previousMyObj) => {
        console.log("this is the value of the previous object", previousMyObj);
        return [
          ...previousMyObj,
          {
            text: [{ label: "are you still there?", figure: "" }],
            id: "bot",
            date: `${date.getDate()} ${
              months[date.getMonth()]
            }, ${date.getFullYear()}`,
          },
        ];
      });
    }, 5000);
  }
  return (
    <>
      <Messages message={myObj} />
      <div className={style.footer}>
        <input
          type="text"
          name="inputtext"
          id="messageInput"
          ref={inputRef}
          placeholder="Enter the text here..."
          onKeyPress={(e) => {
            if (e.code == "Enter") {
              handleEnter();
            }
          }}
          onChange={() => {
            Timeout();
            console.log("value of the input ref", inputRef.current.value);
          }}
        />
        <button type="reset" onClick={handleClick}>
          Send
        </button>
      </div>
    </>
  );
}
