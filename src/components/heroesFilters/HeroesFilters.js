// import { useHttp } from "../../hooks/http.hook";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { activityСhange } from "../../actions";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const filters = useSelector((state) => state.filters);
    const status = useSelector((state) => state.dataLoadingStatus);
    const dispatch = useDispatch();

    const onFilterClick = (e) => {
        const target = e.target;
        dispatch(activityСhange(target.id));
    };

    const btnList =
        status === "idle" ? (
            <BtnGroup data={filters} func={onFilterClick} />
        ) : null;
    const loading = status === "loading" ? <Spinner /> : null;
    const error =
        status === "error" ? (
            <h6 className="text-center">Ошибка загрузки элементов</h6>
        ) : null;

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                {btnList}
                {loading}
                {error}
            </div>
        </div>
    );
};

const BtnGroup = (props) => {
    const { data, func } = props;

    const res = data.map((item, i) => {
        const isActive = item.active === "true" ? true : false;
        const className = classNames(item.btnClassName, {
            active: isActive,
        });

        return (
            <button
                key={i}
                id={item.element}
                className={className}
                onClick={(e) => func(e)}
            >
                {item.rus}
            </button>
        );
    });

    return <div className="btn-group">{res}</div>;
};

export default HeroesFilters;
