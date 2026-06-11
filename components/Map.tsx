"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { events } from "@/data/events";
import { useMapContext } from "@/context/MapContext";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const hotspots = [
  {
    name: "ราชมังคลากีฬาสถาน",
    lat: 13.754,
    lng: 100.622,
  },
  {
    name: "RCA",
    lat: 13.747,
    lng: 100.571,
  },
  {
    name: "Impact เมืองทอง",
    lat: 13.912,
    lng: 100.547,
  },
  {
    name: "อโศก",
    lat: 13.737,
    lng: 100.56,
  },
];

function FlyToLocation() {
  const map = useMap();

  const { selectedPosition } = useMapContext();

  useEffect(() => {
    if (!selectedPosition) return;

    map.flyTo(
      [selectedPosition.lat, selectedPosition.lng],
      15,
      {
        duration: 1.5,
      }
    );
  }, [selectedPosition, map]);

  return null;
}

export default function BangkokMap() {
  return (
    <MapContainer
      center={[13.7563, 100.5018]}
      zoom={11}
      scrollWheelZoom={true}
      style={{
        height: "650px",
        width: "100%",
        borderRadius: "16px",
      }}
    >
      <FlyToLocation />
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* {hotspots.map((spot) => (
        <Marker
          key={spot.name}
          position={[spot.lat, spot.lng]}
        >
          <Popup>
            <strong>{spot.name}</strong>
            <br />
            Hotspot Area
          </Popup>
        </Marker>
      ))} */}
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.lat, event.lng]}
        >
          <Popup>
            <div>
              <h3>{event.title}</h3>
              <p>{event.location}</p>
              <p>
                Crowd Score: {event.crowdScore}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}