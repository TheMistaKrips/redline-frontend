import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

// Безопасные SVG-иконки соцсетей (так как lucide-react удалил бренды из библиотеки)
const InstagramIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const TwitterIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
);

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '60px 20px', borderTop: '4px solid #A50C20', marginTop: 'auto' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>

                {/* Блок бренда */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: '#A50C20', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <img src="/logo.jpg" alt="Rushline Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="color:#FFF; font-weight:900; font-size:18px">RL</span>'; }} />
                        </div>
                        <span style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', color: '#FFF' }}>Rushline</span>
                    </div>
                    <p style={{ color: '#9CA3AF', fontSize: '15px', lineHeight: '1.6', margin: 0, maxWidth: '300px' }}>
                        Ведущая платформа для поиска работы и найма лучших специалистов в Туркменистане. Мы объединяем таланты и амбициозные компании.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                        <a href="#" style={{ color: '#9CA3AF', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#A50C20'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                            <InstagramIcon size={24} />
                        </a>
                        <a href="#" style={{ color: '#9CA3AF', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#A50C20'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                            <LinkedinIcon size={24} />
                        </a>
                        <a href="#" style={{ color: '#9CA3AF', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#A50C20'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                            <TwitterIcon size={24} />
                        </a>
                    </div>
                </div>

                {/* Навигация */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#FFF', margin: '0 0 8px 0' }}>Платформа</h3>
                    <span onClick={() => navigate('/')} style={{ color: '#9CA3AF', cursor: 'pointer', fontSize: '15px', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#A50C20'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>Поиск вакансий</span>
                    <span onClick={() => navigate('/login')} style={{ color: '#9CA3AF', cursor: 'pointer', fontSize: '15px', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#A50C20'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>Разместить вакансию</span>
                    <span onClick={() => navigate('/community')} style={{ color: '#9CA3AF', cursor: 'pointer', fontSize: '15px', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#A50C20'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>Сообщество</span>
                    <span onClick={() => navigate('/about')} style={{ color: '#9CA3AF', cursor: 'pointer', fontSize: '15px', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#A50C20'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>О компании</span>
                </div>

                {/* Контакты */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#FFF', margin: '0 0 8px 0' }}>Контакты</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9CA3AF', fontSize: '15px', fontWeight: 600 }}>
                        <Mail size={18} color="#A50C20" /> fetisovdev0@gmail.com
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9CA3AF', fontSize: '15px', fontWeight: 600 }}>
                        <Phone size={18} color="#A50C20" /> +993 60 000000
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#9CA3AF', fontSize: '15px', fontWeight: 600, lineHeight: '1.5' }}>
                        <MapPin size={18} color="#A50C20" style={{ flexShrink: 0, marginTop: '2px' }} /> Ашхабад, Туркменистан<br />ул. Инноваций, д. 1
                    </div>
                </div>

            </div>

            <div style={{ maxWidth: '1400px', margin: '40px auto 0', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <p style={{ margin: 0, color: '#666', fontSize: '14px', fontWeight: 600 }}>&copy; {new Date().getFullYear()} Rushline. Все права защищены.</p>
                <div style={{ display: 'flex', gap: '24px', color: '#666', fontSize: '14px', fontWeight: 600 }}>
                    <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#FFF'} onMouseLeave={e => e.target.style.color = '#666'}>Политика конфиденциальности</span>
                    <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#FFF'} onMouseLeave={e => e.target.style.color = '#666'}>Условия использования</span>
                </div>
            </div>
        </footer>
    );
}