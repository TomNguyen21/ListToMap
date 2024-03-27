import { createSlice } from '@reduxjs/toolkit';

export const imageReaderSlice = createSlice({
    name: 'imageReader',
    initialState: {
        addresses: []
    },
    reducers: {
        addToList: (state, action) => {
            state.addresses = [...state.addresses, action.payload]
        },
        selectList: (state) => {
            state.addresses = [...state.addresses]
        }
    }
})

export const { addToList, selectList } = imageReaderSlice.actions;

export default imageReaderSlice.reducer;