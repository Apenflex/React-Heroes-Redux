import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';

import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from "../../Redux/actions";
import Spinner from "../spinner/Spinner";
// Task for this component:
// Filters should be generated based on the loaded data
// Filters should display only the relevant heroes when selected
// The active filter should have the class "active"
// Modifying the JSON file for convenience is ALLOWED!
// Imagine that you have requested this from the backend developer

const HeroesFilters = () => {
    const { filters, filtersLoadingStatus, activeFilter } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(filtersFetching());
                const data = await request("http://localhost:3001/filters");
                dispatch(filtersFetched(data));
            } catch (err) {
                dispatch(filtersFetchingError());
            }
        };
        fetchData();
    }, [dispatch]);

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>;
    }
    
    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5"> No filters yet</h5>;
        }

        return arr.map(({ name, label, className }) => {
            const btnClass = classNames("btn", className, {
                'active': name === activeFilter,
            });

            return (
                <button
                    key={name}
                    type="button"
                    className={btnClass}
                    onClick={() => dispatch(activeFilterChanged(name))}>
                    {label}
                </button>
            );
        });
    };

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by elements</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    );
};

export default HeroesFilters;
