import React from 'react';
import './events.css'; // The new CSS file will be linked here
import events from '../../assets/data/eventsData.jsx'; // Correctly importing your data

const Events = () => {
    return (
        <section id="events" className="events-section">
            <div className="container">
                <header className="events-header">
                    <h2 className="events-heading">Our Events</h2>
                    <div className="neon-hr" />
                </header>

                <div className="events-grid">
                    {/* Mapping over the imported events data */}
                    {events.map((event, index) => (
                        <article className="event-card" key={index}>
                            {/* Container for the event image */}
                            <div className="card-image-container">
                                <img src={event.img} alt={event.title} className="card-image" />
                            </div>

                            {/* Container for the event text content */}
                            <div className="card-content">
                                <h3 className="card-title">{event.title}</h3>
                                <div className="card-meta">
                                    <span>🗓️ {event.date}</span>
                                    <span>🕙 {event.time}</span>
                                    <span>📍 {event.venue}</span>
                                </div>
                                <p className="card-description">{event.desc}</p>

                                {/* This will display the guidelines if they exist */}
                                {event.guidelines && (
                                    <div className="card-guidelines">{event.guidelines}</div>
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