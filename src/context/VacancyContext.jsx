import React, { createContext, useState, useEffect } from 'react';
import { mockVacancies } from '../mocks/data';

export const VacancyContext = createContext();

export const VacancyProvider = ({ children }) => {
    const [vacancies, setVacancies] = useState(() => {
        try {
            const saved = localStorage.getItem('redline_vacancies');
            return saved ? JSON.parse(saved) : mockVacancies;
        } catch {
            return mockVacancies;
        }
    });

    useEffect(() => {
        localStorage.setItem('redline_vacancies', JSON.stringify(vacancies));
    }, [vacancies]);

    // Добавление новой вакансии (попадает на модерацию со статусом pending)
    const addVacancy = (newVacancy) => {
        setVacancies(prev => [newVacancy, ...prev]);
    };

    // Одобрение админом
    const approveVacancy = (id) => {
        setVacancies(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' } : v));
    };

    // Отклонение админом / Удаление работодателем
    const rejectVacancy = (id) => {
        setVacancies(prev => prev.filter(v => v.id !== id));
    };

    return (
        <VacancyContext.Provider value={{ vacancies, addVacancy, approveVacancy, rejectVacancy }}>
            {children}
        </VacancyContext.Provider>
    );
};