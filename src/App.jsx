import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { route } from "./routes";
import Loader from "./layout/Loader";

const App = () => {
  return (
    <div>
      <Router>

        {/* Route Configuration */}
        <Suspense fallback={<div><Loader/></div>}>
          <Routes>
            {route.map(({ id, path, component: Component }) => (
              <Route key={id} path={path} element={<Component />} />
            ))}
          </Routes>
        </Suspense>
       
      </Router>
    </div>
  );
};

export default App;
