import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LivePreview from "@/components/LivePreview";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <LivePreview />
      <Features />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
