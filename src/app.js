import React from 'react'
import ReactDOM from 'react-dom'

import Delivery from './components/Delivery'
import Modal from './components/Modal'
import data from './assets/data/dates'

import './style.scss'

class App extends React.Component{
  constructor(){
    super()

    this.state = {
      selectedDate: null,
      modal: false
    }

    this.handleModal = this.handleModal.bind(this)
  }

  componentDidMount(){
    // Convert dates from strings to Date objects
    const dates = data.dates.map(date => {
      return {
        ...date,
        date: new Date(date.date)
      }
    })
    // Set selectedDate to be first deliverable date
    const selectedDate = data.dates.filter(date => date.is_deliverable)[0]
    selectedDate.date = new Date(selectedDate.date)
    this.setState({ dates, selectedDate })
  }

  handleModal(e){
    e.preventDefault()
    this.setState({ modal: !this.state.modal })
  }

  render(){
    if (!this.state.selectedDate) return null
    return(
      <div>
        {
          this.state.modal ?
            <Modal handleModal={this.handleModal} />
            :
            <Delivery selected={this.state.selectedDate} handleModal={this.handleModal} />
        }
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
