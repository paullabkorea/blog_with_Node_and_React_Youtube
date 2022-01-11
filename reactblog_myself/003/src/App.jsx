import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const currentUser = true;
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
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
