import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VacancyCard({ vacancy }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/vacancy/${vacancy.id}`)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'all 0.2s ease',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 12px 24px rgba(165, 12, 32, 0.15)' : '0 4px 12px rgba(0,0,0,0.05)',
                border: '1px solid #E5E7EB',
                cursor: 'pointer',
                minHeight: '280px'
            }}
        >
            {/* Верхний ряд: Дата и Закладка */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                    backgroundColor: '#FFF5F5',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#A50C20',
                    border: '1px solid #FCA5A5'
                }}>
                    {vacancy.date}
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsBookmarked(!isBookmarked);
                    }}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer', color: '#000000',
                        transition: 'transform 0.2s', transform: isBookmarked ? 'scale(1.1)' : 'scale(1)',
                        padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    <Bookmark size={20} fill={isBookmarked ? '#A50C20' : 'none'} color={isBookmarked ? '#A50C20' : '#000000'} />
                </button>
            </div>

            {/* Заголовок и Логотип */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px', fontWeight: 700 }}>
                        {vacancy.company} • {vacancy.category}
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#000000', lineHeight: '1.2', margin: 0 }}>
                        {vacancy.title}
                    </h3>
                </div>
                <div style={{
                    width: '44px', height: '44px',
                    backgroundColor: '#000000', color: '#FFFFFF',
                    flexShrink: 0, borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '900', fontSize: '20px'
                }}>
                    {vacancy.logoText}
                </div>
            </div>

            {/* Теги характеристик */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ backgroundColor: '#F9FAFB', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: '#333', border: '1px solid #E5E7EB' }}>
                    {vacancy.location}
                </span>
                <span style={{ backgroundColor: '#F9FAFB', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: '#333', border: '1px solid #E5E7EB' }}>
                    {vacancy.experience}
                </span>
                {vacancy.format === 'remote' && (
                    <span style={{ backgroundColor: '#F9FAFB', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: '#333', border: '1px solid #E5E7EB' }}>
                        Удаленка
                    </span>
                )}
                {vacancy.format === 'office' && (
                    <span style={{ backgroundColor: '#F9FAFB', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: '#333', border: '1px solid #E5E7EB' }}>
                        Офис
                    </span>
                )}
                {vacancy.format === 'hybrid' && (
                    <span style={{ backgroundColor: '#F9FAFB', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: '#333', border: '1px solid #E5E7EB' }}>
                        Гибрид
                    </span>
                )}
            </div>

            {/* Нижний ряд: Зарплата и Кнопка */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#A50C20' }}>
                    {vacancy.salaryStr}
                </div>
                <button style={{
                    backgroundColor: '#000000', color: '#FFFFFF',
                    padding: '10px 20px', borderRadius: '12px',
                    fontSize: '14px', fontWeight: 800, border: 'none',
                    cursor: 'pointer', transition: 'background-color 0.2s'
                }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
                >
                    Подробнее
                </button>
            </div>
        </div>
    );
}