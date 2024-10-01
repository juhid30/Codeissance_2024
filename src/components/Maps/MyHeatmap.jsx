import React from "react";
import {
  GoogleMap,
  HeatmapLayer,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  position: "relative",
  width: "100vw",
  height: "100vh",
};

// Center of the map
const center = {
  lat: 19.0596,
  lng: 72.8295,
};

// Heatmap data with names and literacy rates
const heatMapData = [
  { lat: 19.0525, lng: 72.8338, name: "Bandra Fort", literacyRate: "85%" },
  {
    lat: 19.0588,
    lng: 72.8346,
    name: "Mount Mary Church",
    literacyRate: "90%",
  },
  { lat: 19.0547, lng: 72.8262, name: "Bandra Bandstand", literacyRate: "87%" },
  { lat: 19.0602, lng: 72.8347, name: "Bandra Talao", literacyRate: "N/A" },
  {
    lat: 19.0588,
    lng: 72.8453,
    name: "Bandra Sports Complex",
    literacyRate: "N/A",
  },
  {
    lat: 19.0522,
    lng: 72.8365,
    name: "D Y Patil College",
    literacyRate: "N/A",
  },
];

const MyHeatmap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAqo1VPkhZxAQXaIgXuNDSMDY1pgUicgkA",
    libraries: ["visualization"],
  });

  const [map, setMap] = React.useState(null);
  const [hoveredMarker, setHoveredMarker] = React.useState(null);

  // Log when the map is loaded
  React.useEffect(() => {
    if (map) {
      console.log("Map Loaded:", map);
    }
  }, [map]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={(map) => setMap(map)}
    >
      {/* {map && ( */}
      <>
        {/* Render markers with hover event */}
        {heatMapData.map((data) => (
          <Marker
            key={`${data.lat}-${data.lng}`}
            position={{ lat: data.lat, lng: data.lng }}
            onClick={() => setHoveredMarker(data)} // Show info on hover
            // onMouseOut={() => setHoveredMarker(null)} // Hide info on mouse out
          />
        ))}
        {/* Render InfoWindow when a marker is hovered */}
        {hoveredMarker && (
          <InfoWindow
            position={{
              lat: hoveredMarker.lat,
              lng: hoveredMarker.lng,
            }}
            onCloseClick={() => setHoveredMarker(null)}
            options={{ pixelOffset: new window.google.maps.Size(0, -40) }} // Adjusts the position of the InfoWindow
          >
            <div
              style={{
                width: "250px", // Set desired width
                height: "auto", // Adjust height automatically based on content
                color: "#4CAF50",
                fontWeight: "bold",
                padding: "10px",
                backgroundColor: "#e8f5e9",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.3)", // Optional: Adds shadow for better visibility
              }}
            >
              <h3 style={{ margin: "0", color: "#4CAF50" }}>
                {hoveredMarker.name}
              </h3>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                NGO Work Map: <br />
                <span style={{ color: "#333", fontWeight: "normal" }}>
                  Work areas highlighted on the map
                </span>
              </p>
            </div>
          </InfoWindow>
        )}
      </>
      {/* )} */}
    </GoogleMap>
  ) : (
    <div>Loading Map...</div>
  );
};

export default MyHeatmap;
