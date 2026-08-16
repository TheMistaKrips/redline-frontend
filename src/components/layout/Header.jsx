import React, { useState, useEffect, useRef, useContext } from 'react';
import { Search, Bell, Settings, Menu, X, LogIn } from 'lucide-react';
import { FilterContext } from '../../context/FilterContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const theme = {
    bg: '#000000',
    text: '#FFFFFF',
    textMuted: '#9CA3AF',
    accent: '#A50C20',
    border: 'rgba(255, 255, 255, 0.1)'
};

const initialNotifications = [
    { id: 1, title: 'Ваше резюме просмотрели', desc: 'Компания Google TM просмотрела ваше резюме', time: '10 мин назад', unread: true, link: '/dashboard' },
    { id: 2, title: 'Новое сообщение', desc: 'У вас новое сообщение от Amazon TM', time: '2 часа назад', unread: true, link: '/messages' },
    { id: 3, title: 'Системное сообщение', desc: 'Добро пожаловать в Rushline!', time: 'Вчера', unread: false, link: '/' }
];

export default function Header() {
    const { filters, updateFilter } = useContext(FilterContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications);

    const notifRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNotificationClick = (notif) => {
        setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
        setShowNotifications(false);
        navigate(notif.link);
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    };

    const hasUnread = notifications.some(n => n.unread);

    const NavItem = ({ text, path }) => (
        <span
            onClick={() => { navigate(path); setMobileMenuOpen(false); }}
            style={{
                color: location.pathname === path ? theme.text : theme.textMuted,
                cursor: 'pointer',
                borderBottom: location.pathname === path ? `2px solid ${theme.accent}` : '2px solid transparent',
                paddingBottom: '4px',
                transition: 'color 0.2s',
                fontSize: isMobile ? '16px' : '14px',
                fontWeight: 600
            }}
            onMouseEnter={(e) => e.target.style.color = theme.text}
            onMouseLeave={(e) => e.target.style.color = location.pathname === path ? theme.text : theme.textMuted}
        >
            {text}
        </span>
    );

    return (
        <header style={{
            backgroundColor: theme.bg,
            color: theme.text,
            borderRadius: isMobile ? '0' : '24px',
            padding: isMobile ? '16px 20px' : '20px 32px',
            margin: isMobile ? '0' : '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '16px' : '24px',
            position: 'relative',
            zIndex: 50,
            border: `1px solid ${theme.border}`
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <div style={{ width: isMobile ? '32px' : '40px', height: isMobile ? '32px' : '40px', backgroundColor: theme.accent, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src="/logo.jpg" alt="Rushline Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="color:#FFF; font-weight:900; font-size:16px">RL</span>'; }} />
                    </div>
                    <span style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 900, letterSpacing: '-0.5px' }}>Rushline</span>
                </div>

                {!isMobile && (
                    <nav style={{ display: 'flex', gap: '32px' }}>
                        <NavItem text="Вакансии" path="/" />
                        <NavItem text="Сообщения" path="/messages" />
                        <NavItem text="Сообщество" path="/community" />
                        <NavItem text="О нас" path="/about" />
                    </nav>
                )}

                {!isMobile ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        {user ? (
                            <>
                                <img
                                    src={user.avatar} alt="Avatar"
                                    onClick={() => navigate(user.role === 'applicant' ? '/dashboard' : user.role === 'admin' ? '/dashboard/admin' : '/dashboard/employer')}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', border: `2px solid ${theme.accent}`, objectFit: 'cover' }}
                                    title="Личный кабинет"
                                />
                                <Settings size={20} onClick={() => navigate('/settings')} style={{ cursor: 'pointer', color: theme.textMuted, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#FFF'} onMouseLeave={e => e.target.style.color = theme.textMuted} />

                                <div ref={notifRef} style={{ position: 'relative' }}>
                                    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowNotifications(!showNotifications)}>
                                        <Bell size={20} style={{ color: theme.textMuted, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#FFF'} onMouseLeave={e => e.target.style.color = theme.textMuted} />
                                        {hasUnread && <div style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', backgroundColor: theme.accent, borderRadius: '50%' }} />}
                                    </div>

                                    {showNotifications && (
                                        <div style={{ position: 'absolute', top: 'calc(100% + 16px)', right: '-10px', width: '320px', backgroundColor: '#FFFFFF', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', overflow: 'hidden', zIndex: 100, border: '1px solid #E5E7EB' }}>
                                            <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#000' }}>Уведомления</h3>
                                                <span onClick={markAllAsRead} style={{ fontSize: '12px', color: theme.accent, cursor: 'pointer', fontWeight: 800 }}>Прочитать все</span>
                                            </div>
                                            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                                                {notifications.map(n => (
                                                    <div
                                                        key={n.id}
                                                        onClick={() => handleNotificationClick(n)}
                                                        style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', backgroundColor: n.unread ? '#FFF5F5' : '#FFF', cursor: 'pointer', transition: 'background 0.2s' }}
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                            <span style={{ fontSize: '14px', fontWeight: 800, color: '#000' }}>{n.title}</span>
                                                            {n.unread && <div style={{ width: '8px', height: '8px', backgroundColor: theme.accent, borderRadius: '50%', marginTop: '4px' }} />}
                                                        </div>
                                                        <p style={{ fontSize: '13px', color: '#666', margin: '0 0 8px 0', lineHeight: '1.4' }}>{n.desc}</p>
                                                        <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700 }}>{n.time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <button onClick={() => navigate('/login')} style={{ backgroundColor: theme.accent, color: '#FFF', padding: '10px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}>
                                Войти
                            </button>
                        )}
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {user ? (
                            <img src={user.avatar} alt="Avatar" onClick={() => navigate(user.role === 'applicant' ? '/dashboard' : '/dashboard/employer')} style={{ width: '32px', height: '32px', borderRadius: '50%', border: `2px solid ${theme.accent}` }} />
                        ) : (
                            <LogIn size={24} color={theme.text} onClick={() => navigate('/login')} style={{ cursor: 'pointer' }} />
                        )}
                        {mobileMenuOpen ? <X size={28} onClick={() => setMobileMenuOpen(false)} style={{ cursor: 'pointer' }} /> : <Menu size={28} onClick={() => setMobileMenuOpen(true)} style={{ cursor: 'pointer' }} />}
                    </div>
                )}
            </div>

            {isMobile && mobileMenuOpen && (
                <div style={{ backgroundColor: '#1A1A1A', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', border: `1px solid ${theme.border}` }}>
                    <NavItem text="Вакансии" path="/" />
                    <NavItem text="Сообщения" path="/messages" />
                    <NavItem text="Сообщество" path="/community" />
                    <NavItem text="О нас" path="/about" />
                    {user && (
                        <>
                            <div style={{ height: '1px', backgroundColor: theme.border, margin: '8px 0' }} />
                            <NavItem text="Личный кабинет" path={user.role === 'applicant' ? '/dashboard' : '/dashboard/employer'} />
                            <NavItem text="Настройки" path="/settings" />
                        </>
                    )}
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: '16px', padding: '12px 20px', gap: '12px', border: `1px solid ${theme.border}` }}>
                <Search size={20} color={theme.textMuted} />
                <input
                    type="text"
                    placeholder={isMobile ? "Поиск..." : "Быстрый поиск вакансий или компаний..."}
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    style={{ background: 'none', border: 'none', color: theme.text, fontSize: '15px', width: '100%', outline: 'none', fontWeight: 500 }}
                />
            </div>

        </header>
    );
}