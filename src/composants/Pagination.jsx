import React from "react";

const Pagination = ({ currentPage, totalPages, changePage }) => {
    return (
        <nav aria-label="Page navigation" className="mt-4">
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <a
                        href="#"
                        onClick={() => changePage(currentPage > 1 ? currentPage - 1 : 1)}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-blue-600 rounded-s-lg hover:bg-gray-100"
                    >
                        Previous
                    </a>
                </li>
                
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index}>
                        <a
                            href="#"
                            onClick={() => changePage(index + 1)}
                            className={`flex items-center justify-center px-3 h-8 leading-tight ${
                                currentPage === index + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'
                            } border border-blue-600 hover:bg-gray-100`}
                        >
                            {index + 1}
                        </a>
                    </li>
                ))}

                <li>
                    <a
                        href="#"
                        onClick={() => changePage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-blue-600 rounded-e-lg hover:bg-gray-100"
                    >
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
