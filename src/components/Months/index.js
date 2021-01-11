import React from "react";
import Calendar from '../Calendar';
const questionsMap = [0,1,2,3,4,5,6,7,8,9,10,11];
export default class Months extends React.Component {

    render(){
        return(
            <>
             {questionsMap.map(i => {
                return (<>
                    <Calendar month={i} />              
                </>) 
             })}
            </>
        )
    }

}