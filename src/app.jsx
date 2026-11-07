import { LocationProvider, Route, Router, useLocation } from "preact-iso";
import { topics } from "./topics";
import { base } from "./config";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer";

function TopicRoute({ params }) {
  const topic = topics.find((item) => item.id === params.id);

  if (!topic) return <Home />;

  const Page = topic.Page;
  return <Page />;
}

function Notebook() {
  const { path } = useLocation();
  const topicPrefix = `${base}topic/`;
  const pathId = path.startsWith(topicPrefix)
    ? decodeURIComponent(path.slice(topicPrefix.length))
    : null;
  const activeTopic = pathId
    ? (topics.find((topic) => topic.id === pathId) ?? null)
    : null;

  return (
    <div class="desk-pad">
      <main
        class="notebook mx-auto w-full max-w-[1500px]"
        style={{ "--accent": activeTopic?.accent ?? topics[0].accent }}
      >
        <svg
          class="absolute h-0 w-0 overflow-hidden"
          width="0"
          height="0"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter id="roughen" x="-6%" y="-6%" width="112%" height="112%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.016 0.045"
                numOctaves="2"
                seed="11"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.25"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        <Header activeId={activeTopic?.id} />

        <Router>
          <Route path={`${base}topic/:id`} component={TopicRoute} />
          <Route default component={Home} />
        </Router>

        <Footer />
      </main>
    </div>
  );
}

export function App() {
  return (
    <LocationProvider scope={base}>
      <Notebook />
    </LocationProvider>
  );
}
