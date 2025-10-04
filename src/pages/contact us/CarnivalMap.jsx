// src/components/CarnivalMap.jsx
import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
// NOTE: Ensure leaflet is installed (npm install leaflet @types/leaflet)

const CarnivalMap = () => {
    useEffect(() => {
        // Dynamic import of leaflet to ensure it only runs client-side
        import('leaflet').then(L => {
            const map = L.map('map').setView([21.250069986297927, 81.60633843652607], 17);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            L.marker([21.250069986297927, 81.60633843652607])
              .addTo(map)
              .bindPopup('CCC NIT Raipur')
              .openPopup();
        }).catch(err => console.error("Failed to load Leaflet:", err));
        
    }, []);

    // The map container must have a defined height, usually done in CSS/Tailwind
    return (
        <div 
            id="map" 
            className="w-full min-h-[420px] rounded-xl overflow-hidden shadow-2xl shadow-orange-700/30"
            style={{ minWidth: '400px', maxWidth: '500px' }} // Fixed map container size for desktop
        ></div>
    );
};

export default CarnivalMap;