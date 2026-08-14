import React, { useState, useEffect, useContext, useMemo } from 'react';
import { mockVacancies } from '../mocks/vacancies';
import VacancyCard from '../components/shared/VacancyCard';
import { FilterContext } from '../context/FilterContext';
import { ChevronDown, ChevronUp, PanelLeftClose, PanelLeftOpen, Settings2, Check } from 'lucide-react';

const CustomCheckbox = ({ label, checked, onChange }) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '16px', fontSize: '14px', color: '#131313', fontWeight: 500 }}>
        <div style={{
            width: '20px', height: '20px', borderRadius: '6px',
            border: checked ? 'none' : '2px solid #D1D5DB',
            backgroundColor: checked ? '#131313' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
        }}>
            {checked && <Check size={14} color="#FFF" />}
        </div>
        <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} />
        {label}
    </label>
);

const FilterSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div style={{ marginBottom: '24px' }}>
            <div onClick={() => setIsOpen(!isOpen)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: isOpen ? '16px' : '0' }}>
                <h4 style={{ fontSize: '13px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>{title}</h4>
                {isOpen ? <ChevronUp size={16} color="#9CA3AF" /> : <ChevronDown size={16} color="#9CA3AF" />}
            </div>
            {isOpen && <div>{children}</div>}
        </div>
    );
};

