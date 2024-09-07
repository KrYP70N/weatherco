import { Search } from "./search";

export const Header = () => {
  return (
    <header className='app-header'>
      <section className="container">
        <h1 className="title_xl txt_light lg">Weather Co</h1>
        <h1 className="title_xl txt_light sm">W.Co</h1>
        <Search placeholder="Search with city name"/>
      </section>
    </header>
  )
}