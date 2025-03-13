import './App.css';
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import BodyComponent from "./components/BodyComponent/BodyComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";

function App() {
  return (
    <div className="App">
        <HeaderComponent />
        <BodyComponent />
        <FooterComponent />
    </div>
  );
}

export default App;
