import React from "react";

const TaskTable = ({ tasks, openEditModal, supprimer }) => {
    return (
        <table className="min-w-full table-auto mt-5">
            <thead>
                <tr className="bg-blue-600 text-white">
                    <th className="px-4 py-2 border">Tâche</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2 border">{task.title}</td>
                        <td className="px-4 py-2 border">{task.description}</td>
                        <td className="px-4 py-2 border">
                            <button
                                onClick={() => openEditModal(task)}
                                className="bg-yellow-500 text-white px-3 py-1 text-sm rounded mr-2"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => supprimer(task.id)}
                                className="bg-red-500 text-white px-3 py-1 text-sm rounded"
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TaskTable;
