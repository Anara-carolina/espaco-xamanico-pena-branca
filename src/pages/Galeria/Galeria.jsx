import { useEffect, useState } from "react";
import "./Galeria.css";

import imagem001 from "../../assets/imagens/001.jpg";
import imagem002 from "../../assets/imagens/002.jpg";
import imagem003 from "../../assets/imagens/003.jpg";
import imagem004 from "../../assets/imagens/004.jpg";
import imagem005 from "../../assets/imagens/005.jpg";
import imagem006 from "../../assets/imagens/006.jpg";
import imagem007 from "../../assets/imagens/007.jpg";
import imagem008 from "../../assets/imagens/008.jpg";
import imagem009 from "../../assets/imagens/009.jpg";
import imagem010 from "../../assets/imagens/010.jpg";
import imagem011 from "../../assets/imagens/011.jpg";
import imagem012 from "../../assets/imagens/012.jpg";
import imagem013 from "../../assets/imagens/013.jpg";
import imagem014 from "../../assets/imagens/014.jpg";
import imagem015 from "../../assets/imagens/015.jpg";
import imagem016 from "../../assets/imagens/016.jpg";
import imagem017 from "../../assets/imagens/017.jpg";
import imagem018 from "../../assets/imagens/018.jpg";
import imagem019 from "../../assets/imagens/019.jpg";
import imagem020 from "../../assets/imagens/020.jpg";
import imagem021 from "../../assets/imagens/021.jpg";
import imagem022 from "../../assets/imagens/022.jpg";
import imagem023 from "../../assets/imagens/023.jpg";
import imagem024 from "../../assets/imagens/024.jpg";
import imagem025 from "../../assets/imagens/025.jpg";
import imagem026 from "../../assets/imagens/026.jpg";
import imagem027 from "../../assets/imagens/027.jpg";
import imagem028 from "../../assets/imagens/028.jpg";
import imagem029 from "../../assets/imagens/029.jpg";
import imagem030 from "../../assets/imagens/030.jpg";
import imagem031 from "../../assets/imagens/031.jpg";
import imagem032 from "../../assets/imagens/032.jpg";
import imagem033 from "../../assets/imagens/033.jpg";
import imagem034 from "../../assets/imagens/034.jpg";
import imagem035 from "../../assets/imagens/035.jpg";
import imagem036 from "../../assets/imagens/036.jpg";
import imagem037 from "../../assets/imagens/037.jpg";
import imagem038 from "../../assets/imagens/038.jpg";

import imagem039 from "../../assets/imagens/0039.jpeg";
import imagem0040 from "../../assets/imagens/0040.jpeg";
import imagem0041 from "../../assets/imagens/0041.jpeg";
import imagem0042 from "../../assets/imagens/0042.jpeg";
import imagem0043 from "../../assets/imagens/0043.jpeg";
import imagem0044 from "../../assets/imagens/0044.jpeg";
import imagem0045 from "../../assets/imagens/0045.jpeg";
import imagem0046 from "../../assets/imagens/0046.jpeg";
import imagem0047 from "../../assets/imagens/0047.jpeg";
import imagem0048 from "../../assets/imagens/0048.jpeg";
import imagem0049 from "../../assets/imagens/0049.jpeg";
import imagem0050 from "../../assets/imagens/0050.jpeg";
import imagem0051 from "../../assets/imagens/0051.jpeg";
import imagem0052 from "../../assets/imagens/0052.jpeg";
import imagem0053 from "../../assets/imagens/0053.jpeg";
import imagem0054 from "../../assets/imagens/0054.jpeg";
import imagem0055 from "../../assets/imagens/0055.jpeg";
import imagem0056 from "../../assets/imagens/0056.jpeg";
import imagem0057 from "../../assets/imagens/0057.jpeg";
import imagem0058 from "../../assets/imagens/0058.jpeg";
import imagem0059 from "../../assets/imagens/0059.jpeg";
import imagem0060 from "../../assets/imagens/0060.jpeg";
import imagem0061 from "../../assets/imagens/0061.jpeg";
import imagem0062 from "../../assets/imagens/0062.jpeg";


