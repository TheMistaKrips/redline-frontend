import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockVacancies } from '../mocks/data';
import { FilterContext } from '../context/FilterContext';
import {
    ArrowLeft, Building, MapPin, Send, Briefcase, Clock,
    FileText, CheckCircle2, Globe, Users, CalendarDays, ChevronRight
} from 'lucide-react';

export default function VacancyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateFilter } = useContext(FilterContext);

    const vacancy = mockVacancies.find(v => v.id === parseInt(id));
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    if (!vacancy) return <div style={{ padding: '100px 20px', textAlign: 'center', fontSize: '24px', fontWeight: 900 }}>Вакансия не найдена</div>;

    const handleApply = () => {
        alert('Успешно! Ваше резюме и сообщение автоматически отправлены работодателю в личные сообщения.');
        setShowModal(false);
        setMessage('');
    };

    const handleAllCompanyVacancies = () => {
        // Обновляем фильтр поиска и перекидываем на главную
        updateFilter('search', vacancy.company);
        navigate('/');
    };

    const mockSkills = ['Командная работа', 'Ответственность', 'Критическое мышление', 'Нацеленность на результат'];
    const companyDetails = {
        size: '50-100 человек', website: 'www.redline.tm/company', founded: '2020 год',
        about: 'Мы — инновационная компания, меняющая правила игры на рынке. Ценим инициативность, честность и желание развиваться вместе с командой.'
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px' }}>

            <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#A50C20', fontWeight: 900, fontSize: '15px', marginBottom: '24px', padding: 0 }}>
                <ArrowLeft size={18} /> К списку вакансий
            </button>

            <div style={{ backgroundColor: '#000000', borderRadius: '32px', padding: '48px', color: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%', backgroundImage: 'radial-gradient(circle at 100% 50%, rgba(165, 12, 32, 0.15) 0%, transparent 70%)', zIndex: 0 }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: '#A50C20', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '36px', color: '#FFF', boxShadow: '0 8px 24px rgba(165, 12, 32, 0.4)' }}>
                        {vacancy.logoText}
                    </div>
                    <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 800, color: '#FFF' }}>
                        {vacancy.date}
                    </span>
                </div>

                <div style={{ zIndex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#9CA3AF', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{vacancy.category}</div>
                    <h1 style={{ fontSize: '44px', fontWeight: 900, margin: '0 0 16px 0', lineHeight: '1.1' }}>{vacancy.title}</h1>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#A50C20', display: 'inline-block', backgroundColor: 'rgba(165, 12, 32, 0.1)', padding: '8px 20px', borderRadius: '16px', border: '1px solid rgba(165, 12, 32, 0.3)' }}>{vacancy.salaryStr}</div>
                </div>

                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', zIndex: 1, backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '15px' }}><MapPin size={20} color="#A50C20" /> {vacancy.location}, {vacancy.region}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '15px' }}><Briefcase size={20} color="#A50C20" /> {vacancy.experience}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '15px' }}><Clock size={20} color="#A50C20" /> {vacancy.tags[0]}</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', marginTop: '40px' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 12px 24px rgba(0,0,0,0.02)' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 24px 0', color: '#000' }}>Ключевые навыки</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            {mockSkills.map((skill, i) => (
                                <span key={i} style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', padding: '10px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, color: '#000' }}>{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 12px 24px rgba(0,0,0,0.02)' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 24px 0', color: '#000' }}>О вакансии</h2>
                        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', margin: '0 0 32px 0', fontWeight: 500 }}>{vacancy.description}</p>
                        <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 16px 0', color: '#000' }}>Что мы предлагаем:</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {['Официальное трудоустройство и белая зарплата', 'Современный офис или полностью удаленный формат', 'Оплачиваемое обучение и профильные курсы', 'Премии по результатам успешных проектов'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                    <div style={{ width: '24px', height: '24px', backgroundColor: '#FFF5F5', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}><CheckCircle2 size={16} color="#A50C20" /></div>
                                    <span style={{ fontSize: '16px', color: '#333', lineHeight: '1.5', fontWeight: 600 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '32px', border: '1px solid #E5E7EB', position: 'sticky', top: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', zIndex: 10 }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 24px 0', color: '#000' }}>Понравилась вакансия?</h3>
                        <button onClick={() => setShowModal(true)} style={{ width: '100%', backgroundColor: '#A50C20', color: '#FFFFFF', border: 'none', borderRadius: '16px', padding: '20px', fontSize: '18px', fontWeight: 900, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 12px 24px rgba(165,12,32,0.2)' }}>Откликнуться</button>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px', color: '#666', fontSize: '13px', fontWeight: 600 }}><FileText size={16} /> Резюме будет отправлено автоматически</div>
                    </div>

                    <div style={{ backgroundColor: '#F9FAFB', borderRadius: '32px', padding: '32px', border: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ width: '56px', height: '56px', backgroundColor: '#000', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '24px', color: '#FFF' }}>{vacancy.logoText}</div>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 4px 0', color: '#000' }}>{vacancy.company}</h3>
                                <span style={{ fontSize: '14px', color: '#A50C20', fontWeight: 800 }}>Проверенный работодатель</span>
                            </div>
                        </div>
                        <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#333', marginBottom: '24px', fontWeight: 500 }}>{companyDetails.about}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid #E5E7EB', paddingTop: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#000', fontWeight: 700, fontSize: '14px' }}><Users size={18} color="#9CA3AF" /> Размер команды: {companyDetails.size}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#000', fontWeight: 700, fontSize: '14px' }}><CalendarDays size={18} color="#9CA3AF" /> Основана в {companyDetails.founded}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#A50C20', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}><Globe size={18} /> {companyDetails.website}</div>
                        </div>

                        {/* РАБОЧАЯ КНОПКА ПОИСКА ВСЕХ ВАКАНСИЙ */}
                        <button onClick={handleAllCompanyVacancies} style={{ width: '100%', marginTop: '24px', padding: '16px', backgroundColor: '#FFF', color: '#000', border: '1px solid #E5E7EB', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.backgroundColor = '#F9FAFB'} onMouseLeave={e => e.target.style.backgroundColor = '#FFF'}>
                            Все вакансии компании <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(8px)' }}>
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '48px', width: '100%', maxWidth: '600px', boxShadow: '0 24px 48px rgba(0,0,0,0.3)', border: '1px solid #E5E7EB' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: 900, margin: '0 0 12px 0', color: '#000' }}>Отправка отклика</h2>
                        <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px', fontWeight: 500 }}>Отклик на вакансию <b>{vacancy.title}</b> в компанию <b>{vacancy.company}</b>.</p>

                        <div style={{ backgroundColor: '#F9FAFB', padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #E5E7EB', marginBottom: '32px' }}>
                            <div style={{ width: '48px', height: '48px', backgroundColor: '#FFF5F5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={24} color="#A50C20" /></div>
                            <div><div style={{ fontWeight: 900, fontSize: '15px', color: '#000' }}>Мое_Резюме_RedLine.pdf</div><div style={{ fontSize: '13px', color: '#666', fontWeight: 600, marginTop: '4px' }}>Прикреплено автоматически из вашего профиля</div></div>
                        </div>

                        <label style={{ display: 'block', fontSize: '15px', fontWeight: 900, color: '#000', marginBottom: '12px' }}>Сопроводительное письмо (необязательно)</label>
                        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Напишите, почему вы идеально подходите на эту должность..." style={{ width: '100%', height: '160px', padding: '20px', borderRadius: '20px', border: '1px solid #E5E7EB', outline: 'none', fontSize: '15px', resize: 'none', marginBottom: '40px', backgroundColor: '#F9FAFB', fontWeight: 500, fontFamily: 'inherit' }} />

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '20px', backgroundColor: '#F3F4F6', color: '#000', border: 'none', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', fontSize: '16px' }}>Отмена</button>
                            <button onClick={handleApply} style={{ flex: 2, padding: '20px', backgroundColor: '#A50C20', color: '#FFF', border: 'none', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '16px' }}><Send size={20} /> Отправить отклик</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}