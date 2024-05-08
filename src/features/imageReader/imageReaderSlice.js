import { createSlice } from '@reduxjs/toolkit';

export const imageReaderSlice = createSlice({
    name: 'imageReader',
    initialState: {
        addresses: [],
        files: [],
    },
    reducers: {
        addToList: (state, action) => {
            state.addresses = [...state.addresses, action.payload]
        },
        selectList: (state) => {
            state.addresses = [...state.addresses]
        },
        addFiles: (state, action) => {
            state.files = [...state.files, action.payload]
        },
        selectFiles: (state) => {
            state.files = [...state.files]
        },
    }
})

export const { addToList, selectList, addFiles, selectFiles } = imageReaderSlice.actions;

export default imageReaderSlice.reducer;