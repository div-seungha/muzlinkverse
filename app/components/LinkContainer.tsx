import { FaSpotify, FaYoutube } from "react-icons/fa";
import { SiApplemusic, SiYoutubemusic } from "react-icons/si";
import { useEffect, useState } from "react";
import { BsFillShareFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
// import { FaCirclePlay } from "react-icons/fa6";
// import { PiPlayCircleBold } from "react-icons/pi";
// import { RiMusicAiFill } from "react-icons/ri";
// import { TbMusicShare } from "react-icons/tb";

type LinkContainerProps = {
  id?: number;
  isSearch: boolean;
  bgColor: string;
  coverImgUrl: string;
  title: string;
  artist: string;
  releaseDate: string;
  youtubeMusic: string;
  youtubeLink: string;
  youtubeUrl: string;
  spotifyId: string;
  apple: string;
};

const LinkContainer = (props: LinkContainerProps) => {
  const {
    id,
    isSearch,
    bgColor,
    coverImgUrl,
    title,
    artist,
    releaseDate,
    youtubeMusic,
    youtubeLink,
    youtubeUrl,
    spotifyId,
    apple,
  } = props;

  const [spotify, setSpotify] = useState(
    `https://open.spotify.com/track/${spotifyId}`
  );

  const handleCopy = () => {
    const url = `https://muzlinkverse.com/${id}`;

    if (window) {
      window.navigator.clipboard.writeText(url);
      toast("공유 링크가 복사되었습니다.");
    }
  };

  useEffect(() => {
    if (window) {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipod|android/i.test(userAgent);

      if (isMobile) {
        setSpotify(`spotify://track/${spotifyId}`);
      } else {
        setSpotify(`https://open.spotify.com/track/${spotifyId}`);
      }
    }
  }, []);

  return (
    <div className="content-container">
      <div
        className="cover-bg"
        style={{
          background: `linear-gradient(to bottom, #${bgColor}, #1d1d1f)`,
        }}
      ></div>
      <div className="cover-box">
        <img className="cover" src={coverImgUrl} alt={title + "," + artist} />
        <div className="header-container">
          <div className="flex flex-col-reverse items-end text-right">
            <p className="description">Released on {releaseDate}</p>
            <h1>{title}</h1>
            <p>{artist}</p>
            {/* <img src="/profile.webp" alt="송병도" className="profile" /> */}
          </div>
        </div>
      </div>
      <div className="content-box pb-[80px]">
        {isSearch && (
          <div className="confirm-container">
            <p>찾으시는 곡이 맞으신가요?</p>
            <button
              type="button"
              className="search-result-share"
              onClick={handleCopy}
            >
              <BsFillShareFill fontSize={20} />
              공유하기
            </button>
            <p>공유 버튼이 실행되지 않으면</p>
            <p style={{ fontWeight: 800 }}>https://muzlinkverse.com/{id}</p>
            <p>위 URL을 복사하여 직접 공유하실 수 있습니다.</p>
            <iframe
              width="90%"
              height="90%"
              style={{ margin: "20px auto" }}
              src={`https://www.youtube.com/embed/${youtubeUrl}`}
              title={title + "-" + artist}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        <div className="link-container">
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
          {/* <a href={melon} target="_blank" rel="noreferrer">
                <button className="melon">
                  <PiPlayCircleBold fontSize={30} />
                  <span className="button-link-name">Melon</span>
                </button>
              </a> */}

          {/* <a href={bugs} target="_blank" rel="noreferrer">
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
              </a> */}
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        theme="colored"
      />
    </div>
  );
};

export default LinkContainer;
