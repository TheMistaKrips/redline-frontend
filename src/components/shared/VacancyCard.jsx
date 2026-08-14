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
                backgroundColor: vacancy.bgColor,
                borderRadius: '24px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                minHeight: '300px'
            }}
        >
            {/* Верхний ряд: Дата и Закладка */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#131313'
                }}>
                    {vacancy.date}
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Предотвращаем переход на страницу при клике на закладку
                        setIsBookmarked(!isBookmarked);
                    }}
                    style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#131313',
                        transition: 'all 0.2s',
                        transform: isBookmarked ? 'scale(1.1)' : 'scale(1)',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <Bookmark size={18} fill={isBookmarked ? '#131313' : 'none'} />
                </button>
            </div>

            {/* Заголовок и Логотип */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px', fontWeight: 600 }}>
                        {vacancy.company}
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#131313', lineHeight: '1.2', margin: 0 }}>
                        {vacancy.title}
                    </h3>
                </div>
                <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#131313',
                    color: '#FFF',
                    flexShrink: 0,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '16px'
                }}>
                    {vacancy.logoText}
                </div>
            </div>

            {/* Краткое описание */}
            <p style={{
                fontSize: '13px',
                color: 'rgba(0,0,0,0.6)',
                margin: 0,
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {vacancy.description}
            </p>

            {/* Теги */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {vacancy.tags.map((tag, i) => (
                    <span key={i} style={{
                        border: '1px solid rgba(0,0,0,0.1)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#333'
                    }}>
                        {tag}
                    </span>
                ))}
            </div>

            {/* Нижний ряд: Зарплата и Кнопка */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                <div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#131313' }}>
                        {vacancy.salaryStr}
                    </div>
                    <div style={{ fontSize: '13px', color: '#555', marginTop: '4px', fontWeight: 500 }}>
                        {vacancy.location} • {vacancy.experience}
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/vacancy/${vacancy.id}`);
                    }}
                    style={{
                        backgroundColor: '#131313',
                        color: '#FFF',
                        padding: '12px 24px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'background-color 0.2s',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#131313'}
                >
                    Details
                </button>
            </div>
        </div>
    );
}