import { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

function App() {
  const [latLng, setLatLng] = useState({
    lat: undefined,
    lng: undefined
  })

  const [address, setAddress] = useState("");

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setLatLng(latLng))
      .catch(error => console.error('Error', error));
  };

  return (
    <div className="App">
      <div>
        {address}, lat: {latLng.lat}, lon: {latLng.lng}
      </div>
      <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps()} />
            <div>
              {loading && <div>...</div>}
              {suggestions.map(suggestion => {
                return (
                  <div {...getSuggestionItemProps(suggestion)} key={suggestion.description}>
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default App;
