import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockVacancies } from '../mocks/vacancies';
import { ArrowLeft, MapPin, Briefcase, Clock, Building, CheckCircle2 } from 'lucide-react';

export default function VacancyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const vacancy = mockVacancies.find(v => v.id === parseInt(id));

    if (!vacancy) return <div style={{ padding: '40px', textAlign: 'center' }}>Вакансия не найдена</div>;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 60px' }}>

            <button
                onClick={() => navigate(-1)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontWeight: 600, fontSize: '14px', marginBottom: '24px' }}
            >
                <ArrowLeft size={18} /> Назад к поиску
            </button>

            {/* Шапка вакансии (Bento блок) */}
            <div style={{
                backgroundColor: vacancy.bgColor, borderRadius: '32px', padding: '40px',
                display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ width: '64px', height: '64px', backgroundColor: '#131313', color: '#FFF', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '28px' }}>
                        {vacancy.logoText}
                    </div>
                    <span style={{ backgroundColor: 'rgba(255,255,255,0.6)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, color: '#131313' }}>
                        {vacancy.date}
                    </span>
                </div>

                <div>
                    <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#131313', margin: '0 0 12px 0', lineHeight: '1.2' }}>{vacancy.title}</h1>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#3B82F6' }}>{vacancy.salaryStr}</div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#333' }}><Building size={18} /> {vacancy.company}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#333' }}><MapPin size={18} /> {vacancy.location}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#333' }}><Briefcase size={18} /> {vacancy.experience}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#333' }}><Clock size={18} /> {vacancy.tags[0]}</div>
                </div>
            </div>

            {/* Контент и сайдбар с откликом */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', marginTop: '40px' }}>

                {/* Левая колонка: Описание */}
                <div style={{ backgroundColor: '#FFF', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 20px 0' }}>Обязанности</h2>
                    <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', marginBottom: '32px' }}>
                        {vacancy.description} <br /><br />
                        Мы ищем специалиста, который готов брать на себя ответственность за проекты и доводить их до идеала. Если вы любите чистый код, продуманные интерфейсы и готовы к вызовам — мы ждем вас.
                    </p>

                    <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 20px 0' }}>Что мы предлагаем</h2>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {['Официальное трудоустройство по ТК Туркменистана', 'ДМС после испытательного срока', 'Предоставление современной техники', 'Обучение за счет компании'].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#4B5563' }}>
                                <CheckCircle2 size={18} color="#10B981" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Правая колонка: Действия */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                        <button style={{ width: '100%', backgroundColor: '#131313', color: '#FFF', border: 'none', borderRadius: '16px', padding: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', marginBottom: '12px' }}>
                            Откликнуться
                        </button>
                        <button style={{ width: '100%', backgroundColor: '#F3F4F6', color: '#131313', border: 'none', borderRadius: '16px', padding: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
                            Сохранить вакансию
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}