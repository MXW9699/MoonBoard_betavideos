import React, { ReactElement } from 'react';
import Collapsable from '../UI Components/Collapsable';
import VideoSection from '../databasePage/VideoSection';
import { VideoType } from '../types/types';

/** Map { problem, video } entry to VideoType for VideoSection/VideoBox. */
function toVideoType(entry: { problem: { name: string }; video: { ID: number; link: string; video: string; img?: string | null } }): VideoType {
  return {
    ID: entry.video.ID,
    link: entry.video.link,
    problemName: entry.problem.name,
    video: entry.video.video,
    img: entry.video.img ?? '',
  };
}

export default function ProfileVideoSection({ videos }: { videos: any }) {
  /**
   * Iterate through the array creating collapsable sections for each grade
   */
  function MakeVideoCollapsables(videos: any): ReactElement[] | null {
    if (videos.length === 0) return null;
    if (!videos[0].problem?.fontGrade) return null;
    const collapsables: ReactElement[] = [];

    let currentGrade = videos[0].problem.fontGrade ?? '';
    let start = 0;

    for (let i = 0; i < videos.length; i++) {
      if (currentGrade !== videos[i].problem.fontGrade) {
        const videoSlice = videos.slice(start, i).map(toVideoType);
        collapsables.push(
          <Collapsable title={currentGrade} key={currentGrade}>
            <VideoSection vids={videoSlice} />
          </Collapsable>
        );
        start = i;
        currentGrade = videos[i].problem.fontGrade;
      }
    }

    const videoSlice = videos.slice(start).map(toVideoType);
    collapsables.push(
      <Collapsable title={currentGrade} key={currentGrade}>
        <VideoSection key={currentGrade} vids={videoSlice} />
      </Collapsable>
    );
    return collapsables;
  }

  const collapsables = MakeVideoCollapsables(videos);

  return <div>{collapsables}</div>;
}
