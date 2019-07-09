import React from 'react'

class Modal extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      displayed: false
    }

    this.collapseModal = this.collapseModal.bind(this)
  }

  collapseModal(){
    this.setState({ displayed: false })
    setTimeout(this.props.handleModal, 500)
  }

  componentDidMount(){
    setTimeout(() => this.setState({ displayed: true }), 10)
  }

  render(){
    return (
      <div className={`modal ${this.state.displayed ? 'displayed':''}`}>
        <div className="modal-background" onClick={this.collapseModal}>
        </div>
        <div className="modal-calendar">
        </div>
      </div>
    )
  }

}

export default Modal
