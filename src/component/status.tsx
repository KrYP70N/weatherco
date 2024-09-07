import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const Status = () => {
  const data = useSelector((state: RootState) => state.general.data?.current)
  return (
    <ul className="status-list">
      <li className="weather-status">
        <img src="./assets/overcast.png" alt="overcast" />
        <p>{data?.condition.text}</p>
      </li>
      <li className="weather-status">
        <img src="./assets/uv-index.png" alt="overcast" />
        <p>{data?.uv}</p>
      </li>
      <li className="weather-status">
        <img src="./assets/windy.png" alt="overcast" />
        <p>{data?.wind_mph}</p>
      </li>
      <li className="weather-status">
        <img src="./assets/temperature.png" alt="overcast" />
        <p>{data?.temp_c} &#176; C</p>
      </li>
    </ul>
  )
}