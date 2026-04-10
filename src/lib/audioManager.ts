class AudioManager {
  audio: HTMLAudioElement;
  currentTrack: string;

  constructor() {
    this.audio = new Audio();
    this.audio.loop = false;
    this.currentTrack = "";
  }

  load(src: string) {
    if (this.currentTrack !== src) {
      this.audio.src = src;
      this.currentTrack = src;
    }
  }

  play() {
    return this.audio.play().catch(() => {});
  }

  pause() {
    this.audio.pause();
  }

  setVolume(v: number) {
    this.audio.volume = v / 100;
  }

  seek(time: number) {
    this.audio.currentTime = time;
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getDuration() {
    return this.audio.duration || 0;
  }
}

export const audioManager = new AudioManager();
