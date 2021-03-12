import logo from "./logo.svg";
import "./App.css";
import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import styled, { ThemeProvider } from "styled-components";

const Home = lazy(() => import("./routes/Home"));
const Data = lazy(() => import("./routes/Data"));
const Users = lazy(() => import("./routes/Users"));
const UserAdd = lazy(() => import("./routes/user/Add"));
const UserEdit = lazy(() => import("./routes/user/Edit"));
const Chart = lazy(() => import("./routes/user/Chart"));

const normalTheme = {
  fg: "black",
  bg: "white",
  padding: "20px",
};

const nightTheme = {
  fg: "white",
  bg: "black",
  padding: "40px",
};

const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 10px;
  padding: 0.5rem;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid green;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */

  background: ${(props) => props.theme.fg};
  color: ${(props) => props.theme.bg};
`;

const App = () => {
  const [theme, setTheme] = useState(normalTheme);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Nav />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/data" component={Data} />
            <Route path="/users" component={Users} />
            <Route path="/user/add" component={UserAdd} />
            <Route path="/user/:id/edit" component={UserEdit} />
            <Route path="/chart" component={Chart} />
          </Switch>
        </Suspense>
      </Router>
      <Button
        onClick={() =>
          theme === normalTheme ? setTheme(nightTheme) : setTheme(normalTheme)
        }
      >
        Change theme
      </Button>
    </ThemeProvider>
  );
};

export default App;
