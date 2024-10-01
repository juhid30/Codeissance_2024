import React, { useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  StreetViewPanorama,
  HeatmapLayer,
} from "@react-google-maps/api";

const MyHeatmap = () => {
  const mapRef = useRef();

  const heatmapData = [
    { location: new window.google.maps.LatLng(37.782, -122.447), weight: 1 },
    { location: new window.google.maps.LatLng(37.782, -122.445), weight: 2 },
    { location: new window.google.maps.LatLng(37.782, -122.443), weight: 3 },
    { location: new window.google.maps.LatLng(37.782, -122.441), weight: 4 },
    // Add more data points as needed
  ];

  const mapContainerStyle = {
    height: "100vh",
    width: "100%",
  };

  const options = {
    streetView: {
      position: { lat: 37.782, lng: -122.447 },
      pov: { heading: 165, pitch: 0 },
      visible: true,
    },
    heatmap: {
      radius: 20,
      opacity: 0.6,
    },
  };

  useEffect(() => {
    if (mapRef.current) {
      const heatmapLayer = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: mapRef.current,
      });
      heatmapLayer.setMap(mapRef.current);
    }
  }, [mapRef]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAqo1VPkhZxAQXaIgXuNDSMDY1pgUicgkA"
      libraries={["visualization"]}
    >
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={{ lat: 37.782, lng: -122.447 }}
      >
        <StreetViewPanorama
          position={{ lat: 37.782, lng: -122.447 }}
          visible={true}
        />
        <HeatmapLayer
          data={heatmapData}
          options={{
            radius: 20,
            opacity: 0.6,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyHeatmap;
