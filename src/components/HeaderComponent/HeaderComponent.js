import React from 'react';
import './HeaderComponent.css';

function HeaderComponent ({todo}) {
    const totalTasks = todo.taches.length;
    const tasksInProgress = todo.taches.filter(tache => !tache.done).length;
    const tasksDisplayed = totalTasks;

    return (
        <header>
            <h1>Todo amU</h1>
            <p>{totalTasks} Tâches dont {tasksInProgress} En cours ({tasksDisplayed} Affichées)</p>
        </header>
    );
}

export default HeaderComponent;
