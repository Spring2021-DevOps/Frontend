import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import TweetList from "./TweetList";
//import axios from 'axios';

const THome = () => {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);   
  
  useEffect(() => {
    const fetchData = async () => {
    //  const res = await fetch("http://0.0.0.0:5000/bookings");
	  const res = await fetch("http://3.218.217.147:5000/bookings");
      const { results } = await res.json();
      console.log(results);
      setBookings([...results]);
	  setLoading(false);
    };
 
    fetchData();
  }, []);

  return (
    <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
	  {loading ? (
	    <ActivityIndicator
		  style={[styles.centering]}
		  color="#ff8179"
		  size="large"
	    />
	  ) : (
	    <TweetList bookings={bookings} />
	  )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    marginTop: '60px',
    opacity: 0.8
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: "100vh"
  }
});

export default THome;
