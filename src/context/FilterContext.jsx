import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        search: '',
        city: '',
        salaryMin: 0,
        // График работы
        fullDay: false,
        flexible: false,
        shift: false,
        // Тип занятости
        fullTime: false,
        partTime: false,
        projectWork: false,
        internship: false,
        // Опыт работы
        noExperience: false,
        exp1to3: false,
        exp3to6: false,
        expMore6: false,
        // Формат работы
        office: false,
        remote: false,
        hybrid: false,
    });

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleCheckbox = (key) => {
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <FilterContext.Provider value={{ filters, updateFilter, toggleCheckbox }}>
            {children}
        </FilterContext.Provider>
    );
};