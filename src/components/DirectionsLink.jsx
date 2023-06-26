const DirectionsLink = ({ source, destination }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${
    source.lat
  },${
    source.lng
  }&destination=${destination?.lat()},${destination?.lng()}&travelmode=driving&zoom=15`;

  const yandexMapsUrl = `https://yandex.com/maps/?rtext=${source.lat},${
    source.lng
  }~${destination?.lat()},${destination?.lng()}&rtt=auto`;

  return (
    <div className="flex items-center">
      <a
        className="my-2 font-semibold text-green-600 mr-4 text-lg"
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Google Maps
      </a>
      <span> yoki </span>
      <a
        className="my-2 text-red-600 ml-4 font-semibold text-lg"
        href={yandexMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Yandex Maps
      </a>
    </div>
  );
};

export default DirectionsLink;
