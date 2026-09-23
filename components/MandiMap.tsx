"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom Leaflet DivIcons for colored pins without external assets
function createColoredPin(color: string, label: string) {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);">
        <div style="background:#0f172a;color:#fff;font-size:10px;font-weight:800;padding:2px 6px;border-radius:6px;border:1px solid #334155;white-space:nowrap;margin-bottom:2px;">
          ${label}
        </div>
        <div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid #ffffff;box-shadow:0 0 10px ${color};"></div>
      </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
}

interface MandiPin {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  net: number;
  distance: string;
  rank: number;
}

export default function MandiMap({
  mandis,
  onSelectMandi,
}: {
  mandis: MandiPin[];
  onSelectMandi: (mandi: MandiPin) => void;
}) {
  const [farmerPos] = useState<[number, number]>([21.1458, 79.0882]);

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-3xl border border-black/5 shadow-soft">
      <MapContainer
        center={farmerPos}
        zoom={8}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Farmer Position Pin */}
        <Marker position={farmerPos} icon={createColoredPin("#0284c7", "YOU")}>
          <Popup>
            <div className="p-1 text-xs">
              <b>Your Farm Location</b>
              <p className="text-slate-500">Nagpur Pickup Point</p>
            </div>
          </Popup>
        </Marker>

        {/* Nearby Mandi Markers */}
        {mandis.map((m) => {
          const color =
            m.rank === 1 ? "#16a34a" : m.rank === 2 ? "#f59e0b" : "#ef4444";
          return (
            <Marker
              key={m.id || m.name}
              position={[m.latitude, m.longitude]}
              icon={createColoredPin(color, `₹${m.net}/q`)}
              eventHandlers={{
                click: () => onSelectMandi(m),
              }}
            >
              <Popup>
                <div className="p-1 text-xs">
                  <b className="text-sm">{m.name}</b>
                  <p className="text-slate-500">{m.distance} away</p>
                  <b className="text-krishiq-700">
                    Net: ₹{m.net.toLocaleString()}/q
                  </b>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}