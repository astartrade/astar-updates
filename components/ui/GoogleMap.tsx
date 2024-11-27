"use client";
import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type Props = {};

export const GoogleMap = (props: Props) => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const locationInMap = {
        lat: 5.556906,
        lng: -0.172245,
      };

      const { Marker } = await loader.importLibrary("marker");

      const options = {
        center: locationInMap,
        zoom: 19,
        mapId: "NEXT_MAPS_TUTS",
      };

      const map = new Map(mapRef.current as HTMLDivElement, options);

      const marker = new Marker({
        map: map,
        position: locationInMap,
      });
    };

    initializeMap();
  }, []);

  return <div ref={mapRef} className="h-[600px]" />;
};
