"use strict";

// ─────────────────────────────── Curriculum ───────────────────────────────

const CURRICULUM = [
  {
    id: "greetings", title: "Greetings & Expressions", emoji: "👋",
    questions: [
      { en: "Hello / Good morning",        fr: "Bonjour",                hint: "Used any time of day until evening" },
      { en: "Good evening",                fr: "Bonsoir" },
      { en: "Goodbye",                     fr: "Au revoir" },
      { en: "See you soon",                fr: "À bientôt" },
      { en: "See you tomorrow",            fr: "À demain" },
      { en: "Thank you",                   fr: "Merci" },
      { en: "Thank you very much",         fr: "Merci beaucoup" },
      { en: "You're welcome",              fr: "De rien" },
      { en: "Please (formal)",             fr: "S'il vous plaît" },
      { en: "Excuse me",                   fr: "Excusez-moi" },
      { en: "Sorry / Pardon",              fr: "Pardon" },
      { en: "Yes",                         fr: "Oui" },
      { en: "No",                          fr: "Non" },
      { en: "How are you? (formal)",       fr: "Comment allez-vous ?" },
      { en: "I'm fine, thank you",         fr: "Je vais bien, merci" },
      { en: "My name is…",                 fr: "Je m'appelle…" },
      { en: "Nice to meet you",            fr: "Enchanté" },
      { en: "Good night",                  fr: "Bonne nuit" },
      { en: "Have a good day",             fr: "Bonne journée" },
      { en: "I don't understand",          fr: "Je ne comprends pas" },
    ]
  },
  {
    id: "numbers", title: "Numbers 1–20", emoji: "🔢",
    questions: [
      { en: "One",    fr: "Un" },   { en: "Two",     fr: "Deux" },
      { en: "Three",  fr: "Trois" },{ en: "Four",    fr: "Quatre" },
      { en: "Five",   fr: "Cinq" }, { en: "Six",     fr: "Six" },
      { en: "Seven",  fr: "Sept" }, { en: "Eight",   fr: "Huit" },
      { en: "Nine",   fr: "Neuf" }, { en: "Ten",     fr: "Dix" },
      { en: "Eleven", fr: "Onze" }, { en: "Twelve",  fr: "Douze" },
      { en: "Thirteen", fr: "Treize" }, { en: "Fourteen", fr: "Quatorze" },
      { en: "Fifteen",  fr: "Quinze" }, { en: "Sixteen",  fr: "Seize" },
      { en: "Seventeen", fr: "Dix-sept" }, { en: "Eighteen", fr: "Dix-huit" },
      { en: "Nineteen", fr: "Dix-neuf" }, { en: "Twenty",   fr: "Vingt" },
    ]
  },
  {
    id: "colors", title: "Colours", emoji: "🎨",
    questions: [
      { en: "Red",        fr: "Rouge" },  { en: "Blue",       fr: "Bleu" },
      { en: "Green",      fr: "Vert" },   { en: "Yellow",     fr: "Jaune" },
      { en: "Orange",     fr: "Orange" }, { en: "Purple",     fr: "Violet" },
      { en: "Pink",       fr: "Rose" },   { en: "Black",      fr: "Noir" },
      { en: "White",      fr: "Blanc" },  { en: "Brown",      fr: "Marron" },
      { en: "Grey",       fr: "Gris" },   { en: "Gold",       fr: "Doré" },
      { en: "Silver",     fr: "Argenté" },{ en: "Light blue", fr: "Bleu clair" },
      { en: "Dark green", fr: "Vert foncé" },
    ]
  },
  {
    id: "days", title: "Days & Time", emoji: "📅",
    questions: [
      { en: "Monday",    fr: "Lundi" },   { en: "Tuesday",   fr: "Mardi" },
      { en: "Wednesday", fr: "Mercredi" },{ en: "Thursday",  fr: "Jeudi" },
      { en: "Friday",    fr: "Vendredi" },{ en: "Saturday",  fr: "Samedi" },
      { en: "Sunday",    fr: "Dimanche" },{ en: "Today",     fr: "Aujourd'hui" },
      { en: "Yesterday", fr: "Hier" },    { en: "Tomorrow",  fr: "Demain" },
      { en: "Week",      fr: "Semaine" }, { en: "Weekend",   fr: "Week-end" },
      { en: "Morning",   fr: "Matin" },   { en: "Afternoon", fr: "Après-midi" },
      { en: "Evening",   fr: "Soir" },    { en: "Night",     fr: "Nuit" },
      { en: "Now",       fr: "Maintenant" },{ en: "Later",   fr: "Plus tard" },
      { en: "Always",    fr: "Toujours" },{ en: "Never",     fr: "Jamais" },
    ]
  },
  {
    id: "months", title: "Months & Seasons", emoji: "🗓️",
    questions: [
      { en: "January",   fr: "Janvier" }, { en: "February",  fr: "Février" },
      { en: "March",     fr: "Mars" },    { en: "April",     fr: "Avril" },
      { en: "May",       fr: "Mai" },     { en: "June",      fr: "Juin" },
      { en: "July",      fr: "Juillet" }, { en: "August",    fr: "Août" },
      { en: "September", fr: "Septembre" },{ en: "October",  fr: "Octobre" },
      { en: "November",  fr: "Novembre" },{ en: "December",  fr: "Décembre" },
      { en: "Spring",    fr: "Printemps" },{ en: "Summer",   fr: "Été" },
      { en: "Autumn",    fr: "Automne" }, { en: "Winter",    fr: "Hiver" },
    ]
  },
  {
    id: "family", title: "Family", emoji: "👨‍👩‍👧",
    questions: [
      { en: "Father",       fr: "Père" },      { en: "Mother",       fr: "Mère" },
      { en: "Brother",      fr: "Frère" },     { en: "Sister",       fr: "Sœur" },
      { en: "Son",          fr: "Fils" },      { en: "Daughter",     fr: "Fille" },
      { en: "Grandfather",  fr: "Grand-père" },{ en: "Grandmother",  fr: "Grand-mère" },
      { en: "Uncle",        fr: "Oncle" },     { en: "Aunt",         fr: "Tante" },
      { en: "Cousin (male)",fr: "Cousin" },    { en: "Cousin (female)", fr: "Cousine" },
      { en: "Husband",      fr: "Mari" },      { en: "Wife",         fr: "Femme" },
      { en: "Baby",         fr: "Bébé" },      { en: "Parents",      fr: "Parents" },
      { en: "Family",       fr: "Famille" },   { en: "Friend",       fr: "Ami" },
    ]
  },
  {
    id: "food", title: "Food & Drinks", emoji: "🥐",
    questions: [
      { en: "Bread",      fr: "Pain" },      { en: "Butter",     fr: "Beurre" },
      { en: "Milk",       fr: "Lait" },      { en: "Water",      fr: "Eau" },
      { en: "Coffee",     fr: "Café" },      { en: "Tea",        fr: "Thé" },
      { en: "Juice",      fr: "Jus" },       { en: "Wine",       fr: "Vin" },
      { en: "Cheese",     fr: "Fromage" },   { en: "Apple",      fr: "Pomme" },
      { en: "Banana",     fr: "Banane" },    { en: "Strawberry", fr: "Fraise" },
      { en: "Chicken",    fr: "Poulet" },    { en: "Fish",       fr: "Poisson" },
      { en: "Salad",      fr: "Salade" },    { en: "Cake",       fr: "Gâteau" },
      { en: "Chocolate",  fr: "Chocolat" },  { en: "Rice",       fr: "Riz" },
      { en: "Pasta",      fr: "Pâtes" },     { en: "Soup",       fr: "Soupe" },
    ]
  },
  {
    id: "animals", title: "Animals", emoji: "🐾",
    questions: [
      { en: "Dog",       fr: "Chien" },    { en: "Cat",      fr: "Chat" },
      { en: "Bird",      fr: "Oiseau" },   { en: "Horse",    fr: "Cheval" },
      { en: "Cow",       fr: "Vache" },    { en: "Pig",      fr: "Cochon" },
      { en: "Sheep",     fr: "Mouton" },   { en: "Lion",     fr: "Lion" },
      { en: "Tiger",     fr: "Tigre" },    { en: "Elephant", fr: "Éléphant" },
      { en: "Rabbit",    fr: "Lapin" },    { en: "Mouse",    fr: "Souris" },
      { en: "Duck",      fr: "Canard" },   { en: "Bee",      fr: "Abeille" },
      { en: "Butterfly", fr: "Papillon" }, { en: "Fish",     fr: "Poisson" },
      { en: "Snake",     fr: "Serpent" },  { en: "Frog",     fr: "Grenouille" },
    ]
  },
  {
    id: "body", title: "Body Parts", emoji: "🧍",
    questions: [
      { en: "Head",    fr: "Tête" },     { en: "Eye",     fr: "Œil" },
      { en: "Ear",     fr: "Oreille" },  { en: "Nose",    fr: "Nez" },
      { en: "Mouth",   fr: "Bouche" },   { en: "Tooth",   fr: "Dent" },
      { en: "Hand",    fr: "Main" },     { en: "Arm",     fr: "Bras" },
      { en: "Leg",     fr: "Jambe" },    { en: "Foot",    fr: "Pied" },
      { en: "Back",    fr: "Dos" },      { en: "Stomach", fr: "Ventre" },
      { en: "Heart",   fr: "Cœur" },     { en: "Finger",  fr: "Doigt" },
      { en: "Hair",    fr: "Cheveux" },  { en: "Face",    fr: "Visage" },
      { en: "Neck",    fr: "Cou" },      { en: "Shoulder",fr: "Épaule" },
    ]
  },
  {
    id: "phrases", title: "Common Phrases", emoji: "💬",
    questions: [
      { en: "Where is…?",             fr: "Où est… ?" },
      { en: "How much does it cost?", fr: "Combien ça coûte ?" },
      { en: "I would like…",          fr: "Je voudrais…" },
      { en: "Do you speak English?",  fr: "Parlez-vous anglais ?" },
      { en: "I speak a little French",fr: "Je parle un peu français" },
      { en: "I am hungry",            fr: "J'ai faim" },
      { en: "I am thirsty",           fr: "J'ai soif" },
      { en: "I am tired",             fr: "Je suis fatigué" },
      { en: "I am happy",             fr: "Je suis heureux" },
      { en: "I love France",          fr: "J'aime la France" },
      { en: "Happy birthday",         fr: "Bon anniversaire" },
      { en: "Congratulations!",       fr: "Félicitations !" },
      { en: "Good luck!",             fr: "Bonne chance !" },
      { en: "What time is it?",       fr: "Quelle heure est-il ?" },
      { en: "Help!",                  fr: "Au secours !" },
      { en: "I like French",          fr: "J'aime le français" },
      { en: "Cheers! (toast)",        fr: "Santé !" },
      { en: "It's beautiful",         fr: "C'est beau" },
      { en: "I don't know",           fr: "Je ne sais pas" },
      { en: "Of course!",             fr: "Bien sûr !" },
    ]
  }
];

