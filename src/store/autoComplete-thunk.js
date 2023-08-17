import { autoCompleteActions } from "./autocomplete-slice";






export const fetchAutocompleteOptions = (inputValue) => async (dispatch, getState) => {
  const { value } = getState().autocomplete; 
  
  if (!window.google) {
   
    return;
  }
  
  const autocompleteService = new window.google.maps.places.AutocompleteService();
  
  if (inputValue === '') {
    dispatch(autoCompleteActions.setInputValue(value ? [value] : []));
    return;
  }

  try {
    const results = await new Promise((resolve) => {
      autocompleteService.getPlacePredictions({ input: inputValue }, resolve);
    });

    const newOptions = value ? [value, ...results] : results;
    if(newOptions !==null){
        
        dispatch(autoCompleteActions.setOptions(newOptions));
    }
  } catch (error) {
    // dispatch(autoCompleteActions.setValue(''))
  }
};
