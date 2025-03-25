import React, { useEffect, useState } from 'react';
import './BodyComponent.css';

function BodyComponent({ todo, deleteTask, checkTask }) {
    const [expandedTasks, setExpandedTasks] = useState({});
    const [activeFilter, setActiveFilter] = useState(true);
    const [sortType, setSortType] = useState('default');
    const [sortedTasks, setSortedTasks] = useState([]);

    const toggleTask = (taskId) => {
        setExpandedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
    };

    const getCategory = (taskId) => {
        const relation = todo.relations.find(r => r.tache === taskId);
        return relation ? todo.categories.find(c => c.id === relation.categorie) : null;
    };

    // Fonction pour parser les dates en format français (jj/mm/aaaa)
    const parseFrenchDate = (dateString) => {
        if (!dateString) return null;
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    useEffect(() => {
        const filtered = todo.taches.filter(tache => activeFilter || !tache.done);
        const sorted = [...filtered].sort((a, b) => {
            switch(sortType) {
                case 'date_creation': {
                    const dateA = parseFrenchDate(a.date_creation) || new Date(0);
                    const dateB = parseFrenchDate(b.date_creation) || new Date(0);
                    return dateA - dateB;
                }

                case 'date_echeance': {
                    const dateA = parseFrenchDate(a.date_echeance) || new Date(8640000000000000); // Date très lointaine
                    const dateB = parseFrenchDate(b.date_echeance) || new Date(8640000000000000);
                    return dateA - dateB;
                }

                case 'title':
                    return a.title.localeCompare(b.title);

                default:
                    return 0;
            }
        });
        setSortedTasks(sorted);
    }, [todo.taches, sortType, activeFilter]);

    // Fonction pour formater l'affichage des dates
    const formatDate = (dateString) => {
        if (!dateString) return 'Non définie';
        return dateString; // Conserve le format original pour l'affichage
    };

    return (
        <>
            <div className='filters'>
                <div className="switch-container">
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={activeFilter}
                            onChange={(e) => setActiveFilter(e.target.checked)}
                        />
                        <span className="slider"></span>
                    </label>
                    <p>Effectuées</p>
                </div>
                <p>Trier par :</p>
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                >
                    <option value="default">Par défaut</option>
                    <option value="date_creation">Date de création</option>
                    <option value="date_echeance">Date d'échéance</option>
                    <option value="title">Titre</option>
                </select>
            </div>

            <div className='tasks-list'>
                {sortedTasks.map(tache => {
                    const category = getCategory(tache.id);
                    return (
                        <section key={tache.id} className="task">
                            {tache.urgent && <span className="urgent">*</span>}

                            <div className="task-header" onClick={() => toggleTask(tache.id)}>
                                <span>
                                    <input
                                        type="checkbox"
                                        checked={tache.done}
                                        onChange={() => checkTask(tache.id)}
                                    />
                                    <h2>
                                        <div
                                            className="rond"
                                            style={{backgroundColor: category?.color || 'transparent'}}
                                        />
                                        {tache.title}
                                        {category && <span>({category.title})</span>}
                                    </h2>
                                </span>
                                <span>
                                    {formatDate(tache.date_echeance)}
                                    <img
                                        src={`${process.env.PUBLIC_URL}/arrow-down.png`}
                                        alt="Toggle details"
                                        className={expandedTasks[tache.id] ? 'expanded' : ''}
                                    />
                                </span>
                            </div>

                            {expandedTasks[tache.id] && (
                                <div className="task-details">
                                    <p>{tache.description}</p>
                                    {tache.contacts?.length > 0 && (
                                        <p className="contacts">
                                            Contacts: {tache.contacts.map(c => c.name).join(', ')}
                                        </p>
                                    )}
                                    <div className="task-footer">
                                        <p>Créée le : {formatDate(tache.date_creation)}</p>
                                        <button onClick={() => deleteTask(tache.id)}>
                                            Supprimer
                                        </button>
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