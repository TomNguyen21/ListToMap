import { configureStore } from '@reduxjs/toolkit';
import imageReaderReducer from '../features/imageReader/imageReaderSlice';

const store = configureStore({
    reducer: {
        addresses: imageReaderReducer
    }
})

export default store;