import { useEffect, useState } from "react";
import s from "./ImgLoad.module.scss";
import { PostLoader } from "../PostLoader/PostLoader";

export const ImgLoad = ({ className, src, alt, width, height }) => {
  const [loading, setLoad] = useState(true);
  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setLoad(false);
    };
  }, [src]);

  return loading ? (
    <div className={s.wrapper} height={height} width={width}>
      <img className={s.img} height={height} width={width} />
      <PostLoader />
    </div>
  ) : (
    <img src={src} alt={alt} className={className} />
  );
};
