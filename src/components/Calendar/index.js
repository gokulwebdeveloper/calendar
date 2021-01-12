import React from "react";
import moment from "moment";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
var currentDate = moment().format('YYYY-MM-DD');
console.log(currentDate);
export default class Calendar extends React.Component {
  state = {
    open: false,
    selectedContent:[]
  };

  onOpenModal = () => {
  this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getMonth = (monthValue) => {
      return ( 
        <span className="calendar-label">
          {moment().subtract(monthValue, 'month').format("MMMM")}
        </span>
      );
  }

  checkStatus = (presentDate) => {
    const currentvalue = this.props.dataDisplay.criticalData;
     const datavalue = [];
    const chkValue =  currentvalue.map(val => {
        const startDate = moment(val['start_time']).format('YYYY-MM-DD');
        if(startDate === presentDate){         
          datavalue.push(val)
          return (
              <span className={`tagDisplay red`} onClick={()=>this.onDayClick(datavalue)}>&nbsp;</span>
          )
        }else{
          return null;
        }
    })
      
      return chkValue;
  }

  getYear = (monthValue) => {
    return (  
      <span>
        {moment().subtract(monthValue, 'month').format("Y")}
      </span>
    );
  }

  weekdayshort = moment.weekdaysShort();

  getWeekShortName = () => {

    const weeks =  this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });

    return weeks;
  }

  onDayClick = (newData) => {
    console.log("newdata",newData);
    this.setState({
      selectedContent:newData
    },this.onOpenModal()); 
      
  };

  convertToDays = (monthValue) => {  
    const month = moment().subtract(monthValue, 'month').format("MM");
    const year = moment().subtract(monthValue, 'month').format("YYYY");
    const totalDays = moment().subtract(monthValue, 'month').daysInMonth();
    let firstDay = moment().subtract(monthValue, 'month').startOf("month").format("d");
 
    let numberDays=[];
    let blanks = [];

    for (let i = 0; i < firstDay; i++) {
      blanks.push(<td className="calendar-day empty" key={`empty${i}`}>{""}</td>);
    }
    
    for(let i=1; i<=totalDays; i++){ 
      const newDate =year+"-"+month+"-"+i; 
      const presentDate = moment(newDate).format('YYYY-MM-DD'); 

      var currentDay ="";
      if(presentDate === currentDate){
        currentDay = "today";
      }

      
      numberDays.push( 
        <td key={i} className={`calendar-day ${currentDay}`}>
          <span>
            {i}   
            {this.checkStatus(presentDate,i)}        
          </span>
          
        </td>
      );
    }

    let totalSlots = [...blanks, ...numberDays];
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

    return daysinmonth;

  }
    
  getTotalDays = (monthValue) => {
    const totalCountDays = this.convertToDays(monthValue);
    return totalCountDays;
  }

  popUpContent = (val) => {
    const renderPopup = val.map(content =>{
      return(
            <div class="popContent">
               <h2>{content.metrics_name}</h2>
                <p>Dc Number : {content.dc}</p>
                <p>User    : {content.user}</p>
                <p>Comments : {content.comments}</p>
                <p>Metrics Name : {content.metrics_name}</p>
                <p> Date Time : {content.start_time}</p>
                <p> Status : {content.status_name}</p>
            </div>
      );     
    });
    return renderPopup;
  }

  render(){
    const monthMap =[0,1,2,3,4,5,6,7,8,9,10,11];
    const { open } = this.state;
    return(
      <>
       {monthMap.map(i => {      
          return (<>   
          <div className="tail-datetime-calendar">
            <div className="calendar-navi">
              <span
              className="calendar-label"
              >
                {this.getMonth(i)}
                
              </span>
              {this.getYear(i)}
            </div>
            <div className="calendar-date">
              <table className="calendar-day">
                <thead>
                  <tr>{this.getWeekShortName()}</tr>
                </thead>
                <tbody>{this.getTotalDays(i)}</tbody>
              </table>
             </div>
          </div>
          </>
        )
        })} 
        <Modal open={open} onClose={this.onCloseModal}>
           {this.popUpContent(this.state.selectedContent)}
        </Modal>
      </>
    );
  }
}