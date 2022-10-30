import React from 'react'
import './AccountButton.css'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
function AccountButton() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>
        <img  src="https://lh3.googleusercontent.com/a/ALm5wu1xp8mF0zFYC8Y_6QaLhu86MYIZEau9ww2HO08ysJw=s96-c" className="prof-img"  onClick={handleShow}/>
    
        <Modal show={show} onHide={handleClose} className='ovrd-modal'>
        <Modal.Header>
          <Modal.Title>Your Kindle Emails</Modal.Title>
        </Modal.Header>
        <Modal.Body>vivekvarma17@kindle.com</Modal.Body>
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