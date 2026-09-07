import Navbar from "./components/Navbar";
import MobileCTABar from "./components/MobileCTABar";
import Hero from "./components/sections/Hero";
import Trust from "./components/sections/Trust";
import Services from "./components/sections/Services";
import BeforeAfter from "./components/sections/BeforeAfter";
import CleaningScope from "./components/sections/CleaningScope";
import Process from "./components/sections/Process";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <BeforeAfter />
      <CleaningScope />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
      <MobileCTABar />
    </div>
  );
}
