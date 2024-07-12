import { createSlice } from '@reduxjs/toolkit';

export const imageReaderSlice = createSlice({
    name: 'imageReader',
    initialState: {
        addresses: [],
        files: [],
    },
    reducers: {
        addToList: (state, action) => {
            return state.addresses = [...state.addresses, action.payload]
        },
        selectList: (state) => {
            return state.addresses = [...state.addresses]
        },
        addFiles: (state, action) => {
            return state.files = [...state.files, action.payload]
        },
        selectFiles: (state) => {
            return state.files = [...state.files]
        },
    }
})

export const { addToList, selectList, addFiles, selectFiles } = imageReaderSlice.actions;

export default imageReaderSlice.reducer;