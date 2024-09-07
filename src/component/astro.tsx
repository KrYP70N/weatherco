import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const Astro = () => {
  const data = useSelector((state: RootState) => state.general.data);

  return (
    <section className="astro">
      <h2 className="astro_title"><img src="./assets/astrology.png" alt="astro" /> Astro</h2>
      <ul>
        <li>
          Sunrise
          <span>{data?.forecast.forecastday[0].astro.sunrise}</span>
        </li>
        <li>
          Sunset
          <span>{data?.forecast.forecastday[0].astro.sunset}</span>
        </li>
        <li>
          Moonrise
          <span>{data?.forecast.forecastday[0].astro.moonrise}</span>
        </li>
        <li>
          Moonset
          <span>{data?.forecast.forecastday[0].astro.moonset}</span>
        </li>
        <li>
          Moonphase
          <span>{data?.forecast.forecastday[0].astro.moon_phase}</span>
        </li>
        <li>
          Moon illumination
          <span>{data?.forecast.forecastday[0].astro.moon_illumination}</span>
        </li>
      </ul>
    </section>
  )
}