import { useState, useEffect } from "react";
function AboutMe() {
    const [mode, setMode] = useState("laptop");
    useEffect(() => {
    const timer = setTimeout(() => {
      setMode("closed");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <section id="about">

      <div className="about-text">
        <p className="about-small">MERHABA, BEN</p>

        <h1>Esmahan</h1>

        <h2>Frontend Developer</h2>

        <p>
          Modern ve kullanıcı odaklı web deneyimleri
          geliştirmeyi seviyorum.
        </p>
      </div>
      <div className="about-character">
        <img
        className="character-base"
        src="/img/character.png"
        alt="Esmahan"
        />
        <img
        className={`character-eyes ${mode}`}
        src={
  mode === "laptop"
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