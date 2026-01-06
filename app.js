// [file name]: app.js - الإصدار المصحح
// تطبيق كازينو العظمة المصحح والمكتمل

// بيانات التطبيق
const appData = {
    currentUser: null,
    isGuest: false,
    onlineUsers: [],
    activeRaces: [],
    gameHistory: [],
    leaderboard: [],
    currentGame: null,
    selectedGame: 'darts',
    userStats: {
        totalGames: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        totalPoints: 0,
        winStreak: 0,
        bestStreak: 0
    },
    practiceBestScore: 0,
    dartsConfig: {
        TARGET_SCORE: 1600,
        TIME_LIMIT: 15,
        CIRCLES: {
            GOLD: { points: 150, duration: 500, size: 'gold' },
            SILVER: { points: 100, duration: 700, size: 'silver' },
            BRONZE: { points: 50, duration: 900, size: 'bronze' }
        }
    }
};

// عناصر DOM
const elements = {
    // شاشات النظام
    loader: document.getElementById('loader'),
    loginScreen: document.getElementById('loginScreen'),
    casinoWrapper: document.getElementById('casinoWrapper'),
    
    // شاشة تسجيل الدخول
    membersList: document.getElementById('membersList'),
    passwordInput: document.getElementById('passwordInput'),
    loginBtn: document.getElementById('loginBtn'),
    guestModeBtn: document.getElementById('guestModeBtn'),
    backToMainBtn: document.getElementById('backToMainBtn'),
    loginNotice: document.getElementById('loginNotice'),
    
    // شريط التنقل
    menuToggle: document.getElementById('menuToggle'),
    dailyMessageText: document.getElementById('dailyMessageText'),
    userPoints: document.getElementById('userPoints'),
    userAvatarSmall: document.getElementById('userAvatarSmall'),
    
    // القائمة الجانبية
    sidebar: document.getElementById('sidebar'),
    sidebarUserAvatar: document.getElementById('sidebarUserAvatar'),
    sidebarUserName: document.getElementById('sidebarUserName'),
    sidebarUserBalance: document.getElementById('sidebarUserBalance'),
    logoutBtnSidebar: document.getElementById('logoutBtnSidebar'),
    onlineCountSidebar: document.getElementById('onlineCountSidebar'),
    onlineListSidebar: document.getElementById('onlineListSidebar'),
    totalBets: document.getElementById('totalBets'),
    todayGames: document.getElementById('todayGames'),
    
    // التنقل
    sidebarMenu: document.querySelectorAll('.sidebar-menu a'),
    contentSections: document.querySelectorAll('.content-section'),
    
    // الصفحة الرئيسية
    todayGamesCount: document.getElementById('todayGamesCount'),
    userWinsCount: document.getElementById('userWinsCount'),
    userProfitsCount: document.getElementById('userProfitsCount'),
    winRatePercent: document.getElementById('winRatePercent'),
    recentGamesList: document.getElementById('recentGamesList'),
    
    // الألعاب الفردية
    gameBalance: document.getElementById('gameBalance'),
    gameTabs: document.querySelectorAll('.game-tab'),
    gameContainers: document.querySelectorAll('.game-container'),
    
    // لعبة السهام المحسنة
    dartsBoard: document.getElementById('dartsBoard'),
    dartsTargetArea: document.getElementById('dartsTargetArea'),
    dartsTimer: document.getElementById('dartsTimer'),
    dartsScoreDisplay: document.getElementById('dartsScoreDisplay'),
    dartsHits: document.getElementById('dartsHits'),
    dartsBetAmount: document.getElementById('dartsBetAmount'),
    dartsStartBtn: document.getElementById('dartsStartBtn'),
    dartsResetBtn: document.getElementById('dartsResetBtn'),
    
    // لعبة الرقم
    numberGrid: document.getElementById('numberGrid'),
    numberBetAmount: document.getElementById('numberBetAmount'),
    selectedNumber: document.getElementById('selectedNumber'),
    winningNumber: document.getElementById('winningNumber'),
    numberPotentialWin: document.getElementById('numberPotentialWin'),
    numberResetBtn: document.getElementById('numberResetBtn'),
    numberPlayBtn: document.getElementById('numberPlayBtn'),
    
    // لعبة النرد المحسنة
    diceBetAmount: document.getElementById('diceBetAmount'),
    playerDice: document.getElementById('playerDice'),
    aiDice: document.getElementById('aiDice'),
    playerTotal: document.getElementById('playerTotal'),
    aiTotal: document.getElementById('aiTotal'),
    diceRound: document.getElementById('diceRound'),
    dicePoints: document.getElementById('dicePoints'),
    diceStatus: document.getElementById('diceStatus'),
    diceStartBtn: document.getElementById('diceStartBtn'),
    diceResetBtn: document.getElementById('diceResetBtn'),
    
    // سباق النقرات المحسن
    refreshRacesBtn: document.getElementById('refreshRacesBtn'),
    raceBetAmount: document.getElementById('raceBetAmount'),
    createRaceBtn: document.getElementById('createRaceBtn'),
    soloPracticeBtn: document.getElementById('soloPracticeBtn'),
    activeRacesList: document.getElementById('activeRacesList'),
    raceHistoryList: document.getElementById('raceHistoryList'),
    raceLeaderboardList: document.getElementById('raceLeaderboardList'),
    
    // نافذة سباق النقرات
    raceModal: document.getElementById('raceModal'),
    gamePlayers: document.getElementById('gamePlayers'),
    racePlayer1: document.getElementById('racePlayer1'),
    racePlayer2: document.getElementById('racePlayer2'),
    gameTypeIndicator: document.getElementById('gameTypeIndicator'),
    gameTypeLabel: document.getElementById('gameTypeLabel'),
    raceTimeLeft: document.getElementById('raceTimeLeft'),
    playerClickCount: document.getElementById('playerClickCount'),
    opponentClickCount: document.getElementById('opponentClickCount'),
    opponentClickLabel: document.getElementById('opponentClickLabel'),
    clickRaceBtn: document.getElementById('clickRaceBtn'),
    clickRaceGame: document.getElementById('clickRaceGame'),
    raceInstructions: document.getElementById('raceInstructions'),
    bestScoreDisplay: document.getElementById('bestScoreDisplay'),
    bestScoreValue: document.getElementById('bestScoreValue'),
    
    // نافذة التدريب الفردي
    practiceModal: document.getElementById('practiceModal'),
    practiceBestScore: document.getElementById('practiceBestScore'),
    practiceTimer: document.getElementById('practiceTimer'),
    practiceClickCount: document.getElementById('practiceClickCount'),
    practiceClickBtn: document.getElementById('practiceClickBtn'),
    practiceStartBtn: document.getElementById('practiceStartBtn'),
    
    // المتصدرين
    leaderboardTabs: document.querySelectorAll('.leaderboard-tab'),
    leaderboardList: document.getElementById('leaderboardList'),
    firstPlaceName: document.getElementById('firstPlaceName'),
    firstPlacePoints: document.getElementById('firstPlacePoints'),
    secondPlaceName: document.getElementById('secondPlaceName'),
    secondPlacePoints: document.getElementById('secondPlacePoints'),
    thirdPlaceName: document.getElementById('thirdPlaceName'),
    thirdPlacePoints: document.getElementById('thirdPlacePoints'),
    userRank: document.getElementById('userRank'),
    userTotalPoints: document.getElementById('userTotalPoints'),
    userWinRate: document.getElementById('userWinRate'),
    userBestStreak: document.getElementById('userBestStreak'),
    
    // السجل
    historyFilterType: document.getElementById('historyFilterType'),
    historyFilterGame: document.getElementById('historyFilterGame'),
    totalGamesHistory: document.getElementById('totalGamesHistory'),
    winGamesHistory: document.getElementById('winGamesHistory'),
    lossGamesHistory: document.getElementById('lossGamesHistory'),
    drawGamesHistory: document.getElementById('drawGamesHistory'),
    netProfitHistory: document.getElementById('netProfitHistory'),
    gamesHistoryList: document.getElementById('gamesHistoryList'),
    
    // المساعدة
    helpCategories: document.querySelectorAll('.help-category'),
    helpSections: document.querySelectorAll('.help-section'),
    
    // النوافذ المنبثقة
    resultModal: document.getElementById('resultModal'),
    confirmModal: document.getElementById('confirmModal'),
    closeModalBtns: document.querySelectorAll('.close-modal'),
    
    // نافذة النتيجة
    resultTrophy: document.getElementById('resultTrophy'),
    resultLoss: document.getElementById('resultLoss'),
    resultDraw: document.getElementById('resultDraw'),
    resultTitle: document.getElementById('resultTitle'),
    resultMessage: document.getElementById('resultMessage'),
    resultBetAmount: document.getElementById('resultBetAmount'),
    resultProfit: document.getElementById('resultProfit'),
    resultNewBalance: document.getElementById('resultNewBalance'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    
    // نافذة التأكيد
    confirmTitle: document.getElementById('confirmTitle'),
    confirmMessage: document.getElementById('confirmMessage'),
    cancelConfirmBtn: document.getElementById('cancelConfirmBtn'),
    okConfirmBtn: document.getElementById('okConfirmBtn')
};

// تهيئة التطبيق
function initApp() {
    console.log('🎰 بدء تشغيل كازينو العظمة المصحح والمكتمل...');
    
    // تحميل أفضل نتيجة للتدريب من التخزين المحلي
    loadPracticeBestScore();
    
    // إخفاء شاشة التحميل بعد تأخير قصير
    setTimeout(() => {
        elements.loader.style.opacity = '0';
        setTimeout(() => {
            elements.loader.style.display = 'none';
            showLoginScreen();
        }, 500);
    }, 1500);
    
    // تحميل البيانات من Firebase
    loadFirebaseData();
    
    // إعداد مستمعي الأحداث
    setupEventListeners();
    
    // بدء المؤقتات
    startSystemTimers();
}

// تحميل البيانات من Firebase
function loadFirebaseData() {
    console.log('📥 جاري تحميل البيانات...');
    
    // تحميل بيانات الأعضاء
    database.ref('users').on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            MEMBERS_DATA.forEach(member => {
                if (data[member.id]) {
                    Object.assign(member, data[member.id]);
                }
            });
        }
    });
    
    // تحميل الأعضاء المتصلين
    database.ref('onlineUsers').on('value', (snapshot) => {
        appData.onlineUsers = [];
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const id in data) {
                if (data[id].online) {
                    appData.onlineUsers.push(data[id]);
                }
            }
        }
        updateOnlineUsers();
    });
    
    // تحميل سباقات النقرات النشطة
    database.ref('casino/races').on('value', (snapshot) => {
        appData.activeRaces = [];
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const id in data) {
                if (!data[id].completed && !data[id].expired) {
                    const timeLeft = data[id].createdAt + 600000 - Date.now();
                    if (timeLeft > 0) {
                        appData.activeRaces.push({
                            id: id,
                            ...data[id]
                        });
                    } else {
                        database.ref('casino/races/' + id).update({
                            expired: true,
                            completed: true
                        });
                    }
                }
            }
        }
        updateActiveRaces();
        updateRaceLeaderboard();
    });
    
    // تحميل سجل الألعاب
    loadGameHistory();
    
    // تحميل المتصدرين
    loadLeaderboard();
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    console.log('⚙️ إعداد مستمعي الأحداث...');
    
    // تسجيل الدخول
    elements.loginBtn.addEventListener('click', handleLogin);
    elements.guestModeBtn.addEventListener('click', handleGuestMode);
    elements.passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    elements.backToMainBtn.addEventListener('click', () => {
        window.location.href = 'https://example.com'; // رابط الموقع الرئيسي
    });
    
    // القائمة الجانبية
    elements.menuToggle.addEventListener('click', () => {
        elements.sidebar.classList.toggle('active');
    });
    
    // التنقل بين الأقسام
    elements.sidebarMenu.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.closest('a').dataset.section;
            if (section === 'logout') {
                handleLogout();
                return;
            }
            showSection(section);
            elements.sidebar.classList.remove('active');
        });
    });
    
    // تسجيل الخروج
    elements.logoutBtnSidebar.addEventListener('click', handleLogout);
    
    // أزرار الإجراءات السريعة
    document.querySelectorAll('.action-btn[data-game]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const game = e.target.closest('button').dataset.game;
            showSection('single-games');
            switchGameTab(game);
        });
    });
    
    document.querySelectorAll('.action-btn[data-section]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.target.closest('button').dataset.section;
            showSection(section);
        });
    });
    
    // تبويبات الألعاب
    elements.gameTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const game = e.target.closest('button').dataset.game;
            switchGameTab(game);
        });
    });
    
    // أزرار مبلغ الرهان
    document.querySelectorAll('.bet-amount-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const amount = parseInt(e.target.closest('button').dataset.amount);
            const input = e.target.closest('.bet-control').querySelector('input[type="number"]');
            input.value = amount;
            updatePotentialWin();
        });
    });
    
    // تحديث الرهان المحتمل
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', updatePotentialWin);
    });
    
    // لعبة السهام المحسنة - تصحيح مستمع الأحداث
    elements.dartsTargetArea.addEventListener('click', handleDartClick);
    elements.dartsStartBtn.addEventListener('click', startDartsGame);
    elements.dartsResetBtn.addEventListener('click', resetDartsGame);
    
    // لعبة الرقم
    elements.numberResetBtn.addEventListener('click', resetNumberGame);
    elements.numberPlayBtn.addEventListener('click', playNumberGame);
    
    // لعبة النرد المحسنة
    elements.diceStartBtn.addEventListener('click', startDiceGame);
    elements.diceResetBtn.addEventListener('click', resetDiceGame);
    
    // سباق النقرات المحسن
    elements.refreshRacesBtn.addEventListener('click', loadActiveRaces);
    elements.createRaceBtn.addEventListener('click', createRace);
    elements.soloPracticeBtn.addEventListener('click', openPracticeModal);
    
    // تبويبات المتصدرين
    elements.leaderboardTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const type = e.target.closest('button').dataset.type;
            switchLeaderboardTab(type);
        });
    });
    
    // فلترة السجل
    elements.historyFilterType.addEventListener('change', loadGameHistory);
    elements.historyFilterGame.addEventListener('change', loadGameHistory);
    
    // تبويبات المساعدة
    elements.helpCategories.forEach(category => {
        category.addEventListener('click', (e) => {
            const cat = e.target.closest('button').dataset.category;
            switchHelpCategory(cat);
        });
    });
    
    // النوافذ المنبثقة
    elements.closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // النقر خارج القائمة الجانبية
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.sidebar') && 
            !e.target.closest('.menu-toggle') &&
            !e.target.closest('.user-avatar-small')) {
            elements.sidebar.classList.remove('active');
        }
    });
    
    // النقر خارج النوافذ المنبثقة
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // نافذة النتيجة
    elements.playAgainBtn.addEventListener('click', () => {
        elements.resultModal.classList.remove('active');
        if (appData.currentGame) {
            resetGame(appData.currentGame.type);
        }
    });
    
    // نافذة التأكيد
    elements.cancelConfirmBtn.addEventListener('click', () => {
        elements.confirmModal.classList.remove('active');
    });
    
    // نافذة التدريب الفردي
    elements.practiceStartBtn.addEventListener('click', startPractice);
    elements.practiceClickBtn.addEventListener('click', () => {
        if (appData.currentGame && appData.currentGame.gameActive) {
            handlePracticeClick();
        }
    });
    
    // النقر على الصورة المصغرة للمستخدم
    elements.userAvatarSmall.addEventListener('click', () => {
        elements.sidebar.classList.toggle('active');
    });
}

