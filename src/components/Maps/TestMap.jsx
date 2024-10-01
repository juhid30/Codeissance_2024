import React from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  HeatmapLayer,
} from "@react-google-maps/api";

const containerStyle = {
  position: "relative",
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 19.0596,
  lng: 72.8295,
};

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

const TestMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAqo1VPkhZxAQXaIgXuNDSMDY1pgUicgkA",
    libraries: ["visualization"],
  });

  const [map, setMap] = React.useState(null);
  const [hoveredMarker, setHoveredMarker] = React.useState(null);

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
      <>
        {heatMapData.map((data) => (
          <Marker
            key={`${data.lat}-${data.lng}`}
            position={{ lat: data.lat, lng: data.lng }}
            onMouseOver={() => setHoveredMarker(data)} // Show popup on hover
            onMouseOut={() => setHoveredMarker(null)} // Hide popup on mouse out
          />
        ))}

        {/* Render a custom popup when a marker is hovered */}
        {hoveredMarker && (
          <div
            style={{
              position: "absolute",
              background: "#fff",
              padding: "10px",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              top: `${
                map
                  .getProjection()
                  .fromLatLngToPoint(
                    new window.google.maps.LatLng(
                      hoveredMarker.lat,
                      hoveredMarker.lng
                    )
                  ).y
              }px`,
              left: `${
                map
                  .getProjection()
                  .fromLatLngToPoint(
                    new window.google.maps.LatLng(
                      hoveredMarker.lat,
                      hoveredMarker.lng
                    )
                  ).x
              }px`,
              transform: "translate(-50%, -100%)", // Center the popup above the marker
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
        )}

        {/* Add heatmap layer */}
        <HeatmapLayer
          data={heatMapData.map(
            ({ lat, lng }) => new window.google.maps.LatLng(lat, lng)
          )}
          options={{
            radius: 20, // Minimum radius for the heatmap
          }}
        />
      </>
    </GoogleMap>
  ) : (
    <div>Loading Map...</div>
  );
};

export default TestMap;
