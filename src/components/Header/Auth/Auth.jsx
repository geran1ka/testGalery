import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Auth.module.scss";
import { useAuth } from "../../../hooks/useAuth";
import { PostLoader } from "../../../UI/PostLoader/PostLoader";
import { fetchToken, removeToken } from "../../../store/token/token.slice";
import { urlAuth } from "../../../api/auth";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useClickOutside } from "../../../hooks/useClickOutside";

export const Auth = () => {
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const [auth, loading, clearAuth] = useAuth();
  const token = useSelector((state) => state.token.token);
  const tokenLoading = useSelector((state) => state.token.loading);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    if (showLogout) setShowLogout(false);
  });
  const getOut = () => {
    setShowLogout(!showLogout);
  };

  const logOut = () => {
    setShowLogout(false);
    dispatch(removeToken());
    clearAuth();
  };

  useEffect(() => {
    if (!token && !tokenLoading) {
      dispatch(fetchToken());
    }
  }, [dispatch, token]);

  return (
    <div className={s.authWrapper}>
      {loading ? (
        <PostLoader />
      ) : auth?.name ? (
        <button className={s.btn} onClick={getOut}>
          <img
            className={s.img}
            src={auth.profile_image.small}
            title={auth.username}
            alt={`Аватар ${auth.username}`}
            ref={menuRef}
          />
          <span className={s.name}>{auth.username}</span>
        </button>
      ) : (
        <a
          className={s.linkAuth}
          href={urlAuth}
          aria-label="Авторизоваться в приложении">
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              opacity="0.5"
              // eslint-disable-next-line max-len
              d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
              fill="#1C274C"
            />
            <path
              // eslint-disable-next-line max-len
              d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
              fill="#1C274C"
            />
            <path
              // eslint-disable-next-line max-len
              d="M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C17.8174 10.0089 18.3135 10.022 18.75 10.0546V8C18.75 4.27208 15.7279 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V10.0546C5.68651 10.022 6.18264 10.0089 6.75 10.0036V8Z"
              fill="#1C274C"
            />
          </svg>
        </a>
      )}
      {
        <nav className={classNames(s.menu, showLogout && s.active)}>
          <ul className={s.list}>
            <li className={s.item}>
              <Link className={s.link} to="/favorite">
                Избранное
              </Link>
            </li>
            <li className={s.item}>
              <button className={s.link} onClick={logOut}>
                Выйти
              </button>
            </li>
          </ul>
        </nav>
      }
    </div>
  );
};
