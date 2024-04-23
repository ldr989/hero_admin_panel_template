import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { dataFetching, dataFetched, dataFetchingError } from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "./heroesList.scss";
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const activeElement = useSelector((state) => state.filters).filter(
        (filter) => filter.active === "true"
    );
    const activeHeroes = useSelector((state) => state.heroes).filter(
        (hero) =>
            activeElement[0].element === "all" ||
            activeElement[0].element === hero.element
    );

    const dataLoadingStatus = useSelector((state) => state.dataLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(dataFetching());
        request("http://localhost:3001/db")
            .then((data) => dispatch(dataFetched(data)))
            .catch(() => dispatch(dataFetchingError()));

        // eslint-disable-next-line
    }, []);

    if (dataLoadingStatus === "loading") {
        return <Spinner />;
    } else if (dataLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            <CSSTransition classNames="hero" timeout={0}>
                return <h5 className="text-center mt-5">Героев пока нет</h5>
            </CSSTransition>;
        }

        return arr.map(({ id, ...props }) => {
            return (
                <CSSTransition key={id} classNames="hero" timeout={500}>
                    <HeroesListItem id={id} {...props} />
                </CSSTransition>
            );
        });
    };
    const elements = renderHeroesList(activeHeroes);
    return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
