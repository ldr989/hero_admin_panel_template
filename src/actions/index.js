export const heroesFetching = () => {
    return {
        type: "HEROES_FETCHING",
    };
};

export const heroesFetched = (heroes) => {
    return {
        type: "HEROES_FETCHED",
        payload: heroes,
    };
};

export const heroesFetchingError = () => {
    return {
        type: "HEROES_FETCHING_ERROR",
    };
};

export const heroesDeleting = (heroId) => {
    return {
        type: "HEROES_DELETING",
        payload: heroId,
    };
};

export const heroesAdding = (heroData) => {
    return {
        type: "HEROES_ADDING",
        payload: heroData,
    };
};

export const filtersFetching = () => {
    return {
        type: "FILTERS_FETCHING",
    };
};

export const filtersFetched = (filters) => {
    return {
        type: "FILTERS_FETCHED",
        payload: filters,
    };
};

export const filtersFetchingError = () => {
    return {
        type: "FILTERS_FETCHING_ERROR",
    };
};
