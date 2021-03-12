import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";

const EditUser = gql`
  mutation EditUser($id: MongoID!, $email: String!, $name: String!) {
    userUpdateById(_id: $id, record: { email: $email, name: $name }) {
      recordId
    }
  }
`;

const GetUser = gql`
  query GetUser($id: MongoID!) {
    userById(_id: $id) {
      email
      name
    }
  }
`;

const Add = () => {
  let history = useHistory();
  let { id } = useParams();
  const [edit] = useMutation(EditUser);
  const { data, loading, refetch } = useQuery(GetUser, { variables: { id } });

  useEffect(() => {
    refetch();
  }, []);

  if (loading || !data) {
    return "Loading user";
  }

  return (
    <div>
      <Header>User Edit</Header>
      <div>
        <Formik
          enableReinitialize
          initialValues={{
            name: data.userById.name,
            email: data.userById.email,
          }}
          onSubmit={async (values) => {
            await edit({ variables: { ...values, id } });
            history.push("/users");
          }}
        >
          <Form>
            <label htmlFor="firstName">Name</label>
            <Field id="firstName" name="name" placeholder="bob" />

            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Add;
