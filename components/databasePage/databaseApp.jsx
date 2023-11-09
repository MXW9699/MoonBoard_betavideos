import Moonboard from '../moonboard.jsx';
import ProblemBox from './problemBox.jsx';
import VideoSection from './videosSection.jsx';
import React, { useState, useEffect } from 'react';

const databaseApp = () => {
  //get list of problems and inject it to every problem box
  const [data, setdata] = useState(['help', 'me', 'find', 'problems']);
  const [videosToGet, setVideosToGet] = useState('');
  const [vids, setVids] = useState([]);

  //fetch problems from database on first render
  useEffect(() => {
    //create async function to fetch data
    const fetchData = async () => await fetch('/problemList');
    fetchData()
      //convert data recieved to JS readable
      .then((data) => data.json())
      //set the state variable so the section re-renders
      .then((data) => setdata(data))
      .catch(() => console.log('you fucked up'));
    return () => {};
  }, []);

  //click hander for pressing problem
  const clickProblem = (_id) => {
    //get the ID from the evenObj which will be used as index in boxState
    // const key = eventObj.target;
    setVideosToGet(_id);
  };

  //useEffect to fetch videos
  useEffect(() => {
    //create async function to fetch data
    const fetchData = async () => await fetch(`/video/${videosToGet}`);
    fetchData()
      //convert data recieved to JS readable
      .then((data) => data.json())
      //set the state variable so the section re-renders
      .then((data) => {
        setVids(data);
        console.log('i got my vids:', vids);
      })
      .catch(() => console.log('you fucked up'));
    return () => {};
  }, [videosToGet]);

  return (
    <div className="dataApp">
      <div className="problemSection">
        <ProblemBox problemList={data} clickProblem={clickProblem} />
        <Moonboard />
      </div>
      <b>VIDEOS BELOW</b>
      <p>{videosToGet}</p>
      <VideoSection vids={vids} />
    </div>
  );
};

export default databaseApp;
