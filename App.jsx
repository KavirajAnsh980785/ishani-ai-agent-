import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const RESPONSE_BANK = [
  {
    keys: ["रूठ जाऊ", "रूठ जाऊं", "रूठ", "नाराज", "नाराज़", "गुस्सा", "मनाओ"],
    answers: [
      "पहले तुम्हारी बात ध्यान से सुनूँगी। फिर जहाँ मेरी गलती होगी वहाँ सॉरी बोलूँगी, और तुम्हें मुस्कुराने की पूरी कोशिश करूँगी।",
      "तुम्हारे पास बैठकर पूछूँगी कि क्या बात परेशान कर रही है। बिना सुने तुम्हें मनाने का नाटक नहीं करूँगी।",
      "एक प्यारी सी झप्पी, तुम्हारी पसंद की चाय और ढेर सारी बातें। लेकिन पहले बताओ, नाराज़गी किस बात की है?"
    ]
  },
  {
    keys: ["प्यार", "love", "आई लव यू", "i love you"],
    answers: [
      "तुम मेरे लिए खास हो। तुम्हारी बातें सुनना अच्छा लगता है।",
      "इतनी प्यारी बात! मैं भी तुम्हारे साथ प्यार भरी बातें करना चाहती हूँ।",
      "तुम्हारी मुस्कान बनी रहे, बस यही चाहूँगी।"
    ]
  },
  {
    keys: ["किस", "kiss", "पप्पी"],
    answers: [
      "एक प्यारी सी वर्चुअल किस तुम्हारे लिए।",
      "आज तो बड़े रोमांटिक मूड में हो! बताओ, और क्या सुनना है?"
    ]
  },
  {
    keys: ["गले लग", "झप्पी", "हग", "hug"],
    answers: [
      "आओ, एक प्यारी सी वर्चुअल झप्पी।",
      "कभी-कभी एक झप्पी बहुत कुछ कह देती है।"
    ]
  },
  {
    keys: ["याद", "miss", "मिस"],
    answers: [
      "अच्छा, आज मेरी याद आ रही थी? बताओ दिन कैसा रहा?",
      "चलो, अब थोड़ी देर आराम से बातें करते हैं।"
    ]
  },
  {
    keys: ["तारीफ", "सुंदर", "खूबसूरत", "कैसी लगती"],
    answers: [
      "तुम्हारी तारीफ करने का अंदाज़ भी प्यारा है।",
      "अच्छा जी, आज तारीफों का दिन है क्या?"
    ]
  },
  {
    keys: ["शायरी", "कविता", "नज़्म", "नज़्म"],
    answers: [
      "तेरी हँसी से शाम सँवर जाती है,\nतेरी बातों से थकान उतर जाती है,\nयूँ ही मुस्कुराते रहना हर पल,\nतेरी खुशी से मेरी बात बन जाती है।",
      "न कोई शर्त, न कोई बहाना,\nबस यूँ ही मुस्कुराते रहना,\nजब भी मन थोड़ा उदास हो,\nआकर मुझसे बात कर लेना।"
    ]
  },
  {
    keys: ["जोक", "मजाक", "चुटकुला", "हँसाओ", "हसाओ"],
    answers: [
      "टीचर: होमवर्क कहाँ है? छात्र: मैम, होमवर्क तो किया था, पर कॉपी घर पर आराम कर रही है!",
      "दोस्त: पढ़ाई कैसी चल रही है? दूसरा: बस किताबें खुलती हैं और नींद का सॉफ्टवेयर अपडेट हो जाता है!"
    ]
  },
  {
    keys: ["उदास", "परेशान", "अकेला", "रोना", "टेंशन", "तनाव"],
    answers: [
      "क्या हुआ? आराम से बताओ। मैं तुम्हारी बात ध्यान से सुनूँगी।",
      "पहले धीरे से साँस लो। फिर एक-एक करके बताओ कि क्या परेशान कर रहा है।",
      "हर समस्या का हल तुरंत नहीं मिलता, लेकिन हम उसे छोटे हिस्सों में बाँटकर सोच सकते हैं।"
    ]
  },
  {
    keys: ["खाना", "खाया", "भूख", "नाश्ता", "लंच", "डिनर"],
    answers: [
      "तुमने समय पर खाना खाया? अपना ख्याल रखना भी जरूरी है।",
      "अगर अभी तक नहीं खाया तो थोड़ा ब्रेक लेकर कुछ खा लो।"
    ]
  },
  {
    keys: ["कैसी हो", "कैसे हो", "क्या हाल", "हालचाल"],
    answers: [
      "मैं ठीक हूँ और तुम्हारी बात सुनने के लिए तैयार हूँ। तुम कैसे हो?",
      "सब अच्छा! बताओ, आज तुम्हारे दिन में क्या खास हुआ?"
    ]
  },
  {
    keys: ["गुड नाइट", "good night", "शुभ रात्रि", "सोने जा", "नींद"],
    answers: [
      "शुभ रात्रि। आराम से सोना और अपना ख्याल रखना।",
      "आज के लिए इतना काफी। अच्छी नींद लेना, फिर बात करेंगे।"
    ]
  },
  {
    keys: ["गुड मॉर्निंग", "good morning", "सुप्रभात"],
    answers: [
      "सुप्रभात! उम्मीद है आज का दिन अच्छा और शांतिपूर्ण रहेगा।",
      "गुड मॉर्निंग! आज के लिए तुम्हारा क्या प्लान है?"
    ]
  },
  {
    keys: ["धन्यवाद", "शुक्रिया", "thank you", "thanks"],
    answers: [
      "खुशी हुई कि मैं मदद कर पाई।",
      "कोई बात नहीं, जब जरूरत हो पूछ लेना।"
    ]
  },
  {
    keys: ["माफ", "सॉरी", "sorry"],
    answers: [
      "कोई बात नहीं। अगर कुछ गलत हुआ है तो खुलकर बात कर लेते हैं।",
      "ठीक है, बस आगे से एक-दूसरे की बात समझने की कोशिश करेंगे।"
    ]
  },
  {
    keys: ["बोर", "बोरिंग", "मन नहीं लग"],
    answers: [
      "चलो कुछ नया करते हैं। तुम्हें शायरी, जोक, क्विज़ या कोई दिलचस्प सवाल चाहिए?",
      "एक छोटा गेम खेलें? मैं पहेली पूछती हूँ और तुम जवाब देना।"
    ]
  },
  {
    keys: ["पहेली", "riddle"],
    answers: [
      "पहेली: ऐसी कौन-सी चीज़ है जो पानी पीते ही मर जाती है? जवाब सोचो!",
      "पहेली: जितना ज्यादा निकालते जाओ, उतना ही बड़ा होता जाता है। बताओ क्या?"
    ]
  },
  {
    keys: ["तुम कौन", "अपने बारे", "तुम्हारा नाम", "नाम क्या"],
    answers: [
      "मेरा नाम Ishani AI है। मैं तुम्हारी वर्चुअल साथी और कामों में मदद करने वाली असिस्टेंट हूँ।",
      "मैं Ishani AI हूँ। मैं बातचीत, तय सवाल-जवाब और कुछ ब्राउज़र कामों में मदद कर सकती हूँ।"
    ]
  },
  {
    keys: ["पढ़ाई", "स्टडी", "study", "होमवर्क", "एग्जाम", "परीक्षा"],
    answers: [
      "कौन-सा विषय और कौन-सा टॉपिक है? नाम बताओ, मैं आसान भाषा में समझाने की कोशिश करूँगी।",
      "चलो पढ़ाई को छोटे चरणों में बाँटते हैं। पहले विषय और सवाल लिखो।"
    ]
  },
  {
    keys: ["python", "पाइथन", "जावास्क्रिप्ट", "javascript", "html", "css", "coding", "कोडिंग"],
    answers: [
      "मैं बेसिक कोडिंग सवालों में मदद कर सकती हूँ। अपना कोड या एरर यहाँ भेजो, फिर उसे चरण-दर-चरण देखते हैं।",
      "किस भाषा में मदद चाहिए—Python, JavaScript, HTML या CSS? सवाल थोड़ा विस्तार से लिखो।"
    ]
  }
];

