import React, { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import BackgroundMedia from "../components/background/Background";
import SparkleLayer from "../components/overlays/SparkleLayer";
import Fireworks from "../components/overlays/Fireworks";
import bgImage from "../assets/images/bg-part2.jpg";

// Fix leaflet marker icons for Vite/Rollup
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // EmailJS configuration
    const serviceId = "service_vd2r5gp";
    const templateId = "template_ebprf0z"; 
    const publicKey = "muZX9OwYinoY4h80T";

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          mobile: formData.contact,
          email: formData.email,
          message: formData.message,
          
        },
        publicKey
      );

      console.log("Email sent successfully:", result);

      // Show success message
      Swal.fire({
        title: "Thank You!",
        text: "Your message has been sent successfully!",
        icon: "success",
        customClass: {
          title: "swal-title-custom",
          popup: "swal-popup-custom",
          confirmButton: "swal-button-orange",
        },
      });

      // Reset form
      setFormData({
        name: "",
        contact: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      Swal.fire({
        title: "Oops!",
        text: "Failed to send message. Please try again.",
        icon: "error",
        customClass: {
          title: "swal-title-custom",
          popup: "swal-popup-custom",
          confirmButton: "swal-button-orange",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Background + Overlays */}
      <BackgroundMedia
        imageSrc={bgImage}
        darken={0.4}
        className="fixed inset-0 z-0"
      />
      <SparkleLayer className="fixed inset-0 z-10 pointer-events-none" />
      <Fireworks className="fixed inset-0 z-20" />

      {/* Navbar */}
      <div className="relative z-30">
        <Navbar/>

        {/* Page Header */}
        <h1
          className="text-center text-5xl md:text-6xl font-rye drop-shadow-[0_0_14px_rgba(251,146,60,0.95)] mt-32 mb-12"
          style={{ color: "#F3A83A" }}
        >
          📞 HAVE SOME QUESTIONS?
        </h1>

        {/* Main Container */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-10 px-6 md:px-20 mb-20">
          {/* Contact Form */}
          <div className="md:w-1/2">
            <div
              className="relative rounded-2xl p-8 shadow-2xl overflow-hidden backdrop-blur-xl"
              style={{
                border: "2px solid rgba(212, 149, 51, 0.8)", // golden-ish border
                background: "rgba(255, 255, 255, 0.05)", // subtle overlay for blur
              }}
            >
              <h2 className="text-3xl font-rye font-semibold text-center mb-6 text-white">
                CONTACT US
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 font-rye text-white text-xl">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full font-rye text-md p-3 rounded-md bg-white placeholder-yellow-600"
                    style={{color:"#B97E2C"}}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-white font-semibold">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Enter your Phone Number"
                    required
className="w-full font-rye text-md p-3 rounded-md bg-white placeholder-yellow-600"
                    style={{color:"#B97E2C"}}                  />
                </div>

                <div>
                  <label className="block mb-2 text-white font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                    required
className="w-full font-rye text-md p-3 rounded-md bg-white placeholder-yellow-600"
                    style={{color:"#B97E2C"}}                  />
                </div>

                <div>
                  <label className="block mb-2 text-white font-semibold">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    required
className="w-full font-rye text-md p-3 rounded-md bg-white placeholder-yellow-600"
                    style={{color:"#B97E2C"}}                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 text-white font-rye font-semibold text-xl py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#D89533" }}
                >
                  {isLoading ? "SENDING..." : "SUBMIT"}
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="md:w-1/2 h-[610px] rounded-2xl overflow-hidden shadow-2xl">
            <MapContainer
              key="map"
              center={[21.25007, 81.60634]}
              zoom={17}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[21.25007, 81.60634]}>
                <Popup>CCC NIT Raipur</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
