import React from 'react';
import { Heart, Sparkles, Mail, Users } from 'lucide-react';

export default function AboutUs() {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 60px' }}>

            {/* Герой-блок */}
            <div style={{ backgroundColor: '#131313', borderRadius: '40px', padding: '80px 40px', textAlign: 'center', color: '#FFF', position: 'relative', overflow: 'hidden', marginBottom: '40px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.3 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>
                        <Sparkles size={16} color="#3B82F6" /> Классный стартап
                    </div>
                    <h1 style={{ fontSize: '48px', fontWeight: 900, margin: '0 0 24px 0', lineHeight: '1.1' }}>
                        RedLine — это про людей<br />и про счастье.
                    </h1>
                    <p style={{ fontSize: '18px', color: '#9CA3AF', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                        Крутой туркменский проект, который ломает стереотипы о поиске работы. Мы верим, что каждый человек заслуживает найти работу мечты и быть счастливым.
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <div style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '40px', boxShadow: '0 12px 24px rgba(0,0,0,0.03)', textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', backgroundColor: '#FEE2E2', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <Heart size={32} color="#EF4444" />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#131313', marginBottom: '12px' }}>Мы любим людей</h3>
                    <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>Платформа создана с заботой о каждом пользователе. Никаких сложных форм, только удобство и эстетика.</p>
                </div>

                <div style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '40px', boxShadow: '0 12px 24px rgba(0,0,0,0.03)', textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', backgroundColor: '#E0F7FA', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <Users size={32} color="#06B6D4" />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#131313', marginBottom: '12px' }}>Открытое комьюнити</h3>
                    <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>Мы объединяем лучшие компании Туркменистана и самые яркие таланты на одной удобной площадке.</p>
                </div>
            </div>

            {/* Блок контактов */}
            <div style={{ backgroundColor: '#3B82F6', borderRadius: '32px', padding: '40px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px 0' }}>Остались вопросы?</h2>
                    <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>Напишите нам, мы всегда на связи и рады фидбеку.</p>
                </div>
                <a href="mailto:fetisovdev0@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#FFF', color: '#3B82F6', padding: '16px 32px', borderRadius: '20px', fontSize: '18px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                    <Mail size={24} /> fetisovdev0@gmail.com
                </a>
            </div>

        </div>
    );
}