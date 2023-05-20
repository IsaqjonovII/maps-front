import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import Navbar from "./components/Navbar";

function App() {
  const token = window.localStorage.getItem("token");
  return (
    <div className="w-full h-[100vh] bg-white relative">
      <Navbar token={token} />
      <Routes>
        {token
          ? privateRoutes.map(({ id, path, component: Component }) => (
              <Route path={path} key={id} element={<Component />} />
            ))
          : publicRoutes.map(({ id, path, component: Component }) => (
              <Route path={path} key={id} element={<Component />} />
            ))}
      </Routes>
    </div>
  );
}

export default App;