const ACCENTS = ["é","è","ê","ë","à","â","ä","î","ï","ô","ù","û","ü","ç","œ","æ"];
const QUESTIONS_PER_SESSION = 10;

// ─────────────────────────────── State ────────────────────────────────────

const state = {
  topic:          null,
  questions:      [],
  index:          0,
  typingScore:    0,
  speakingScore:  0,
  results:        [],
  recognition:    null,
  frenchVoice:    null,
  speechSupported: false,
  currentSpoken:  "",
  micActive:      false,
};

// ─────────────────────────────── Elements ─────────────────────────────────

const el = {};

function cacheEls() {
  const ids = [
    "homeScreen","practiceScreen","summaryScreen",
    "topicGrid","exitBtn","pbarFill","qCounter",
    "questionCard","qText","qHint",
    "answerInput","clearInputBtn","accentBar",
    "micBtn","micLabel","speechPill","spokenText",
    "submitBtn","answerArea","feedbackPanel",
    "typingCell","typingIcon","typingPts",
    "speakingCell","speakingIcon","speakingPts",
    "correctAnswerBox","correctAnswer","playBtn","playIcon",
    "nextBtn",
    "trophyArea","finalPct","finalPts","scoreMsg","reviewList",
    "retryBtn","homeBtn"
  ];
  ids.forEach(id => { el[id] = document.getElementById(id); });
}

