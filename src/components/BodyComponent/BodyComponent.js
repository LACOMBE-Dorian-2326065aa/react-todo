import React, { useState } from 'react';
import './BodyComponent.css';

function BodyComponent({ todo, deleteTask, checkTask }) {
    const [expandedTasks, setExpandedTasks] = useState({});
    const [activeFilter, setActiveFilter] = useState(true);

    const toggleTask = (taskId) => {
        setExpandedTasks(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }));
    };

    const getCategory = (taskId) => {
        const relation = todo.relations.find(relation => relation.tache === taskId);

        if (!relation) {
            return null;
        }

        const category = todo.categories.find(category => category.id === relation.categorie);
        return category;
    }

    return (
        <>
            <div className='filters'>
                <label className="switch">
                    <input type="checkbox" checked={activeFilter} onChange={(e) => setActiveFilter(e.target.checked)} />
                    <span className="slider"></span>
                </label>
                <p>Effectuées</p>
            </div>
            <div className='tasks-list'>
                {todo.taches.map(tache => {
                    const category = getCategory(tache.id);
                    return (
                        (activeFilter || (!activeFilter && !tache.done)) &&
                        <section key={tache.id} className='task'>
                            {tache.urgent && <span className='urgent'>*</span>}
                            <div className='task-header'>
                                <span>
                                    <input type='checkbox' checked={tache.done} onChange={() => checkTask(tache.id)} />
                                    <h2>
                                        <div className='rond' style={{ backgroundColor: category ? category.color : 'transparent' }}></div>
                                        {tache.title}
                                        <span>{category ? `(${category.title})` : ''}</span>
                                    </h2>
                                </span>
                                <span>
                                    {tache.date_echeance}
                                    <img
                                        src={`${process.env.PUBLIC_URL}/arrow-down.png`}
                                        alt="Arrow Down"
                                        className={expandedTasks[tache.id] ? 'expanded' : ''}
                                        onClick={() => toggleTask(tache.id)}
                                    />
                                </span>
                            </div>

                            {expandedTasks[tache.id] && (
                                <div className='task-details'>
                                    <p>{tache.description}</p>
                                    {tache.contacts.length > 0 &&
                                        <p className="contacts">Contacts: {tache.contacts.map(contact => contact.name).join(', ')}</p>
                                    }
                                    <div className='task-footer'>
                                        <p className='created-at'>Créée le : {tache.date_creation}</p>
                                        <button onClick={() => deleteTask(tache.id)}>Supprimer</button>
                                    </div>
                                </div>
                            )}
                        </section>
                    );
                })}
            </div>
        </>
    );
}

export default BodyComponent;