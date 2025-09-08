import { useTranslation } from "react-i18next";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";
import { selectLoading } from "../../redux/contacts/selectors";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

export default function LoginPage() {
  const { t, ready } = useTranslation();
  const isLoading = useSelector(selectLoading);
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.cartTitle}>{t("login.titleLogin")}</h1>
        {isLoading ? <Loader /> : <LoginForm />}
        {/* <LoginForm /> */}
      </div>
    </main>
  );
}

// const [products, setProduct] = useState([]);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);

// useEffect(() => {
//     async function fetchData() {
//         try {
//             setLoading(true);
//             setError(false);
//             // const data = await getProductMovies();
//             setProduct(data);
//             setLoading(false);
//         } catch (error) {
//             setError("Sorry Bad Login");
//         }
//     }
//     fetchData();
// }, []);