// بدء المؤقتات
function startSystemTimers() {
    // تحديث البيانات كل 10 ثواني
    setInterval(() => {
        updateOnlineUsers();
        updateActiveRaces();
        updateUserInfo();
    }, 10000);
    
    // تحديث مؤقتات السباقات
    setInterval(updateRaceTimers, 1000);
}

// عرض شاشة تسجيل الدخول
function showLoginScreen() {
    elements.loginScreen.style.display = 'flex';
    setTimeout(() => {
        elements.loginScreen.style.opacity = '1';
    }, 10);
    
    // تعبئة قائمة الأعضاء
    populateMembersList();
}

// تعبئة قائمة الأعضاء
function populateMembersList() {
    elements.membersList.innerHTML = '';
    
    const sortedMembers = [...MEMBERS_DATA].sort((a, b) => {
        if (a.position === 'admin') return -1;
        if (b.position === 'admin') return 1;
        if (a.position === 'owner') return -1;
        if (b.position === 'owner') return 1;
        return a.name.localeCompare(b.name);
    });
    
    sortedMembers.forEach(member => {
        if (member.banned) return;
        
        const memberElement = document.createElement('div');
        memberElement.className = 'login-member';
        memberElement.dataset.id = member.id;
        
        memberElement.innerHTML = `
            <img src="${member.image}" alt="${member.name}" onerror="this.src='https://files.catbox.moe/7pcx7j.jpg'">
            <div class="login-member-info">
                <h4>${member.name}</h4>
                <p>${member.position === 'admin' ? 'المدير' : member.position === 'owner' ? 'المالك' : 'عضو'}</p>
            </div>
        `;
        
        memberElement.addEventListener('click', () => {
            document.querySelectorAll('.login-member').forEach(m => m.classList.remove('active'));
            memberElement.classList.add('active');
            elements.passwordInput.focus();
        });
        
        elements.membersList.appendChild(memberElement);
    });
    
    if (elements.membersList.firstChild) {
        elements.membersList.firstChild.classList.add('active');
        elements.passwordInput.focus();
    }
}

// معالجة تسجيل الدخول
function handleLogin() {
    const activeMember = document.querySelector('.login-member.active');
    if (!activeMember) {
        showLoginNotice('يجب اختيار عضو', 'error');
        return;
    }
    
    const memberId = parseInt(activeMember.dataset.id);
    const password = elements.passwordInput.value.trim();
    
    const member = MEMBERS_DATA.find(m => m.id === memberId);
    
    if (!member) {
        showLoginNotice('العضو غير موجود', 'error');
        return;
    }
    
    if (member.banned) {
        showLoginNotice('هذا الحساب محظور', 'error');
        return;
    }
    
    if (password !== member.password) {
        showLoginNotice('كلمة المرور غير صحيحة', 'error');
        return;
    }
    
    // تسجيل الدخول الناجح
    appData.currentUser = { ...member };
    appData.isGuest = false;
    
    // تحديث حالة الاتصال
    updateUserStatus(true);
    
    // تحديث الواجهة
    updateUserInfo();
    loadUserStats();
    showSection('home');
    hideLoginScreen();
    
    // إظهار رسالة ترحيب
    showNotification(`🎰 مرحباً ${member.name} في كازينو العظمة!`, 'success');
}

// معالجة الدخول كزائر
function handleGuestMode() {
    appData.currentUser = null;
    appData.isGuest = true;
    
    updateUserInfo();
    showSection('home');
    hideLoginScreen();
    
    showNotification('مرحباً كزائر! يمكنك مشاهدة الألعاب فقط', 'info');
}

// تحديث حالة المستخدم
function updateUserStatus(online) {
    if (!appData.currentUser) return;
    
    const userRef = database.ref('users/' + appData.currentUser.id);
    const onlineRef = database.ref('onlineUsers/' + appData.currentUser.id);
    
    const updateData = {
        online: online,
        lastSeen: Date.now()
    };
    
    if (online) {
        updateData.id = appData.currentUser.id;
        updateData.name = appData.currentUser.name;
        updateData.image = appData.currentUser.image;
        updateData.position = appData.currentUser.position;
        
        onlineRef.set(updateData);
    } else {
        onlineRef.update({ online: false, lastSeen: Date.now() });
    }
    
    userRef.update({ online: online, lastSeen: Date.now() });
}

// تحديث معلومات المستخدم
function updateUserInfo() {
    if (appData.currentUser) {
        // شريط التنقل
        elements.userPoints.textContent = appData.currentUser.points || 0;
        elements.userAvatarSmall.querySelector('img').src = appData.currentUser.image;
        
        // القائمة الجانبية
        elements.sidebarUserAvatar.src = appData.currentUser.image;
        elements.sidebarUserName.textContent = appData.currentUser.name;
        elements.sidebarUserBalance.textContent = appData.currentUser.points || 0;
        
        // المتجر
        elements.gameBalance.textContent = appData.currentUser.points || 0;
        
        // الصفحة الرئيسية
        updateHomeStats();
    } else if (appData.isGuest) {
        // شريط التنقل
        elements.userPoints.textContent = '0';
        elements.userAvatarSmall.querySelector('img').src = 'https://files.catbox.moe/7pcx7j.jpg';
        
        // القائمة الجانبية
        elements.sidebarUserAvatar.src = 'https://files.catbox.moe/7pcx7j.jpg';
        elements.sidebarUserName.textContent = 'زائر';
        elements.sidebarUserBalance.textContent = '0';
        
        // المتجر
        elements.gameBalance.textContent = '0';
    }
}

// تحديث الأعضاء المتصلين
function updateOnlineUsers() {
    if (!elements.onlineListSidebar || !elements.onlineCountSidebar) return;
    
    elements.onlineListSidebar.innerHTML = '';
    elements.onlineCountSidebar.textContent = appData.onlineUsers.length;
    
    appData.onlineUsers.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'online-user';
        
        userElement.innerHTML = `
            <img src="${user.image}" alt="${user.name}" onerror="this.src='https://files.catbox.moe/7pcx7j.jpg'">
            <span>${user.name}</span>
        `;
        
        elements.onlineListSidebar.appendChild(userElement);
    });
}

