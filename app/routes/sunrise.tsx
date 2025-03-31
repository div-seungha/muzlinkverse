import { useEffect, useState } from "react";

const spotifyAlbumId = "7INnDLNxqOZcF03uxHiBoA"; // 앨범 ID
const appleTrackId = "1801387819";
const youtubeLink = "https://www.youtube.com/watch?v=3VQjL9_VzRg";
const youtubeMusicId = "3VQjL9_VzRg";

const melonTrackId = "38723311";
const bugsTrackId = "33468444";

export default function Index() {
  const [spotify, setSpotify] = useState("");
  const [apple, setApple] = useState("");
  const [youtubeMusic, setYoutubeMusic] = useState("");
  const [melon, setMelon] = useState("");
  const [bugs, setBugs] = useState("");

  useEffect(() => {
    // 현재 URL에 있는 Spotify 앨범 링크

    // 사용자 에이전트를 확인하여 웹과 모바일을 구분
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|android/i.test(userAgent);

    if (isMobile) {
      setSpotify(`spotify://album/${spotifyAlbumId}`);
      setApple(`music://track/${appleTrackId}`);
      setMelon(`melon://track/${melonTrackId}`);
      setBugs(`bugs://track/${bugsTrackId}`);
      setYoutubeMusic(`ytmusic://song/${youtubeMusicId}`);
      //   setGenie(`genie://track/${genieTrackId}`);
    } else {
      setSpotify(`https://open.spotify.com/album/${spotifyAlbumId}`);
      setApple(`https://music.apple.com/kr/album/sunrise-single/1801387819`);
      setMelon(`https://www.melon.com/song/detail.htm?songId=${melonTrackId}`);
      setBugs(`https://music.bugs.co.kr/track/${bugsTrackId}`);
      setYoutubeMusic(`https://music.youtube.com/watch?v=${youtubeMusicId}`);
    }
  }, []);

  return (
    <div className="content-container">
      <div className="header-container">
        <img
          className="w-[100px] h-[100px]"
          src="/cover.webp"
          alt="송병도, sunrise"
        />
        <div className="flex flex-col-reverse h-[180px]">
          <h1>Sunrise</h1>
          <p>송병도</p>
        </div>
      </div>
      <div className="link-container">
        <a href={spotify} target="_blank" rel="noreferrer">
          <button>Spotify</button>
        </a>
        <a href={apple} target="_blank" rel="noreferrer">
          <button>Apple Music</button>
        </a>
        <a href={youtubeMusic} target="_blank" rel="noreferrer">
          <button>Youtube Music</button>
        </a>
        <a href={youtubeLink} target="_blank" rel="noreferrer">
          <button>Youtube</button>
        </a>
        <a href={melon} target="_blank" rel="noreferrer">
          <button>Melon</button>
        </a>
        <a href={bugs} target="_blank" rel="noreferrer">
          <button>Bugs</button>
        </a>
        {/* <a href={genie} target="_blank" rel="noreferrer">
        <button>Youtube</button>
      </a> */}
      </div>
    </div>
  );
}
