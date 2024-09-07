import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Clock } from "./time"

export const Location = () => {
  const data = useSelector((state: RootState) => state.general.data)
  return (
    <div className="location">
      <h2 className="location_city">{data?.location.name} City <br/> <span>{data?.location.country}</span></h2>
      <Clock timeString={data?.location.localtime}/>
    </div>
  )
}