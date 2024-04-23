const initialState = {
    heroes: [],
    dataLoadingStatus: "idle",
    filters: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "DATA_FETCHING":
            return {
                ...state,
                dataLoadingStatus: "loading",
            };
        case "DATA_FETCHED":
            return {
                ...state,
                heroes: action.payload.heroes,
                filters: action.payload.filters,
                dataLoadingStatus: "idle",
            };
        case "DATA_FETCHING_ERROR":
            return {
                ...state,
                dataLoadingStatus: "error",
            };
        case "HEROES_DELETING":
            return {
                ...state,
                heroes: state.heroes.filter(
                    (hero) => hero.id !== action.payload
                ),
            };
        case "HEROES_ADDING":
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
            };
        case "ACTIVITY_CHANGE":
            return {
                ...state,
                filters: state.filters.map(
                    (filter) =>
                        (filter = {
                            ...filter,
                            active:
                                filter.element === action.payload
                                    ? "true"
                                    : "false",
                        })
                ),
            };
        default:
            return state;
    }
};

export default reducer;
