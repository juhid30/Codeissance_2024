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
  {
    lat: 19.0547,
    lng: 72.8262,
    name: "Bandra Bandstand",
    literacyRate: "87%",
  },
  {
    lat: 19.0602,
    lng: 72.8347,
    name: "Bandra Talao",
    literacyRate: "N/A",
  },
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

  {
    lat: 19.058,
    lng: 72.8267,
    name: "Bandra Fort",
    literacyRate: "N/A",
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
      zoom={14}
      onLoad={(map) => setMap(map)}
    >
      {map && (
        <>
          <HeatmapLayer
            data={heatMapData.map((data) => {
              const latLng = new window.google.maps.LatLng(data.lat, data.lng);
              return latLng;
            })}
            options={{ radius: 60 }}
          />
          {/* Render markers and attach click event */}
          {/* {heatMapData.map((data) => (
            <Marker
              key={`${data.lat}-${data.lng}`}
              position={{ lat: data.lat, lng: data.lng }}
              onClick={(event) =>
                handleMarkerClick(event, data.name, data.literacyRate)
              }
            />
          ))} */}
          {/* Render InfoWindow when it's open */}
          {/* {hoveredLocation && (
            <InfoWindow
              position={hoveredLocation.position}
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
                  {hoveredLocation.name}
                </h3>
              </div>
            </InfoWindow>
          )} */}
        </>
      )}
    </GoogleMap>
  ) : (
    <div>Loading Map...</div>
  );
};

export default MapTest;
