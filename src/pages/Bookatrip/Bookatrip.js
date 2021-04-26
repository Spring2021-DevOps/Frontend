import { useHistory } from 'react-router-dom'
import { saveAuthorisation, isAuthorised } from '../../utils/auth'
//import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
//import Button from '@material-ui/Button'
import Paper from '@material-ui/core/Paper'
//import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'
import { Link } from 'react-router-dom'
import Autocomplete from "react-google-autocomplete";
import MapContainer from '../../components/MapContainer'



const mapStyles = {
  width: '10%',
  height: '10%'
};

const localStorageAuthKey = 'twtr:auth';
function getAccessToken() {
  if (typeof Storage !== 'undefined') {
      try {
        var keys = JSON.parse(localStorage.getItem(localStorageAuthKey));
        return keys.access;
        // the refresh token is keys.refresh

      } catch (ex) {
          console.log(ex);
      }
  } else {
      // No web storage Support :-(
  }
}

let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
var tempDate = new Date();

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(720 + theme.spacing(6))]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
      opacity:0.85
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `100%`,
  },
  map: {
    display: 'flex',
    padding:'20px',
    marginLeft:'175px'

  }
}))

const Bookatrip = () => {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('');

  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [journeyDate, setJourneyDate] = useState('');


    // async launch POST with access token
    const postTweet = async (sourceP, destinationP, journeyDateP) => {
      const access_token = getAccessToken();
      console.log('access_token:');
      const user = localStorage.getItem("username");
      console.log(access_token);
      const paramdict = {
        'user': user,
        'sourceP': sourceP,
        'destinationP': destinationP,
        'journeydDateP': journeyDateP,
        'access-token': access_token
      }

    console.log('postTweet paramdict:');
    console.log(paramdict);
    console.log(localStorage.getItem(username));

    if (user == null){
      alert("Please login to Book a Trip!");
    }

    else{
      alert("Your trip has been Booked!");
    try {
      const config = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(paramdict)
      }
      
      //print("Compose.js: fetching from " + `${process.env.REACT_APP_API_SERVICE_URL}/tweet`)
      //const response = await fetch("http://localhost:5000/tweet", config);
      //const response = await fetch(`${process.env.REACT_APP_BE_NETWORK}:${process.env.REACT_APP_BE_PORT}/tweet`, config);
      //const response = await fetch(`${process.env.REACT_APP_API_SERVICE_URL}/tweet`, config);
   // const response = await fetch("http://aa1f1319b43a64c5388b2505b86edfe8-1002164639.us-east-1.elb.amazonaws.com:5000/book-trip", config);
      //const response = await fetch("http://localhost:5000/book-trip", config);
      const response = await fetch(`${process.env.REACT_APP_API_SERVICE_URL}:5000/book-trip`, config);
     //const response = await fetch("http://localhost:5000/book-trip", config);
     // const json = await response.json()
     // if (response.ok) {
          //return json
          //return response
     //     console.log("success on send.");
          
     // } else {
     //     alert("response: " + response.toString());
     // }

      try {
        const data = await response.json();
        console.log("on reply:")
        console.log(data);

        // back to landing page!
        history.push("/");
        
        history.push(data);
      } catch (err) {
        console.log(err);
        alert("exception on reply!");
      }

    } catch (error) {
      console.log(error);
      alert("exception on send");
    }
  }
  };


  function handleSubmit(event) {
    event.preventDefault()

    const priv = true;
    //const username = 'Elon Musk';
    //const myArray = [
    //  "women",
    //  "men"
    // ];
    //const img_gender = myArray[Math.floor(Math.random()*myArray.length)];
    //const img_index = Math.floor(Math.random() * 100) + 1 ;
    //const img_url = 'https://randomuser.me/api/portraits/' + img_gender + '/' + img_index.toString() + '.jpg';
    
    postTweet(source, destination, journeyDate);  
   // postTweet(username, tweet, priv, img_url);  

   
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {'Book an UBER Bus Trip'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} >

            <TextField
             value={source} 
               onInput={(e) => setSource(e.target.value)} 
               variant="outlined" 
               margin="normal" 
               required 
               fullWidth 
               id="source" 
               label={'Source'} 
               name="source" 
               autoComplete="source" 
               autoFocus 
             /> 
           
            <TextField
              value={destination}
              onInput={(e) => setDestination(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="destination"
              label={'Destination'}
              name="destination"
              autoComplete="destination"
              autoFocus
            />


            <TextField
              value={journeyDate}
              onInput={(e) => setJourneyDate(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="journeyDate"
              label={'Journey Date'}
              type="date"
              name="journeyDate"
              autoComplete="journeyDate"
              inputProps={{
                min: `${tempDate.getFullYear()}-${formatTwoDigits(tempDate.getMonth()+1)}-${formatTwoDigits(tempDate.getDate())}`,
                max: `${tempDate.getFullYear()}-${formatTwoDigits(tempDate.getMonth()+3)}-${formatTwoDigits(tempDate.getDate())}`
              }}
              autoFocus
            />

            <Button
              style={{ background: 'black' }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {'Submit'}
            </Button>

            

            <br/><br/><br/>
      <MapContainer />

          </form>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
          </div>
      
        </div>

      </Paper>


    </React.Fragment>
  )
}

export default Bookatrip