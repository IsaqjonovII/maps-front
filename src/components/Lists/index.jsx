import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import {
  defaultLocation,
  keywords,
  mapContainerStyle,
  libraries,
} from "../../utils";

const MapList = () => {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(defaultLocation);
  const [places, setPlaces] = useState([]);
  const [ourPlaces, setOurPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (map) {
      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: location,
          radius: 5000,
          types: ["gas_station"],
          keywords: keywords,
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPlaces(results);
          }
        }
      );
    }
  }, [map, location]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDv4FQS283krRshMGSnRX0Z_tKlXPwEacw",
    libraries,
  });
  useEffect(() => {
    fetch("https://maps-backend-yu0n.onrender.com/api/v2/places", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setOurPlaces(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Serverda Xatolik");
      });
  }, []);

  useEffect(() => {
    const filteredData = ourPlaces.filter(({ place_id }) =>
      places.map((p) => p.place_id).includes(place_id)
    );
    setFilteredPlaces(filteredData);
  }, []);

  console.log(places);
  console.log(
    ourPlaces.filter((our_place) => {
      return places.some((place) => {
        return place.place_id === our_place.place_id;
      });
    })
  );

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <div className="w-full h-auto max-h-[91.3vh] overflow-y-auto overflow-x-hidden p-16 py-12 bg-green-400">
      <div className="w-full h-full bg-slate-300"></div>
      <GoogleMap
        mapContainerStyle={{
          display: "none",
        }}
        center={location}
        zoom={12.5}
        onLoad={(map) => setMap(map)}
      />
    </div>
  );
};

export default MapList;