// تحديث إحصائيات الصفحة الرئيسية
function updateHomeStats() {
    if (!appData.currentUser) return;
    
    // حساب إحصائيات اليوم
    const today = new Date().toDateString();
    const todayGames = appData.gameHistory.filter(game => {
        const gameDate = new Date(game.timestamp).toDateString();
        return gameDate === today;
    });
    
    elements.todayGamesCount.textContent = todayGames.length;
    elements.todayGames.textContent = todayGames.length;
    
    // حساب الإحصائيات الشخصية
    const userGames = appData.gameHistory.filter(game => 
        game.playerId === appData.currentUser.id
    );
    
    const wins = userGames.filter(game => game.result === 'win').length;
    const losses = userGames.filter(game => game.result === 'loss').length;
    const draws = userGames.filter(game => game.result === 'draw').length;
    
    elements.userWinsCount.textContent = wins;
    
    // حساب الأرباح
    const totalProfit = userGames.reduce((sum, game) => {
        return sum + (game.profit || 0);
    }, 0);
    
    elements.userProfitsCount.textContent = totalProfit.toLocaleString();
    
    // حساب نسبة الفوز
    const totalPlayed = wins + losses + draws;
    const winRate = totalPlayed > 0 ? Math.round((wins / totalPlayed) * 100) : 0;
    elements.winRatePercent.textContent = `${winRate}%`;
    
    // تحديث قائمة آخر الجولات
    updateRecentGames();
    
    // تحديث إجمالي الرهانات
    const totalBets = userGames.reduce((sum, game) => {
        return sum + (game.betAmount || 0);
    }, 0);
    elements.totalBets.textContent = totalBets.toLocaleString();
}

// تحديث آخر الجولات
function updateRecentGames() {
    if (!elements.recentGamesList) return;
    
    const recentGames = appData.gameHistory
        .filter(game => game.playerId === appData.currentUser?.id)
        .slice(0, 5);
    
    if (recentGames.length === 0) {
        elements.recentGamesList.innerHTML = '<div class="empty-message">لا توجد جولات سابقة</div>';
        return;
    }
    
    elements.recentGamesList.innerHTML = '';
    
    recentGames.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'game-history-item';
        
        const time = new Date(game.timestamp).toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const resultClass = game.result === 'win' ? 'win' : 
                          game.result === 'loss' ? 'loss' : 'draw';
        
        const resultText = game.result === 'win' ? 'فوز' :
                          game.result === 'loss' ? 'خسارة' : 'تعادل';
        
        const profitText = game.profit > 0 ? `+${game.profit}` : game.profit;
        const profitClass = game.profit > 0 ? 'positive' : 'negative';
        
        gameElement.innerHTML = `
            <div class="game-info">
                <span class="game-name">${game.gameName}</span>
                <span class="game-time">${time}</span>
            </div>
            <div class="game-result">
                <span class="result ${resultClass}">${resultText}</span>
                <span class="profit ${profitClass}">${profitText} نقطة</span>
            </div>
        `;
        
        elements.recentGamesList.appendChild(gameElement);
    });
}

