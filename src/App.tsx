import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import LessonsPage from "./pages/LessonsPage.tsx";
import QuizPage from "./pages/QuizPage.tsx";
import FillBlankPage from "./pages/FillBlankPage.tsx";
import PrayersPage from "./pages/PrayersPage.tsx";
import ReviewPage from "./pages/ReviewPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons/:groupId" element={<LessonsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/:groupId" element={<QuizPage />} />
          <Route path="/fill" element={<FillBlankPage />} />
          <Route path="/prayers" element={<PrayersPage />} />
          <Route path="/review" element={<ReviewPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
