import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, Heart, Users } from 'lucide-react';

export default function AboutUs() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: isMobile ? '0 16px 40px' : '0 20px 60px' }}>

            {/* ГЕРОЙ БЛОК */}
            <div style={{ backgroundColor: '#000000', borderRadius: isMobile ? '24px' : '40px', padding: isMobile ? '60px 20px' : '100px 40px', textAlign: 'center', color: '#FFFFFF', position: 'relative', overflow: 'hidden', marginBottom: isMobile ? '24px' : '40px', border: '1px solid #333' }}>

                {/* Паттерн */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(165, 12, 32, 0.2)', padding: '10px 20px', borderRadius: '24px', fontSize: '14px', fontWeight: 900, marginBottom: '24px', border: '1px solid rgba(165, 12, 32, 0.5)', color: '#FFF' }}>
                        <Sparkles size={18} color="#A50C20" /> Инновационный стартап
                    </div>
                    <h1 style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 900, margin: '0 0 20px 0', lineHeight: '1.2', letterSpacing: '-1px' }}>
                        Rushline — это про людей<br />и про счастье.
                    </h1>
                    <p style={{ fontSize: isMobile ? '16px' : '20px', color: '#9CA3AF', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6', fontWeight: 500 }}>
                        Современный туркменский проект, который ломает стереотипы о поиске работы. Мы верим, что каждый талант заслуживает найти работу мечты, а каждая компания — идеального сотрудника.
                    </p>
                </div>
            </div>

            {/* Ценности */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: isMobile ? '24px' : '40px' }}>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: isMobile ? '32px 20px' : '48px 40px', border: '1px solid #E5E7EB', boxShadow: '0 12px 24px rgba(0,0,0,0.03)', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: '#FFF5F5', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <Heart size={40} color="#A50C20" />
                    </div>
                    <h3 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 900, color: '#000', marginBottom: '16px' }}>Мы любим людей</h3>
                    <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', fontWeight: 500 }}>Платформа создана с заботой о каждом пользователе. Никаких сложных форм, только удобство, эстетика и безопасность данных.</p>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: isMobile ? '32px 20px' : '48px 40px', border: '1px solid #E5E7EB', boxShadow: '0 12px 24px rgba(0,0,0,0.03)', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: '#F9FAFB', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <Users size={40} color="#000" />
                    </div>
                    <h3 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 900, color: '#000', marginBottom: '16px' }}>Открытое комьюнити</h3>
                    <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', fontWeight: 500 }}>Мы объединяем лучшие компании Туркменистана и самые яркие таланты на одной удобной площадке с прозрачными условиями.</p>
                </div>
            </div>

            {/* Блок контактов */}
            <div style={{ backgroundColor: '#A50C20', borderRadius: isMobile ? '24px' : '40px', padding: isMobile ? '32px 24px' : '56px 48px', color: '#FFFFFF', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '24px', boxShadow: '0 20px 40px rgba(165,12,32,0.2)' }}>
                <div>
                    <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 900, margin: '0 0 12px 0' }}>Напишите создателю</h2>
                    <p style={{ margin: 0, fontSize: isMobile ? '15px' : '18px', opacity: 0.9, fontWeight: 600, lineHeight: '1.5' }}>
                        <span style={{ fontWeight: 900, color: '#FFF' }}>Фетисов Герман</span> всегда на связи и рад фидбеку.
                    </p>
                </div>
                <a href="mailto:fetisovdev0@gmail.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '100%' : 'auto', gap: '12px', backgroundColor: '#FFFFFF', color: '#A50C20', padding: isMobile ? '16px 20px' : '20px 40px', borderRadius: '20px', fontSize: isMobile ? '16px' : '20px', fontWeight: 900, textDecoration: 'none', boxShadow: '0 12px 24px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }} onMouseEnter={e => e.target.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
                    <Mail size={24} /> fetisovdev0@gmail.com
                </a>
            </div>

        </div>
    );
}