import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

import List from "../components/Users/List";

const Users = () => (
  <>
    <Header underline>Users</Header>
    <List />
    <Link to="/user/add">Add user</Link>
  </>
);

export default Users;
