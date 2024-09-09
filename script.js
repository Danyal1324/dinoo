let timer;
let timerStartTime;
let isTimerRunning = false;
let score = 0;

// شروع بازی
function startGame() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('game').style.display = 'block';
}

// بازگشت به صفحه بازی
function goBack(pageId) {
    document.querySelectorAll('.container').forEach(container => {
        container.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// شروع تایمر
function startTimer() {
    if (isTimerRunning) return; // جلوگیری از شروع دوباره تایمر

    timerStartTime = Date.now();
    isTimerRunning = true;
    document.getElementById('startTimerBtn').disabled = true; // غیر فعال کردن دکمه تایمر

    timer = setInterval(() => {
        const elapsedTime = Date.now() - timerStartTime;
        const hours = Math.floor(elapsedTime / 3600000);
        const minutes = Math.floor((elapsedTime % 3600000) / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);

        document.getElementById('timer').innerText = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        score += 0.0001;
        document.getElementById('score').innerText = score.toFixed(3);

    }, 1000);
}

// توقف تایمر
function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    document.getElementById('startTimerBtn').disabled = false; // فعال کردن دکمه تایمر
}

// باز کردن کیف پول
async function connectWallet() {
    if (window.ethereum) {
        // برای متاماسک
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            document.getElementById('wallet-address').innerText = await signer.getAddress();
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            alert('Failed to connect to MetaMask. Check console for errors.');
        }
    } else if (window.tonkeeper) {
        // برای Tonkeeper
        try {
            const accounts = await window.tonkeeper.request({ method: 'ton_requestAccounts' });
            document.getElementById('wallet-address').innerText = accounts[0];
        } catch (error) {
            console.error('Error connecting to Tonkeeper:', error);
            alert('Failed to connect to Tonkeeper. Check console for errors.');
        }
    } else {
        alert('Please install MetaMask or Tonkeeper!');
    }
}

// باز کردن بخش ارتقا
function openUpgrade() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('upgrade').style.display = 'block';
}

// باز کردن بخش ماموریت
function openMission() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('mission').style.display = 'block';
}

// دعوت دوستان
function inviteFriends() {
    // لینک بات تلگرام با لینک دعوت
    const inviteLink = 'https://t.me/dinosaurs_airdop_bot';
    
    // باز کردن لینک بات تلگرام
    window.open(inviteLink, '_blank');
}

// تابع راه اندازی اولیه
function init() {
    document.getElementById('startGameBtn').addEventListener('click', startGame);
    document.getElementById('startTimerBtn').addEventListener('click', startTimer);
    document.getElementById('stopTimerBtn').addEventListener('click', stopTimer);
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    document.getElementById('openUpgradeBtn').addEventListener('click', openUpgrade);
    document.getElementById('openMissionBtn').addEventListener('click', openMission);
    document.getElementById('inviteFriendsBtn').addEventListener('click', inviteFriends);
}

document.addEventListener('DOMContentLoaded', init);
