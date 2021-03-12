import React from "react";
import { Link } from "react-router-dom";

const Entry = ({ className, user, remove }) => (
  <li className={className}>
    Name: {user.name} Email: {user.email}
    {` `}
    <Link to={`/user/${user._id}/edit`}> Edit</Link>
    {` `}
    <button type="button" onClick={() => remove(user._id)}>
      Remove
    </button>
  </li>
);

export default Entry;
