import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        search: '',
        city: '',
        region: '',
        category: '',
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

    // Функция для обновления текстовых и числовых значений
    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Функция для чекбоксов (переключатель true/false)
    const toggleCheckbox = (key) => {
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Полный сброс всех фильтров к изначальному состоянию
    const resetFilters = () => {
        setFilters({
            search: '', city: '', region: '', category: '', salaryMin: 0,
            fullDay: false, flexible: false, shift: false,
            fullTime: false, partTime: false, projectWork: false, internship: false,
            noExperience: false, exp1to3: false, exp3to6: false, expMore6: false,
            office: false, remote: false, hybrid: false,
        });
    };

    return (
        <FilterContext.Provider value={{ filters, updateFilter, toggleCheckbox, resetFilters }}>
            {children}
        </FilterContext.Provider>
    );
};