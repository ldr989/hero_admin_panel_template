export const dataFetching = () => {
    return {
        type: "DATA_FETCHING",
    };
};

export const dataFetched = (data) => {
    return {
        type: "DATA_FETCHED",
        payload: data,
    };
};

export const dataFetchingError = () => {
    return {
        type: "DATA_FETCHING_ERROR",
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

export const activityСhange = (btnId) => {
    return {
        type: "ACTIVITY_CHANGE",
        payload: btnId,
    };
};
