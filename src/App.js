import './App.css';
import Routers from './Routers';
// import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="App">
      <Routers />
      {/* <SnackbarProvider maxSnack={3} /> */}
    </div>
  );
}

export default App;
