import Header from "./components/Header";
import MobileCTABar from "./components/MobileCTABar";
import StructuredData from "./components/StructuredData";
import Hero from "./components/sections/Hero";
import TrustBar from "./components/sections/TrustBar";
import Services from "./components/sections/Services";
import BeforeAfter from "./components/sections/BeforeAfter";
import WhyGakkeut from "./components/sections/WhyGakkeut";
import Process from "./components/sections/Process";
import PricingGuide from "./components/sections/PricingGuide";
import FAQ from "./components/sections/FAQ";
import EstimateForm from "./components/estimate/EstimateForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <StructuredData />
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <Services />
        <BeforeAfter />
        <WhyGakkeut />
        <Process />
        <PricingGuide />
        <FAQ />
        <EstimateForm />
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
