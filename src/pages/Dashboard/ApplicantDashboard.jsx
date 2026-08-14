import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FileText, UploadCloud, Edit2 } from 'lucide-react';

export default function ApplicantDashboard() {
    const { user, logout, updateProfilePic } = useContext(AuthContext);
    const [dragActive, setDragActive] = useState(false);

    if (!user) return null;

    // Имитация загрузки файла
    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        alert('Резюме успешно загружено! (Имитация)');
    };

    const handleAvatarChange = () => {
        // В реальности здесь открывается окно выбора файла, для MVP просто меняем seed
        const newSeed = Math.random().toString(36).substring(7);
        updateProfilePic(`https://api.dicebear.com/9.x/notionists/svg?seed=${newSeed}`);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <img src={user.avatar} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '24px', backgroundColor: '#FFF', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', objectFit: 'cover' }} />
                        <button onClick={handleAvatarChange} style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#131313', color: '#FFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                            <Edit2 size={16} />
                        </button>
                    </div>
                    <div>
                        <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px 0', color: '#131313' }}>Привет, {user.name}!</h1>
                        <p style={{ color: '#666', margin: 0, fontSize: '15px' }}>{user.email} • Соискатель</p>
                    </div>
                </div>
                <button onClick={logout} style={{ padding: '12px 24px', backgroundColor: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '16px', fontWeight: 700, cursor: 'pointer' }}>
                    Выйти
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>

                {/* Блок Резюме с Drag & Drop */}
                <div style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '32px', boxShadow: '0 12px 24px rgba(0,0,0,0.03)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 24px 0', color: '#131313' }}>Управление резюме</h2>

                    <div
                        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleDrop}
                        style={{
                            border: dragActive ? '2px dashed #3B82F6' : '2px dashed #E5E7EB',
                            borderRadius: '24px', padding: '40px 20px', textAlign: 'center',
                            backgroundColor: dragActive ? '#EFF6FF' : '#F9FAFB', transition: 'all 0.2s', marginBottom: '24px'
                        }}
                    >
                        <UploadCloud size={40} color={dragActive ? '#3B82F6' : '#9CA3AF'} style={{ marginBottom: '16px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0', color: '#131313' }}>Загрузить файл резюме</h3>
                        <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Перетащите файл сюда или нажмите для выбора (PDF, DOCX)</p>
                    </div>

                    <div style={{ border: '1px solid #E5E7EB', borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', backgroundColor: '#F3F4F6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText size={24} color="#131313" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '15px' }}>Frontend Разработчик.pdf</div>
                            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>Обновлено сегодня • 1.2 MB</div>
                        </div>
                        <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>Активно</span>
                    </div>
                </div>

                {/* Блок Откликов */}
                <div style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '32px', boxShadow: '0 12px 24px rgba(0,0,0,0.03)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 24px 0', color: '#131313' }}>История откликов</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[1, 2].map((i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: i === 1 ? '1px solid #F3F4F6' : 'none' }}>
                                <div style={{ width: '48px', height: '48px', backgroundColor: i === 1 ? '#E0F7FA' : '#FFE8D6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: '#131313' }}>
                                    {i === 1 ? 'G' : 'A'}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#131313' }}>{i === 1 ? 'Junior React Developer' : 'UX Designer'}</div>
                                    <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>{i === 1 ? 'Google TM' : 'Amazon TM'} • Вчера</div>
                                </div>
                                <div style={{ backgroundColor: i === 1 ? '#FEF3C7' : '#F3F4F6', color: i === 1 ? '#D97706' : '#6B7280', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                                    {i === 1 ? 'На рассмотрении' : 'Отказ'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}