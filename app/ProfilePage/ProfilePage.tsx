import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FONT_GRADES, Problem } from '../types/types';
import ProfileVideoSection from './ProfileVideoSection';

export default function ProfilePage() {
  const [videos, setVideos] = useState([]);
  const [tab, setTab] = useState('MoonBoard2019');
  const [user, setUser] = useState('1');

  async function fetchVideos() {
    fetch(`/video/user/${user}`)
      .then((data) => data.json())
      .then((data) => {
        const alphabetize = data.sort((a: any, b: any) => {
          return a.problemName.localeCompare(b.problemName);
        });
        const sortedData = alphabetize.sort((a: any, b: any) => {
          return (
            FONT_GRADES[a.Problems_2019.grade as keyof typeof FONT_GRADES] -
            FONT_GRADES[b.Problems_2019.grade as keyof typeof FONT_GRADES]
          );
        });
        setVideos(sortedData);
      })
      .catch(() => console.log('UNABLE TO GET VIDEOS'));
  }

  useEffect(() => {
    fetchVideos();
  }, [user]);

  return (
    <>
      <div>welcom to my profile</div>
      <Link to={'/data'}>Back to data</Link>
      <button onClick={() => setTab('MoonBoard2016')}>MoonBoard2016</button>
      <button onClick={() => setTab('MoonBoard2019')}>MoonBoard2019</button>
      <button onClick={() => setTab('TensionBoard')}>TB2Spray</button>
      <button onClick={() => setTab('TensionBoard2Mirror')}>TB2Mirror</button>
      {/* <input
        type="text"
        onChange={(e) => {
          setUser(e.target.value);
        }}
        value={user}
      /> */}
      <h1>{`${tab} is selected`}</h1>
      <ProfileVideoSection videos={videos} />
    </>
  );
}
