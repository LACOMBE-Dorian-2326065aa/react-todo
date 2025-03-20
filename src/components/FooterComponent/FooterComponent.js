import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './FooterComponent.css';

// Définir l'élément racine pour l'accessibilité
ReactModal.setAppElement('#root');

const FooterComponent = ({ todo, handleTaskSubmit, handleCategorySubmit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formType, setFormType] = useState('');

    const openModal = (type) => {
        setFormType(type);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setFormType('');
    };

    const handleTaskBeforeSubmit = (e) => {
        e.preventDefault();
        handleTaskSubmit(e);
        closeModal();
    }

    const handleCategoryBeforeSubmit = (e) => {
        e.preventDefault();
        handleCategorySubmit(e);
        closeModal();
    }

    return (
        <footer>
            <button onClick={() => openModal('task')}>+ Ajouter une tâche</button>
            <button onClick={() => openModal('category')}>+ Ajouter une catégorie</button>

            <ReactModal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Exemple de modale"
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
            >
                <button className="close-button" onClick={closeModal}>×</button>
                <h2>{formType === 'task' ? 'Ajouter une tâche' : 'Ajouter une catégorie'}</h2>
                {formType === 'task' ? (
                    <form onSubmit={handleTaskBeforeSubmit}>
                        <label>
                            Titre:
                            <input type="text" name="title" required/>
                        </label>
                        <label>
                            Description:
                            <textarea name="description"></textarea>
                        </label>
                        <label>
                            Date d'échéance:
                            <input type="date" name="dueDate" required/>
                        </label>
                        <label>
                            Catégorie:
                            <select name="categoryId">
                                <option value="">Sélectionnez une catégorie</option>
                                {todo.categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            <input type="checkbox" name="urgent"/> Tâche urgente
                        </label>
                        <button type="submit">Ajouter</button>
                    </form>
                ) : (
                    <form onSubmit={handleCategoryBeforeSubmit}>
                        <label>
                            Titre:
                            <input type="text" name="title" required/>
                        </label>
                        <label>
                            Couleur:
                            <input type="color" name="color" defaultValue="#ff0000"/>
                        </label>
                        <button type="submit">Ajouter</button>
                    </form>
                )}
            </ReactModal>
        </footer>
    );
};

export default FooterComponent;