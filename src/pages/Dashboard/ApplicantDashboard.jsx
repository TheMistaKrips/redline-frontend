import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FileText, UserCircle, Briefcase, Eye, Plus, Trash2, Edit2, Save, UploadCloud, Link as LinkIcon, Check } from 'lucide-react';
import { CATEGORIES } from '../../mocks/data';

export default function ApplicantDashboard() {
    const { user, updateUserProfile } = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    const [about, setAbout] = useState(user?.about || '');
    const [socials, setSocials] = useState(user?.socials || []);
    const [selectedCategories, setSelectedCategories] = useState(user?.categories || []);

    const [resume, setResume] = useState(
        user?.resume !== undefined ? user.resume : { name: `Резюме_${user?.name?.replace(/\s+/g, '_') || 'Мое'}.pdf`, size: '1.2 MB' }
    );

    const fileInputRef = useRef(null);

    if (!user) return null;

    const handleSave = () => {
        const cleanedSocials = socials.filter(link => link.trim() !== '');
        setSocials(cleanedSocials);
        updateUserProfile({ about, socials: cleanedSocials, resume, categories: selectedCategories });
        setIsEditing(false);
    };

    const handleAddSocialField = () => {
        setSocials([...socials, '']);
    };

    const handleSocialChange = (index, value) => {
        const updated = [...socials];
        updated[index] = value;
        setSocials(updated);
    };

    const handleRemoveSocial = (index) => {
        setSocials(socials.filter((_, i) => i !== index));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
            setResume({ name: file.name, size: fileSize });
        }
    };

    const toggleCategory = (cat) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(selectedCategories.filter(c => c !== cat));
        } else {
            setSelectedCategories([...selectedCategories, cat]);
        }
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 900, margin: '0 0 40px 0', color: '#000' }}>Кабинет соискателя</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>

                {/* ПАНЕЛЬ ПРОФИЛЯ */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '40px', border: '1px solid #E5E7EB', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-24px', zIndex: 10 }}>
                        {isEditing ? (
                            <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#A50C20', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(165,12,32,0.2)' }}>
                                <Save size={18} /> Сохранить
                            </button>
                        ) : (
                            <button onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#000000', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}>
                                <Edit2 size={18} /> Изменить профиль
                            </button>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
                        <img src={user.avatar} alt="Profile" style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', border: '4px solid #F3F4F6', objectFit: 'cover' }} />
                        <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 8px 0', color: '#000' }}>{user.name}</h2>

                        {/* Отрасли: Чтение или Редактирование */}
                        {!isEditing ? (
                            <div style={{ backgroundColor: '#F9FAFB', padding: '8px 16px', borderRadius: '12px', color: '#333', fontSize: '14px', fontWeight: 700, border: '1px solid #E5E7EB' }}>
                                Отрасли: {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'Не указано'}
                            </div>
                        ) : (
                            <div style={{ width: '100%', marginTop: '12px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 800, color: '#000', marginBottom: '8px', textAlign: 'left' }}>Выберите ваши отрасли:</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => toggleCategory(cat)}
                                            style={{
                                                padding: '8px 12px', borderRadius: '10px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px',
                                                border: selectedCategories.includes(cat) ? '2px solid #A50C20' : '1px solid #E5E7EB',
                                                backgroundColor: selectedCategories.includes(cat) ? '#FFF5F5' : '#FFF',
                                                color: selectedCategories.includes(cat) ? '#A50C20' : '#666',
                                                fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
                                            }}
                                        >
                                            {selectedCategories.includes(cat) && <Check size={14} />} {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ОБО МНЕ & СОЦСЕТИ */}
                    <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '32px', paddingBottom: '32px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '16px', color: '#000' }}>Обо мне</h3>
                        {isEditing ? (
                            <div>
                                <textarea
                                    value={about}
                                    onChange={e => setAbout(e.target.value.slice(0, 300))}
                                    placeholder="Расскажите кратко о своем опыте и сильных сторонах..."
                                    style={{ width: '100%', height: '120px', padding: '16px', borderRadius: '16px', border: '2px solid #A50C20', outline: 'none', resize: 'none', fontSize: '15px', backgroundColor: '#FFF5F5', fontWeight: 500, fontFamily: 'inherit' }}
                                />
                                <div style={{ textAlign: 'right', fontSize: '13px', color: '#9CA3AF', fontWeight: 700, marginTop: '4px' }}>
                                    {about.length} / 300
                                </div>
                            </div>
                        ) : (
                            <p style={{ fontSize: '15px', lineHeight: '1.6', color: about ? '#333' : '#9CA3AF', fontWeight: 500, margin: 0, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                                {about || 'Информация не указана. Расскажите о себе, чтобы привлечь работодателей.'}
                            </p>
                        )}

                        <h3 style={{ fontSize: '18px', fontWeight: 900, margin: '24px 0 16px 0', color: '#000' }}>Социальные сети и Портфолио</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {socials.map((link, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', backgroundColor: isEditing ? 'transparent' : '#F9FAFB', padding: isEditing ? '0' : '12px 16px', borderRadius: '12px', border: isEditing ? 'none' : '1px solid #E5E7EB' }}>
                                    {isEditing ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '4px 8px 4px 16px' }}>
                                            <LinkIcon size={16} color="#9CA3AF" />
                                            <input type="text" value={link} onChange={(e) => handleSocialChange(idx, e.target.value)} placeholder="https://t.me/username" style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', fontWeight: 600, padding: '8px 0' }} />
                                            <button onClick={() => handleRemoveSocial(idx)} style={{ background: '#FFF5F5', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#EF4444', display: 'flex', padding: '8px' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <a href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: '#A50C20', fontWeight: 700, textDecoration: 'none', wordBreak: 'break-all' }}>{link}</a>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <button onClick={handleAddSocialField} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#F9FAFB', color: '#000', border: '1px dashed #D1D5DB', borderRadius: '12px', padding: '12px', fontWeight: 800, cursor: 'pointer', marginTop: '8px' }}>
                                    <Plus size={18} /> Добавить ссылку
                                </button>
                            )}
                            {!isEditing && socials.length === 0 && (
                                <div style={{ fontSize: '14px', color: '#9CA3AF', fontWeight: 600 }}>Нет добавленных ссылок.</div>
                            )}
                        </div>
                    </div>

                    {/* БЛОК УПРАВЛЕНИЯ РЕЗЮМЕ */}
                    <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '32px', flexGrow: 1 }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px', color: '#000', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <UserCircle size={20} color="#A50C20" /> Файл Резюме
                        </h3>

                        {resume ? (
                            <div style={{ backgroundColor: '#FFF5F5', padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #FCA5A5' }}>
                                <div style={{ width: '48px', height: '48px', backgroundColor: '#A50C20', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <FileText size={24} color="#FFF" />
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ fontWeight: 900, fontSize: '15px', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{resume.name}</div>
                                    <div style={{ fontSize: '13px', color: '#A50C20', fontWeight: 700, marginTop: '4px' }}>{resume.size} • Активно</div>
                                </div>
                                {isEditing && (
                                    <button onClick={() => setResume(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex', padding: '8px' }}>
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div style={{ backgroundColor: '#F9FAFB', padding: '32px 20px', borderRadius: '20px', border: '2px dashed #E5E7EB', textAlign: 'center' }}>
                                <p style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#666', fontWeight: 600 }}>Резюме не загружено.</p>
                                {isEditing ? (
                                    <>
                                        <input type="file" accept=".pdf,.doc,.docx" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />
                                        <button onClick={() => fileInputRef.current?.click()} style={{ backgroundColor: '#000', color: '#FFF', border: 'none', padding: '12px 24px', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                            <UploadCloud size={18} /> Выбрать файл
                                        </button>
                                    </>
                                ) : (
                                    <p style={{ margin: 0, fontSize: '14px', color: '#A50C20', fontWeight: 700 }}>Нажмите «Изменить профиль», чтобы загрузить файл.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* СТАТИСТИКА */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '32px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ width: '48px', height: '48px', backgroundColor: '#F3F4F6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Briefcase size={24} color="#000" />
                            </div>
                            <div><div style={{ fontSize: '32px', fontWeight: 900, color: '#000' }}>0</div><div style={{ fontSize: '14px', color: '#666', fontWeight: 600 }}>Активных откликов</div></div>
                        </div>
                        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '32px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ width: '48px', height: '48px', backgroundColor: '#FFF5F5', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Eye size={24} color="#A50C20" />
                            </div>
                            <div><div style={{ fontSize: '32px', fontWeight: 900, color: '#000' }}>14</div><div style={{ fontSize: '14px', color: '#666', fontWeight: 600 }}>Просмотров резюме</div></div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '40px', border: '1px solid #E5E7EB', flexGrow: 1 }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 24px 0', color: '#000' }}>История откликов</h2>
                        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#F9FAFB', borderRadius: '24px', border: '1px dashed #E5E7EB' }}>
                            <p style={{ color: '#666', margin: 0, fontSize: '15px', fontWeight: 500, lineHeight: '1.6' }}>Вы пока не откликались на вакансии. Перейдите на главную страницу, выберите отрасль и найдите идеальную работу!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}