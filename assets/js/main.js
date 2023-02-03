
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER';

const main = $('.main');
const audio = $('#audio');
const songsList = $('.songs-list');
const cdThumb = $('.cd');
const cdImg = $('.cd-img');
const cdPlayer = $('.cd-player')
const cdName = $('.cd-name');
const cdSinger = $('.cd-singer');
const cdPlaylist = $('.cd-playlist');

const playBtn = $$('.btn-play');
const nextBtns = $$('.btn-next');
const prevBtns = $$('.btn-prev');
const repeatBtns = $$('.btn-repeat');
const randomBtns = $$('.btn-random');
const volumeBtn = $('.volume-icon');


const progressList = $$('.progress');
const circles = $$('.circle');
const lineCurrents = $$('.line-current');


const progressVolume = $('.progress-volume');
const lineVolumeCurrent = $('.line-volume-current');
const circleVolume = $('.circle-volume')

const timeLefts = $$('.time-left');
const timeRights = $$('.time-right');
const timeTotal = $('.time-total');
const NodesList = $('.nodes-list');

// Mobile
const headingOnMobile = $('.heading-on-mobile');
const cdOnMobile = $('.cd-on-mobile');
const cdThumbOnMobile = $('.cd-thumb-on-mobile');
const mobileIconHide = $('.mobile-icon-hide');


// var images = ['./assets/songs/1buocyeu.mp3','./assets/songs/emlakedangthuong.mp3','./assets/songs/hoanokhongmau.mp3'];
//       var currentImage = 0;
//       setInterval(function() {
//         currentImage = (currentImage + 1) % images.length;
//         document.getElementById('image').src = images[currentImage];
//       }, 5000);

