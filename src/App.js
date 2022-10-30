import axios from "axios";
import "./App.css";
import Search from "./search-component/Search";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import validator from "validator";
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from "jwt-decode";


function App() {
  const [modalShow, setModalShow] = useState(true);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const dispatch = useDispatch();
  
  const oAuthHandler=(userDetail)=>{
    setValidEmail(true);
    dispatch({
      type: "UPDATE_EMAIL",
      email: email,
    });
    setModalShow(false);
  }



  const changeHandler = (e) => {
    setEmail(e.target.value);
  };
  const handleEmail = () => {
    if (!validator.isEmail(email)) {
      setValidEmail(false);
      return;
    }
    setValidEmail(true);
    dispatch({
      type: "UPDATE_EMAIL",
      email: email,
    });
    axios.get("https://teleportx.herokuapp.com/getToken").then((res) => {
      dispatch({
        type: "UPDATE_TOKEN",
        jwtToken: res.data,
      });
    });
    setModalShow(false);
  };
  if (modalShow)
    return (
      <Modal
        show
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Kindle email required
          </Modal.Title>
          <a href="https://drive.google.com/file/d/1Xo5WsjVPqEg96g6RR-E4uDLQy8l-hsqz/view?usp=sharing" target="_blank">ℹ Documentation to get started🡕</a>
        </Modal.Header>
        <Modal.Body>
          <h4>Please enter your Kindle email Below</h4>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kindle Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter kindle email"
                onChange={changeHandler}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {!validEmail ? (
            <small className="alertemail">Invalid email</small>
          ) : (
            ""
          )}
          <GoogleLogin
            auto_select
            onSuccess={credentialResponse => {
              oAuthHandler(jwtDecode(credentialResponse.credential));
              console.log(jwtDecode(credentialResponse.credential));
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <Button onClick={handleEmail}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  else
    return (
      <div className="App">
        <Search />
      </div>
    );
}

export default App;
