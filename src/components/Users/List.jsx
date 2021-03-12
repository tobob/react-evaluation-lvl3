import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";
import styled from "styled-components";
import Entry from "./Entry";
import get from "lodash/get";

const UsersList = gql`
  query GetUsers {
    userMany(limit: 10) {
      _id
      name
      email
      updatedAt
      createdAt
    }
  }
`;

const RemoveUser = gql`
  mutation RemoveUser($id: MongoID!) {
    userRemoveById(_id: $id) {
      recordId
    }
  }
`;

const ADD_USERS_SUBSCRIPTION = gql`
  subscription OnUserAdded {
    userCreated {
      name
      email
    }
  }
`;

const StyledEntry = styled(Entry)`
  color: red;
  font-weight: ${(props) =>
    props.user.email.endsWith("@selleo.com") ? "700" : "400"};
`;

const List = () => {
  const { loading, data, refetch, error } = useQuery(UsersList);
  const [removeUser] = useMutation(RemoveUser);
  const wsData = useSubscription(ADD_USERS_SUBSCRIPTION);
  const [lastUserFromWS, setLastUserFromWS] = useState(
    get(wsData, "data.userCreated.email")
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const newEmail = get(wsData, "data.userCreated.email");
    if (newEmail !== lastUserFromWS) {
      setLastUserFromWS(newEmail);
      refetch();
      alert(`New user with email ${newEmail}`);
      console.log("Nowy user!!!");
    }
  }, [wsData]);

  const remove = async (id) => {
    await removeUser({ variables: { id } });
    refetch();
  };

  if (loading) {
    return "Loading users";
  }

  console.log("error", error);

  return (
    <ul>
      {data.userMany.map((user) => (
        <StyledEntry user={user} remove={remove} />
      ))}
    </ul>
  );
};

export default List;
