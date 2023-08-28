import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { useDispatch, useSelector } from "react-redux";
import { autoCompleteActions } from '../../store/autocomplete-slice';
import { fetchAutocompleteOptions } from '../../store/autoComplete-thunk';
import { latLongActions } from '../../store/latlong-slice';



export default function AutoCompleteComponent() {

  const dispatch = useDispatch();
  const options = useSelector(state => state.autocomplete.options);
  const value = useSelector(state => state.autocomplete.value);
  const inputValue = useSelector(state => state.autocomplete.inputValue)



  useEffect(() => {
    dispatch(fetchAutocompleteOptions(inputValue));

  }, [inputValue, dispatch]);


  // console.log(value, "value");



  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300, borderRadius: 5 }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event, newValue) => {
        dispatch(autoCompleteActions.setOptions(newValue ? [newValue, ...options] : options));
        dispatch(autoCompleteActions.setValue(newValue));
        const { place_id } = newValue ? newValue : '';
        const geocoder = new window.google.maps.Geocoder();
        if (newValue !== null) {
          geocoder.geocode({ placeId: place_id }, (results, status) => {
            if (status === 'OK') {
              const { lat, lng } = results[0].geometry.location;

              // Use lat and lng to plot on map or for further use
              // console.log('Latitude:', lat());
              // console.log('Longitude:', lng());
              dispatch(latLongActions.setLatitude(lat()))
              dispatch(latLongActions.setLongitude(lng()))
            } else {
              console.error('Geocode was not successful for the following reason:', status);
            }

          });

        } else {
          dispatch(latLongActions.setLatitude(null))
          dispatch(latLongActions.setLongitude(null))
          dispatch(autoCompleteActions.clearState())
        }

      }}
      onInputChange={(event, newInputValue) => {
        dispatch(autoCompleteActions.setInputValue(newInputValue));
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search location" fullWidth size='small' />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  )
}