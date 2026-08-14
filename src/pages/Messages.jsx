import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Search, Send, FileText, CheckCheck } from 'lucide-react';

const mockChats = [
    { id: 1, name: 'Amazon TM', role: 'Работодатель', lastMsg: 'Мы рассмотрели ваше резюме...', time: '10:42', unread: 2, avatar: 'A' },
    { id: 2, name: 'Google TM', role: 'Работодатель', lastMsg: 'Приглашаем на техническое инт...', time: 'Вчера', unread: 0, avatar: 'G' },
    { id: 3, name: 'Мердан Овезов', role: 'Соискатель', lastMsg: 'Прикрепил файл резюме. Жду ответа.', time: 'Вторник', unread: 0, avatar: 'М' }
];

export default function Messages() {
    const { user } = useContext(AuthContext);
    const [activeChat, setActiveChat] = useState(mockChats[0]);
    const [message, setMessage] = useState('');

    if (!user) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '20px' }}>Войдите в систему для просмотра сообщений</div>;

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 40px', height: 'calc(100vh - 140px)' }}>
            <div style={{ display: 'flex', backgroundColor: '#FFF', borderRadius: '32px', height: '100%', boxShadow: '0 12px 24px rgba(0,0,0,0.03)', overflow: 'hidden' }}>

                {/* Левая панель: Список чатов */}
                <div style={{ width: '350px', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '24px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 16px 0', color: '#131313' }}>Сообщения</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#F3F4F6', borderRadius: '16px', padding: '12px 16px' }}>
                            <Search size={18} color="#9CA3AF" />
                            <input type="text" placeholder="Поиск диалога..." style={{ background: 'none', border: 'none', outline: 'none', width: '100%', fontSize: '14px', fontWeight: 500 }} />
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {mockChats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => setActiveChat(chat)}
                                style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', backgroundColor: activeChat.id === chat.id ? '#F9FAFB' : '#FFF', borderLeft: activeChat.id === chat.id ? '4px solid #3B82F6' : '4px solid transparent', transition: 'all 0.2s' }}
                            >
                                <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: '#131313', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, flexShrink: 0 }}>
                                    {chat.avatar}
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                        <span style={{ fontWeight: 700, color: '#131313', fontSize: '15px' }}>{chat.name}</span>
                                        <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600 }}>{chat.time}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '13px', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.lastMsg}</span>
                                        {chat.unread > 0 && <div style={{ width: '20px', height: '20px', backgroundColor: '#3B82F6', borderRadius: '50%', color: '#FFF', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{chat.unread}</div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Правая панель: Окно чата */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#F9FAFB' }}>
                    {/* Шапка чата */}
                    <div style={{ padding: '24px', backgroundColor: '#FFF', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#131313', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800 }}>
                                {activeChat.avatar}
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '16px', color: '#131313' }}>{activeChat.name}</div>
                                <div style={{ fontSize: '13px', color: '#6B7280' }}>{activeChat.role}</div>
                            </div>
                        </div>
                    </div>

                    {/* История сообщений */}
                    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ alignSelf: 'flex-start', backgroundColor: '#FFF', padding: '16px', borderRadius: '20px', borderBottomLeftRadius: '4px', maxWidth: '70%', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.5', color: '#131313' }}>
                                Здравствуйте! Мы ознакомились с вашим профилем на RedLine. Хотим предложить вам выполнить тестовое задание.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#F3F4F6', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}>
                                <FileText size={20} color="#3B82F6" />
                                <div style={{ fontSize: '13px', fontWeight: 600 }}>Тестовое_задание.pdf</div>
                            </div>
                            <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '8px', textAlign: 'right' }}>10:42</div>
                        </div>

                        <div style={{ alignSelf: 'flex-end', backgroundColor: '#131313', color: '#FFF', padding: '16px', borderRadius: '20px', borderBottomRightRadius: '4px', maxWidth: '70%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>Добрый день! Отлично, я готов приступить. Пришлите детали.</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginTop: '8px' }}>
                                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>10:45</span>
                                <CheckCheck size={14} color="#3B82F6" />
                            </div>
                        </div>
                    </div>

                    {/* Инпут ввода */}
                    <div style={{ padding: '24px', backgroundColor: '#FFF', borderTop: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#F3F4F6', borderRadius: '20px', padding: '8px 8px 8px 24px' }}>
                            <input
                                type="text"
                                placeholder="Написать сообщение..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '15px' }}
                            />
                            <button style={{ width: '40px', height: '40px', backgroundColor: '#3B82F6', border: 'none', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF', transition: 'background 0.2s' }}>
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}