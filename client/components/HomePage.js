import React from 'react'
import AllItems from './AllItems'
import Sidebar from './Sidebar'

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="main">
        <Sidebar />
        <AllItems />
      </div>
    )
  }
}