// عرض قسم معين
function showSection(sectionId) {
    // إخفاء جميع الأقسام
    elements.contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // إزالة النشاط من جميع روابط القائمة
    elements.sidebarMenu.forEach(link => {
        link.classList.remove('active');
    });
    
    // إضافة النشاط للقسم المطلوب
    const targetSection = document.getElementById(sectionId + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
        
        // إضافة النشاط للرابط في القائمة
        const targetLink = document.querySelector(`.sidebar-menu a[data-section="${sectionId}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
        
        // تحميل محتوى القسم
        switch(sectionId) {
            case 'home':
                updateHomeStats();
                break;
            case 'single-games':
                updateGameBalance();
                break;
            case 'click-race':
                loadActiveRaces();
                break;
            case 'leaderboard':
                loadLeaderboard();
                break;
            case 'history':
                loadGameHistory();
                break;
        }
    }
}

// إخفاء شاشة تسجيل الدخول
function hideLoginScreen() {
    elements.loginScreen.style.opacity = '0';
    setTimeout(() => {
        elements.loginScreen.style.display = 'none';
        showCasinoApp();
    }, 500);
}

// عرض تطبيق الكازينو
function showCasinoApp() {
    elements.casinoWrapper.style.display = 'block';
    setTimeout(() => {
        elements.casinoWrapper.style.opacity = '1';
    }, 10);
}

// تبديل تبويبات الألعاب
function switchGameTab(gameId) {
    // إزالة النشاط من جميع التبويبات
    elements.gameTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // إخفاء جميع حاويات الألعاب
    elements.gameContainers.forEach(container => {
        container.classList.remove('active');
    });
    
    // إضافة النشاط للتبويب المحدد
    const activeTab = document.querySelector(`.game-tab[data-game="${gameId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // عرض حاوية اللعبة المحددة
    const gameContainer = document.getElementById(gameId + 'Game');
    if (gameContainer) {
        gameContainer.classList.add('active');
    }
    
    appData.selectedGame = gameId;
    
    // تهيئة اللعبة المحددة
    switch(gameId) {
        case 'darts':
            initDartsGame();
            break;
        case 'number':
            initNumberGame();
            break;
        case 'dice':
            initDiceGame();
            break;
    }
}

// تحديث الرهان المحتمل
function updatePotentialWin() {
    const gameType = appData.selectedGame;
    let betAmount = 0;
    
    // الحصول على مبلغ الرهان
    switch(gameType) {
        case 'darts':
            betAmount = parseInt(elements.dartsBetAmount.value) || 0;
            break;
        case 'number':
            betAmount = parseInt(elements.numberBetAmount.value) || 0;
            elements.numberPotentialWin.textContent = Math.floor(betAmount * 8);
            break;
        case 'dice':
            betAmount = parseInt(elements.diceBetAmount.value) || 0;
            break;
    }
}

// تحديث رصيد اللعبة
function updateGameBalance() {
    if (elements.gameBalance && appData.currentUser) {
        elements.gameBalance.textContent = appData.currentUser.points || 0;
    }
}

// لعبة رمي السهام المحسنة - تم تصحيح المشكلة
function initDartsGame() {
    resetDartsGame();
    // تمت إزالة setupDartsBoard() لأن المستمع تم وضعه في setupEventListeners
}

function resetDartsGame() {
    // إعادة تعيين البيانات
    appData.currentGame = {
        type: 'darts',
        score: 0,
        hits: 0,
        misses: 0,
        gameActive: false,
        timer: null,
        circles: [],
        circleInterval: null,
        betAmount: parseInt(elements.dartsBetAmount.value) || 1000
    };
    
    // تحديث الواجهة
    elements.dartsTimer.textContent = appData.dartsConfig.TIME_LIMIT;
    elements.dartsScoreDisplay.textContent = '0';
    elements.dartsHits.textContent = '0';
    
    // تمكين/تعطيل الأزرار
    elements.dartsStartBtn.disabled = false;
    elements.dartsResetBtn.disabled = true;
    
    // مسح الدوائر
    clearCircles();
}

function startDartsGame() {
    if (!appData.currentUser) {
        showNotification('يجب تسجيل الدخول للعب', 'error');
        return;
    }
    
    if (appData.currentUser.points < appData.currentGame.betAmount) {
        showNotification(SYSTEM_MESSAGES.INSUFFICIENT_POINTS, 'error');
        return;
    }
    
    // خصم النقاط
    appData.currentUser.points -= appData.currentGame.betAmount;
    updateUserInfo();
    
    // بدء اللعبة
    appData.currentGame.gameActive = true;
    appData.currentGame.score = 0;
    appData.currentGame.hits = 0;
    appData.currentGame.misses = 0;
    
    // تحديث الواجهة
    elements.dartsScoreDisplay.textContent = '0';
    elements.dartsHits.textContent = '0';
    elements.dartsStartBtn.disabled = true;
    elements.dartsResetBtn.disabled = true;
    
    // بدء المؤقت
    let timeLeft = appData.dartsConfig.TIME_LIMIT;
    elements.dartsTimer.textContent = timeLeft;
    
    const timer = setInterval(() => {
        timeLeft--;
        elements.dartsTimer.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endDartsGame();
        }
    }, 1000);
    
    appData.currentGame.timer = timer;
    
    // بدء إنشاء الدوائر بكثافة عالية
    startCircleGeneration();
}

function startCircleGeneration() {
    if (!appData.currentGame.gameActive) return;
    
    // إنشاء 5-8 دوائر في البداية
    for (let i = 0; i < 5 + Math.floor(Math.random() * 4); i++) {
        setTimeout(() => {
            if (appData.currentGame.gameActive) {
                createCircle();
            }
        }, i * 200);
    }
    
    // الاستمرار في إنشاء دوائر كل 0.3-0.8 ثانية
    const interval = setInterval(() => {
        if (appData.currentGame.gameActive && appData.currentGame.circles.length < 8) {
            createCircle();
        }
    }, 300 + Math.random() * 500);
    
    appData.currentGame.circleInterval = interval;
}

function createCircle() {
    if (!appData.currentGame.gameActive) return;
    
    const targetArea = elements.dartsTargetArea;
    const rect = targetArea.getBoundingClientRect();
    
    // اختيار نوع الدائرة عشوائياً
    const circleTypes = Object.values(appData.dartsConfig.CIRCLES);
    const circleType = circleTypes[Math.floor(Math.random() * circleTypes.length)];
    
    // موقع عشوائي
    const x = Math.random() * (rect.width - 100) + 50;
    const y = Math.random() * (rect.height - 100) + 50;
    
    // إنشاء الدائرة
    const circle = document.createElement('div');
    circle.className = `dart-circle ${circleType.size}`;
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
    circle.textContent = circleType.points;
    circle.dataset.points = circleType.points;
    circle.dataset.size = circleType.size;
    
    targetArea.appendChild(circle);
    
    // إضافة للقائمة
    const circleData = {
        element: circle,
        points: circleType.points,
        size: circleType.size,
        createdAt: Date.now(),
        duration: circleType.duration
    };
    
    appData.currentGame.circles.push(circleData);
    
    // إخفاء الدائرة بعد المدة
    setTimeout(() => {
        if (circle.parentNode && !circle.classList.contains('hit')) {
            circle.classList.add('missed');
            setTimeout(() => {
                if (circle.parentNode) {
                    circle.remove();
                    removeCircleFromList(circle);
                }
            }, 500);
        }
    }, circleType.duration);
}

function removeCircleFromList(circleElement) {
    appData.currentGame.circles = appData.currentGame.circles.filter(
        circle => circle.element !== circleElement
    );
}

// دالة معالجة النقر - تم تصحيحها بالكامل
function handleDartClick(e) {
    if (!appData.currentGame || !appData.currentGame.gameActive) return;
    
    const target = e.target;
    
    // تصحيح: تحقق إذا كان النقر على الدائرة أو أحد أطفالها
    let circleElement = target;
    
    // إذا لم يكن العنصر المنقور عليه هو الدائرة نفسها، ابحث عن الدائرة الأم
    if (!circleElement.classList.contains('dart-circle')) {
        circleElement = target.closest('.dart-circle');
    }
    
    // إذا تم العثور على دائرة
    if (circleElement && circleElement.classList.contains('dart-circle')) {
        // إصابة الهدف
        const points = parseInt(circleElement.dataset.points);
        appData.currentGame.score += points;
        appData.currentGame.hits++;
        
        // تحديث الواجهة
        elements.dartsScoreDisplay.textContent = appData.currentGame.score;
        elements.dartsHits.textContent = appData.currentGame.hits;
        
        // تأثير الإصابة
        circleElement.classList.add('hit');
        
        // إزالة من القائمة
        removeCircleFromList(circleElement);
        
        // إنشاء تأثير النقاط
        createHitEffect(e.clientX, e.clientY, `+${points}`);
        
        // إزالة العنصر بعد التأثير
        setTimeout(() => {
            if (circleElement.parentNode) {
                circleElement.remove();
            }
        }, 500);
        
    } else if (target.id === 'dartsTargetArea' || target === elements.dartsTargetArea) {
        // النقر على الفراغ - فقط إذا كان النقر مباشرة على منطقة الهدف
        appData.currentGame.score -= 10;
        appData.currentGame.misses++;
        
        // تحديث الواجهة
        elements.dartsScoreDisplay.textContent = appData.currentGame.score;
        
        // تأثير النقر على الفراغ
        createMissEffect(e.clientX, e.clientY);
    }
}

function createHitEffect(x, y, text) {
    const effect = document.createElement('div');
    effect.className = 'hit-effect';
    effect.textContent = text;
    effect.style.position = 'fixed';
    effect.style.left = (x - 20) + 'px';
    effect.style.top = (y - 20) + 'px';
    effect.style.color = '#00ff00';
    effect.style.fontWeight = 'bold';
    effect.style.fontSize = '1.5rem';
    effect.style.zIndex = '10000';
    effect.style.pointerEvents = 'none';
    
    document.body.appendChild(effect);
    
    // حركة التأثير
    let opacity = 1;
    let posY = y - 20;
    
    const animation = setInterval(() => {
        opacity -= 0.05;
        posY -= 2;
        
        effect.style.opacity = opacity;
        effect.style.top = posY + 'px';
        
        if (opacity <= 0) {
            clearInterval(animation);
            effect.remove();
        }
    }, 30);
}

function createMissEffect(x, y) {
    const effect = document.createElement('div');
    effect.className = 'miss-effect';
    effect.textContent = '-10';
    effect.style.position = 'fixed';
    effect.style.left = (x - 20) + 'px';
    effect.style.top = (y - 20) + 'px';
    effect.style.color = '#ff0000';
    effect.style.fontWeight = 'bold';
    effect.style.fontSize = '1.2rem';
    effect.style.zIndex = '10000';
    effect.style.pointerEvents = 'none';
    
    document.body.appendChild(effect);
    
    // حركة التأثير
    let opacity = 1;
    let posY = y - 20;
    
    const animation = setInterval(() => {
        opacity -= 0.05;
        posY -= 2;
        
        effect.style.opacity = opacity;
        effect.style.top = posY + 'px';
        
        if (opacity <= 0) {
            clearInterval(animation);
            effect.remove();
        }
    }, 30);
}

function clearCircles() {
    elements.dartsTargetArea.innerHTML = '';
    if (appData.currentGame.circleInterval) {
        clearInterval(appData.currentGame.circleInterval);
    }
    appData.currentGame.circles = [];
}

function endDartsGame() {
    if (!appData.currentGame) return;
    
    appData.currentGame.gameActive = false;
    
    // إيقاف المؤقتات
    if (appData.currentGame.timer) {
        clearInterval(appData.currentGame.timer);
    }
    
    if (appData.currentGame.circleInterval) {
        clearInterval(appData.currentGame.circleInterval);
    }
    
    // إيقاف إنشاء الدوائر
    clearCircles();
    
    // حساب النتيجة
    const score = appData.currentGame.score;
    const betAmount = appData.currentGame.betAmount;
    
    let result, profit;
    
    if (score >= appData.dartsConfig.TARGET_SCORE) {
        result = 'win';
        profit = Math.floor(betAmount * 0.8); // 80% ربح
        appData.currentUser.points += profit;
    } else {
        result = 'loss';
        profit = -betAmount;
    }
    
    // حفظ النتيجة
    const gameRecord = {
        id: Date.now(),
        type: 'darts',
        gameName: 'رمي السهام المحسنة',
        playerId: appData.currentUser.id,
        playerName: appData.currentUser.name,
        betAmount: betAmount,
        result: result,
        profit: profit,
        score: score,
        targetScore: appData.dartsConfig.TARGET_SCORE,
        hits: appData.currentGame.hits,
        misses: appData.currentGame.misses,
        timestamp: Date.now()
    };
    
    // حفظ في Firebase
    saveGameResult(gameRecord);
    
    // تحديث النقاط في Firebase
    database.ref('users/' + appData.currentUser.id).update({
        points: appData.currentUser.points
    });
    
    // إظهار النتيجة
    showGameResult(gameRecord);
    
    // تحديث الواجهة
    updateUserInfo();
    updateGameBalance();
    
    // تمكين الأزرار
    elements.dartsStartBtn.disabled = false;
    elements.dartsResetBtn.disabled = false;
}

// لعبة مراهنة الرقم
function initNumberGame() {
    elements.numberGrid.innerHTML = '';
    
    for (let i = 1; i <= 10; i++) {
        const cell = document.createElement('div');
        cell.className = 'number-cell';
        cell.textContent = i;
        cell.dataset.number = i;
        
        cell.addEventListener('click', () => {
            selectNumber(i);
        });
        
        elements.numberGrid.appendChild(cell);
    }
    
    resetNumberGame();
}

function resetNumberGame() {
    appData.currentGame = {
        type: 'number',
        selectedNumber: null,
        winningNumber: null,
        betAmount: parseInt(elements.numberBetAmount.value) || 1000,
        gameState: 'selecting'
    };
    
    elements.selectedNumber.textContent = '-';
    elements.winningNumber.textContent = '-';
    elements.numberPlayBtn.disabled = true;
    
    document.querySelectorAll('.number-cell').forEach(cell => {
        cell.classList.remove('selected', 'winning');
    });
}

function selectNumber(number) {
    if (!appData.currentGame || appData.currentGame.gameState !== 'selecting') return;
    
    appData.currentGame.selectedNumber = number;
    
    elements.selectedNumber.textContent = number;
    elements.numberPlayBtn.disabled = false;
    
    document.querySelectorAll('.number-cell').forEach(cell => {
        cell.classList.remove('selected');
        if (parseInt(cell.dataset.number) === number) {
            cell.classList.add('selected');
        }
    });
}

function playNumberGame() {
    if (!appData.currentGame || !appData.currentGame.selectedNumber) return;
    
    if (!appData.currentUser) {
        showNotification('يجب تسجيل الدخول للعب', 'error');
        return;
    }
    
    const betAmount = appData.currentGame.betAmount;
    
    if (appData.currentUser.points < betAmount) {
        showNotification(SYSTEM_MESSAGES.INSUFFICIENT_POINTS, 'error');
        return;
    }
    
    const winningNumber = Math.floor(Math.random() * 10) + 1;
    appData.currentGame.winningNumber = winningNumber;
    appData.currentGame.gameState = 'finished';
    
    appData.currentUser.points -= betAmount;
    
    let result, profit;
    
    if (appData.currentGame.selectedNumber === winningNumber) {
        result = 'win';
        profit = betAmount * 8;
        appData.currentUser.points += profit;
    } else {
        result = 'loss';
        profit = -betAmount;
    }
    
    elements.winningNumber.textContent = winningNumber;
    
    document.querySelectorAll('.number-cell').forEach(cell => {
        cell.classList.remove('winning');
        if (parseInt(cell.dataset.number) === winningNumber) {
            cell.classList.add('winning');
        }
    });
    
    const gameRecord = {
        id: Date.now(),
        type: 'number',
        gameName: 'مراهنة رقم',
        playerId: appData.currentUser.id,
        playerName: appData.currentUser.name,
        betAmount: betAmount,
        result: result,
        profit: profit,
        selectedNumber: appData.currentGame.selectedNumber,
        winningNumber: winningNumber,
        timestamp: Date.now()
    };
    
    saveGameResult(gameRecord);
    
    database.ref('users/' + appData.currentUser.id).update({
        points: appData.currentUser.points
    });
    
    showGameResult(gameRecord);
    
    updateUserInfo();
    updateGameBalance();
}

// لعبة النرد المحسنة
function initDiceGame() {
    resetDiceGame();
}

function resetDiceGame() {
    appData.currentGame = {
        type: 'dice',
        playerScore: 0,
        aiScore: 0,
        round: 0,
        playerDice: [1, 1],
        aiDice: [1, 1],
        betAmount: parseInt(elements.diceBetAmount.value) || 1000,
        gameState: 'waiting'
    };
    
    elements.playerTotal.textContent = '0';
    elements.aiTotal.textContent = '0';
    elements.diceRound.textContent = '0/3';
    elements.dicePoints.textContent = '0 - 0';
    elements.diceStatus.textContent = 'في الانتظار';
    
    updateDiceDisplay();
    
    elements.diceStartBtn.disabled = false;
    elements.diceResetBtn.disabled = true;
}

function startDiceGame() {
    if (!appData.currentUser) {
        showNotification('يجب تسجيل الدخول للعب', 'error');
        return;
    }
    
    if (appData.currentUser.points < appData.currentGame.betAmount) {
        showNotification(SYSTEM_MESSAGES.INSUFFICIENT_POINTS, 'error');
        return;
    }
    
    appData.currentUser.points -= appData.currentGame.betAmount;
    updateUserInfo();
    
    appData.currentGame.gameState = 'playing';
    appData.currentGame.round = 1;
    appData.currentGame.playerScore = 0;
    appData.currentGame.aiScore = 0;
    
    elements.diceRound.textContent = '1/3';
    elements.dicePoints.textContent = '0 - 0';
    elements.diceStatus.textContent = 'رمي النرد';
    
    elements.diceStartBtn.disabled = true;
    elements.diceResetBtn.disabled = true;
    
    // بدء الجولة الأولى
    setTimeout(() => {
        rollDiceRound();
    }, 1000);
}

function rollDiceRound() {
    if (appData.currentGame.round > 3) {
        finishDiceGame();
        return;
    }
    
    // رمي نرد اللاعب
    const playerDice1 = Math.floor(Math.random() * 6) + 1;
    const playerDice2 = Math.floor(Math.random() * 6) + 1;
    const playerTotal = playerDice1 + playerDice2;
    
    appData.currentGame.playerDice = [playerDice1, playerDice2];
    
    // رمي نرد الذكاء الاصطناعي
    const aiDice1 = Math.floor(Math.random() * 6) + 1;
    const aiDice2 = Math.floor(Math.random() * 6) + 1;
    const aiTotal = aiDice1 + aiDice2;
    
    appData.currentGame.aiDice = [aiDice1, aiDice2];
    
    // تحديث العرض
    updateDiceDisplay();
    
    // تأثيرات النرد
    const diceElements = document.querySelectorAll('.dice');
    diceElements.forEach(dice => {
        dice.classList.add('rolling');
    });
    
    // تحديد الفائز في الجولة
    setTimeout(() => {
        diceElements.forEach(dice => {
            dice.classList.remove('rolling');
        });
        
        elements.playerTotal.textContent = playerTotal;
        elements.aiTotal.textContent = aiTotal;
        
        let roundWinner = '';
        if (playerTotal > aiTotal) {
            appData.currentGame.playerScore++;
            roundWinner = 'player';
            elements.diceStatus.textContent = 'فزت في هذه الجولة!';
        } else if (aiTotal > playerTotal) {
            appData.currentGame.aiScore++;
            roundWinner = 'ai';
            elements.diceStatus.textContent = 'الذكاء الاصطناعي فاز في هذه الجولة';
        } else {
            roundWinner = 'draw';
            elements.diceStatus.textContent = 'تعادل في هذه الجولة';
        }
        
        elements.dicePoints.textContent = `${appData.currentGame.playerScore} - ${appData.currentGame.aiScore}`;
        
        // الانتقال للجولة التالية
        appData.currentGame.round++;
        
        if (appData.currentGame.round <= 3) {
            elements.diceRound.textContent = `${appData.currentGame.round}/3`;
            elements.diceStatus.textContent = 'جاهز للجولة التالية';
            
            setTimeout(() => {
                rollDiceRound();
            }, 1500);
        } else {
            finishDiceGame();
        }
    }, 1000);
}

function updateDiceDisplay() {
    if (!appData.currentGame) return;
    
    const playerDiceElements = elements.playerDice.querySelectorAll('.dice');
    playerDiceElements[0].textContent = getDiceSymbol(appData.currentGame.playerDice[0]);
    playerDiceElements[1].textContent = getDiceSymbol(appData.currentGame.playerDice[1]);
    
    const aiDiceElements = elements.aiDice.querySelectorAll('.dice');
    aiDiceElements[0].textContent = getDiceSymbol(appData.currentGame.aiDice[0]);
    aiDiceElements[1].textContent = getDiceSymbol(appData.currentGame.aiDice[1]);
}

function getDiceSymbol(number) {
    const diceSymbols = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return diceSymbols[number - 1] || '⚀';
}

function finishDiceGame() {
    const betAmount = appData.currentGame.betAmount;
    const playerScore = appData.currentGame.playerScore;
    const aiScore = appData.currentGame.aiScore;
    
    let result, profit;
    
    if (playerScore > aiScore) {
        result = 'win';
        profit = Math.floor(betAmount * 0.8);
        
        if (playerScore === 3 && aiScore === 0) {
            profit += Math.floor(betAmount * 0.2);
        }
        
        appData.currentUser.points += profit;
    } else if (aiScore > playerScore) {
        result = 'loss';
        profit = -betAmount;
    } else {
        result = 'draw';
        profit = 0;
        appData.currentUser.points += betAmount;
    }
    
    const gameRecord = {
        id: Date.now(),
        type: 'dice',
        gameName: 'لعبة النرد',
        playerId: appData.currentUser.id,
        playerName: appData.currentUser.name,
        betAmount: betAmount,
        result: result,
        profit: profit,
        playerScore: playerScore,
        aiScore: aiScore,
        timestamp: Date.now()
    };
    
    saveGameResult(gameRecord);
    
    database.ref('users/' + appData.currentUser.id).update({
        points: appData.currentUser.points
    });
    
    showGameResult(gameRecord);
    
    updateUserInfo();
    updateGameBalance();
    
    elements.diceStartBtn.disabled = false;
    elements.diceResetBtn.disabled = false;
}

// سباق النقرات المحسن
function loadActiveRaces() {
    database.ref('casino/races').orderByChild('createdAt').limitToLast(20).once('value')
        .then(snapshot => {
            const races = [];
            if (snapshot.exists()) {
                const data = snapshot.val();
                for (const id in data) {
                    if (!data[id].completed && !data[id].expired) {
                        const timeLeft = data[id].createdAt + 600000 - Date.now();
                        if (timeLeft > 0) {
                            races.push({
                                id: id,
                                ...data[id]
                            });
                        }
                    }
                }
            }
            
            appData.activeRaces = races;
            updateActiveRacesDisplay();
        })
        .catch(error => {
            console.error('❌ خطأ في تحميل السباقات:', error);
            showNotification(SYSTEM_MESSAGES.ERROR_GENERIC, 'error');
        });
}

function updateActiveRacesDisplay() {
    if (!elements.activeRacesList) return;
    
    elements.activeRacesList.innerHTML = '';
    
    if (appData.activeRaces.length === 0) {
        elements.activeRacesList.innerHTML = '<div class="empty-message">لا توجد تحديات نشطة</div>';
        return;
    }
    
    appData.activeRaces.forEach(race => {
        const timeLeft = Math.max(0, Math.floor((race.createdAt + 600000 - Date.now()) / 1000));
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        const raceElement = document.createElement('div');
        raceElement.className = 'race-item';
        raceElement.dataset.raceId = race.id;
        
        raceElement.innerHTML = `
            <div class="race-header">
                <img src="${race.creatorImage}" alt="${race.creatorName}" onerror="this.src='https://files.catbox.moe/7pcx7j.jpg'">
                <div class="race-info">
                    <h4>${race.creatorName}</h4>
                    <p>سباق النقرات - ${race.betAmount.toLocaleString()} نقطة</p>
                    <small>النتيجة: ${race.creatorClicks || 0} نقرة</small>
                </div>
            </div>
            <div class="race-details">
                <span class="race-amount">${race.betAmount.toLocaleString()} نقطة</span>
                <span class="race-time">${minutes}:${seconds.toString().padStart(2, '0')}</span>
            </div>
            <div class="race-actions">
                <button class="btn btn-small btn-success accept-race-btn" data-id="${race.id}">
                    قبول التحدي
                </button>
            </div>
        `;
        
        elements.activeRacesList.appendChild(raceElement);
    });
    
    // إضافة مستمعي الأحداث للأزرار
    document.querySelectorAll('.accept-race-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const raceId = e.target.dataset.id;
            acceptRace(raceId);
        });
    });
}

