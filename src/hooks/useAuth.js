import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogout, fetchAuth } from "../store/auth/auth.slice";

export const useAuth = () => {
  const token = useSelector((state) => state.token.token);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const auth = useSelector((state) => state.auth.data);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (!token) return;
    dispatch(fetchAuth());
  }, [dispatch, token]);

  const clearAuth = () => {
    dispatch(authLogout());
    localStorage.removeItem("tokenGallery");
  };

  return [auth, loading, clearAuth, error];
};
