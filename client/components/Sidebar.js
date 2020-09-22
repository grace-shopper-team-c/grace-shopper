import React from 'react'
import {connect} from 'react-redux'

import styled from 'styled-components'

/* This defines the actual bar going down the screen */
const StyledSideNav = styled.div`
  height: 100%;
  width: 100px; /* Set the width of the sidebar */
  z-index: 1; /* Stay on top of everything */
  top: 3.4em; /* Stay at the top */
  background-color: gray;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 10px;
  color: white;
`

class Sidebar extends React.Component {
  render() {
    return (
      <StyledSideNav>
        <h2>All Products</h2>
        <h2>Skin Care</h2>
        <h2>Hair Care</h2>
        <h2>Cleaning Products</h2>
        <h2>Candles</h2>
      </StyledSideNav>
    )
  }
}

export default Sidebar
