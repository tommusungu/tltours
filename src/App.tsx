import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import BlogPage from "./pages/BlogPage";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import AITours from "./pages/AITours";
import ScrollToTop from "./hooks/ScrollToTop";
import WebFont from "webfontloader";
import { Suspense, useEffect } from "react";
import LoadingScreen from "./pages/LoadingScreen";

const queryClient = new QueryClient();

const App = () => {
useEffect(() => {
    WebFont.load({
      google: {
        families: ["Outfit", "DM Sans"],
      },
    });

    // ReactGA.initialize("G-N2FWR5LGKZ");
    // ReactGA.send({
    //   hitType: "pageview",
    //   page: window.location.pathname + window.location.search,
    // });
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:country" element={<Tours />} />
              <Route path="/:slug" element={<TourDetails />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/ai-tour-creator" element={<AITours />} />
          <Route path="/payment-successful" element={<Success />} />
          <Route path="/payment-failed" element={<Failed />} />

        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
};

export default App;