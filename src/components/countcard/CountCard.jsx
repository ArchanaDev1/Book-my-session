import "./countcard.css"

import React from 'react'

const CountCard = (props) => {
  return (
    <div className={`card ${props.bgcolor} ${props.color}`}>
      <div className="card-name">{props.name}</div>
      <div className="card-count">{props.count}</div>
    </div>
  )
}

export default CountCard
