import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { toast } from "react-toastify";
import { createSelector } from "reselect";

import { fetchHeroes, heroDeleted } from "../../Redux/actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "react-toastify/dist/ReactToastify.css";
// Task for this component:
// When you click on the "cross" icon, the character is removed from the overall state
// Complex task:
// Removal is done from the json file using the DELETE method

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (activeFilter, heroes) => { 
            if (activeFilter === "all") {
                console.log("all")
                return heroes;
            } else {
                return heroes.filter((hero) => hero.element === activeFilter);
            }
        }
    )

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const { heroesLoadingStatus } = useSelector((state) => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request]);
    
    const onDelete = useCallback(
        async (id) => {
            try {
                await request(`http://localhost:3001/heroes/${id}`, "DELETE");
                console.log("Deleted");
                dispatch(heroDeleted(id));
                toast.success("Hero deleted");
            } catch (err) {
                console.log(err);
            }
        },
        [request, dispatch]
    );

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">No heroes yet</h5>
                </CSSTransition>
            )
        }

        return arr.map(({ id, ...props }) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem {...props} onDelete={() => onDelete(id)} />
                </CSSTransition>
            )
        });
    };

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
};

export default HeroesList;