// ─────────────────────────────── Init ─────────────────────────────────────

function init() {
  cacheEls();
  setupSpeech();
  renderTopics();
  bindEvents();
}

// ─────────────────────────────── Speech ───────────────────────────────────

function setupSpeech() {
  // Synthesis
  if (window.speechSynthesis) {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      state.frenchVoice = voices.find(v => v.lang.startsWith("fr")) || null;
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  // Recognition
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    state.speechSupported = true;
    state.recognition = new SR();
    state.recognition.lang = "fr-FR";
    state.recognition.continuous = false;
    state.recognition.interimResults = false;

    state.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      state.currentSpoken = transcript;
      el.spokenText.textContent = transcript;
      el.speechPill.classList.remove("hidden");
      stopMic();
    };
    state.recognition.onerror = () => { stopMic(); };
    state.recognition.onend   = () => { stopMic(); };
  }
}

function speak(text) {
  if (!window.speechSynthesis) { return; }
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "fr-FR";
  utt.rate = 0.82;
  if (state.frenchVoice) { utt.voice = state.frenchVoice; }

  el.playBtn.classList.add("speaking");
  el.playIcon.textContent = "⏸";
  utt.onend = () => {
    el.playBtn.classList.remove("speaking");
    el.playIcon.textContent = "▶";
  };
  window.speechSynthesis.speak(utt);
}

