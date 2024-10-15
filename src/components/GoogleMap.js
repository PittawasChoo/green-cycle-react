import React from "react";
import { GoogleMap as GMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "300px",
};

const GoogleMap = ({ location }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    return isLoaded ? (
        <GMap mapContainerStyle={containerStyle} center={location} zoom={10}>
            <Marker position={location} />
        </GMap>
    ) : (
        <></>
    );
};

export default React.memo(GoogleMap);
