import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Events from "./pages/Events";
import Access from "./pages/Access";
import Media from "./pages/Media";
import Live from "./pages/Live";
import Contact from "./pages/Contact";
import AccessMap from "./pages/AccessMap";
import ClassroomMap from '@/pages/ClassroomMap';
import StudentGuide from "./pages/StudentGuide";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/programs"} component={Programs} />
      <Route path={"/events"} component={Events} />
      <Route path={"/access"} component={Access} />
      <Route path={"/access/map"} component={AccessMap} />
      <Route path="/classroom-map" component={ClassroomMap} />
      <Route path={"/media"} component={Media} />
      <Route path={"/live"} component={Live} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/student-guide"} component={StudentGuide} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