function createRace() {
    if (!appData.currentUser) {
        showNotification('يجب تسجيل الدخول', 'error');
        return;
    }
    
    const betAmount = parseInt(elements.raceBetAmount.value);
    
    if (!betAmount || betAmount < 100 || betAmount > 50000) {
        showNotification('المبلغ يجب أن يكون بين 100 و 50,000 نقطة', 'error');
        return;
    }
    
    if (appData.currentUser.points < betAmount) {
        showNotification(SYSTEM_MESSAGES.INSUFFICIENT_POINTS, 'error');
        return;
    }
    
    // خصم النقاط
    appData.currentUser.points -= betAmount;
    database.ref('users/' + appData.currentUser.id).update({
        points: appData.currentUser.points
    });
    
    const raceId = database.ref('casino/races').push().key;
    const race = {
        id: raceId,
        creatorId: appData.currentUser.id,
        creatorName: appData.currentUser.name,
        creatorImage: appData.currentUser.image,
        betAmount: betAmount,
        createdAt: Date.now(),
        completed: false,
        expired: false,
        accepted: false,
        opponentId: null,
        opponentName: null,
        opponentImage: null,
        creatorClicks: 0,
        opponentClicks: 0,
        winner: null,
        creatorPlayed: false,
        opponentPlayed: false
    };
    
    database.ref('casino/races/' + raceId).set(race)
        .then(() => {
            showNotification('تم إنشاء التحدي بنجاح', 'success');
            loadActiveRaces();
            updateUserInfo();
            
            // بدء اللعب الفردي فوراً
            startSoloRace(raceId);
        })
        .catch(error => {
            console.error('❌ خطأ في إنشاء التحدي:', error);
            showNotification(SYSTEM_MESSAGES.ERROR_GENERIC, 'error');
        });
}

function startSoloRace(raceId) {
    // إعداد البيانات للعبة الفردية
    appData.currentGame = {
        type: 'click-race',
        raceId: raceId,
        gameType: 'solo',
        players: [
            {
                id: appData.currentUser.id,
                name: appData.currentUser.name,
                image: appData.currentUser.image,
                clicks: 0,
                isCurrentPlayer: true
            }
        ],
        betAmount: parseInt(elements.raceBetAmount.value) || 1000,
        currentPlayerIndex: 0,
        gameState: 'waiting'
    };
    
    // عرض نافذة اللعبة
    setupSoloRaceGame();
    elements.raceModal.classList.add('active');
}

function setupSoloRaceGame() {
    if (!appData.currentGame) return;
    
    const game = appData.currentGame;
    
    // تحديث معلومات اللاعب
    const player = game.players[0];
    
    elements.racePlayer1.querySelector('img').src = player.image;
    elements.racePlayer1.querySelector('h4').textContent = player.name;
    elements.racePlayer1.querySelector('.player-score').textContent = '0';
    
    // إخفاء اللاعب الثاني
    elements.racePlayer2.style.display = 'none';
    elements.gamePlayers.querySelector('.vs').style.display = 'none';
    
    // تحديث نوع اللعبة
    elements.gameTypeLabel.textContent = 'التحدي الأولي';
    elements.gameTypeIndicator.style.display = 'block';
    
    // تحديث التعليمات
    elements.raceInstructions.textContent = 'انقر بأقصى سرعة خلال 20 ثانية! نتيجةك ستكون أساس التحدي.';
    
    // إظهار أفضل نتيجة
    elements.bestScoreDisplay.style.display = 'block';
    elements.bestScoreValue.textContent = appData.practiceBestScore;
    
    // إعادة تعيين العدادات
    elements.playerClickCount.textContent = '0';
    elements.opponentClickLabel.style.display = 'none';
    elements.raceTimeLeft.textContent = '20';
    elements.clickRaceBtn.disabled = true;
    
    // بدء العد التنازلي
    startRaceCountdown('solo');
}

function startRaceCountdown(gameType) {
    let countdown = 3;
    
    elements.clickRaceBtn.disabled = true;
    elements.clickRaceBtn.textContent = countdown;
    elements.clickRaceBtn.classList.add('countdown');
    
    const countdownInterval = setInterval(() => {
        elements.clickRaceBtn.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            elements.clickRaceBtn.classList.remove('countdown');
            startRaceTimer(gameType);
        }
        
        countdown--;
    }, 1000);
}

