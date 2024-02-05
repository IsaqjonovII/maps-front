import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const token = window.localStorage.getItem("token");
  return (
    <div className="w-full h-screen bg-white relative">
      <Navbar />
      <Routes>
        {privateRoutes.map(({ id, path, component: Component }) => (
          <Route path={path} key={id} element={<Component />} />
        ))}
        {/* {token
          ?
          : publicRoutes.map(({ id, path, component: Component }) => (
              <Route path={path} key={id} element={<Component />} />
            ))} */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