function startMic() {
  if (!state.recognition) { return; }
  state.currentSpoken = "";
  el.speechPill.classList.add("hidden");
  el.spokenText.textContent = "—";
  state.micActive = true;
  el.micBtn.classList.add("recording");
  el.micLabel.textContent = "Listening…";
  try { state.recognition.start(); } catch (_) { stopMic(); }
}

function stopMic() {
  state.micActive = false;
  el.micBtn.classList.remove("recording");
  el.micLabel.textContent = "Tap to speak";
  try { state.recognition.stop(); } catch (_) {}
}

// ─────────────────────────────── Topics ───────────────────────────────────

function renderTopics() {
  el.topicGrid.innerHTML = "";
  CURRICULUM.forEach(topic => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "topic-card";
    card.innerHTML = `
      <div class="topic-emoji">${topic.emoji}</div>
      <div class="topic-title">${topic.title}</div>
      <div class="topic-count">${topic.questions.length} questions</div>
    `;
    card.addEventListener("click", () => startSession(topic));
    el.topicGrid.appendChild(card);
  });
}

// ─────────────────────────────── Session ──────────────────────────────────

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startSession(topic) {
  state.topic       = topic;
  state.questions   = shuffle(topic.questions).slice(0, QUESTIONS_PER_SESSION);
  state.index       = 0;
  state.typingScore  = 0;
  state.speakingScore = 0;
  state.results     = [];

  showScreen("practiceScreen");
  buildAccentBar();
  showQuestion();
}

