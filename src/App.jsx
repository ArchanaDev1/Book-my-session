import { BrowserRouter } from "react-router-dom";
import MainApp from "./MainApp";

import './App.css'
const App = () => {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  )
}
export default App;