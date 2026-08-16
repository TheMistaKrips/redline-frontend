// Глобальный список категорий для онбординга и фильтров
export const CATEGORIES = [
    'IT и Разработка',
    'Дизайн и UX',
    'Маркетинг и PR',
    'Продажи',
    'Строительство и Архитектура',
    'Логистика и Транспорт',
    'Медицина и Фармацевтика',
    'Образование и Наука',
    'Финансы и Бухгалтерия'
];

export const mockVacancies = [
    {
        id: 1,
        date: 'Сегодня',
        company: 'Amazon TM',
        title: 'Senior Backend Developer',
        category: 'IT и Разработка',
        schedule: 'fullDay',
        employment: 'fullTime',
        experienceLevel: 'exp3to6',
        format: 'office',
        salaryStr: '25 000 TMT',
        salaryMin: 25000,
        location: 'Ашхабад',
        region: 'Ахалский велаят',
        experience: 'Опыт 3-6 лет',
        description: 'Разработка архитектуры высоконагруженных систем на FastAPI. Участие в проектировании БД (PostgreSQL). Умение самостоятельно анализировать задачи и находить взаимосвязи. Мы гарантируем безопасность ваших данных и предлагаем отличный социальный пакет.',
        logoText: 'A',
        tags: ['Полный день', 'В офисе', 'Senior'],
        status: 'approved' // Добавлен статус для модерации
    },
    {
        id: 2,
        date: 'Вчера',
        company: 'Google TM',
        title: 'UI/UX Designer',
        category: 'Дизайн и UX',
        schedule: 'flexible',
        employment: 'projectWork',
        experienceLevel: 'exp1to3',
        format: 'remote',
        salaryStr: '15 000 TMT',
        salaryMin: 15000,
        location: 'Туркменабад',
        region: 'Лебапский велаят',
        experience: 'Опыт 1-3 года',
        description: 'Создание интуитивно понятных интерфейсов для внутренних B2B систем. Отрисовка макетов в Figma, создание интерактивных прототипов. Ищем креативного специалиста в нашу дружную команду.',
        logoText: 'G',
        tags: ['Удаленка', 'Проектная работа'],
        status: 'approved'
    },
    {
        id: 3,
        date: '2 дня назад',
        company: 'Ynamly Kerven',
        title: 'Менеджер по продажам (B2B)',
        category: 'Продажи',
        schedule: 'fullDay',
        employment: 'fullTime',
        experienceLevel: 'noExperience',
        format: 'office',
        salaryStr: '8 000 TMT',
        salaryMin: 8000,
        location: 'Мары',
        region: 'Марыйский велаят',
        experience: 'Без опыта',
        description: 'Активные продажи, работа с клиентами, ведение переговоров и заключение договоров. Предоставляем полное обучение за счет компании. Идеальный старт для тех, кто хочет развиваться в сфере продаж.',
        logoText: 'Y',
        tags: ['Полный день', 'В офисе', 'Без опыта'],
        status: 'approved'
    },
    {
        id: 4,
        date: '11 Апр, 2026',
        company: 'Dribbble',
        title: 'Senior Motion Designer',
        category: 'Дизайн и UX',
        schedule: 'fullDay',
        employment: 'fullTime',
        experienceLevel: 'expMore6',
        format: 'hybrid',
        salaryStr: '26 000 TMT',
        salaryMin: 26000,
        location: 'Ашхабад',
        region: 'Ахалский велаят',
        experience: 'Более 6 лет',
        description: 'Создание сложных анимаций, работа с 3D графикой и плотное взаимодействие с арт-директором. Требуется сильное портфолио и готовность к сложным, но интересным задачам.',
        logoText: 'D',
        tags: ['Гибрид', 'Senior'],
        status: 'approved'
    }
];

// База соискателей
export const mockCandidates = [
    {
        id: 101,
        name: 'Мердан Овезов',
        role: 'Frontend Разработчик',
        category: 'IT и Разработка',
        exp: '3 года',
        expMonths: 36, // Для правильной математической сортировки
        salary: '12 000 TMT',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=merdan',
        resumeUrl: 'Резюме_Мердан_Овезов.pdf' // Для скачивания
    },
    {
        id: 102,
        name: 'Айгуль Аннаева',
        role: 'UX/UI Дизайнер',
        category: 'Дизайн и UX',
        exp: '5 лет',
        expMonths: 60,
        salary: '18 000 TMT',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=aygul',
        resumeUrl: 'Резюме_Айгуль_Аннаева.pdf'
    },
    {
        id: 103,
        name: 'Тимур Хасанов',
        role: 'Менеджер по продажам',
        category: 'Продажи',
        exp: 'Нет опыта',
        expMonths: 0,
        salary: '6 000 TMT',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=timur',
        resumeUrl: 'Резюме_Тимур_Хасанов.pdf'
    }
];