import React, { useState, useEffect, useContext, useMemo } from 'react';
import { mockVacancies } from '../mocks/data';
import { CATEGORIES } from '../mocks/data';
import VacancyCard from '../components/shared/VacancyCard';
import { FilterContext } from '../context/FilterContext';
import { Filter, MapPin, Map, RefreshCcw, X } from 'lucide-react';

// Чекбокс в новом строгом стиле
const CustomCheckbox = ({ label, checked, onChange }) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '16px', fontSize: '14px', color: '#000', fontWeight: 700 }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '6px', border: checked ? 'none' : '2px solid #E5E7EB', backgroundColor: checked ? '#A50C20' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
            {checked && <div style={{ width: '10px', height: '10px', backgroundColor: '#FFF', borderRadius: '2px' }} />}
        </div>
        <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} />
        {label}
    </label>
);

export default function Home() {
    const { filters, updateFilter, toggleCheckbox, resetFilters } = useContext(FilterContext);
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredData = useMemo(() => {
        let res = mockVacancies;

        // ИСПРАВЛЕНО: Текстовый поиск ищет и по названию вакансии, и по названию компании
        if (filters.search) {
            const query = filters.search.toLowerCase();
            res = res.filter(v =>
                v.title.toLowerCase().includes(query) ||
                v.company.toLowerCase().includes(query)
            );
        }

        // Территория
        if (filters.city) res = res.filter(v => v.location.toLowerCase().includes(filters.city.toLowerCase()));
        if (filters.region) res = res.filter(v => v.region && v.region.toLowerCase().includes(filters.region.toLowerCase()));

        // Категория
        if (filters.category) res = res.filter(v => v.category === filters.category);

        // Зарплата
        if (filters.salaryMin > 0) res = res.filter(v => v.salaryMin >= filters.salaryMin);

        // График работы
        const activeSchedules = [];
        if (filters.fullDay) activeSchedules.push('fullDay');
        if (filters.flexible) activeSchedules.push('flexible');
        if (filters.shift) activeSchedules.push('shift');
        if (activeSchedules.length > 0) res = res.filter(v => activeSchedules.includes(v.schedule));

        // Тип занятости
        const activeEmployments = [];
        if (filters.fullTime) activeEmployments.push('fullTime');
        if (filters.partTime) activeEmployments.push('partTime');
        if (filters.projectWork) activeEmployments.push('projectWork');
        if (filters.internship) activeEmployments.push('internship');
        if (activeEmployments.length > 0) res = res.filter(v => activeEmployments.includes(v.employment));

        // Сортировка
        if (sortOrder === 'newest') {
            res.sort((a, b) => b.id - a.id);
        } else if (sortOrder === 'salaryDesc') {
            res.sort((a, b) => b.salaryMin - a.salaryMin);
        } else if (sortOrder === 'salaryAsc') {
            res.sort((a, b) => a.salaryMin - b.salaryMin);
        }

        return res;
    }, [filters, sortOrder]);

    return (
        <div style={{ padding: isMobile ? '0 16px 40px' : '0 32px 60px', maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: !isMobile ? '320px 1fr' : '1fr', gap: '32px' }}>

            {/* САЙДБАР С ФИЛЬТРАМИ */}
            <aside style={{
                display: !isMobile || sidebarOpen ? 'flex' : 'none',
                flexDirection: 'column',
                gap: '24px',
                backgroundColor: '#FFFFFF',
                borderRadius: isMobile ? '0' : '32px',
                padding: isMobile ? '24px' : '32px',
                border: isMobile ? 'none' : '1px solid #E5E7EB',
                position: !isMobile ? 'sticky' : 'fixed',
                top: !isMobile ? '20px' : '0',
                left: 0,
                width: isMobile ? '100%' : 'auto',
                height: isMobile ? '100vh' : 'fit-content',
                zIndex: isMobile ? 100 : 1,
                overflowY: 'auto'
            }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, margin: 0, color: '#000' }}>Фильтры</h3>
                    {isMobile && (
                        <button onClick={() => setSidebarOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: '#000', color: '#FFF', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                            Закрыть <X size={18} />
                        </button>
                    )}
                </div>

                {/* Территориальный фильтр */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: '#A50C20', textTransform: 'uppercase' }}>Территория</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#F9FAFB', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                        <Map size={20} color="#666" />
                        <input type="text" placeholder="Велаят (Регион)" value={filters.region} onChange={e => updateFilter('region', e.target.value)} style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '15px', fontWeight: 600 }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#F9FAFB', padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                        <MapPin size={20} color="#666" />
                        <input type="text" placeholder="Город" value={filters.city} onChange={e => updateFilter('city', e.target.value)} style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '15px', fontWeight: 600 }} />
                    </div>
                </div>

                {/* Категории */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: '#A50C20', textTransform: 'uppercase' }}>Отрасль</h4>
                    <select value={filters.category} onChange={e => updateFilter('category', e.target.value)} style={{ padding: '14px', borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '15px', fontWeight: 700, outline: 'none', cursor: 'pointer' }}>
                        <option value="">Все отрасли</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                {/* График работы */}
                <div>
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 900, color: '#A50C20', textTransform: 'uppercase' }}>График работы</h4>
                    <CustomCheckbox label="Полный день" checked={filters.fullDay} onChange={() => toggleCheckbox('fullDay')} />
                    <CustomCheckbox label="Гибкий график" checked={filters.flexible} onChange={() => toggleCheckbox('flexible')} />
                    <CustomCheckbox label="Вахтовый метод" checked={filters.shift} onChange={() => toggleCheckbox('shift')} />
                </div>

                {/* Тип занятости */}
                <div>
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 900, color: '#A50C20', textTransform: 'uppercase' }}>Тип занятости</h4>
                    <CustomCheckbox label="Полная занятость" checked={filters.fullTime} onChange={() => toggleCheckbox('fullTime')} />
                    <CustomCheckbox label="Частичная занятость" checked={filters.partTime} onChange={() => toggleCheckbox('partTime')} />
                    <CustomCheckbox label="Проектная работа" checked={filters.projectWork} onChange={() => toggleCheckbox('projectWork')} />
                </div>

                {/* Сброс */}
                <button onClick={resetFilters} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '16px', backgroundColor: '#F3F4F6', color: '#000', border: 'none', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', marginTop: 'auto' }}>
                    <RefreshCcw size={18} /> Сбросить фильтры
                </button>
            </aside>

            {/* КОНТЕНТ (СЕТКА) */}
            <main>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: 900, margin: 0, color: '#000' }}>Вакансии</h1>
                        <span style={{ backgroundColor: '#A50C20', color: '#FFF', padding: '6px 14px', borderRadius: '12px', fontSize: '14px', fontWeight: 900 }}>{filteredData.length}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {isMobile && (
                            <button onClick={() => setSidebarOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', backgroundColor: '#000', color: '#FFF', border: 'none', borderRadius: '12px', fontWeight: 900 }}>
                                <Filter size={18} /> Фильтры
                            </button>
                        )}
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none', backgroundColor: '#FFF', fontSize: '15px', fontWeight: 800, color: '#000', cursor: 'pointer' }}>
                            <option value="newest">Сначала новые</option>
                            <option value="salaryDesc">Дорогие сверху</option>
                            <option value="salaryAsc">Дешевые сверху</option>
                        </select>
                    </div>
                </div>

                {filteredData.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                        {filteredData.map(v => <VacancyCard key={v.id} vacancy={v} />)}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#FFF', borderRadius: '32px', border: '1px solid #E5E7EB' }}>
                        <h3 style={{ fontSize: '24px', color: '#000', fontWeight: 900, marginBottom: '8px' }}>Ничего не найдено</h3>
                        <p style={{ color: '#666', fontSize: '16px' }}>Попробуйте изменить регион, очистить строку поиска или сбросить фильтры.</p>
                    </div>
                )}
            </main>
        </div>
    );
}