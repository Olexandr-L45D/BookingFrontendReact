import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { selecFilter, changeFilter } from '../../redux/filtersSlice'
import { setChangeFilter } from "../../redux/filters/slice";
import { selectStatusFilter } from "../../redux/filters/selectors";
import { useTranslation } from "react-i18next";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectStatusFilter);
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  const handleFilterChange = e => dispatch(setChangeFilter(e.target.value));

  return (
    <div className={css.item}>
      <h5 className={css.paragraf}>{t("auth.finde")}</h5>
      <input type="text" value={filter} onChange={handleFilterChange} />
    </div>
  );
}

// Finde contact by name
