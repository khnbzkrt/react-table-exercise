import { AppRouter } from "../router";
import { Navbar } from "./components/navbar";
const App = ({ children }) => {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
