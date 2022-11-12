import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

import styles from "./button.module.scss";

export const Button: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...props }) => (
  <button className={styles.button} {...props}>
    {children}
  </button>
);
