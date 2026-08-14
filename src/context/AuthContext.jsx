import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('redline_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (email, role, name) => {
        const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${email}`;

        // Бэкдор для MVP: если почта начинается с admin@, даем права администратора
        let finalRole = role;
        if (email.startsWith('admin@')) {
            finalRole = 'admin';
        }

        const userData = {
            email,
            role: finalRole,
            name: finalRole === 'admin' ? 'Администратор' : (name || 'Пользователь'),
            avatar: avatarUrl,
            verificationStatus: finalRole === 'employer' ? 'pending' : 'verified'
        };

        setUser(userData);
        localStorage.setItem('redline_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('redline_user');
    };

    const updateProfilePic = (url) => {
        if (user) {
            const updated = { ...user, avatar: url };
            setUser(updated);
            localStorage.setItem('redline_user', JSON.stringify(updated));
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfilePic }}>
            {children}
        </AuthContext.Provider>
    );
};