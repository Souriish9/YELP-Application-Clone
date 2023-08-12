import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./routes/Home";
import RestaurantDetail from "./routes/RestaurantDetail";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import UpdatePage from "./routes/UpdatePage";

function App() {
    return (
        <>
            <RestaurantsContextProvider>
                <div className="container">
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/restaurant/:id/update" element={<UpdatePage />} />
                            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                        </Routes>
                    </Router>
                </div>
            </RestaurantsContextProvider>
        </>
    );
}

export default App;
