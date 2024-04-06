import React from 'react'

const Spinner = ({small}) => {
  return (
      <div className={`spinner ${small && "scale-50"}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
  )
}

export default Spinner