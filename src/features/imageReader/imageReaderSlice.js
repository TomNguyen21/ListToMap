import { createSlice } from '@reduxjs/toolkit';

export const imageReaderSlice = createSlice({
    name: 'imageReader',
    initialState: {
        addresses: [],
        files: [],
    },
    reducers: {
        addAddress: (state, action) => {
            console.log('ADDRESSES', action.payload)
            state.addresses = [...action.payload]
        },
        getAddresses: (state) => {
            return state.addresses = [...state.addresses]
        },
        addFiles: (state, action) => {
            console.log('FILES', action.payload)
            state.files = [action.payload]
        },
        selectFiles: (state) => {
            return state.files = [...state.files]
        },
    }
})

export const { addAddress, getAddresses, addFiles, selectFiles } = imageReaderSlice.actions;

export default imageReaderSlice.reducer;