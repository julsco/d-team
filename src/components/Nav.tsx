import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "../img/logo.png";
import SignIn from './login-signin/sign';
import Login from "./login-signin/Login";
    
function Navigator() {
    
    /*Handle login in modal*/
    const [showLog, setShowLog] = useState(false);
  
    const handleCloseLog = () => setShowLog(false);
    const handleShowLog = () => setShowLog(true);
    
    const loginForm = Login();

    /*Handle Sign in modal*/
    const [showSign, setShowSign] = useState(false);
  
    const handleCloseSign = () => setShowSign(false);
    const handleShowSign = () => setShowSign(true);
    
    const signinForm = SignIn();
    

    return (
    <>
      
      <Navbar bg="dark" variant="dark">
        <Container>
          
          <div>
            <Button className='btn-success' onClick={handleShowLog}>Log in</Button>{' '}
            
            <Offcanvas show={showLog} onHide={handleCloseLog}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Log in</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {loginForm}
                </Offcanvas.Body>
            </Offcanvas>

            <Button variant="outline-success" onClick={handleShowSign}>Sign up</Button>{' '}
            <Offcanvas show={showSign} onHide={handleCloseSign}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Sign up</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {signinForm}
                </Offcanvas.Body>
            </Offcanvas>
            
          </div>

          <Navbar.Brand href="/">
            <img
              alt="logo"
              src={logo}
              width="150"
              height="150"
              className="d-inline-block align-top"
            />{' '}
            
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigator;