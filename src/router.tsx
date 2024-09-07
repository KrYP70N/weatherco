import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "./screen/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />
  }
])