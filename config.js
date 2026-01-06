// تكوين Firebase لكازينو العظمة

const firebaseConfig = {
    apiKey: "AIzaSyCmd-NJRcpJcTlBeLEcMT5kx3EFXGEbZTA",
    authDomain: "planning-with-ai-3c51a.firebaseapp.com",
    databaseURL: "https://planning-with-ai-3c51a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "planning-with-ai-3c51a",
    storageBucket: "planning-with-ai-3c51a.firebasestorage.app",
    messagingSenderId: "752519469556",
    appId: "1:752519469556:web:606f18aeb972bdbdb581a1"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// تكوينات الكازينو المحسنة
const CASINO_CONFIG = {
    MIN_BET: 100,
    MAX_BET: 50000,
    WIN_PERCENTAGE: 0.8, // 80%
    DRAW_PERCENTAGE: 1.0, // 100% استرداد
    BONUS_PERCENTAGE: 0.2, // 20% مكافأة إضافية
    CHALLENGE_TIMEOUT: 600000, // 10 دقائق بالمللي ثانية
    GAME_TIMEOUT: 300000, // 5 دقائق للمباراة
    MAX_CONCURRENT_GAMES: 1,
    ADMIN_USER_ID: 1, // عبد الأول
    UPDATE_INTERVAL: 10000, // تحديث كل 10 ثواني
    DARTS_CONFIG: {
        TARGET_SCORE: 1600,
        TIME_LIMIT: 15,
        MIN_CIRCLES: 5,
        MAX_CIRCLES: 8,
        CIRCLE_SPAWN_INTERVAL: 300,
        CIRCLE_TYPES: [
            { type: 'gold', points: 150, duration: 500 },
            { type: 'silver', points: 100, duration: 700 },
            { type: 'bronze', points: 50, duration: 900 }
        ]
    }
};

// معلومات الأعضاء الأساسية (مشتركة مع الموقع الرئيسي)
const MEMBERS_DATA = [
    {
        id: 1,
        name: "عبد الأول",
        realName: "عبد النور",
        age: 19,
        country: "الجزائر",
        rank: "admin",
        position: "admin",
        image: "https://files.catbox.moe/pxmleq.png",
        instagram: "https://www.instagram.com/_8av9?igsh=NnplZGhlODJydGgx",
        bio: "روح وقلب العظمة",
        password: "admin123",
        points: 10000,
        items: [],
        activeItems: {},
        online: false,
        lastSeen: Date.now(),
        joinedDate: "2023-01-01",
        messagesCount: 0,
        rating: 5,
        reviews: [],
        banned: false,
        banReason: ""
    },
    {
        id: 2,
        name: "حسن",
        realName: "حسن",
        age: 16,
        country: "لبنان",
        rank: "member",
        position: "owner",
        image: "https://files.catbox.moe/bamzoq.png",
        instagram: "https://www.instagram.com/xflay_1?igsh=MTJxdWphdXM3eGRjcQ==",
        bio: "مؤسس العظمة",
        password: "owner123",
        points: 5000,
        items: [],
        activeItems: {},
        online: false,
        lastSeen: Date.now(),
        joinedDate: "2023-01-01",
        messagesCount: 0,
        rating: 5,
        reviews: [],
        banned: false,
        banReason: ""
    },
    {
        id: 3,
        name: "حمدية",
        realName: "تاج دين",
        age: 18,
        country: "الجزائر",
        rank: "member",
        position: "member",
        image: "https://files.catbox.moe/k8xa2h.png",
        instagram: "https://www.instagram.com/mezaiane.esp?igsh=MXJ6dnJ2OWplMWdu",
        bio: "كذاب العظمة",
        password: "7md1",
        points: 3000,
        items: [],
        activeItems: {},
        online: false,
        lastSeen: Date.now(),
        joinedDate: "2023-02-01",
        messagesCount: 0,
        rating: 4.5,
        reviews: [],
        banned: false,
        banReason: ""
    },
    {
        id: 4,
        name: "تونة",
        realName: "يحيى",
        age: 16,
        country: "الجزائر",
        rank: "member",
        position: "member",
        image: "https://files.catbox.moe/xdero7.png",
        instagram: "https://www.instagram.com/d_a_m_n14?igsh=MXVpYzZ1a3A2ZmhpNg==",
        bio: "ملحد العظمة",
        password: "tona2",
        points: 2500,
        items: [],
        activeItems: {},
        online: false,
        lastSeen: Date.now(),
        joinedDate: "2023-02-15",
        messagesCount: 0,
        rating: 4.8,
        reviews: [],
        banned: false,
        banReason: ""
    },
    {
        id: 5,
        name: "عبد الثاني",
        realName: "عبد خالق",
        age: 18,
        country: "الجزائر",
        rank: "member",
        position: "member",
        image: "https://files.catbox.moe/uv3w29.png",
        instagram: "https://www.instagram.com/x_abdoo_19?igsh=MThucTluZWRhc2Frbg==",
        bio: "أساس العظمة",
        password: "abd22",
        points: 2000,
        items: [],
        activeItems: {},
        online: false,
        lastSeen: Date.now(),
        joinedDate: "2023-03-01",
        messagesCount: 0,
        rating: 4.7,
        reviews: [],
        banned: false,
        banReason: ""
    },
    {
        id: 6,
        name: "نيرو",
        realName: "ريان",
        age: 18,
        country: "المغرب",
        rank: "member",
        position: "member",
        image: "https://files.catbox.moe/lekrm0.png",
        instagram: "https://www.instagram.com/iiineiro?igsh=dTNtc2ZpNzZxZG95",
        bio: "رابر العظمة",
        password: "iii1",
        points: 1800,
        items: [],
        activeItems: {},
        online: false,
        lastSeen: Date.now(),
        joinedDate: "2023-03-10",
        messagesCount: 0,
        rating: 4.6,
        reviews: [],
        banned: false,
        banReason: ""
    },
    {
        id: 7,
        name: "لينصو",
        realName: "الياس",
        age: 16,
        country: "الأردن",
        rank: "member",
        position: "member",
        image: "https://files.catbox.moe/sashvz.png",
        instagram: "https://www.instagram.com/lansso0?igsh=eWprOTdtNjkwN3M1",
        bio: "مسلم العظمة",
        password: "linso4",
        points: 1500,
        items: [],
        activeItems: {},
        online: false,
        lastSeen: Date.now(),
        joinedDate: "2023-03-20",
        messagesCount: 0,
        rating: 4.9,
        reviews: [],
        banned: false,
        banReason: ""
    },
    {
        id: 8,
        name: "نجومي",
        realName: "يوسف",
        age: 17,
        country: "المغرب",
        rank: "member",
        position: "member",
        image: "https://files.catbox.moe/254lfn.png",
        instagram: "https://www.instagram.com/youssef_sdik_5?igsh=azYxYWl1a3lzdGtj",
        bio: "ريلز العظمة",
        password: "member123",
        points: 1200,
        items: [],
        activeItems: {},
        online: false,
        lastSeen: Date.now(),
        joinedDate: "2023-04-01",
        messagesCount: 0,
        rating: 4.4,
        reviews: [],
        banned: false,
        banReason: ""
    },
    {
        id: 9,
        name: "أبو جاسم",
        realName: "محمد",
        age: 19,
        country: "العراق",
        rank: "member",
        position: "member",
        image: "https://files.catbox.moe/eb7q9c.png",
        instagram: "https://www.instagram.com/82bw2?igsh=MXV3c3VhZXl0MWV5eQ==",
        bio: "مصمم العظمة",
        password: "member3",
        points: 1000,
        items: [],
        activeItems: {},
        online: false,
        lastSeen: Date.now(),
        joinedDate: "2023-04-15",
        messagesCount: 0,
        rating: 4.8,
        reviews: [],
        banned: false,
        banReason: ""
    }
];

// أنواع الألعاب وتفاصيلها
const GAME_TYPES = {
    DARTS: {
        id: 'darts',
        name: 'رمي السهام المحسنة',
        description: 'أصبت الهدف بأقصى دقة ممكنة مع دوائر متعددة',
        minPlayers: 1,
        maxPlayers: 1,
        rounds: 1,
        rules: '15 ثانية، 1600 نقطة للفوز، دوائر ذهبية (150)، فضية (100)، برونزية (50)',
        payout: {
            win: 0.8,
            draw: 1.0,
            loss: 0.0
        }
    },
    NUMBER: {
        id: 'number',
        name: 'مراهنة رقم',
        description: 'اختر رقم وحاول تخمين الرقم العشوائي الصحيح',
        minPlayers: 1,
        maxPlayers: 1,
        rounds: 1,
        rules: 'اختر رقم من 1-10، إذا كان صحيح تربح 8 أضعاف',
        payout: {
            win: 8.0,
            draw: 0.0,
            loss: 0.0
        }
    },
    DICE: {
        id: 'dice',
        name: 'لعبة النرد المحسنة',
        description: 'تحدي ضد الذكاء الاصطناعي - أعلى مجموع يفوز',
        minPlayers: 1,
        maxPlayers: 1,
        rounds: 3,
        rules: '3 جولات، الفائز بأغلب الجولات يربح 80%، 3-0 ربح إضافي 20%',
        payout: {
            win: 0.8,
            draw: 1.0,
            loss: 0.0
        }
    },
    CLICK_RACE: {
        id: 'click-race',
        name: 'سباق النقرات المحسن',
        description: 'تدريب فردي أو تحديات مع لاعبين آخرين',
        minPlayers: 1,
        maxPlayers: 2,
        rounds: 1,
        rules: '20 ثانية لكل لاعب، الفائز بأكثر النقرات',
        payout: {
            win: 1.0,
            draw: 1.0,
            loss: 0.0
        }
    }
};

// رسائل النظام المحسنة
const SYSTEM_MESSAGES = {
    WELCOME: "🎰 مرحباً في كازينو العظمة المحسن!",
    LOGIN_SUCCESS: "تم تسجيل الدخول بنجاح",
    LOGIN_ERROR: "كلمة المرور غير صحيحة",
    INSUFFICIENT_POINTS: "نقاطك غير كافية للرهان",
    BET_PLACED: "تم وضع الرهان بنجاح",
    GAME_STARTED: "بدأت الجولة",
    GAME_WON: "🎉 مبروك! لقد فزت",
    GAME_LOST: "💔 للأسف، لقد خسرت",
    GAME_DRAW: "⚖️ تعادل! تم استرداد رهانك",
    CHALLENGE_SENT: "تم إرسال التحدي وبدأ التدريب",
    CHALLENGE_RECEIVED: "تلقيت تحدياً جديداً",
    CHALLENGE_ACCEPTED: "تم قبول التحدي",
    CHALLENGE_DECLINED: "تم رفض التحدي",
    CHALLENGE_EXPIRED: "انتهت مدة التحدي",
    PRACTICE_BEST_SCORE: "🎯 أفضل نتيجة جديدة!",
    ERROR_GENERIC: "حدث خطأ، حاول مرة أخرى"
};

// تصدير الكائنات
window.firebase = firebase;
window.database = database;
window.CASINO_CONFIG = CASINO_CONFIG;
window.MEMBERS_DATA = MEMBERS_DATA;
window.GAME_TYPES = GAME_TYPES;
window.SYSTEM_MESSAGES = SYSTEM_MESSAGES;