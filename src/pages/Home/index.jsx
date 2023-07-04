import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import {
  defaultLocation,
  keywords,
  mapContainerStyle,
  libraries,
} from "../../utils";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";

function Home() {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(defaultLocation);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setselectedPlace] = useState(null);
  const [ourplaceSelected, setOurplaceSelected] = useState(null);
  const [selectedPlaceID, setSelectedPlaceID] = useState(null);
  const [ourPlaces, setOurPlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          radius: 10000,
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

  const handleSelectedPlace = (place) => {
    if (selectedPlaceID !== place.place_id) {
      setSelectedPlaceID(place.place_id);
    }
    setIsModalOpen(true);
    setselectedPlace(place);
  };
  useEffect(() => {
    const filteredPlace = ourPlaces.filter(
      ({ place }) => place.place_id === selectedPlaceID
    );
    setOurplaceSelected(filteredPlace[0]);
  }, [selectedPlaceID, ourPlaces]);

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
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // distance in meters
    return d;
  };

  const getNearestGasStation = () => {
    let nearestDistance = Number.MAX_VALUE;
    let nearestGasStation = null;
    places.forEach((place) => {
      const distance = getDistance(
        location.lat,
        location.lng,
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestGasStation = place;
      }
    });
    return nearestGasStation;
  };

  console.log(ourPlaces);

  const gasStationIconSize = (place) => {
    const nearestGasStation = getNearestGasStation();
    if (nearestGasStation && place.place_id === nearestGasStation.place_id) {
      return {
        scaledSize: new window.google.maps.Size(55, 65),
        url: "https://static-00.iconduck.com/assets.00/gas-pump-icon-256x256-c5hynkio.png",
      };
    } else {
      return {
        scaledSize: new window.google.maps.Size(35, 45),
        url: "https://cdn-icons-png.flaticon.com/512/1723/1723649.png",
      };
    }
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDv4FQS283krRshMGSnRX0Z_tKlXPwEacw",
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="w-full relative h-[90vh]">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={11.5}
        onLoad={(map) => setMap(map)}
      >
        {places &&
          places.map((place) => (
            <div
              className="flex justify-between text-green-600"
              key={place.place_id}
            >
              <Marker
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }}
                icon={gasStationIconSize(place)}
                onClick={() => handleSelectedPlace(place)}
              />
              <p>{place.name}</p>
            </div>
          ))}

        <Modal
          title={selectedPlace?.name}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          ourPlace={ourplaceSelected}
          selectedPlace={selectedPlace}
          location={location}
        />
      </GoogleMap>
    </div>
  );
}

export default Home;
