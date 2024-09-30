import React from "react";
import {
  GoogleMap,
  HeatmapLayer,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  position: "relative", // Fixed the typo from "positon"
  width: "400px",
  height: "400px",
};

const center = {
  lat: 19.0596,
  lng: 72.8295,
};

const heatMapData = [
  { lat: 19.0525, lng: 72.8338 }, // Bandra Fort
  { lat: 19.0588, lng: 72.8346 }, // Mount Mary Church
  { lat: 19.0547, lng: 72.8262 }, // Bandra Bandstand
  { lat: 18.9219, lng: 72.8347 }, // Chhatrapati Shivaji Maharaj Vastu Sangrahalaya
  { lat: 19.2206, lng: 72.8725 }, // Sanjay Gandhi National Park
];

const MapTest = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAqo1VPkhZxAQXaIgXuNDSMDY1pgUicgkA",
    libraries: ["visualization"],
  });
  const [map, setMap] = React.useState(null);

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
      zoom={10}
      onLoad={(map) => setMap(map)}
    >
      {/* {map && ( */}
      <>
        <HeatmapLayer
          data={heatMapData.map((data) => {
            const latLng = new window.google.maps.LatLng(data.lat, data.lng);
            console.log("LatLng:", latLng); // Log LatLng data
            return latLng; // Return the LatLng object
          })}
          options={{ radius: 100 }}
        />
        {/* Example of a marker (you can add more markers as needed) */}
        <Marker position={center} />
      </>
      {/* )} */}
    </GoogleMap>
  ) : (
    <div>Loading Map...</div> // Optional loading message
  );
};

export default MapTest;
