import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ShieldAlert, CheckCircle2, XCircle, FileText, Search } from 'lucide-react';

// Моковые данные компаний, ожидающих проверку
const initialPendingCompanies = [
    {
        id: 1,
        name: 'ООО "Алтын Асыр"',
        email: 'hr@altynasyr.tm',
        date: 'Сегодня, 14:30',
        docs: [
            'Устав предприятия', 'Свидетельство о регистрации', 'Выписка из ЕГРЮЛ',
            'Справка из органа статистики', 'Приказ о назначении', 'Договор аренды', 'Справка из банка'
        ]
    },
    {
        id: 2,
        name: 'Gara Altyn IT',
        email: 'contact@garaaltyn.tm',
        date: 'Вчера, 09:15',
        docs: [
            'Устав предприятия', 'Свидетельство о регистрации', 'Выписка из ЕГРЮЛ',
            'Справка из органа статистики', 'Приказ о назначении', 'Договор аренды', 'Справка из банка'
        ]
    }
];

export default function AdminDashboard() {
    const { user, logout } = useContext(AuthContext);
    const [companies, setCompanies] = useState(initialPendingCompanies);
    const [searchTerm, setSearchTerm] = useState('');

    if (!user) return null;

    const handleApprove = (id) => {
        setCompanies(companies.filter(c => c.id !== id));
        alert('Компания успешно верифицирована! Работодатель получил уведомление.');
    };

    const handleReject = (id) => {
        const reason = prompt('Укажите причину отказа (например, "Нечеткий скан паспорта"):');
        if (reason) {
            setCompanies(companies.filter(c => c.id !== id));
            alert('В верификации отказано. Работодатель получит письмо с причиной.');
        }
    };

    const filteredCompanies = companies.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px' }}>

            {/* Шапка админки */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px 0', color: '#131313' }}>Панель управления</h1>
                    <p style={{ color: '#666', margin: 0, fontSize: '15px' }}>Модерация работодателей и проверка документов</p>
                </div>
                <button onClick={logout} style={{ padding: '12px 24px', backgroundColor: '#131313', color: '#FFF', border: 'none', borderRadius: '16px', fontWeight: 700, cursor: 'pointer' }}>
                    Выйти из админки
                </button>
            </div>

            {/* Статистика и Поиск */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px', backgroundColor: '#FFF', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '56px', height: '56px', backgroundColor: '#FEF3C7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldAlert size={28} color="#D97706" />
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#131313' }}>{companies.length}</div>
                        <div style={{ fontSize: '13px', color: '#666', fontWeight: 600 }}>Ожидают проверки</div>
                    </div>
                </div>

                <div style={{ flex: 2, minWidth: '300px', backgroundColor: '#FFF', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Search size={24} color="#9CA3AF" />
                    <input
                        type="text"
                        placeholder="Поиск по названию компании или email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px', color: '#131313', fontWeight: 500 }}
                    />
                </div>
            </div>

            {/* Список заявок на верификацию */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
                {filteredCompanies.length > 0 ? filteredCompanies.map((company) => (
                    <div key={company.id} style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '32px', boxShadow: '0 12px 24px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div>
                                <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px 0', color: '#131313' }}>{company.name}</h2>
                                <div style={{ fontSize: '13px', color: '#666' }}>{company.email} • Заявка от {company.date}</div>
                            </div>
                            <span style={{ backgroundColor: '#FEF3C7', color: '#D97706', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                                На модерации
                            </span>
                        </div>

                        <div style={{ border: '1px solid #E5E7EB', borderRadius: '16px', padding: '16px', marginBottom: '24px', flexGrow: 1 }}>
                            <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 700, letterSpacing: '1px', marginBottom: '12px' }}>
                                Пакет документов (7/7)
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {company.docs.map((doc, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4B5563', fontWeight: 500 }}>
                                        <FileText size={14} color="#3B82F6" /> {doc}
                                    </div>
                                ))}
                            </div>
                            <button style={{ width: '100%', marginTop: '16px', padding: '10px', backgroundColor: '#F3F4F6', border: 'none', borderRadius: '12px', color: '#131313', fontWeight: 600, cursor: 'pointer' }}>
                                Скачать единым архивом
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => handleApprove(company.id)}
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', backgroundColor: '#10B981', color: '#FFF', border: 'none', borderRadius: '16px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
                            >
                                <CheckCircle2 size={18} /> Одобрить
                            </button>
                            <button
                                onClick={() => handleReject(company.id)}
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', backgroundColor: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '16px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
                            >
                                <XCircle size={18} /> Отклонить
                            </button>
                        </div>
                    </div>
                )) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', backgroundColor: '#FFF', borderRadius: '32px' }}>
                        <h3 style={{ fontSize: '20px', color: '#131313', marginBottom: '8px' }}>Новых заявок нет</h3>
                        <p style={{ color: '#666' }}>Все компании проверены. Вы отлично справляетесь!</p>
                    </div>
                )}
            </div>

        </div>
    );
}