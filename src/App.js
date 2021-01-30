import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './components/Home';
import NQueens from './components/NQueens';
import Soduku from './components/Soduku';
import Nav from './components/Nav';
import About from './components/About';

function App() {
  return (
    <Router>
    <div className="App">

        <Nav />
        <Switch>        {/*Switch makes it so that the endpoint matches to a speciffic endpoint EXACTLY */}

        <Route path = "/" exact = {true} component = {Home}></Route>
        <Route path = "/nqueens" component = {NQueens}></Route>
        <Route path = "/soduku" component = {Soduku}></Route>
        <Route path = "/about" component = {About}></Route>
         
        
        </Switch>
    </div>
    </Router>
  );
}




export default App;