function MiniaturaVideo({ src }) {
  const [poster, setPoster] = useState("");

  useEffect(() => {
    let video;
    let canvas;
    let ativo = true;

    const criarPrevia = () => {
      if (!video || !ativo) {
        return;
      }

      if (!video.videoWidth || !video.videoHeight) {
        return;
      }

      canvas = document.createElement("canvas");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const contexto = canvas.getContext("2d");

      if (!contexto) {
        return;
      }

      try {
        contexto.drawImage(
          video,
          0,
          0,
          canvas.width,
          canvas.height
        );

        const imagemGerada = canvas.toDataURL("image/jpeg", 0.85);

        if (ativo) {
          setPoster(imagemGerada);
        }
      } catch (error) {
        console.error("Não foi possível criar a prévia do vídeo:", error);
      }
    };

    const prepararVideo = () => {
      if (!video || !ativo) {
        return;
      }

      try {
        video.currentTime = 0.5;
      } catch (error) {
        criarPrevia();
      }
    };

    video = document.createElement("video");

    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    video.addEventListener("loadedmetadata", prepararVideo);
    video.addEventListener("seeked", criarPrevia);
    video.addEventListener("loadeddata", criarPrevia);

    video.load();

    return () => {
      ativo = false;

      video.removeEventListener(
        "loadedmetadata",
        prepararVideo
      );

      video.removeEventListener(
        "seeked",
        criarPrevia
      );

      video.removeEventListener(
        "loadeddata",
        criarPrevia
      );

      video.pause();
      video.removeAttribute("src");
      video.load();

      canvas = null;
      video = null;
    };
  }, [src]);

  return (
    <div
      className="miniatura-video"
      style={
        poster
          ? {
              backgroundImage: `url(${poster})`
            }
          : undefined
      }
    >
      <video
        src={src}
        muted
        playsInline
        preload="metadata"
        poster={poster || undefined}
        aria-hidden="true"
      />

      <div className="icone-video">
        <span>▶</span>
      </div>
    </div>
  );
}


