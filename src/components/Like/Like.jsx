import { useEffect, useState } from "react";
import s from "./Like.module.scss";
import LikeIcon from "./like.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorAuth } from "../Header/Auth/ErrorAuth/ErrorAuth";
import {
  fetchDisLikedPhoto,
  fetchLikedPhoto,
} from "../../store/like/like.slice";
import classNames from "classnames";

export const Like = ({ likes, liked, id, className }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const [likeCount, setLikeCount] = useState(likes);
  const [isLikePhoto, setIsLikePhoto] = useState(liked);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isBtnLike, setIsBtnLike] = useState(false);

  const handleToggleLike = () => {
    if (!token) {
      return setIsShowModal(true);
    } else {
      setIsShowModal(false);
      setIsBtnLike(true);
      if (isLikePhoto) {
        setLikeCount(likeCount - 1);
        setIsLikePhoto(!isLikePhoto);
      }
      if (!isLikePhoto) {
        setLikeCount(likeCount + 1);
        setIsLikePhoto(!isLikePhoto);
      }
    }
  };

  useEffect(() => {
    if (!isBtnLike) return;

    if (isLikePhoto) {
      dispatch(fetchLikedPhoto(id));
    }
    if (!isLikePhoto) {
      dispatch(fetchDisLikedPhoto(id));
    }
  }, [dispatch, isLikePhoto]);

  return (
    <>
      <button
        className={classNames(s.btnLike, isLikePhoto && s.liked, className)}
        type="button"
        onClick={handleToggleLike}
        aria-label={isLikePhoto ? "Поставить dislike" : "Поставить like"}>
        <LikeIcon />
        <span className={s.count}> {likeCount}</span>
      </button>
      {isShowModal && (
        <ErrorAuth
          text={"Вы неавторизованы"}
          closePopup={() => {
            setIsShowModal(false);
          }}
        />
      )}
    </>
  );
};
