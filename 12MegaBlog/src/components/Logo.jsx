import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div>
      <img width={width} src="./blog-logo-removebg.png" alt="Logo" />
    </div>
  )
}

export default Logo