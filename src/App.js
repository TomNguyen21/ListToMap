import './App.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import './assets/fonts/font.css';
import icon from './assets/icons/Huge-icon.png';

import Map from './components/map/Map';
import ImageReader from './features/imageReader/ImageReader';

const App = () => {
  return (
    <>
      <div className="title"><img src={icon} alt='Icon'/>eventmap</div>
      <ImageReader />
      <Map />
    </>
  );
}

export default App;