import React from 'react'
import {Bar} from 'react-chartjs-2';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

require('dotenv').config()

const { REACT_APP_API_SERVICE_URL} = process.env;





export default class Charts extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            labels: ['January', 'February', 'March'],
            datasets: [
                       {
                         label: 'Rainfall',
                         backgroundColor: 'rgba(75,192,192)',
                         borderColor: 'rgba(0,0,0,1)',
                         borderWidth: 2,
                         data: [65, 59, 80]
                       }
                     ],
                     options : {
                        scales: {
                            xAxes: [{
                                barPercentage: 0.1
                            }]
                        }
                     }
                    };
      }
      async componentDidMount() {
        console.log("I am in mount");
    //     var url = "http://aa1f1319b43a64c5388b2505b86edfe8-1002164639.us-east-1.elb.amazonaws.com:5000/analysis"
      var url = `${process.env.REACT_APP_API_SERVICE_URL}:5000/analysis`


        await axios(url).then(
            (response) => {
                this.setState({
                    labels: response.data.city,
                    datasets: [
                        {
                          label: "Bookings",
                          backgroundColor: 'lightblue',
                          borderColor: 'rgba(0,0,0,1)',
                          borderWidth: 2,
                          data: response.data.count,
                          barThickness:70
                        }
                      ]
                });
                console.log(response.data.city);
              },
              (error) => {
                this.setState({
                  isLoaded: false,
                  lyrics: "",
                  error: error,
                });
                console.log(error);
              }
            );
      }

      render() {
          return( 
            <Paper style={{opacity:0.7,backgroundColor:'black',padding:100}} elevation={3}>
          <div style = {{ marginTop : 30 }}>
            <Bar
              data={this.state}
              options={{
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: "white",
                            fontSize:18
                        }
                    }],
                    yAxes: [{
                        fontColor: "white",
                        ticks: {
                            beginAtZero: true,
                            fontColor: "white",
                            fontSize:20,
                            stepSize: 1
                        }
                    }]
                },
                title:{
                  display:true,
                  text:'Most visited destinations',
                  fontSize:20,
                  fontColor: "white",
                },
                legend:{
                  display:true,
                  position:'right'
                  
                }
              }}
            />
          </div>
          </ Paper>
          );

}
}
