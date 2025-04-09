import { Link, useActionData, useFetcher } from "@remix-run/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdHomeFilled } from "react-icons/md";
import {
  contentContainer,
  returnButton,
  submitContainer,
  submitText,
} from "~/styles/info.css";
import { searchTextarea } from "~/styles/info.css";
import { LuSend } from "react-icons/lu";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  searchForm,
  searchFormText,
  searchInput,
  searchInputButton,
  searchTitle,
} from "~/styles/search.css";
import TrackFooter from "~/components/TrackFooter";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { prisma } from "~/.server/db";
import { useEffect, useRef, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { trackShareSnackbar } from "~/styles/track.css";
import { vars } from "~/styles/theme.css";

type Message = {
  message: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = String(formData.get("title"));
  const artist = String(formData.get("artist"));
  const content = String(formData.get("content"));

  try {
    await prisma.info_mismatch.create({
      data: {
        title,
        artist,
        content,
      },
    });

    return json({ message: "소중한 의견 감사합니다!" });
  } catch (err) {
    console.error("❌ Server error in loader:", err);
    throw new Response("Something went wrong", { status: 500 });
  }
};

const InfoMismatch = () => {
  const fetcher = useFetcher<Message>();
  const isSubmitting = fetcher.state === "submitting";
  const data = useActionData<Message>();

  return (
    <>
      {data ? (
        <div className={submitContainer}>
          <BsCheckCircleFill fontSize={120} color={vars.color.grey2} />
          <p className={submitText} style={{ marginTop: 40 }}>
            알려주셔서 감사합니다. <br />
            <br />
            빠른 시일 내에 확인해서 정보를 업데이트하도록 하겠습니다.
          </p>
          <Link to="/search">
            <button className={returnButton}>
              <MdHomeFilled fontSize={20} color={vars.color.grey1} />
            </button>
          </Link>
        </div>
      ) : (
        <div className={contentContainer}>
          <fetcher.Form
            action="/info-mismatch"
            method="post"
            className={searchForm}
          >
            <h1 className={searchTitle}>
              곡 정보에 잘못된 것이 있다면 알려주세요!
            </h1>
            <div>
              <p className={searchFormText}>곡 이름이 어떻게 되나요?</p>
              <input
                className={searchInput}
                name="title"
                type="text"
                placeholder="곡의 제목을 정확히 입력해주세요"
                required
              />
              <p style={{ marginTop: 20 }} className={searchFormText}>
                아티스트의 이름이 어떻게 되나요?
              </p>
              <input
                className={searchInput}
                name="artist"
                type="text"
                placeholder="아티스트의 이름을 정확히 입력해주세요"
                required
              />
              <p style={{ marginTop: 20 }} className={searchFormText}>
                어느 부분이 어떻게 잘못되어 있나요?
              </p>
              <textarea
                className={searchTextarea}
                name="content"
                placeholder="정보가 잘못 올라가 있는 부분을 설명해주세요"
              />
            </div>
            <button className={searchInputButton} type="submit">
              {isSubmitting ? (
                <span className="loading">
                  <AiOutlineLoading3Quarters fontSize={20} />
                </span>
              ) : (
                <LuSend fontSize={20} />
              )}
            </button>
          </fetcher.Form>
          <p className={searchFormText}></p>
        </div>
      )}

      <TrackFooter />
    </>
  );
};

export default InfoMismatch;
