import { useEffect, useMemo, useState } from "react";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import { SiApplemusic, SiYoutubemusic } from "react-icons/si";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { BsFillShareFill } from "react-icons/bs";
import { Alert } from "@mui/material";
import { TinyColor } from "@ctrl/tinycolor";
import { PiPlayCircleBold } from "react-icons/pi";
import { getGradientColors, getTextColor } from "~/module/calcualte-color";
import {
  artworkImg,
  artworkWrapper,
  buttonApple,
  buttonBugs,
  buttonFlo,
  buttonMelon,
  buttonNaverVibe,
  buttonSpotify,
  buttonYoutube,
  buttonYoutubeMusic,
  trackArtist,
  trackContainer,
  trackInfo,
  trackInfoContainer,
  trackLinkButtonContainer,
  trackRelatedSongItem,
  trackRelatedSongItemArtist,
  trackRelatedSongItemImg,
  trackRelatedSongItemReleaseDate,
  trackRelatedSongItemTitle,
  trackRelatedSongsContainer,
  trackReleaseDate,
  trackShare,
  trackShareSnackbar,
  trackTitle,
} from "~/styles/track.css";
import { TbMusicShare } from "react-icons/tb";
import { FaCirclePlay } from "react-icons/fa6";
import { RiMusicAiFill } from "react-icons/ri";
import TrackFooter from "./TrackFooter";
import { Link } from "@remix-run/react";

type LinkContainerProps = {
  id?: number;
  isSearch?: boolean;
  bgColor?: string;
  coverImgUrl?: string;
  title?: string;
  artist?: string;
  releaseDate?: string;
  youtubeMusic?: string;
  youtubeLink?: string;
  youtubeUrl?: string;
  spotifyId?: string;
  apple?: string;
  melonUrl?: string;
  bugsUrl?: string;
  naverVibeUrl?: string;
  floUrl?: string;
  artistImg?: string;
  relatedSongs: any[];
};