export default function Home() {
    const { filters, toggleCheckbox } = useContext(FilterContext);
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sortOrder, setSortOrder] = useState('relevant');

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) setSidebarOpen(false);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredAndSortedVacancies = useMemo(() => {
        let result = mockVacancies;

        // Текст и Город и Зарплата
        if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter(v => v.title.toLowerCase().includes(q) || v.company.toLowerCase().includes(q));
        }
        if (filters.city) result = result.filter(v => v.location.toLowerCase().includes(filters.city.toLowerCase()));
        if (filters.salaryMin > 0) result = result.filter(v => v.salaryMin >= filters.salaryMin);

        // График работы
        const activeSchedules = [];
        if (filters.fullDay) activeSchedules.push('fullDay');
        if (filters.flexible) activeSchedules.push('flexible');
        if (filters.shift) activeSchedules.push('shift');
        if (activeSchedules.length > 0) result = result.filter(v => activeSchedules.includes(v.schedule));

        // Тип занятости
        const activeEmployments = [];
        if (filters.fullTime) activeEmployments.push('fullTime');
        if (filters.partTime) activeEmployments.push('partTime');
        if (filters.projectWork) activeEmployments.push('projectWork');
        if (filters.internship) activeEmployments.push('internship');
        if (activeEmployments.length > 0) result = result.filter(v => activeEmployments.includes(v.employment));

        // Опыт работы
        const activeExp = [];
        if (filters.noExperience) activeExp.push('noExperience');
        if (filters.exp1to3) activeExp.push('exp1to3');
        if (filters.exp3to6) activeExp.push('exp3to6');
        if (filters.expMore6) activeExp.push('expMore6');
        if (activeExp.length > 0) result = result.filter(v => activeExp.includes(v.experienceLevel));

        // Формат работы
        const activeFormats = [];
        if (filters.office) activeFormats.push('office');
        if (filters.remote) activeFormats.push('remote');
        if (filters.hybrid) activeFormats.push('hybrid');
        if (activeFormats.length > 0) result = result.filter(v => activeFormats.includes(v.format));

        // Сортировка
        if (sortOrder === 'salaryDesc') result.sort((a, b) => b.salaryMin - a.salaryMin);
        else if (sortOrder === 'salaryAsc') result.sort((a, b) => a.salaryMin - b.salaryMin);

        return result;
    }, [filters, sortOrder]);

    return (
        <div style={{
            padding: isMobile ? '0 16px 40px' : '0 32px 60px',
            maxWidth: '1600px', margin: '0 auto', display: 'grid',
            gridTemplateColumns: sidebarOpen && !isMobile ? '280px 1fr' : '1fr',
            gap: isMobile ? '32px' : '40px', transition: 'all 0.3s ease'
        }}>

            {/* САЙДБАР */}
            {(sidebarOpen || !isMobile) && (
                <aside style={{
                    display: sidebarOpen ? 'flex' : 'none', flexDirection: 'column', gap: '32px',
                    position: isMobile ? 'static' : 'sticky', top: '20px', height: 'fit-content'
                }}>
                    {/* Темный Промо-блок (Bento) */}
                    <div style={{
                        backgroundColor: '#131313', borderRadius: '32px', padding: '32px 24px',
                        color: '#FFF', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                            backgroundSize: '20px 20px', opacity: 0.5, zIndex: 0
                        }} />
                        <h2 style={{ fontSize: '28px', fontWeight: 700, lineHeight: '1.2', zIndex: 1, margin: 0 }}>
                            Получи лучшую профессию с RedLine
                        </h2>
                        <button style={{
                            backgroundColor: '#3B82F6', color: '#FFF', border: 'none', borderRadius: '20px', padding: '12px 24px',
                            fontSize: '15px', fontWeight: 600, cursor: 'pointer', zIndex: 1, alignSelf: 'flex-start'
                        }}>
                            Узнать больше
                        </button>
                    </div>

                    {/* Фильтры */}
                    <div style={{ padding: '0 8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#131313', margin: 0 }}>Фильтры</h3>
                            {isMobile ? <Settings2 size={18} color="#666" onClick={() => setSidebarOpen(false)} /> : <Settings2 size={18} color="#666" />}
                        </div>

                        <FilterSection title="График работы">
                            <CustomCheckbox label="Полный день" checked={filters.fullDay} onChange={() => toggleCheckbox('fullDay')} />
                            <CustomCheckbox label="Гибкий график" checked={filters.flexible} onChange={() => toggleCheckbox('flexible')} />
                            <CustomCheckbox label="Вахтовый метод" checked={filters.shift} onChange={() => toggleCheckbox('shift')} />
                        </FilterSection>

                        <FilterSection title="Тип занятости">
                            <CustomCheckbox label="Полная занятость" checked={filters.fullTime} onChange={() => toggleCheckbox('fullTime')} />
                            <CustomCheckbox label="Частичная занятость" checked={filters.partTime} onChange={() => toggleCheckbox('partTime')} />
                            <CustomCheckbox label="Проектная работа" checked={filters.projectWork} onChange={() => toggleCheckbox('projectWork')} />
                            <CustomCheckbox label="Стажировка" checked={filters.internship} onChange={() => toggleCheckbox('internship')} />
                        </FilterSection>

                        <FilterSection title="Опыт работы">
                            <CustomCheckbox label="Нет опыта" checked={filters.noExperience} onChange={() => toggleCheckbox('noExperience')} />
                            <CustomCheckbox label="От 1 года до 3 лет" checked={filters.exp1to3} onChange={() => toggleCheckbox('exp1to3')} />
                            <CustomCheckbox label="От 3 до 6 лет" checked={filters.exp3to6} onChange={() => toggleCheckbox('exp3to6')} />
                            <CustomCheckbox label="Более 6 лет" checked={filters.expMore6} onChange={() => toggleCheckbox('expMore6')} />
                        </FilterSection>

                        <FilterSection title="Формат работы">
                            <CustomCheckbox label="В офисе" checked={filters.office} onChange={() => toggleCheckbox('office')} />
                            <CustomCheckbox label="Удаленная работа" checked={filters.remote} onChange={() => toggleCheckbox('remote')} />
                            <CustomCheckbox label="Гибрид" checked={filters.hybrid} onChange={() => toggleCheckbox('hybrid')} />
                        </FilterSection>
                    </div>
                </aside>
            )}

            {/* ПРАВАЯ КОЛОНКА */}
            <main>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {!sidebarOpen && !isMobile && (
                            <button onClick={() => setSidebarOpen(true)} style={{ background: '#FFF', border: 'none', borderRadius: '12px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                <PanelLeftOpen size={20} color="#131313" />
                            </button>
                        )}
                        {sidebarOpen && !isMobile && (
                            <button onClick={() => setSidebarOpen(false)} style={{ background: 'transparent', border: 'none', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <PanelLeftClose size={20} color="#666" />
                            </button>
                        )}

                        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#131313' }}>
                            Рекомендуемые вакансии
                        </h1>
                        <span style={{ backgroundColor: '#FFF', border: '1px solid rgba(0,0,0,0.1)', padding: '4px 12px', borderRadius: '16px', fontSize: '14px', fontWeight: 700, color: '#131313' }}>
                            {filteredAndSortedVacancies.length}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
                        {isMobile && (
                            <button onClick={() => setSidebarOpen(true)} style={{ background: '#131313', color: '#FFF', border: 'none', borderRadius: '12px', padding: '8px 16px', fontWeight: 600 }}>
                                Фильтры
                            </button>
                        )}
                        Сортировка:
                        <select
                            value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
                            style={{ background: 'none', border: 'none', outline: 'none', fontSize: '14px', fontWeight: 700, color: '#131313', cursor: 'pointer' }}
                        >
                            <option value="relevant">По умолчанию</option>
                            <option value="salaryDesc">Дорогие сверху</option>
                            <option value="salaryAsc">Дешевые сверху</option>
                        </select>
                    </div>
                </div>

                {/* Сетка Bento карточек */}
                {filteredAndSortedVacancies.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {filteredAndSortedVacancies.map((vacancy) => (
                            <VacancyCard key={vacancy.id} vacancy={vacancy} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <h3 style={{ fontSize: '20px', color: '#131313', marginBottom: '8px' }}>Ничего не найдено</h3>
                        <p style={{ color: '#666' }}>Попробуйте изменить параметры поиска.</p>
                    </div>
                )}
            </main>
        </div>
    );
}