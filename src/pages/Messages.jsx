import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Search, Send, FileText, CheckCheck, ChevronLeft } from 'lucide-react';

const mockChatsList = [
    { id: 1, name: 'Мердан Овезов (Отклик)', role: 'Соискатель • IT и Разработка', time: '10:42', unread: true, avatar: 'М' },
    { id: 2, name: 'Amazon TM', role: 'Работодатель • IT', time: 'Вчера', unread: false, avatar: 'A' }
];

const initialMessagesState = {
    1: [
        { id: 101, sender: 'them', text: 'Здравствуйте! Откликаюсь на вашу вакансию.', time: '10:42', type: 'text' },
        { id: 102, sender: 'them', text: 'Резюме_Мердан.pdf', time: '10:42', type: 'file' }
    ],
    2: [
        { id: 201, sender: 'them', text: 'Здравствуйте! Мы рассмотрели ваше резюме и готовы предложить тестовое задание.', time: 'Вчера, 14:30', type: 'text' }
    ]
};

export default function Messages() {
    const { user } = useContext(AuthContext);
    const [activeChat, setActiveChat] = useState(mockChatsList[0]);
    const [messagesMap, setMessagesMap] = useState(initialMessagesState);
    const [message, setMessage] = useState('');

    // Для мобильной версии
    const [isMobile, setIsMobile] = useState(false);
    const [showChatList, setShowChatList] = useState(true);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messagesMap, activeChat, showChatList]);

    if (!user) return <div style={{ textAlign: 'center', padding: '100px 20px', fontSize: '20px', fontWeight: 900, color: '#000' }}>Войдите в систему для просмотра сообщений</div>;

    const currentMessages = messagesMap[activeChat.id] || [];

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const newMessage = {
            id: Date.now(),
            sender: 'me',
            text: message.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        };

        setMessagesMap(prev => ({
            ...prev,
            [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
        }));

        setMessage('');
    };

    const handleChatSelect = (chat) => {
        setActiveChat(chat);
        if (isMobile) {
            setShowChatList(false); // На мобилках скрываем список и показываем чат
        }
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '0' : '0 20px 40px', height: isMobile ? 'calc(100vh - 80px)' : 'calc(100vh - 140px)' }}>
            <div style={{ display: 'flex', backgroundColor: '#FFFFFF', borderRadius: isMobile ? '0' : '32px', height: '100%', border: isMobile ? 'none' : '1px solid #E5E7EB', overflow: 'hidden', boxShadow: isMobile ? 'none' : '0 20px 40px rgba(0,0,0,0.05)' }}>

                {/* СПИСОК ЧАТОВ (Скрывается на мобильных, если открыт чат) */}
                {(!isMobile || showChatList) && (
                    <div style={{ width: isMobile ? '100%' : '400px', borderRight: isMobile ? 'none' : '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', backgroundColor: '#F9FAFB' }}>
                        <div style={{ padding: isMobile ? '20px' : '32px 24px 24px' }}>
                            <h2 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: 900, margin: '0 0 20px 0', color: '#000' }}>Диалоги</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '12px 16px', border: '1px solid #E5E7EB' }}>
                                <Search size={20} color="#9CA3AF" />
                                <input type="text" placeholder="Поиск по сообщениям..." style={{ background: 'none', border: 'none', outline: 'none', width: '100%', fontSize: '15px', fontWeight: 600, color: '#000' }} />
                            </div>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {mockChatsList.map(chat => {
                                const chatMsgs = messagesMap[chat.id];
                                const lastMsg = chatMsgs ? chatMsgs[chatMsgs.length - 1] : null;

                                return (
                                    <div
                                        key={chat.id}
                                        onClick={() => handleChatSelect(chat)}
                                        style={{
                                            padding: isMobile ? '16px 20px' : '24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer',
                                            backgroundColor: activeChat.id === chat.id && !isMobile ? '#FFF5F5' : '#F9FAFB',
                                            borderLeft: activeChat.id === chat.id && !isMobile ? '4px solid #A50C20' : '4px solid transparent',
                                            borderBottom: '1px solid #E5E7EB', transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#000', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900, flexShrink: 0 }}>
                                            {chat.avatar}
                                        </div>
                                        <div style={{ flex: 1, overflow: 'hidden' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                <span style={{ fontWeight: 900, fontSize: '16px', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.name}</span>
                                                <span style={{ fontSize: '12px', color: chat.unread ? '#A50C20' : '#666', fontWeight: chat.unread ? 800 : 600, flexShrink: 0 }}>{chat.time}</span>
                                            </div>
                                            <div style={{ fontSize: '14px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>
                                                {lastMsg ? (lastMsg.type === 'file' ? 'Файл прикреплен' : lastMsg.text) : 'Нет сообщений'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ОКНО ЧАТА (Скрывается на мобильных, если открыт список) */}
                {(!isMobile || !showChatList) && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', width: isMobile ? '100%' : 'auto' }}>

                        {/* Шапка активного чата */}
                        <div style={{ padding: isMobile ? '16px 20px' : '24px 32px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {isMobile && (
                                <button onClick={() => setShowChatList(true)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                                    <ChevronLeft size={24} />
                                </button>
                            )}
                            <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: '#A50C20', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '20px', flexShrink: 0 }}>
                                {activeChat.avatar}
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontWeight: 900, fontSize: isMobile ? '16px' : '20px', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activeChat.name}</div>
                                <div style={{ fontSize: '13px', color: '#666', fontWeight: 600, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activeChat.role}</div>
                            </div>
                        </div>

                        {/* ИСТОРИЯ СООБЩЕНИЙ */}
                        <div style={{ flex: 1, padding: isMobile ? '20px' : '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#FAFAFA' }}>
                            {currentMessages.map(msg => (
                                <div key={msg.id} style={{
                                    alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                                    backgroundColor: msg.sender === 'me' ? '#000000' : '#FFFFFF',
                                    color: msg.sender === 'me' ? '#FFFFFF' : '#000000',
                                    padding: '20px',
                                    borderRadius: '24px',
                                    borderBottomRightRadius: msg.sender === 'me' ? '8px' : '24px',
                                    borderBottomLeftRadius: msg.sender === 'them' ? '8px' : '24px',
                                    maxWidth: isMobile ? '85%' : '70%',
                                    border: msg.sender === 'me' ? 'none' : '1px solid #E5E7EB',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                }}>
                                    {msg.type === 'file' ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: msg.sender === 'me' ? '#333' : '#FFF5F5', padding: '12px', borderRadius: '16px', border: msg.sender === 'me' ? 'none' : '1px dashed #FCA5A5', cursor: 'pointer' }}>
                                            <FileText size={20} color={msg.sender === 'me' ? '#FFF' : '#A50C20'} />
                                            <div style={{ overflow: 'hidden' }}>
                                                <div style={{ fontSize: '14px', fontWeight: 900, color: msg.sender === 'me' ? '#FFF' : '#A50C20', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.text}</div>
                                                <div style={{ fontSize: '11px', color: msg.sender === 'me' ? '#9CA3AF' : '#666', marginTop: '2px', fontWeight: 600 }}>1.2 MB</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5', fontWeight: 500 }}>
                                            {msg.text}
                                        </p>
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginTop: '8px' }}>
                                        <span style={{ fontSize: '11px', color: msg.sender === 'me' ? 'rgba(255,255,255,0.6)' : '#9CA3AF', fontWeight: 600 }}>{msg.time}</span>
                                        {msg.sender === 'me' && <CheckCheck size={14} color="#A50C20" />}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* ПАНЕЛЬ ВВОДА */}
                        <div style={{ padding: isMobile ? '16px 20px' : '24px 32px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E7EB' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#F9FAFB', borderRadius: '20px', padding: '8px 8px 8px 20px', border: '1px solid #E5E7EB' }}>
                                <input
                                    type="text"
                                    placeholder="Сообщение..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '15px', color: '#000', fontWeight: 500 }}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    style={{ width: '44px', height: '44px', backgroundColor: '#A50C20', border: 'none', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF', flexShrink: 0 }}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}