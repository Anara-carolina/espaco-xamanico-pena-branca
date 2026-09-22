import { useEffect, useRef } from "react";
import "./VideoCerimonia.css";

function VideoCerimonia({ aberto, fechar }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!aberto) {
      return;
    }

    document.body.style.overflow = "hidden";

    if (videoRef.current) {
      videoRef.current.currentTime = 0;

      videoRef.current.play().catch(() => {});
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  if (!aberto) {
    return null;
  }

  const fecharVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }

    fechar();
  };

  return (
    <div className="video-cerimonia-overlay">
      <div className="video-cerimonia-container">
        <button
          type="button"
          className="video-cerimonia-fechar"
          onClick={fecharVideo}
          aria-label="Fechar vídeo"
        >
          ×
        </button>

        <video
          ref={videoRef}
          className="video-cerimonia"
          src="/Videos/juramidam.mp4"
          controls
          playsInline
          onEnded={fecharVideo}
        />
      </div>
    </div>
  );
}

export default VideoCerimonia;