import Home from "./../pages/Home";
import Login from "./../pages/Auth/Login";
import Register from "./../pages/Auth/Register";
import Profile from "../pages/Profile";
import Stream from "../pages/Stream";
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