function startRaceTimer(gameType) {
    let timeLeft = 20;
    let clickCount = 0;
    
    elements.clickRaceBtn.textContent = 'اضغط!';
    elements.clickRaceBtn.disabled = false;
    
    // تحديث الوقت
    const timerInterval = setInterval(() => {
        timeLeft--;
        elements.raceTimeLeft.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishRaceTurn(gameType);
        }
    }, 1000);
    
    // مستمع النقرات
    const clickHandler = () => {
        clickCount++;
        elements.playerClickCount.textContent = clickCount;
        
        // تحديث النقرات في الوقت الحقيقي
        const game = appData.currentGame;
        const currentPlayerIndex = game.currentPlayerIndex;
        
        game.players[currentPlayerIndex].clicks = clickCount;
        
        // تحديث عرض النتيجة
        if (gameType === 'solo') {
            elements.racePlayer1.querySelector('.player-score').textContent = clickCount;
        } else if (gameType === 'dual') {
            if (currentPlayerIndex === 0) {
                elements.racePlayer1.querySelector('.player-score').textContent = clickCount;
            } else {
                elements.racePlayer2.querySelector('.player-score').textContent = clickCount;
            }
            
            // تحديث نقرات الخصم في الواجهة
            const opponentIndex = currentPlayerIndex === 0 ? 1 : 0;
            const opponentClickCount = game.players[opponentIndex].clicks;
            elements.opponentClickCount.textContent = opponentClickCount;
        }
    };
    
    elements.clickRaceBtn.addEventListener('click', clickHandler);
    
    // تخزين البيانات للتنظيف
    appData.currentGame.clickHandler = clickHandler;
    appData.currentGame.timerInterval = timerInterval;
    appData.currentGame.gameType = gameType;
    appData.currentGame.timeLeft = timeLeft;
}

function finishRaceTurn(gameType) {
    const game = appData.currentGame;
    
    // إزالة مستمع النقرات
    if (game.clickHandler) {
        elements.clickRaceBtn.removeEventListener('click', game.clickHandler);
    }
    
    // إيقاف المؤقت
    if (game.timerInterval) {
        clearInterval(game.timerInterval);
    }
    
    const finalClicks = game.players[game.currentPlayerIndex].clicks;
    
    if (gameType === 'solo') {
        // حفظ نتيجة اللاعب الأول
        database.ref('casino/races/' + game.raceId).update({
            creatorClicks: finalClicks,
            creatorPlayed: true
        })
        .then(() => {
            // إنهاء اللعبة الفردية
            finishSoloRace(finalClicks);
        });
    } else {
        // تحديث نتيجة اللاعب الثاني
        const updatePath = game.currentPlayerIndex === 0 ? 'creatorClicks' : 'opponentClicks';
        const playedPath = game.currentPlayerIndex === 0 ? 'creatorPlayed' : 'opponentPlayed';
        
        database.ref('casino/races/' + game.raceId).update({
            [updatePath]: finalClicks,
            [playedPath]: true
        })
        .then(() => {
            // الانتقال للاعب التالي أو إنهاء اللعبة المزدوجة
            game.currentPlayerIndex++;
            
            if (game.currentPlayerIndex < 2) {
                // لاعب التالي
                setTimeout(() => {
                    setupDualRaceGame();
                }, 2000);
            } else {
                // إنهاء اللعبة المزدوجة
                finishDualRace();
            }
        });
    }
}

function finishSoloRace(finalClicks) {
    const game = appData.currentGame;
    
    // تحديث أفضل نتيجة
    if (finalClicks > appData.practiceBestScore) {
        appData.practiceBestScore = finalClicks;
        savePracticeBestScore();
    }
    
    // تحديث لوحة الصدارة
    updateRaceLeaderboard();
    
    // إغلاق النافذة بعد تأخير
    setTimeout(() => {
        elements.raceModal.classList.remove('active');
        showNotification(`أنهيت الجولة بـ ${finalClicks} نقرة. انتظر لاعباً آخر!`, 'info');
    }, 3000);
}

function acceptRace(raceId) {
    const race = appData.activeRaces.find(r => r.id === raceId);
    if (!race) {
        showNotification('التحدي لم يعد موجوداً', 'error');
        return;
    }
    
    if (!appData.currentUser) {
        showNotification('يجب تسجيل الدخول', 'error');
        return;
    }
    
    if (appData.currentUser.points < race.betAmount) {
        showNotification(SYSTEM_MESSAGES.INSUFFICIENT_POINTS, 'error');
        return;
    }
    
    if (race.creatorId === appData.currentUser.id) {
        showNotification('لا يمكن قبول تحدي نفسك', 'error');
        return;
    }
    
    if (race.opponentId) {
        showNotification('التحدي تم قبوله بالفعل', 'error');
        return;
    }
    
    // خصم النقاط من القابل للتحدي
    appData.currentUser.points -= race.betAmount;
    database.ref('users/' + appData.currentUser.id).update({
        points: appData.currentUser.points
    });
    
    // تحديث التحدي
    database.ref('casino/races/' + raceId).update({
        accepted: true,
        opponentId: appData.currentUser.id,
        opponentName: appData.currentUser.name,
        opponentImage: appData.currentUser.image,
        acceptedAt: Date.now()
    })
    .then(() => {
        showNotification('تم قبول التحدي', 'success');
        
        // بدء السباق المزدوج
        startDualRaceGame(raceId);
    })
    .catch(error => {
        console.error('❌ خطأ في قبول التحدي:', error);
        showNotification(SYSTEM_MESSAGES.ERROR_GENERIC, 'error');
    });
}

function startDualRaceGame(raceId) {
    database.ref('casino/races/' + raceId).once('value')
        .then(snapshot => {
            if (!snapshot.exists()) return;
            
            const race = snapshot.val();
            
            // التحقق إذا كان اللاعب الأول قد لعب
            if (!race.creatorPlayed) {
                showNotification('اللاعب الأول لم يلعب بعد', 'error');
                return;
            }
            
            // إعداد البيانات للعبة المزدوجة
            appData.currentGame = {
                type: 'click-race',
                raceId: raceId,
                gameType: 'dual',
                players: [
                    {
                        id: race.creatorId,
                        name: race.creatorName,
                        image: race.creatorImage,
                        clicks: race.creatorClicks || 0,
                        isCurrentPlayer: false
                    },
                    {
                        id: race.opponentId,
                        name: race.opponentName,
                        image: race.opponentImage,
                        clicks: 0,
                        isCurrentPlayer: race.opponentId === appData.currentUser.id
                    }
                ],
                betAmount: race.betAmount,
                currentPlayerIndex: 1,
                gameState: 'waiting'
            };
            
            // عرض نافذة اللعبة
            setupDualRaceGame();
            elements.raceModal.classList.add('active');
        });
}

function setupDualRaceGame() {
    if (!appData.currentGame) return;
    
    const game = appData.currentGame;
    
    // إظهار كلا اللاعبين
    elements.racePlayer1.style.display = 'block';
    elements.racePlayer2.style.display = 'block';
    elements.gamePlayers.querySelector('.vs').style.display = 'block';
    
    // تحديث معلومات اللاعبين
    const player1 = game.players[0];
    const player2 = game.players[1];
    
    elements.racePlayer1.querySelector('img').src = player1.image;
    elements.racePlayer1.querySelector('h4').textContent = player1.name;
    elements.racePlayer1.querySelector('.player-score').textContent = player1.clicks;
    
    elements.racePlayer2.querySelector('img').src = player2.image;
    elements.racePlayer2.querySelector('h4').textContent = player2.name;
    elements.racePlayer2.querySelector('.player-score').textContent = '0';
    
    // تحديث نوع اللعبة
    elements.gameTypeLabel.textContent = 'تحدي مزدوج';
    elements.gameTypeIndicator.style.display = 'block';
    
    // تحديث التعليمات
    elements.raceInstructions.textContent = 'حاول تحطيم نتيجة الخصم! انقر بأقصى سرعة خلال 20 ثانية!';
    
    // إخفاء أفضل نتيجة
    elements.bestScoreDisplay.style.display = 'none';
    
    // إعادة تعيين العدادات
    elements.playerClickCount.textContent = '0';
    elements.opponentClickCount.textContent = game.players[0].clicks;
    elements.opponentClickLabel.style.display = 'block';
    elements.raceTimeLeft.textContent = '20';
    elements.clickRaceBtn.disabled = true;
    
    // بدء العد التنازلي
    startRaceCountdown('dual');
}

function finishDualRace() {
    const game = appData.currentGame;
    
    // حساب النتائج
    const player1Clicks = game.players[0].clicks;
    const player2Clicks = game.players[1].clicks;
    
    let winnerId, loserId;
    
    if (player2Clicks > player1Clicks) {
        winnerId = game.players[1].id;
        loserId = game.players[0].id;
    } else if (player1Clicks > player2Clicks) {
        winnerId = game.players[0].id;
        loserId = game.players[1].id;
    } else {
        winnerId = null;
    }
    
    // تحديث النقاط
    const updates = {};
    const betAmount = game.betAmount;
    
    if (winnerId) {
        updates[`users/${winnerId}/points`] = firebase.database.ServerValue.increment(betAmount * 2);
        updates[`users/${loserId}/points`] = firebase.database.ServerValue.increment(-betAmount);
        
        const winnerRecord = {
            id: Date.now(),
            type: 'click-race',
            gameName: 'سباق النقرات',
            playerId: winnerId,
            playerName: game.players.find(p => p.id === winnerId).name,
            betAmount: betAmount,
            result: 'win',
            profit: betAmount,
            clicks: winnerId === game.players[0].id ? player1Clicks : player2Clicks,
            opponentClicks: winnerId === game.players[0].id ? player2Clicks : player1Clicks,
            timestamp: Date.now()
        };
        
        saveGameResult(winnerRecord);
        
        const loserRecord = {
            id: Date.now() + 1,
            type: 'click-race',
            gameName: 'سباق النقرات',
            playerId: loserId,
            playerName: game.players.find(p => p.id === loserId).name,
            betAmount: betAmount,
            result: 'loss',
            profit: -betAmount,
            clicks: loserId === game.players[0].id ? player1Clicks : player2Clicks,
            opponentClicks: loserId === game.players[0].id ? player2Clicks : player1Clicks,
            timestamp: Date.now()
        };
        
        saveGameResult(loserRecord);
        
    } else {
        updates[`users/${game.players[0].id}/points`] = firebase.database.ServerValue.increment(betAmount);
        updates[`users/${game.players[1].id}/points`] = firebase.database.ServerValue.increment(betAmount);
        
        const drawRecord1 = {
            id: Date.now(),
            type: 'click-race',
            gameName: 'سباق النقرات',
            playerId: game.players[0].id,
            playerName: game.players[0].name,
            betAmount: betAmount,
            result: 'draw',
            profit: 0,
            clicks: player1Clicks,
            opponentClicks: player2Clicks,
            timestamp: Date.now()
        };
        
        const drawRecord2 = {
            id: Date.now() + 1,
            type: 'click-race',
            gameName: 'سباق النقرات',
            playerId: game.players[1].id,
            playerName: game.players[1].name,
            betAmount: betAmount,
            result: 'draw',
            profit: 0,
            clicks: player2Clicks,
            opponentClicks: player1Clicks,
            timestamp: Date.now()
        };
        
        saveGameResult(drawRecord1);
        saveGameResult(drawRecord2);
    }
    
    updates[`casino/races/${game.raceId}/completed`] = true;
    updates[`casino/races/${game.raceId}/winner`] = winnerId;
    
    database.ref().update(updates)
        .then(() => {
            if (winnerId === appData.currentUser?.id) {
                showGameResult({
                    gameName: 'سباق النقرات',
                    result: 'win',
                    betAmount: betAmount,
                    profit: betAmount
                });
            } else if (loserId === appData.currentUser?.id) {
                showGameResult({
                    gameName: 'سباق النقرات',
                    result: 'loss',
                    betAmount: betAmount,
                    profit: -betAmount
                });
            } else if (!winnerId) {
                showNotification('⚖️ تعادل! تم استرداد رهانك', 'info');
            }
            
            setTimeout(() => {
                elements.raceModal.classList.remove('active');
                updateUserInfo();
                loadActiveRaces();
            }, 3000);
        });
}

