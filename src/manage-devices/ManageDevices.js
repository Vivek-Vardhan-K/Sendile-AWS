import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import validator from "validator";
import cst from "../constants/constants";

function ManageDevices() {
  const [kindleEmail, setKindleEmail] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(1);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const userDetail = useSelector((state) => state.userDBinfo);
  const dispatch = useDispatch();
  const handleKindleEmail = (e) => {
    console.log(e.target.value);
    setKindleEmail(e.target.value);
  };

  const deviceChangeHandler = (e) => {
    console.log(e.target.value);
    setSelectedDevice(e.target.value);
  };

  const handleSubmit = () => {
    if (!validator.isEmail(kindleEmail)) {
      setIsValidEmail(false);
      return;
    } else {
      setIsValidEmail(true);
      axios({
        method: "post",
        url: cst.base_url + "create-device/",
        data: {},
        headers: {
          kindleMail: kindleEmail,
          deviceType: selectedDevice,
          accountId: userDetail.accountId,
        },
      }).then((r) => {
        dispatch({
          type: "SHOW_MANAGE_DEVICES",
        });
        axios
          .get(
            cst.base_url + "get-all-devices-for-user/" + userDetail.accountId
          )
          .then((devres) => {
            dispatch({
              type: "UPDATE_USER_DEVICE_INFO",
              userDeviceInfo: devres.data,
            });
          });
      });
    }
  };

  return (
    <div>
      <Modal show centered size="lg">
        <Modal.Header>
          <Modal.Title>Add Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label for="exampleInputEmail1">Kindle Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={handleKindleEmail}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label class="mr-sm-2" for="inlineFormCustomSelect">
              Device Type
            </label>
            <select
              class="custom-select mr-sm-2"
              id="inlineFormCustomSelect"
              onChange={deviceChangeHandler}
            >
              <option value="1">iPad</option>
              <option value="2">Android Device</option>
              <option value="3">iPhone</option>
              <option value="4">Kindle eReader</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!isValidEmail && <h4>*Not a valid email</h4>}
          <Button onClick={handleSubmit}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManageDevices;
