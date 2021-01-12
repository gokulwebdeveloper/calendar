import React from "react";
import Calendar from '../Calendar';
const sampleJson = {
      "criticalData": [
              {
                  "amber_time": "2021-01-08 07:22:35",
                  "comments": "Low ASN count Average: 4, Today's Count: 2",
                  "dc": "5830",
                  "end_time": null,
                  "last_update": "2021-01-08 07:22:37",
                  "metrics_name": "ASN",
                  "metrics_type_name": "Business Metrics",
                  "percent_value": null,
                  "red_time": "2021-01-08 05:15:00",
                  "start_time": "2021-01-08 05:15:05",
                  "status_name": "Amber",
                  "sys_id": 1374,
                  "user": "ASN System"
              },           
              {
                  "amber_time": "2021-01-05 18:15:03",
                  "comments": "Orders without Shipments. Count: 67. Percent: 40%",
                  "dc": "5884",
                  "end_time": null,
                  "last_update": "2021-01-06 07:20:07",
                  "metrics_name": "Shipment",
                  "metrics_type_name": "Business Metrics",
                  "percent_value": null,
                  "red_time": "2021-01-06 07:20:07",
                  "start_time": "2021-01-05 18:15:03",
                  "status_name": "Red",
                  "sys_id": 1361,
                  "user": "Shipment System"
              },
              {
                  "amber_time": "2020-12-30 18:15:05",
                  "comments": "Orders without Shipments. Count: 30. Percent: 26%",
                  "dc": "5884",
                  "end_time": null,
                  "last_update": "2020-12-30 18:15:05",
                  "metrics_name": "Shipment",
                  "metrics_type_name": "Business Metrics",
                  "percent_value": null,
                  "red_time": null,
                  "start_time": "2020-12-30 18:15:05",
                  "status_name": "Amber",
                  "sys_id": 1273,
                  "user": "Shipment System"
              },
              {
                  "amber_time": "2020-12-29 21:20:03",
                  "comments": "Orders without Shipments. Count: 100. Percent: 57%",
                  "dc": "5884",
                  "end_time": null,
                  "last_update": "2020-12-30 07:20:02",
                  "metrics_name": "Shipment",
                  "metrics_type_name": "Business Metrics",
                  "percent_value": null,
                  "red_time": "2020-12-30 07:20:02",
                  "start_time": "2020-12-29 18:15:03",
                  "status_name": "Red",
                  "sys_id": 1245,
                  "user": "Shipment System"
              }
          ]
};
export default class Months extends React.Component { 
    render(){
        return(
            <>     
              <Calendar  changeEvent={this.onOpenModal} dataDisplay={sampleJson} /> 
            </>
        )
    }

}