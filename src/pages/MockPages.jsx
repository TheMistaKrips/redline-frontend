import React from 'react';
import { MessageSquare, Users, Settings, Briefcase, Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PageTemplate = ({ title, icon: Icon, description }) => {
    const navigate = useNavigate();
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '60px 40px', boxShadow: '0 12px 24px rgba(0,0,0,0.03)', textAlign: 'center', maxWidth: '600px', width: '100%' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: '#F3F4F6', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Icon size={40} color="#131313" />
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#131313', margin: '0 0 16px 0' }}>{title}</h1>
                <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', margin: '0 0 32px 0' }}>{description}</p>

                <button onClick={() => navigate('/')} style={{ backgroundColor: '#131313', color: '#FFF', padding: '16px 32px', borderRadius: '16px', border: 'none', fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }}>
                    Вернуться на главную
                </button>
            </div>
        </div>
    );
};

export const Messages = () => <PageTemplate title="Сообщения" icon={MessageSquare} description="Здесь будет ваш мессенджер для общения с работодателями и кандидатами. Прямо сейчас мы настраиваем WebSocket для мгновенной доставки сообщений." />;
export const Hiring = () => <PageTemplate title="Найм" icon={Briefcase} description="Инструменты для отслеживания воронок найма, аналитики по вакансиям и управления командой рекрутеров." />;
export const Community = () => <PageTemplate title="Сообщество" icon={Users} description="Форум профессионалов Туркменистана. Задавайте вопросы, делитесь опытом и находите единомышленников." />;
export const SettingsPage = () => <PageTemplate title="Настройки аккаунта" icon={Settings} description="Управление безопасностью, уведомлениями, смена пароля и настройка двухфакторной аутентификации." />;