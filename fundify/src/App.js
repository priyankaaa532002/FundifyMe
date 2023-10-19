import Navbar from './Navbar';
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Funding from "./pages/Funding"
import {Route, Routes} from "react-router-dom"



function App() {

  return (
    <>
    <Navbar />
    <div className="container">
      {/* {component} */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Funding' element={<Funding />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
