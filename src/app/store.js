import { configureStore } from '@reduxjs/toolkit';
import imageReaderReducer from '../features/imageReader/imageReaderSlice';

const defaultMiddlewareConfig = {
    serializableCheck: false
  };

const store = configureStore({
    reducer: {
        files: imageReaderReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(defaultMiddlewareConfig),
})

export default store;