import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import Creations from './pages/Creations';
import Contact from './pages/Contact';
import Links from './pages/Links';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/creations" element={<Creations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/links" element={<Links />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}