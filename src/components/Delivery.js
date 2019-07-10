import React from 'react'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
          {`${days[selected.date.getDay()]} ${months[selected.date.getMonth()]} ${selected.date.getDate()}`}
        </p>
        <a href="" onClick={handleModal}>Change</a>
      </div>

    </div>
  )

}

export default Delivery
