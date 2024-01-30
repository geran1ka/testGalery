import s from "./User.module.scss";

export const User = ({ user, avatar = false }) => (
  <a href={user.links.html} className={s.link} target="_blank" rel="noreferrer">
    {avatar && (
      <img className={s.img} src={user.profile_image.medium} alt="Аватар" />
    )}
    <p className={s.user}>{user.name}</p>
  </a>
);
