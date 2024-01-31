import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import s from "./List.module.scss";
import { useRef } from "react";
import { PhotoItem } from "./PhotoItem/PhotoItem";
import { PostLoader } from "../../UI/PostLoader/PostLoader";
import { Error } from "../../UI/Error/Error";
import { Container } from "../Container/Container";
import {
  changePage,
  fetchFavoritePhotosList,
  fetchPhotos,
  fetchSearch,
} from "../../store/photos/photos.slice";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const List = () => {
  const dispatch = useDispatch();
  const {
    photos,
    loadingPhoto,
    loadingSearch,
    loadingFavorite,
    error,
    status,
  } = useSelector((state) => state.photos);
  const endList = useRef(null);
  const [searchParam] = useSearchParams();
  const search = searchParam.get("search");
  const params = useLocation();
  const [auth] = useAuth();

  useEffect(() => {
    dispatch(changePage(params));
  }, [dispatch, params]);

  useEffect(() => {
    if (params.pathname === "/favorite") {
      dispatch(fetchFavoritePhotosList(auth.username));
    }
  }, [dispatch, auth, params.pathname]);

  useEffect(() => {
    if (params.pathname === "/" && !loadingPhoto) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            dispatch(fetchPhotos());
          }
        },
        {
          rootMargin: "200px",
        },
      );
      if (endList.current && !loadingPhoto) {
        observer.observe(endList.current);
      }

      return () => {
        if (endList.current) {
          observer.unobserve(endList.current);
        }
      };
    }
  }, [dispatch, endList.current, params.pathname, loadingPhoto]);

  useEffect(() => {
    if (params.pathname === "/search" && !loadingSearch) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            dispatch(fetchSearch(search));
          }
        },
        {
          rootMargin: "200px",
        },
      );
      if (endList.current && !loadingSearch) {
        observer.observe(endList.current);
      }

      return () => {
        if (endList.current) {
          observer.unobserve(endList.current);
        }
      };
    }
  }, [dispatch, endList.current, params.pathname, loadingSearch]);

  const breakpointColumnsObj = {
    default: 4,
    1120: 3,
    820: 2,
    580: 1,
  };

  if (error) return <Error error={error} status={status} />;

  return (
    <section>
      <Container>
        {photos && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={s.myMasonryGrid}
            columnClassName={s.myMasonryGridColumn}>
            {photos.map((photo) => (
              <li key={photo.id} className={s.li}>
                <PhotoItem photo={photo} />
              </li>
            ))}
            {(loadingPhoto || loadingSearch) && <PostLoader />}
            <li ref={endList} className={s.end}></li>
          </Masonry>
        )}
        {!photos.length &&
          !loadingFavorite &&
          params.pathname === "/favorite" && (
            <div className={s.favorite}>
              <h2 className={s.title}>Избранное</h2>
              <p className={s.description}>
                К сожалению здесь пока нет ничего!
              </p>
            </div>
          )}
      </Container>
    </section>
  );
};
