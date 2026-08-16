import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('redline_user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            return null;
        }
    });

    const login = (email, role, name, categories = []) => {
        const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${email}`;
        let finalRole = role;
        if (email.startsWith('admin@')) {
            finalRole = 'admin';
        }

        const userData = {
            email,
            role: finalRole,
            name: finalRole === 'admin' ? 'Администратор' : (name || 'Пользователь'),
            avatar: avatarUrl,
            categories: categories,
            about: '',
            shortDescription: '', // Краткое описание компании для шапки вакансии
            socials: [],
            verificationStatus: finalRole === 'employer' ? 'pending' : 'verified'
        };

        setUser(userData);
        localStorage.setItem('redline_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('redline_user');
    };

    const updateUserProfile = (newData) => {
        if (user) {
            const updated = { ...user, ...newData };
            setUser(updated);
            localStorage.setItem('redline_user', JSON.stringify(updated));
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};