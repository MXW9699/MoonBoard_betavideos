import Moonboard from '../Moonboard/moonboard';
import { Problem } from '../types/types';
import ProblemBox from './problemBox';
import VideoSection from './VideoSection';
import React, { useState, useEffect } from 'react';

let boardLights = new Set<any>();

export default function ProblemsView({ data }: { data: Problem[] }) {
  /*********************************USE STATES********************************************* */
  const [videosToGet, setVideosToGet] = useState(''); //STORE THE PROBLEM NAME THAT THE VIDEOS WILL DEPEND ON
  const [vids, setVids] = useState([]); //ARRAY OF THE VIDEOS LINKS FETCHED
  /*********************************USE EFFECTS************************************************* */

  async function fetchVideos() {
    fetch(`/video/${videosToGet}`)
      .then((data) => data.json())
      .then((data) => {
        setVids(data);
        console.log('i got my vids:', vids);
      })
      .catch(() => console.log('UNABLE TO GET VIDEOS'));
  }

  /**
   * CHANGE WHICH PROBLEM TO VIDEOS FOR
   * @param {string} name problem name string
   * @param {string[]} holds array of holds for that specific problem
   */
  function clickProblem(name: string, holds?: any[]):void{
    boardLights = holds ? new Set(holds) : new Set<any>();
    setVideosToGet(name);
  };

  useEffect(() => {
    fetchVideos();
  }, [videosToGet]);

  return (
    <div className="dataApp">
      <div className="problemSection">
        {data ? (
          <>
            <ProblemBox problemList={data} clickProblem={clickProblem} />
            <Moonboard boardLights={boardLights} />
          </>
        ) : (
          <h1 style={{ color: 'white' }}>loading...</h1>
        )}
      </div>
      <b>VIDEOS BELOW</b>
      <p>{videosToGet}</p>
      <VideoSection vids={vids} />
    </div>
  );
}
