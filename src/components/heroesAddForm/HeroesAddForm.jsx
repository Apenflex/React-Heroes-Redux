import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import { heroCreated } from "../../Redux/actions";

import "react-toastify/dist/ReactToastify.css";
// Task for this component:
// Implement the creation of a new hero with the entered data. It should be added
// to the overall state and displayed in the list + filtered
// A unique identifier for the character can be generated using uiid
// Complex task:
// The character is also created in the json file using the POST method
// Additional:
// It is desirable to form the <option></option> elements based on
// the data from the filters

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState("");
    const [heroDescription, setHeroDescription] = useState("");
    const [heroElement, setHeroElement] = useState("");

    const { filters, filtersLoadingStatus } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescription,
            element: heroElement,
        };

        try {
            await request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero));
            console.log("Created");
            dispatch(heroCreated(newHero));
            toast.success("Hero created");
            setHeroName("");
            setHeroDescription("");
            setHeroElement("");
        } catch (err) {
            console.log(err);
        }
    };

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Loading elements</option>;
        } else if (status === "error") {
            return <option>Loading error</option>;
        }

        if (filters && filters.length > 0) {
            return filters
                .filter(({ name }) => name !== "all")
                .map(({ name, label }) => (
                    <option key={name} value={name}>
                        {label}
                    </option>
                ));
        }

        return null;
    };

    return (
        <form
            className="border p-4 shadow-lg rounded"
            onSubmit={onSubmitHandler}
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">
                    Name of a new hero
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="What is my name?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">
                    Description
                </label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="What can I do?"
                    style={{ height: "130px" }}
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Select hero element
                </label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                >
                    <option value="">I own the element...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Create
            </button>
        </form>
    );
};

export default HeroesAddForm;
