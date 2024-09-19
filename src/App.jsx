import { Router} from "react-router-dom";
import Home from "./components/Home";
function App() {

  return (
    <Router basename={import.meta.env.DEV ? "/" : "/Redux-Shop/"}>
      <Home />
    </Router>
  );
}

export default App
