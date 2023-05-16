import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { toast } from "react-toastify";

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from "../../Redux/actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "react-toastify/dist/ReactToastify.css";
// Task for this component:
// When you click on the "cross" icon, the character is removed from the overall state
// Complex task:
// Removal is done from the json file using the DELETE method

const HeroesList = () => {
    const { filteredHeroes, heroesLoadingStatus } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(heroesFetching());
                const data = await request("http://localhost:3001/heroes");
                // console.log(data)
                dispatch(heroesFetched(data));
            } catch (err) {
                dispatch(heroesFetchingError());
            }
        };
        fetchData();
    }, [dispatch]);
    
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
