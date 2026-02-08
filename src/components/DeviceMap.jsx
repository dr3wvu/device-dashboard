import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { useEffect } from "react";
import { SIGNAL_MAP, getSignalCategory } from "../constants/device";

function HeatmapLayer({ devices }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !devices.length) return;

    const points = devices.map((d) => {
      const val = parseInt(d.signalStrength);
      let intensity = 0.2;
      if (val >= -70) intensity = 1.0;
      else if (val >= -85) intensity = 0.7;
      else if (val >= -100) intensity = 0.4;

      return [d.location.lat, d.location.lng, intensity];
    });
    const heatLayer = L.heatLayer(points, {
      radius: 30,
      blur: 20,
      maxZoom: 10,
      gradient: {
        0.2: SIGNAL_MAP["No Signal"].color,
        0.4: SIGNAL_MAP["Bad"].color,
        0.6: SIGNAL_MAP["Average"].color,
        1.0: SIGNAL_MAP["Good"].color,
      },
    }).addTo(map);

    return () => map.removeLayer(heatLayer);
  }, [map, devices]);

  return null;
}
export default function DeviceMap({ devices = [] }) {
  const validDevices = devices.filter((d) => d && d.location);
  const center =
    validDevices.length > 0
      ? [validDevices[0].location.lat, validDevices[0].location.lng]
      : [39.82, -98.57];

  return (
    <div className="map-boundary-wrapper card">
      <div className="map-stats-overlay">
        <span>
          Showing <b>{validDevices.length}</b> active devices
        </span>
      </div>
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatmapLayer devices={validDevices} />

        {validDevices.map((device) => (
          <CircleMarker
            key={device.id}
            center={[device.location.lat, device.location.lng]}
            pathOptions={{
              fillColor: "#3b82f6",
              color: "#fff",
              weight: 1,
              fillOpacity: 1,
            }}
            radius={10}
          >
            <Popup>
              <div className="custom-map-popup">
                <div className="popup-header">{device.name}</div>
                <div className="popup-row">
                  <span className="popup-label">Signal</span>
                  <span
                    className="popup-value"
                    style={{
                      color:
                        SIGNAL_MAP[getSignalCategory(device.signalStrength)]
                          .color,
                    }}
                  >
                    {device.signalStrength} dBm
                  </span>
                </div>
                <div className="popup-row">
                  <span className="popup-label">Manufacturer</span>
                  <span className="popup-value">{device.manufacturer}</span>
                </div>
                <div className="popup-row">
                  <span className="popup-label">Last Active</span>
                  <span className="popup-value">
                    {new Date(device.lastActive).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
