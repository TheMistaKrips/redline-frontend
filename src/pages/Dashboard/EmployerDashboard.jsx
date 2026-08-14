import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UploadCloud, AlertCircle, CheckCircle2, FileText, Plus } from 'lucide-react';

const MANDATORY_DOCS = [
    'Устав предприятия',
    'Свидетельство о регистрации (Шахадатнама)',
    'Выписка из ЕГРЮЛ Туркменистана',
    'Справка из органа статистики (коды)',
    'Приказ о назначении директора',
    'Договор аренды (юр. адрес)',
    'Справка из банка о расчетном счете'
];

export default function EmployerDashboard() {
    const { user, logout } = useContext(AuthContext);
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const [status, setStatus] = useState(user?.verificationStatus || 'pending'); // pending, checking, verified

    if (!user) return null;

    const handleUpload = (docName) => {
        if (!uploadedDocs.includes(docName)) {
            setUploadedDocs([...uploadedDocs, docName]);
        }
    };

    const sendForVerification = () => {
        if (uploadedDocs.length === 7) {
            setStatus('checking');
            alert('Документы отправлены на премодерацию. Ожидайте ответа администратора в течение 3 дней.');
        }
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px 0', color: '#131313' }}>Кабинет работодателя</h1>
                    <p style={{ color: '#666', margin: 0, fontSize: '15px' }}>{user.name} • {user.email}</p>
                </div>
                <button onClick={logout} style={{ padding: '12px 24px', backgroundColor: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '16px', fontWeight: 700, cursor: 'pointer' }}>
                    Выйти
                </button>
            </div>

            {/* Баннер статуса */}
            <div style={{
                backgroundColor: status === 'pending' ? '#FEF2F2' : status === 'checking' ? '#FEF3C7' : '#D1FAE5',
                border: `1px solid ${status === 'pending' ? '#FCA5A5' : status === 'checking' ? '#FCD34D' : '#6EE7B7'}`,
                borderRadius: '24px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px'
            }}>
                {status === 'pending' && <AlertCircle size={32} color="#EF4444" />}
                {status === 'checking' && <AlertCircle size={32} color="#D97706" />}
                {status === 'verified' && <CheckCircle2 size={32} color="#059669" />}
                <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: '#131313' }}>
                        {status === 'pending' && 'Требуется верификация компании'}
                        {status === 'checking' && 'Документы на проверке'}
                        {status === 'verified' && 'Компания верифицирована'}
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px', color: '#4B5563' }}>
                        {status === 'pending' && 'Для публикации вакансий необходимо загрузить 7 обязательных юридических документов.'}
                        {status === 'checking' && 'Наши модераторы проверяют ваши документы. Публикация вакансий временно недоступна.'}
                        {status === 'verified' && 'У вас есть полный доступ к публикации вакансий и поиску сотрудников.'}
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>

                {/* Левая колонка: Документы */}
                <div style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '32px', boxShadow: '0 12px 24px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#131313' }}>Юридические документы</h2>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: uploadedDocs.length === 7 ? '#10B981' : '#6B7280' }}>
                            Загружено {uploadedDocs.length} из 7
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {MANDATORY_DOCS.map((doc, idx) => {
                            const isUploaded = uploadedDocs.includes(doc);
                            return (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #E5E7EB', borderRadius: '16px', backgroundColor: isUploaded ? '#F9FAFB' : '#FFF' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', backgroundColor: isUploaded ? '#D1FAE5' : '#F3F4F6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {isUploaded ? <CheckCircle2 size={20} color="#059669" /> : <FileText size={20} color="#9CA3AF" />}
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#131313' }}>{doc}</span>
                                    </div>
                                    {!isUploaded && status === 'pending' ? (
                                        <button onClick={() => handleUpload(doc)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#3B82F6', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>
                                            <UploadCloud size={16} /> Загрузить
                                        </button>
                                    ) : isUploaded ? (
                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>Загружено</span>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>

                    {status === 'pending' && (
                        <button
                            onClick={sendForVerification}
                            disabled={uploadedDocs.length !== 7}
                            style={{ width: '100%', marginTop: '24px', padding: '16px', backgroundColor: uploadedDocs.length === 7 ? '#131313' : '#F3F4F6', color: uploadedDocs.length === 7 ? '#FFF' : '#9CA3AF', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: uploadedDocs.length === 7 ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
                        >
                            Отправить на проверку
                        </button>
                    )}
                </div>

                {/* Правая колонка: Вакансии */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '32px', boxShadow: '0 12px 24px rgba(0,0,0,0.03)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#131313' }}>Мои вакансии</h2>
                            <button
                                disabled={status !== 'verified'}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: status === 'verified' ? '#3B82F6' : '#F3F4F6', color: status === 'verified' ? '#FFF' : '#9CA3AF', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: status === 'verified' ? 'pointer' : 'not-allowed' }}
                            >
                                <Plus size={18} /> Создать
                            </button>
                        </div>

                        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#F9FAFB', borderRadius: '20px' }}>
                            <p style={{ color: '#6B7280', margin: 0, fontSize: '14px', fontWeight: 500 }}>
                                {status === 'verified' ? 'У вас пока нет активных вакансий. Создайте первую!' : 'Возможность создавать вакансии появится после проверки документов.'}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}