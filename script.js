// 기본 변수 설정
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');

let isPlaying = false;
let currentTrackIndex = 0;
const tracks = [
  {
    title: '노래 제목',
    artist: '아티스트',
    src: 'song.mp3',  // 여기에 실제 노래 파일 경로 넣기
    duration: 210,    // 예시로 3분 30초 (210초)
  },
  // 다른 트랙들 추가 가능
];

// 오디오 객체 생성
const audio = new Audio(tracks[currentTrackIndex].src);
audio.addEventListener('loadedmetadata', () => {
  totalTimeDisplay.textContent = formatTime(audio.duration);
});

// 재생/일시정지 버튼
playButton.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playButton.textContent = '▶️';  // 재생 버튼 텍스트
  } else {
    audio.play();
    playButton.textContent = '⏸️';  // 일시정지 버튼 텍스트
  }
  isPlaying = !isPlaying;
});

// 이전 트랙 버튼
prevButton.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
});

// 다음 트랙 버튼
nextButton.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
});

// 트랙 로드 함수
function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  document.querySelector('.title').textContent = track.title;
  document.querySelector('.artist').textContent = track.artist;
  audio.play();
  isPlaying = true;
  playButton.textContent = '⏸️';  // 일시정지 버튼 텍스트
}

// 시간 형식 변경 (예: 3:30)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// 진행 바 업데이트
audio.addEventListener('timeupdate', () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// 진행 바 클릭시 시간 이동
seekBar.addEventListener('input', () => {
  const seekTo = (seekBar.value / 100) * audio.duration;
  audio.currentTime = seekTo;
});
