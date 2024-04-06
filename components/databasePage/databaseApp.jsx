import Moonboard from '../Moonboard/moonboard.jsx';
import ProblemBox from './problemBox.jsx';
import VideoSection from './videosSection.jsx';
import React, { useState, useEffect } from 'react';

let boardLights = new Set();

const databaseApp = ({search}) => {
  /*********************************USE STATES********************************************* */
  const [data, setdata] = useState(['help', 'me', 'find', 'problems']); //PROBLEM LIST
  const [videosToGet, setVideosToGet] = useState(''); //STORE THE PROBLEM NAME THAT THE VIDEOS WILL DEPEND ON
  const [vids, setVids] = useState([]); //ARRAY OF THE VIDEOS LINKS FETCHED
  // const [boardLights, setboardLights] = useState([]);
  /*********************************USE EFFECTS************************************************* */

  //ON FIRST RENDER
  //fetch problems from database on first render

  useEffect(() => {
    const fetchData = async (search) => await fetch(`/problemList/${search}`);
    //create async function to fetch data
    fetchData(search)
      //convert data recieved to JS readable
      .then((data) => data.json())
      //set the state variable so the section re-renders
      .then((data) => setdata(data))
      .catch(() => console.log('COULD NOT GET PROBLEM LIST'));
    return () => {};
  }, [search]);

  //PROBLEM NAME OF VIDEO DEPENDENT.
  //useEffect to fetch videos & to get the holds list and store it
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
      .catch(() => console.log('UNABLE TO GET VIDEOS'));
    return () => {};
  }, [videosToGet]);

  /*****************************CLICK HANDLERS ********************************************** */
  //PROBLEM LIST CLICK -> CHANGE WHICH PROBLEM TO VIDEOS FOR
  //@PARAMS {string} _id - problem name string
  //@PARAMS {array} holds - array of holds for that specific problem
  const clickProblem = (_id, holds) => {
    boardLights = holds ? holds : [];
    //console.log('the holds are:', boardLights);
    boardLights = new Set(boardLights);
    setVideosToGet(_id);
  };


  /*****************************SEARCH HANDLERS ********************************************** */
const searchHandler = (e) =>{
  setSearch(e.target.value)
}

  return (
    <div className="dataApp">
      <div className="problemSection">
        <ProblemBox problemList={data} clickProblem={clickProblem} />
        <Moonboard boardLights={boardLights} />
      </div>
      <b>VIDEOS BELOW</b>
      <p>{videosToGet}</p>
      <VideoSection vids={vids} />
    </div>
  );
};

export default databaseApp;
