import React from "react";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import TicketButton from "../button/TicketButton";
import "./events.css";
import events from "../../assets/data/eventsData.jsx";

const Events = () => {
    return (
        <section id="events" className="events-section">
            <div className="container">
                <header className="events-header">
                    <h2 className="events-heading">Our Events</h2>
                    <div className="neon-hr" />
                </header>

                <div className="events-grid">
                    {events.map((event, idx) => (
                        <article className="event-card" key={idx}>
                            <div className="card-image-container">
                                <img
                                    src={event.img}
                                    alt={event.title}
                                    className="card-image"
                                />
                            </div>

                            <div className="card-content">
                                <h3 className="card-title">{event.title}</h3>

                                <div className="card-meta">
                                    <span className="meta-item">
                                        <FiCalendar className="meta-icon" /> {event.date}
                                    </span>
                                    <span className="meta-item">
                                        <FiClock className="meta-icon" /> {event.time}
                                    </span>
                                    <span className="meta-item">
                                        <FiMapPin className="meta-icon" /> {event.venue}
                                    </span>
                                </div>

                                <p className="card-description">{event.desc}</p>

                                {event.guidelines && (
                                    <div className="card-guidelines">{event.guidelines}</div>
                                )}

                                {event.link && (
                                    <div className="register-wrapper">
                                        <a
                                            href={event.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <TicketButton
                                                text="Register Now"
                                                // you can pass style props or className as required
                                                style={{ width: "240px", height: "48px", fontSize: "14px" }}
                                            />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
