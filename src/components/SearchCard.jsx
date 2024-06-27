import { useState } from "react";
import MainData from "./DataCard";
import PageFooter from "./Footer";

export default function DataCard() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [data, setData] = useState("Hidden");
  const [search, setSearch] = useState(true);

  function HandleClick(ev) {
    ev.preventDefault();
    setSearch(false);
    setData("Showed");
  }

  function HandleResearch(ev) {
    ev.preventDefault();
    setSearch(true);
    setData("Hidden");
    setCity("");
    setState("");
  }

  return (
    <>
      {search && (
        <div className="main_content">
          <h1 className="main_tittle">Procure sua cidade</h1>
          <div className="main_header">
            <section id="input_sec">
              <h1 id="main_data_input" className="main_data_input">
                Cidade:
              </h1>
              <label htmlFor="city_name"></label>
              <input
                type="text"
                name="city_name_input"
                id="city_name"
                placeholder="Ex: São Paulo"
                className="content"
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
              />
            </section>
            <section id="input_sec">
              <h1 id="main_data_input">Estado:</h1>
              <label htmlFor="state_code"></label>
              <input
                type="text"
                name="state_code"
                id="state_code"
                placeholder="Ex: SP"
                className="content"
                list="state_code"
                value={state}
                onChange={(ev) => setState(ev.target.value)}
              />
            </section>
            <div className="search_city_btn">
              <input
                type="button"
                id="search_city_btn"
                className="btn_to_search"
                value="Buscar"
                onClick={HandleClick}
              />
            </div>
          </div>
        </div>
      )}
      <div id="to_show_all_data">
        {data === "Showed" ? (
          <>
            <MainData
              cityName={city}
              cityState={state}
              handleResearch={HandleResearch}
            />
          </>
        ) : null}
      </div>
    </>
  );
}
