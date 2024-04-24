import './App.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Map from './components/map/Map';
import ImageReader from './features/imageReader/ImageReader';


const App = () => {
  return (
    <>
      <div className="title">event map</div>
      <ImageReader />
      <Map />
    </>
  );
}

export default App;