import Home from "./../pages/Home";
import Login from "./../pages/Auth/Login";
import Register from "./../pages/Auth/Register";
import Profile from "../pages/Profile";
import Stream from "../pages/Stream";
import SpeedCameras from "./../pages/Cameras/index";
import MapList from "../components/Lists";
export const privateRoutes = [
  {
    id: 0,
    path: "/",
    component: Home,
  },
  {
    id: 1,
    path: "/profile",
    component: Profile,
  },
  {
    id: 2,
    path: "/stream",
    component: Stream,
  },
  {
    id: 3,
    path: "/radars",
    component: SpeedCameras,
  },
  {
    id: 4,
    path: "/list",
    component: MapList,
  },
];

export const publicRoutes = [
  {
    id: "0",
    path: "/",
    component: Login,
  },
  {
    id: "1",
    path: "/register",
    component: Register,
  },
];
