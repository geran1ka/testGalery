import s from "./Photo.module.scss";
import { Container } from "../Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { ImgLoad } from "../../UI/ImgLoad/ImgLoad";
import { User } from "../User/User";
import { Time } from "../Time/Time";
import { Like } from "../Like/Like";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchPhoto } from "../../store/photo/photo.slice";
import { PostLoader } from "../../UI/PostLoader/PostLoader";
import { Error } from "../../UI/Error/Error";

export const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { photo, loading, error } = useSelector((state) => state.photo);

  const page = useParams();

  useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [dispatch, id]);
  if (loading) return <PostLoader />;
  if (error) return <Error error={error} />;
  if (!Object.keys(photo).length) return <div>фото не найдено</div>;

  return (
    <Container>
      {Object.keys(photo).length && (
        <div className={s.wrapper}>
          <ImgLoad
            className={s.img}
            src={photo.urls.full}
            alt={photo.alt_description}
            width={photo.width}
            height={photo.height}
          />
          <div className={s.description}>
            <User user={photo.user} avatar={true} />
            <Time data={photo.created_at} />
            <Like
              likes={photo.likes}
              id={photo.id}
              liked={photo.liked_by_user}
              className={s.like}
            />
            <button
              type="button"
              onClick={() => window.history.back()}
              className={s.link}>
              <svg
                className={s.svgLink}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 74.5 73.03">
                <rect
                  fill="currentColor"
                  width="74.5"
                  height="73.03"
                  rx="16.46"
                />
                <path
                  fill="currentColor"
                  d="M37.25,15.26A21.26,21.26,0,1,0,58.51,36.52,21.28,21.28,0,0,0,37.25,15.26Zm0,38.65A17.4,17.4,0,1,1,54.64,36.52,17.42,17.42,0,0,1,37.25,53.91Z"
                />
                <path
                  fill="currentColor"
                  d="M41.11,30.72H32.25l3.87-3.87-2.74-2.73-8.53,8.53,8.53,8.53,2.74-2.73-3.87-3.87h8.86a3.87,3.87,0,1,1,0,7.73H39.18v3.87h1.93a7.73,7.73,0,1,0,0-15.46Z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};
