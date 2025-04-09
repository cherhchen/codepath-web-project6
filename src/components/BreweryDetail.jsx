import { useEffect, useState } from 'react'
import { useParams } from 'react-router';

const BreweryDetail = () => {
  let params = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
      const controller = new AbortController();
      const getBreweryDetail = async() => {
        try {
          const url = "https://api.openbrewerydb.org/v1/breweries/" + params.id
          const response = await fetch(url, { signal: controller.signal });
          const json = await response.json();
          console.log(json);
          setDetails(json);
        }
        catch (error) {
          if (error.name === "AbortError") {
            // It's ok, don't do anything
          } else {
            console.error(error);
          }
        }
    }
    getBreweryDetail().catch(console.error);
    return () => controller.abort()
  }, [params.id]);

  return (
    details ? (
    <div className="detail-container">
      <h1>{details.name}</h1>
      <h2>{details.city}, {details.state} ({details.country})</h2>
      <div className="sub-details">
        {
          details.address_1 ? <p>Address: {details.address_1}</p> : <p>Address: None</p>
        }
        {
          details.address_2 && <p>{details.address_2}</p>
        }
        {
          details.address_3 && <p>{details.address_3}</p>
        }
        <p>Phone: {details.phone}</p>
        {
          details.website_url && <p>Website: <a href={details.website_url}>{details.website_url}</a></p>
        }
        <p>Brewery Type: {details.brewery_type}</p>
        <p>Latitude: {details.latitude}</p>
        <p>Latitude: {details.longitude}</p>
      </div>
    </div>) :
    <>
      <p>Loading...</p>
    </>
  );
}

export default BreweryDetail;