const app = {
    
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    arrSongs: [],
    songs: [
        {
            name: 'Một bước yêu vạn dặm đau',
            singer: 'Mr.Siro',
            path: './assets/songs/1buocyeu.mp3',
            image: './assets/imgs/1buocyeu.jpg'
        },
        {

            name: 'Em là kẻ đáng thương',
            singer: 'Phát Huy T4',
            path: './assets/songs/emlakedangthuong.mp3',
            image: './assets/imgs/emlakedangthuong.jpg'
        },
        {

            name: 'Hoa nở không màu',
            singer: 'Hoài Lâm',
            path: './assets/songs/hoanokhongmau.mp3',
            image: './assets/imgs/hoanokhongmau.jpg'
        },
        {

            name: 'Lối nhỏ',
            singer: 'Đen Vâu',
            path: './assets/songs/loinho.mp3',
            image: './assets/imgs/loinho.jpg'
        },
        {
            name: 'Người đến sau',
            singer: 'HKT',
            path: './assets/songs/nguoidensau.mp3',
            image: './assets/imgs/nguoidensau.jpg'
        },
        {

            name: 'Ở phương đó hãy tha thứ cho anh',
            singer: 'Lâm Chấn Khang',
            path: './assets/songs/ophuongdo.mp3',
            image: './assets/imgs/ophuongdo.jpg'
        },
        {
            name: 'Ta và Nàng',
            singer: 'Đen ft JGKID',
            path: './assets/songs/tavanang.mp3',
            image: './assets/imgs/tavanang.jpg'
        },
        {
            name: 'Tết rộn ràng',
            singer: 'Hana Cẩm Tiên',
            path: './assets/songs/tetronrang.mp3',
            image: './assets/imgs/tetronrang.jpg'
        },
        {

            name: 'Ừ có anh đây',
            singer: 'Tino',
            path: './assets/songs/ucoanhday.mp3',
            image: './assets/imgs/ucoanhday.jpg'
        }
    ],
    
    render: function () {
        var htmls = this.songs.map(function (song, index) {
            return `<div class="song${app.currentIndex === index ? ' active' : ''} is-flex" data-index="${index}">
                            <div class="song-left is-flex">
                                <div class="thumb" data-index="${index}" style="background-image: url('${song.image}')!important">
                                    <i class="ri-play-fill icon-song-play"></i>
                                </div>
                                <div class="song-body">
                                    <h3 class="song-name">${song.name}</h3>
                                    <p class="song-singer">${song.singer}</p>
                                </div>
                            </div>
                            <div class="time-total time-total-${index}" >
                                <span>00:00</span>
                            </div>
                            <div class="song-option">
                                <i class="ri-heart-3-fill icon-heart"></i>
                                <i class="ri-more-fill icon-options"></i>
                            </div>
                        </div>`
        });
        songsList.innerHTML = htmls.join('');
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function () {
        var lastValueVolume = 1;

        console.log(lastValueVolume)
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        });

        const cdPlaylistAnimate = cdPlaylist.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        });

        const cdOnMobileAnimate = cdOnMobile.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 20000,
            iterations: Infinity
        });

        cdThumbAnimate.pause();
        cdPlaylistAnimate.pause();
        cdOnMobileAnimate.pause();

        playBtn[0].onclick = PlayFunc;
        playBtn[1].onclick = PlayFunc;

        function PlayFunc() {
            if (app.isPlaying) {
                audio.pause();

            } else {
                audio.play();
            }

            // song play
            audio.onplay = function () {
                app.isPlaying = true;
                main.classList.add('is-playing');
                cdThumbAnimate.play();
                cdPlaylistAnimate.play();
                cdOnMobileAnimate.play();
                NodesList.classList.add('active');
            }

            // song pause
            audio.onpause = function () {
                app.isPlaying = false;
                main.classList.remove('is-playing');
                cdThumbAnimate.pause();
                cdPlaylistAnimate.pause();
                cdOnMobileAnimate.pause();
                NodesList.classList.remove('active');

            }

            // bài hát đang chạy
            audio.ontimeupdate = function () {
                if (audio.duration) {
                    const progressPercent = audio.currentTime / audio.duration * 100;
                    progressList[0].value = progressPercent;
                    progressList[1].value = progressPercent;
                    circles[0].style.left = `calc(${progressPercent}% - 4px)`;
                    circles[1].style.left = `calc(${progressPercent}% - 4px)`;
                    lineCurrents[0].style.width = progressPercent + '%';
                    lineCurrents[1].style.width = progressPercent + '%';

                    timeLefts[0].innerHTML = app.convertTime(audio.currentTime);
                    timeLefts[1].innerHTML = app.convertTime(audio.currentTime);
                }
            }

            // tua bài Hát
            progressList.forEach(function (progress) {
                progress.oninput = function () {
                    audio.currentTime = progress.value * audio.duration / 100;
                }
            })

            // Thay đổi âm lượng
            progressVolume.oninput = function () {
                audio.volume = progressVolume.value / 100;
                lineVolumeCurrent.style.width = audio.volume * 100 + '%';
                circleVolume.style.left = `calc(${audio.volume * 100}% - 4px)`;

                lastValueVolume = audio.volume;

                if (audio.volume === 0) {
                    volumeBtn.classList.toggle('mute', true);
                    app.isMute = true;
                } else {
                    volumeBtn.classList.toggle('mute', false);
                    app.isMute = false;
                }


            }

            //Khi kết thúc bài hát
            audio.onended = function () {
                if (app.isRepeat) {
                    audio.play();
                } else {
                    app.nextSong();
                    PlayFunc();
                    audio.play();
                    app.render();
                    app.scrollToActiveSong();
                    app.loadTotalTime();
                }
            }

            // Lắng nghe hành vi click vào playlist
            songsList.onclick = function (e) {
                const thumbEl = e.target.closest('.song:not(.active)');
                // const thumbEl = e.target.closest('.song:not(.active) .thumb');
                const optionEl = e.target.closest('.icon-options');
                const favariteEl = e.target.closest('.icon-heart');
                // console.log(thumbEl, optionEl, favariteEl);

                if (!optionEl && !favariteEl) {
                    if (thumbEl) {
                        app.currentIndex = Number(thumbEl.getAttribute('data-index'));
                        app.loadCurrentSong();
                        PlayFunc();
                        audio.play();
                        setTimeout(function () {
                            app.render();
                            app.loadTotalTime();
                        }, 100)

                    }
                }
                if (optionEl) {
                    alert('Nhạc hay thì xin 1 like ạ');
                }
            }
        }

        PlayFunc()

        nextBtns.forEach(function (nextBtn) {
            nextBtn.onclick = function () {
                app.nextSong();
                PlayFunc();
                audio.play();
                // app.render();
                app.scrollToActiveSong();
                // app.loadTotalTime();
                setTimeout(function () {
                    app.render();
                    app.loadTotalTime();
                }, 100)
            }
        })

        prevBtns.forEach(function (prevBtn) {
            prevBtn.onclick = function () {
                app.prevSong();
                PlayFunc();
                audio.play();
                app.render();
                app.loadTotalTime();
                setTimeout(function () {
                    app.render();
                    app.loadTotalTime();
                }, 100)
            }
        })

        randomBtns.forEach(function (randomBtn) {
            randomBtn.onclick = function () {
                app.isRandom = !app.isRandom;
                randomBtn.classList.toggle('active', app.isRandom);
                app.setConfig('isRandom', app.isRandom)
                console.log(app.isRandom);
            }
        })

        repeatBtns.forEach(function (repeatBtn) {
            repeatBtn.onclick = function () {
                app.isRepeat = !app.isRepeat;
                repeatBtn.classList.toggle('active', app.isRepeat);
                app.setConfig('isRepeat', app.isRepeat)
                console.log(app.isRepeat);
            }
        })


        volumeBtn.onclick = function () {
            if (app.isMute) {
                // app.setConfig('isMute', !app.isMute);
                audio.volume = lastValueVolume;
                lineVolumeCurrent.style.width = audio.volume * 100 + '%';
                circleVolume.style.left = `calc(${audio.volume * 100}% - 4px)`;
            } else {
                audio.volume = 0;
                // app.setConfig('isMute', !app.isMute);
                lineVolumeCurrent.style.width = audio.volume * 100 + '%';
                circleVolume.style.left = `calc(${audio.volume * 100}% - 4px)`;
            }
            volumeBtn.classList.toggle('mute', !app.isMute);
            app.isMute = !app.isMute;
        }
    },
    nextSong: function () {
        if (app.isRandom) {
            app.endRandomSong();
            app.playRandomSong();
        } else {
            app.currentIndex++;
            if (app.currentIndex >= app.songs.length) {
                app.currentIndex = 0;
            }
        }
        this.loadCurrentSong();

    },
    prevSong: function () {
        if (app.isRandom) {
            app.endRandomSong();
            app.playRandomSong();
        } else {
            app.currentIndex--;
            if (app.currentIndex < 0) {
                app.currentIndex = app.songs.length - 1;
            }
        }
        app.loadCurrentSong();
        this.loadTotalTime();

    },
    playRandomSong: function () {
        do {
            this.currentIndex = Math.floor(Math.random() * app.songs.length);
        } while (app.arrSongs.includes(this.currentIndex));
        this.loadCurrentSong();
    },
    convertTime: function (time) {
        var mins = Math.floor(time / 60);
        var secs = Math.floor(time % 60);
        if (mins < 10) {
            mins = '0' + mins;
        }
        if (secs < 10) {
            secs = '0' + secs;
        }
        return `${mins}:${secs}`;
    },
    loadCurrentSong: function () {
        cdName.innerHTML = this.currentSong.name;
        cdSinger.innerHTML = this.currentSong.singer;
        cdImg.src = this.currentSong.image;
        cdPlayer.src = this.currentSong.image;
        audio.src = this.currentSong.path;

        headingOnMobile.innerHTML = this.currentSong.name;
        cdThumbOnMobile.style.backgroundImage = `url('${this.currentSong.image}')`
        this.loadTimeRight();
    },
    loadTimeRight: function () {
        audio.onloadedmetadata = function () {
            timeRights[0].innerHTML = app.convertTime(audio.duration);
            timeRights[1].innerHTML = app.convertTime(audio.duration);
        }
    },
    loadTotalTime: function () {
        const listMusic = $$('.song');
        const lengthOfSongsList = listMusic.length;

        for (let i = 0; i < lengthOfSongsList; i++) {
            let audioFake = document.createElement('audio');
            audioFake.src = app.songs[i].path;
            audioFake.onloadedmetadata = function () {
                let totalTimeEl = listMusic[i].querySelector(`.time-total-${i} span`)
                console.log(audioFake.src, audioFake.duration, totalTimeEl)
                totalTimeEl.innerHTML = app.convertTime(audioFake.duration)
            }
        }

    },
    endRandomSong: function () {
        app.arrSongs.push(app.currentIndex);
        if (app.arrSongs.length === app.songs.length) {
            app.arrSongs = [];
        }
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100)
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        // this.isMute = this.config.isMute;
        randomBtns[0].classList.toggle('active', app.isRandom);
        randomBtns[1].classList.toggle('active', app.isRandom);
        repeatBtns[0].classList.toggle('active', app.isRepeat);
        repeatBtns[1].classList.toggle('active', app.isRepeat);
        // volumeBtn.classList.toggle('mute', app.isMute);

    },
    toggleControlOnMobile: function () {
        mobileIconHide.onclick = function () {
            document.querySelector('.control-on-mobile').classList.remove('active');
        }

        cdImg.onclick = function () {
            document.querySelector('.control-on-mobile').classList.add('active');
        }

    },
    start: function () {
        // Gán cấu hình từ config vào app
        this.loadConfig();

        // Xử lý các sự kiện
        this.handleEvents();

        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Tải bài hát đầu tiên
        this.loadCurrentSong();

        //Render playlist
        this.render();

        // Tải total time
        this.loadTotalTime();

        // Đóng mở điều khiển ở mobile
        this.toggleControlOnMobile();
    }
}

app.start();
