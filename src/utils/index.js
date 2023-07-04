export const defaultLocation = {
  lat: 41.2994958,
  lng: 69.2400734,
};
export const mapContainerStyle = {
  width: "100%",
  height: "90vh",
};
export const libraries = ["places"];

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
  fetch("https://maps-backend-yu0n.onrender.com/api/v2/places/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    crossDomain: true,
    body: JSON.stringify({
      place: {
        place_id,
        name: "Benzin Zapravka",
        isOpenNow: true,
        working_hours: "08:00 - 23:00",
      },
      fuel: {
        fuel_types: [
          {
            id: "1",
            name: "AI 80",
            price: 5700,
            isAvailable: true,
          },
          {
            id: "2",
            name: "AI 90",
            price: 7600,
            isAvailable: true,
          },
          {
            id: "1",
            name: "AI 91",
            price: 8600,
            isAvailable: false,
          },
          {
            id: "1",
            name: "AI 95",
            price: 10600,
            isAvailable: true

          },

        ]
      },
      discount: "5%"
    }),
  }).then((res) => console.log(res));
};
