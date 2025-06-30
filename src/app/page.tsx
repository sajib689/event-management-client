import Hero from "./components/Hero/Hero";
import OnlineEvents from "./components/Hero/OnlineEvents";
import PopularSpeakers from "./components/Hero/PopularSpeakers";
import UpcomingEvents from "./components/Hero/UpcomingEvent";

export default function Home() {
  return (
    <div>
      <Hero/>
      <UpcomingEvents/>
      <OnlineEvents/>
      <PopularSpeakers/>
    </div>
  );
}
