import { topic as commute, CommutePage } from "./Commute.jsx";
import { topic as coffee, CoffeePage } from "./Coffee.jsx";
import { topic as screens, ScreensPage } from "./Screens.jsx";
import { topic as garden, GardenPage } from "./Garden.jsx";
import { topic as weather, WeatherPage } from "./Weather.jsx";

/** Topic order drives the routes, the arrow-key paging and the accent colour. */
export const topics = [
  { ...commute, Page: CommutePage },
  { ...coffee, Page: CoffeePage },
  { ...screens, Page: ScreensPage },
  { ...garden, Page: GardenPage },
  { ...weather, Page: WeatherPage },
];
