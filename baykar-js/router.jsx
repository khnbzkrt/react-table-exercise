import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./src/App";
import { CountryDetail } from "./src/pages/CountryDetail";
import { CountryList } from "./src/pages/CountryList";
import { Home } from "./src/pages/Home";
export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:id" element={<CountryDetail />} />
    <Route path="/countries" element={<CountryList />} />
  </Routes>
);
