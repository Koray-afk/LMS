import React from 'react'
import { Outlet } from 'react-router-dom'

function Educator() {
  return (
    <div>
      these are the educators 
      <div>
        {<Outlet/>}
      </div>
    </div> 
  )
}

export default Educator
