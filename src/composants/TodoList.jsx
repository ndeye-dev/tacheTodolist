
import React from "react";
import ButtonAjouter from "./ButtonAjout";
import Pagination from "./Pagination";
import SearchInput from "./InputFiltre";
import TaskTable from "./Table";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.state = {
            tasks: tasks,
            currentPage: 1,
            itemsPerPage: 5,
            filterText: '',
            task: '',
            description: '',
            isOpen: false,
            isEdit: false,
            currentTaskId: null,
        };
    }

    DonneEnregistre = (tasks) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));

    };

    ajoutTache = (task) => {
        this.setState(
            (prevState) => ({
                tasks: [...prevState.tasks, task],
            }),
            () => this.DonneEnregistre(this.state.tasks)
        );
    };

    modification = (taskId, updatedTask) => {
        this.setState(
            (prevState) => ({
                tasks: prevState.tasks.map((task) =>
                    task.id === taskId ? { ...task, ...updatedTask } : task
                ),
            }),
            () => this.DonneEnregistre(this.state.tasks)
        );
    };

    supprimer = (taskId) => {
        this.setState(
            (prevState) => ({
                tasks: prevState.tasks.filter((task) => task.id !== taskId),
            }),
            () => this.DonneEnregistre(this.state.tasks)
        );
    };

    getPaginatedTasks = () => {
        const { tasks, currentPage, itemsPerPage } = this.state;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return tasks.slice(startIndex, endIndex);
    };

    changePage = (page) => {
        this.setState({ currentPage: page });
    };

    toggleModal = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
            isEdit: false,
            task: '',
            description: '',
        }));
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { task, description, isEdit, currentTaskId } = this.state;

        const newTask = { id: new Date().getTime(), title: task, description };

        if (isEdit) {
            this.modification(currentTaskId, newTask);
        } else {
            this.ajoutTache(newTask);
        }

        this.toggleModal();
    };

    handleFilterChange = (e) => {
        this.setState({ filterText: e.target.value });
    };

    getFilteredTasks = () => {
        const { tasks, filterText } = this.state;
        return tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(filterText.toLowerCase()) ||
                task.description.toLowerCase().includes(filterText.toLowerCase())
        );
    };

    openEditModal = (task) => {
        this.setState({
            isOpen: true,
            isEdit: true,
            task: task.title,
            description: task.description,
            currentTaskId: task.id,
        });
    };

    render() {
        const { currentPage, itemsPerPage, task, description, isOpen, filterText, isEdit } = this.state;
        const filteredTasks = this.getFilteredTasks();
        const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
        const paginatedTasks = filteredTasks.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        return (
            <div className="p-4 text-center container mx-auto w-2/4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                         <SearchInput filterText={filterText} handleFilterChange={this.handleFilterChange} />

                    </div>
                <div>
                <ButtonAjouter toggleModal={this.toggleModal} />
                
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-8 shadow-lg">
                            <h2 className="text-lg font-bold mb-4">{isEdit ? "Modifier une tâche" : "Ajouter une tâche"}</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Tâche</label>
                                    <input
                                        type="text"
                                        name="task"
                                        value={task}
                                        onChange={this.handleChange}
                                        className="mt-1 block w-full p-2 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <input
                                        name="description"
                                        value={description}
                                        onChange={this.handleChange}
                                        className="mt-1 block w-full p-2 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        className=" bg-gray-400 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                                        onClick={this.toggleModal}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                                    >
                                        {isEdit ? "Modifier" : "Ajouter"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
              </div>
                {/* Task Table */}
                <TaskTable tasks={paginatedTasks} openEditModal={this.openEditModal} supprimer={this.supprimer} />

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    changePage={this.changePage}
                />
            </div>
        );
    }
}

export default TodoList;
