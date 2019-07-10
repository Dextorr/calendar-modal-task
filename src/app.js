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
    this.handleDate = this.handleDate.bind(this)
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
    // Prevent change 'a' tag from refreshing the page
    if(e) e.preventDefault()
    this.setState({ modal: !this.state.modal })
  }

  handleDate({ target }){
    const selectedDate = {
      ...this.state.selectedDate,
      date: new Date(target.dataset.date)
    }
    this.setState({ selectedDate })
  }

  render(){
    if (!this.state.selectedDate) return null

    return(
      <div>

        <Delivery
          selected={this.state.selectedDate}
          handleModal={this.handleModal}
        />

        {this.state.modal &&
          <Modal
            handleModal={this.handleModal}
            dates={this.state.dates}
            selected={this.state.selectedDate}
            handleDate={this.handleDate}
          />
        }

      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
