import React, { Component, useState } from "react";

const ProfileIcon = () => {
  const [ color, setColor ] = useState("#fff");
  const [ flag, setFlag ] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setColor("#0B666A");
        setFlag(true);
      }}
      onMouseLeave={() => {
        setColor("#fff");
        setFlag(false);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-user"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke={color}
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>
    </div>
  );
};

export default ProfileIcon;