function showQuestion() {
  const q = state.questions[state.index];
  const total = state.questions.length;

  // progress
  el.pbarFill.style.width = `${(state.index / total) * 100}%`;
  el.qCounter.textContent = `${state.index + 1}/${total}`;

  // question
  el.qText.textContent  = q.en;
  el.qHint.textContent  = q.hint || "";

  // reset input
  el.answerInput.value  = "";
  state.currentSpoken   = "";
  el.spokenText.textContent = "—";
  el.speechPill.classList.add("hidden");
  stopMic();

  // show/hide panels
  el.answerArea.classList.remove("hidden");
  el.feedbackPanel.classList.add("hidden");

  // speech not supported notice
  if (!state.speechSupported) {
    el.micBtn.disabled = true;
    el.micBtn.title = "Speech recognition not supported in this browser";
    el.micLabel.textContent = "Not available";
  }

  el.answerInput.focus();
}

// ─────────────────────────────── Evaluation ───────────────────────────────

function normalizeStr(s) {
  return s
    .toLowerCase()
    .replace(/[àâä]/g, "a")
    .replace(/[éèêë]/g, "e")
    .replace(/[îï]/g, "i")
    .replace(/[ôö]/g, "o")
    .replace(/[ùûü]/g, "u")
    .replace(/ç/g, "c")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/[''…]/g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function evalTyping(typed, correct) {
  if (!typed) { return { status: "wrong", pts: 0 }; }
  if (typed.toLowerCase() === correct.toLowerCase()) {
    return { status: "correct", pts: 5 };
  }
  if (normalizeStr(typed) === normalizeStr(correct)) {
    return { status: "partial", pts: 3, note: "Correct — but check your accents!" };
  }
  return { status: "wrong", pts: 0 };
}

function evalSpeaking(spoken, correct) {
  if (!spoken) { return { status: "skipped", pts: 0 }; }
  if (spoken.toLowerCase() === correct.toLowerCase() ||
      normalizeStr(spoken) === normalizeStr(correct)) {
    return { status: "correct", pts: 5 };
  }
  return { status: "wrong", pts: 0, note: `Heard: "${spoken}"` };
}

// ─────────────────────────────── Submit ───────────────────────────────────

function submitAnswer() {
  const q = state.questions[state.index];
  const typed  = el.answerInput.value.trim();
  const spoken = state.currentSpoken;

  const typing   = evalTyping(typed, q.fr);
  const speaking = evalSpeaking(spoken, q.fr);

  state.typingScore   += typing.pts;
  state.speakingScore += speaking.pts;

  state.results.push({ q, typed, spoken, typing, speaking });

  showFeedback(q, typing, speaking);
}

// ─────────────────────────────── Feedback ─────────────────────────────────

const STATUS_ICON = {
  correct: "✅", partial: "⚠️", wrong: "❌", skipped: "⏭️"
};
const STATUS_COLOR = {
  correct: "correct", partial: "partial", wrong: "wrong", skipped: "skipped"
};

function showFeedback(q, typing, speaking) {
  el.answerArea.classList.add("hidden");
  el.feedbackPanel.classList.remove("hidden");

  // typing cell
  el.typingCell.className = `result-cell ${STATUS_COLOR[typing.status]}`;
  el.typingIcon.textContent = STATUS_ICON[typing.status];
  el.typingPts.textContent  = `${typing.pts}/5 pts`;

  // speaking cell
  el.speakingCell.className = `result-cell ${STATUS_COLOR[speaking.status]}`;
  el.speakingIcon.textContent = STATUS_ICON[speaking.status];
  el.speakingPts.textContent  = speaking.status === "skipped"
    ? "Not attempted"
    : `${speaking.pts}/5 pts`;

  // correct answer box
  el.correctAnswer.textContent = q.fr;

  // reset play button
  el.playBtn.classList.remove("speaking");
  el.playIcon.textContent = "▶";
}

// ─────────────────────────────── Navigation ───────────────────────────────

function nextQuestion() {
  window.speechSynthesis && window.speechSynthesis.cancel();
  state.index++;
  if (state.index >= state.questions.length) {
    showSummary();
  } else {
    showQuestion();
  }
}

// ─────────────────────────────── Summary ──────────────────────────────────

function showSummary() {
  const total   = state.questions.length;
  const maxPts  = total * 10;
  const earned  = state.typingScore + state.speakingScore;
  const pct     = Math.round((earned / maxPts) * 100);

  el.finalPct.textContent = `${pct}%`;
  el.finalPts.textContent = `${earned} / ${maxPts} pts`;

  const msgs = [
    [90, "Magnifique! 🥇 Outstanding French!"],
    [70, "Très bien! 🥈 Great work!"],
    [50, "Pas mal! 🥉 Keep practising!"],
    [0,  "Continue d'essayer! 💪 Don't give up!"]
  ];
  const trophy = pct >= 90 ? "🏆" : pct >= 70 ? "🥈" : pct >= 50 ? "🥉" : "📚";
  el.trophyArea.textContent = trophy;
  el.scoreMsg.textContent = msgs.find(([min]) => pct >= min)[1];

  el.reviewList.innerHTML = "";
  state.results.forEach(({ q, typing, speaking }) => {
    const row = document.createElement("div");
    row.className = "review-item";
    const ptsEarned = typing.pts + speaking.pts;
    const ptsCls = ptsEarned >= 8 ? "pts-full" : ptsEarned >= 4 ? "pts-partial" : "pts-zero";
    row.innerHTML = `
      <span class="review-icon">${STATUS_ICON[typing.status]}</span>
      <span class="review-en">${q.en}</span>
      <span class="review-fr">${q.fr}</span>
      <span class="review-pts ${ptsCls}">${ptsEarned}/10</span>
    `;
    el.reviewList.appendChild(row);
  });

  // progress bar to 100%
  el.pbarFill.style.width = "100%";

  showScreen("summaryScreen");
}

// ─────────────────────────────── Accent bar ───────────────────────────────

function buildAccentBar() {
  el.accentBar.innerHTML = "";
  ACCENTS.forEach(ch => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "acc-btn";
    btn.textContent = ch;
    btn.title = `Insert "${ch}"`;
    btn.addEventListener("click", () => insertAccent(ch));
    el.accentBar.appendChild(btn);
  });
}

