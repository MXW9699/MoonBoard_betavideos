import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isButtonElement } from 'react-router-dom/dist/dom';
import VideoSection from '../databasePage/VideoSection';

export default function ProfilePage() {
  const [videos, setVideos] = useState([]);
  const [tab, setTab] = useState('MoonBoard');
  const [user, setUser] = useState('0');

  async function fetchVideos() {
    fetch(`/video/user/${user}`)
      .then((data) => data.json())
      .then((data) => {
        setVideos(data);
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
      <button onClick={() => setTab('MoonBoard2016')}>MoonBoard</button>
      <button onClick={() => setTab('MoonBoard2019')}>MoonBoard</button>
      <button onClick={() => setTab('TensionBoard')}>TensionBoard</button>
      <button onClick={() => setTab('TensionBoard2Mirror')}>
        TensionBoard2Mirror
      </button>
      <input
        type="text"
        onChange={(e) => {
          setUser(e.target.value);
        }}
        value={user}
      />
      <h1>{`${tab} is selected`}</h1>
      {videos && <VideoSection vids={videos} />}
    </>
  );
}
