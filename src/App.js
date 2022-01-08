import "./App.css";
import Home from "./components/Home/Home";
import Context from "./components/Context/Context";

function App() {
  return (
    <div className="App">
      <Context>
        <Home />
      </Context>
    </div>
  );
}

export default App;
