import {configureStore} from '@reduxjs/toolkit';
import autocompleteReducer from './autocomplete-slice';
import latlongReducer from './latlong-slice'


const store = configureStore({reducer:{autocomplete:autocompleteReducer,latlong:latlongReducer}});


export default store;