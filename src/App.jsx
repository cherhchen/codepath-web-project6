import { useEffect, useState } from 'react'
import { Link } from 'react-router';
import './App.css'

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [typeList, setTypeList] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [numUSBreweries, setNumUSBreweries] = useState(0);
  const [numForeignBreweries, setNumForeignBreweries] = useState(0);

  useEffect(() => {
    const getBreweries = async () => {
      const url = "https://api.openbrewerydb.org/v1/breweries/random?size=20";
      const response = await fetch(url);
      const json = await response.json();
      setList(json);
      const availableTypes = json.map((brewery) =>
        brewery.brewery_type
      );
      setTypeList([...new Set(availableTypes)]);
      setNumUSBreweries(countUSBreweries(json));
      setNumForeignBreweries(countForeignBreweries(json));
    }
    getBreweries().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    let filteredData = [];
    if (searchValue != "") {
      filteredData = list.filter((brewery) => 
        brewery.name.toLowerCase().includes(searchValue)
      );
    }
    else {
      // Reset filteredData if search input is blank
      filteredData = list;
    }
    if (selectedType != "") {
      filteredData = filteredData.filter((brewery) => 
        brewery.brewery_type === selectedType
      );
    }
    setFilteredResults(filteredData);
    setNumUSBreweries(countUSBreweries(filteredData));
    setNumForeignBreweries(countForeignBreweries(filteredData));
  }

  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
    let filteredData = [];
    if (event.target.value != "") {
      filteredData = list.filter((brewery) => 
        brewery.brewery_type === event.target.value
      );
    }
    if (searchInput != "") {
      filteredData = filteredData.filter((brewery) => 
        brewery.name.toLowerCase().includes(searchInput)
      );
    }
    setFilteredResults(filteredData);
    setNumUSBreweries(countUSBreweries(filteredData));
    setNumForeignBreweries(countForeignBreweries(filteredData));
  }

  const countUSBreweries = (data) => {
    const USBreweries = data.filter((brewery) => 
      brewery.country === "United States"
    );
    return USBreweries.length;
  }

  const countForeignBreweries = (data) => {
    const USBreweries = data.filter((brewery) => 
      brewery.country !== "United States"
    );
    return USBreweries.length;
  }

  console.log(list);
  // console.log(typeList);
  return (
    <div>
      <h1>Brewery Data Dashboard</h1>
      {list &&
        <div className="stats-container">
          <div className="stats">
            <h2>Total Results ✅</h2>
            <p className="stats-text">{searchInput.length > 0 || selectedType != "" ? filteredResults.length : list.length}</p>
          </div>
          <div className="stats">
            <h2>US Breweries 🇺🇸</h2>
            <p className="stats-text">{numUSBreweries}</p>
          </div>
          <div className="stats">
            <h2>Foreign Breweries 🌐</h2>
            <p className="stats-text">{numForeignBreweries}</p>
          </div>
        </div>
      }
      <h2>List of Breweries 🍺</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by Name"
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <div>
          <label name="brewery-type">Type: </label>
          <select name="Brewery Type" id="brewery-type" value={selectedType} onChange={handleSelectChange}>
            <option value=""></option>
            { typeList && typeList.map((item) => 
              <option value={item} key={item}>{item}</option>
              )
            }
          </select>
        </div>
      </div>
      <div className="table-container">
        {list &&
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
            {searchInput.length > 0 || selectedType != "" ? 
              filteredResults.map((brewery) => (
                <tr key={brewery.id}>
                <td>
                  <Link to={`/detail/${brewery.id}`}>
                    {brewery.name}
                  </Link>
                </td>
                <td>{brewery.brewery_type}</td>
                <td>{brewery.city}</td>
                <td>{brewery.state}</td>
                <td>{brewery.country}</td>
              </tr>
            )) : (
              list.map((brewery) => (
                <tr key={brewery.id}>
                  <td>
                    <Link to={`/detail/${brewery.id}`}>
                      {brewery.name}
                    </Link>
                  </td>
                  <td>{brewery.brewery_type}</td>
                  <td>{brewery.city}</td>
                  <td>{brewery.state}</td>
                  <td>{brewery.country}</td>
                </tr>
              )))
            }
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export default App
