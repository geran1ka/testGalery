import classNames from "classnames";
import s from "./Container.module.scss";

export const Container = (props) =>
  props.className ? (
    <div className={classNames(s.container, props.className)}>
      {props.children}
    </div>
  ) : (
    <div className={s.container}>{props.children}</div>
  );
