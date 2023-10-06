import "./App.css";
import { useEffect } from "react";

import { getData } from "./apicalls";
import { useSelector, useDispatch } from "react-redux";
import { setPlanetData } from "./redux/store";
import Welcome from "./pages/welcome";
import DashBoard from "./pages/dashboard";

function App() {
  const dispatch = useDispatch();
  const routeLocation = useSelector((state) => state.routeLocation);

  useEffect(() => {
    let data = [];
    const getDataFromApi = async () => {
      data = await getData();
      dispatch(setPlanetData(data));
    };
    getDataFromApi();
  }, [dispatch]);

  return (
    <>
      {routeLocation == 0 ? <Welcome /> : routeLocation == 1 && <DashBoard />}
    </>
  );
}

export default App;
