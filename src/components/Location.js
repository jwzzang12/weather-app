import useGeoLocation from "../hooks/useGeolocation";
import Item from "./Item"
export default function Location() {
  const location = useGeoLocation();
  return (
    <div className="location" >
      <Item info={location.loaded ? JSON.stringify(location) : "Location data not available yet."}/>
    </div>
  );
}
