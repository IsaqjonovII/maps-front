export const defaultLocation = {
  lat: 41.2994958,
  lng: 69.2400734,
};
export const keywords = [
  "gas station",
  "petrol station",
  "fuel station",
  "service station",
  "gas pump",
  "petrol pump",
  "fuel pump",
  "gasoline station",
  "petrol garage",
  "fuel garage",
  "Автозаправка",
  "Бензоколонка",
  "Бензозаправочная станция",
  "АЗС",
  "Топливная станция",
  "Benzin tekislik",
  "Benzin kolonka",
  "Benzin to`ldirish stantsiyasi",
  "Yakit stansiyasi",
];
export const addPlace = async (place_id) => {
  fetch("https://maps-backend-yu0n.onrender.com/api/v2/places", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    crossDomain: true,
    body: JSON.stringify({
      place_id,
      fuel_price: "2600",
      isOpenNow: true,
      working_hours: "24/7",
    }),
  }).then((res) => console.log(res));
};
