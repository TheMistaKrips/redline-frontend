import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MessageCircle, Heart, Share2, Paperclip, Image as ImageIcon, Users, X, Send } from 'lucide-react';
import { CATEGORIES } from '../mocks/data';

const initialPosts = [
    {
        id: 1, group: 'IT и Разработка', author: 'Герман Фетисов', role: 'Frontend Разработчик', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=german',
        text: 'Всем привет! Ищу проектную работу на React. Опыт 6 лет, работал с FastAPI. Прикрепил свое подробное резюме ниже.',
        likes: 14, isLiked: false, time: '2 часа назад',
        commentsList: [
            { id: 101, author: 'Amazon TM', text: 'Герман, добрый день! Отписали вам в личные сообщения.', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=amazon' }
        ]
    },
    {
        id: 2, group: 'IT и Разработка', author: 'Dovlet IT', role: 'Компания', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=dovlet',
        text: 'Мы расширяем команду! Срочно нужен DevOps инженер в офис в Ашхабаде. Пишите в личные сообщения.',
        likes: 32, isLiked: true, time: '5 часов назад',
        commentsList: []
    },
    {
        id: 3, group: 'Дизайн и UX', author: 'Айгуль Дизайнер', role: 'UX/UI Дизайнер', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=aygul',
        text: 'Оцените мой новый концепт приложения для доставки еды в Туркменистане!',
        likes: 45, isLiked: false, time: 'Вчера', imageUrl: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800',
        commentsList: [
            { id: 301, author: 'Тимур Хасанов', text: 'Очень круто выглядит! Особенно цветовая палитра.', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=timur' },
            { id: 302, author: 'Rushline Official', text: 'Отличная работа, Айгуль!', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=rushline' }
        ]
    }
];

export default function Community() {
    const { user } = useContext(AuthContext);
    const [activeGroup, setActiveGroup] = useState('IT и Разработка');
    const [posts, setPosts] = useState(initialPosts);
    const [newPost, setNewPost] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const [expandedComments, setExpandedComments] = useState({});
    const [newComments, setNewComments] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePublish = () => {
        if (!newPost.trim() && !selectedImage) return;

        const post = {
            id: Date.now(),
            group: activeGroup,
            author: user?.name || 'Аноним',
            role: user?.role === 'employer' ? 'Компания' : 'Соискатель',
            avatar: user?.avatar || 'https://api.dicebear.com/9.x/notionists/svg?seed=anon',
            text: newPost,
            likes: 0, isLiked: false, time: 'Только что',
            imageUrl: selectedImage, commentsList: []
        };

        setPosts([post, ...posts]);
        setNewPost('');
        setSelectedImage(null);
    };

    const handleLike = (id) => {
        setPosts(posts.map(p => {
            if (p.id === id) {
                return { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 };
            }
            return p;
        }));
    };

    const toggleComments = (id) => setExpandedComments(prev => ({ ...prev, [id]: !prev[id] }));

    const handleSendComment = (postId) => {
        const commentText = newComments[postId];
        if (!commentText || !commentText.trim() || !user) return;

        const newComment = { id: Date.now(), author: user.name, avatar: user.avatar, text: commentText.trim() };
        setPosts(posts.map(p => p.id === postId ? { ...p, commentsList: [...p.commentsList, newComment] } : p));
        setNewComments(prev => ({ ...prev, [postId]: '' }));
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Ссылка на страницу скопирована в буфер обмена!');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const currentGroupPosts = posts.filter(p => p.group === activeGroup);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 16px 40px' : '0 20px 60px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '24px' : '40px' }}>

            {/* ПАНЕЛЬ ГРУПП (Горизонтальный скролл на мобильных) */}
            <div style={{ width: isMobile ? '100%' : '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {!isMobile && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Users size={28} color="#000" />
                        <h2 style={{ fontSize: '28px', fontWeight: 900, margin: 0, color: '#000' }}>Группы</h2>
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '12px', overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? '10px' : '0', scrollbarWidth: 'none' }}>
                    {CATEGORIES.map(cat => (
                        <div
                            key={cat}
                            onClick={() => setActiveGroup(cat)}
                            style={{
                                padding: '16px 20px', borderRadius: '16px', cursor: 'pointer', fontWeight: 800, fontSize: '14px', flexShrink: 0,
                                backgroundColor: activeGroup === cat ? '#000000' : '#FFFFFF', color: activeGroup === cat ? '#FFFFFF' : '#333333',
                                border: activeGroup === cat ? 'none' : '1px solid #E5E7EB', transition: 'all 0.2s',
                                boxShadow: activeGroup === cat ? '0 8px 16px rgba(0,0,0,0.1)' : 'none', whiteSpace: 'nowrap'
                            }}
                        >
                            # {cat}
                        </div>
                    ))}
                </div>
            </div>

            {/* ЛЕНТА */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: isMobile ? '20px' : '32px', maxWidth: '100%' }}>

                <div style={{ paddingBottom: '16px', borderBottom: '2px solid #000' }}>
                    <h1 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 900, margin: '0 0 8px 0', color: '#000' }}>{activeGroup}</h1>
                    <p style={{ color: '#666', margin: 0, fontSize: '14px', fontWeight: 600 }}>Лента профессионалов отрасли</p>
                </div>

                {/* ФОРМА СОЗДАНИЯ ПОСТА */}
                {user ? (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: isMobile ? '24px' : '32px', border: '1px solid #E5E7EB', boxShadow: '0 12px 24px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', gap: '16px', flexDirection: isMobile ? 'column' : 'row' }}>
                            {!isMobile && <img src={user.avatar} alt="Me" style={{ width: '56px', height: '56px', borderRadius: '16px', objectFit: 'cover', border: '2px solid #F3F4F6' }} />}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <textarea
                                    placeholder={`Написать пост в группу "${activeGroup}"...`}
                                    value={newPost}
                                    onChange={(e) => setNewPost(e.target.value)}
                                    style={{ width: '100%', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '16px', outline: 'none', resize: 'none', minHeight: '80px', fontSize: '15px', color: '#000', fontWeight: 500 }}
                                />
                                {selectedImage && (
                                    <div style={{ position: 'relative', width: 'fit-content' }}>
                                        <img src={selectedImage} alt="Preview" style={{ maxHeight: '150px', borderRadius: '16px', border: '1px solid #E5E7EB' }} />
                                        <button onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: '#A50C20', color: '#FFF', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
                                <button onClick={() => fileInputRef.current.click()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '8px 12px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>
                                    <ImageIcon size={18} color="#A50C20" /> {isMobile ? '' : 'Фото'}
                                </button>
                                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '8px 12px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>
                                    <Paperclip size={18} color="#A50C20" /> {isMobile ? '' : 'Документ'}
                                </button>
                            </div>
                            <button onClick={handlePublish} style={{ backgroundColor: '#A50C20', color: '#FFF', border: 'none', padding: '12px 24px', borderRadius: '16px', fontWeight: 900, fontSize: '15px', cursor: 'pointer' }}>
                                Опубликовать
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ backgroundColor: '#F9FAFB', borderRadius: '24px', padding: '32px', textAlign: 'center', border: '1px dashed #E5E7EB' }}>
                        <p style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#666' }}>Войдите в систему, чтобы оставлять посты.</p>
                    </div>
                )}

                {/* ЛЕНТА ПОСТОВ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '20px' : '24px' }}>
                    {currentGroupPosts.length > 0 ? currentGroupPosts.map(post => (
                        <div key={post.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: isMobile ? '24px' : '40px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                                <img src={post.avatar} alt={post.author} style={{ width: '48px', height: '48px', borderRadius: '16px', objectFit: 'cover', border: '1px solid #E5E7EB' }} />
                                <div>
                                    <div style={{ fontWeight: 900, fontSize: '16px', color: '#000' }}>{post.author}</div>
                                    <div style={{ fontSize: '12px', color: '#666', marginTop: '2px', fontWeight: 600 }}>{post.role} • {post.time}</div>
                                </div>
                            </div>

                            <p style={{ fontSize: '15px', color: '#333', lineHeight: '1.6', margin: '0 0 20px 0', fontWeight: 500, wordBreak: 'break-word' }}>{post.text}</p>

                            {post.imageUrl && (
                                <div style={{ width: '100%', borderRadius: '20px', marginBottom: '20px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                                    <img src={post.imageUrl} alt="Attachment" style={{ width: '100%', maxHeight: isMobile ? '300px' : '500px', objectFit: 'cover', display: 'block' }} />
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: isMobile ? '16px' : '32px', borderTop: '1px solid #E5E7EB', paddingTop: '20px', flexWrap: 'wrap' }}>
                                <button onClick={() => handleLike(post.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: post.isLiked ? '#A50C20' : '#666', fontWeight: 800, cursor: 'pointer', fontSize: '14px', padding: 0 }}>
                                    <Heart size={18} fill={post.isLiked ? '#A50C20' : 'none'} /> {post.likes}
                                </button>
                                <button onClick={() => toggleComments(post.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: expandedComments[post.id] ? '#000' : '#666', fontWeight: 800, cursor: 'pointer', fontSize: '14px', padding: 0 }}>
                                    <MessageCircle size={18} /> {post.commentsList.length} {isMobile ? '' : 'Комментов'}
                                </button>
                                <button onClick={handleShare} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#666', fontWeight: 800, cursor: 'pointer', marginLeft: 'auto', fontSize: '14px', padding: 0 }}>
                                    <Share2 size={18} /> {isMobile ? '' : 'Поделиться'}
                                </button>
                            </div>

                            {expandedComments[post.id] && (
                                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px dashed #E5E7EB', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {post.commentsList.map(comment => (
                                        <div key={comment.id} style={{ display: 'flex', gap: '12px' }}>
                                            <img src={comment.avatar} alt={comment.author} style={{ width: '32px', height: '32px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                                            <div style={{ backgroundColor: '#F9FAFB', padding: '12px 16px', borderRadius: '16px', border: '1px solid #E5E7EB', flex: 1 }}>
                                                <div style={{ fontWeight: 900, fontSize: '13px', color: '#000', marginBottom: '4px' }}>{comment.author}</div>
                                                <div style={{ fontSize: '13px', color: '#333', fontWeight: 500, wordBreak: 'break-word' }}>{comment.text}</div>
                                            </div>
                                        </div>
                                    ))}

                                    {user ? (
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', alignItems: 'center' }}>
                                            {!isMobile && <img src={user.avatar} alt="Me" style={{ width: '32px', height: '32px', borderRadius: '10px', objectFit: 'cover' }} />}
                                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#F9FAFB', borderRadius: '16px', padding: '6px 6px 6px 16px', border: '1px solid #E5E7EB' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Написать комментарий..."
                                                    value={newComments[post.id] || ''}
                                                    onChange={(e) => setNewComments({ ...newComments, [post.id]: e.target.value })}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post.id)}
                                                    style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '13px', color: '#000', fontWeight: 500 }}
                                                />
                                                <button onClick={() => handleSendComment(post.id)} style={{ width: '32px', height: '32px', backgroundColor: '#A50C20', border: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF' }}>
                                                    <Send size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, textAlign: 'center' }}>Войдите, чтобы комментировать.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )) : (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666', fontSize: '15px', fontWeight: 800 }}>В этой группе пока нет постов.</div>
                    )}
                </div>

            </div>
        </div>
    );
}