function updateRaceTimers() {
    document.querySelectorAll('.race-item').forEach(raceElement => {
        const raceId = raceElement.dataset.raceId;
        const race = appData.activeRaces.find(r => r.id === raceId);
        
        if (race) {
            const timeLeft = Math.max(0, Math.floor((race.createdAt + 600000 - Date.now()) / 1000));
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            const timeElement = raceElement.querySelector('.race-time');
            if (timeElement) {
                timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }
    });
}

function updateRaceLeaderboard() {
    if (!elements.raceLeaderboardList) return;
    
    const raceGames = appData.gameHistory.filter(game => game.type === 'click-race');
    const bestScores = {};
    
    raceGames.forEach(game => {
        if (!bestScores[game.playerId] || game.clicks > bestScores[game.playerId].clicks) {
            const member = MEMBERS_DATA.find(m => m.id === game.playerId);
            bestScores[game.playerId] = {
                name: game.playerName,
                image: member?.image || 'https://files.catbox.moe/7pcx7j.jpg',
                clicks: game.clicks
            };
        }
    });
    
    const sortedScores = Object.values(bestScores)
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 10);
    
    if (sortedScores.length === 0) {
        elements.raceLeaderboardList.innerHTML = '<div class="empty-message">لا توجد نتائج</div>';
        return;
    }
    
    elements.raceLeaderboardList.innerHTML = '';
    
    sortedScores.forEach((score, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'leaderboard-item';
        
        itemElement.innerHTML = `
            <div class="rank">${index + 1}</div>
            <img src="${score.image}" alt="${score.name}" class="avatar" onerror="this.src='https://files.catbox.moe/7pcx7j.jpg'">
            <div class="user-info">
                <h4>${score.name}</h4>
                <p>${score.clicks} نقرة</p>
            </div>
        `;
        
        elements.raceLeaderboardList.appendChild(itemElement);
    });
}

// التدريب الفردي
function openPracticeModal() {
    elements.practiceBestScore.textContent = appData.practiceBestScore;
    elements.practiceModal.classList.add('active');
}

function startPractice() {
    appData.currentGame = {
        type: 'practice',
        clicks: 0,
        gameActive: false,
        timer: null
    };
    
    elements.practiceClickCount.textContent = '0';
    elements.practiceTimer.textContent = '20';
    elements.practiceClickBtn.disabled = true;
    elements.practiceStartBtn.disabled = true;
    
    let countdown = 3;
    elements.practiceClickBtn.textContent = countdown;
    
    const countdownInterval = setInterval(() => {
        countdown--;
        elements.practiceClickBtn.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            startPracticeTimer();
        }
    }, 1000);
}

function startPracticeTimer() {
    appData.currentGame.gameActive = true;
    let timeLeft = 20;
    elements.practiceClickBtn.textContent = 'اضغط!';
    elements.practiceClickBtn.disabled = false;
    
    const timer = setInterval(() => {
        timeLeft--;
        elements.practiceTimer.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endPractice();
        }
    }, 1000);
    
    appData.currentGame.timer = timer;
}

function handlePracticeClick() {
    if (!appData.currentGame.gameActive) return;
    
    appData.currentGame.clicks++;
    elements.practiceClickCount.textContent = appData.currentGame.clicks;
    
    elements.practiceClickBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        elements.practiceClickBtn.style.transform = 'scale(1)';
    }, 50);
}

function endPractice() {
    appData.currentGame.gameActive = false;
    
    if (appData.currentGame.timer) {
        clearInterval(appData.currentGame.timer);
    }
    
    const clicks = appData.currentGame.clicks;
    
    if (clicks > appData.practiceBestScore) {
        appData.practiceBestScore = clicks;
        savePracticeBestScore();
        showNotification(`🎉 مبروك! سجلت أفضل نتيجة جديدة: ${clicks} نقرة`, 'success');
    }
    
    elements.practiceBestScore.textContent = appData.practiceBestScore;
    elements.practiceStartBtn.disabled = false;
    elements.practiceClickBtn.disabled = true;
    elements.practiceClickBtn.textContent = 'انتهى الوقت';
    
    updateRaceLeaderboard();
}

function loadPracticeBestScore() {
    const savedScore = localStorage.getItem('casino_practice_best_score');
    if (savedScore) {
        appData.practiceBestScore = parseInt(savedScore);
    }
}

function savePracticeBestScore() {
    localStorage.setItem('casino_practice_best_score', appData.practiceBestScore.toString());
}

// حفظ نتيجة اللعبة
function saveGameResult(gameRecord) {
    appData.gameHistory.unshift(gameRecord);
    
    const gameId = database.ref('casino/gameHistory').push().key;
    database.ref('casino/gameHistory/' + gameId).set(gameRecord)
        .then(() => {
            console.log('✅ تم حفظ نتيجة اللعبة');
            updateUserStats(gameRecord);
            updateLeaderboard(gameRecord);
            
            if (document.getElementById('historySection').classList.contains('active')) {
                loadGameHistory();
            }
        })
        .catch(error => {
            console.error('❌ خطأ في حفظ نتيجة اللعبة:', error);
        });
}

// إظهار نتيجة اللعبة
function showGameResult(gameRecord) {
    const resultModal = elements.resultModal;
    
    let icon = elements.resultTrophy;
    let title = '';
    let message = '';
    
    if (gameRecord.result === 'win') {
        icon = elements.resultTrophy;
        elements.resultLoss.style.display = 'none';
        elements.resultDraw.style.display = 'none';
        elements.resultTrophy.style.display = 'block';
        
        title = '🎉 مبروك! لقد فزت';
        message = `لقد ربحت ${gameRecord.profit} نقطة في ${gameRecord.gameName}`;
    } else if (gameRecord.result === 'loss') {
        icon = elements.resultLoss;
        elements.resultTrophy.style.display = 'none';
        elements.resultDraw.style.display = 'none';
        elements.resultLoss.style.display = 'block';
        
        title = '💔 للأسف، لقد خسرت';
        message = `خسرت ${-gameRecord.profit} نقطة في ${gameRecord.gameName}`;
    } else {
        icon = elements.resultDraw;
        elements.resultTrophy.style.display = 'none';
        elements.resultLoss.style.display = 'none';
        elements.resultDraw.style.display = 'block';
        
        title = '⚖️ تعادل';
        message = `تم استرداد رهانك في ${gameRecord.gameName}`;
    }
    
    elements.resultTitle.textContent = title;
    elements.resultMessage.textContent = message;
    elements.resultBetAmount.textContent = gameRecord.betAmount.toLocaleString() + ' نقطة';
    elements.resultProfit.textContent = (gameRecord.profit > 0 ? '+' : '') + gameRecord.profit.toLocaleString() + ' نقطة';
    elements.resultNewBalance.textContent = (appData.currentUser?.points || 0).toLocaleString() + ' نقطة';
    
    resultModal.classList.add('active');
}

// تحديث إحصائيات المستخدم
function updateUserStats(gameRecord) {
    if (!appData.currentUser) return;
    
    if (!appData.userStats) {
        appData.userStats = {
            totalGames: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            totalPoints: 0,
            winStreak: 0,
            bestStreak: 0
        };
    }
    
    appData.userStats.totalGames++;
    
    if (gameRecord.result === 'win') {
        appData.userStats.wins++;
        appData.userStats.winStreak++;
        appData.userStats.bestStreak = Math.max(appData.userStats.bestStreak, appData.userStats.winStreak);
    } else if (gameRecord.result === 'loss') {
        appData.userStats.losses++;
        appData.userStats.winStreak = 0;
    } else {
        appData.userStats.draws++;
    }
    
    appData.userStats.totalPoints += gameRecord.profit;
    
    database.ref(`casino/userStats/${appData.currentUser.id}`).set(appData.userStats);
}

// تحميل سجل الألعاب
function loadGameHistory() {
    const typeFilter = elements.historyFilterType.value;
    const gameFilter = elements.historyFilterGame.value;
    
    database.ref('casino/gameHistory').orderByChild('timestamp').limitToLast(50).once('value')
        .then(snapshot => {
            const games = [];
            if (snapshot.exists()) {
                const data = snapshot.val();
                for (const id in data) {
                    games.push({
                        id: id,
                        ...data[id]
                    });
                }
            }
            
            let filteredGames = games;
            
            if (typeFilter !== 'all') {
                filteredGames = filteredGames.filter(game => game.result === typeFilter);
            }
            
            if (gameFilter !== 'all') {
                filteredGames = filteredGames.filter(game => game.type === gameFilter);
            }
            
            filteredGames.sort((a, b) => b.timestamp - a.timestamp);
            
            appData.gameHistory = games;
            
            updateHistoryDisplay(filteredGames);
            updateHistoryStats(games);
        })
        .catch(error => {
            console.error('❌ خطأ في تحميل سجل الألعاب:', error);
        });
}

// تحديث عرض السجل
function updateHistoryDisplay(games) {
    if (!elements.gamesHistoryList) return;
    
    if (games.length === 0) {
        elements.gamesHistoryList.innerHTML = '<div class="empty-message">لا توجد جولات سابقة</div>';
        return;
    }
    
    elements.gamesHistoryList.innerHTML = '';
    
    games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'game-history-item';
        
        const date = new Date(game.timestamp).toLocaleString('ar-EG', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const resultClass = game.result === 'win' ? 'win' : 
                          game.result === 'loss' ? 'loss' : 'draw';
        
        const resultText = game.result === 'win' ? 'فوز' :
                          game.result === 'loss' ? 'خسارة' : 'تعادل';
        
        const profitText = game.profit > 0 ? `+${game.profit}` : game.profit;
        const profitClass = game.profit > 0 ? 'positive' : 'negative';
        
        gameElement.innerHTML = `
            <div class="game-info">
                <div class="game-header">
                    <span class="game-name">${game.gameName}</span>
                    <span class="game-date">${date}</span>
                </div>
                <div class="game-details">
                    <span class="player">${game.playerName}</span>
                    <span class="bet">${game.betAmount.toLocaleString()} نقطة</span>
                </div>
            </div>
            <div class="game-result">
                <span class="result ${resultClass}">${resultText}</span>
                <span class="profit ${profitClass}">${profitText} نقطة</span>
            </div>
        `;
        
        elements.gamesHistoryList.appendChild(gameElement);
    });
}

