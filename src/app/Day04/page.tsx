import styles from './page.module.css';

export default function Page() {
  return (
    <section className="text-center">
      {/* 用模块样式中的 .highlight 类 */}
      <p className={styles.highlight}>Hello Tailwind + CSS Modules!</p>
    </section>
  );
}
