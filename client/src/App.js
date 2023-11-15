import './App.css';
import { Toaster } from "react-hot-toast";
import { HashRouter, Routes } from "react-router-dom";
import routes from './routes/mainRoute'

function App() {
  return (
    <div className="App">
      <div>
      <HashRouter>
        <Toaster />
        <Routes>
          {routes}
        </Routes>
      </HashRouter>
    </div>
    </div>
  );
}

export default App;
