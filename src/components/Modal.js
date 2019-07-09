import React from 'react'

const Modal = ({ handleModal }) => {

  return (
    <div className="modal">
      <div className="modal-background" onClick={handleModal}>
      </div>
      <div className="modal-calendar">
      </div>
    </div>
  )

}

export default Modal
