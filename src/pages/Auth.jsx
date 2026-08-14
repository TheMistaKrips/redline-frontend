import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aperture, ArrowRight, User, Briefcase, Check } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Auth() {
    const [step, setStep] = useState(1); // 1: Выбор роли, 2: Форма
    const [role, setRole] = useState('applicant');
    const [formData, setFormData] = useState({ name: '', email: '', password: '', consent: false });

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNext = () => setStep(2);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password || !formData.name) return alert('Заполните все поля');
        if (!formData.consent) return alert('Необходимо согласие на обработку данных');

        login(formData.email, role, formData.name);
        navigate(role === 'applicant' ? '/dashboard' : '/dashboard/employer');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', padding: '20px' }}>
            <div style={{
                backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '48px',
                width: '100%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                display: 'flex', flexDirection: 'column', gap: '32px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: 800, justifyContent: 'center' }}>
                    <div style={{ width: '32px', height: '32px', backgroundColor: '#131313', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Aperture color="#FFF" size={20} />
                    </div>
                    RedLine
                </div>

                {step === 1 ? (
                    <>
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#131313', margin: '0 0 12px 0' }}>Кого мы ищем?</h1>
                            <p style={{ color: '#666', fontSize: '15px', margin: 0 }}>Выберите вашу роль для персонализации платформы</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div
                                onClick={() => setRole('applicant')}
                                style={{
                                    border: role === 'applicant' ? '2px solid #131313' : '2px solid #E5E7EB',
                                    borderRadius: '20px', padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.2s',
                                    backgroundColor: role === 'applicant' ? '#F9FAFB' : '#FFF'
                                }}
                            >
                                <div style={{ width: '56px', height: '56px', backgroundColor: role === 'applicant' ? '#131313' : '#F3F4F6', color: role === 'applicant' ? '#FFF' : '#666', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={28} />
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: '#131313' }}>Я ищу работу</h3>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Создать резюме и откликаться на вакансии</p>
                                </div>
                            </div>

                            <div
                                onClick={() => setRole('employer')}
                                style={{
                                    border: role === 'employer' ? '2px solid #131313' : '2px solid #E5E7EB',
                                    borderRadius: '20px', padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.2s',
                                    backgroundColor: role === 'employer' ? '#F9FAFB' : '#FFF'
                                }}
                            >
                                <div style={{ width: '56px', height: '56px', backgroundColor: role === 'employer' ? '#131313' : '#F3F4F6', color: role === 'employer' ? '#FFF' : '#666', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Briefcase size={28} />
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: '#131313' }}>Я ищу сотрудников</h3>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Публикация вакансий и поиск талантов</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={handleNext} style={{ width: '100%', padding: '18px', backgroundColor: '#3B82F6', color: '#FFF', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }}>
                            Продолжить <ArrowRight size={20} />
                        </button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#131313', margin: '0 0 8px 0' }}>Создать аккаунт</h1>
                            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Регистрация в качестве {role === 'applicant' ? 'соискателя' : 'работодателя'}</p>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#131313', marginBottom: '8px' }}>Имя / Название компании</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Иван Иванов" style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', outline: 'none', fontSize: '15px', fontWeight: 500 }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#131313', marginBottom: '8px' }}>Email</label>
                            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="name@example.com" style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', outline: 'none', fontSize: '15px', fontWeight: 500 }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#131313', marginBottom: '8px' }}>Пароль</label>
                            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', outline: 'none', fontSize: '15px', fontWeight: 500 }} />
                        </div>

                        {/* ЮРИДИЧЕСКОЕ ТРЕБОВАНИЕ (Из ТЗ) */}
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', marginTop: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: formData.consent ? 'none' : '2px solid #D1D5DB', backgroundColor: formData.consent ? '#3B82F6' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {formData.consent && <Check size={16} color="#FFF" />}
                            </div>
                            <input type="checkbox" checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} style={{ display: 'none' }} />
                            <span style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                                Я согласен на обработку персональных данных в соответствии с Законом Туркменистана «Об информации о личной жизни и её защите».
                            </span>
                        </label>

                        <button type="submit" style={{ width: '100%', padding: '18px', backgroundColor: '#131313', color: '#FFF', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', marginTop: '12px' }}>
                            Зарегистрироваться
                        </button>

                        <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                            Назад к выбору роли
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}