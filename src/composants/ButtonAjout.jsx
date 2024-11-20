import React from "react";

const ButtonAjouter = ({ toggleModal }) => {
    return (
        <button
            type="button"
            className="rounded-md bg-blue-600  p-2 text-sm  text-white shadow-sm hover:bg-blue-500 focus-visible:outline-indigo-600 "
            onClick={toggleModal}
        >
            Ajouter
        </button>
    );
};

export default ButtonAjouter;
