import React, { useEffect, useState, useRef } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export default function Home() {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    userId: "",
  });
  const [calleeId, setCalleeId] = useState("");
  const zeroCloudInstance = useRef(null);

  async function init() {
    const userId = randomID(5);
    const userName = "user_" + userId;
    setUserInfo({
      userName,
      userId,
    });
  }

  function handleSend(callType) {
    const appID = parseInt(import.meta.env.VITE_appID);
    const serverSecret = import.meta.env.VITE_serverSecret;

    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      userInfo.userId,
      userInfo.userName
    );

    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
    // add plugin
    zeroCloudInstance.current.addPlugins({ ZIM });
    const callee = calleeId;
    if (!callee) {
      alert("userID cannot be empty!!");
      return;
    }

    // send call invitation
    zeroCloudInstance.current
      .sendCallInvitation({
        callees: [{ userID: callee, userName: "user_" + callee }],
        callType: callType,
        timeout: 60,
      })
      .then((res) => {
        console.warn(res);
        if (res.errorInvitees.length) {
          alert("The user dose not exist or is offline.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="container">
      <div className="title">
        <h2>
          Username: <span>{userInfo.userName}</span>
        </h2>
        <h2>
          UserID: <span>{userInfo.userId}</span>
        </h2>
      </div>
      <div className="input-field">
        <input
          type="text"
          is="userId"
          placeholder="callee's userID"
          onChange={(event) => {
            setCalleeId(event.target.value);
          }}
          spellCheck="false"
        />
        <label>Enter Callee UserID</label>
      </div>
      <div className="btns">
        <button
          onClick={() => {
            handleSend(ZegoUIKitPrebuilt.InvitationTypeVoiceCall);
          }}
        >
          Voice call
        </button>
        <button
          onClick={() => {
            handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
          }}
        >
          Video call
        </button>
      </div>
    </div>
  );
}
