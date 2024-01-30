import s from "./AuthSuccess.module.scss";
import { Container } from "../Container/Container";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPadTime } from "../../helpers/getPadTime";
// eslint-disable-next-line max-len
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export const AuthSuccess = () => {
  const [timeLeft, setTime] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeLeft >= 1 ? timeLeft - 1 : 0);
    }, 1000);
    if (!timeLeft) navigate("/");

    return () => {
      clearInterval(interval);
    };
  }, [navigate, timeLeft]);

  return (
    <section>
      <Container>
        <div className={s.wrapper}>
          <h2 className={s.title}>
            Поздравляем с успешной авторизацией в приложении Gallery!
          </h2>
          <p className={s.text}>
            Вы автоматические будете перенаправлены на главную страницу через :
          </p>
          <div className={s.timer}>
            <span>00</span>
            <span>:</span>
            <span>{getPadTime(timeLeft)}</span>
          </div>

          <Link className={s.link} to="/">
            Перейти на главную страницу
          </Link>
        </div>
      </Container>
    </section>
  );
};
