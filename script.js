// 음악 파일 연결
const audio = new Audio('song.mp3'); // 음악 파일 경로 확인
const playButton = document.querySelector('.play-button');
const pauseButton = document.querySelector('.pause-button');

// 음악 재생
playButton.addEventListener('click', () => {
    audio.play(); // 음악 재생
});

// 음악 일시정지
pauseButton.addEventListener('click', () => {
    audio.pause(); // 음악 멈추기
});
