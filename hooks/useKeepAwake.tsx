import { useRef, useEffect } from 'react';

type WakeLockType = 'screen'

interface WakeLockSentinel extends EventTarget {
  readonly released: boolean
  readonly type: WakeLockType
  release(): Promise<undefined>
  onrelease: EventListener
}

const useKeepAwake = (isActive: boolean) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        } catch (err) {
          // Wake lock request failed
        }
      }
    };

    const releaseWakeLock = () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    };

    const createVideo = () => {
      const video = document.createElement('video');
      video.setAttribute('playsinline', '');
      video.style.display = 'none';
      video.loop = true;
      video.muted = true;
      document.body.appendChild(video);
      return video;
    };

    const playVideo = async (video: HTMLVideoElement) => {
      try {
        video.src = '/keep-awake-video.mp4';
        await video.play();
      } catch (error) {
        // Error playing video
      }
    };

    const stopVideo = (video: HTMLVideoElement) => {
      video.pause();
      video.currentTime = 0;
    };

    if (isActive) {
      if (!videoRef.current) {
        videoRef.current = createVideo();
      }
      playVideo(videoRef.current);
      requestWakeLock();
    } else {
      if (videoRef.current) {
        stopVideo(videoRef.current);
      }
      releaseWakeLock();
    }

    return () => {
      if (videoRef.current) {
        stopVideo(videoRef.current);
        if (document.body.contains(videoRef.current)) {
          document.body.removeChild(videoRef.current);
        }
        videoRef.current = null;
      }
      releaseWakeLock();
    };
  }, [isActive]);
};

export default useKeepAwake;
