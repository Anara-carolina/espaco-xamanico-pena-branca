
import "./VideoCerimonia.css";

function VideoCerimonia() {
  return (
    <section className="video-cerimonia">
      <div className="video-cerimonia-container">

        <p className="video-cerimonia-chamada">
          Vem aí...
        </p>

        <h2 className="video-cerimonia-titulo">
          Próxima cerimônia
        </h2>

        <p className="video-cerimonia-juramidam">
          Na força de Juramidam
        </p>

        <div className="video-cerimonia-video-wrapper">
          <video
            className="video-cerimonia-video"
            src="/Videos/juramidam.mp4"
            poster="/Imagens/juramidam-preview.jpg"
            controls
            playsInline
            preload="metadata"
          >
            Seu navegador não suporta a reprodução de vídeo.
          </video>
        </div>

      </div>
    </section>
  );
}

export default VideoCerimonia;
