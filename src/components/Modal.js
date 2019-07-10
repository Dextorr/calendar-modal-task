import React from 'react'

class Modal extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      displayed: false,
      currentMonths: []
    }

    this.collapseModal = this.collapseModal.bind(this)
  }

  collapseModal(){
    this.setState({ displayed: false })
    setTimeout(this.props.handleModal, 500)
  }

  componentDidMount(){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const currentMonths = []

    this.props.dates.forEach(date => {
      const currentMonth = months[date.date.getMonth()]
      if(!currentMonths.includes(currentMonth)) currentMonths.push(currentMonth)
    })

    // Timeout to ensure that the modal animation starts after the component is rendered initially
    setTimeout(() => this.setState({ displayed: true, currentMonths }), 1)
  }

  render(){
    return (
      <div className={`modal ${this.state.displayed ? 'displayed':''}`}>

        <div className="modal-background" onClick={this.collapseModal}>
        </div>

        <div className="modal-calendar">

          <h2>{this.state.currentMonths.join('/')}</h2>

          <div className="days">
            {this.props.dates.map((date, i) => {
              const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
              if (i<=6)return <p key={i}>{days[date.date.getDay()]}</p>
            })}
          </div>

          <div className="dates">
            {this.props.dates.map((date, i) => {
              return <div
                key={i}
                className={`${
                  date.is_deliverable ?
                    '':'disabled'} ${
                  date.date.getTime() === this.props.selected.date.getTime() ?
                    'selected':''}`}
                data-date={date.date}
                // Only deliverable dates are clickable
                onClick={date.is_deliverable ? this.props.handleDate:null}
              >
                <span className="date-num">
                  {date.date.getDate()}
                </span>
              </div>
            }
            )}
          </div>

          <div className="button" onClick={this.collapseModal}>
            <span>GOT IT</span>
          </div>

        </div>

      </div>
    )
  }

}

export default Modal
