import React from 'react'

const Delivery = () => {

  return(
    <div className="delivery">
      <h1>Choose your delivery day</h1>
      <div className="free-delivery">
        <span className="van">
          <img src="../assets/images/van.svg" alt="delivery van icon" />
        </span>
        <p>
          Delivery is always free
        </p>
      </div>
      <div className="delivery-date">
        <span className="calendar">
          <img src="../assets/images/calendar.svg" alt="calendar icon" />
          <p>01</p>
        </span>
        <p>
          Delivery Date
        </p>
        <a href="">Change</a>
      </div>
    </div>
  )

}

export default Delivery