// تحديث إحصائيات السجل
function updateHistoryStats(games) {
    if (!appData.currentUser) return;
    
    const userGames = games.filter(game => game.playerId === appData.currentUser.id);
    
    const totalGames = userGames.length;
    const winGames = userGames.filter(game => game.result === 'win').length;
    const lossGames = userGames.filter(game => game.result === 'loss').length;
    const drawGames = userGames.filter(game => game.result === 'draw').length;
    const netProfit = userGames.reduce((sum, game) => sum + game.profit, 0);
    
    elements.totalGamesHistory.textContent = totalGames;
    elements.winGamesHistory.textContent = winGames;
    elements.lossGamesHistory.textContent = lossGames;
    elements.drawGamesHistory.textContent = drawGames;
    elements.netProfitHistory.textContent = netProfit.toLocaleString();
}

// تحميل المتصدرين
function loadLeaderboard() {
    database.ref('casino/userStats').once('value')
        .then(snapshot => {
            const stats = [];
            if (snapshot.exists()) {
                const data = snapshot.val();
                for (const userId in data) {
                    const user = MEMBERS_DATA.find(m => m.id === parseInt(userId));
                    if (user && !user.banned) {
                        stats.push({
                            user: user,
                            stats: data[userId]
                        });
                    }
                }
            }
            
            updateLeaderboardDisplay(stats);
            
            if (appData.currentUser) {
                const userStat = stats.find(s => s.user.id === appData.currentUser.id);
                updateUserStatsDisplay(userStat?.stats);
            }
        })
        .catch(error => {
            console.error('❌ خطأ في تحميل المتصدرين:', error);
        });
}

function updateLeaderboardDisplay(stats) {
    if (!elements.leaderboardList) return;
    
    stats.sort((a, b) => (b.stats.totalPoints || 0) - (a.stats.totalPoints || 0));
    
    const firstPlaceElement = document.querySelector('.top-player.first');
    const secondPlaceElement = document.querySelector('.top-player.second');
    const thirdPlaceElement = document.querySelector('.top-player.third');
    
    if (stats[0]) {
        elements.firstPlaceName.textContent = stats[0].user.name;
        elements.firstPlacePoints.textContent = (stats[0].stats.totalPoints || 0) + ' نقطة';
        if (firstPlaceElement) {
            const img = firstPlaceElement.querySelector('img');
            if (img) {
                img.src = stats[0].user.image;
                img.onerror = function() {
                    this.src = 'https://files.catbox.moe/7pcx7j.jpg';
                };
            }
        }
    }
    
    if (stats[1]) {
        elements.secondPlaceName.textContent = stats[1].user.name;
        elements.secondPlacePoints.textContent = (stats[1].stats.totalPoints || 0) + ' نقطة';
        if (secondPlaceElement) {
            const img = secondPlaceElement.querySelector('img');
            if (img) {
                img.src = stats[1].user.image;
                img.onerror = function() {
                    this.src = 'https://files.catbox.moe/7pcx7j.jpg';
                };
            }
        }
    }
    
    if (stats[2]) {
        elements.thirdPlaceName.textContent = stats[2].user.name;
        elements.thirdPlacePoints.textContent = (stats[2].stats.totalPoints || 0) + ' نقطة';
        if (thirdPlaceElement) {
            const img = thirdPlaceElement.querySelector('img');
            if (img) {
                img.src = stats[2].user.image;
                img.onerror = function() {
                    this.src = 'https://files.catbox.moe/7pcx7j.jpg';
                };
            }
        }
    }
    
    elements.leaderboardList.innerHTML = '';
    
    stats.slice(3, 20).forEach((item, index) => {
        const rank = index + 4;
        const user = item.user;
        const stat = item.stats;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'leaderboard-item';
        
        itemElement.innerHTML = `
            <div class="rank">${rank}</div>
            <img src="${user.image}" alt="${user.name}" class="avatar" onerror="this.src='https://files.catbox.moe/7pcx7j.jpg'">
            <div class="user-info">
                <h4>${user.name}</h4>
                <p>${stat.totalPoints || 0} نقطة</p>
            </div>
            <div class="user-stats">
                <span class="win-rate">${calculateWinRate(stat)}% فوز</span>
                <span class="games">${stat.totalGames || 0} جولة</span>
            </div>
        `;
        
        elements.leaderboardList.appendChild(itemElement);
    });
}

function updateUserStatsDisplay(userStats) {
    if (!appData.currentUser) return;
    
    database.ref('casino/userStats').once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                const allStats = [];
                const data = snapshot.val();
                
                for (const userId in data) {
                    const user = MEMBERS_DATA.find(m => m.id === parseInt(userId));
                    if (user) {
                        allStats.push({
                            user: user,
                            points: data[userId].totalPoints || 0
                        });
                    }
                }
                
                allStats.sort((a, b) => b.points - a.points);
                
                const userRank = allStats.findIndex(s => s.user.id === appData.currentUser.id) + 1;
                elements.userRank.textContent = userRank > 0 ? `#${userRank}` : '-';
            }
        });
    
    if (userStats) {
        elements.userTotalPoints.textContent = userStats.totalPoints || 0;
        elements.userWinRate.textContent = calculateWinRate(userStats) + '%';
        elements.userBestStreak.textContent = userStats.bestStreak || 0;
    } else {
        elements.userTotalPoints.textContent = '0';
        elements.userWinRate.textContent = '0%';
        elements.userBestStreak.textContent = '0';
    }
}

function calculateWinRate(stats) {
    if (!stats || !stats.totalGames || stats.totalGames === 0) return 0;
    
    const winRate = (stats.wins / stats.totalGames) * 100;
    return Math.round(winRate);
}

function updateLeaderboard(gameRecord) {
    if (gameRecord.playerId === appData.currentUser?.id) {
        loadLeaderboard();
    }
}

// تبديل تبويب المتصدرين
function switchLeaderboardTab(type) {
    elements.leaderboardTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`.leaderboard-tab[data-type="${type}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    loadLeaderboardByType(type);
}

function loadLeaderboardByType(type) {
    database.ref('casino/userStats').once('value')
        .then(snapshot => {
            const stats = [];
            if (snapshot.exists()) {
                const data = snapshot.val();
                for (const userId in data) {
                    const user = MEMBERS_DATA.find(m => m.id === parseInt(userId));
                    if (user && !user.banned) {
                        stats.push({
                            user: user,
                            stats: data[userId]
                        });
                    }
                }
            }
            
            switch(type) {
                case 'points':
                    stats.sort((a, b) => (b.stats.totalPoints || 0) - (a.stats.totalPoints || 0));
                    break;
                case 'wins':
                    stats.sort((a, b) => (b.stats.wins || 0) - (a.stats.wins || 0));
                    break;
                case 'activity':
                    stats.sort((a, b) => (b.stats.totalGames || 0) - (a.stats.totalGames || 0));
                    break;
                case 'streak':
                    stats.sort((a, b) => (b.stats.bestStreak || 0) - (a.stats.bestStreak || 0));
                    break;
            }
            
            updateLeaderboardDisplay(stats);
        });
}

// تبديل قسم المساعدة
function switchHelpCategory(category) {
    elements.helpCategories.forEach(cat => {
        cat.classList.remove('active');
    });
    
    const activeCat = document.querySelector(`.help-category[data-category="${category}"]`);
    if (activeCat) {
        activeCat.classList.add('active');
    }
    
    elements.helpSections.forEach(section => {
        section.classList.remove('active');
    });
    
    const activeSection = document.getElementById(category + 'Section');
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

// معالجة تسجيل الخروج
function handleLogout() {
    showConfirmModal(
        'تسجيل الخروج',
        'هل تريد تسجيل الخروج من كازينو العظمة؟',
        () => {
            if (appData.currentUser) {
                updateUserStatus(false);
            }
            
            appData.currentUser = null;
            appData.isGuest = false;
            
            elements.casinoWrapper.style.opacity = '0';
            setTimeout(() => {
                elements.casinoWrapper.style.display = 'none';
                showLoginScreen();
                
                elements.passwordInput.value = '';
                document.querySelectorAll('.login-member').forEach(m => m.classList.remove('active'));
                if (elements.membersList && elements.membersList.firstChild) {
                    elements.membersList.firstChild.classList.add('active');
                }
            }, 500);
            
            showNotification('تم تسجيل الخروج بنجاح', 'success');
        }
    );
}

// إظهار رسالة تأكيد
function showConfirmModal(title, message, confirmCallback) {
    elements.confirmTitle.textContent = title;
    elements.confirmMessage.textContent = message;
    
    elements.confirmModal.classList.add('active');
    
    const newOkBtn = elements.okConfirmBtn.cloneNode(true);
    elements.okConfirmBtn.parentNode.replaceChild(newOkBtn, elements.okConfirmBtn);
    elements.okConfirmBtn = document.getElementById('okConfirmBtn');
    
    const newCancelBtn = elements.cancelConfirmBtn.cloneNode(true);
    elements.cancelConfirmBtn.parentNode.replaceChild(newCancelBtn, elements.cancelConfirmBtn);
    elements.cancelConfirmBtn = document.getElementById('cancelConfirmBtn');
    
    elements.okConfirmBtn.addEventListener('click', () => {
        if (confirmCallback) confirmCallback();
        elements.confirmModal.classList.remove('active');
    });
    
    elements.cancelConfirmBtn.addEventListener('click', () => {
        elements.confirmModal.classList.remove('active');
    });
}

// إظهار رسالة في شاشة تسجيل الدخول
function showLoginNotice(message, type) {
    if (!elements.loginNotice) return;
    
    elements.loginNotice.textContent = message;
    elements.loginNotice.className = 'login-notice ' + type;
    
    setTimeout(() => {
        elements.loginNotice.textContent = '';
        elements.loginNotice.className = 'login-notice';
    }, 3000);
}

// إظهار إشعار
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `confirmation-message ${type}`;
    
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icons[type] || 'bell'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// تحميل إحصائيات المستخدم
function loadUserStats() {
    if (!appData.currentUser) return;
    
    database.ref(`casino/userStats/${appData.currentUser.id}`).once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                appData.userStats = snapshot.val();
            }
        });
}

// بدء تشغيل التطبيق
document.addEventListener('DOMContentLoaded', initApp);

// إضافة مستمع حدث لانتهاء تحميل الصفحة
window.addEventListener('beforeunload', function() {
    if (appData.currentUser) {
        updateUserStatus(false);
    }
});