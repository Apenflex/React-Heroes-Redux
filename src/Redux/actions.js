export const fetchHeroes = (request) => async (dispatch) => {
    try {
        dispatch(heroesFetching());
        const data = await request("http://localhost:3001/heroes");
        dispatch(heroesFetched(data));
    } catch (err) {
        dispatch(heroesFetchingError());
    }
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const fetchFilters = (request) => async (dispatch) => {
    try {
        dispatch(filtersFetching());
        const data = await request("http://localhost:3001/filters");
        dispatch(filtersFetched(data));
    } catch (err) {
        dispatch(filtersFetchingError());
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }

}

export const heroCreated = (hero) => {
    return {
        type: 'HERO_CREATED',
        payload: hero
    }
}

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
}