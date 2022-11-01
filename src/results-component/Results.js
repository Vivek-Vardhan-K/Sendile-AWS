import React from "react";
import "./Results.css";
import icon from "./kindle.png";
import axios from "axios";
import logo from "./../search-component/main-logo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { useDispatch } from "react-redux";
import "react-notifications/lib/notifications.css";
import cst from "../constants/constants";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import AccountButton from "../account/AccountButton";

function Results(props) {
  const [input, setinput] = useState(props.phold);
  const[kEmail,setKEmail] = useState('');
  const isLoading = useSelector((state) => state.isLoading);
  const token = useSelector((state) => state.jwtToken);
  const email = useSelector((state) => state.email);
  const dispatch = useDispatch();
  const toSpin = () => {
    dispatch({
      type: "SWITCH_LOADING",
    });
  };
  const byCaller=(mirrorLink,title)=>{
    setKEmail(email);
    console.log(email);
    axios({
      method: "post",
      url: cst.base_url+"send-to-kindle/",
      data: {},
      headers: {
        kindleEmail: email,
        resLink: mirrorLink
      },
    }).then(
      NotificationManager.success("Sent to Kindle", title)
    );
  }

  const searcher=()=>{
    return !isLoading
      ? () => {
          props.trig(input);
        }
      : null
  }
  if (props.bookData !== undefined) {
    var listItems = props.bookData.map((elem) => (
      <tr key={elem.id} scope="row">
        <td className="rowdet">{elem.id}</td>
        <td className="rowdet">
          <a href="#">{elem.author}</a>
        </td>
        <td className="rowdet">{elem.title}</td>
        <td className="rowdet">{elem.year}</td>
        <td className="rowdet">{elem.size}</td>
        <td className="rowdet">
          <a href="#" title="">
            <img
              src={icon}
              className="resz zoom"
              onClick={() => {
                byCaller(elem.mirror1,elem.title);
              }}
            />
          </a>
        </td>
      </tr>
    ));
  }
  return (
    <div>
      <div class="container">
        <img src={logo} alt="Logo" className="rect-logo" />
          <InputGroup className="mb-3 sch">
            <FormControl
            type="search"
              className="form-inp extd common"
              placeholder="Search with Title"
              value={input}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  searcher();
                }
              }}
              onChange={(e) => {
                setinput(e.target.value);
              }}
            />
            <Button
              variant="outline-primary"
              id=" btride"
              className="common"
              onClick={searcher()}
            >
              {isLoading ? "searching" : "Search"}
            </Button>
          </InputGroup>

        {isLoading ? <div className="loader"></div> : ""}
        <AccountButton page="results"/>
      </div>
        
      <Table striped bordered hover className="tab-mod">
        <thead>
          <tr>
            <th scope="col" className="rowdet">
              Index
            </th>
            <th scope="col" className="rowdet">
              Author
            </th>
            <th scope="col" className="rowdet">
              Book Name
            </th>
            <th scope="col" className="rowdet">
              Year
            </th>
            <th scope="col" className="rowdet">
              Size
            </th>
            <th scope="col" className="rowdet">
              Send to Kindle
            </th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </Table>
      <NotificationContainer />
    </div>
  );
}

export default Results;
