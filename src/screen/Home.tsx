import { Header } from "../component/header";
import { Forecast } from "../component/forecast";
import { Astro } from "../component/astro";
import { Status } from "../component/status";
import { Location } from "../component/location";
import { WeatherOverlay } from "../component/weather-overlay";
import { useForecast } from "../hook/apis/forecast-hook";

const HomeScreen = () => {

  const {data, isLoading, error} = useForecast();

  if(isLoading) {
    return <>'loading ....'</>
  }

  if(error) {
    return <>Please enable browser location service</>
  }

  return (
    <>
      <WeatherOverlay />
      <section className="app-container">
        <Header />

        <main className="container home">
          
          <article className="main">
            <section className="sec-head">
              <Location />
              <Status />
            </section>

            <Forecast />
          </article>

          <aside className="aside">
            <Astro />
          </aside>

        </main>
        </section>
    </>
  )
}

export default HomeScreen;