function Galeria() {
  const [tipoSelecionado, setTipoSelecionado] = useState("fotos");
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const imagens = [
    imagem001,
    imagem002,
    imagem003,
    imagem004,
    imagem005,
    imagem006,
    imagem007,
    imagem008,
    imagem009,
    imagem010,
    imagem011,
    imagem012,
    imagem013,
    imagem014,
    imagem015,
    imagem016,
    imagem017,
    imagem018,
    imagem019,
    imagem020,
    imagem021,
    imagem022,
    imagem023,
    imagem024,
    imagem025,
    imagem026,
    imagem027,
    imagem028,
    imagem029,
    imagem030,
    imagem031,
    imagem032,
    imagem033,
    imagem034,
    imagem035,
    imagem036,
    imagem037,
    imagem038,
    imagem039,
    imagem0040,
    imagem0041,
    imagem0042,
    imagem0043,
    imagem0044,
    imagem0045,
    imagem0046,
    imagem0047,
    imagem0048,
    imagem0049,
    imagem0050,
    imagem0051,
    imagem0052,
    imagem0053,
    imagem0054,
    imagem0055,
    imagem0056,
    imagem0057,
    imagem0058,
    imagem0059,
    imagem0060,
    imagem0061,
    imagem0062
  ];

  const videos = [
    "/Videos/video1.mp4",
    "/Videos/video2.mp4",
    "/Videos/video3.mp4",
    "/Videos/video4.mp4",
    "/Videos/video5.mp4",
    "/Videos/video6.mp4",
    "/Videos/video7.mp4",
    "/Videos/video8.mp4",
    "/Videos/video9.mp4",
    "/Videos/video10.mp4"
  ];

  const itensAtuais =
    tipoSelecionado === "fotos"
      ? imagens
      : videos;

  const fecharModal = () => {
    setItemSelecionado(null);
  };

  const abrirItem = (index) => {
    setItemSelecionado({
      tipo: tipoSelecionado,
      index
    });
  };

  const itemAnterior = (event) => {
    event.stopPropagation();

    if (!itemSelecionado) {
      return;
    }

    const novoIndex =
      itemSelecionado.index === 0
        ? itensAtuais.length - 1
        : itemSelecionado.index - 1;

    setItemSelecionado({
      tipo: itemSelecionado.tipo,
      index: novoIndex
    });
  };

  const proximoItem = (event) => {
    event.stopPropagation();

    if (!itemSelecionado) {
      return;
    }

    const novoIndex =
      itemSelecionado.index === itensAtuais.length - 1
        ? 0
        : itemSelecionado.index + 1;

    setItemSelecionado({
      tipo: itemSelecionado.tipo,
      index: novoIndex
    });
  };

  const trocarTipo = (tipo) => {
    setTipoSelecionado(tipo);
    setItemSelecionado(null);
  };

  useEffect(() => {
    const pressionarTecla = (event) => {
      if (!itemSelecionado) {
        return;
      }

      if (event.key === "Escape") {
        fecharModal();
      }

      if (event.key === "ArrowLeft") {
        itemAnterior(event);
      }

      if (event.key === "ArrowRight") {
        proximoItem(event);
      }
    };

    window.addEventListener("keydown", pressionarTecla);

    return () => {
      window.removeEventListener("keydown", pressionarTecla);
    };
  }, [itemSelecionado, itensAtuais.length]);

  return (
    <main className="pagina-galeria">

      <section className="titulo-galeria">
        <h1>Nossa Galeria</h1>

        <p>
          Momentos, encontros e experiências vividas
          no Espaço Xamânico Pena Branca.
        </p>

        <div className="filtros-galeria">

          <button
            type="button"
            className={
              tipoSelecionado === "fotos"
                ? "filtro-galeria ativo"
                : "filtro-galeria"
            }
            onClick={() => trocarTipo("fotos")}
          >
            Fotos
          </button>

          <button
            type="button"
            className={
              tipoSelecionado === "videos"
                ? "filtro-galeria ativo"
                : "filtro-galeria"
            }
            onClick={() => trocarTipo("videos")}
          >
            Vídeos
          </button>

        </div>
      </section>


      <section
        className={
          tipoSelecionado === "fotos"
            ? "secao-galeria modo-fotos"
            : "secao-galeria modo-videos"
        }
      >

        <div className="galeria-grid">

          {tipoSelecionado === "fotos" &&
            imagens.map((imagem, index) => (
              <button
                type="button"
                key={imagem}
                className="item-galeria item-imagem"
                onClick={() => abrirItem(index)}
                aria-label={`Abrir foto ${index + 1}`}
              >
                <img
                  src={imagem}
                  alt={`Momento da galeria ${index + 1}`}
                  loading="lazy"
                />
              </button>
            ))
          }


          {tipoSelecionado === "videos" &&
            videos.map((video, index) => (
              <button
                type="button"
                key={video}
                className="item-galeria item-video"
                onClick={() => abrirItem(index)}
                aria-label={`Abrir vídeo ${index + 1}`}
              >
                <MiniaturaVideo src={video} />
              </button>
            ))
          }

        </div>

      </section>


      {itemSelecionado && (
        <div
          className="modal-galeria"
          onClick={fecharModal}
        >

          <button
            type="button"
            className="fechar-galeria"
            onClick={fecharModal}
            aria-label="Fechar galeria"
          >
            ×
          </button>


          <button
            type="button"
            className="navegacao-galeria anterior-galeria"
            onClick={itemAnterior}
            aria-label="Item anterior"
          >
            ‹
          </button>


          <div
            className="conteudo-modal-galeria"
            onClick={(event) => event.stopPropagation()}
          >

            {itemSelecionado.tipo === "fotos" ? (
              <img
                src={imagens[itemSelecionado.index]}
                alt={`Foto ${itemSelecionado.index + 1}`}
              />
            ) : (
              <video
                key={videos[itemSelecionado.index]}
                className="video-modal-galeria"
                src={videos[itemSelecionado.index]}
                controls
                autoPlay
                playsInline
                preload="auto"
              >
                Seu navegador não conseguiu reproduzir este vídeo.
              </video>
            )}

          </div>


          <button
            type="button"
            className="navegacao-galeria proximo-galeria"
            onClick={proximoItem}
            aria-label="Próximo item"
          >
            ›
          </button>


          <div className="contador-galeria">
            {itemSelecionado.index + 1} / {itensAtuais.length}
          </div>

        </div>
      )}

    </main>
  );
}

export default Galeria;
