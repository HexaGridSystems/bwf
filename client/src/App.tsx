import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import EventPage from "@/pages/EventPage";
import SpeakersPage from "@/pages/SpeakersPage";
import BookPage from "@/pages/BookPage";
import BackToTop from "./components/BackToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/event" component={EventPage} />
      <Route path="/speakers" component={SpeakersPage} />
      <Route path="/book" component={BookPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
      <BackToTop />
    </QueryClientProvider>
  );
}

export default App;
