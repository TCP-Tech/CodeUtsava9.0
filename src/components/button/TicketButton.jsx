import React from "react";
import myImage from "../../assets/images/ticket_button_final.png"; // replace with your image path

export default function TicketButton({ onClick, text, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundImage: `url(${myImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "none",
        borderRadius: "12px",
        width: "160px",    // default width
        height: "45px",    // default height
        color: "white",    // default color
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
        transition: "transform 0.3s, filter 0.3s",
        ...style,          // merge user-provided styles
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
