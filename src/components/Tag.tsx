// components/Tag.tsx
import React from "react";
import styles from "./styles.module.css";

type TagProps = {
  label: string;
};

const Tag: React.FC<TagProps> = ({ label }) => {
  return <span className={styles.tag}>{label}</span>;
};

export default Tag;
