import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const Forecast = () => {
  const data = useSelector((state: RootState) => state.general.data);

  return (
    <section className="sec-forecast">
      <h2 className="title_lg txt_tertiary">Forecast Data</h2>

      <div className="table-container">
        <table className="forecast_table">
          <tbody>
          <tr>
            {
              data?.forecast.forecastday[0].hour?.map((item, id) => {
                return (
                  <td key={id}>{id.toString().padStart(2, '0')} {id <= 12 ? 'AM' : 'PM'}</td>
                )
              })
            }
          </tr>
          <tr>
            {
              data?.forecast.forecastday[0].hour?.map((item, id) => {
                return (
                  <td key={id}>{item.temp_c} &#176;</td>
                )
              })
            }
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}