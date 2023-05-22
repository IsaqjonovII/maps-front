import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { defaultLocation, keywords } from "../../utils";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "90vh",
};

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

  const handleSelectedPlace = (place) => {
    if (selectedPlaceID !== place.place_id) {
      setSelectedPlaceID(place.place_id);
    }
    setIsModalOpen(true);
    setselectedPlace(place);
  };

  useEffect(() => {
    const filteredPlace = ourPlaces.filter(
      (p) => p.place_id === selectedPlaceID
    );
    setOurplaceSelected(filteredPlace[0]);
  }, [selectedPlaceID, ourPlaces]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v2/places", {
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

  const gasStationIconSize = (place) => {
    const nearestGasStation = getNearestGasStation();
    if (nearestGasStation && place.place_id === nearestGasStation.place_id) {
      return {
        scaledSize: new window.google.maps.Size(50, 55),
        url: "https://cdn4.iconfinder.com/data/icons/map-pins-2/256/2-512.png",
      };
    } else {
      return {
        scaledSize: new window.google.maps.Size(30, 35),
        url: "https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_outline_v4-2-medium.png,assets/icons/poi/tactile/pinlet_v4-2-medium.png,assets/icons/poi/quantum/pinlet/gas_pinlet-2-medium.png&highlight=c5221f,ea4335,ffffff?scale=1",
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
        zoom={12.5}
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
