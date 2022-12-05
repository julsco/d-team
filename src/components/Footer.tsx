import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import { GoMarkGithub } from "react-icons/go";

export default function Footer() {
  return (
    <MDBFooter className='bg-dark text-center text-white'>
      

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Copyright: &nbsp;&nbsp;
        <a className='text-white' href='https://github.com/julsco/d-team'>
            <GoMarkGithub />
        </a>
      </div>
    </MDBFooter>
  );
}