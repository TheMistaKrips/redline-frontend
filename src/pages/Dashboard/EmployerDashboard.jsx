import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { VacancyContext } from '../../context/VacancyContext';
import { ShieldCheck, Users, Plus, FileText, CheckCircle2, TrendingUp, Search, Eye, Edit2, Save, MapPin, Globe, Trash2, Download, Send } from 'lucide-react';
import { mockCandidates, CATEGORIES } from '../../mocks/data';
import { useNavigate } from 'react-router-dom';

const MANDATORY_DOCS = [
    'Устав предприятия', 'Свидетельство о регистрации (Шахадатнама)', 'Выписка из ЕГРЮЛ',
    'Справка из органа статистики', 'Приказ о назначении директора', 'Договор аренды', 'Справка из банка'
];

export default function EmployerDashboard() {
    const { user, updateUserProfile } = useContext(AuthContext);
    const { addVacancy } = useContext(VacancyContext);
    const navigate = useNavigate();

    const [candidates, setCandidates] = useState(mockCandidates);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [companyData, setCompanyData] = useState({
        about: user?.about || '',
        website: user?.socials?.[0] || '',
        address: 'Ашхабад, Туркменистан'
    });

    // Создание вакансии
    const handleCreateVacancy = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newVac = {
            id: Date.now(),
            date: 'Сегодня',
            company: user.name,
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            salaryStr: formData.get('salary') + ' TMT',
            salaryMin: parseInt(formData.get('salary')),
            logoText: user.name[0],
            status: 'pending'
        };
        addVacancy(newVac);
        setIsModalOpen(false);
        alert('Вакансия создана и отправлена на модерацию!');
    };

    const handleDeleteCandidate = (id) => setCandidates(candidates.filter(c => c.id !== id));

    const handleSortByExp = () => {
        setCandidates([...candidates].sort((a, b) => b.expMonths - a.expMonths));
    };

    const handleSaveProfile = () => {
        updateUserProfile({
            about: companyData.about,
            socials: companyData.website ? [companyData.website] : []
        });
        setIsEditing(false);
    };

    const progress = Math.round((uploadedDocs.length / MANDATORY_DOCS.length) * 100);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '36px', fontWeight: 900, margin: '0 0 8px 0', color: '#000' }}>{user.name}</h1>
                    <p style={{ margin: 0, fontSize: '16px', color: '#666', fontWeight: 700, backgroundColor: '#F3F4F6', display: 'inline-block', padding: '6px 16px', borderRadius: '12px' }}>
                        Работодатель • {user.categories?.join(', ') || 'Отрасль не указана'}
                    </p>
                </div>
                <button onClick={() => setIsModalOpen(true)} style={{ padding: '16px 24px', backgroundColor: '#A50C20', color: '#FFF', border: 'none', borderRadius: '16px', fontWeight: 900, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 16px rgba(165,12,32,0.2)', transition: 'transform 0.2s' }}>
                    <Plus size={20} /> Создать вакансию
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '24px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={24} color="#000" /></div>
                    <div><div style={{ fontSize: '28px', fontWeight: 900, color: '#000' }}>0</div><div style={{ fontSize: '13px', color: '#666', fontWeight: 700 }}>Активных вакансий</div></div>
                </div>
                <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '24px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#FFF5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={24} color="#A50C20" /></div>
                    <div><div style={{ fontSize: '28px', fontWeight: 900, color: '#000' }}>12</div><div style={{ fontSize: '13px', color: '#666', fontWeight: 700 }}>Новых откликов</div></div>
                </div>
                <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '24px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={24} color="#16A34A" /></div>
                    <div><div style={{ fontSize: '28px', fontWeight: 900, color: '#000' }}>340</div><div style={{ fontSize: '13px', color: '#666', fontWeight: 700 }}>Просмотров профиля</div></div>
                </div>
                <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '24px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Search size={24} color="#2563EB" /></div>
                    <div><div style={{ fontSize: '28px', fontWeight: 900, color: '#000' }}>{mockCandidates.length}</div><div style={{ fontSize: '13px', color: '#666', fontWeight: 700 }}>В базе кандидатов</div></div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '40px', border: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, margin: 0, color: '#000' }}>Профиль компании</h2>
                            <button onClick={() => setIsEditing(!isEditing)} style={{ background: '#F3F4F6', border: 'none', padding: '8px 16px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}>{isEditing ? 'Закрыть' : 'Изменить'}</button>
                        </div>
                        {isEditing ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <textarea value={companyData.about} onChange={e => setCompanyData({ ...companyData, about: e.target.value })} style={{ width: '100%', height: '100px', padding: '16px', borderRadius: '16px', border: '1px solid #E5E7EB', fontFamily: 'inherit' }} placeholder="О компании..." />
                                <input type="text" value={companyData.website} onChange={e => setCompanyData({ ...companyData, website: e.target.value })} placeholder="Сайт" style={{ padding: '12px', borderRadius: '12px', border: '1px solid #E5E7EB' }} />
                                <button onClick={handleSaveProfile} style={{ padding: '12px', backgroundColor: '#A50C20', color: '#FFF', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>Сохранить</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <p style={{ margin: 0, fontSize: '15px', color: companyData.about ? '#333' : '#9CA3AF', lineHeight: '1.6' }}>{companyData.about || 'Нет описания'}</p>
                                {companyData.website && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A50C20', fontWeight: 700 }}><Globe size={18} /> {companyData.website}</div>}
                            </div>
                        )}
                    </div>

                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '40px', border: '1px solid #E5E7EB' }}>
                        <h3 style={{ marginBottom: '20px', fontWeight: 900 }}>Верификация ({progress}%)</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {MANDATORY_DOCS.map(doc => (
                                <div key={doc} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#F9FAFB', borderRadius: '8px', fontSize: '14px' }}>
                                    <span>{doc}</span>
                                    <button onClick={() => setUploadedDocs([...uploadedDocs, doc])} style={{ border: 'none', background: 'none', color: '#A50C20', fontWeight: 800, cursor: 'pointer' }}>{uploadedDocs.includes(doc) ? 'Загружено' : 'Загрузить'}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '40px', border: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 900 }}>Кандидаты</h2>
                        <button onClick={handleSortByExp} style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', cursor: 'pointer', fontWeight: 800 }}>Сортировать по опыту</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {candidates.map(c => (
                            <div key={c.id} style={{ padding: '20px', border: '1px solid #E5E7EB', borderRadius: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <img src={c.avatar} style={{ width: '50px', height: '50px', borderRadius: '12px' }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 900 }}>{c.name}</div>
                                    <div style={{ color: '#666', fontSize: '14px' }}>{c.role} • {c.exp}</div>
                                </div>
                                <button onClick={() => window.alert('Скачивание: ' + c.resumeUrl)} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}><Download size={20} /></button>
                                <button onClick={() => navigate('/messages')} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}><Send size={20} /></button>
                                <button onClick={() => handleDeleteCandidate(c.id)} style={{ padding: '8px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}><Trash2 size={20} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <form onSubmit={handleCreateVacancy} style={{ background: '#FFF', padding: '40px', borderRadius: '32px', width: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h2 style={{ margin: 0 }}>Создать вакансию</h2>
                        <input name="title" placeholder="Название вакансии" required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ccc' }} />
                        <select name="category" style={{ padding: '12px', borderRadius: '12px' }}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>
                        <input name="salary" type="number" placeholder="Зарплата (TMT)" required style={{ padding: '12px', borderRadius: '12px' }} />
                        <textarea name="description" placeholder="Полное описание" required style={{ padding: '12px', borderRadius: '12px', height: '100px', fontFamily: 'inherit' }} />
                        <button type="submit" style={{ padding: '16px', background: '#A50C20', color: '#FFF', borderRadius: '16px', border: 'none', cursor: 'pointer' }}>Отправить на модерацию</button>
                        <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Отмена</button>
                    </form>
                </div>
            )}
        </div>
    );
}