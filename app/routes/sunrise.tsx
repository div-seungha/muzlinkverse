import { MetaFunction } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { SiApplemusic, SiYoutubemusic } from "react-icons/si";
import { TbMusicShare } from "react-icons/tb";
import { PiPlayCircleBold } from "react-icons/pi";
import { RiMusicAiFill } from "react-icons/ri";

const spotifyAlbumId = "7INnDLNxqOZcF03uxHiBoA"; // 앨범 ID
// const appleTrackId = "1801387819";
const apple = "https://music.apple.com/kr/album/sunrise-single/1801387819";
const youtubeLink = "https://www.youtube.com/watch?v=3VQjL9_VzRg";
const youtubeMusic =
  "https://music.youtube.com/watch?v=3VQjL9_VzRg&si=z4SL3ZIijictYVZ9";
// const youtubeMusicId = "3VQjL9_VzRg";
const melon = "https://kko.kakao.com/R7FS2yvnTo";
const bugs = "https://music.bugs.co.kr/track/33468444";
const naver = "https://naver.me/FFGZybFK";
const flo = "https://flomuz.io/s/b.Kb3wF";

// const melonTrackId = "38723311";
// const bugsTrackId = "33468444";

export const meta: MetaFunction = () => {
  return [
    { title: "송병도 - Sunrise" },
    {
      name: "description",
      content: "송병도 - Sunrise",
    },
    {
      property: "og:title",
      content: "Sunrise",
    },
    {
      property: "og:description",
      content: "송병도 - Sunrise (2025)",
    },
    {
      name: "keywords",
      content:
        "송병도, sunrise, 싱글, 록, 밴드, 버스킹, 인디음악, 인디, beyoung doe, song, 보컬, 보컬리스트, 인디 보컬, 인디밴드, 스포티파이, 유튜브, 유튜브뮤직, 유튜브 뮤직, 애플 뮤직",
    },
    { property: "og:image", content: "/cover.webp" },
  ];
};

export default function Index() {
  const year = new Date().getFullYear();
  const [spotify, setSpotify] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|android/i.test(userAgent);

    if (isMobile) {
      setSpotify(`spotify://album/${spotifyAlbumId}`);
    } else {
      setSpotify(`https://open.spotify.com/album/${spotifyAlbumId}`);
    }
  }, []);

  return (
    <div
      className="sunrise content-container"
      style={{ minHeight: "calc(100svh + 200px)" }}
    >
      <div
        className="cover-bg"
        style={{
          background: "linear-gradient(to bottom, #a80f00, 20%, #18191a)",
        }}
      ></div>
      <div className="cover-box">
        <img className="cover" src="/cover.webp" alt="송병도, sunrise" />
        <div className="header-container">
          <div className="flex flex-col-reverse items-end text-right">
            <p className="description">싱글 - 2025</p>
            <h1>Sunrise</h1>
            <p>송병도 (Song beyoung doe)</p>
            <img src="/profile.webp" alt="송병도" className="profile" />
          </div>
        </div>
      </div>
      <div className="content-box pb-[80px]">
        <div className="link-container">
          <a href={youtubeMusic} target="_blank" rel="noreferrer">
            <button className="youtube-music">
              <SiYoutubemusic fontSize={28} />
              <span className="button-link-name">Youtube Music</span>
            </button>
          </a>
          <a href={youtubeLink} target="_blank" rel="noreferrer">
            <button className="youtube">
              <FaYoutube fontSize={30} />
              <span className="button-link-name">Youtube</span>
            </button>
          </a>
          <a href={melon} target="_blank" rel="noreferrer">
            <button className="melon">
              <PiPlayCircleBold fontSize={30} />
              <span className="button-link-name">Melon</span>
            </button>
          </a>
          <a href={apple} target="_blank" rel="noreferrer">
            <button className="apple">
              <SiApplemusic fontSize={28} />
              <span className="button-link-name">Apple Music</span>
            </button>
          </a>
          <a href={spotify} target="_blank" rel="noreferrer">
            <button className="spotify">
              <FaSpotify fontSize={30} />
              <span className="button-link-name">Spotify</span>
            </button>
          </a>
          <a href={bugs} target="_blank" rel="noreferrer">
            <button className="bugs">
              <TbMusicShare fontSize={30} />
              <span className="button-link-name">Bugs</span>
            </button>
          </a>
          <a href={naver} target="_blank" rel="noreferrer">
            <button className="naver">
              <FaCirclePlay fontSize={26} />
              <span className="button-link-name">Naver Vibe</span>
            </button>
          </a>
          <a href={flo} target="_blank" rel="noreferrer">
            <button className="flo">
              <RiMusicAiFill fontSize={26} />
              <span className="button-link-name">FLO</span>
            </button>
          </a>

          {/* <a href={genie} target="_blank" rel="noreferrer">
        <button>Youtube</button>
      </a> */}
        </div>
      </div>
    </div>
  );
}
