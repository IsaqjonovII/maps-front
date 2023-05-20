const DirectionsLink = ({ source, destination }) => {
  
  const url = `https://www.google.com/maps/dir/?api=1&origin=${source.lat},${source.lng}&destination=${destination.lat},${destination.lng}&travelmode=driving`;

  return (
    <a className="my-2 text-green-600" href={url} target="_blank" rel="noopener noreferrer">
      Get Directions
    </a>
  );
};
export default DirectionsLink;
