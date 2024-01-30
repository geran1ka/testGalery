import s from "./Time.module.scss";

export const Time = ({ data }) => {
  const dataParse = Date.parse(data);
  const dataCreated = new Date(dataParse).toLocaleDateString();

  return (
    <time className={s.time} dateTime={data}>
      {dataCreated}
    </time>
  );
};
