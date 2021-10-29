import React, { useState } from "react";
import styled from "styled-components";
import useAdminContexts from "../Context/AdminContext";
// import "../../public/assets/css/bookcare.css"

function Login({setDashboard}) {
  const { ForLogin } = useAdminContexts();
  const [id, setId] = useState({ email: "", password: "" });

  const idp = (e) => {
    setId({ ...id, [e.target.name]: e.target.value }); //SPREAD OPERATOR(...)
  };

  const Login = async (e) => {
    e.preventDefault(id.email, id.password, setDashboard );
    ForLogin()
  };

  return (
    <Container className="container">
      <Form className="col-md-8">
        <Row>
          <div className="card">
            <Heading className="text-center">
              <h1 className="h4 text-gray-900">Welcome Back!</h1>
            </Heading>
            <form onSubmit={ForLogin}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Email"
                  name="email"
                  value={id.email}
                  required
                  autoComplete="off"
                  onChange={idp}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  name="password"
                  value={id.password}
                  required
                  autoComplete="off"
                  minLength={6}
                  onChange={idp}
                />
              </div>
              <button type="submit" className="btn btn-default">
                Login
              </button>
            </form>
          </div>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Heading = styled.div`
  padding-top: 10px;
  h1 {
    margin: 0;
  }
`;

const Form = styled.div`
  margin-top: 100px;
`;

const Row = styled.div`
  .form-group {
    padding: 10px 20px;
  }
  button {
    width: 80%;
  }
  form {
    align-items: center;
    button {
      border-radius: 10px;
      height: max-content;
      margin: 0 10%;
      margin-bottom: 20px;
    }
    button:hover {
      background: #6262dc;
      color: white;
    }
    /* button {
      margin-bottom: 20px;
      border-radius: 10px;
    } */
  }
`;
