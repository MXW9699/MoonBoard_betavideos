import React, { ReactElement } from 'react';
import Collapsable from '../UI Components/Collapsable';
import VideoSection from '../databasePage/VideoSection';

export default function ProfileVideoSection({ videos }: { videos: any }) {
  /**
   * Iterate through the array creating collapsable sections for each grade
   * @param videos
   * @returns
   */
  function MakeVideoCollapsables(videos: any): ReactElement[] | null {
    if (videos.length == 0) return null;
    if (!videos[0].Problems_2019) return null;
    const collapsables: ReactElement[] = [];

    let currentGrade = videos[0].Problems_2019?.grade ?? '';
    let start = 0;

    for (let i = 0; i < videos.length; i++) {
      if (currentGrade != videos[i].Problems_2019.grade) {
        const videoSlice = videos.slice(start, i);
        collapsables.push(
          <Collapsable title={currentGrade} key={currentGrade}>
            <VideoSection vids={videoSlice} />
          </Collapsable>
        );
        start = i;
        currentGrade = videos[i].Problems_2019.grade;
      }
    }

    const videoSlice = videos.slice(start);
    collapsables.push(
      <Collapsable title={currentGrade} key={currentGrade}>
        {' '}
        <VideoSection key={currentGrade} vids={videoSlice} />
      </Collapsable>
    );
    return collapsables;
  }

  const collapsables = MakeVideoCollapsables(videos);

  return <div>{collapsables}</div>;
}
