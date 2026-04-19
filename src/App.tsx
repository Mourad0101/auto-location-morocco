import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./i18n";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CarsPage from "./pages/CarsPage.tsx";
import CarDetailPage from "./pages/CarDetailPage.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import BookingConfirmation from "./pages/BookingConfirmation.tsx";
import ContactPage from "./pages/ContactPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/booking/confirmation/:ref" element={<BookingConfirmation />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
