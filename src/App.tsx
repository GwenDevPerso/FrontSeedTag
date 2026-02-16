import './App.css';
import {Dashboard} from './components/dashboard/dashboard';
import {BackgroundMusic} from './components/background-music';

function App() {

  return (
    <>
      <BackgroundMusic src="/musics/star_wars_cantina_128k.mp3" />
      <Dashboard />
    </>
  );
}

export default App;
