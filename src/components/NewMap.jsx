import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";

const NewMap = () => {
  // Example data points for the heatmap
  const dataPoints = [
    [19.076, 72.8777], // Mumbai
    [19.0634, 72.8488], // Bandra
    [19.0546, 72.8352], // Bandra
    [19.0449, 72.8445], // Bandra
    [19.0711, 72.8555], // Near Bandra
    // Add more points as needed
  ];

  return (
    <MapContainer
      center={[19.0634, 72.8488]}
      zoom={14}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer
        points={dataPoints}
        longitudeExtractor={(point) => point[1]}
        latitudeExtractor={(point) => point[0]}
        intensityExtractor={(point) => 1} // Optional: define intensity based on some logic
      />
    </MapContainer>
  );
};

export default NewMap;
