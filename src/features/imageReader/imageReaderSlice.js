import { createSlice } from '@reduxjs/toolkit';

export const imageReaderSlice = createSlice({
    name: 'imageReader',
    initialState: {
        addresses: [],
        files: [],
    },
    reducers: {
        addAddress: (state, action) => {
            state.addresses = [...action.payload]
        },
        selectList: (state) => {
            state.addresses = [...state.addresses]
        },
        addFiles: (state, action) => {
            let uniqueFiles = Array.from(new Set([...state.files.map(JSON.stringify), JSON.stringify(action.payload)], JSON.parse))
            console.log(uniqueFiles)
            state.files = [...state.files, action.payload]
        },
        selectFiles: (state) => {
            state.files = [...state.files]
        },
    }
})

export const { addAddress, selectList, addFiles, selectFiles } = imageReaderSlice.actions;

export default imageReaderSlice.reducer;