import React from "react";
import './TodosLoading.css';

function TodosLoading(){
    return(
        <div className="container">
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        </div>
    )
}

export {TodosLoading};