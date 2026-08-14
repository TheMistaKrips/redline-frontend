import React, { useState, useEffect, useRef, useContext } from 'react';
import { Search, MapPin, Bell, Settings, Aperture, Menu, X, SlidersHorizontal, LogIn } from 'lucide-react';
import { FilterContext } from '../../context/FilterContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const theme = {
    bg: '#131313', text: '#FFFFFF', textMuted: '#9CA3AF',
    inputBg: 'rgba(255, 255, 255, 0.04)', border: 'rgba(255, 255, 255, 0.08)', accent: '#3B82F6'
};

const CITIES = ['Ашхабад', 'Туркменабад', 'Дашогуз', 'Мары', 'Балканабат', 'Туркменбаши'];

const mockNotifications = [
    { id: 1, title: 'Новый отклик', desc: 'У вас новое сообщение в чате', time: '10 мин назад', unread: true },
    { id: 2, title: 'Системное уведомление', desc: 'Добро пожаловать в RedLine!', time: 'Вчера', unread: false }
];

export default function Header() {
    const { filters, updateFilter } = useContext(FilterContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const dropdownRef = useRef(null);
    const notifRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowCityDropdown(false);
            if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifications(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const NavItem = ({ text, path }) => (
        <span
            onClick={() => { navigate(path); setMobileMenuOpen(false); }}
            style={{ color: window.location.pathname === path ? theme.text : theme.textMuted, cursor: 'pointer', borderBottom: window.location.pathname === path ? `2px solid ${theme.text}` : '2px solid transparent', paddingBottom: '4px', transition: 'color 0.2s', fontSize: isMobile ? '16px' : '14px', fontWeight: isMobile ? 600 : 500 }}
            onMouseEnter={(e) => e.target.style.color = theme.text}
            onMouseLeave={(e) => e.target.style.color = window.location.pathname === path ? theme.text : theme.textMuted}
        >
            {text}
        </span>
    );

    return (
        <header style={{ backgroundColor: theme.bg, color: theme.text, borderRadius: isMobile ? '20px' : '32px', padding: isMobile ? '16px 20px' : '24px 32px', margin: isMobile ? '10px' : '20px', display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative', zIndex: 50 }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '22px', fontWeight: 800, cursor: 'pointer' }}>
                    <div style={{ width: '28px', height: '28px', backgroundColor: theme.text, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Aperture color={theme.bg} size={20} />
                    </div>
                    RedLine
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', color: theme.textMuted }}>
                        {user ? (
                            <>
                                <img
                                    src={user.avatar} alt="Avatar"
                                    onClick={() => navigate(user.role === 'applicant' ? '/dashboard' : '/dashboard/employer')}
                                    style={{ width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.1)', objectFit: 'cover' }}
                                    title="Личный кабинет"
                                />
                                <Settings size={20} onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }} />

                                <div ref={notifRef} style={{ position: 'relative' }}>
                                    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowNotifications(!showNotifications)}>
                                        <Bell size={20} />
                                        <div style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%' }} />
                                    </div>

                                    {showNotifications && (
                                        <div style={{ position: 'absolute', top: 'calc(100% + 16px)', right: '-10px', width: '320px', backgroundColor: '#FFF', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 100 }}>
                                            <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#131313' }}>Уведомления</h3>
                                            </div>
                                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                {mockNotifications.map(n => (
                                                    <div key={n.id} style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', backgroundColor: n.unread ? '#F9FAFB' : '#FFF' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#131313' }}>{n.title}</span>
                                                        </div>
                                                        <p style={{ fontSize: '13px', color: '#666', margin: '0 0 8px 0' }}>{n.desc}</p>
                                                        <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>{n.time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <button onClick={() => navigate('/login')} style={{ backgroundColor: theme.text, color: theme.bg, padding: '10px 24px', borderRadius: '16px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                                Войти
                            </button>
                        )}
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {user ? (
                            <img src={user.avatar} alt="Avatar" onClick={() => navigate(user.role === 'applicant' ? '/dashboard' : '/dashboard/employer')} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                        ) : (
                            <LogIn size={24} color={theme.text} onClick={() => navigate('/login')} style={{ cursor: 'pointer' }} />
                        )}
                        {mobileMenuOpen ? (
                            <X size={28} onClick={() => setMobileMenuOpen(false)} style={{ cursor: 'pointer' }} />
                        ) : (
                            <Menu size={28} onClick={() => setMobileMenuOpen(true)} style={{ cursor: 'pointer' }} />
                        )}
                    </div>
                )}
            </div>

            {isMobile && mobileMenuOpen && (
                <div style={{ backgroundColor: theme.inputBg, borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderTop: `1px solid ${theme.border}` }}>
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

            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', backgroundColor: theme.inputBg, borderRadius: isMobile ? '16px' : '20px', padding: isMobile ? '12px' : '12px 24px', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1.5, borderRight: isMobile ? 'none' : `1px solid ${theme.border}`, paddingRight: isMobile ? '0' : '20px' }}>
                    <Search size={20} color={theme.textMuted} />
                    <input type="text" placeholder="Профессия, должность..." value={filters.search} onChange={(e) => updateFilter('search', e.target.value)} style={{ background: 'none', border: 'none', color: theme.text, fontSize: '15px', width: '100%', outline: 'none', fontWeight: 500 }} />
                    {isMobile && <SlidersHorizontal size={20} onClick={() => setIsFiltersOpen(!isFiltersOpen)} color={isFiltersOpen ? theme.accent : theme.textMuted} style={{ cursor: 'pointer' }} />}
                </div>

                {(!isMobile || isFiltersOpen) && (
                    <>
                        <div ref={dropdownRef} style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, borderRight: isMobile ? 'none' : `1px solid ${theme.border}`, padding: isMobile ? '12px 0' : '0 20px', position: 'relative' }}>
                            <MapPin size={20} color={theme.textMuted} />
                            <input type="text" placeholder="Любой город" value={filters.city} onChange={(e) => { updateFilter('city', e.target.value); setShowCityDropdown(true); }} onFocus={() => setShowCityDropdown(true)} style={{ background: 'none', border: 'none', color: theme.text, fontSize: '15px', width: '100%', outline: 'none', fontWeight: 500 }} />
                            {showCityDropdown && (
                                <div style={{ position: 'absolute', top: 'calc(100% + 10px)', left: 0, width: '100%', backgroundColor: theme.bg, borderRadius: '12px', border: `1px solid ${theme.border}`, zIndex: 10 }}>
                                    {CITIES.map(c => (
                                        <div key={c} onClick={() => { updateFilter('city', c); setShowCityDropdown(false); }} style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: `1px solid ${theme.border}` }}>{c}</div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, paddingLeft: isMobile ? '0' : '20px', paddingTop: isMobile ? '12px' : '0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: theme.textMuted }}>
                                <span>Уровень дохода</span>
                                <span style={{ color: '#FFF', fontWeight: 600 }}>{filters.salaryMin > 0 ? `${filters.salaryMin.toLocaleString()} TMT` : 'Любой'}</span>
                            </div>
                            <input type="range" min="0" max="50000" step="1000" value={filters.salaryMin} onChange={(e) => updateFilter('salaryMin', Number(e.target.value))} style={{ width: '100%', accentColor: theme.accent, cursor: 'pointer' }} />
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}