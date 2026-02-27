import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FONT_GRADES } from "../types/types";
import ProfileVideoSection from "./ProfileVideoSection";

/** Normalize API (flat) or dummyData (structured) to { problem, video }[]. */
function toProblemVideoList(data: any[]): {
  problem: { name: string; fontGrade?: string };
  video: { ID: number; link: string; video: string; img?: string };
}[] {
  if (!data.length) return [];
  if (data[0].problem && data[0].video) return data;
  return data.map((row: any) => ({
    problem: {
      name: row.problemName ?? row.problem?.name ?? "",
      fontGrade: row.Problems_2019?.grade ?? row.problem?.fontGrade,
    },
    video: {
      ID: row.ID ?? row.video?.ID ?? 0,
      link: row.link ?? row.video?.link ?? "",
      video: row.video ?? row.link ?? "",
      img: row.img ?? row.video?.img,
    },
  }));
}

export default function ProfilePage() {
  const [videos, setVideos] = useState<any>([]);
  const [tab, setTab] = useState("MoonBoard2019");
  const [user, setUser] = useState("1");

  async function fetchVideos() {
    try {
      const response = await fetch(`/video/user/${user}`);
      const raw = response.ok ? await response.json() : [];
      const data = toProblemVideoList(Array.isArray(raw) ? raw : []);

      const alphabetize = data.sort((a: any, b: any) => {
        return a.problem.name.localeCompare(b.problem.name);
      });
      const sortedData = alphabetize.sort((a: any, b: any) => {
        const gradeA = a.problem?.fontGrade ?? "";
        const gradeB = b.problem?.fontGrade ?? "";
        return (
          (FONT_GRADES[gradeA as keyof typeof FONT_GRADES] ?? 0) -
          (FONT_GRADES[gradeB as keyof typeof FONT_GRADES] ?? 0)
        );
      });
      setVideos(sortedData);
    } catch (e) {
      console.log("UNABLE TO GET VIDEOS");
    }
  }

  useEffect(() => {
    fetchVideos();
  }, [user]);

  return (
    <>
      <div>welcom to my profile</div>
      <Link to={"/data"}>Back to data</Link>
      <button onClick={() => setTab("MoonBoard2016")}>MoonBoard2016</button>
      <button onClick={() => setTab("MoonBoard2019")}>MoonBoard2019</button>
      <button onClick={() => setTab("TensionBoard")}>TB2Spray</button>
      <button onClick={() => setTab("TensionBoard2Mirror")}>TB2Mirror</button>
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
