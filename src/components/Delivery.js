import React from 'react'

const Delivery = ({ selected, handleModal }) => {

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
          <p>{selected.date.getDate()}</p>
        </span>
        <p>
          {selected.date.toString().substr(0, 10)}
        </p>
        <a href="" onClick={handleModal}>Change</a>
      </div>
    </div>
  )

}

export default Delivery
