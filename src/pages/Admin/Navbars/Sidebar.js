import React from 'react'
import {Container} from 'react-bootstrap'
import ReactSidebar from './ReactSidebar';
import {sidebarItems} from '../Navbars/SideMenu_Data';

const Sidebar = () => {

      
  return (
    <div className='rounded position-fixed'>
     <Container fluid className='d-sm-none sidebar  d-md-none d-lg-block d-xxl-block d-xl-block  justify-content-start align-items-start d-none ' style={{height:"92vh",width:"100%",overflowY:"hidden",marginLeft:"-24px"}} >
    <ReactSidebar sidebarItems={sidebarItems}/>
     
    </Container> 
    
    </div>
  )
}

export default Sidebar
