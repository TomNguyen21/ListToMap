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
            return state.addresses = [...state.addresses]
        },
        addFiles: (state, action) => {
            // state = {
            //     ...state,
            //     files: [...state.files, action.payload]
            // }
            state.files = [...state.files, action.payload]
            console.log(state.files, action.payload)
        },
        selectFiles: (state) => {
            return state.files = [...state.files]
        },
    }
})

export const { addAddress, selectList, addFiles, selectFiles } = imageReaderSlice.actions;

export default imageReaderSlice.reducer;