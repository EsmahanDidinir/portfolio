import { useState, useEffect } from "react";

function AboutMe() {

  const [mode, setMode] = useState("laptop");
  // Başlangıçta laptopa bakıyor

  const [typingFrame, setTypingFrame] = useState(1);
  // typing-1 ↔ typing-2

  const [isBlinking, setIsBlinking] = useState(false);
  // Göz kırpma durumu


  // TYPING
  useEffect(() => {

    const timer = setInterval(() => {

      setTypingFrame((prev) => (prev === 1 ? 2 : 1));

    }, 500);

    return () => clearInterval(timer);

  }, []);


  // GÖZ KIRPMA
  useEffect(() => {

    const blinkTimer = setInterval(() => {

      setIsBlinking(true);

      setTimeout(() => {
        setIsBlinking(false);
      }, 200);

    }, 3000);

    return () => clearInterval(blinkTimer);

  }, []);


  return (
    <section id="about">

      <div className="about-text">

        <p className="about-small">
          MERHABA, BEN
        </p>

        <h1>Esmahan</h1>

        <h2>Frontend Developer</h2>

        <p>
          Modern ve kullanıcı odaklı web deneyimleri
          geliştirmeyi seviyorum.
        </p>

      </div>


      <div className="about-character">

        <img
          className="character-base typing-body"
          src={`/img/typing-${typingFrame}.png`}
          alt="Esmahan"
        />

        <img
          className={`character-eyes ${mode} typing-${typingFrame}`}
          src={
            isBlinking
              ? "/img/eyes-closed.png"
              : mode === "laptop"
              ? "/img/eyes-laptop.png"
              : mode === "closed"
              ? "/img/eyes-closed.png"
              : "/img/eyes-viewer.png"
          }
          alt=""
        />

      </div>


      <button
        onClick={() => {
          setMode("closed");

          setTimeout(() => {
            setMode("viewer");
          }, 500);
        }}
      >
        Bana Bak
      </button>

    </section>
  );
}

export default AboutMe;