import './App.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Map from './components/Map';
import ImageReader from './features/ImageReader';


const App = () => {
  return (
    <>
      <ImageReader />
      <Map />
    </>
  );
}

export default App;