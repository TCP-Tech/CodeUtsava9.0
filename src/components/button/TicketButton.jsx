import React from "react";
import myImage from "../../assets/images/ticket_button_final.png";

export default function TicketButton({ onClick, text, style = {} }) {
  return (
    <button
      onClick={onClick}
      className="hidden lg:flex px-6 py-3" // visible only on large screens
      style={{
        backgroundImage: `url(${myImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.3s, filter 0.3s",
        fontFamily: "'Rye', cursive",
        fontSize: "16px",
        color: "#FFFFFF",
        // fontWeight: "",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.filter = "brightness(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.filter = "brightness(1)";
      }}
    >
      {text}
    </button>
  );
}