const TrackContainer = (props: LinkContainerProps) => {
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
    melonUrl,
    bugsUrl,
    naverVibeUrl,
    floUrl,
    apple,
    artistImg,
    relatedSongs,
  } = props;

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [spotify, setSpotify] = useState(
    `https://open.spotify.com/track/${spotifyId}`
  );

  // const [bugs, setBugs] = useState(`https://music.bugs.co.kr/track/${bugsUrl}`);
  const bugs = `https://music.bugs.co.kr/track/${bugsUrl}`;

  const gradientColors = getGradientColors(bgColor || "D8EFFF"); // '#ff6600' 같은 HEX 입력
  const textColor = isSearch ? "#fff" : getTextColor(bgColor || "");

  const handleShare = () => {
    const url = `https://muzlinkverse.com/${id}`;

    if (window?.navigator?.canShare()) {
      window.navigator.share({
        title: artist + "-" + "title",
        text: "좋은 음악은 같이 나눠요!",
        url,
      });
    }

    try {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setIsSuccess(true);
          setSnackbarMessage("공유 링크가 복사되었습니다.");
          setIsSnackbarOpen(true);
        })
        .catch(() => {
          setIsSuccess(false);
          setSnackbarMessage("복사에 실패했습니다. 다시 시도해 주세요.");
          setIsSnackbarOpen(true);
        });
    } catch (err) {
      setIsSuccess(false);
      setSnackbarMessage("이 기기에서는 복사 기능이 지원되지 않습니다.");
      setIsSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    // 모바일 기기 감지
    const isMobile =
      /iphone|ipod|ipad|android|windows phone|blackberry|bb10|mini|mobile|touch/.test(
        ua
      );
    // 카카오톡 인앱 브라우저 감지
    const isKakaoWebview = /kakaotalk/.test(ua);

    // 최종 판단
    const isMobileOrWebview = isMobile || isKakaoWebview;

    if (isMobileOrWebview) {
      setSpotify(`spotify://track/${spotifyId}`);
      // setBugs("https://m.bugs.co.kr/track/${bugsUrl}");
    } else {
      setSpotify(`https://open.spotify.com/track/${spotifyId}`);
      // setBugs(`https://music.bugs.co.kr/track/${bugsUrl}`);
    }
  }, []);

  return (
    <>
      <div className={trackContainer}>
        <div className={trackInfoContainer}>
          {coverImgUrl ? (
            <div
              className={artworkWrapper}
              style={{ background: `#${bgColor}` }}
            >
              <img
                className={artworkImg}
                src={coverImgUrl}
                alt={title + "," + artist}
              />
            </div>
          ) : (
            <div className={artworkWrapper}>
              <img
                src="/dummy-default.png"
                alt="이미지를 불러오는 데 실패하였습니다"
                className={artworkImg}
              />
            </div>
          )}
          <div className={trackInfo}>
            <div
              className="flex flex-col-reverse items-end text-right"
              style={{ color: textColor }}
            >
              {releaseDate && (
                <p className={trackReleaseDate}>Released on {releaseDate}</p>
              )}
              <h1 className={trackTitle}>{title}</h1>
              <p className={trackArtist}>{artist}</p>
              {/* <img src="/profile.webp" alt="송병도" className="profile" /> */}
            </div>
          </div>
        </div>
        <div className={trackLinkButtonContainer}>
          <button type="button" className={trackShare} onClick={handleShare}>
            <BsFillShareFill fontSize={16} color="#fff" />
          </button>
          {melonUrl && (
            <a href={melonUrl} target="_blank" rel="noreferrer">
              <button className={buttonMelon}>
                <PiPlayCircleBold fontSize={30} />
                <span className="button-link-name">Melon</span>
              </button>
            </a>
          )}
          {apple && (
            <a href={apple} target="_blank" rel="noreferrer">
              <button className={buttonApple}>
                <SiApplemusic fontSize={28} />
                <span className="button-link-name">Apple Music</span>
              </button>
            </a>
          )}
          {spotifyId && (
            <a href={spotify} target="_blank" rel="noreferrer">
              <button className={buttonSpotify}>
                <FaSpotify fontSize={30} />
                <span className="button-link-name">Spotify</span>
              </button>
            </a>
          )}
          {youtubeUrl && (
            <a href={youtubeMusic} target="_blank" rel="noreferrer">
              <button className={buttonYoutubeMusic}>
                <SiYoutubemusic fontSize={28} />
                <span className="button-link-name">Youtube Music</span>
              </button>
            </a>
          )}
          {youtubeUrl && (
            <a href={youtubeLink} target="_blank" rel="noreferrer">
              <button className={buttonYoutube}>
                <FaYoutube fontSize={30} />
                <span className="button-link-name">Youtube</span>
              </button>
            </a>
          )}

          {bugsUrl && (
            <a href={bugs} target="_blank" rel="noreferrer">
              <button className={buttonBugs}>
                <TbMusicShare fontSize={30} />
                <span className="button-link-name">Bugs</span>
              </button>
            </a>
          )}
          {naverVibeUrl && (
            <a href={naverVibeUrl} target="_blank" rel="noreferrer">
              <button className={buttonNaverVibe}>
                <FaCirclePlay fontSize={26} />
                <span className="button-link-name">Naver Vibe</span>
              </button>
            </a>
          )}
          {floUrl && (
            <a href={floUrl} target="_blank" rel="noreferrer">
              <button className={buttonFlo}>
                <RiMusicAiFill fontSize={26} />
                <span className="button-link-name">FLO</span>
              </button>
            </a>
          )}
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={() => setIsSnackbarOpen(false)}
        >
          {isSuccess ? (
            <Alert
              severity="success"
              className={trackShareSnackbar}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          ) : (
            <Alert
              severity="error"
              className="snackbar-error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          )}
        </Snackbar>
        {relatedSongs?.length > 0 && (
          <div className={trackRelatedSongsContainer}>
            <p style={{ marginLeft: 4, textAlign: "left" }}>
              ......다른 곡도 들어보시겠어요?
            </p>
            {relatedSongs.map((v, i) => {
              return (
                <Link to={`/${v.id}`} key={i} style={{ display: "block" }}>
                  <div key={i} className={trackRelatedSongItem}>
                    <img
                      className={trackRelatedSongItemImg}
                      src={v.s3_url || v.rawArtwork}
                      alt={v.title + "-" + v.artist}
                    />
                    <div>
                      <p className={trackRelatedSongItemTitle}>{v.title}</p>
                      <p className={trackRelatedSongItemArtist}>{v.artist}</p>
                      <p className={trackRelatedSongItemReleaseDate}>
                        {v.releaseDate}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      {!isSearch && <TrackFooter />}
    </>
  );
};

export default TrackContainer;
