import {createSlice} from '@reduxjs/toolkit';


const autocompleteSlice = createSlice({
    name:'autocomplete',
    initialState: {
        value: null,
        inputValue: '',
        options: [], // Initialize options as an empty array
        loading: false,
      },
    reducers: {
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setOptions: (state, action) => {
            state.options = action.payload;
        },
        setValue: (state, action) => {
            state.value = action.payload;
        },
        clearState: (state) => {
            state.value = null;
            state.inputValue = '';
            state.options = [];
            state.loading = false;
        },
    },
});

export const autoCompleteActions = autocompleteSlice.actions
export default autocompleteSlice.reducer