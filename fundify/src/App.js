import './index.css';
import Navbar from './Navbar';
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"



function App() {
  let component
  switch (window.location.pathname){
    case "/":
      component = <Home />
      break
    case "/Dashboard":
      component = <Dashboard />
      break
    case "/About":
      component = <About />
      break
    case "/Admin":
      component = <Admin />
      break
  }
  return (
    <>
    <Navbar />
    <div className="container">
      {component}
    </div>
    </>
  );
}

export default App;
