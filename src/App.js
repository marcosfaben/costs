import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';

import Conteiner from './components/layout/Conteiner';
import NavBar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Projects from './components/pages/Projects';

function App() {
  return (
    <>
    
      <Router>
        <NavBar/>
        
        <Conteiner  customClass='min-height'>
          <Routes>

            <Route path="/" element={<Home/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/company" element={<Company/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/newproject" element={<NewProject/>}/>

          </Routes>
        </Conteiner>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
