import { FaSpotify, FaYoutube } from "react-icons/fa";
import { SiApplemusic, SiYoutubemusic } from "react-icons/si";
import Footer from "./Footer";
// import { FaCirclePlay } from "react-icons/fa6";
// import { PiPlayCircleBold } from "react-icons/pi";
// import { RiMusicAiFill } from "react-icons/ri";
// import { TbMusicShare } from "react-icons/tb";

type LinkContainerProps = {
  bgColor: string;
  coverImgUrl: string;
  title: string;
  artist: string;
  releaseDate: string;
  youtubeMusic: string;
  youtubeLink: string;
  youtubeUrl: string;
  spotify: string;
  apple: string;
};

const LinkContainer = (props: LinkContainerProps) => {
  const {
    bgColor,
    coverImgUrl,
    title,
    artist,
    releaseDate,
    youtubeMusic,
    youtubeLink,
    // youtubeUrl,
    spotify,
    apple,
  } = props;

  return (
    <div className="content-container">
      <div
        className="cover-bg"
        style={{
          background: `linear-gradient(to bottom, #${bgColor}, #1f1f1d)`,
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
      <Footer />
    </div>
  );
};

export default LinkContainer;
