const DirectionsLink = ({ source, destination }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${
    source.lat
  },${
    source.lng
  }&destination=${destination?.lat()},${destination?.lng()}&travelmode=driving`;

  const yandexMapsUrl = `https://yandex.com/maps/?rtext=${source.lng},${
    source.lat
  }~${destination?.lng()},${destination?.lat()}&rtt=auto`;

  return (
    <div>
      <a
        className="my-2 text-green-600"
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Directions (Google Maps)
      </a>
      <a
        className="my-2 text-red-600"
        href={yandexMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Directions (Yandex Maps)
      </a>
    </div>
  );
};

export default DirectionsLink;
