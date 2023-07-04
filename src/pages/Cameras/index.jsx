import React, { useEffect } from "react";

const SpeedCameras = () => {
  useEffect(() => {
    fetch(
      "https://roads.googleapis.com/v1/speedLimits?path=38.75807927603043,-9.03741754643809|38.6896537,-9.1770515|41.1399289,-8.6094075&key=AIzaSyDv4FQS283krRshMGSnRX0Z_tKlXPwEacw"
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return <div></div>;
};

export default SpeedCameras;
