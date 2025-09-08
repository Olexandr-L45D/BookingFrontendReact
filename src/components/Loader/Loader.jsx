import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loaderContainer}>
      <section className={css.loader}>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="#407bff"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </section>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import css from "./Loader.module.css";
// import { useTranslation } from "react-i18next";

// export default function Loader({ children }) {
//   const [dots, setDots] = useState("");
//   const { t } = useTranslation();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDots(
//         dots => (dots.length < 3 ? t("loader.shortTextMessage") : "") // Використовуємо переклад
//       );
//     }, 250);

//     return () => clearInterval(interval);
//   }, [t]); // Додаємо `t` до залежностей useEffect

//   return (
//     <p className={css.text}>
//       <b>
//         {children}
//         {dots}
//       </b>
//     </p>
//   );
// }
