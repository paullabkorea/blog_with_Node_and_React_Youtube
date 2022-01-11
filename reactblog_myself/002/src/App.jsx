import Topbar from "./components/topbar/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function Test(props) {
  console.log(props)
  return(
    <h1>{props.match.params.id}</h1>
  )
}
// 아래 코드에서 <Route path="/post/:id"></Route> 부분을 아래와 같이 고쳐주세요.
// <Route path="/post/:id" component={Test}/>

function App() {
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <h1>hello world 1</h1>
        </Route>
        <Route path="/posts">
          <h1>hello world 2</h1>
        </Route>
        <Route path="/register">
          <h1>hello world 3</h1>
        </Route>
        <Route path="/login">
          <h1>hello world 4</h1>
        </Route>
        <Route path="/post/:id">
          <h1>hello world 5</h1>
        </Route>
        <Route path="/write">
          <h1>hello world 6</h1> 
        </Route>
        <Route path="/settings">
          <h1>hello world 7</h1> 
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
