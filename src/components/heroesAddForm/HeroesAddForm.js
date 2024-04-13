import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { useHttp } from "../../hooks/http.hook";

import {
    heroesAdding,
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
} from "../../actions";
import Spinner from "../spinner/Spinner";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const AddSchema = Yup.object({
    name: Yup.string()
        .min(2, "Минимум 2 символа!")
        .required("У героя должно быть имя :)"),
    description: Yup.string()
        .min(20, "Минимум 20 символов!")
        .required("Добавьте описание героя!"),
    element: Yup.string()
        .notOneOf(["Я владею элементом..."], "Выберите элемент героя!")
        .required("Выберите элемент героя!"),
});

const HeroesAddForm = () => {
    const filters = useSelector((state) => state.filters);
    const filtersLoadingStatus = useSelector(
        (state) => state.filtersLoadingStatus
    );
    const { request } = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then((data) => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()));
        // eslint-disable-next-line
    }, []);

    const onSubmitHandler = (values, resetForm) => {
        const uniqueId = uuid();
        const { name, description, element } = values;
        const hero = {
            id: uniqueId,
            name,
            description,
            element,
        };
        request("http://localhost:3001/heroes", "POST", JSON.stringify(hero));
        dispatch(heroesAdding(hero));
        resetForm();
    };

    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
                element: "",
            }}
            validationSchema={AddSchema}
            onSubmit={(values, { resetForm }) =>
                onSubmitHandler(values, resetForm)
            }
        >
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">
                        Имя нового героя
                    </label>
                    <Field
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Как меня зовут?"
                    />
                    <ErrorMessage
                        className="error"
                        name="name"
                        component="div"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-4">
                        Описание
                    </label>
                    <Field
                        as="textarea"
                        name="description"
                        className="form-control"
                        id="description"
                        placeholder="Что я умею?"
                        style={{ height: "130px" }}
                    />
                    <ErrorMessage
                        className="error"
                        name="description"
                        component="div"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">
                        Выбрать элемент героя
                    </label>
                    <CreateListofFilters
                        Field={Field}
                        Spinner={Spinner}
                        ErrorMessage={ErrorMessage}
                        status={filtersLoadingStatus}
                        data={filters}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Создать
                </button>
            </Form>
        </Formik>
    );
};

const CreateListofFilters = (props) => {
    const { Field, Spinner, ErrorMessage, status, data } = props;

    if (status === "loading") {
        return <Spinner />;
    } else if (status === "error") {
        return <h6 className="text-center mt-5">Ошибка загрузки элементов</h6>;
    }
    const res = data.map((item, i) => {
        return i >= 1 ? (
            <option key={i} value={item.element}>
                {item.rus}
            </option>
        ) : null;
    });

    return (
        <>
            <Field
                as="select"
                className="form-select"
                id="element"
                name="element"
            >
                <option>Я владею элементом...</option>
                {res}
            </Field>
            <ErrorMessage className="error" name="element" component="div" />
        </>
    );
};

export default HeroesAddForm;
