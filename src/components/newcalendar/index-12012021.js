import React from "react";
import moment from "moment";


export default class Calendar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showCalendarTable: true,
      dateObject: moment().subtract(props.month, 'month'),
      selectedDay: null
    };
  }
  weekdayshort = moment.weekdaysShort();

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };

  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
  };


  onDayClick = (e, d) => {
    this.setState(
      {
        selectedDay: d
      },
      () => {
        console.log("SELECTED DAY: ", this.state.selectedDay);
      }
    );
  };
  render() {
    let weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty" key={`empty${i}`}>{""}</td>);
    }
    let daysInMonths = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay ="";
      if(this.props.month == 0){
         currentDay = d == this.currentDay() ? "today" : "";
      }
     
      // let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
      daysInMonths.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={e => {
              this.onDayClick(e, d);
            }}
          >
            {d}
          </span>
          <span className="greenTag" onClick={this.props.changeEvent}>&nbsp;</span>
        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonths];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <div className="tail-datetime-calendar">
        <div className="calendar-navi">
           {!this.state.showMonthTable && !this.state.showYearEditor && (
            <span
             className="calendar-label"
            >
              {this.month()},
            </span>
          )}
          <span>
            {this.year()}
          </span>

        
        </div>
          <div className="calendar-date">
            <table className="calendar-day">
              <thead>
                <tr>{weekdayshortname}</tr>
              </thead>
              <tbody>{daysinmonth}</tbody>
            </table>
          </div>
      </div>
    );
  }
}