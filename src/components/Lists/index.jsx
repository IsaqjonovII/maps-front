import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import DirectionsLink from "./../DirectionsLink";
import Stream from "./../../pages/Stream/index";
import { defaultLocation, keywords, libraries } from "../../utils";
import { AiOutlineClose } from "react-icons/ai";

const MapList = () => {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(defaultLocation);
  const [places, setPlaces] = useState([]);
  const [ourPlaces, setOurPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isCameraOpened, setIsCameraOpened] = useState(false);

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
    if (places.length && ourPlaces.length) {
      const filteredData = ourPlaces.filter(({ place_id }) =>
        places.some((place) => place.place_id === place_id)
      );
      setFilteredPlaces(filteredData);
    }
  }, [places, ourPlaces]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <div className="w-full h-auto max-h-[91.3vh] overflow-y-auto overflow-x-hidden p-16 py-12 max-lg:p-5">
      <div className="w-full h-full">
        {filteredPlaces.map(({ place_id }) => {
          const place = places.find((place) => place.place_id === place_id);
          const ourPlace = ourPlaces.find(
            (ourPlace) => ourPlace.place_id === place_id
          );

          if (place && ourPlace) {
            return (
              <div
                key={place_id}
                className="w-full px-4 py-4 rounded-lg my-3 border border-slate-200 transition cursor-pointer hover:bg-slate-200"
              >
                <div className="flex items-center justify-between text-slate-700 mb-3">
                  <div className="text-2xl">{place.name}</div>
                  <div className="text-green-400 font-bold text-xl">
                    {ourPlace.fuel_price} so'm
                  </div>
                </div>
                <div>
                  <div className="text-md text-slate-700">
                    Working hours:{" "}
                    <b className="font-bold text-green-400 ml-4">
                      {ourPlace.working_hours}
                    </b>
                  </div>
                  <div
                    className={
                      ourPlace.isOpenNow === "true"
                        ? "my-3 text-white py-1 px-2 bg-green-400 font-bold max-w-[80px] grid place-items-center rounded-md"
                        : "text-white py-1 px-2 bg-red-600 font-bold max-w-[80px] grid place-items-center rounded-md"
                    }
                  >
                    {ourPlace.isOpenNow === "true" ? "Ochiq" : "Yopiq"}
                  </div>

                  <div className="flex items-center justify-between">
                    <DirectionsLink
                      source={location}
                      destination={place?.geometry.location}
                    />

                    <button
                      className="bg-green-400 py-2 px-4 rounded-md text-white font-bold"
                      onClick={() => setIsCameraOpened(true)}
                    >
                      Live Camera
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      {isCameraOpened && (
        <div
          className="w-full h-screen bg-[#00000071] absolute top-0 left-0"
          onClick={() => setIsCameraOpened(false)}
        >
          <div className="w-full max-w-3xl max-h-[600px] pt-0 pb-4 px-2 absolute inset-0 m-auto bg-slate-300 grid place-items-center rounded max-md:max-w-[80%]">
            <Stream />

            <button className="bg-red-600 text-white text-3xl rounded-md absolute top-[-10px] right-[-10px] w-full max-w-[50px] h-[50px] grid place-items-center">
              <AiOutlineClose />{" "}
            </button>
          </div>
        </div>
      )}

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
