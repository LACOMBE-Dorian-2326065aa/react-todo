import './App.css';
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import BodyComponent from "./components/BodyComponent/BodyComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import {useState} from "react";
import todoJSON from './data/start.json';

function App() {
    const [todo, setTodo] = useState(todoJSON);

    const deleteTask = (taskId) => {
        const updatedTasks = todo.taches.filter(tache => tache.id !== taskId);
        setTodo({
            ...todo,
            taches: updatedTasks
        });
    };

    const checkTask = (taskId) => {
        const updatedTasks = todo.taches.map(tache => {
            if (tache.id === taskId) {
                return {
                    ...tache,
                    done: !tache.done
                };
            }
            return tache;
        });
        setTodo({
            ...todo,
            taches: updatedTasks
        });
    }

    const generateId = (array) => {
        return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
    };

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = {
            id: generateId(todo.taches),
            title: formData.get('title'),
            description: formData.get('description'),
            date_creation: new Date().toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            date_echeance: new Date(formData.get('dueDate')).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            done: false,
            urgent: formData.get('urgent') === 'on',
            contacts: []
        };

        const updatedTaches = [...todo.taches, newTask];
        const updatedRelations = [...todo.relations];

        const categoryId = formData.get('categoryId');
        if (categoryId) {
            updatedRelations.push({
                tache: newTask.id,
                categorie: parseInt(categoryId, 10)
            });
        }

        setTodo({
            ...todo,
            taches: updatedTaches,
            relations: updatedRelations
        });
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newCategory = {
            id: generateId(todo.categories),
            title: formData.get('title'),
            description: "",
            color: formData.get('color'),
            icon: ""
        };

        const updatedCategories = [...todo.categories, newCategory];
        setTodo({
            ...todo,
            categories: updatedCategories
        });
    };

    return (
        <div id='root' className="App">
            <HeaderComponent todo={todo} />
            <BodyComponent todo={todo} deleteTask={deleteTask} checkTask={checkTask} />
            <FooterComponent todo={todo} handleTaskSubmit={handleTaskSubmit} handleCategorySubmit={handleCategorySubmit} />
        </div>
    );
}

export default App;