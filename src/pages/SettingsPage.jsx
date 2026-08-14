import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Lock, Bell, User, Shield } from 'lucide-react';

export default function SettingsPage() {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 60px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 32px 0', color: '#131313' }}>Настройки</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Профиль */}
                <div style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <User size={24} color="#131313" />
                        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Данные профиля</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#666', marginBottom: '8px' }}>Имя</label>
                            <input type="text" defaultValue={user.name} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none', fontSize: '15px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#666', marginBottom: '8px' }}>Email</label>
                            <input type="email" defaultValue={user.email} disabled style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: '#F3F4F6', outline: 'none', fontSize: '15px', color: '#9CA3AF' }} />
                        </div>
                        <button style={{ alignSelf: 'flex-start', padding: '12px 24px', backgroundColor: '#131313', color: '#FFF', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '8px' }}>Сохранить изменения</button>
                    </div>
                </div>

                {/* Уведомления */}
                <div style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Bell size={24} color="#131313" />
                        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Уведомления</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                            <span style={{ fontSize: '15px', fontWeight: 600 }}>Новые сообщения</span>
                            <input type="checkbox" defaultChecked style={{ accentColor: '#3B82F6', width: '18px', height: '18px' }} />
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                            <span style={{ fontSize: '15px', fontWeight: 600 }}>Обновления статуса отклика</span>
                            <input type="checkbox" defaultChecked style={{ accentColor: '#3B82F6', width: '18px', height: '18px' }} />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}