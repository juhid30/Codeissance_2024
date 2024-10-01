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
  width: "400px",
  height: "400px",
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
  {
    lat: 18.9219,
    lng: 72.8347,
    name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
    literacyRate: "88%",
  },
  {
    lat: 19.2206,
    lng: 72.8725,
    name: "Sanjay Gandhi National Park",
    literacyRate: "82%",
  },
];

const MapTest = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAqo1VPkhZxAQXaIgXuNDSMDY1pgUicgkA",
    libraries: ["visualization"],
  });

  const [map, setMap] = React.useState(null);
  const [infoWindow, setInfoWindow] = React.useState({
    isOpen: false,
    position: null,
    name: "",
    literacyRate: "",
  });

  // Log when the map is loaded
  React.useEffect(() => {
    if (map) {
      console.log("Map Loaded:", map);
    }
  }, [map]);

  // Handler for opening the info window
  const handleMarkerClick = (event, name, literacyRate) => {
    setInfoWindow({
      isOpen: true,
      position: event.latLng,
      name,
      literacyRate,
    });
  };

  // Handler for closing the info window
  const handleCloseClick = () => {
    setInfoWindow({
      isOpen: false,
      position: null,
      name: "",
      literacyRate: "",
    });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={(map) => setMap(map)}
    >
      <>
        <HeatmapLayer
          data={heatMapData.map((data) => {
            const latLng = new window.google.maps.LatLng(data.lat, data.lng);
            return latLng;
          })}
          options={{ radius: 100 }}
        />
        {/* Render markers and attach click event */}
        {heatMapData.map((data) => (
          <Marker
            key={`${data.lat}-${data.lng}`}
            position={{ lat: data.lat, lng: data.lng }}
            onClick={(event) =>
              handleMarkerClick(event, data.name, data.literacyRate)
            }
          />
        ))}
        {/* Render InfoWindow when it's open */}
        {infoWindow.isOpen && (
          <InfoWindow
            position={infoWindow.position}
            onCloseClick={handleCloseClick}
          >
            <div
              style={{
                color: "#4CAF50",
                fontWeight: "bold",
                padding: "10px",
                backgroundColor: "#e8f5e9",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ margin: "0", color: "#4CAF50" }}>
                {infoWindow.name}
              </h3>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                Literacy Rate:{" "}
                <span style={{ color: "#333", fontWeight: "normal" }}>
                  {infoWindow.literacyRate}
                </span>
              </p>
            </div>
          </InfoWindow>
        )}
      </>
    </GoogleMap>
  ) : (
    <div>Loading Map...</div>
  );
};

export default MapTest;