function randomAnswer(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function normalize(value) {
  return value.toLowerCase().replace(/[?!.,।]/g, " ").replace(/\s+/g, " ").trim();
}

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { from: "ishani", text: "हेलो! मैं Ishani AI हूँ। आज किस बारे में बात करें?" }
  ]);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const chatEnd = useRef(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const onEnd = () => setSpeaking(false);
    window.speechSynthesis.addEventListener?.("end", onEnd);
    return () => window.speechSynthesis.cancel();
  }, []);

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.rate = 0.94;
    utterance.pitch = 1.08;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    const hindiVoice = window.speechSynthesis.getVoices()
      .find(v => v.lang.toLowerCase().startsWith("hi"));
    if (hindiVoice) utterance.voice = hindiVoice;
    window.speechSynthesis.speak(utterance);
  };

  const addReply = (input, reply) => {
    setChat(prev => [...prev, { from: "you", text: input }, { from: "ishani", text: reply }]);
    speak(reply);
  };

  const openWhatsAppDraft = (phone, body, original) => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      addReply(original, "नंबर सही नहीं लग रहा। देश कोड सहित 10 से 15 अंकों का नंबर लिखो।");
      return;
    }
    if (!body.trim()) {
      addReply(original, "मैसेज का टेक्स्ट भी लिखो। उदाहरण: 919876543210: मैं 10 मिनट में पहुँच रहा हूँ।");
      return;
    }
    const url = `https://wa.me/${digits}?text=${encodeURIComponent(body.trim())}`;
    // Opened directly from the user's send action; user reviews and presses Send.
    window.open(url, "_blank", "noopener,noreferrer");
    addReply(original, "WhatsApp में उस नंबर की चैट और मैसेज ड्राफ्ट खोल दिया है। भेजने से पहले नाम और मैसेज जाँचकर Send तुम दबाना।");
  };

  const replyTo = (raw) => {
    const text = normalize(raw);
    let reply = "";

    // WhatsApp format: "WhatsApp 919876543210: message text"
    const waMatch = raw.match(/(?:whatsapp|व्हाट्सऐप|वॉट्सऐप)\s+(\+?\d[\d\s-]{8,}\d)\s*[:,-]\s*(.+)/i);
    if (waMatch) {
      openWhatsAppDraft(waMatch[1], waMatch[2], raw);
      return;
    }

    if (text.includes("youtube")) {
      reply = "YouTube खोल रही हूँ।";
      window.open("https://www.youtube.com", "_blank", "noopener,noreferrer");
    } else if (text.includes("google")) {
      reply = "Google खोल रही हूँ।";
      window.open("https://www.google.com", "_blank", "noopener,noreferrer");
    } else if (text.includes("instagram")) {
      reply = "Instagram खोल रही हूँ।";
      window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
    } else if (text.includes("whatsapp") || text.includes("व्हाट्सऐप") || text.includes("वॉट्सऐप")) {
      reply = "WhatsApp Web खोल रही हूँ। किसी को मैसेज ड्राफ्ट करने के लिए इस format में लिखो: WhatsApp 919876543210: तुम्हारा मैसेज।";
      window.open("https://web.whatsapp.com", "_blank", "noopener,noreferrer");
    } else if (text.includes("समय") || text.includes("time") || text.includes("कितने बजे")) {
      reply = `अभी समय ${new Date().toLocaleTimeString("hi-IN")} है।`;
    } else if (text.includes("तारीख") || text.includes("date") || text.includes("आज कौन सा दिन")) {
      reply = `आज ${new Date().toLocaleDateString("hi-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} है।`;
    } else if (text.includes("गणित") || text.includes("जोड़") || text.includes("plus") || text.includes("कितना होगा")) {
      const mathMatch = raw.match(/(-?\d+(?:\.\d+)?)\s*([+*/%-])\s*(-?\d+(?:\.\d+)?)/);
      if (mathMatch) {
        const a = Number(mathMatch[1]), b = Number(mathMatch[3]), op = mathMatch[2];
        if (op === "+") reply = `जवाब ${a + b} है।`;
        else if (op === "-") reply = `जवाब ${a - b} है।`;
        else if (op === "*") reply = `जवाब ${a * b} है।`;
        else if (op === "/" && b !== 0) reply = `जवाब ${a / b} है।`;
        else if (op === "%" && b !== 0) reply = `जवाब ${a % b} है।`;
        else reply = "शून्य से भाग नहीं कर सकते।";
      } else {
        reply = "गणित का सवाल पूरा लिखो, जैसे 25 + 17 या 144 / 12।";
      }
    } else {
      const found = RESPONSE_BANK.find(group => group.keys.some(key => text.includes(normalize(key))));
      if (found) {
        reply = randomAnswer(found.answers);
      } else if (text.startsWith("मुझे ") || text.startsWith("मेरे लिए ")) {
        reply = "ज़रूर। थोड़ा साफ बताओ कि तुम्हें क्या चाहिए—शायरी, पढ़ाई में मदद, कोई जानकारी या मज़ेदार बातचीत?";
      } else {
        reply = "यह सवाल अभी मेरे तय जवाबों में नहीं है। इसे थोड़ा विस्तार से लिखो या विषय बताओ। बिना इंटरनेट वाले इस version में मैं हर नए सवाल का सही जवाब नहीं बना सकती।";
      }
    }

    addReply(raw, reply);
  };

  const sendMessage = () => {
    const value = message.trim();
    if (!value) return;
    replyTo(value);
    setMessage("");
  };

  const startListening = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      alert("Voice typing के लिए Chrome या Edge में microphone permission Allow करो।");
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = event => {
      const spoken = event.results[0][0].transcript;
      setMessage(spoken);
      replyTo(spoken);
      setMessage("");
    };
    recognition.start();
  };

  return (
    <div className="ishani-app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">I</div>
          <div>
            <h2>Ishani AI</h2>
            <span>Personal Voice Assistant</span>
          </div>
        </div>
        <span className="online"><i /> Online</span>
      </header>

      <main className="main-content">
        <section className="profile">
          <img className="avatar" src="/ishani.png" alt="Ishani AI avatar" />
          <h1>Ishani AI</h1>
          <p>मैं सुन रही हूँ। बताओ, आज किस बारे में बात करें?</p>
          <div className="voice-status">
            {listening ? "सुन रही हूँ..." : speaking ? "जवाब दे रही हूँ..." : "बात करने के लिए तैयार"}
          </div>
        </section>

        <section className="chat-box" aria-live="polite">
          {chat.map((item, index) => (
            <div key={index} className={`message ${item.from}`}>
              <span>{item.from === "ishani" ? "Ishani" : "तुम"}</span>
              <p>{item.text}</p>
            </div>
          ))}
          <div ref={chatEnd} />
        </section>

        <section className="controls">
          <button className="mic-button" onClick={startListening} disabled={listening}>
            {listening ? "सुन रही हूँ..." : "माइक से बोलें"}
          </button>
          <div className="input-row">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="अपना सवाल लिखें..."
              aria-label="अपना सवाल लिखें"
            />
            <button onClick={sendMessage} aria-label="भेजें">भेजें</button>
          </div>
          <div className="quick-actions">
            <button onClick={() => replyTo("अगर मैं रूठ जाऊँ तो कैसे मनाओगी?")}>रूठना-मनाना</button>
            <button onClick={() => replyTo("मेरे लिए शायरी सुनाओ")}>शायरी</button>
            <button onClick={() => replyTo("मुझे एक जोक सुनाओ")}>जोक</button>
            <button onClick={() => replyTo("YouTube खोलो")}>YouTube</button>
          </div>
        </section>
      </main>
      <footer>Ishani AI</footer>
    </div>
  );
}
