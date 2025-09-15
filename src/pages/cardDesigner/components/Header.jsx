// src/components/CardHeader.jsx
import React, { useState } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";

const Header = ({ onSearch, onBatchChange, onNewCard }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [batch, setBatch] = useState("all");

    // Handle search typing
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch?.(value);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row  gap-4 ">
                {/* Search */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative w-22 md:w-68">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by student name"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-poppins"
                        />
                    </div>

                    {/* Filters */}

                    {/* Batch/Group */}
                    <div className="relative">
                        <select
                            value={batch}
                            onChange={(e) => {
                                setBatch(e.target.value);
                                onBatchChange?.(e.target.value);
                            }}
                            className="appearance-none border border-gray-300 rounded-lg pl-3 pr-8 py-2 font-poppins focus:ring-2 focus:ring-primary"
                        >
                            <option value="all">All</option>
                            <option value="Student">Student</option>
                            <option value="Mentor">Mentor</option>
                            <option value="Instructor">Instructor</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                    </div>

                    {/* New Card */}
                    <button
                        onClick={onNewCard}
                        className="flex items-center gap-2 bg-primary hover:bg-headcolor text-white px-4 py-2 rounded-lg transition"
                    >
                        <Plus size={18} /> New Card
                    </button>
                </div>
            </div>
        </>
    );
};

export { Header };
