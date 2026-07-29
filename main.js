// Reuploadblox - Classic Roblox style interactions

document.addEventListener('DOMContentLoaded', function() {
    window.playSound = function(name) {
        const sounds = {
            swoosh: 'sounds/swoosh.wav',
            collide: 'sounds/collide.wav',
            footstep: 'sounds/bfsl-minifigfoots1.mp3'
        };
        if (sounds[name]) {
            const audio = new Audio(sounds[name]);
            audio.volume = 0.4;
            audio.play().catch(() => {});
        }
    };

    document.querySelectorAll('.btn, .nav a, .game-card, .item-card').forEach(el => {
        el.addEventListener('click', function() {
            playSound('swoosh');
        });
    });

    const faceOptions = document.querySelectorAll('.face-option');
    const avatarFace = document.getElementById('avatar-face-img');
    if (faceOptions.length && avatarFace) {
        faceOptions.forEach(opt => {
            opt.addEventListener('click', function() {
                faceOptions.forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
                const src = this.querySelector('img')?.src || this.dataset.face;
                if (src) {
                    avatarFace.src = src;
                    playSound('swoosh');
                }
                localStorage.setItem('reuploadblox_face', src);
            });
        });

        const saved = localStorage.getItem('reuploadblox_face');
        if (saved) {
            avatarFace.src = saved;
            faceOptions.forEach(o => {
                if (o.querySelector('img')?.src === saved || o.dataset.face === saved) {
                    o.classList.add('selected');
                }
            });
        }
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const user = document.getElementById('username').value.trim();
            const pass = document.getElementById('password').value;
            if (user && pass) {
                localStorage.setItem('reuploadblox_user', user);
                playSound('collide');
                alert('Welcome to Reuploadblox, ' + user + '!');
                window.location.href = 'index.html';
            } else {
                alert('Please enter username and password.');
            }
        });
    }

    const userDisplay = document.getElementById('user-display');
    const loggedUser = localStorage.getItem('reuploadblox_user');
    if (userDisplay) {
        if (loggedUser) {
            userDisplay.innerHTML = 'Hello, <a href="profile.html">' + loggedUser + '</a> | <a href="#" id="logout">Logout</a>';
            document.getElementById('logout')?.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('reuploadblox_user');
                location.reload();
            });
        } else {
            userDisplay.innerHTML = '<a href="login.html">Login</a> | <a href="login.html">Sign Up</a>';
        }
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            playSound('swoosh');
            const cat = this.dataset.cat;
            document.querySelectorAll('.item-card').forEach(card => {
                if (cat === 'all' || card.dataset.cat === cat) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
