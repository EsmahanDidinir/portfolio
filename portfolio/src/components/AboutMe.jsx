import { useState, useEffect } from "react";

function AboutMe() {
  // Karakterin gözlerinin hangi yöne baktığını belirler
  const [mode, setMode] = useState("laptop");

  // Typing sırasında kullanılacak karakter görseli
  // 1 → typing-1.png
  // 2 → typing-2.png
  const [typingFrame, setTypingFrame] = useState(1);

  // Normal göz kırpma durumu
  const [isBlinking, setIsBlinking] = useState(false);

  // Typing animasyonunun aktif olup olmadığını kontrol eder
  const [isTyping, setIsTyping] = useState(false);

  // İlk yazı
  const [displayName, setDisplayName] = useState("");

  // Yazı yazmaya başlanabilir mi?
  const [canWrite, setCanWrite] = useState(false);

  // İlk yazının tamamlanıp tamamlanmadığını kontrol eder
  const [nameFinished, setNameFinished] = useState(false);

  // İkinci yazı
  const [displayDescription, setDisplayDescription] = useState("");

  // İkinci yazının tamamlanıp tamamlanmadığını kontrol eder
  const [descriptionFinished, setDescriptionFinished] = useState(false);

  // Üçüncü yazı
  const [displayExperience, setDisplayExperience] = useState("");

  // Bütün yazıların tamamlanıp tamamlanmadığını kontrol eder
  const [isFinished, setIsFinished] = useState(false);

  // Finalde yapılacak göz kırpmasını kontrol eder
  const [isFinalBlink, setIsFinalBlink] = useState(false);


  // --------------------------------
  // TYPING HAREKETİ
  // --------------------------------
  // Karakter typing-1 ve typing-2 arasında geçiş yapar

  useEffect(() => {
    if (!isTyping) return;

    const timer = setInterval(() => {
      setTypingFrame((prev) => (prev === 1 ? 2 : 1));
    }, 500);

    // Component kapanırsa interval temizlenir
    return () => clearInterval(timer);
  }, [isTyping]);


  // --------------------------------
  // TYPING BAŞLANGICI
  // --------------------------------
  // Sayfa açıldıktan 500 ms sonra typing başlar

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  // --------------------------------
  // GÖZ KIRPMA
  // --------------------------------
  // Typing sırasında gözler rastgele aralıklarla kırpılır

  useEffect(() => {
    if (!isTyping || isFinished) return;

    let blinkTimer;
    let blinkEndTimer;

    const blink = () => {
      // Gözleri kapat
      setIsBlinking(true);

      // Gözleri 300 ms sonra aç
      blinkEndTimer = setTimeout(() => {
        setIsBlinking(false);
      }, 300);

      // Bir sonraki göz kırpma 2-4 saniye arasında
      const nextBlink = Math.random() * 2000 + 2000;

      blinkTimer = setTimeout(blink, nextBlink);
    };

    // İlk göz kırpma 2 saniye sonra
    blinkTimer = setTimeout(blink, 2000);

    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(blinkEndTimer);
    };
  }, [isTyping, isFinished]);


  // --------------------------------
  // YAZI BAŞLANGICI
  // --------------------------------
  // Typing başladıktan 1 saniye sonra yazı yazılmaya başlar

  useEffect(() => {
    if (!isTyping) return;

    const timer = setTimeout(() => {
      setCanWrite(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isTyping]);


  // --------------------------------
  // 1. YAZI
  // --------------------------------
  // "Hi, I'm Esmahan" harf harf yazılır

  useEffect(() => {
    if (!canWrite) return;

    const text = "Hi, I'm Esmahan";

    let index = 0;

    const timer = setInterval(() => {
      index++;

      setDisplayName(text.slice(0, index));

      // Yazı tamamen bittiyse
      // ikinci yazının başlamasına izin ver
      if (index >= text.length) {
        clearInterval(timer);
        setNameFinished(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [canWrite]);


  // --------------------------------
  // 2. YAZI
  // --------------------------------
  // İlk yazı bittikten sonra
  // Computer Engineer hakkındaki açıklama yazılır

  useEffect(() => {
    if (!nameFinished) return;

    const text =
      "I'm a Computer Engineer passionate about Artificial Intelligence and Full-Stack Development.";

    let index = 0;

    const timer = setInterval(() => {
      index++;

      setDisplayDescription(text.slice(0, index));

      // İkinci yazı tamamen bittiyse
      // üçüncü yazının başlamasına izin ver
      if (index >= text.length) {
        clearInterval(timer);
        setDescriptionFinished(true);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [nameFinished]);


  // --------------------------------
  // 3. YAZI
  // --------------------------------
  // İkinci yazı bittikten sonra
  // staj ve projeler hakkındaki açıklama yazılır

  useEffect(() => {
    if (!descriptionFinished) return;

    const text =
      "I've gained experience through internships and hands-on projects, and I'm always learning something new.";

    let index = 0;

    const timer = setInterval(() => {
      index++;

      setDisplayExperience(text.slice(0, index));

      // Üçüncü yazı tamamen bittiyse
      if (index >= text.length) {
        clearInterval(timer);
        setIsFinished(true);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [descriptionFinished]);


  // --------------------------------
  // YAZILAR BİTTİKTEN SONRA
  // FİNAL GÖZ KIRPMASI
  // --------------------------------
  // Bütün yazılar bittikten sonra
  // 1 saniye beklenir ve final göz kırpması başlar

  useEffect(() => {
    if (!isFinished) return;

    const blinkTimer = setTimeout(() => {
      setIsFinalBlink(true);
    }, 800);

    return () => clearTimeout(blinkTimer);
  }, [isFinished]);


  // --------------------------------
  // FİNAL GÖZ KIRPMASI BİTTİKTEN SONRA
  // ZİYARETÇİYE BAK
  // --------------------------------
  // Gözler 300 ms kapalı kalır.
  // Sonra açılır ve karakter ziyaretçiye bakar.

  useEffect(() => {
    if (!isFinalBlink) return;

    const timer = setTimeout(() => {
      setIsFinalBlink(false);
      setMode("viewer");
    }, 300);

    return () => clearTimeout(timer);
  }, [isFinalBlink]);


  // --------------------------------
  // JSX
  // --------------------------------

  return (
    <section id="about">

      {/* YAZI ALANI */}
      <div className="about-text">

        {/* 1. yazı */}
        <h1>{displayName}</h1>

        {/* 2. yazı */}
        <p>
          {displayDescription}
        </p>

        {/* 3. yazı */}
        <p>
          {displayExperience}
        </p>

      </div>


      {/* KARAKTER ALANI */}
      <div className="about-character">

        {/* Typing karakteri */}
        {/* Finalde de typing-1.png kullanılacak */}
        <img
          className="character-base typing-body"
          src={
            mode === "viewer"
              ? "/img/typing-1.png"
              : `/img/typing-${typingFrame}.png`
          }
          alt="Esmahan"
        />


        {/* Gözler */}
        <img
          className={`character-eyes ${mode} typing-${typingFrame}`}
          src={
            isBlinking || isFinalBlink
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

    </section>
  );
}

export default AboutMe;