import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MessageCircle, Heart, Share2, Paperclip } from 'lucide-react';

const initialPosts = [
    { id: 1, author: 'Герман Фетисов', role: 'Frontend Разработчик', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=german', text: 'Всем привет! Ищу проектную работу на React. Опыт 6 лет, работал с FastAPI и Electron. Прикрепил свое подробное резюме ниже.', likes: 14, comments: 3, time: '2 часа назад' },
    { id: 2, author: 'Dovlet IT', role: 'Компания', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=dovlet', text: 'Мы расширяем команду! Срочно нужен DevOps инженер в офис в Ашхабаде. Пишите в личные сообщения.', likes: 32, comments: 8, time: '5 часов назад' }
];

export default function Community() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState(initialPosts);
    const [newPost, setNewPost] = useState('');

    const handlePublish = () => {
        if (!newPost.trim()) return;
        const post = {
            id: Date.now(),
            author: user?.name || 'Аноним',
            role: user?.role === 'employer' ? 'Компания' : 'Соискатель',
            avatar: user?.avatar || 'https://api.dicebear.com/9.x/notionists/svg?seed=anon',
            text: newPost,
            likes: 0, comments: 0, time: 'Только что'
        };
        setPosts([post, ...posts]);
        setNewPost('');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 60px' }}>

            {/* Шапка сообщества */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px 0', color: '#131313' }}>Сообщество</h1>
                <p style={{ color: '#666', margin: 0, fontSize: '16px' }}>Делитесь резюме, ищите проекты и общайтесь с коллегами.</p>
            </div>

            {/* Поле создания поста */}
            {user && (
                <div style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '24px', boxShadow: '0 12px 24px rgba(0,0,0,0.03)', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <img src={user.avatar} alt="Me" style={{ width: '48px', height: '48px', borderRadius: '16px', objectFit: 'cover' }} />
                        <textarea
                            placeholder="Расскажите о своих навыках или прикрепите резюме..."
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', resize: 'none', minHeight: '80px', fontSize: '16px', color: '#131313', paddingTop: '12px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#3B82F6', fontWeight: 600, cursor: 'pointer', padding: '8px' }}>
                            <Paperclip size={18} /> Прикрепить файл
                        </button>
                        <button
                            onClick={handlePublish}
                            style={{ backgroundColor: '#131313', color: '#FFF', border: 'none', padding: '12px 24px', borderRadius: '16px', fontWeight: 700, cursor: 'pointer' }}
                        >
                            Опубликовать
                        </button>
                    </div>
                </div>
            )}

            {/* Лента постов */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {posts.map(post => (
                    <div key={post.id} style={{ backgroundColor: '#FFF', borderRadius: '32px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                            <img src={post.avatar} alt={post.author} style={{ width: '48px', height: '48px', borderRadius: '16px', objectFit: 'cover' }} />
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '16px', color: '#131313' }}>{post.author}</div>
                                <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{post.role} • {post.time}</div>
                            </div>
                        </div>

                        <p style={{ fontSize: '15px', color: '#333', lineHeight: '1.6', margin: '0 0 24px 0' }}>{post.text}</p>

                        <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid #F3F4F6', paddingTop: '20px' }}>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#6B7280', fontWeight: 600, cursor: 'pointer' }}>
                                <Heart size={18} /> {post.likes}
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#6B7280', fontWeight: 600, cursor: 'pointer' }}>
                                <MessageCircle size={18} /> {post.comments}
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#6B7280', fontWeight: 600, cursor: 'pointer', marginLeft: 'auto' }}>
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}