import { useEffect } from "react";

const Stream = () => {
  useEffect(() => {
    new window.Twitch.Embed("twitch-embed", {
      channel: "isaqjonov_i",
      width: "100%",
      height: "100vh",
      layout: "video",
      allowfullscreen: true,
      theme: "light",
    });
  }, []);

  return <div className="w-full h-screen" id="twitch-embed"></div>;
};

export default Stream;
