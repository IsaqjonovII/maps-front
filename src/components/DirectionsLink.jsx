const DirectionsLink = ({ source, destination }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${
    source.lat
  },${
    source.lng
  }&destination=${destination?.lat()},${destination?.lng()}&travelmode=driving`;

  const yandexMapsUrl = `https://yandex.com/maps/10335/tashkent/?ll=${
    source.lat
  }%2C${source.lng}&mode=routes&rtd=0&rtext=${source.lat}%2C${
    source.lng
  }~${destination?.lat()}%2C${destination?.lng()}8&rtt=auto&z=15`;

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
      <span>  yoki  </span>
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
