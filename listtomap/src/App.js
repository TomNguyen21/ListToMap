import './App.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Map from './Map';
import ImageReader from './ImageReader';


const App = () => {
  return (
    <>
      <ImageReader />
      <Map />
    </>
  );
}

export default App;