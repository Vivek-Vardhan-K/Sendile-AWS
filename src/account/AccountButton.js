import React from 'react'
import './AccountButton.css'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import appleLogo from "./../images/apple.png"
import androidLogo from "./../images/android-logo.png"
import ereaderLogo from "./../images/ereader.png"
import ipadLogo from "./../images/ipad.png"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState} from "react";
function AccountButton(props) {
    const [show, setShow] = useState(false);
    const [defDevice, setdefDevice] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const devices = useSelector((state) => state.devicesInfo);
    const googleDetail = useSelector((state) => state.userOAuthDetail);
    
    const emailUpdater=()=>{
      const email='';
      devices.forEach(device=>{
        if(device.deviceId==defDevice){
          email=device.kindleEmail
        }
      })
      dispatch({
        type: "UPDATE_EMAIL",
        email: email,
      });
    }
    const defaultDeviceHandler=(bkey)=>{
      setdefDevice(bkey);
      dispatch({
        type: "UPDATE_DEFAULT_DEVICE",
        defaultDevice: bkey,
      });
      emailUpdater();
    }

    const devElem=devices.map(elem=>{
      const cdecide=defDevice==elem.deviceId?'sel-butt':'unsel-butt';
      const edecide=defDevice==elem.deviceId?'blk-email-txt':'email-txt';
      return (<button className={cdecide} key={elem.deviceId} onClick={()=>{defaultDeviceHandler(elem.deviceId)}}>
        {elem.deviceType==1 && <img src={ipadLogo} className="but-img"></img>}   
        {elem.deviceType==2 && <img src={androidLogo} className="but-img"></img>}   
        {elem.deviceType==3 && <img src={appleLogo} className="but-img"></img>}      
        {elem.deviceType==4 && <img src={ereaderLogo} className="but-img"></img>}   
        <div className='tcell'>{elem.deviceName}</div>
        <div className={edecide}>{elem.kindleEmail}</div>
      </button>)
    })    
  return (
    <div>
      
        <img  src={googleDetail.picture} className={(props.page=="search")?"prof-img":"prof-img-res"}  onClick={handleShow}/>
    
        <Modal show={show} onHide={handleClose} className='ovrd-modal'>
        <Modal.Header>
          <Modal.Title>Your Kindle Emails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table borderless>
            <tbody>
              {devElem}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Logout
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Manage devices
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  )
}

export default AccountButton