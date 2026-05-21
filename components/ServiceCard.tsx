import styles from "./ServiceCard.module.css";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export default function ServiceCard({ title, description, icon, link }: ServiceCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Link href={link} className={styles.link}>
        Learn More <span className={styles.arrow}>&rarr;</span>
      </Link>
    </div>
  );
}
