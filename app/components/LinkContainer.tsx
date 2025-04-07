import { useEffect, useMemo, useState } from "react";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import { SiApplemusic, SiYoutubemusic } from "react-icons/si";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { BsFillShareFill } from "react-icons/bs";
import { Alert } from "@mui/material";
import { TinyColor } from "@ctrl/tinycolor";
import { PiPlayCircleBold } from "react-icons/pi";
import { getGradientColors, getTextColor } from "~/module/calcualte-color";
// import { FaCirclePlay } from "react-icons/fa6";
// import { RiMusicAiFill } from "react-icons/ri";
// import { TbMusicShare } from "react-icons/tb";

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
    melonUrl,
    apple,
  } = props;

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [spotify, setSpotify] = useState(
    `https://open.spotify.com/track/${spotifyId}`
  );

  const gradientColors = getGradientColors(bgColor || "D8EFFF"); // '#ff6600' 같은 HEX 입력
  const textColor = isSearch ? "#fff" : getTextColor(bgColor || "");

  const handleShare = () => {
    const url = `https://muzlinkverse.com/${id}`;

    // if (window.navigator.canShare()) {
    //   window.navigator.share({
    //     title: artist + "-" + "title",
    //     text: "좋은 음악은 같이 나눠요!",
    //     url,
    //   });
    // }

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

  const marginTop = useMemo(() => {
    if (isSearch && youtubeUrl) {
      return 480;
    }
    if (isSearch && !youtubeUrl) {
      return 240;
    }
    return 0;
  }, [isSearch, youtubeUrl]);

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
    } else {
      setSpotify(`https://open.spotify.com/track/${spotifyId}`);
    }
  }, []);

  return (
    <div
      className="content-container"
      // style={{ background: gradientColors[3] }}
    >
      <div
        className="cover-bg"
        style={{
          background: isSearch
            ? `linear-gradient(to top, transparent, #${bgColor})`
            : // : `linear-gradient(to bottom, #${bgColor}, ${gradientColors[2]}, transparent)`,
              `radial-gradient(
          ellipse at right, ${
            (gradientColors[3], gradientColors[1])
          }, transparent),
          radial-gradient(ellipse at top, ${
            (gradientColors[2], gradientColors[4])
          }, transparent)`,
        }}
        // style={{
        //   background: `linear-gradient(to bottom, #${bgColor}, #1d1d1f)`,
        // }}
      ></div>
      <div className="cover-box">
        {coverImgUrl ? (
          <img className="cover" src={coverImgUrl} alt={title + "," + artist} />
        ) : (
          <img
            src="/dummy-album.png"
            alt="이미지를 불러오는 데 실패하였습니다"
            className="cover"
          />
        )}
        <div className="header-container">
          <div
            className="flex flex-col-reverse items-end text-right"
            style={{ color: textColor }}
          >
            {releaseDate && (
              <p style={{ color: textColor }} className="description">
                Released on {releaseDate}
              </p>
            )}
            <h1 style={{ color: textColor }}>{title}</h1>
            <p style={{ color: textColor }}>{artist}</p>
            {/* <img src="/profile.webp" alt="송병도" className="profile" /> */}
          </div>
        </div>
      </div>
      <div className="content-box pb-[80px]">
        <div
          className="confirm-container"
          style={{ display: isSearch ? "block" : "none" }}
        >
          <p>찾으시는 곡이 맞으신가요?</p>
          <button
            type="button"
            className="search-result-share"
            onClick={handleShare}
          >
            <BsFillShareFill fontSize={20} />
            공유하기
          </button>

          <p>공유하기 버튼이 작동하지 않는다면 🥲</p>
          <p style={{ fontWeight: 800, fontSize: 22 }}>
            <a
              href={`https://muzlinkverse.com/${id}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              https://muzlinkverse.com/{id}
            </a>
          </p>
          <p>위 URL을 복사하여 직접 공유하실 수 있습니다.</p>
          {youtubeUrl && (
            <iframe
              width="90%"
              height="90%"
              style={{ margin: "20px auto" }}
              src={`https://www.youtube.com/embed/${youtubeUrl}`}
              title={title + "-" + artist}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        <div className="link-container" style={{ marginTop }}>
          {melonUrl && (
            <a href={melonUrl} target="_blank" rel="noreferrer">
              <button className="melon">
                <PiPlayCircleBold fontSize={30} />
                <span className="button-link-name">Melon</span>
              </button>
            </a>
          )}
          {apple && (
            <a href={apple} target="_blank" rel="noreferrer">
              <button className="apple">
                <SiApplemusic fontSize={28} />
                <span className="button-link-name">Apple Music</span>
              </button>
            </a>
          )}
          {spotifyId && (
            <a href={spotify} target="_blank" rel="noreferrer">
              <button className="spotify">
                <FaSpotify fontSize={30} />
                <span className="button-link-name">Spotify</span>
              </button>
            </a>
          )}
          {youtubeUrl && (
            <a href={youtubeMusic} target="_blank" rel="noreferrer">
              <button className="youtube-music">
                <SiYoutubemusic fontSize={28} />
                <span className="button-link-name">Youtube Music</span>
              </button>
            </a>
          )}
          {youtubeUrl && (
            <a href={youtubeLink} target="_blank" rel="noreferrer">
              <button className="youtube">
                <FaYoutube fontSize={30} />
                <span className="button-link-name">Youtube</span>
              </button>
            </a>
          )}

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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        {isSuccess ? (
          <Alert
            severity="success"
            className="snackbar-success"
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
    </div>
  );
};

export default LinkContainer;
