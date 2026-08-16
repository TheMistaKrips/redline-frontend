import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Check, ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CATEGORIES } from '../mocks/data';

export default function Auth() {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('applicant');
    const [formData, setFormData] = useState({ name: '', email: '', password: '', consent: false });
    const [selectedCategories, setSelectedCategories] = useState([]);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNext = () => {
        if (step === 2 && (!formData.email || !formData.name || !formData.password || !formData.consent)) {
            return alert('Заполните все поля и дайте согласие на обработку данных.');
        }
        setStep(step + 1);
    };

    const toggleCategory = (cat) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(selectedCategories.filter(c => c !== cat));
        } else {
            setSelectedCategories([...selectedCategories, cat]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCategories.length === 0) {
            return alert('Выберите хотя бы одну отрасль');
        }
        login(formData.email, role, formData.name, selectedCategories);
        navigate(role === 'applicant' ? '/dashboard' : '/dashboard/employer');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh', padding: '20px' }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '32px',
                padding: '40px',
                width: '100%',
                maxWidth: '540px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px'
            }}>

                {/* Логотип */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: 900, justifyContent: 'center' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#A50C20', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src="/logo.jpg" alt="RedLine" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="color:#FFF; font-weight:900; font-size:18px">RL</span>'; }} />
                    </div>
                    <span style={{ color: '#000' }}>RedLine</span>
                </div>

                {/* Индикатор шагов */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '-16px' }}>
                    {[1, 2, 3].map(s => (
                        <div key={s} style={{ height: '4px', flex: 1, backgroundColor: step >= s ? '#A50C20' : '#F3F4F6', borderRadius: '2px', transition: 'background-color 0.3s' }} />
                    ))}
                </div>

                {/* ШАГ 1: Выбор роли */}
                {step === 1 && (
                    <>
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#000000', margin: '0 0 8px 0' }}>Кто вы?</h1>
                            <p style={{ color: '#666', margin: 0, fontSize: '15px' }}>Выберите вашу роль для настройки платформы</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div
                                onClick={() => setRole('applicant')}
                                style={{ border: role === 'applicant' ? '2px solid #A50C20' : '2px solid #E5E7EB', borderRadius: '20px', padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: role === 'applicant' ? '#FFF5F5' : '#FFFFFF', transition: 'all 0.2s' }}
                            >
                                <div style={{ width: '56px', height: '56px', backgroundColor: role === 'applicant' ? '#A50C20' : '#F3F4F6', color: role === 'applicant' ? '#FFF' : '#000', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                                    <User size={28} />
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 900, color: '#000' }}>Я ищу работу</h3>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Создать резюме и откликаться</p>
                                </div>
                            </div>

                            <div
                                onClick={() => setRole('employer')}
                                style={{ border: role === 'employer' ? '2px solid #A50C20' : '2px solid #E5E7EB', borderRadius: '20px', padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: role === 'employer' ? '#FFF5F5' : '#FFFFFF', transition: 'all 0.2s' }}
                            >
                                <div style={{ width: '56px', height: '56px', backgroundColor: role === 'employer' ? '#A50C20' : '#F3F4F6', color: role === 'employer' ? '#FFF' : '#000', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                                    <Briefcase size={28} />
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 900, color: '#000' }}>Я ищу сотрудников</h3>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Публикация вакансий</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={handleNext} style={{ padding: '16px', backgroundColor: '#000000', color: '#FFFFFF', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 900, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'background-color 0.2s' }}>
                            Продолжить <ChevronRight size={20} />
                        </button>
                    </>
                )}

                {/* ШАГ 2: Данные и Юридический блок */}
                {step === 2 && (
                    <>
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#000000', margin: '0 0 8px 0' }}>Данные аккаунта</h1>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <input
                                type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={role === 'applicant' ? "Ваше Имя и Фамилия" : "Название вашей компании"}
                                style={{ padding: '16px', borderRadius: '16px', border: '1px solid #E5E7EB', fontSize: '15px', outline: 'none', fontWeight: 600, backgroundColor: '#F9FAFB' }}
                            />
                            <input
                                type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email (на него придет код)"
                                style={{ padding: '16px', borderRadius: '16px', border: '1px solid #E5E7EB', fontSize: '15px', outline: 'none', fontWeight: 600, backgroundColor: '#F9FAFB' }}
                            />
                            <input
                                type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Надежный пароль"
                                style={{ padding: '16px', borderRadius: '16px', border: '1px solid #E5E7EB', fontSize: '15px', outline: 'none', fontWeight: 600, backgroundColor: '#F9FAFB' }}
                            />

                            {/* ЮРИДИЧЕСКИЙ БЛОК БЕЗОПАСНОСТИ */}
                            <div style={{ backgroundColor: '#FFF5F5', padding: '20px', borderRadius: '16px', border: '1px solid #FCA5A5', marginTop: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A50C20', fontWeight: 900, marginBottom: '8px' }}>
                                    <ShieldCheck size={18} /> Безопасность данных
                                </div>
                                <p style={{ fontSize: '13px', color: '#000', lineHeight: '1.5', margin: '0 0 16px 0', fontWeight: 500 }}>
                                    Мы обеспокоены тем, чтобы платформа была полностью безопасной для всех участников. Поэтому мы собираем данные {role === 'applicant' ? 'пользователей' : 'вашей компании для ваших вакансий'}.
                                    Мы гарантируем 100% сохранность ваших данных и обязуемся не передавать их третьим лицам.
                                </p>
                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: formData.consent ? 'none' : '2px solid #D1D5DB', backgroundColor: formData.consent ? '#A50C20' : '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                                        {formData.consent && <Check size={16} color="#FFF" />}
                                    </div>
                                    <input type="checkbox" checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} style={{ display: 'none' }} />
                                    <span style={{ fontSize: '14px', color: '#000', fontWeight: 800 }}>Я согласен на сбор и обработку данных.</span>
                                </label>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => setStep(1)} style={{ padding: '16px', backgroundColor: '#F3F4F6', color: '#000', border: 'none', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <ArrowLeft size={20} />
                            </button>
                            <button onClick={handleNext} style={{ padding: '16px', backgroundColor: '#000000', color: '#FFF', border: 'none', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', flex: 3 }}>
                                Далее
                            </button>
                        </div>
                    </>
                )}

                {/* ШАГ 3: Выбор категорий (Онбординг) */}
                {step === 3 && (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#000000', margin: '0 0 8px 0' }}>Отрасли</h1>
                            <p style={{ color: '#666', margin: 0, fontSize: '15px' }}>
                                {role === 'applicant' ? 'В каких отраслях вы хотите работать? Мы подберем лучшие вакансии.' : 'Укажите отрасли вашей компании для точного подбора кандидатов.'}
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                            {CATEGORIES.map(cat => (
                                <div
                                    key={cat}
                                    onClick={() => toggleCategory(cat)}
                                    style={{
                                        padding: '12px 20px',
                                        borderRadius: '20px',
                                        border: selectedCategories.includes(cat) ? '2px solid #A50C20' : '1px solid #E5E7EB',
                                        backgroundColor: selectedCategories.includes(cat) ? '#A50C20' : '#FFF',
                                        color: selectedCategories.includes(cat) ? '#FFF' : '#000',
                                        fontWeight: 800, cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s'
                                    }}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                            <button type="button" onClick={() => setStep(2)} style={{ padding: '16px', backgroundColor: '#F3F4F6', color: '#000', border: 'none', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <ArrowLeft size={20} />
                            </button>
                            <button type="submit" style={{ padding: '16px', backgroundColor: '#A50C20', color: '#FFF', border: 'none', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', flex: 3 }}>
                                Завершить регистрацию
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}