function insertAccent(ch) {
  const input = el.answerInput;
  const start = input.selectionStart;
  const end   = input.selectionEnd;
  const val   = input.value;
  input.value = val.slice(0, start) + ch + val.slice(end);
  input.selectionStart = input.selectionEnd = start + ch.length;
  input.focus();
}

// ─────────────────────────────── Screen helper ────────────────────────────

function showScreen(id) {
  ["homeScreen","practiceScreen","summaryScreen"].forEach(sid => {
    el[sid].classList.remove("active");
  });
  el[id].classList.add("active");
}

// ─────────────────────────────── Events ───────────────────────────────────

function bindEvents() {
  el.exitBtn.addEventListener("click", () => {
    window.speechSynthesis && window.speechSynthesis.cancel();
    stopMic();
    showScreen("homeScreen");
  });

  el.clearInputBtn.addEventListener("click", () => {
    el.answerInput.value = "";
    el.answerInput.focus();
  });

  el.micBtn.addEventListener("click", () => {
    if (!state.speechSupported) { return; }
    if (state.micActive) { stopMic(); } else { startMic(); }
  });

  el.submitBtn.addEventListener("click", submitAnswer);

  el.answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { submitAnswer(); }
  });

  el.playBtn.addEventListener("click", () => {
    const q = state.questions[state.index];
    speak(q.fr);
  });

  el.nextBtn.addEventListener("click", nextQuestion);

  el.retryBtn.addEventListener("click", () => {
    startSession(state.topic);
  });

  el.homeBtn.addEventListener("click", () => {
    window.speechSynthesis && window.speechSynthesis.cancel();
    showScreen("homeScreen");
  });
}

// ─────────────────────────────── Start ────────────────────────────────────

document.addEventListener("DOMContentLoaded", init);
