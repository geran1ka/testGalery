import s from "./PhotoItem.module.scss";

import { Link } from "react-router-dom";
import { ImgLoad } from "../../../UI/ImgLoad/ImgLoad";
import { Like } from "../../Like/Like";
import { Time } from "../../Time/Time";
import { User } from "../../User/User";
export const PhotoItem = ({ photo }) => {
  return (
    <>
      <div className={s.wrapperPhoto} id={photo.id}>
        <Link to={`photo/${photo.id}`}>
          <ImgLoad
            className={s.img}
            src={photo.urls.small}
            alt={photo.alt_description}
            width={photo.width}
            height={photo.height}
          />
        </Link>
        <div className={s.description}>
          <User user={photo.user} />
          <Time data={photo.created_at} />
        </div>
        <Like
          className={s.like}
          likes={photo.likes}
          id={photo.id}
          liked={photo.liked_by_user}
        />
      </div>
    </>
  );
};
