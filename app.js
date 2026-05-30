"use strict";

const DB_NAME = "algbrox_mvp";
const DB_VERSION = 2;

const THEME_PACKS = [
  { id: "jungle", name: "Jungle Run", preview: "linear-gradient(135deg,#57b06f,#d6f1bb)" },
  { id: "sky", name: "Sky Blocks", preview: "linear-gradient(135deg,#81d3f8,#f1fcff)" },
  { id: "neon", name: "Neon City", preview: "linear-gradient(135deg,#2de5d8,#fdf6b2)" },
  { id: "candy", name: "Candy Track", preview: "linear-gradient(135deg,#ffb7cb,#fff2c6)" },
  { id: "space", name: "Space Rail", preview: "linear-gradient(135deg,#4f87d9,#d7e2ff)" },
  { id: "desert", name: "Desert Ruins", preview: "linear-gradient(135deg,#f5b267,#fff3d4)" }
];

const ACCESSORY_ICONS = {
  none: "", crown: "♛", bow: "🎀", headband: "─", cat_ears: "◢◤",
  flower: "✿", cap: "🧢", star_clips: "★", headphones: "🎧", tiara: "♕"
};

const HAIR_STYLES = [
  { id: "long_straight", label: "Long Straight", gender: "girl" },
  { id: "ponytail",      label: "Ponytail",       gender: "girl" },
  { id: "pigtails",      label: "Pigtails",       gender: "girl" },
  { id: "bob",           label: "Bob Cut",         gender: "girl" },
  { id: "wavy_long",     label: "Wavy Long",       gender: "girl" },
  { id: "top_bun",       label: "Top Bun",         gender: "girl" },
  { id: "braids",        label: "Side Braids",     gender: "girl" },
  { id: "short_messy",   label: "Short & Messy",   gender: "boy"  },
  { id: "slicked_back",  label: "Slicked Back",    gender: "boy"  },
  { id: "mohawk",        label: "Mohawk",          gender: "boy"  }
];

const RESOURCE_CLIPS = [
  { skillTag: "mixed",            label: "Order of Operations",              chapter: null, url: "https://youtu.be/dAgfnK528RA" },
  { skillTag: "signed",           label: "Negative Numbers",                 chapter: null, url: "https://youtu.be/OAoLCXpao6s" },
  { skillTag: "add_sub",          label: "Adding & Subtracting Integers",    chapter: null, url: "https://youtu.be/_BgblvF90UE" },
  { skillTag: "mul_div",          label: "Integer Multiplication & Division",chapter: null, url: "https://youtu.be/K_tPbVPfHgk" },
  { skillTag: "exp_root",         label: "Intro To Exponents",               chapter: null, url: "https://youtu.be/-zUmvpkhvW8" },
  { skillTag: "exp_root",         label: "Exponents and Square Roots",       chapter: null, url: "https://youtu.be/B4zejSI8zho" },
  { skillTag: "exp_root",         label: "Simplifying Square Roots",         chapter: null, url: "https://youtu.be/2mejAHKMBiM" },
  { skillTag: "grouping",         label: "Distributive Property",            chapter: null, url: "https://youtu.be/v-6MShC82ow" },
  { skillTag: "ch1_patterns",     label: "Number Patterns",                  chapter: "Ch 1: Patterns in Mathematics",       url: "https://www.youtube.com/watch?v=vV7C7bXm4VI" },
  { skillTag: "ch2_angles",       label: "Points, Lines & Planes",           chapter: "Ch 2: Lines and Angles",              url: "https://www.youtube.com/watch?v=k5etrWdIY6o" },
  { skillTag: "ch2_angles",       label: "Angle Basics",                     chapter: "Ch 2: Lines and Angles",              url: "https://www.youtube.com/watch?v=DGKwdHMiqCg" },
  { skillTag: "ch2_angles",       label: "Angles & Degrees",                 chapter: "Ch 2: Lines and Angles",              url: "https://www.youtube.com/watch?v=_n3KZR1DSEo" },
  { skillTag: "ch3_numplay",      label: "Place Value",                      chapter: "Ch 3: Number Play",                   url: "https://www.youtube.com/watch?v=T5Qf0qSSJFI" },
  { skillTag: "ch3_numplay",      label: "The Number Line",                  chapter: "Ch 3: Number Play",                   url: "https://www.youtube.com/live/RSJOTBJlKNA" },
  { skillTag: "ch3_numplay",      label: "Basic Inequalities",               chapter: "Ch 3: Number Play",                   url: "https://www.youtube.com/watch?v=mgHO-bsCDrA" },
  { skillTag: "ch4_data",         label: "Data and Graphs",                  chapter: "Ch 4: Data Handling",                 url: "https://www.youtube.com/watch?v=hcgThf5mv38" },
  { skillTag: "ch4_data",         label: "Mean, Median and Mode",            chapter: "Ch 4: Data Handling",                 url: "https://www.youtube.com/watch?v=B1HEzNTGeZ4" },
  { skillTag: "ch5_prime",        label: "Factoring",                        chapter: "Ch 5: Prime Time",                    url: "https://www.youtube.com/watch?v=0NvLtTwnUHs" },
  { skillTag: "ch5_prime",        label: "Prime Factorization",              chapter: "Ch 5: Prime Time",                    url: "https://www.youtube.com/watch?v=XGbOiYhHY2c" },
  { skillTag: "ch5_prime",        label: "Greatest Common Factor (GCF)",     chapter: "Ch 5: Prime Time",                    url: "https://www.youtube.com/watch?v=CUEOL3_Wm3Y" },
  { skillTag: "ch5_prime",        label: "Least Common Multiple (LCM)",      chapter: "Ch 5: Prime Time",                    url: "https://www.youtube.com/watch?v=SXPsfr-Fnu4" },
  { skillTag: "ch6_perimarea",    label: "Perimeter",                        chapter: "Ch 6: Perimeter & Area",              url: "https://www.youtube.com/watch?v=AAY1bsazcgM" },
  { skillTag: "ch6_perimarea",    label: "Area",                             chapter: "Ch 6: Perimeter & Area",              url: "https://www.youtube.com/watch?v=xCdxURXMdFY" },
  { skillTag: "ch7_fractions",    label: "What Are Fractions?",              chapter: "Ch 7: Fractions",                     url: "https://www.youtube.com/watch?v=I1u3pM9g9o8" },
  { skillTag: "ch7_fractions",    label: "Fractions on the Number Line",     chapter: "Ch 7: Fractions",                     url: "https://www.youtube.com/watch?v=pWJzqTYS8no" },
  { skillTag: "ch8_constructions",label: "Lines, Rays & Segments",           chapter: "Ch 8: Constructions",                 url: "https://www.youtube.com/watch?v=k5etrWdIY6o" },
  { skillTag: "ch8_constructions",label: "Angle Basics (for Constructions)", chapter: "Ch 8: Constructions",                 url: "https://www.youtube.com/watch?v=DGKwdHMiqCg" },
  { skillTag: "ch9_symmetry",     label: "Symmetry",                         chapter: "Ch 9: Symmetry",                      url: "https://www.youtube.com/watch?v=QHq3CSoal0I" },
  { skillTag: "ch10_integers",    label: "Negative Numbers",                 chapter: "Ch 10: The Other Side of Zero",       url: "https://www.youtube.com/watch?v=OAoLCXpao6s" },
  { skillTag: "ch10_integers",    label: "Adding & Subtracting Integers",    chapter: "Ch 10: The Other Side of Zero",       url: "https://www.youtube.com/watch?v=_BgblvF90UE" }
];

const SKILL_LABELS = {
  add_sub:           "Add/Sub",
  mul_div:           "Multiply/Divide",
  exp_root:          "Exponents/Roots",
  grouping:          "Grouping",
  mixed:             "Mixed Precedence",
  signed:            "Signed Numbers",
  algebra:           "Algebra Solver",
  systems:           "2-Variable Systems",
  ch1_patterns:      "Ch 1: Patterns in Mathematics",
  ch2_angles:        "Ch 2: Lines and Angles",
  ch3_numplay:       "Ch 3: Number Play",
  ch4_data:          "Ch 4: Data Handling",
  ch5_prime:         "Ch 5: Prime Time",
  ch6_perimarea:     "Ch 6: Perimeter & Area",
  ch7_fractions:     "Ch 7: Fractions",
  ch8_constructions: "Ch 8: Constructions",
  ch9_symmetry:      "Ch 9: Symmetry",
  ch10_integers:     "Ch 10: The Other Side of Zero"
};

const COURSE_DEFS = [
  { id: "course1", name: "Course 1: + and − Fluency", skills: ["add_sub"] },
  { id: "course2", name: "Course 2: × and ÷ Fluency", skills: ["mul_div"] },
  { id: "course3", name: "Course 3: Exponents and Roots", skills: ["exp_root"] },
  { id: "course4", name: "Course 4: Grouping Symbols", skills: ["grouping"] },
  { id: "course5", name: "Course 5: Full Mixed Precedence", skills: ["mixed"] },
  { id: "course6", name: "Course 6: Signed Numbers + Fractions", skills: ["signed"] },
  { id: "course7",  name: "Course 7: Algebra Solver",              skills: ["algebra"] },
  { id: "course8",  name: "Course 8: 2-Variable Systems",          skills: ["systems"] },
  { id: "course9",  name: "Ch 1: Patterns in Mathematics",         skills: ["ch1_patterns"] },
  { id: "course10", name: "Ch 2: Lines and Angles",                skills: ["ch2_angles"] },
  { id: "course11", name: "Ch 3: Number Play",                     skills: ["ch3_numplay"] },
  { id: "course12", name: "Ch 4: Data Handling & Presentation",    skills: ["ch4_data"] },
  { id: "course13", name: "Ch 5: Prime Time",                      skills: ["ch5_prime"] },
  { id: "course14", name: "Ch 6: Perimeter and Area",              skills: ["ch6_perimarea"] },
  { id: "course15", name: "Ch 7: Fractions",                       skills: ["ch7_fractions"] },
  { id: "course16", name: "Ch 8: Playing with Constructions",      skills: ["ch8_constructions"] },
  { id: "course17", name: "Ch 9: Symmetry",                        skills: ["ch9_symmetry"] },
  { id: "course18", name: "Ch 10: The Other Side of Zero",         skills: ["ch10_integers"] }
];

const SPEED_PRESETS = {
  beginner:     { label: "Beginner", baseSpeed: 7,  initialDifficulty: 1, health: 5, spawnMultiplier: 3 },
  intermediate: { label: "Normal",   baseSpeed: 20, initialDifficulty: 2, health: 3, spawnMultiplier: 1 },
  advanced:     { label: "Advanced", baseSpeed: 35, initialDifficulty: 5, health: 3, spawnMultiplier: 1 }
};

const EXPERTISE_LEVELS = [
  { label: "Novice", min: 0 },
  { label: "Apprentice", min: 1.5 },
  { label: "Solver", min: 2.4 },
  { label: "Strategist", min: 3.1 },
  { label: "Master", min: 3.8 }
];

const state = {
  db: null,
  profiles: [],
  profile: null,
  settings: null,
  mastery: new Map(),
  quests: [],
  questProgress: new Map(),
  runs: [],
  game: null,
  speedPreset: "intermediate",
  algebra: null,
  practiceSessions: [],
  teacherMode: false
};

const el = {};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  cacheElements();
  bindEvents();
  state.db = await openDb();
  await ensureQuestDefinitions();
  await loadProfiles();
  renderThemeList();
  renderResourcesList();
  const savedProfileId = Number(localStorage.getItem("algbrox_profile_id") || 0);
  if (savedProfileId) {
    const profile = state.profiles.find((item) => item.id === savedProfileId);
    if (profile) {
      try {
        await activateProfile(profile);
        return;
      } catch (err) {
        console.error("Auto-login failed:", err);
      }
    }
  }
  showScreen("profileScreen");
}

function cacheElements() {
  const ids = [
    "signOutBtn", "profileScreen", "dashboardScreen", "gameScreen", "customizeScreen", "resourceScreen",
    "profileList", "createProfileForm", "profileName", "gradeBand", "startRunBtn", "customizeBtn", "resourceBtn",
    "courseList", "questList", "recentRunsList", "expertiseLabel", "xpSummary", "todaySummary", "todayAccuracy",
    "coinSummary", "gameCanvas", "hudScore", "hudCombo", "hudHealth", "hudSkill", "hudAccuracy", "promptCard",
    "promptType", "promptExpression", "laneOptions", "resourceCard", "leftBtn", "rightBtn", "jumpBtn", "slideBtn",
    "stopRunBtn", "backToDashboardBtn", "closeCustomizeBtn", "avatarPreview", "avatarForm", "themeList",
    "bodyColor", "hairColor", "outfitColor", "trailColor", "accessory", "hairStyle", "closeResourceBtn", "resourceList",
    "runSummaryDialog", "runSummaryText", "playAgainBtn", "summaryBackBtn",
    "tutorialDialog", "tutorialStartBtn", "tutorialSkipBtn", "countdownOverlay", "dangerBanner", "gameHint",
    "courseSearch",
    "teacherModeBtn", "teacherBadge",
    "algSolveLabel",
    "algebraBtn", "algebraScreen", "algebraBackBtn",
    "algQNum", "algScoreDisplay", "algEquationDisplay", "algOperationBanner",
    "algStepPrompt", "algOptionsGrid", "algFeedbackBox",
    "algProblemPanel", "algSummaryPanel", "algSummaryText", "algPlayAgainBtn", "algDoneBtn",
    "cheatsheetBtn", "cheatsheetScreen", "closeCheatsheetBtn", "cheatsheetGrid",
    "mathsBtn", "scienceBtn",
    "subjectScreen", "subjectBackBtn", "subjectFrame", "subjectTabs", "subjectGradeRow", "subjectTitle",
    "practiceHistoryList",
    "exploreHomeBtn", "progressHomeBtn", "exploreHomeSection", "progressHomeSection",
    "subjectExplorerGrid", "cbseGradeGrid", "pdfLibraryList"
  ];
  ids.forEach((id) => {
    el[id] = document.getElementById(id);
  });
}

function bindEvents() {
  el.createProfileForm.addEventListener("submit", onCreateProfile);
  el.exploreHomeBtn.addEventListener("click", () => setDashboardCategory("explore"));
  el.progressHomeBtn.addEventListener("click", () => setDashboardCategory("progress"));
  el.teacherModeBtn.addEventListener("click", enterTeacherMode);
  el.startRunBtn.addEventListener("click", startRun);
  el.customizeBtn.addEventListener("click", () => {
    if (!state.profile) {
      return;
    }
    populateCustomizeForm();
    showScreen("customizeScreen");
  });
  el.resourceBtn.addEventListener("click", () => showScreen("resourceScreen"));
  el.signOutBtn.addEventListener("click", () => {
    state.profile = null;
    state.teacherMode = false;
    el.teacherBadge.classList.add("hidden");
    el.signOutBtn.textContent = "Switch Profile";
    localStorage.removeItem("algbrox_profile_id");
    showScreen("profileScreen");
    el.signOutBtn.hidden = true;
  });
  el.closeCustomizeBtn.addEventListener("click", () => showScreen("dashboardScreen"));
  el.closeResourceBtn.addEventListener("click", () => showScreen("dashboardScreen"));
  el.avatarForm.addEventListener("submit", onSaveAvatar);
  ["bodyColor", "hairColor", "outfitColor", "trailColor", "accessory", "hairStyle"].forEach((id) => {
    el[id].addEventListener("input",  liveAvatarPreview);
    el[id].addEventListener("change", liveAvatarPreview);
  });
  el.leftBtn.addEventListener("click", () => shiftLane(-1));
  el.rightBtn.addEventListener("click", () => shiftLane(1));
  el.jumpBtn.addEventListener("click", () => triggerAction("jump"));
  el.slideBtn.addEventListener("click", () => triggerAction("slide"));
  el.stopRunBtn.addEventListener("click", () => endRun("Manual stop"));
  el.backToDashboardBtn.addEventListener("click", async () => {
    if (state.game?.running) {
      await endRun("Back to dashboard");
    }
    showScreen("dashboardScreen");
  });
  el.playAgainBtn.addEventListener("click", () => {
    el.runSummaryDialog.close();
    showScreen("gameScreen");
    beginCountdown();
  });
  el.courseSearch.addEventListener("input", () => renderCourseProgress(el.courseSearch.value));
  el.mathsBtn.addEventListener("click", () => openSubjectOverlay("maths", "grade6"));
  el.scienceBtn.addEventListener("click", () => openSubjectOverlay("science", "grade6"));
  el.subjectBackBtn.addEventListener("click", () => { el.subjectScreen.classList.add("hidden"); });
  el.subjectGradeRow.addEventListener("click", (event) => {
    const btn = event.target.closest(".g6-grade-btn");
    if (!btn) { return; }
    openSubjectOverlay(el.subjectScreen.dataset.subject, btn.dataset.grade);
  });
  el.cheatsheetBtn.addEventListener("click", () => { renderCheatsheetGrid(); showScreen("cheatsheetScreen"); });
  el.closeCheatsheetBtn.addEventListener("click", () => showScreen("dashboardScreen"));
  el.algebraBtn.addEventListener("click", startAlgebraPractice);
  el.algebraBackBtn.addEventListener("click", () => showScreen("dashboardScreen"));
  el.algPlayAgainBtn.addEventListener("click", startAlgebraPractice);
  el.algDoneBtn.addEventListener("click", () => showScreen("dashboardScreen"));
  el.tutorialStartBtn.addEventListener("click", () => {
    el.tutorialDialog.close();
    beginCountdown();
  });
  el.tutorialSkipBtn.addEventListener("click", () => {
    localStorage.setItem("algbrox_skip_tutorial", "1");
    el.tutorialDialog.close();
    beginCountdown();
  });
  el.summaryBackBtn.addEventListener("click", () => {
    el.runSummaryDialog.close();
    showScreen("dashboardScreen");
  });
  window.addEventListener("keydown", onKeyDown);
  el.laneOptions.addEventListener("click", (event) => {
    const button = event.target.closest(".lane-option");
    if (!button) {
      return;
    }
    const targetLane = Number(button.dataset.lane);
    setLane(targetLane);
  });
}

function onKeyDown(event) {
  if (!state.game?.running) {
    return;
  }
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    shiftLane(-1);
  } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    shiftLane(1);
  } else if (event.key === "ArrowUp" || event.key === " ") {
    triggerAction("jump");
  } else if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
    triggerAction("slide");
  }
}

function showScreen(id) {
  ["profileScreen", "dashboardScreen", "gameScreen", "customizeScreen", "resourceScreen", "algebraScreen", "cheatsheetScreen"].forEach((screenId) => {
    el[screenId].classList.toggle("hidden", screenId !== id);
  });
}

async function loadProfiles() {
  state.profiles = await idbGetAll("profiles");
  renderProfiles();
}

function renderProfiles() {
  el.profileList.innerHTML = "";
  if (state.profiles.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No profiles yet. Create one below.";
    el.profileList.appendChild(empty);
    return;
  }
  state.profiles.forEach((profile) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${profile.displayName} (${profile.gradeBand})`;
    const button = document.createElement("button");
    button.textContent = "Open";
    button.addEventListener("click", () => activateProfile(profile));
    li.append(label, button);
    el.profileList.appendChild(li);
  });
}

async function onCreateProfile(event) {
  event.preventDefault();
  const displayName = el.profileName.value.trim();
  if (!displayName) {
    return;
  }
  const profile = {
    displayName,
    gradeBand: el.gradeBand.value,
    createdAt: new Date().toISOString()
  };
  profile.id = await idbAdd("profiles", profile);
  const defaultSettings = defaultProfileSettings(profile.id);
  await idbPut("settings", defaultSettings);
  state.profiles.push(profile);
  renderProfiles();
  el.createProfileForm.reset();
  try {
    await activateProfile(profile);
  } catch (err) {
    console.error("activateProfile failed:", err);
    showScreen("dashboardScreen");
  }
}

function defaultProfileSettings(profileId) {
  return {
    profileId,
    themeId: "jungle",
    coins: 0,
    avatar: {
      bodyColor: "#ffd7b0",
      hairColor: "#3d2618",
      outfitColor: "#ff88bb",
      trailColor: "#f5e36c",
      accessory: "bow",
      hairStyle: "long_straight"
    },
    accessibility: {
      reducedMotion: false,
      dyslexiaFriendly: false,
      colorBlindMode: false
    }
  };
}

async function activateProfile(profile) {
  state.profile = profile;
  state.settings = await idbGet("settings", profile.id);
  if (!state.settings) {
    state.settings = defaultProfileSettings(profile.id);
    await idbPut("settings", state.settings);
  }
  const masteryRows = await idbGetAllByIndex("mastery", "profileId", profile.id);
  state.mastery = new Map(masteryRows.map((row) => [row.skillTag, row]));
  state.runs = (await idbGetAllByIndex("runs", "profileId", profile.id))
    .sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt));
  try {
    state.practiceSessions = (await idbGetAllByIndex("practiceSessions", "profileId", profile.id))
      .sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt));
  } catch (_) {
    state.practiceSessions = [];
  }
  state.quests = await idbGetAll("quests");
  const progressRows = await idbGetAllByIndex("questProgress", "profileId", profile.id);
  state.questProgress = new Map(progressRows.map((row) => [row.questId, row]));
  localStorage.setItem("algbrox_profile_id", String(profile.id));
  applyTheme(state.settings.themeId);
  updateAvatarPreview();
  renderDashboard();
  el.signOutBtn.hidden = false;
  showScreen("dashboardScreen");
}

async function enterTeacherMode() {
  state.teacherMode    = true;
  state.profile        = { id: 0, displayName: "Teacher", gradeBand: "6-7" };
  state.settings       = defaultProfileSettings(0);
  state.mastery        = new Map();
  state.runs           = [];
  state.practiceSessions = [];
  state.questProgress  = new Map();
  try {
    state.quests = await idbGetAll("quests");
  } catch (_) {
    state.quests = [];
  }
  localStorage.removeItem("algbrox_profile_id");
  applyTheme(state.settings.themeId);
  updateAvatarPreview();
  renderDashboard();
  el.signOutBtn.hidden = false;
  el.signOutBtn.textContent = "Exit Teacher Mode";
  el.teacherBadge.classList.remove("hidden");
  showScreen("dashboardScreen");
}

function renderDashboard() {
  if (!state.profile) {
    return;
  }
  renderSubjectExplorerGrid();
  renderCbseGradeGrid();
  renderPdfLibraryList();
  renderExpertiseCard();
  renderCourseProgress();
  renderQuestList();
  renderRecentRuns();
  renderPracticeHistory();
  el.coinSummary.textContent = String(state.settings.coins || 0);
  setDashboardCategory("explore");
}

function setDashboardCategory(category) {
  const showExplore = category !== "progress";
  el.exploreHomeSection.classList.toggle("hidden", !showExplore);
  el.progressHomeSection.classList.toggle("hidden", showExplore);
  el.exploreHomeBtn.classList.toggle("active", showExplore);
  el.progressHomeBtn.classList.toggle("active", !showExplore);
}

function renderPracticeHistory() {
  el.practiceHistoryList.innerHTML = "";
  const recent = state.practiceSessions.slice(0, 10);
  if (recent.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No practice sessions yet — click Practice on any course card.";
    el.practiceHistoryList.appendChild(li);
    return;
  }
  recent.forEach((session) => {
    const li = document.createElement("li");
    li.className = "drilldown-item";
    const name = SKILL_LABELS[session.skillTag] || session.skillTag;
    const date = new Date(session.startedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    const pct = Math.round(session.pct);
    const cls = pct >= 80 ? "badge-good" : pct >= 50 ? "badge-ok" : "badge-low";
    const breakdown = `${session.firstCount} first-try  ·  ${session.retryCount} retry  ·  ${session.missedCount} missed`;

    const header = document.createElement("div");
    header.className = "drilldown-header";
    header.innerHTML = `
      <div><strong>${name}</strong><br><small>${date} &nbsp;·&nbsp; ${breakdown}</small></div>
      <div class="dd-right">
        <span class="ps-badge ${cls}">${session.totalPts}/${session.maxPts} &nbsp;${pct}%</span>
        <span class="expand-icon">▼</span>
      </div>
    `;

    const details = document.createElement("div");
    details.className = "drilldown-details hidden";

    const wrong = session.wrongSteps || [];
    if (wrong.length === 0) {
      details.innerHTML = `<p class="dd-perfect">All steps answered correctly on first try!</p>`;
    } else {
      const rows = wrong.map((s) => {
        const tag = s.result === "missed"
          ? `<span class="dd-tag missed-tag">Missed</span>`
          : `<span class="dd-tag retry-tag">Retry</span>`;
        return `<tr><td class="dd-expr">${s.expression}</td><td class="dd-ans">${s.answer}</td><td>${tag}</td></tr>`;
      }).join("");
      details.innerHTML = `
        <p class="dd-hint">Review these — they need more practice:</p>
        <table class="dd-table">
          <thead><tr><th>Question / Step</th><th>Correct Answer</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    header.addEventListener("click", () => {
      const hidden = details.classList.toggle("hidden");
      header.querySelector(".expand-icon").textContent = hidden ? "▼" : "▲";
    });

    li.append(header, details);
    el.practiceHistoryList.appendChild(li);
  });
}

function renderExpertiseCard() {
  const expertise = computeExpertise();
  const runsToday = state.runs.filter((run) => isToday(run.startedAt));
  const accuracyToday = runsToday.length > 0
    ? (runsToday.reduce((sum, run) => sum + run.accuracy, 0) / runsToday.length)
    : 0;
  el.expertiseLabel.textContent = expertise.label;
  el.xpSummary.textContent = `Mastery score ${expertise.value.toFixed(2)} / 4.0`;
  el.todaySummary.textContent = `${runsToday.length} run${runsToday.length === 1 ? "" : "s"} today`;
  el.todayAccuracy.textContent = `Accuracy: ${Math.round(accuracyToday)}%`;
}

const COURSE_PLAYLISTS = [
  { id: "general", label: "General Concepts", filter: (c) => c.name.startsWith("Course") },
  { id: "ganita",  label: "Ganita Prakash — Grade 6", filter: (c) => c.name.startsWith("Ch") }
];

const MATHS_STRUCTURE = {
  grade6: {
    label: "Grade 6",
    basePath: "curriculum/CBSE/maths/grade6/",
    landingPage: "Grade6_Math_Learning_Plan.html",
    landingLabel: "Learning Plan",
    chapters: [
      { file: "G6_Ch1_Patterns_Practice.html",     label: "Ch 1 · Patterns" },
      { file: "G6_Ch2_LinesAngles_Practice.html",  label: "Ch 2 · Lines & Angles" },
      { file: "G6_Ch3_NumberPlay_Practice.html",   label: "Ch 3 · Number Play" },
      { file: "G6_Ch4_DataHandling_Practice.html", label: "Ch 4 · Data Handling" },
      { file: "G6_Ch5_PrimeTime_Practice.html",    label: "Ch 5 · Prime Time" },
      { file: "G6_Ch6_PerimeterArea_Practice.html",label: "Ch 6 · Perimeter & Area" },
      { file: "G6_Ch7_Fractions_Practice.html",    label: "Ch 7 · Fractions" },
      { file: "G6_Ch8_Constructions_Practice.html",label: "Ch 8 · Constructions" },
      { file: "G6_Ch9_Symmetry_Practice.html",     label: "Ch 9 · Symmetry" },
      { file: "G6_Ch10_Integers_Practice.html",    label: "Ch 10 · Integers" }
    ]
  },
  grade7: {
    label: "Grade 7",
    basePath: "curriculum/CBSE/maths/grade7/",
    landingPage: null,
    chapters: [
      { file: "G7_Ch1_LargeNumbers_Practice.html",            label: "Ch 1 · Large Numbers" },
      { file: "G7_Ch2_ArithmeticExpressions_Practice.html",   label: "Ch 2 · Arithmetic Expressions" },
      { file: "G7_Ch3_PeekBeyondPoint_Practice.html",         label: "Ch 3 · Fractions & Decimals" },
      { file: "G7_Ch4_LetterNumbers_Practice.html",           label: "Ch 4 · Letter Numbers (Algebra)" },
      { file: "G7_Ch5_ParallelLines_Practice.html",           label: "Ch 5 · Parallel Lines" },
      { file: "G7_Ch6_NumberPlay_Practice.html",              label: "Ch 6 · Number Play" },
      { file: "G7_Ch7_ThreeIntersectingLines_Practice.html",  label: "Ch 7 · Intersecting Lines" },
      { file: "G7_Ch8_WorkingFractions_Practice.html",        label: "Ch 8 · Fractions" },
      { file: "G7_Ch9_GeometricTwins_Practice.html",          label: "Ch 9 · Congruence" },
      { file: "G7_Ch10_OperationsIntegers_Practice.html",     label: "Ch 10 · Integers" },
      { file: "G7_Ch11_FindingCommonGround_Practice.html",    label: "Ch 11 · HCF & LCM" },
      { file: "G7_Ch12_AnotherPeekPoint_Practice.html",       label: "Ch 12 · Rational Numbers" },
      { file: "G7_Ch13_ConnectingDots_Practice.html",         label: "Ch 13 · Perimeter & Area" },
      { file: "G7_Ch14_ConstructionsTilings_Practice.html",   label: "Ch 14 · Constructions" },
      { file: "G7_Ch15_FindingUnknown_Practice.html",         label: "Ch 15 · Simple Equations" }
    ]
  },
  grade8: {
    label: "Grade 8",
    basePath: "curriculum/CBSE/maths/grade8/",
    landingPage: null,
    chapters: [
      { file: "G8_Ch1_SquareCube_Practice.html",            label: "Ch 1 · Squares & Cubes" },
      { file: "G8_Ch2_PowerPlay_Practice.html",             label: "Ch 2 · Exponents" },
      { file: "G8_Ch3_StoryOfNumbers_Practice.html",        label: "Ch 3 · Story of Numbers" },
      { file: "G8_Ch4_Quadrilaterals_Practice.html",        label: "Ch 4 · Quadrilaterals" },
      { file: "G8_Ch5_NumberPlay_Practice.html",            label: "Ch 5 · Number Play" },
      { file: "G8_Ch6_DistributeMultiply_Practice.html",    label: "Ch 6 · Algebraic Expressions" },
      { file: "G8_Ch7_ProportionalReasoning_Practice.html", label: "Ch 7 · Proportional Reasoning" }
    ]
  },
  grade9: {
    label: "Grade 9",
    basePath: "curriculum/CBSE/maths/grade9/",
    landingPage: null,
    chapters: [
      { file: "G9_Ch1_Coordinates_Practice.html",              label: "Ch 1 · Coordinates" },
      { file: "G9_Ch2_LinearPolynomials_Practice.html",        label: "Ch 2 · Polynomials" },
      { file: "G9_Ch3_WorldOfNumbers_Practice.html",           label: "Ch 3 · Number Systems" },
      { file: "G9_Ch4_AlgebraicIdentities_Practice.html",      label: "Ch 4 · Algebraic Identities" },
      { file: "G9_Ch5_UpDownRound_Practice.html",              label: "Ch 5 · Rounding" },
      { file: "G9_Ch6_MeasuringSpace_Practice.html",           label: "Ch 6 · Mensuration" },
      { file: "G9_Ch7_Probability_Practice.html",              label: "Ch 7 · Probability" },
      { file: "G9_Ch8_SequencesProgressions_Practice.html",    label: "Ch 8 · Sequences" }
    ]
  },
  grade10: {
    label: "Grade 10",
    basePath: "curriculum/CBSE/maths/grade10/",
    landingPage: null,
    chapters: [
      { file: "G10_Ch1_RealNumbers_Practice.html",               label: "Ch 1 · Real Numbers" },
      { file: "G10_Ch2_Polynomials_Practice.html",               label: "Ch 2 · Polynomials" },
      { file: "G10_Ch3_LinearEquations_Practice.html",           label: "Ch 3 · Linear Equations" },
      { file: "G10_Ch4_QuadraticEquations_Practice.html",        label: "Ch 4 · Quadratic Equations" },
      { file: "G10_Ch5_ArithmeticProgressions_Practice.html",    label: "Ch 5 · Arithmetic Progressions" },
      { file: "G10_Ch6_Triangles_Practice.html",                 label: "Ch 6 · Triangles" },
      { file: "G10_Ch7_CoordinateGeometry_Practice.html",        label: "Ch 7 · Coordinate Geometry" },
      { file: "G10_Ch8_Trigonometry_Practice.html",              label: "Ch 8 · Trigonometry" },
      { file: "G10_Ch9_ApplicationsTrig_Practice.html",          label: "Ch 9 · Applications of Trig" },
      { file: "G10_Ch10_Circles_Practice.html",                  label: "Ch 10 · Circles" },
      { file: "G10_Ch11_AreasCircles_Practice.html",             label: "Ch 11 · Areas of Circles" },
      { file: "G10_Ch12_SurfaceVolumes_Practice.html",           label: "Ch 12 · Surface Areas & Volumes" },
      { file: "G10_Ch13_Statistics_Practice.html",               label: "Ch 13 · Statistics" },
      { file: "G10_Ch14_Probability_Practice.html",              label: "Ch 14 · Probability" }
    ]
  }
};

const SCIENCE_STRUCTURE = {
  grade6: {
    label: "Grade 6",
    basePath: "curriculum/CBSE/science/",
    landingPage: null,
    chapters: [
      { file: "G6_Ch1_WonderfulWorld_Practice.html",   label: "Ch 1 · Wonderful World" },
      { file: "G6_Ch2_Diversity_Practice.html",         label: "Ch 2 · Diversity" },
      { file: "G6_Ch3_MindfulEating_Practice.html",     label: "Ch 3 · Mindful Eating" },
      { file: "G6_Ch4_Magnets_Practice.html",           label: "Ch 4 · Magnets" },
      { file: "G6_Ch5_LengthMotion_Practice.html",      label: "Ch 5 · Length & Motion" },
      { file: "G6_Ch6_Materials_Practice.html",         label: "Ch 6 · Materials" },
      { file: "G6_Ch7_Temperature_Practice.html",       label: "Ch 7 · Temperature" },
      { file: "G6_Ch8_StatesWater_Practice.html",       label: "Ch 8 · States of Water" },
      { file: "G6_Ch9_Separation_Practice.html",        label: "Ch 9 · Separation" },
      { file: "G6_Ch10_LivingCreatures_Practice.html",  label: "Ch 10 · Living Creatures" },
      { file: "G6_Ch11_NatureTreasures_Practice.html",  label: "Ch 11 · Nature's Treasures" },
      { file: "G6_Ch12_BeyondEarth_Practice.html",      label: "Ch 12 · Beyond Earth" }
    ]
  },
  grade7: {
    label: "Grade 7",
    basePath: "curriculum/CBSE/science/",
    landingPage: null,
    chapters: [
      { file: "G7_Ch1_EvolvingScience_Practice.html",   label: "Ch 1 · Evolving Science" },
      { file: "G7_Ch2_AcidicBasic_Practice.html",       label: "Ch 2 · Acidic & Basic" },
      { file: "G7_Ch3_Electricity_Practice.html",       label: "Ch 3 · Electricity" },
      { file: "G7_Ch4_MetalsNonmetals_Practice.html",   label: "Ch 4 · Metals & Non-metals" },
      { file: "G7_Ch5_PhysicalChemical_Practice.html",  label: "Ch 5 · Physical & Chemical Changes" },
      { file: "G7_Ch6_Adolescence_Practice.html",       label: "Ch 6 · Adolescence" },
      { file: "G7_Ch7_HeatTransfer_Practice.html",      label: "Ch 7 · Heat Transfer" },
      { file: "G7_Ch8_TimeMotion_Practice.html",        label: "Ch 8 · Time & Motion" },
      { file: "G7_Ch9_LifeAnimals_Practice.html",       label: "Ch 9 · Life in Animals" },
      { file: "G7_Ch10_LifePlants_Practice.html",       label: "Ch 10 · Life in Plants" },
      { file: "G7_Ch11_LightShadows_Practice.html",     label: "Ch 11 · Light & Shadows" },
      { file: "G7_Ch12_EarthMoonSun_Practice.html",     label: "Ch 12 · Earth, Moon & Sun" }
    ]
  },
  grade8: {
    label: "Grade 8",
    basePath: "curriculum/CBSE/science/",
    landingPage: null,
    chapters: [
      { file: "G8_Ch1_CropProduction_Practice.html",      label: "Ch 1 · Crop Production" },
      { file: "G8_Ch2_Microorganisms_Practice.html",      label: "Ch 2 · Microorganisms" },
      { file: "G8_Ch3_CoalPetroleum_Practice.html",       label: "Ch 3 · Coal & Petroleum" },
      { file: "G8_Ch4_Combustion_Practice.html",          label: "Ch 4 · Combustion" },
      { file: "G8_Ch5_Conservation_Practice.html",        label: "Ch 5 · Conservation" },
      { file: "G8_Ch6_ReproductionAnimals_Practice.html", label: "Ch 6 · Reproduction in Animals" },
      { file: "G8_Ch7_Adolescence2_Practice.html",        label: "Ch 7 · Adolescence" },
      { file: "G8_Ch8_ForcePressure_Practice.html",       label: "Ch 8 · Force & Pressure" },
      { file: "G8_Ch9_Friction_Practice.html",            label: "Ch 9 · Friction" },
      { file: "G8_Ch10_Sound_Practice.html",              label: "Ch 10 · Sound" },
      { file: "G8_Ch11_ChemicalElectricity_Practice.html",label: "Ch 11 · Chemical Effects of Electricity" },
      { file: "G8_Ch12_NaturalPhenomena_Practice.html",   label: "Ch 12 · Natural Phenomena" },
      { file: "G8_Ch13_Light_Practice.html",              label: "Ch 13 · Light" }
    ]
  },
  grade9: {
    label: "Grade 9",
    basePath: "curriculum/CBSE/science/",
    landingPage: null,
    chapters: [
      { file: "G9_Ch1_ExplorationScience_Practice.html",  label: "Ch 1 · Exploring Science" },
      { file: "G9_Ch2_Cell_Practice.html",                label: "Ch 2 · The Cell" },
      { file: "G9_Ch3_Tissues_Practice.html",             label: "Ch 3 · Tissues" },
      { file: "G9_Ch4_Motion_Practice.html",              label: "Ch 4 · Motion" },
      { file: "G9_Ch5_Mixtures_Practice.html",            label: "Ch 5 · Mixtures & Separation" },
      { file: "G9_Ch6_Forces_Practice.html",              label: "Ch 6 · Forces" },
      { file: "G9_Ch7_WorkEnergy_Practice.html",          label: "Ch 7 · Work & Energy" },
      { file: "G9_Ch8_InsideAtom_Practice.html",          label: "Ch 8 · Inside the Atom" },
      { file: "G9_Ch9_AtomicFoundations_Practice.html",   label: "Ch 9 · Atomic Foundations" },
      { file: "G9_Ch10_SoundWaves_Practice.html",         label: "Ch 10 · Sound Waves" },
      { file: "G9_Ch11_Reproduction_Practice.html",       label: "Ch 11 · Reproduction" },
      { file: "G9_Ch12_Diversity_Practice.html",          label: "Ch 12 · Diversity" },
      { file: "G9_Ch13_EarthSystem_Practice.html",        label: "Ch 13 · Earth System" }
    ]
  },
  grade10: {
    label: "Grade 10",
    basePath: "curriculum/CBSE/science/",
    landingPage: null,
    chapters: [
      { file: "G10_Ch1_ChemicalReactions_Practice.html",   label: "Ch 1 · Chemical Reactions" },
      { file: "G10_Ch2_AcidsBases_Practice.html",          label: "Ch 2 · Acids & Bases" },
      { file: "G10_Ch3_MetalsNonmetals_Practice.html",     label: "Ch 3 · Metals & Non-metals" },
      { file: "G10_Ch4_Carbon_Practice.html",              label: "Ch 4 · Carbon & Compounds" },
      { file: "G10_Ch5_LifeProcesses_Practice.html",       label: "Ch 5 · Life Processes" },
      { file: "G10_Ch6_ControlCoordination_Practice.html", label: "Ch 6 · Control & Coordination" },
      { file: "G10_Ch7_Reproduction_Practice.html",        label: "Ch 7 · Reproduction" },
      { file: "G10_Ch8_HeredityEvolution_Practice.html",   label: "Ch 8 · Heredity & Evolution" },
      { file: "G10_Ch9_LightReflection_Practice.html",     label: "Ch 9 · Light Reflection" },
      { file: "G10_Ch10_HumanEye_Practice.html",           label: "Ch 10 · The Human Eye" },
      { file: "G10_Ch11_Electricity_Practice.html",        label: "Ch 11 · Electricity" },
      { file: "G10_Ch12_MagneticEffects_Practice.html",    label: "Ch 12 · Magnetic Effects" },
      { file: "G10_Ch13_Environment_Practice.html",        label: "Ch 13 · Our Environment" }
    ]
  }
};

const SCIENCE_IB_STRUCTURE = {
  myp1: {
    label: "MYP 1",
    basePath: "curriculum/IB/science/myp-1/",
    landingPage: null,
    chapters: [
      { file: "MYP1_Ch1_whatdoscientistsdo_Practice.html", label: "Ch 1 · What do scientists do?" },
      { file: "MYP1_Ch2_whatchanges_Practice.html", label: "Ch 2 · What changes?" },
      { file: "MYP1_Ch3_howdolivingthingswork_Practice.html", label: "Ch 3 · How do living things work?" },
      { file: "MYP1_Ch4_whatmakeschangehappen_Practice.html", label: "Ch 4 · What makes change happen?" },
      { file: "MYP1_Ch5_howcanwestudythelivingworld_Practice.html", label: "Ch 5 · Study the living world" },
      { file: "MYP1_Ch6_wheredowefitintotheworld_Practice.html", label: "Ch 6 · Where do we fit in?" }
    ]
  },
  myp2: {
    label: "MYP 2",
    basePath: "curriculum/IB/science/myp-2/",
    landingPage: null,
    chapters: [
      { file: "MYP2_Ch1_wherearewenowandwheremightwebegoing_Practice.html", label: "Ch 1 · Where are we now?" },
      { file: "MYP2_Ch2_howdowemapmatter_Practice.html", label: "Ch 2 · Map matter" },
      { file: "MYP2_Ch3_whoarewe_Practice.html", label: "Ch 3 · Who are we?" },
      { file: "MYP2_Ch4_whatdoesawavetellus_Practice.html", label: "Ch 4 · What does a wave tell us?" },
      { file: "MYP2_Ch5_howdoesourplanetwork_Practice.html", label: "Ch 5 · How does our planet work?" },
      { file: "MYP2_Ch6_howdowerespondtoourworld_Practice.html", label: "Ch 6 · Respond to our world" }
    ]
  },
  myp3: {
    label: "MYP 3",
    basePath: "curriculum/IB/science/myp-3/",
    landingPage: null,
    chapters: [
      { file: "MYP3_Ch1_howdowemakeitwork_Practice.html", label: "Ch 1 · How do we make it work?" },
      { file: "MYP3_Ch2_howdohumansimpactthenaturalworld_Practice.html", label: "Ch 2 · Human impact" },
      { file: "MYP3_Ch3_whatshouldieat_Practice.html", label: "Ch 3 · What should I eat?" },
      { file: "MYP3_Ch4_howdoweputelectricityandmagnetismtowork_Practice.html", label: "Ch 4 · Electricity & magnetism" },
      { file: "MYP3_Ch5_howcanweconnect_Practice.html", label: "Ch 5 · How can we connect?" },
      { file: "MYP3_Ch6_howdoourbodieswork_Practice.html", label: "Ch 6 · How do our bodies work?" }
    ]
  }
};

const SCIENCE_SAT_STRUCTURE = {
  sat: {
    label: "SAT",
    basePath: "curriculum/SAT/science/",
    landingPage: null,
    chapters: [
      { file: "SCI_SAT_DataAnalysis_Practice.html", label: "Data Analysis" },
      { file: "SCI_MYP_S1_ScientificInquiry_Practice.html", label: "Scientific Inquiry" },
      { file: "SCI_MYP_S2_BiologyGaps_Practice.html", label: "Biology Gaps" },
      { file: "SCI_MYP_S3_ChemistryGaps_Practice.html", label: "Chemistry Gaps" },
      { file: "SCI_MYP_S4_PhysicsGaps_Practice.html", label: "Physics Gaps" },
      { file: "SCI_MYP_S5_STSE_Practice.html", label: "STSE" }
    ]
  }
};

const MATHS_IB_STRUCTURE = {
  myp1: {
    label: "MYP 1",
    basePath: "curriculum/IB/maths/myp1/",
    landingPage: null,
    chapters: [
      { file: "MYP1_Ch1_numbersandnumbersystemscivilizationsandhum_Practice.html", label: "Ch 1 · Number systems" },
      { file: "MYP1_Ch2_percentagesinequalityanddifference_Practice.html", label: "Ch 2 · Percentages" },
      { file: "MYP1_Ch3_algebraicexpressionsandequationspatternsin_Practice.html", label: "Ch 3 · Algebraic expressions" },
      { file: "MYP1_Ch4_geometricconstructionsartistryandcreativit_Practice.html", label: "Ch 4 · Geometric constructions" },
      { file: "MYP1_Ch5_fractionshumanconnections_Practice.html", label: "Ch 5 · Fractions" },
      { file: "MYP1_Ch6_datamanagementtrendsincommunities_Practice.html", label: "Ch 6 · Data management" },
      { file: "MYP1_Ch7_perimeterareaandvolumeenvironmentalimpacts_Practice.html", label: "Ch 7 · Perimeter, area, volume" }
    ]
  },
  myp2: {
    label: "MYP 2",
    basePath: "curriculum/IB/maths/myp2/",
    landingPage: null,
    chapters: [
      { file: "MYP2_Ch1_ratiosandproportionscompetitionandcooperat_Practice.html", label: "Ch 1 · Ratios and proportions" },
      { file: "MYP2_Ch2_probabilitygamesandplay_Practice.html", label: "Ch 2 · Probability" },
      { file: "MYP2_Ch3_integershumanexplorations_Practice.html", label: "Ch 3 · Integers" },
      { file: "MYP2_Ch4_algebraicexpressionsandequationspuzzlesand_Practice.html", label: "Ch 4 · Algebraic expressions" },
      { file: "MYP2_Ch5_2dand3dgeometryhumanandnaturallandscapes_Practice.html", label: "Ch 5 · 2D and 3D geometry" },
      { file: "MYP2_Ch6_ratesinterconnectednessofhumanmadesystems_Practice.html", label: "Ch 6 · Rates" },
      { file: "MYP2_Ch7_univariatedataaccessingequalopportunities_Practice.html", label: "Ch 7 · Univariate data" }
    ]
  },
  myp2v2: {
    label: "MYP 2 (V2)",
    basePath: "curriculum/IB/maths/myp2/",
    landingPage: null,
    chapters: [
      { file: "MYP2V2_Ch1_wholenumbers_Practice.html", label: "Ch 1 · Whole numbers" },
      { file: "MYP2V2_Ch2_numberproperties_Practice.html", label: "Ch 2 · Number properties" },
      { file: "MYP2V2_Ch3_linesandangles_Practice.html", label: "Ch 3 · Lines and angles" },
      { file: "MYP2V2_Ch4_numberstrategiesandorderofoperations_Practice.html", label: "Ch 4 · Number strategies" },
      { file: "MYP2V2_Ch5_positiveandnegativenumbers_Practice.html", label: "Ch 5 · Positive & negative numbers" },
      { file: "MYP2V2_Ch6_fractions_Practice.html", label: "Ch 6 · Fractions" },
      { file: "MYP2V2_Ch7_decimals_Practice.html", label: "Ch 7 · Decimals" },
      { file: "MYP2V2_Ch8_algebra_Practice.html", label: "Ch 8 · Algebra" },
      { file: "MYP2V2_Ch9_percentage_Practice.html", label: "Ch 9 · Percentage" },
      { file: "MYP2V2_Ch10_equations_Practice.html", label: "Ch 10 · Equations" },
      { file: "MYP2V2_Ch11_polygons_Practice.html", label: "Ch 11 · Polygons" },
      { file: "MYP2V2_Ch12_measurementlengthandarea_Practice.html", label: "Ch 12 · Measurement L&A" },
      { file: "MYP2V2_Ch13_solids_Practice.html", label: "Ch 13 · Solids" },
      { file: "MYP2V2_Ch14_measurementvolumecapacityandmass_Practice.html", label: "Ch 14 · Volume/capacity/mass" },
      { file: "MYP2V2_Ch15_coordinategeometry_Practice.html", label: "Ch 15 · Coordinate geometry" },
      { file: "MYP2V2_Ch16_ratioandrates_Practice.html", label: "Ch 16 · Ratio and rates" },
      { file: "MYP2V2_Ch17_probability_Practice.html", label: "Ch 17 · Probability" },
      { file: "MYP2V2_Ch18_statistics_Practice.html", label: "Ch 18 · Statistics" },
      { file: "MYP2V2_Ch19_transformations_Practice.html", label: "Ch 19 · Transformations" }
    ]
  },
  myp3: {
    label: "MYP 3",
    basePath: "curriculum/IB/maths/myp3/",
    landingPage: null,
    chapters: [
      { file: "MYP3_Ch1_numberdiscoveriesanddevelopments_Practice.html", label: "Ch 1 · Number discoveries" },
      { file: "MYP3_Ch2_trianglesprinciplesprocessesandsolutions_Practice.html", label: "Ch 2 · Triangles" },
      { file: "MYP3_Ch3_linearrelationshipsimpactofhumandecisionma_Practice.html", label: "Ch 3 · Linear relationships" },
      { file: "MYP3_Ch4_3dshapesproductsprocessesandsolutions_Practice.html", label: "Ch 4 · 3D shapes" },
      { file: "MYP3_Ch5_bivariatedatawhatitmeanstobehuman_Practice.html", label: "Ch 5 · Bivariate data" },
      { file: "MYP3_Ch6_geometrictransformationsexpressingbeliefsa_Practice.html", label: "Ch 6 · Geometric transformations" },
      { file: "MYP3_Ch7_linearsystemssocialentrepreneurship_Practice.html", label: "Ch 7 · Linear systems" }
    ]
  },
  myp45: {
    label: "MYP 4-5",
    basePath: "curriculum/IB/maths/myp4-5/",
    landingPage: null,
    chapters: [
      { file: "MYP4-5_Ch1_inhowmanydifferentwayscanweexpressthesamet_Practice.html", label: "Ch 1 · Expressing the same thing" },
      { file: "MYP4-5_Ch2_whydoesalgebralooksoclever_Practice.html", label: "Ch 2 · Why algebra?" },
      { file: "MYP4-5_Ch3_canyouwalktheline_Practice.html", label: "Ch 3 · Walk the line" },
      { file: "MYP4-5_Ch4_howistechnicalinnovationchangingourideasof_Practice.html", label: "Ch 4 · Technical innovation" },
      { file: "MYP4-5_Ch5_howcanwemoveinspace_Practice.html", label: "Ch 5 · Move in space" },
      { file: "MYP4-5_Ch6_howwelldodatareflectreality_Practice.html", label: "Ch 6 · Data and reality" },
      { file: "MYP4-5_Ch7_makingtheworldafairerandmoreequalplace_Practice.html", label: "Ch 7 · Fairer world" },
      { file: "MYP4-5_Ch8_howmanyformshasaquadratic_Practice.html", label: "Ch 8 · Quadratics" },
      { file: "MYP4-5_Ch9_howdofunctionsfunction_Practice.html", label: "Ch 9 · Functions" },
      { file: "MYP4-5_Ch10_whatdoigetbylearningthesethings_Practice.html", label: "Ch 10 · Why learn this?" },
      { file: "MYP4-5_Ch11_theonlysurething_Practice.html", label: "Ch 11 · The only sure thing" },
      { file: "MYP4-5_Ch12_amiready_Practice.html", label: "Ch 12 · Am I ready?" }
    ]
  }
};

const ENGLISH_STRUCTURE = {
  myp1: {
    label: "MYP 1",
    basePath: "curriculum/IB/english/myp1/",
    landingPage: null,
    chapters: [
      { file: "MYP1_Ch1_howcaniconnectwithothers_Practice.html", label: "Ch 1 · Connect with Others" },
      { file: "MYP1_Ch2_wherewouldwebewithoutfamily_Practice.html", label: "Ch 2 · Family" },
      { file: "MYP1_Ch3_eattoliveorlivetoeat_Practice.html", label: "Ch 3 · Food & Life" },
      { file: "MYP1_Ch4_howcanwefindourway_Practice.html", label: "Ch 4 · Finding Our Way" },
      { file: "MYP1_Ch5_whatwouldlifebelikeinaworldwithoutletters_Practice.html", label: "Ch 5 · World Without Letters" },
      { file: "MYP1_Ch6_whatispoetry_Practice.html", label: "Ch 6 · Poetry" }
    ]
  },
  myp2: {
    label: "MYP 2",
    basePath: "curriculum/IB/english/myp2/",
    landingPage: null,
    chapters: [
      { file: "MYP2_Ch1_whatsinaneighbourhood_Practice.html", label: "Ch 1 · Neighbourhood" },
      { file: "MYP2_Ch2_howdoyoupassthetime_Practice.html", label: "Ch 2 · Passing Time" },
      { file: "MYP2_Ch3_inaworldwherethereare6500languageshowcanwe_Practice.html", label: "Ch 3 · Languages" },
      { file: "MYP2_Ch4_isitrainingcatsanddogs_Practice.html", label: "Ch 4 · Idioms" },
      { file: "MYP2_Ch5_whatifeverybodylookedthesame_Practice.html", label: "Ch 5 · Identity" },
      { file: "MYP2_Ch6_whatsyourstory_Practice.html", label: "Ch 6 · Your Story" }
    ]
  },
  myp3: {
    label: "MYP 3",
    basePath: "curriculum/IB/english/myp3/",
    landingPage: null,
    chapters: [
      { file: "MYP3_Ch1_amireadyfortherealworld_Practice.html", label: "Ch 1 · Real World" },
      { file: "MYP3_Ch2_whatsthatyousaid_Practice.html", label: "Ch 2 · Speech & Meaning" },
      { file: "MYP3_Ch3_howcanweovercomedifficultchallenges_Practice.html", label: "Ch 3 · Challenges" },
      { file: "MYP3_Ch4_canwetravelthroughwriting_Practice.html", label: "Ch 4 · Writing Journeys" },
      { file: "MYP3_Ch5_istraditionworthpreserving_Practice.html", label: "Ch 5 · Tradition" },
      { file: "MYP3_Ch6_howdoyouseetheworld_Practice.html", label: "Ch 6 · Seeing the World" }
    ]
  },
  myp45: {
    label: "MYP 4-5",
    basePath: "curriculum/IB/english/myp4-5/",
    landingPage: null,
    chapters: [
      { file: "MYP4-5_Ch1_wheredoibelong_Practice.html", label: "Ch 1 · Belonging" },
      { file: "MYP4-5_Ch2_ismyidentitymybrand_Practice.html", label: "Ch 2 · Identity" },
      { file: "MYP4-5_Ch3_whatdetermineshealth_Practice.html", label: "Ch 3 · Health" },
      { file: "MYP4-5_Ch4_istheworldflat_Practice.html", label: "Ch 4 · Worldview" },
      { file: "MYP4-5_Ch5_canwesustaintheplanet_Practice.html", label: "Ch 5 · Sustainability" },
      { file: "MYP4-5_Ch6_whypoverty_Practice.html", label: "Ch 6 · Poverty" },
      { file: "MYP4-5_Ch7_istheworldabattlefield_Practice.html", label: "Ch 7 · Conflict" },
      { file: "MYP4-5_Ch8_whydoesfilmmatter_Practice.html", label: "Ch 8 · Film" },
      { file: "MYP4-5_Ch9_isthereanarttopersuasion_Practice.html", label: "Ch 9 · Persuasion" },
      { file: "MYP4-5_Ch10_canwordspaintathousandpictures_Practice.html", label: "Ch 10 · Words as Images" },
      { file: "MYP4-5_Ch11_whatisyourikigai_Practice.html", label: "Ch 11 · Ikigai" },
      { file: "MYP4-5_Ch12_whytwentyfirstcenturyskills_Practice.html", label: "Ch 12 · 21st Century Skills" }
    ]
  }
};

const FRENCH_STRUCTURE = {
  myp13: {
    label: "MYP 1-3",
    basePath: "curriculum/IB/french/",
    landingPage: "index.html",
    landingLabel: "French Hub",
    chapters: [
      { file: "MYP13_Ch1_etsionapprenaitunenouvellelangue_Practice.html", label: "Ch 1 · Nouvelle langue" },
      { file: "MYP13_Ch2_quisontvosproches_Practice.html", label: "Ch 2 · Vos proches" },
      { file: "MYP13_Ch3_outesenstucheztoi_Practice.html", label: "Ch 3 · Chez toi" },
      { file: "MYP13_Ch4_quelestleprogrammeaujourdhui_Practice.html", label: "Ch 4 · Programme" },
      { file: "MYP13_Ch5_quelssonttesloisirs_Practice.html", label: "Ch 5 · Loisirs" },
      { file: "MYP13_Ch6_aimestulesfetesetlestraditions_Practice.html", label: "Ch 6 · Fetes" },
      { file: "MYP13_Ch7_estcequetuprendssoindetoi_Practice.html", label: "Ch 7 · Soin de soi" },
      { file: "MYP13_Ch8_tuasditshopping_Practice.html", label: "Ch 8 · Shopping" },
      { file: "MYP13_Ch9_latechnologiepeutellecommuniquerpournous_Practice.html", label: "Ch 9 · Technologie" },
      { file: "MYP13_Ch10_commentvoyagestu_Practice.html", label: "Ch 10 · Voyager" },
      { file: "MYP13_Ch11_quefaistupourtacommunaute_Practice.html", label: "Ch 11 · Communaute" },
      { file: "MYP13_Ch12_desironsnousveritablementprotegernotreenvi_Practice.html", label: "Ch 12 · Environnement" }
    ]
  }
};

const LANGUAGE_LITERATURE_STRUCTURE = {
  myp1: {
    label: "MYP 1",
    basePath: "curriculum/IB/languagelitreture/",
    landingPage: null,
    chapters: [
      { file: "MYP1_Ch1_isseeingalwaysbelieving_Practice.html", label: "Ch 1 · Seeing & Believing" },
      { file: "MYP1_Ch2_mythsandlegendsamirrorofreality_Practice.html", label: "Ch 2 · Myths & Legends" },
      { file: "MYP1_Ch3_doyoubelieveinmagic_Practice.html", label: "Ch 3 · Magic" },
      { file: "MYP1_Ch4_doadvertisementsruntheworld_Practice.html", label: "Ch 4 · Advertisements" },
      { file: "MYP1_Ch5_isthisforreal_Practice.html", label: "Ch 5 · Real or Not" },
      { file: "MYP1_Ch6_isalltheworldastage_Practice.html", label: "Ch 6 · All the World's a Stage" }
    ]
  }
};

const PHYSICS_STRUCTURE = {
  myp45: {
    label: "MYP 4-5",
    basePath: "curriculum/IB/physics/myp45/",
    landingPage: null,
    chapters: [
      { file: "MYP4-5_Ch1_lightandsightinfocus_Practice.html", label: "Ch 1 · Light & Sight" },
      { file: "MYP4-5_Ch2_makingsenseofelectricalcircuits_Practice.html", label: "Ch 2 · Electrical Circuits" },
      { file: "MYP4-5_Ch3_motionandcarsafety_Practice.html", label: "Ch 3 · Motion & Safety" },
      { file: "MYP4-5_Ch4_thecostofswitchingon_Practice.html", label: "Ch 4 · Energy Use" },
      { file: "MYP4-5_Ch5_flight_Practice.html", label: "Ch 5 · Flight" }
    ]
  }
};

const PROJECTS_STRUCTURE = {
  all: {
    label: "Projects",
    basePath: "projects/",
    landingPage: null,
    chapters: [
      { file: "community-project.pdf", label: "Community Project Guide (PDF)" },
      { file: "personal-project.pdf", label: "Personal Project Guide (PDF)" }
    ]
  }
};

const SUBJECTS = {
  maths: {
    label: "Maths",
    defaultGrade: "grade6",
    structure: MATHS_STRUCTURE
  },
  science: {
    label: "Science",
    defaultGrade: "grade6",
    structure: SCIENCE_STRUCTURE
  },
  maths_ib: {
    label: "Maths",
    defaultGrade: "myp1",
    structure: MATHS_IB_STRUCTURE
  },
  science_ib: {
    label: "Science",
    defaultGrade: "myp1",
    structure: SCIENCE_IB_STRUCTURE
  },
  science_sat: {
    label: "Science",
    defaultGrade: "sat",
    structure: SCIENCE_SAT_STRUCTURE
  },
  english: {
    label: "English",
    defaultGrade: "myp1",
    structure: ENGLISH_STRUCTURE
  },
  french: {
    label: "French",
    defaultGrade: "myp13",
    structure: FRENCH_STRUCTURE
  },
  language_literature: {
    label: "Language & Literature",
    defaultGrade: "myp1",
    structure: LANGUAGE_LITERATURE_STRUCTURE
  },
  physics: {
    label: "Physics",
    defaultGrade: "myp45",
    structure: PHYSICS_STRUCTURE
  },
  projects: {
    label: "Projects",
    defaultGrade: "all",
    structure: PROJECTS_STRUCTURE
  }
};

const CURRICULUM_EXPLORER_SECTIONS = [
  { curriculum: "CBSE", subjects: ["maths", "science"] },
  { curriculum: "IB", subjects: ["maths_ib", "science_ib", "english", "french", "language_literature", "physics"] },
  { curriculum: "SAT", subjects: ["science_sat"] },
  { curriculum: "Other", subjects: ["projects"] }
];

const CBSE_GRADE_KEYS = ["grade6", "grade7", "grade8", "grade9", "grade10"];

const PDF_LIBRARY = [
  { subject: "Maths (MYP)", title: "Maths MYP 1", path: "curriculum/IB/maths/myp1/maths1.pdf" },
  { subject: "Maths (MYP)", title: "Maths MYP 2", path: "curriculum/IB/maths/myp2/maths2.pdf" },
  { subject: "Maths (MYP)", title: "Maths MYP 2 (V2)", path: "curriculum/IB/maths/myp2/Maths-myp-2-v2.pdf" },
  { subject: "Maths (MYP)", title: "Maths MYP 3", path: "curriculum/IB/maths/myp3/maths3.pdf" },
  { subject: "Maths (MYP)", title: "Maths MYP 4-5", path: "curriculum/IB/maths/myp4-5/maths4-5.pdf" },
  { subject: "Maths (MYP)", title: "Maths MYP 4-5 (Inquiry-led)", path: "curriculum/IB/maths/myp4-5/maths-4-5-inquiryled.pdf" },
  { subject: "Maths (MYP)", title: "Maths MYP 4-5 (Extended)", path: "curriculum/IB/maths/myp4-5/maths-extended.pdf" },
  { subject: "Science (MYP)", title: "Science MYP 3", path: "curriculum/IB/science/myp-3/science-3.pdf" },
  { subject: "English", title: "English MYP 1", path: "curriculum/IB/english/myp1/english1.pdf" },
  { subject: "English", title: "English Language Acquisition 1-3", path: "curriculum/IB/english/myp1/English-LanguageAcquisition1-3.pdf" },
  { subject: "English", title: "English MYP 4-5", path: "curriculum/IB/english/myp4-5/english4-5.pdf" },
  { subject: "French", title: "French MYP 1-3", path: "curriculum/IB/french/french1-3.pdf" },
  { subject: "French", title: "French Extracted Version", path: "curriculum/IB/french/French_MYP1-3_Extracted_From_Heyzine.pdf" },
  { subject: "French", title: "French Source PDF", path: "curriculum/IB/french/source_heyzine_french_myp.pdf" },
  { subject: "Language & Literature", title: "Language & Literature MYP 1", path: "curriculum/IB/languagelitreture/languagelitreture-1.pdf" },
  { subject: "Physics", title: "Physics MYP 4-5", path: "curriculum/IB/physics/myp45/physics-4-5.pdf" },
  { subject: "Physics", title: "Physics MYP 4-5 (V2)", path: "curriculum/IB/physics/myp45/physics45-v2.pdf" },
  { subject: "Projects", title: "Community Project", path: "projects/community-project.pdf" },
  { subject: "Projects", title: "Personal Project", path: "projects/personal-project.pdf" }
];

function renderCourseProgress(query = "") {
  const q = (query || "").trim().toLowerCase();
  const unlockedSkills = getUnlockedSkills();
  el.courseList.innerHTML = "";

  COURSE_PLAYLISTS.forEach((playlist) => {
    let courses = COURSE_DEFS.filter(playlist.filter);
    if (q) {
      courses = courses.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.skills.some((sk) => (SKILL_LABELS[sk] || sk).toLowerCase().includes(q))
      );
    }
    if (courses.length === 0) { return; }

    const playlistHeader = document.createElement("h4");
    playlistHeader.className = "playlist-header";
    playlistHeader.textContent = playlist.label;
    el.courseList.appendChild(playlistHeader);

    const grid = document.createElement("div");
    grid.className = "course-list-grid";

    courses.forEach((course) => {
      const avg = averageSkillMastery(course.skills);
      const card = document.createElement("article");
      card.className = "course-card";
      const pct = Math.min(100, Math.round((avg / 4) * 100));
      const progressBar = document.createElement("div");
      progressBar.className = "progress-track";
      progressBar.innerHTML = `<div class="progress-bar" style="width:${pct}%"></div>`;
      card.innerHTML = `<h4>${course.name}</h4><p>${course.skills.map((sk) => SKILL_LABELS[sk]).join(", ")}</p>`;
      card.appendChild(progressBar);
      const masteryP = document.createElement("p");
      masteryP.textContent = `Mastery ${avg.toFixed(2)} / 4.0`;
      card.appendChild(masteryP);
      const skillSessions = state.practiceSessions.filter((s) => s.skillTag === course.skills[0]);
      if (skillSessions.length > 0) {
        const bestPct = Math.round(Math.max(...skillSessions.map((s) => s.pct)));
        const statsP = document.createElement("p");
        statsP.className = "course-stats";
        statsP.textContent = `Best: ${bestPct}%  ·  ${skillSessions.length} session${skillSessions.length === 1 ? "" : "s"}`;
        card.appendChild(statsP);
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "course-practice-btn";
      btn.textContent = "Practice";
      btn.addEventListener("click", () => startPractice(course.skills[0]));
      card.appendChild(btn);
      if (unlockedSkills.includes(course.skills[0])) {
        card.style.borderColor = "#f4c44e";
      }
      grid.appendChild(card);
    });

    el.courseList.appendChild(grid);
  });
}

function renderQuestList() {
  el.questList.innerHTML = "";
  const sorted = state.quests.slice().sort((a, b) => a.questId.localeCompare(b.questId));
  sorted.forEach((quest) => {
    const progress = state.questProgress.get(quest.questId) || {
      profileId: state.profile.id,
      questId: quest.questId,
      progress: 0,
      completedAt: null,
      rewardClaimed: false
    };
    const li = document.createElement("li");
    const target = quest.target;
    const done = Math.min(progress.progress, target);
    const status = progress.rewardClaimed ? "Reward claimed" : progress.completedAt ? "Completed" : "In progress";
    li.innerHTML = `
      <span>${quest.title}<br><small>${done}/${target} | ${status}</small></span>
      <strong>${quest.rewardCoins} coins</strong>
    `;
    el.questList.appendChild(li);
  });
}

function renderRecentRuns() {
  el.recentRunsList.innerHTML = "";
  const recent = state.runs.slice(0, 6);
  if (recent.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No runs yet. Start your first run.";
    el.recentRunsList.appendChild(li);
    return;
  }
  recent.forEach((run) => {
    const li = document.createElement("li");
    li.className = "drilldown-item";
    const date = new Date(run.startedAt).toLocaleString();
    const acc = Math.round(run.accuracy);

    const header = document.createElement("div");
    header.className = "drilldown-header";
    header.innerHTML = `
      <div><strong>${date}</strong><br><small>${run.reason}</small></div>
      <div class="dd-right">
        <strong>${run.score} pts | ${acc}%</strong>
        <span class="expand-icon">▼</span>
      </div>
    `;

    const details = document.createElement("div");
    details.className = "drilldown-details hidden";
    details.innerHTML = `<p class="dd-hint">Loading...</p>`;

    let loaded = false;
    header.addEventListener("click", async () => {
      const hidden = details.classList.toggle("hidden");
      header.querySelector(".expand-icon").textContent = hidden ? "▼" : "▲";
      if (!hidden && !loaded) {
        loaded = true;
        const attempts = await idbGetAllByIndex("attempts", "runId", run.runId);
        const wrong = attempts.filter((a) => !a.correct);
        if (wrong.length === 0) {
          details.innerHTML = `<p class="dd-perfect">All gates answered correctly!</p>`;
        } else {
          const rows = wrong.map((a) => `
            <tr>
              <td class="dd-expr">${a.expression}</td>
              <td class="dd-ans dd-wrong-ans">${a.chosen}</td>
              <td class="dd-ans">${a.correctAnswer}</td>
            </tr>
          `).join("");
          details.innerHTML = `
            <p class="dd-hint">Gates you got wrong — review these:</p>
            <table class="dd-table">
              <thead><tr><th>Expression</th><th>Your Answer</th><th>Correct Answer</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          `;
        }
      }
    });

    li.append(header, details);
    el.recentRunsList.appendChild(li);
  });
}

function renderResourcesList() {
  el.resourceList.innerHTML = "";
  RESOURCE_CLIPS.forEach((clip) => {
    const li = document.createElement("li");
    const subtitle = clip.chapter
      ? `${clip.chapter} · ${SKILL_LABELS[clip.skillTag] || clip.skillTag}`
      : SKILL_LABELS[clip.skillTag] || clip.skillTag;
    li.innerHTML = `
      <span>${clip.label}<br><small>${subtitle}</small></span>
      <a href="${clip.url}" target="_blank" rel="noreferrer">Watch</a>
    `;
    el.resourceList.appendChild(li);
  });
}

function renderSubjectExplorerGrid() {
  el.subjectExplorerGrid.innerHTML = "";
  CURRICULUM_EXPLORER_SECTIONS.forEach((section) => {
    const validSubjects = section.subjects.filter((key) => SUBJECTS[key]);
    if (validSubjects.length === 0) {
      return;
    }

    const block = document.createElement("section");
    block.className = "curriculum-block";

    const title = document.createElement("h4");
    title.className = "curriculum-title";
    title.textContent = section.curriculum;
    block.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "curriculum-subject-grid";

    validSubjects.forEach((subjectKey) => {
      const subject = SUBJECTS[subjectKey];
      const card = document.createElement("article");
      card.className = "subject-card";
      const cardTitle = document.createElement("h4");
      cardTitle.textContent = subject.label;
      card.appendChild(cardTitle);

      const row = document.createElement("div");
      row.className = "subject-grade-pills";
      Object.entries(subject.structure).forEach(([gradeKey, grade]) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "subject-grade-pill";
        btn.textContent = grade.label;
        btn.addEventListener("click", () => openSubjectOverlay(subjectKey, gradeKey));
        row.appendChild(btn);
      });
      card.appendChild(row);
      grid.appendChild(card);
    });

    block.appendChild(grid);
    el.subjectExplorerGrid.appendChild(block);
  });
}

function renderCbseGradeGrid() {
  el.cbseGradeGrid.innerHTML = "";
  CBSE_GRADE_KEYS.forEach((gradeKey) => {
    const mathsGrade = SUBJECTS.maths.structure[gradeKey];
    const scienceGrade = SUBJECTS.science.structure[gradeKey];
    if (!mathsGrade || !scienceGrade) {
      return;
    }
    const card = document.createElement("article");
    card.className = "cbse-grade-card";
    card.innerHTML = `<h4>${mathsGrade.label}</h4><p>CBSE curriculum</p>`;

    const row = document.createElement("div");
    row.className = "cbse-grade-actions";

    const mathsBtn = document.createElement("button");
    mathsBtn.type = "button";
    mathsBtn.textContent = "Maths";
    mathsBtn.addEventListener("click", () => openSubjectOverlay("maths", gradeKey));

    const scienceBtn = document.createElement("button");
    scienceBtn.type = "button";
    scienceBtn.textContent = "Science";
    scienceBtn.addEventListener("click", () => openSubjectOverlay("science", gradeKey));

    row.append(mathsBtn, scienceBtn);
    card.appendChild(row);
    el.cbseGradeGrid.appendChild(card);
  });
}

function renderPdfLibraryList() {
  el.pdfLibraryList.innerHTML = "";
  const grouped = new Map();
  const curriculumRank = { CBSE: 1, IB: 2, SAT: 3, Other: 4 };

  const getCurriculumTag = (path) => {
    if (path.startsWith("curriculum/CBSE/")) { return "CBSE"; }
    if (path.startsWith("curriculum/IB/")) { return "IB"; }
    if (path.startsWith("curriculum/SAT/")) { return "SAT"; }
    return "Other";
  };

  PDF_LIBRARY.forEach((item) => {
    const curriculum = getCurriculumTag(item.path);
    const key = `${curriculum} · ${item.subject}`;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key).push(item);
  });

  Array.from(grouped.entries())
    .sort((a, b) => {
      const ca = a[0].split(" · ")[0];
      const cb = b[0].split(" · ")[0];
      const ra = curriculumRank[ca] || 99;
      const rb = curriculumRank[cb] || 99;
      return ra - rb || a[0].localeCompare(b[0]);
    })
    .forEach(([subject, items]) => {
    const section = document.createElement("section");
    section.className = "pdf-library-group";
    const heading = document.createElement("h4");
    heading.textContent = subject;
    section.appendChild(heading);

    const list = document.createElement("div");
    list.className = "pdf-library-items";
    items.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pdf-open-btn";
      btn.textContent = item.title;
      btn.addEventListener("click", () => openStandaloneContent(`${subject} · ${item.title}`, item.path));
      list.appendChild(btn);
    });
    section.appendChild(list);
    el.pdfLibraryList.appendChild(section);
    });
}

function openStandaloneContent(title, src) {
  el.subjectScreen.dataset.subject = "resource";
  el.subjectTitle.textContent = title;
  el.subjectGradeRow.innerHTML = "";
  el.subjectTabs.innerHTML = "";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "g6-tab active";
  btn.dataset.src = src;
  btn.textContent = "Open";
  btn.addEventListener("click", () => setSubjectActiveTab(btn));
  el.subjectTabs.appendChild(btn);
  el.subjectFrame.src = src;
  el.subjectScreen.classList.remove("hidden");
}

function setSubjectActiveTab(btn) {
  el.subjectTabs.querySelectorAll(".g6-tab").forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  el.subjectFrame.src = btn.dataset.src;
}

function openSubjectOverlay(subjectKey, gradeKey) {
  const subject = SUBJECTS[subjectKey];
  if (!subject) { return; }
  const grade = subject.structure[gradeKey];
  if (!grade) { return; }

  el.subjectScreen.dataset.subject = subjectKey;
  el.subjectTitle.textContent = `${subject.label} · ${grade.label}`;

  // Grade selector buttons
  el.subjectGradeRow.innerHTML = "";
  Object.entries(subject.structure).forEach(([key, g]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "g6-grade-btn" + (key === gradeKey ? " active" : "");
    btn.dataset.grade = key;
    btn.textContent = g.label;
    el.subjectGradeRow.appendChild(btn);
  });

  // Chapter tabs — direct click handlers (not delegation) for reliability
  el.subjectTabs.innerHTML = "";
  let firstSrc = "";
  let firstBtn = null;

  if (grade.landingPage) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "g6-tab";
    btn.dataset.src = grade.basePath + grade.landingPage;
    btn.textContent = grade.landingLabel || "Overview";
    btn.addEventListener("click", () => setSubjectActiveTab(btn));
    el.subjectTabs.appendChild(btn);
    firstSrc = grade.basePath + grade.landingPage;
    firstBtn = btn;
  }

  grade.chapters.forEach((ch, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "g6-tab";
    btn.dataset.src = grade.basePath + ch.file;
    btn.textContent = ch.label;
    btn.addEventListener("click", () => setSubjectActiveTab(btn));
    el.subjectTabs.appendChild(btn);
    if (i === 0 && !grade.landingPage) {
      firstSrc = grade.basePath + ch.file;
      firstBtn = btn;
    }
  });

  if (firstBtn) { firstBtn.classList.add("active"); }
  el.subjectFrame.src = firstSrc;
  el.subjectScreen.classList.remove("hidden");
}

function renderCheatsheetGrid() {
  el.cheatsheetGrid.innerHTML = "";
  CHEATSHEETS.forEach((cs) => {
    const card = document.createElement("a");
    card.className = "cheatsheet-card";
    card.href = cs.file;
    card.target = "_blank";
    card.rel = "noreferrer";
    const img = document.createElement("img");
    img.src = cs.file;
    img.alt = cs.title;
    img.loading = "lazy";
    const title = document.createElement("p");
    title.className = "cheatsheet-title";
    title.textContent = cs.title;
    card.append(img, title);
    el.cheatsheetGrid.appendChild(card);
  });
}

function renderThemeList() {
  el.themeList.innerHTML = "";
  THEME_PACKS.forEach((theme) => {
    const wrapper = document.createElement("article");
    wrapper.className = "theme-item";
    wrapper.innerHTML = `
      <div class="theme-preview" style="background:${theme.preview}"></div>
      <div class="body">
        <span>${theme.name}</span>
        <button data-theme-id="${theme.id}">Use</button>
      </div>
    `;
    wrapper.querySelector("button").addEventListener("click", () => setTheme(theme.id));
    el.themeList.appendChild(wrapper);
  });
}

function populateCustomizeForm() {
  const avatar = state.settings.avatar;
  el.bodyColor.value = avatar.bodyColor;
  el.hairColor.value = avatar.hairColor;
  el.outfitColor.value = avatar.outfitColor;
  el.trailColor.value = avatar.trailColor;
  el.accessory.value = avatar.accessory || "none";
  el.hairStyle.value = avatar.hairStyle || "long_straight";
  updateAvatarPreview();
}

async function onSaveAvatar(event) {
  event.preventDefault();
  state.settings.avatar = {
    bodyColor: el.bodyColor.value,
    hairColor: el.hairColor.value,
    outfitColor: el.outfitColor.value,
    trailColor: el.trailColor.value,
    accessory: el.accessory.value,
    hairStyle: el.hairStyle.value
  };
  await idbPut("settings", state.settings);
  updateAvatarPreview();
  renderDashboard();
}

function liveAvatarPreview() {
  el.avatarPreview.innerHTML = buildAvatarSVG({
    bodyColor:   el.bodyColor.value,
    hairColor:   el.hairColor.value,
    outfitColor: el.outfitColor.value,
    trailColor:  el.trailColor.value,
    accessory:   el.accessory.value,
    hairStyle:   el.hairStyle.value
  });
}

function updateAvatarPreview() {
  const avatar = state.settings?.avatar;
  if (!avatar) {
    return;
  }
  el.avatarPreview.innerHTML = buildAvatarSVG(avatar);
}

// ── SVG Avatar builder ──────────────────────────────────────────────────────

function hairBackSVG(style, h) {
  if (style === "long_straight") {
    return `<rect x="27" y="44" width="14" height="90" rx="7" fill="${h}"/>
            <rect x="79" y="44" width="14" height="90" rx="7" fill="${h}"/>`;
  }
  if (style === "ponytail") {
    return `<path d="M80 54 Q98 72 94 102 Q90 122 82 106 Q88 88 82 66 Z" fill="${h}"/>`;
  }
  if (style === "pigtails") {
    return `<ellipse cx="26" cy="86" rx="12" ry="18" fill="${h}"/>
            <ellipse cx="94" cy="86" rx="12" ry="18" fill="${h}"/>`;
  }
  if (style === "wavy_long") {
    return `<path d="M30 52 Q20 74 30 94 Q20 114 30 134" stroke="${h}" stroke-width="14" fill="none" stroke-linecap="round"/>
            <path d="M90 52 Q100 74 90 94 Q100 114 90 134" stroke="${h}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  }
  if (style === "braids") {
    return `<path d="M33 54 L28 68 L35 74 L28 84 L35 92 L28 102 L35 110 L30 120" stroke="${h}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M87 54 L92 68 L85 74 L92 84 L85 92 L92 102 L85 110 L90 120" stroke="${h}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  return "";
}

function hairFrontSVG(style, h) {
  const cap  = `<rect x="31" y="24" width="58" height="32" rx="15" fill="${h}"/>`;
  const bang = `<rect x="37" y="46" width="46" height="13" rx="6" fill="${h}"/>`;
  const sBng = `<rect x="42" y="46" width="36" height="10" rx="5" fill="${h}"/>`;
  if (style === "long_straight" || style === "ponytail" || style === "wavy_long") {
    return cap + bang;
  }
  if (style === "pigtails") {
    return cap + bang
      + `<circle cx="36" cy="52" r="5" fill="${h}"/><circle cx="84" cy="52" r="5" fill="${h}"/>`;
  }
  if (style === "bob") {
    return `<rect x="27" y="24" width="66" height="36" rx="15" fill="${h}"/>
            <rect x="27" y="46" width="14" height="24" rx="7" fill="${h}"/>
            <rect x="79" y="46" width="14" height="24" rx="7" fill="${h}"/>`
      + sBng;
  }
  if (style === "top_bun") {
    return cap + sBng
      + `<circle cx="60" cy="16" r="17" fill="${h}"/>
         <circle cx="60" cy="18" r="12" fill="${h}"/>
         <ellipse cx="60" cy="10" rx="7" ry="5" fill="${h}" opacity="0.6"/>`;
  }
  if (style === "braids") {
    return cap + bang;
  }
  if (style === "short_messy") {
    return `<path d="M36 46 L32 24 L39 34 L44 18 L49 34 L54 20 L58 36 L62 20 L66 34 L71 18 L76 34 L81 24 L84 46 Z" fill="${h}"/>
            <rect x="33" y="38" width="54" height="16" rx="8" fill="${h}"/>`;
  }
  if (style === "slicked_back") {
    return `<path d="M32 52 Q32 26 60 24 Q88 26 88 52 L88 44 Q88 30 60 28 Q32 30 32 44 Z" fill="${h}"/>`;
  }
  if (style === "mohawk") {
    return `<rect x="54" y="10" width="12" height="42" rx="6" fill="${h}"/>
            <ellipse cx="60" cy="50" rx="10" ry="6" fill="${h}"/>`;
  }
  return cap + bang;
}

function accessorySVGStr(id, o, h) {
  if (id === "crown") {
    return `<g transform="translate(60,14)">
      <path d="M-24 2 L-24 -18 L-12 -6 L0 -22 L12 -6 L24 -18 L24 2 Z" fill="#f4c44e"/>
      <path d="M-24 2 L24 2 L20 8 L-20 8 Z" fill="#d4a030"/>
      <circle cx="0" cy="-16" r="3.5" fill="#ff44aa"/>
      <circle cx="-16" cy="-4" r="3" fill="#44aaff"/>
      <circle cx="16" cy="-4" r="3" fill="#44aaff"/>
    </g>`;
  }
  if (id === "bow") {
    return `<g transform="translate(60,22)">
      <path d="M-22 -6 Q-10 2 0 -3 Q-10 -14 -22 -6Z" fill="${h}"/>
      <path d="M22 -6 Q10 2 0 -3 Q10 -14 22 -6Z" fill="${h}"/>
      <circle cx="0" cy="-3" r="6" fill="${h}"/>
      <path d="M-18 -10 Q-8 -1 0 -5" stroke="white" stroke-width="1.5" fill="none" opacity="0.45"/>
    </g>`;
  }
  if (id === "headband") {
    return `<path d="M33 52 Q60 36 87 52" stroke="${o}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  }
  if (id === "cat_ears") {
    return `<path d="M34 38 L24 14 L47 32 Z" fill="${h}"/>
            <path d="M34 36 L28 18 L44 30 Z" fill="#ffb3c6"/>
            <path d="M86 38 L96 14 L73 32 Z" fill="${h}"/>
            <path d="M86 36 L92 18 L76 30 Z" fill="#ffb3c6"/>`;
  }
  if (id === "flower") {
    return `<g transform="translate(80,36)">
      <circle cx="7" cy="-5" r="5" fill="#ff88cc"/>
      <circle cx="7" cy="5" r="5" fill="#ff88cc"/>
      <circle cx="-7" cy="-5" r="5" fill="#ff88cc"/>
      <circle cx="-7" cy="5" r="5" fill="#ff88cc"/>
      <circle cx="0" cy="-7" r="5" fill="#ff88cc"/>
      <circle cx="0" cy="7" r="5" fill="#ffaadd"/>
      <circle cx="0" cy="0" r="6" fill="#ffe066"/>
    </g>`;
  }
  if (id === "cap") {
    return `<path d="M36 54 Q36 26 60 24 Q84 26 84 54 Z" fill="${o}"/>
            <path d="M26 54 Q60 46 94 54" stroke="#333" stroke-width="5" fill="none" stroke-linecap="round"/>
            <circle cx="60" cy="26" r="4" fill="${o}" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>`;
  }
  if (id === "star_clips") {
    return `<path d="M39 47 L41 40 L43 47 L50 45 L45 49 L47 56 L41 52 L35 56 L37 49 L32 45 Z" fill="#f4c44e"/>
            <path d="M73 42 L75 35 L77 42 L84 40 L79 44 L81 51 L75 47 L69 51 L71 44 L66 40 Z" fill="#f4c44e"/>`;
  }
  if (id === "headphones") {
    return `<path d="M32 60 Q32 24 60 24 Q88 24 88 60" stroke="#2a2a3a" stroke-width="5" fill="none"/>
            <rect x="25" y="56" width="15" height="20" rx="7" fill="#2a2a3a"/>
            <rect x="80" y="56" width="15" height="20" rx="7" fill="#2a2a3a"/>
            <rect x="28" y="59" width="9" height="14" rx="4" fill="${o}"/>
            <rect x="83" y="59" width="9" height="14" rx="4" fill="${o}"/>`;
  }
  if (id === "tiara") {
    return `<path d="M35 48 L42 34 L51 46 L60 28 L69 46 L78 34 L85 48" stroke="#f4c44e" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="60" cy="28" r="4.5" fill="#ff44aa"/>
            <circle cx="45" cy="40" r="3" fill="#f4c44e"/>
            <circle cx="75" cy="40" r="3" fill="#f4c44e"/>`;
  }
  return "";
}

function buildAvatarSVG(avatar) {
  const s = avatar.bodyColor   || "#ffd7b0";
  const h = avatar.hairColor   || "#3d2618";
  const o = avatar.outfitColor || "#ff88bb";
  const style = avatar.hairStyle || "long_straight";
  const eye = "#2a1808";
  return `<svg viewBox="0 0 120 210" xmlns="http://www.w3.org/2000/svg">
    ${hairBackSVG(style, h)}
    <rect x="41" y="138" width="17" height="54" rx="8" fill="${o}"/>
    <rect x="62" y="138" width="17" height="54" rx="8" fill="${o}"/>
    <ellipse cx="49" cy="194" rx="13" ry="7" fill="#222233"/>
    <ellipse cx="71" cy="194" rx="13" ry="7" fill="#222233"/>
    <ellipse cx="46" cy="190" rx="5" ry="3" fill="#ffffff25"/>
    <ellipse cx="68" cy="190" rx="5" ry="3" fill="#ffffff25"/>
    <rect x="37" y="86" width="46" height="56" rx="10" fill="${o}"/>
    <path d="M53 86 Q60 97 67 86" fill="${s}" opacity="0.3"/>
    <rect x="20" y="90" width="16" height="48" rx="8" fill="${s}"/>
    <rect x="84" y="90" width="16" height="48" rx="8" fill="${s}"/>
    <ellipse cx="28" cy="140" rx="9" ry="8" fill="${s}"/>
    <ellipse cx="92" cy="140" rx="9" ry="8" fill="${s}"/>
    <rect x="52" y="80" width="16" height="10" rx="5" fill="${s}"/>
    <rect x="35" y="36" width="50" height="48" rx="14" fill="${s}"/>
    <ellipse cx="35" cy="62" rx="6" ry="8" fill="${s}"/>
    <ellipse cx="85" cy="62" rx="6" ry="8" fill="${s}"/>
    <ellipse cx="50" cy="56" rx="8" ry="9" fill="white"/>
    <ellipse cx="70" cy="56" rx="8" ry="9" fill="white"/>
    <circle cx="51" cy="57" r="5" fill="${eye}"/>
    <circle cx="71" cy="57" r="5" fill="${eye}"/>
    <circle cx="53" cy="55" r="2" fill="white"/>
    <circle cx="73" cy="55" r="2" fill="white"/>
    <circle cx="52" cy="59" r="1" fill="white"/>
    <circle cx="72" cy="59" r="1" fill="white"/>
    <line x1="43" y1="50" x2="46" y2="47" stroke="${eye}" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="47" y1="48" x2="50" y2="46" stroke="${eye}" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="51" y1="47" x2="53" y2="45" stroke="${eye}" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="77" y1="50" x2="74" y2="47" stroke="${eye}" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="73" y1="48" x2="70" y2="46" stroke="${eye}" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="69" y1="47" x2="67" y2="45" stroke="${eye}" stroke-width="1.4" stroke-linecap="round"/>
    <ellipse cx="43" cy="66" rx="7" ry="5" fill="#ffb3c6" opacity="0.6"/>
    <ellipse cx="77" cy="66" rx="7" ry="5" fill="#ffb3c6" opacity="0.6"/>
    <path d="M51 72 Q60 80 69 72" stroke="#d4607a" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    ${hairFrontSVG(style, h)}
    ${accessorySVGStr(avatar.accessory, o, h)}
  </svg>`;
}

async function setTheme(themeId) {
  state.settings.themeId = themeId;
  await idbPut("settings", state.settings);
  applyTheme(themeId);
}

function applyTheme(themeId) {
  document.body.dataset.theme = themeId;
}

function computeExpertise() {
  const values = Object.keys(SKILL_LABELS).map((skillTag) => getSkillMasteryLevel(skillTag));
  const value = values.reduce((sum, entry) => sum + entry, 0) / values.length;
  let label = EXPERTISE_LEVELS[0].label;
  for (const level of EXPERTISE_LEVELS) {
    if (value >= level.min) {
      label = level.label;
    }
  }
  return { label, value };
}

function getSkillMasteryLevel(skillTag) {
  const row = state.mastery.get(skillTag);
  if (!row) {
    return 0;
  }
  return Number(row.level || 0);
}

function averageSkillMastery(skillTags) {
  return skillTags.reduce((sum, skill) => sum + getSkillMasteryLevel(skill), 0) / skillTags.length;
}

function getUnlockedSkills() {
  return COURSE_DEFS.flatMap((course) => course.skills);
}

function startRun() {
  if (!state.profile) {
    return;
  }
  showScreen("gameScreen");
  if (localStorage.getItem("algbrox_skip_tutorial")) {
    beginCountdown();
  } else {
    el.tutorialDialog.showModal();
  }
}

function beginCountdown() {
  const overlay = el.countdownOverlay;
  overlay.classList.remove("hidden");
  let count = 3;
  overlay.textContent = String(count);
  const tick = () => {
    count -= 1;
    if (count > 0) {
      overlay.textContent = String(count);
      setTimeout(tick, 700);
    } else if (count === 0) {
      overlay.textContent = "GO!";
      setTimeout(() => {
        overlay.classList.add("hidden");
        beginRun();
      }, 500);
    }
  };
  setTimeout(tick, 700);
}

function beginRun() {
  const preset = SPEED_PRESETS.intermediate;
  const canvas = el.gameCanvas;
  const ctx = canvas.getContext("2d");
  state.game = {
    running: true,
    ctx,
    lane: 1,
    action: null,
    actionUntil: 0,
    spawnTimer: 0,
    speed: preset.baseSpeed,
    baseSpeed: preset.baseSpeed,
    spawnMultiplier: preset.spawnMultiplier || 1,
    distance: 0,
    score: 0,
    combo: 0,
    health: preset.health,
    attempts: [],
    events: [],
    runSkillErrors: {},
    shownResourceForSkill: {},
    recentAccuracy: [],
    difficulty: preset.initialDifficulty,
    runStartedAt: new Date().toISOString(),
    lastFrame: performance.now(),
    nextId: 1
  };
  el.dangerBanner.classList.add("hidden");
  updateHud();
  updateLaneButtons();
  showGameHint("Use ← → or Left/Right to change lanes. Move into the correct answer lane for math gates!", 9000);
  loop();
}


function showGameHint(text, duration) {
  el.gameHint.textContent = text;
  el.gameHint.classList.remove("hidden");
  setTimeout(() => el.gameHint.classList.add("hidden"), duration);
}

function loop() {
  const game = state.game;
  if (!game?.running) {
    return;
  }
  const now = performance.now();
  let dt = (now - game.lastFrame) / 1000;
  if (dt > 0.05) {
    dt = 0.05;
  }
  game.lastFrame = now;
  updateGame(dt, now);
  renderGame();
  if (game.health <= 0) {
    endRun("Out of health");
    return;
  }
  game.frameId = requestAnimationFrame(loop);
}

function updateGame(dt, now) {
  const game = state.game;
  game.spawnTimer -= dt;
  if (game.spawnTimer <= 0) {
    spawnEvent(now);
    game.spawnTimer = clamp(1.65 - (game.difficulty * 0.11), 0.75, 1.6) * game.spawnMultiplier;
  }

  game.speed = game.baseSpeed + Math.min(15, game.combo * 0.65);
  game.distance += game.speed * dt;
  game.events.forEach((event) => {
    event.distance -= game.speed * dt;
  });

  const pending = [];
  for (const event of game.events) {
    if (!event.resolved && event.distance <= 0) {
      resolveEvent(event, now);
      event.resolved = true;
    }
    if (event.distance > -18) {
      pending.push(event);
    }
  }
  game.events = pending;
  if (now > game.actionUntil) {
    game.action = null;
  }
  updatePromptCard();
  updateDangerWarning();
  updateHud();
}

function updateDangerWarning() {
  const game = state.game;
  const threat = game.events.find(
    (ev) => ev.type === "obstacle" && !ev.resolved && ev.distance > 0 && ev.distance < 72 && ev.lane === game.lane
  );
  if (threat) {
    el.dangerBanner.textContent = `⚠ ${threat.requiredAction.toUpperCase()} — or switch lanes!`;
    el.dangerBanner.classList.remove("hidden");
  } else {
    el.dangerBanner.classList.add("hidden");
  }
}

function spawnEvent(now) {
  const game = state.game;
  const isObstacle = Math.random() < 0.2;
  if (isObstacle) {
    game.events.push({
      id: game.nextId++,
      type: "obstacle",
      lane: randInt(0, 2),
      requiredAction: Math.random() < 0.5 ? "jump" : "slide",
      distance: 108,
      spawnedAt: now,
      resolved: false
    });
    return;
  }
  const skillTag = pickSkillTag();
  const question = generateQuestion(skillTag, game.difficulty);
  game.events.push({
    id: game.nextId++,
    type: "gate",
    skillTag,
    question,
    distance: 108,
    spawnedAt: now,
    resolved: false
  });
}

function pickSkillTag() {
  const unlocked = getUnlockedSkills();
  const candidates = unlocked.length > 0 ? unlocked : ["add_sub"];
  if (Math.random() < 0.62) {
    let weakest = candidates[0];
    let weakestScore = Number.MAX_SAFE_INTEGER;
    candidates.forEach((skill) => {
      const mastery = state.mastery.get(skill);
      const score = mastery ? (mastery.emaAccuracy * 2 + mastery.level) : 0;
      if (score < weakestScore) {
        weakest = skill;
        weakestScore = score;
      }
    });
    return weakest;
  }
  return candidates[randInt(0, candidates.length - 1)];
}

function generateQuestion(skillTag, difficulty) {
  switch (skillTag) {
    case "add_sub":
      return generateAddSub(difficulty, skillTag);
    case "mul_div":
      return generateMulDiv(difficulty, skillTag);
    case "exp_root":
      return generateExpRoot(difficulty, skillTag);
    case "grouping":
      return generateGrouping(difficulty, skillTag);
    case "signed":
      return generateSigned(difficulty, skillTag);
    case "mixed":
    default:
      return generateMixed(difficulty, skillTag);
  }
}

function finalizeQuestion(base) {
  const lanes = shuffle(base.options.slice());
  const correctLane = lanes.findIndex((entry) => entry === base.correctValue);
  return {
    promptType: base.promptType,
    expression: base.expression,
    options: lanes,
    correctLane,
    correctValue: base.correctValue,
    skillTag: base.skillTag
  };
}

function generateAddSub(difficulty, skillTag) {
  const a = randInt(4, 12 + difficulty * 3);
  const b = randInt(2, 8 + difficulty * 2);
  const c = randInt(1, 6 + difficulty * 2);
  const useThreeTerms = difficulty > 3 && Math.random() < 0.7;
  let expression;
  let answer;
  if (useThreeTerms) {
    expression = `${a} + ${b} - ${c}`;
    answer = a + b - c;
  } else {
    if (Math.random() < 0.5) {
      expression = `${a} + ${b}`;
      answer = a + b;
    } else {
      expression = `${a} - ${b}`;
      answer = a - b;
    }
  }
  return finalizeQuestion({
    skillTag,
    promptType: "Evaluate",
    expression,
    correctValue: formatNumber(answer),
    options: numericOptions(answer)
  });
}

function generateMulDiv(difficulty, skillTag) {
  const template = randInt(0, 2);
  let expression;
  let answer;
  if (template === 0) {
    const a = randInt(2, 8 + difficulty);
    const b = randInt(2, 6 + difficulty);
    expression = `${a} * ${b}`;
    answer = a * b;
  } else if (template === 1) {
    const b = randInt(2, 6 + difficulty);
    const c = randInt(2, 5 + difficulty);
    const a = b * c;
    expression = `${a} / ${b}`;
    answer = c;
  } else {
    const a = randInt(2, 7 + difficulty);
    const b = randInt(2, 5 + difficulty);
    const c = randInt(2, 4 + difficulty);
    expression = `${a} * ${b} / ${c}`;
    answer = (a * b) / c;
  }
  return finalizeQuestion({
    skillTag,
    promptType: "Evaluate",
    expression,
    correctValue: formatNumber(answer),
    options: numericOptions(answer)
  });
}

function generateExpRoot(difficulty, skillTag) {
  const template = randInt(0, 3);
  let expression;
  let answer;
  let firstOp = null;
  if (template === 0) {
    const a = randInt(2, 5);
    const p = randInt(2, 3);
    expression = `${a}^${p}`;
    answer = a ** p;
    firstOp = expression;
  } else if (template === 1) {
    const r = randInt(2, 9);
    expression = `sqrt(${r * r})`;
    answer = r;
    firstOp = expression;
  } else if (template === 2) {
    const a = randInt(2, 5);
    const p = 2;
    const b = randInt(1, 8);
    expression = `${a}^${p} + ${b}`;
    answer = a ** p + b;
    firstOp = `${a}^${p}`;
  } else {
    const r = randInt(2, 9);
    const b = randInt(2, 6);
    expression = `sqrt(${r * r}) * ${b}`;
    answer = r * b;
    firstOp = `sqrt(${r * r})`;
  }
  if (difficulty > 5 && Math.random() < 0.45 && firstOp) {
    const options = shuffle([firstOp, firstOp.replace("^", " + "), `(${randInt(1, 9)} + ${randInt(1, 9)})`]);
    return finalizeQuestion({
      skillTag,
      promptType: "Which operation goes first?",
      expression,
      correctValue: firstOp,
      options
    });
  }
  return finalizeQuestion({
    skillTag,
    promptType: "Evaluate",
    expression,
    correctValue: formatNumber(answer),
    options: numericOptions(answer)
  });
}

function generateGrouping(difficulty, skillTag) {
  const template = randInt(0, 2);
  let expression;
  let answer;
  let firstOp;
  if (template === 0) {
    const a = randInt(1, 9);
    const b = randInt(1, 9);
    const c = randInt(2, 6);
    expression = `(${a} + ${b}) * ${c}`;
    answer = (a + b) * c;
    firstOp = `${a} + ${b}`;
  } else if (template === 1) {
    const a = randInt(2, 7);
    const b = randInt(1, 8);
    const c = randInt(1, 8);
    expression = `${a} * (${b} + ${c})`;
    answer = a * (b + c);
    firstOp = `${b} + ${c}`;
  } else {
    const a = randInt(1, 6);
    const b = randInt(1, 6);
    const c = randInt(2, 6);
    const d = randInt(1, 4);
    expression = `(${a} + ${b}) * (${c} - ${d})`;
    answer = (a + b) * (c - d);
    firstOp = `${a} + ${b}`;
  }
  if (Math.random() < 0.55) {
    const distractorA = `${randInt(2, 8)} * ${randInt(2, 8)}`;
    const distractorB = `${randInt(2, 8)} - ${randInt(1, 5)}`;
    return finalizeQuestion({
      skillTag,
      promptType: "Which operation goes first?",
      expression,
      correctValue: firstOp,
      options: shuffle([firstOp, distractorA, distractorB])
    });
  }
  return finalizeQuestion({
    skillTag,
    promptType: "Evaluate",
    expression,
    correctValue: formatNumber(answer),
    options: numericOptions(answer)
  });
}

function generateMixed(difficulty, skillTag) {
  const template = randInt(0, 4);
  let expression;
  let answer;
  let firstOp;
  if (template === 0) {
    const a = randInt(1, 12);
    const b = randInt(2, 6);
    const c = randInt(2, 6);
    expression = `${a} + ${b} * ${c}`;
    answer = a + b * c;
    firstOp = `${b} * ${c}`;
  } else if (template === 1) {
    const a = randInt(2, 6);
    const b = randInt(1, 6);
    const c = randInt(1, 6);
    expression = `${a} * (${b} + ${c})`;
    answer = a * (b + c);
    firstOp = `${b} + ${c}`;
  } else if (template === 2) {
    const a = randInt(2, 5);
    const b = randInt(1, 8);
    expression = `${a}^2 + ${b}`;
    answer = a ** 2 + b;
    firstOp = `${a}^2`;
  } else if (template === 3) {
    const root = randInt(2, 8);
    const c = randInt(2, 6);
    const d = randInt(2, 4);
    expression = `sqrt(${root * root}) + ${c} * ${d}`;
    answer = root + c * d;
    firstOp = `sqrt(${root * root})`;
  } else {
    const a = randInt(2, 7);
    const b = randInt(1, 8);
    const c = randInt(1, 8);
    const d = randInt(1, 5);
    expression = `(${a} + ${b}) * ${c} - ${d}`;
    answer = (a + b) * c - d;
    firstOp = `${a} + ${b}`;
  }

  const askFirstOperation = difficulty > 4 && Math.random() < 0.52;
  if (askFirstOperation) {
    return finalizeQuestion({
      skillTag,
      promptType: "Which operation goes first?",
      expression,
      correctValue: firstOp,
      options: shuffle([firstOp, `${randInt(2, 9)} + ${randInt(2, 9)}`, `${randInt(2, 9)} * ${randInt(2, 9)}`])
    });
  }
  return finalizeQuestion({
    skillTag,
    promptType: "Evaluate",
    expression,
    correctValue: formatNumber(answer),
    options: numericOptions(answer)
  });
}

function generateSigned(difficulty, skillTag) {
  const a = randInt(3, 9 + difficulty);
  const b = randInt(2, 8);
  const c = randInt(2, 6);
  const template = randInt(0, 2);
  let expression;
  let answer;
  if (template === 0) {
    expression = `-${a} + ${b} * ${c}`;
    answer = -a + b * c;
  } else if (template === 1) {
    expression = `(${a} - ${b}) * -${c}`;
    answer = (a - b) * -c;
  } else {
    expression = `-${a} + (${b} + ${c})`;
    answer = -a + (b + c);
  }
  return finalizeQuestion({
    skillTag,
    promptType: "Evaluate",
    expression,
    correctValue: formatNumber(answer),
    options: numericOptions(answer)
  });
}

function resolveEvent(event, now) {
  const game = state.game;
  if (event.type === "obstacle") {
    if (game.lane === event.lane) {
      const ok = game.action === event.requiredAction && now <= game.actionUntil;
      if (ok) {
        game.score += 60 + game.combo * 2;
      } else {
        game.health -= 1;
        game.combo = 0;
        game.score = Math.max(0, game.score - 80);
      }
    } else {
      game.score += 20;
    }
    adjustDifficultyFromObstacle();
    return;
  }

  const question = event.question;
  const chosenValue = question.options[game.lane];
  const correct = game.lane === question.correctLane;
  const responseMs = Math.round(now - event.spawnedAt);
  game.attempts.push({
    profileId: state.profile.id,
    runTempId: game.runStartedAt,
    skillTag: question.skillTag,
    expression: question.expression,
    chosen: chosenValue,
    correctAnswer: question.options[question.correctLane],
    promptType: question.promptType,
    correct,
    responseMs,
    createdAt: new Date().toISOString()
  });
  game.recentAccuracy.push(correct ? 1 : 0);
  if (game.recentAccuracy.length > 8) {
    game.recentAccuracy.shift();
  }
  if (correct) {
    game.combo += 1;
    game.score += 120 + game.combo * 10;
    game.runSkillErrors[question.skillTag] = 0;
  } else {
    game.combo = 0;
    game.health -= 1;
    game.score = Math.max(0, game.score - 90);
    game.runSkillErrors[question.skillTag] = (game.runSkillErrors[question.skillTag] || 0) + 1;
    if (game.runSkillErrors[question.skillTag] >= 2 && !game.shownResourceForSkill[question.skillTag]) {
      showResourceHint(question.skillTag);
      game.shownResourceForSkill[question.skillTag] = true;
    }
  }
  adjustDifficulty(correct, responseMs);
}

function adjustDifficulty(correct, responseMs) {
  const game = state.game;
  if (correct && responseMs < 3800) {
    game.difficulty = clamp(game.difficulty + 0.15, 1, 9);
  } else if (!correct) {
    game.difficulty = clamp(game.difficulty - 0.3, 1, 9);
  } else {
    game.difficulty = clamp(game.difficulty + 0.05, 1, 9);
  }
}

function adjustDifficultyFromObstacle() {
  const game = state.game;
  const avgAccuracy = game.recentAccuracy.length
    ? game.recentAccuracy.reduce((sum, value) => sum + value, 0) / game.recentAccuracy.length
    : 1;
  if (avgAccuracy > 0.85) {
    game.difficulty = clamp(game.difficulty + 0.08, 1, 9);
  } else if (avgAccuracy < 0.55) {
    game.difficulty = clamp(game.difficulty - 0.08, 1, 9);
  }
}

function showResourceHint(skillTag) {
  const clip = RESOURCE_CLIPS.find((item) => item.skillTag === skillTag) || RESOURCE_CLIPS[0];
  el.resourceCard.classList.remove("hidden");
  el.resourceCard.innerHTML = `
    <p><strong>Need a quick refresher?</strong></p>
    <p>${clip.label} (${SKILL_LABELS[skillTag] || skillTag})</p>
    <p><a href="${clip.url}" target="_blank" rel="noreferrer">Watch Math Antics clip</a></p>
  `;
  setTimeout(() => {
    el.resourceCard.classList.add("hidden");
  }, 9000);
}

function updatePromptCard() {
  const game = state.game;
  const nextGate = game.events
    .filter((item) => item.type === "gate" && !item.resolved && item.distance > 0)
    .sort((a, b) => a.distance - b.distance)[0];

  if (!nextGate || nextGate.distance > 72) {
    el.promptCard.classList.add("hidden");
    el.laneOptions.classList.add("hidden");
    return;
  }
  const question = nextGate.question;
  el.promptType.textContent = question.promptType;
  el.promptExpression.textContent = question.expression;
  el.promptCard.classList.remove("hidden");
  el.laneOptions.classList.remove("hidden");
  const laneButtons = el.laneOptions.querySelectorAll(".lane-option");
  laneButtons.forEach((button, lane) => {
    button.textContent = question.options[lane];
    button.setAttribute("aria-label", `Lane ${lane + 1}: ${question.options[lane]}`);
    button.classList.toggle("active", lane === state.game.lane);
  });
  el.hudSkill.textContent = SKILL_LABELS[question.skillTag] || question.skillTag;
}

function updateLaneButtons() {
  const buttons = el.laneOptions.querySelectorAll(".lane-option");
  buttons.forEach((button, idx) => {
    button.classList.toggle("active", idx === state.game?.lane);
  });
}

function updateHud() {
  const game = state.game;
  if (!game) {
    return;
  }
  const total = game.attempts.length || 1;
  const correct = game.attempts.filter((entry) => entry.correct).length;
  const accuracy = (correct / total) * 100;
  el.hudScore.textContent = String(Math.round(game.score));
  el.hudCombo.textContent = String(game.combo);
  el.hudHealth.textContent = String(game.health);
  el.hudAccuracy.textContent = `${Math.round(accuracy)}%`;
}

function renderGame() {
  const game = state.game;
  const ctx = game.ctx;
  const canvas = el.gameCanvas;
  const width = canvas.width;
  const height = canvas.height;
  const theme = getComputedStyle(document.body);
  const bgTop = theme.getPropertyValue("--bg-top").trim();
  const bgBottom = theme.getPropertyValue("--bg-bottom").trim();
  const road = theme.getPropertyValue("--road").trim();
  const laneColor = theme.getPropertyValue("--lane").trim();

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, bgTop);
  gradient.addColorStop(1, bgBottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff66";
  for (let i = 0; i < 8; i += 1) {
    ctx.fillRect(i * 140 + (game.distance * 0.3 % 140), 65 + (i % 2) * 15, 70, 10);
  }

  ctx.beginPath();
  ctx.moveTo(width * 0.26, height * 0.18);
  ctx.lineTo(width * 0.74, height * 0.18);
  ctx.lineTo(width * 0.93, height);
  ctx.lineTo(width * 0.07, height);
  ctx.closePath();
  ctx.fillStyle = road;
  ctx.fill();

  ctx.strokeStyle = laneColor;
  ctx.lineWidth = 2;
  const laneStarts = [0.33, 0.5, 0.67];
  laneStarts.forEach((ratio) => {
    ctx.beginPath();
    ctx.moveTo(width * ratio, height * 0.18);
    ctx.lineTo(width * (ratio + (ratio - 0.5) * 0.55), height);
    ctx.stroke();
  });

  game.events.forEach((event) => {
    if (event.distance < 0) {
      return;
    }
    const depth = clamp(1 - event.distance / 110, 0, 1);
    const y = height * 0.2 + depth * height * 0.72;
    const scale = 0.35 + depth * 0.85;

    if (event.type === "gate") {
      for (let lane = 0; lane < 3; lane += 1) {
        const x = laneToX(lane, depth, width);
        const laneWidth = 52 * scale;
        const laneHeight = 34 * scale;
        ctx.fillStyle = lane === event.question.correctLane ? "#f4c44eaa" : "#ffffffa6";
        ctx.fillRect(x - laneWidth / 2, y - laneHeight / 2, laneWidth, laneHeight);
        ctx.fillStyle = "#17372e";
        ctx.font = `${Math.max(11, 11 * scale)}px Baloo 2`;
        ctx.textAlign = "center";
        ctx.fillText(event.question.options[lane], x, y + 4);
      }
    } else {
      const x = laneToX(event.lane, depth, width);
      const blockWidth = 56 * scale;
      const blockHeight = 42 * scale;
      ctx.fillStyle = event.requiredAction === "jump" ? "#ff7b54" : "#4069f5";
      ctx.fillRect(x - blockWidth / 2, y - blockHeight / 2, blockWidth, blockHeight);
      ctx.fillStyle = "#ffffff";
      ctx.font = `${Math.max(11, 10 * scale)}px Baloo 2`;
      ctx.textAlign = "center";
      ctx.fillText(event.requiredAction.toUpperCase(), x, y + 3);
    }
  });

  drawPlayer(ctx, game, width, height);
}

function drawPlayer(ctx, game, width, height) {
  const avatar = state.settings.avatar;
  const laneX = laneToX(game.lane, 1, width);
  const baseY = height * 0.88 - (game.action === "jump" ? 45 : 0) + (game.action === "slide" ? 18 : 0);
  const bodyHeight = game.action === "slide" ? 26 : 40;

  ctx.fillStyle = avatar.trailColor;
  ctx.fillRect(laneX - 36, baseY + 10, 72, 8);
  ctx.fillStyle = avatar.outfitColor;
  ctx.fillRect(laneX - 18, baseY - bodyHeight, 36, bodyHeight);
  ctx.fillStyle = avatar.bodyColor;
  ctx.fillRect(laneX - 14, baseY - bodyHeight - 24, 28, 24);
  ctx.fillStyle = avatar.hairColor;
  ctx.fillRect(laneX - 14, baseY - bodyHeight - 24, 28, 8);
  if (avatar.accessory !== "none") {
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(ACCESSORY_ICONS[avatar.accessory], laneX, baseY - bodyHeight - 30);
  }
}

function laneToX(lane, depth, width) {
  const topPositions = [width * 0.39, width * 0.5, width * 0.61];
  const bottomPositions = [width * 0.25, width * 0.5, width * 0.75];
  return topPositions[lane] + (bottomPositions[lane] - topPositions[lane]) * depth;
}

function shiftLane(delta) {
  if (!state.game?.running) {
    return;
  }
  setLane(state.game.lane + delta);
}

function setLane(targetLane) {
  if (!state.game?.running) {
    return;
  }
  state.game.lane = clamp(targetLane, 0, 2);
  updateLaneButtons();
}

function triggerAction(action) {
  if (!state.game?.running) {
    return;
  }
  state.game.action = action;
  state.game.actionUntil = performance.now() + 550;
}

async function endRun(reason) {
  const game = state.game;
  if (!game?.running) {
    return;
  }
  game.running = false;
  cancelAnimationFrame(game.frameId);
  el.dangerBanner.classList.add("hidden");
  el.gameHint.classList.add("hidden");
  const attemptCount = game.attempts.length;
  const correctCount = game.attempts.filter((entry) => entry.correct).length;
  const accuracy = attemptCount > 0 ? (correctCount / attemptCount) * 100 : 100;
  const runRecord = {
    profileId: state.profile.id,
    startedAt: game.runStartedAt,
    endedAt: new Date().toISOString(),
    score: Math.round(game.score),
    distance: Math.round(game.distance),
    accuracy,
    reason
  };
  let runCoins = 0;
  if (!state.teacherMode) {
    const runId = await idbAdd("runs", runRecord);
    for (const attempt of game.attempts) {
      attempt.runId = runId;
      await idbAdd("attempts", attempt);
    }
    const masteryRewards = await updateMasteryFromRun(game.attempts);
    const questRewards = await updateQuestProgressAfterRun(runRecord, game.attempts);
    runCoins = Math.round(game.score / 220);
    state.settings.coins += runCoins + masteryRewards + questRewards;
    await idbPut("settings", state.settings);
    state.runs.unshift({ ...runRecord, runId });
  }
  renderDashboard();
  const coinNote = state.teacherMode ? " (Teacher Mode — not saved)" : `, +${runCoins} coins`;
  el.runSummaryText.textContent = `Score ${runRecord.score}, distance ${runRecord.distance}, accuracy ${Math.round(runRecord.accuracy)}%${coinNote}`;
  el.runSummaryDialog.showModal();
}

async function updateMasteryFromRun(attempts) {
  const bySkill = new Map();
  attempts.forEach((attempt) => {
    if (!bySkill.has(attempt.skillTag)) {
      bySkill.set(attempt.skillTag, { total: 0, correct: 0, response: 0 });
    }
    const item = bySkill.get(attempt.skillTag);
    item.total += 1;
    item.correct += attempt.correct ? 1 : 0;
    item.response += attempt.responseMs;
  });
  let rewardCoins = 0;

  for (const [skillTag, item] of bySkill.entries()) {
    const key = [state.profile.id, skillTag];
    const existing = await idbGet("mastery", key) || {
      profileId: state.profile.id,
      skillTag,
      attempts: 0,
      correct: 0,
      emaAccuracy: 0.5,
      emaSpeed: 5000,
      level: 0,
      updatedAt: null
    };
    const prevLevel = existing.level || 0;
    const runAccuracy = item.correct / item.total;
    const avgSpeed = item.response / item.total;
    existing.attempts += item.total;
    existing.correct += item.correct;
    existing.emaAccuracy = existing.emaAccuracy * 0.8 + runAccuracy * 0.2;
    existing.emaSpeed = existing.emaSpeed * 0.75 + avgSpeed * 0.25;
    existing.level = computeSkillLevel(existing);
    existing.updatedAt = new Date().toISOString();
    await idbPut("mastery", existing);
    state.mastery.set(skillTag, existing);
    if (Math.floor(existing.level) > Math.floor(prevLevel)) {
      rewardCoins += 20;
    }
  }
  return rewardCoins;
}

function computeSkillLevel(entry) {
  if (entry.attempts < 8) {
    return 0.8;
  }
  const accScore = clamp(entry.emaAccuracy * 3.6, 0, 3.6);
  const speedScore = clamp((7000 - entry.emaSpeed) / 3000, 0, 1);
  return clamp(accScore + speedScore, 0, 4);
}

async function ensureQuestDefinitions() {
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const weekKey = isoWeekKey(today);
  const quests = [
    {
      questId: `daily-runs-${todayKey}`,
      cadence: "daily",
      metric: "runs",
      title: "Daily Sprint: Finish 3 runs",
      target: 3,
      rewardCoins: 30
    },
    {
      questId: `daily-correct-${todayKey}`,
      cadence: "daily",
      metric: "correct_answers",
      title: "Daily Focus: Get 20 correct gates",
      target: 20,
      rewardCoins: 35
    },
    {
      questId: `weekly-mixed-${weekKey}`,
      cadence: "weekly",
      metric: "mixed_correct",
      title: "Weekly Boss: 12 mixed precedence correct",
      target: 12,
      rewardCoins: 80
    }
  ];

  for (const quest of quests) {
    const existing = await idbGet("quests", quest.questId);
    if (!existing) {
      await idbPut("quests", quest);
    }
  }
}

async function updateQuestProgressAfterRun(runRecord, attempts) {
  state.quests = await idbGetAll("quests");
  let rewardCoins = 0;

  for (const quest of state.quests) {
    const metricIncrement = getQuestIncrement(quest.metric, runRecord, attempts);
    if (metricIncrement === 0) {
      continue;
    }
    const key = [state.profile.id, quest.questId];
    const row = await idbGet("questProgress", key) || {
      profileId: state.profile.id,
      questId: quest.questId,
      progress: 0,
      completedAt: null,
      rewardClaimed: false
    };
    row.progress += metricIncrement;
    if (!row.completedAt && row.progress >= quest.target) {
      row.completedAt = new Date().toISOString();
    }
    if (row.completedAt && !row.rewardClaimed) {
      row.rewardClaimed = true;
      rewardCoins += quest.rewardCoins;
    }
    await idbPut("questProgress", row);
    state.questProgress.set(quest.questId, row);
  }
  return rewardCoins;
}

function getQuestIncrement(metric, runRecord, attempts) {
  if (metric === "runs") {
    return 1;
  }
  if (metric === "correct_answers") {
    return attempts.filter((attempt) => attempt.correct).length;
  }
  if (metric === "mixed_correct") {
    return attempts.filter((attempt) => attempt.skillTag === "mixed" && attempt.correct).length;
  }
  if (metric === "distance") {
    return runRecord.distance;
  }
  return 0;
}

function isToday(dateIso) {
  const date = new Date(dateIso);
  const now = new Date();
  return date.getFullYear() === now.getFullYear()
    && date.getMonth() === now.getMonth()
    && date.getDate() === now.getDate();
}

function isoWeekKey(date) {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((tmp - yearStart) / 86400000) + 1) / 7);
  return `${tmp.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function numericOptions(answer) {
  const set = new Set([formatNumber(answer)]);
  let guard = 0;
  while (set.size < 3 && guard < 30) {
    guard += 1;
    const delta = randInt(1, 7) * (Math.random() < 0.5 ? -1 : 1);
    const alt = Number(answer) + delta;
    set.add(formatNumber(alt));
  }
  return [...set];
}

function formatNumber(value) {
  const rounded = Math.round(value * 100) / 100;
  if (Number.isInteger(rounded)) {
    return String(rounded);
  }
  return String(rounded);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror   = () => reject(request.error);
    request.onblocked = () => {
      console.warn("IndexedDB upgrade blocked — close other tabs and reload.");
    };
    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("profiles")) {
        db.createObjectStore("profiles", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", { keyPath: "profileId" });
      }
      if (!db.objectStoreNames.contains("inventory")) {
        const inventory = db.createObjectStore("inventory", { keyPath: ["profileId", "itemId"] });
        inventory.createIndex("profileId", "profileId", { unique: false });
      }
      if (!db.objectStoreNames.contains("runs")) {
        const runs = db.createObjectStore("runs", { keyPath: "runId", autoIncrement: true });
        runs.createIndex("profileId", "profileId", { unique: false });
      }
      if (!db.objectStoreNames.contains("attempts")) {
        const attempts = db.createObjectStore("attempts", { keyPath: "attemptId", autoIncrement: true });
        attempts.createIndex("profileId", "profileId", { unique: false });
        attempts.createIndex("runId", "runId", { unique: false });
      }
      if (!db.objectStoreNames.contains("mastery")) {
        const mastery = db.createObjectStore("mastery", { keyPath: ["profileId", "skillTag"] });
        mastery.createIndex("profileId", "profileId", { unique: false });
      }
      if (!db.objectStoreNames.contains("quests")) {
        db.createObjectStore("quests", { keyPath: "questId" });
      }
      if (!db.objectStoreNames.contains("questProgress")) {
        const questProgress = db.createObjectStore("questProgress", { keyPath: ["profileId", "questId"] });
        questProgress.createIndex("profileId", "profileId", { unique: false });
      }
      if (!db.objectStoreNames.contains("practiceSessions")) {
        const ps = db.createObjectStore("practiceSessions", { keyPath: "sessionId", autoIncrement: true });
        ps.createIndex("profileId", "profileId", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
  });
}

function idbTransaction(storeName, mode, runner) {
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    const request = runner(store);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function idbGet(storeName, key) {
  return idbTransaction(storeName, "readonly", (store) => store.get(key));
}

function idbGetAll(storeName) {
  return idbTransaction(storeName, "readonly", (store) => store.getAll());
}

function idbGetAllByIndex(storeName, indexName, key) {
  return idbTransaction(storeName, "readonly", (store) => store.index(indexName).getAll(key));
}

function idbPut(storeName, value) {
  return idbTransaction(storeName, "readwrite", (store) => store.put(value));
}

function idbAdd(storeName, value) {
  return idbTransaction(storeName, "readwrite", (store) => store.add(value));
}

// ─────────────────────────────────── Arithmetic practice generators

function genArithStep(before, after, prompt, correctVal) {
  const opts = shuffle(numericOptions(correctVal));
  const correctStr = formatNumber(correctVal);
  return { before, after, prompt, operation: `= ${correctStr}`, options: opts, correctIdx: opts.indexOf(correctStr) };
}

function genPracticeAddSub() {
  const a = randInt(4, 20), b = randInt(2, 15);
  if (Math.random() < 0.45) {
    const sub = Math.random() < 0.5, sym = sub ? "−" : "+", ans = sub ? a - b : a + b;
    return {
      display: `${a} ${sym} ${b}`,
      steps: [genArithStep(`${a} ${sym} ${b}`, String(ans), `What is ${a} ${sym} ${b}?`, ans)],
      answer: String(ans)
    };
  }
  const c = randInt(1, 12);
  const s1 = Math.random() < 0.5, s2 = Math.random() < 0.5;
  const sym1 = s1 ? "−" : "+", sym2 = s2 ? "−" : "+";
  const mid = s1 ? a - b : a + b, ans = s2 ? mid - c : mid + c;
  return {
    display: `${a} ${sym1} ${b} ${sym2} ${c}`,
    steps: [
      genArithStep(`[${a} ${sym1} ${b}] ${sym2} ${c}`, `${mid} ${sym2} ${c}`,
        `What is ${a} ${sym1} ${b}? (left to right)`, mid),
      genArithStep(`${mid} ${sym2} ${c}`, String(ans),
        `What is ${mid} ${sym2} ${c}?`, ans)
    ],
    answer: String(ans)
  };
}

function genPracticeMultiDiv() {
  const a = randInt(2, 9), b = randInt(2, 9), prod = a * b;
  if (Math.random() < 0.45) {
    return {
      display: `${a} × ${b}`,
      steps: [genArithStep(`${a} × ${b}`, String(prod), `What is ${a} × ${b}?`, prod)],
      answer: String(prod)
    };
  }
  const divisor = Math.random() < 0.5 ? a : b, finalAns = prod / divisor;
  return {
    display: `${a} × ${b} ÷ ${divisor}`,
    steps: [
      genArithStep(`[${a} × ${b}] ÷ ${divisor}`, `${prod} ÷ ${divisor}`,
        `What is ${a} × ${b}? (left to right)`, prod),
      genArithStep(`${prod} ÷ ${divisor}`, String(finalAns),
        `What is ${prod} ÷ ${divisor}?`, finalAns)
    ],
    answer: String(finalAns)
  };
}

function genPracticeExpRoot() {
  const t = randInt(0, 3);
  if (t === 0) {
    const a = randInt(2, 5), p = randInt(2, 3), ans = a ** p;
    return {
      display: `${a}^${p}`,
      steps: [genArithStep(`${a}^${p}`, String(ans), `What is ${a} to the power of ${p}?`, ans)],
      answer: String(ans)
    };
  }
  if (t === 1) {
    const n = randInt(2, 9);
    return {
      display: `√${n * n}`,
      steps: [genArithStep(`√${n * n}`, String(n), `What is √${n * n}?`, n)],
      answer: String(n)
    };
  }
  if (t === 2) {
    const a = randInt(2, 5), b = randInt(1, 10), pow = a ** 2, ans = pow + b;
    return {
      display: `${a}^2 + ${b}`,
      steps: [
        genArithStep(`[${a}^2] + ${b}`, `${pow} + ${b}`, `What is ${a}^2? (exponents first)`, pow),
        genArithStep(`${pow} + ${b}`, String(ans), `What is ${pow} + ${b}?`, ans)
      ],
      answer: String(ans)
    };
  }
  const n = randInt(2, 8), b = randInt(2, 6), ans = n * b;
  return {
    display: `√${n * n} × ${b}`,
    steps: [
      genArithStep(`[√${n * n}] × ${b}`, `${n} × ${b}`, `What is √${n * n}? (roots first)`, n),
      genArithStep(`${n} × ${b}`, String(ans), `What is ${n} × ${b}?`, ans)
    ],
    answer: String(ans)
  };
}

function genPracticeGrouping() {
  const t = randInt(0, 2);
  if (t === 0) {
    const a = randInt(1, 9), b = randInt(1, 9), c = randInt(2, 6), inner = a + b, ans = inner * c;
    return {
      display: `(${a} + ${b}) × ${c}`,
      steps: [
        genArithStep(`(${a} + ${b}) × ${c}`, `${inner} × ${c}`,
          `What is ${a} + ${b}? (parentheses first)`, inner),
        genArithStep(`${inner} × ${c}`, String(ans), `What is ${inner} × ${c}?`, ans)
      ],
      answer: String(ans)
    };
  }
  if (t === 1) {
    const a = randInt(2, 6), b = randInt(1, 8), c = randInt(1, 8), inner = b + c, ans = a * inner;
    return {
      display: `${a} × (${b} + ${c})`,
      steps: [
        genArithStep(`${a} × (${b} + ${c})`, `${a} × ${inner}`,
          `What is ${b} + ${c}? (parentheses first)`, inner),
        genArithStep(`${a} × ${inner}`, String(ans), `What is ${a} × ${inner}?`, ans)
      ],
      answer: String(ans)
    };
  }
  const a = randInt(1, 6), b = randInt(1, 6), c = randInt(4, 10), d = randInt(1, c - 1);
  const i1 = a + b, i2 = c - d, ans = i1 * i2;
  return {
    display: `(${a} + ${b}) × (${c} − ${d})`,
    steps: [
      genArithStep(`(${a} + ${b}) × (${c} − ${d})`, `${i1} × (${c} − ${d})`,
        `What is ${a} + ${b}? (left parentheses first)`, i1),
      genArithStep(`${i1} × (${c} − ${d})`, `${i1} × ${i2}`,
        `What is ${c} − ${d}?`, i2),
      genArithStep(`${i1} × ${i2}`, String(ans), `What is ${i1} × ${i2}?`, ans)
    ],
    answer: String(ans)
  };
}

function genPracticeMixed() {
  const t = randInt(0, 3);
  if (t === 0) {
    const a = randInt(1, 12), b = randInt(2, 6), c = randInt(2, 6), prod = b * c, ans = a + prod;
    return {
      display: `${a} + ${b} × ${c}`,
      steps: [
        genArithStep(`${a} + [${b} × ${c}]`, `${a} + ${prod}`,
          `What is ${b} × ${c}? (× before +)`, prod),
        genArithStep(`${a} + ${prod}`, String(ans), `What is ${a} + ${prod}?`, ans)
      ],
      answer: String(ans)
    };
  }
  if (t === 1) {
    const b = randInt(2, 5), c = randInt(2, 5), a = randInt(b * c + 2, b * c + 15);
    const prod = b * c, ans = a - prod;
    return {
      display: `${a} − ${b} × ${c}`,
      steps: [
        genArithStep(`${a} − [${b} × ${c}]`, `${a} − ${prod}`,
          `What is ${b} × ${c}? (× before −)`, prod),
        genArithStep(`${a} − ${prod}`, String(ans), `What is ${a} − ${prod}?`, ans)
      ],
      answer: String(ans)
    };
  }
  if (t === 2) {
    const a = randInt(2, 4), b = randInt(2, 5), c = randInt(2, 5);
    const pow = a ** 2, prod = b * c, ans = pow + prod;
    return {
      display: `${a}^2 + ${b} × ${c}`,
      steps: [
        genArithStep(`[${a}^2] + ${b} × ${c}`, `${pow} + ${b} × ${c}`,
          `What is ${a}^2? (exponents first)`, pow),
        genArithStep(`${pow} + [${b} × ${c}]`, `${pow} + ${prod}`,
          `What is ${b} × ${c}? (× before +)`, prod),
        genArithStep(`${pow} + ${prod}`, String(ans), `What is ${pow} + ${prod}?`, ans)
      ],
      answer: String(ans)
    };
  }
  const a = randInt(1, 6), b = randInt(1, 6), c = randInt(2, 5), d = randInt(1, 8);
  const inner = a + b, prod = inner * c, ans = prod - d;
  return {
    display: `(${a} + ${b}) × ${c} − ${d}`,
    steps: [
      genArithStep(`(${a} + ${b}) × ${c} − ${d}`, `${inner} × ${c} − ${d}`,
        `What is ${a} + ${b}? (parentheses first)`, inner),
      genArithStep(`[${inner} × ${c}] − ${d}`, `${prod} − ${d}`,
        `What is ${inner} × ${c}? (× before −)`, prod),
      genArithStep(`${prod} − ${d}`, String(ans), `What is ${prod} − ${d}?`, ans)
    ],
    answer: String(ans)
  };
}

function genPracticeSigned() {
  const t = randInt(0, 2);
  if (t === 0) {
    const a = randInt(3, 10), b = randInt(2, 5), c = randInt(2, 5), prod = b * c, ans = -a + prod;
    return {
      display: `−${a} + ${b} × ${c}`,
      steps: [
        genArithStep(`−${a} + [${b} × ${c}]`, `−${a} + ${prod}`,
          `What is ${b} × ${c}? (× first)`, prod),
        genArithStep(`−${a} + ${prod}`, String(ans), `What is −${a} + ${prod}?`, ans)
      ],
      answer: String(ans)
    };
  }
  if (t === 1) {
    const b = randInt(1, 5), a = randInt(b + 1, b + 8), c = randInt(2, 5);
    const diff = a - b, ans = diff * -c;
    return {
      display: `(${a} − ${b}) × −${c}`,
      steps: [
        genArithStep(`(${a} − ${b}) × −${c}`, `${diff} × −${c}`,
          `What is ${a} − ${b}? (parentheses first)`, diff),
        genArithStep(`${diff} × −${c}`, String(ans), `What is ${diff} × (−${c})?`, ans)
      ],
      answer: String(ans)
    };
  }
  const b = randInt(1, 8), c = randInt(1, 8), a = randInt(1, 12), inner = b + c, ans = -a + inner;
  return {
    display: `−${a} + (${b} + ${c})`,
    steps: [
      genArithStep(`−${a} + (${b} + ${c})`, `−${a} + ${inner}`,
        `What is ${b} + ${c}? (parentheses first)`, inner),
      genArithStep(`−${a} + ${inner}`, String(ans), `What is −${a} + ${inner}?`, ans)
    ],
    answer: String(ans)
  };
}

// ─────────────────────────────────────────── Algebra Solver

function algTerm(coeff, v = "x") {
  return coeff === 1 ? v : `${coeff}${v}`;
}

function finalizeAlgStep(before, after, correctOp, wrongOps) {
  const opts = shuffle([correctOp, wrongOps[0], wrongOps[1]]);
  return { before, after, operation: correctOp, options: opts, correctIdx: opts.indexOf(correctOp) };
}

function genAlgType0(x) {
  const a = randInt(2, 5), b = randInt(1, 10), c = a * x + b;
  return {
    display: `${algTerm(a)} + ${b} = ${c}`,
    steps: [
      finalizeAlgStep(`${algTerm(a)} + ${b} = ${c}`, `${algTerm(a)} = ${c - b}`,
        `Subtract ${b} from both sides`,
        [`Add ${b} to both sides`, `Divide both sides by ${a}`]),
      finalizeAlgStep(`${algTerm(a)} = ${c - b}`, `x = ${x}`,
        `Divide both sides by ${a}`,
        [`Multiply both sides by ${a}`, `Subtract ${a} from both sides`])
    ],
    answer: `x = ${x}`
  };
}

function genAlgType1(x) {
  const a = randInt(2, 5);
  const b = randInt(1, Math.max(1, a * x - 2));
  const c = a * x - b;
  return {
    display: `${algTerm(a)} − ${b} = ${c}`,
    steps: [
      finalizeAlgStep(`${algTerm(a)} − ${b} = ${c}`, `${algTerm(a)} = ${c + b}`,
        `Add ${b} to both sides`,
        [`Subtract ${b} from both sides`, `Divide both sides by ${a}`]),
      finalizeAlgStep(`${algTerm(a)} = ${c + b}`, `x = ${x}`,
        `Divide both sides by ${a}`,
        [`Multiply both sides by ${a}`, `Subtract ${a} from both sides`])
    ],
    answer: `x = ${x}`
  };
}

function genAlgType2(x) {
  const a = randInt(2, 4), b = randInt(1, 6), c = a * (x + b);
  return {
    display: `${a}(x + ${b}) = ${c}`,
    steps: [
      finalizeAlgStep(`${a}(x + ${b}) = ${c}`, `x + ${b} = ${x + b}`,
        `Divide both sides by ${a}`,
        [`Multiply both sides by ${a}`, `Subtract ${b} from both sides`]),
      finalizeAlgStep(`x + ${b} = ${x + b}`, `x = ${x}`,
        `Subtract ${b} from both sides`,
        [`Add ${b} to both sides`, `Divide both sides by ${b}`])
    ],
    answer: `x = ${x}`
  };
}

function genAlgType3(x) {
  const a = randInt(3, 6), d = randInt(1, a - 1), b = randInt(1, 8);
  const e = (a - d) * x + b;
  const amd = a - d;
  if (amd === 1) {
    return {
      display: `${algTerm(a)} + ${b} = ${algTerm(d)} + ${e}`,
      steps: [
        finalizeAlgStep(`${algTerm(a)} + ${b} = ${algTerm(d)} + ${e}`, `x + ${b} = ${e}`,
          `Subtract ${d}x from both sides`,
          [`Add ${d}x to both sides`, `Subtract ${b} from both sides`]),
        finalizeAlgStep(`x + ${b} = ${e}`, `x = ${x}`,
          `Subtract ${b} from both sides`,
          [`Add ${b} to both sides`, `Divide both sides by ${b}`])
      ],
      answer: `x = ${x}`
    };
  }
  return {
    display: `${algTerm(a)} + ${b} = ${algTerm(d)} + ${e}`,
    steps: [
      finalizeAlgStep(`${algTerm(a)} + ${b} = ${algTerm(d)} + ${e}`, `${algTerm(amd)} + ${b} = ${e}`,
        `Subtract ${d}x from both sides`,
        [`Add ${d}x to both sides`, `Subtract ${b} from both sides`]),
      finalizeAlgStep(`${algTerm(amd)} + ${b} = ${e}`, `${algTerm(amd)} = ${e - b}`,
        `Subtract ${b} from both sides`,
        [`Add ${b} to both sides`, `Divide both sides by ${amd}`]),
      finalizeAlgStep(`${algTerm(amd)} = ${e - b}`, `x = ${x}`,
        `Divide both sides by ${amd}`,
        [`Multiply both sides by ${amd}`, `Subtract ${amd} from both sides`])
    ],
    answer: `x = ${x}`
  };
}

function genAlgType4(x) {
  const a = randInt(2, 4), b = randInt(1, 5), c = randInt(2, 8);
  const d = a * (x + b) + c;
  return {
    display: `${a}(x + ${b}) + ${c} = ${d}`,
    steps: [
      finalizeAlgStep(`${a}(x + ${b}) + ${c} = ${d}`, `${a}(x + ${b}) = ${d - c}`,
        `Subtract ${c} from both sides`,
        [`Add ${c} to both sides`, `Divide both sides by ${a}`]),
      finalizeAlgStep(`${a}(x + ${b}) = ${d - c}`, `x + ${b} = ${x + b}`,
        `Divide both sides by ${a}`,
        [`Multiply both sides by ${a}`, `Subtract ${b} from both sides`]),
      finalizeAlgStep(`x + ${b} = ${x + b}`, `x = ${x}`,
        `Subtract ${b} from both sides`,
        [`Add ${b} to both sides`, `Divide both sides by ${b}`])
    ],
    answer: `x = ${x}`
  };
}

function generateAlgebraSession() {
  const gens = [
    () => genAlgType0(randInt(2, 9)),
    () => genAlgType1(randInt(3, 9)),
    () => genAlgType2(randInt(2, 7)),
    () => genAlgType3(randInt(3, 8)),
    () => genAlgType4(randInt(2, 7))
  ];
  return Array.from({ length: 20 }, (_, i) => gens[i % gens.length]());
}

function startAlgebraPractice() {
  startPractice("algebra");
}

const PRACTICE_LABELS = {
  algebra:           null,
  add_sub:           "Add & Subtract — step by step",
  mul_div:           "Multiply & Divide — step by step",
  exp_root:          "Exponents & Roots — step by step",
  grouping:          "Grouping & Parentheses — step by step",
  mixed:             "Order of Operations — step by step",
  signed:            "Signed Numbers — step by step",
  systems:           "Systems of 2 Equations — solve step by step",
  ch1_patterns:      "Ch 1 · Patterns in Mathematics",
  ch2_angles:        "Ch 2 · Lines and Angles",
  ch3_numplay:       "Ch 3 · Number Play",
  ch4_data:          "Ch 4 · Data Handling & Presentation",
  ch5_prime:         "Ch 5 · Prime Time",
  ch6_perimarea:     "Ch 6 · Perimeter and Area",
  ch7_fractions:     "Ch 7 · Fractions",
  ch8_constructions: "Ch 8 · Playing with Constructions",
  ch9_symmetry:      "Ch 9 · Symmetry",
  ch10_integers:     "Ch 10 · The Other Side of Zero"
};

const CHEATSHEETS = [
  { title: "Ch 1: Patterns in Mathematics",    file: "cheatsheets/chapter1.png" },
  { title: "Ch 2: Lines and Angles",           file: "cheatsheets/chapter2.png" },
  { title: "Ch 3: Number Play",                file: "cheatsheets/chapter3.png" },
  { title: "Ch 4: Data Handling",              file: "cheatsheets/chapter4.png" },
  { title: "Ch 5: Prime Time",                 file: "cheatsheets/chapter5.png" },
  { title: "Ch 6: Perimeter and Area",         file: "cheatsheets/chapter6.png" },
  { title: "Ch 7: Fractions",                  file: "cheatsheets/chapter7.png" },
  { title: "Ch 8: Playing with Constructions", file: "cheatsheets/chapter8.png" },
  { title: "Ch 9: Symmetry",                   file: "cheatsheets/chapter9.png" },
  { title: "Ch 10: The Other Side of Zero",    file: "cheatsheets/chapter10.png" },
  { title: "All Important Algebra Rules",      file: "cheatsheets/Algebra Rules.png" }
];

function startPractice(skillTag) {
  if (!state.profile) {
    return;
  }
  const questions = generatePracticeSession(skillTag);
  state.algebra = {
    questions,
    skillTag,
    qIdx: 0,
    sIdx: 0,
    attempts: 0,
    totalPts: 0,
    maxPts: questions.reduce((s, q) => s + q.steps.length * 10, 0),
    stepLog: []
  };
  if (skillTag === "algebra") {
    el.algSolveLabel.innerHTML = "Solve for <em>x</em>";
  } else {
    el.algSolveLabel.textContent = PRACTICE_LABELS[skillTag] || "Evaluate step by step";
  }
  el.algEquationDisplay.classList.toggle("system-mode", skillTag === "systems");
  showScreen("algebraScreen");
  el.algSummaryPanel.classList.add("hidden");
  el.algProblemPanel.classList.remove("hidden");
  renderAlgebraQuestion();
}

function generatePracticeSession(skillTag) {
  if (skillTag === "algebra") return generateAlgebraSession();
  if (skillTag === "systems") return generateSystemsSession();
  const gens = {
    add_sub:           genPracticeAddSub,
    mul_div:           genPracticeMultiDiv,
    exp_root:          genPracticeExpRoot,
    grouping:          genPracticeGrouping,
    mixed:             genPracticeMixed,
    signed:            genPracticeSigned,
    ch1_patterns:      genPracticePatterns,
    ch2_angles:        genPracticeAngles,
    ch3_numplay:       genPracticeNumPlay,
    ch4_data:          genPracticeData,
    ch5_prime:         genPracticePrime,
    ch6_perimarea:     genPracticePerimArea,
    ch7_fractions:     genPracticeFractions,
    ch8_constructions: genPracticeConstructions,
    ch9_symmetry:      genPracticeSymmetry,
    ch10_integers:     genPracticeIntegers
  };
  const gen = gens[skillTag] || genPracticeAddSub;
  return Array.from({ length: 20 }, () => gen());
}

function renderAlgebraQuestion() {
  const { questions, qIdx } = state.algebra;
  state.algebra.sIdx = 0;
  state.algebra.attempts = 0;
  el.algQNum.textContent = `${qIdx + 1} / ${questions.length}`;
  el.algScoreDisplay.textContent = `${state.algebra.totalPts} pts`;
  el.algOperationBanner.classList.add("hidden");
  el.algFeedbackBox.classList.add("hidden");
  el.algEquationDisplay.style.opacity = "1";
  el.algEquationDisplay.style.transform = "translateY(0)";
  renderAlgebraStep();
}

function renderAlgebraStep() {
  const { questions, qIdx, sIdx } = state.algebra;
  const step = questions[qIdx].steps[sIdx];
  el.algEquationDisplay.textContent = step.before;
  el.algStepPrompt.textContent = step.prompt || (sIdx === 0 ? "What should you do first?" : "What is the next step?");
  el.algFeedbackBox.classList.add("hidden");
  el.algOptionsGrid.innerHTML = "";
  step.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "alg-option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => handleAlgebraOption(i));
    el.algOptionsGrid.appendChild(btn);
  });
}

function handleAlgebraOption(chosenIdx) {
  const { questions, qIdx, sIdx, attempts } = state.algebra;
  const step = questions[qIdx].steps[sIdx];
  const correct = chosenIdx === step.correctIdx;
  const buttons = el.algOptionsGrid.querySelectorAll(".alg-option-btn");

  if (correct) {
    buttons[chosenIdx].classList.add("correct");
    buttons.forEach((b) => { b.disabled = true; });
    const pts = attempts === 0 ? 10 : 5;
    state.algebra.stepLog.push({ result: attempts === 0 ? "first" : "retry", expression: step.before, correctAnswer: step.operation });
    state.algebra.totalPts += pts;
    el.algScoreDisplay.textContent = `${state.algebra.totalPts} pts`;
    el.algOperationBanner.textContent = `✓ ${step.operation}`;
    el.algOperationBanner.classList.remove("hidden");
    showAlgFeedback("correct", attempts === 0 ? `Correct! +${pts} pts` : `Correct on retry! +${pts} pts`);
    setTimeout(() => {
      animateAlgEquation(step.after, () => {
        el.algOperationBanner.classList.add("hidden");
        advanceAlgebraStep();
      });
    }, 700);
  } else {
    buttons[chosenIdx].classList.add("wrong");
    buttons[chosenIdx].disabled = true;
    if (attempts === 0) {
      state.algebra.attempts = 1;
      showAlgFeedback("wrong", "Not quite — try again!");
      el.algStepPrompt.textContent = "Choose a different option:";
    } else {
      buttons[step.correctIdx].classList.add("correct");
      buttons.forEach((b) => { b.disabled = true; });
      state.algebra.stepLog.push({ result: "missed", expression: step.before, correctAnswer: step.operation });
      showAlgFeedback("info", `The correct step was: "${step.operation}" — 0 pts`);
      setTimeout(() => {
        animateAlgEquation(step.after, () => {
          el.algOperationBanner.classList.add("hidden");
          advanceAlgebraStep();
        });
      }, 1800);
    }
  }
}

function advanceAlgebraStep() {
  const { questions, qIdx, sIdx } = state.algebra;
  const q = questions[qIdx];
  const nextSIdx = sIdx + 1;
  if (nextSIdx < q.steps.length) {
    state.algebra.sIdx = nextSIdx;
    state.algebra.attempts = 0;
    renderAlgebraStep();
  } else {
    showAlgFeedback("correct", `✓ Solved! ${q.answer}`);
    el.algOptionsGrid.innerHTML = "";
    const nextQIdx = qIdx + 1;
    setTimeout(() => {
      if (nextQIdx < questions.length) {
        state.algebra.qIdx = nextQIdx;
        renderAlgebraQuestion();
      } else {
        endAlgebraSession();
      }
    }, 1400);
  }
}

function animateAlgEquation(newText, callback) {
  const eqEl = el.algEquationDisplay;
  eqEl.style.transition = "opacity 0.22s ease, transform 0.22s ease";
  eqEl.style.opacity = "0";
  eqEl.style.transform = "translateY(-14px)";
  setTimeout(() => {
    eqEl.textContent = newText;
    eqEl.style.transform = "translateY(14px)";
    eqEl.getBoundingClientRect();
    eqEl.style.opacity = "1";
    eqEl.style.transform = "translateY(0)";
    if (callback) {
      setTimeout(callback, 280);
    }
  }, 240);
}

function showAlgFeedback(type, text) {
  el.algFeedbackBox.className = `alg-feedback ${type}`;
  el.algFeedbackBox.textContent = text;
  el.algFeedbackBox.classList.remove("hidden");
}

function endAlgebraSession() {
  const { totalPts, maxPts, questions, stepLog, skillTag } = state.algebra;
  const pct = maxPts > 0 ? Math.round((totalPts / maxPts) * 100) : 0;
  const firstCount  = stepLog.filter((r) => r.result === "first").length;
  const retryCount  = stepLog.filter((r) => r.result === "retry").length;
  const missedCount = stepLog.filter((r) => r.result === "missed").length;
  const wrongSteps  = stepLog
    .filter((r) => r.result !== "first")
    .map((r) => ({ expression: r.expression, answer: r.correctAnswer, result: r.result }));
  const medal = pct >= 90 ? "Gold" : pct >= 75 ? "Silver" : pct >= 50 ? "Bronze" : "";
  const medalCls = medal ? `medal-${medal.toLowerCase()}` : "";

  el.algProblemPanel.classList.add("hidden");
  el.algSummaryPanel.classList.remove("hidden");

  el.algSummaryText.innerHTML = `
    <div class="summary-breakdown">
      <div class="bd-row bd-first">
        <span class="bd-label">First try correct</span>
        <span class="bd-calc">${firstCount} steps × 10 pts</span>
        <span class="bd-pts">+${firstCount * 10}</span>
      </div>
      <div class="bd-row bd-retry">
        <span class="bd-label">Correct on retry</span>
        <span class="bd-calc">${retryCount} steps × 5 pts</span>
        <span class="bd-pts">+${retryCount * 5}</span>
      </div>
      <div class="bd-row bd-missed">
        <span class="bd-label">Missed (shown answer)</span>
        <span class="bd-calc">${missedCount} steps × 0 pts</span>
        <span class="bd-pts">0</span>
      </div>
      <div class="bd-total">
        <span>Total</span>
        <span>${totalPts} / ${maxPts} pts</span>
        <span class="bd-pct ${medalCls}">${pct}%${medal ? ` — ${medal}` : ""}</span>
      </div>
    </div>
  `;

  if (state.profile && state.settings && !state.teacherMode) {
    const session = {
      profileId: state.profile.id,
      skillTag: skillTag || "unknown",
      startedAt: new Date().toISOString(),
      totalPts, maxPts, pct, firstCount, retryCount, missedCount,
      totalSteps: stepLog.length,
      wrongSteps
    };
    idbAdd("practiceSessions", session).then((id) => {
      session.sessionId = id;
      state.practiceSessions.unshift(session);
      renderDashboard();
    });
    const coins = Math.round(totalPts / 8);
    if (coins > 0) {
      state.settings.coins = (state.settings.coins || 0) + coins;
      idbPut("settings", state.settings);
      const coinsEl = document.createElement("p");
      coinsEl.className = "summary-coins";
      coinsEl.textContent = `+${coins} coins earned!`;
      el.algSummaryText.appendChild(coinsEl);
    }
  }
}

// ───────────────────────────── Course 8: 2-Variable Systems

function genSystemStep(before, after, prompt, correct, wrong1, wrong2) {
  const opts = shuffle([correct, wrong1, wrong2]);
  return { before, after, prompt, options: opts, correctIdx: opts.indexOf(correct), operation: correct };
}

// Type A — Add equations: opposite-sign y terms cancel  (x + y = s1, x − y = s2)
function genSysTypeA() {
  const x = randInt(2, 8), y = randInt(1, 7);
  const s1 = x + y, s2 = x - y, twoX = 2 * x;
  return {
    display: `Eq 1:  x + y = ${s1}\nEq 2:  x − y = ${s2}`,
    steps: [
      genSystemStep(
        `x + y = ${s1}\nx − y = ${s2}`,
        `2x = ${twoX}`,
        `Add both equations to eliminate y. What is the result?`,
        `2x = ${twoX}`, `2x = ${twoX + 2}`, `2x = ${twoX - 2}`
      ),
      genSystemStep(
        `2x = ${twoX}`,
        `x = ${x}`,
        `Solve 2x = ${twoX}. What is x?`,
        `x = ${x}`, `x = ${x + 1}`, `x = ${x + 2}`
      ),
      genSystemStep(
        `x = ${x}  →  substitute into  x + y = ${s1}`,
        `${x} + y = ${s1}`,
        `Replace x with ${x} in Equation 1. What do you get?`,
        `${x} + y = ${s1}`, `${x + 1} + y = ${s1}`, `${x} + y = ${s1 + 1}`
      ),
      genSystemStep(
        `${x} + y = ${s1}`,
        `y = ${y}`,
        `Subtract ${x} from both sides. What is y?`,
        `y = ${y}`, `y = ${y + 1}`, `y = ${y + 2}`
      )
    ],
    answer: `x = ${x},  y = ${y}`
  };
}

// Type B — Subtract equations: equal x-coefficients cancel  (x + 2y = s1, x + y = s2)
function genSysTypeB() {
  const x = randInt(2, 8), y = randInt(1, 6);
  const s1 = x + 2 * y, s2 = x + y;
  return {
    display: `Eq 1:  x + 2y = ${s1}\nEq 2:  x + y = ${s2}`,
    steps: [
      genSystemStep(
        `x + 2y = ${s1}\nx + y  = ${s2}`,
        `y = ${y}`,
        `Subtract Equation 2 from Equation 1 to eliminate x. What is the result?`,
        `y = ${y}`, `y = ${y + 1}`, `2y = ${2 * y + 1}`
      ),
      genSystemStep(
        `y = ${y}  →  substitute into  x + y = ${s2}`,
        `x + ${y} = ${s2}`,
        `Replace y with ${y} in Equation 2. What do you get?`,
        `x + ${y} = ${s2}`, `x + ${y + 1} = ${s2}`, `x + ${y} = ${s2 + 1}`
      ),
      genSystemStep(
        `x + ${y} = ${s2}`,
        `x = ${x}`,
        `Subtract ${y} from both sides. What is x?`,
        `x = ${x}`, `x = ${x + 1}`, `x = ${x + 2}`
      )
    ],
    answer: `x = ${x},  y = ${y}`
  };
}

// Type C — Add equations: opposite y-coefficients with x multiplier  (ax + y = s1, bx − y = s2)
function genSysTypeC() {
  const x = randInt(2, 6), y = randInt(1, 6);
  const a = randInt(2, 4), b = randInt(1, 3);
  const s1 = a * x + y, s2 = b * x - y;
  const apb = a + b, rhs = apb * x, ax = a * x;
  return {
    display: `Eq 1:  ${a}x + y = ${s1}\nEq 2:  ${b}x − y = ${s2}`,
    steps: [
      genSystemStep(
        `${a}x + y = ${s1}\n${b}x − y = ${s2}`,
        `${apb}x = ${rhs}`,
        `Add both equations to eliminate y. What is the result?`,
        `${apb}x = ${rhs}`, `${apb}x = ${rhs + 2}`, `${apb - 1}x = ${rhs}`
      ),
      genSystemStep(
        `${apb}x = ${rhs}`,
        `x = ${x}`,
        `Divide both sides by ${apb}. What is x?`,
        `x = ${x}`, `x = ${x + 1}`, `x = ${x + 2}`
      ),
      genSystemStep(
        `x = ${x}  →  substitute into  ${a}x + y = ${s1}`,
        `${ax} + y = ${s1}`,
        `Replace x with ${x} in Equation 1. What do you get?`,
        `${ax} + y = ${s1}`, `${ax + 1} + y = ${s1}`, `${ax} + y = ${s1 + 1}`
      ),
      genSystemStep(
        `${ax} + y = ${s1}`,
        `y = ${y}`,
        `Subtract ${ax} from both sides. What is y?`,
        `y = ${y}`, `y = ${y + 1}`, `y = ${y + 2}`
      )
    ],
    answer: `x = ${x},  y = ${y}`
  };
}

// Type D — Substitution: Eq 1 is y = cx + d; Eq 2 is ax + y = e
function genSysTypeD() {
  const x = randInt(2, 6), c = randInt(1, 3), d = randInt(1, 5);
  const y = c * x + d;
  const a = randInt(2, 4), e = a * x + y;
  const apbc = a + c, eminusd = e - d, ax = a * x;
  return {
    display: `Eq 1:  y = ${c}x + ${d}\nEq 2:  ${a}x + y = ${e}`,
    steps: [
      genSystemStep(
        `y = ${c}x + ${d}\n${a}x + y = ${e}`,
        `${a}x + ${c}x + ${d} = ${e}`,
        `Substitute y = ${c}x + ${d} into Equation 2. What do you get?`,
        `${a}x + ${c}x + ${d} = ${e}`,
        `${a}x + ${c}x = ${e}`,
        `${a + 1}x + ${d} = ${e}`
      ),
      genSystemStep(
        `${a}x + ${c}x + ${d} = ${e}`,
        `${apbc}x + ${d} = ${e}`,
        `Combine like terms: ${a}x + ${c}x = ?`,
        `${apbc}x + ${d} = ${e}`,
        `${apbc + 1}x + ${d} = ${e}`,
        `${apbc}x = ${e}`
      ),
      genSystemStep(
        `${apbc}x + ${d} = ${e}`,
        `${apbc}x = ${eminusd}`,
        `Subtract ${d} from both sides. What do you get?`,
        `${apbc}x = ${eminusd}`,
        `${apbc}x = ${eminusd + 1}`,
        `${apbc}x = ${eminusd - 1}`
      ),
      genSystemStep(
        `${apbc}x = ${eminusd}`,
        `x = ${x}`,
        `Divide both sides by ${apbc}. What is x?`,
        `x = ${x}`, `x = ${x + 1}`, `x = ${x + 2}`
      ),
      genSystemStep(
        `x = ${x}  →  substitute into  y = ${c}x + ${d}`,
        `y = ${y}`,
        `Replace x with ${x} in Equation 1. What is y?`,
        `y = ${y}`, `y = ${y + 1}`, `y = ${y + 2}`
      )
    ],
    answer: `x = ${x},  y = ${y}`
  };
}

function generateSystemsSession() {
  const gens = [genSysTypeA, genSysTypeB, genSysTypeC, genSysTypeD];
  return Array.from({ length: 20 }, (_, i) => gens[i % gens.length]());
}

// ══════════════════════ Ganita Prakash Grade 6 — Chapter generators ══════════

// ── Ch 1: Patterns in Mathematics
function genPracticePatterns() {
  const t = randInt(0, 7);
  if (t === 0) {
    const a = randInt(2, 25), d = randInt(2, 8), s = [a, a+d, a+2*d, a+3*d], nx = a+4*d;
    return { display: `${s.join(", ")}, ___`,
      steps: [genArithStep(`${s.join(", ")}, ___`, String(nx), `What is the next number?`, nx)],
      answer: String(nx) };
  }
  if (t === 1) {
    const a = randInt(40, 80), d = randInt(3, 9), s = [a, a-d, a-2*d, a-3*d], nx = a-4*d;
    return { display: `${s.join(", ")}, ___`,
      steps: [genArithStep(`${s.join(", ")}, ___`, String(nx), `What is the next number?`, nx)],
      answer: String(nx) };
  }
  if (t === 2) {
    const a = randInt(1, 4), r = randInt(2, 3), s = [a, a*r, a*r**2, a*r**3], nx = a*r**4;
    return { display: `${s.join(", ")}, ___`,
      steps: [genArithStep(`${s.join(", ")}, ___`, String(nx), `What is the next number?`, nx)],
      answer: String(nx) };
  }
  if (t === 3) {
    const n = randInt(5, 12), ans = n*n;
    return { display: `1, 4, 9, 16, 25, ...\nWhat is the ${n}th square number?`,
      steps: [genArithStep(`1, 4, 9, 16, 25, ...`, String(ans), `What is the ${n}th square number?`, ans)],
      answer: String(ans) };
  }
  if (t === 4) {
    const n = randInt(5, 10), ans = n*(n+1)/2;
    return { display: `1, 3, 6, 10, 15, ...\nWhat is the ${n}th triangle number?`,
      steps: [genArithStep(`1, 3, 6, 10, 15, ...`, String(ans), `What is the ${n}th triangle number?`, ans)],
      answer: String(ans) };
  }
  if (t === 5) {
    const a = randInt(2, 9), b = randInt(10, 20), s = [a, b, a, b, a];
    return { display: `${s.join(", ")}, ___`,
      steps: [genArithStep(`${s.join(", ")}, ___`, String(b), `What comes next?`, b)],
      answer: String(b) };
  }
  if (t === 6) {
    const a = randInt(2, 20), d = randInt(2, 8), s = [a, a+d, a+2*d, a+3*d];
    const rule = `+${d}`, w1 = `+${d+1}`, w2 = `×${d}`;
    return { display: `${s.join(", ")}, ...`,
      steps: [genSystemStep(`${s.join(", ")}`, rule, `What is the rule for this sequence?`, rule, w1, w2)],
      answer: rule };
  }
  const a = randInt(3, 15), d = randInt(2, 6), n = randInt(6, 12);
  const s = [a, a+d, a+2*d, a+3*d], nth = a + (n-1)*d;
  return { display: `${s.join(", ")}, ...\nFind the ${n}th term.`,
    steps: [
      genArithStep(`${s.join(", ")}, ...`, String(d), `What is the common difference between terms?`, d),
      genArithStep(`first=${a}, step=${d}, position=${n}`, String(nth), `What is term number ${n}?`, nth)
    ], answer: String(nth) };
}

// ── Ch 2: Lines and Angles
function genPracticeAngles() {
  const t = randInt(0, 5);
  if (t === 0) {
    const a = randInt(10, 80), c = 90 - a;
    return { display: `Two angles are complementary.\nOne angle = ${a}°. Find the other.`,
      steps: [genArithStep(`Complementary pair, one = ${a}°`, String(c), `What is the missing complementary angle?`, c)],
      answer: `${c}°` };
  }
  if (t === 1) {
    const a = randInt(10, 170), s = 180 - a;
    return { display: `Two angles are supplementary.\nOne angle = ${a}°. Find the other.`,
      steps: [genArithStep(`Supplementary pair, one = ${a}°`, String(s), `What is the missing supplementary angle?`, s)],
      answer: `${s}°` };
  }
  if (t === 2) {
    const pool = [25, 45, 65, 89, 90, 110, 135, 179, 180, 200, 270];
    const a = pool[randInt(0, pool.length - 1)];
    let type, w1, w2;
    if      (a < 90)  { type = "Acute";    w1 = "Obtuse";   w2 = "Right"; }
    else if (a === 90) { type = "Right";    w1 = "Acute";    w2 = "Obtuse"; }
    else if (a < 180)  { type = "Obtuse";   w1 = "Acute";    w2 = "Reflex"; }
    else if (a === 180){ type = "Straight"; w1 = "Obtuse";   w2 = "Reflex"; }
    else               { type = "Reflex";   w1 = "Obtuse";   w2 = "Straight"; }
    return { display: `Angle = ${a}°`,
      steps: [genSystemStep(String(a), type, `What type of angle is ${a}°?`, type, w1, w2)],
      answer: type };
  }
  if (t === 3) {
    const a = randInt(20, 80), b = randInt(20, 80);
    if (a + b >= 180) { return genPracticeAngles(); }
    const c = 180 - a - b;
    return { display: `A triangle has angles ${a}°, ${b}°, and ___°.\nFind the missing angle.`,
      steps: [genArithStep(`${a}°, ${b}°, ___°`, String(c), `What is the missing angle of this triangle?`, c)],
      answer: `${c}°` };
  }
  if (t === 4) {
    const a = randInt(30, 150);
    return { display: `Two lines intersect. One angle = ${a}°.\nFind the vertically opposite angle.`,
      steps: [genSystemStep(String(a), String(a), `What is the vertically opposite angle?`, String(a), String(180-a), String(90))],
      answer: `${a}°` };
  }
  const a = randInt(25, 70), b = randInt(20, 70);
  if (a + b >= 180) { return genPracticeAngles(); }
  const c = 180 - a - b;
  return { display: `Three angles on a straight line: ${a}°, ${b}°, ___°.\nFind the missing angle.`,
    steps: [
      genArithStep(`${a}° + ${b}°`, String(a+b), `Add the two known angles.`, a+b),
      genArithStep(`${a+b}°`, String(c), `Angles on a straight line total 180°. What is the missing angle?`, c)
    ], answer: `${c}°` };
}

// ── Ch 3: Number Play
function genPracticeNumPlay() {
  const t = randInt(0, 6);
  if (t === 0) {
    const n = randInt(1, 9999), ans = n % 2 === 0 ? "Even" : "Odd", w = n % 2 === 0 ? "Odd" : "Even";
    return { display: `Is ${n} odd or even?`,
      steps: [genSystemStep(String(n), ans, `Is ${n} odd or even?`, ans, w, "Neither")],
      answer: ans };
  }
  if (t === 1) {
    const a = randInt(1000, 99999), b = randInt(1000, 99999);
    const sign = a > b ? ">" : a < b ? "<" : "=", w1 = sign === ">" ? "<" : ">", w2 = "=";
    return { display: `${a.toLocaleString()}  ___  ${b.toLocaleString()}`,
      steps: [genSystemStep(`${a} vs ${b}`, sign, `Which symbol correctly compares these numbers?`, sign, w1, w2)],
      answer: sign };
  }
  if (t === 2) {
    const a = randInt(1,9)*1000, b = randInt(0,9)*100, c = randInt(0,9)*10, d = randInt(0,9), total = a+b+c+d;
    return { display: `${a.toLocaleString()} + ${b} + ${c} + ${d}`,
      steps: [genArithStep(`${a.toLocaleString()} + ${b} + ${c} + ${d}`, String(total), `Write this in standard form.`, total)],
      answer: String(total) };
  }
  if (t === 3) {
    const num = randInt(1000, 9999), digits = String(num).split("").map(Number);
    const places = ["ones","tens","hundreds","thousands"], pi = randInt(0, 3);
    const pv = digits[3-pi] * Math.pow(10, pi);
    return { display: `Number: ${num}\nWhat is the place value of the ${places[pi]} digit?`,
      steps: [genArithStep(`Number: ${num}`, String(pv), `What is the place value of the ${places[pi]} digit in ${num}?`, pv)],
      answer: String(pv) };
  }
  if (t === 4) {
    const n = randInt(102, 9997), r = Math.round(n / 100) * 100;
    return { display: `Round ${n.toLocaleString()} to the nearest 100.`,
      steps: [genArithStep(String(n), String(r), `Round ${n.toLocaleString()} to the nearest 100.`, r)],
      answer: String(r) };
  }
  if (t === 5) {
    const n = randInt(1012, 98997), r = Math.round(n / 1000) * 1000;
    return { display: `Round ${n.toLocaleString()} to the nearest 1,000.`,
      steps: [genArithStep(String(n), String(r), `Round ${n.toLocaleString()} to the nearest 1,000.`, r)],
      answer: r.toLocaleString() };
  }
  const start = randInt(100, 5000), step = [10, 100, 1000][randInt(0,2)], next = start + step;
  return { display: `..., ${start.toLocaleString()}, ___, ${(start+2*step).toLocaleString()}, ...`,
    steps: [genArithStep(`${start.toLocaleString()}, ___, ${(start+2*step).toLocaleString()}`, String(next), `What number fills the blank?`, next)],
    answer: String(next) };
}

// ── Ch 4: Data Handling and Presentation
function genPracticeData() {
  const t = randInt(0, 5);
  if (t === 0) {
    const groups = randInt(1, 6), rem = randInt(0, 4), n = groups*5+rem;
    return { display: `Tally: ${groups} full group${groups>1?"s":""} and ${rem} extra mark${rem===1?"":"s"}.`,
      steps: [genArithStep(`${groups} groups + ${rem} extra`, String(n), `How many items does this tally represent?`, n)],
      answer: String(n) };
  }
  if (t === 1) {
    const cats = ["Mango","Apple","Banana","Orange"], vals = cats.map(() => randInt(4, 18));
    const total = vals.reduce((s,v) => s+v, 0);
    return { display: `Fruits sold:\n${cats.map((c,i) => `${c}: ${vals[i]}`).join(", ")}`,
      steps: [genArithStep(vals.join(" + "), String(total), `What is the total number of fruits sold?`, total)],
      answer: String(total) };
  }
  if (t === 2) {
    const names = ["Alice","Bob","Cara"], vals = names.map(() => randInt(5, 30));
    const maxV = Math.max(...vals), minV = Math.min(...vals), diff = maxV - minV;
    const maxN = names[vals.indexOf(maxV)], minN = names[vals.indexOf(minV)];
    return { display: `Books read:\n${names.map((n,i) => `${n}: ${vals[i]}`).join(", ")}`,
      steps: [genArithStep(`${maxV} − ${minV}`, String(diff), `How many more books did ${maxN} read than ${minN}?`, diff)],
      answer: String(diff) };
  }
  if (t === 3) {
    const vals = Array.from({length:4}, () => randInt(2, 12));
    const total = vals.reduce((s,v)=>s+v,0), mean = total/4;
    if (!Number.isInteger(mean)) { return genPracticeData(); }
    return { display: `Scores: ${vals.join(", ")}`,
      steps: [
        genArithStep(vals.join(" + "), String(total), `What is the sum of all scores?`, total),
        genArithStep(`${total} ÷ 4`, String(mean), `Divide the total by the number of scores. What is the mean?`, mean)
      ], answer: String(mean) };
  }
  if (t === 4) {
    const k = [2,5,10][randInt(0,2)], pics = randInt(3, 10), total = k*pics;
    return { display: `Pictograph: each ★ = ${k} students.\nA row has ${pics} stars.`,
      steps: [genArithStep(`${pics} × ${k}`, String(total), `How many students does this row represent?`, total)],
      answer: String(total) };
  }
  const data = Array.from({length:5}, () => randInt(5, 30));
  const mx = Math.max(...data), mn = Math.min(...data), range = mx - mn;
  return { display: `Data set: ${data.join(", ")}`,
    steps: [
      genArithStep(data.join(", "), String(mx), `What is the highest value in this data?`, mx),
      genArithStep(`${mx} − ${mn}`, String(range), `Range = highest − lowest. What is the range?`, range)
    ], answer: String(range) };
}

// ── Ch 5: Prime Time
function genPracticePrime() {
  const t = randInt(0, 5);
  if (t === 0) {
    const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47];
    const composites = [4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,28];
    const isPrime = Math.random() < 0.5;
    const n = isPrime ? primes[randInt(0,primes.length-1)] : composites[randInt(0,composites.length-1)];
    const ans = isPrime ? "Prime" : "Composite", w = isPrime ? "Composite" : "Prime";
    return { display: `Is ${n} prime or composite?`,
      steps: [genSystemStep(String(n), ans, `Is ${n} prime or composite?`, ans, w, "Neither")],
      answer: ans };
  }
  if (t === 1) {
    const nums = [12,18,24,36,16,20,15,30,9,25,28,32];
    const n = nums[randInt(0,nums.length-1)];
    let count = 0; for(let i=1;i<=n;i++) if(n%i===0) count++;
    return { display: `How many factors does ${n} have?`,
      steps: [genArithStep(`Factors of ${n}`, String(count), `List all factors of ${n} and count them.`, count)],
      answer: String(count) };
  }
  if (t === 2) {
    const pairs = [[12,18,6],[24,36,12],[15,25,5],[8,20,4],[18,30,6],[16,24,8],[12,30,6],[9,27,9],[10,15,5]];
    const [a,b,hcf] = pairs[randInt(0,pairs.length-1)];
    return { display: `Find the HCF of ${a} and ${b}.`,
      steps: [genArithStep(`HCF(${a},${b})`, String(hcf), `Highest Common Factor of ${a} and ${b} is?`, hcf)],
      answer: String(hcf) };
  }
  if (t === 3) {
    const pairs = [[4,6,12],[3,5,15],[6,8,24],[4,10,20],[6,9,18],[8,12,24],[5,7,35],[4,9,36],[3,7,21]];
    const [a,b,lcm] = pairs[randInt(0,pairs.length-1)];
    return { display: `Find the LCM of ${a} and ${b}.`,
      steps: [genArithStep(`LCM(${a},${b})`, String(lcm), `Least Common Multiple of ${a} and ${b} is?`, lcm)],
      answer: String(lcm) };
  }
  const pool = [[3,9,"Yes"],[4,14,"No"],[5,25,"Yes"],[7,28,"Yes"],[6,38,"No"],[8,32,"Yes"],[9,45,"Yes"],[7,50,"No"]];
  const [d,n,ans] = pool[randInt(0,pool.length-1)], w = ans === "Yes" ? "No" : "Yes";
  return { display: `Is ${n} a multiple of ${d}?`,
    steps: [genSystemStep(`${n} ÷ ${d}`, ans, `Is ${n} exactly divisible by ${d}?`, ans, w, "Cannot tell")],
    answer: ans };
}

// ── Ch 6: Perimeter and Area
function genPracticePerimArea() {
  const t = randInt(0, 7);
  if (t === 0) {
    const l = randInt(3, 15), b = randInt(2, 10), p = 2*(l+b);
    return { display: `Rectangle: length = ${l} cm, breadth = ${b} cm.\nFind the perimeter.`,
      steps: [genArithStep(`l=${l} cm, b=${b} cm`, String(p), `What is the perimeter of this rectangle?`, p)],
      answer: `${p} cm` };
  }
  if (t === 1) {
    const l = randInt(3, 15), b = randInt(2, 10), a = l*b;
    return { display: `Rectangle: length = ${l} cm, breadth = ${b} cm.\nFind the area.`,
      steps: [genArithStep(`l=${l} cm, b=${b} cm`, String(a), `What is the area of this rectangle?`, a)],
      answer: `${a} sq cm` };
  }
  if (t === 2) {
    const s = randInt(3, 15), p = 4*s;
    return { display: `Square: side = ${s} cm.\nFind the perimeter.`,
      steps: [genArithStep(`side = ${s} cm`, String(p), `What is the perimeter of this square?`, p)],
      answer: `${p} cm` };
  }
  if (t === 3) {
    const s = randInt(2, 12), a = s*s;
    return { display: `Square: side = ${s} cm.\nFind the area.`,
      steps: [genArithStep(`side = ${s} cm`, String(a), `What is the area of this square?`, a)],
      answer: `${a} sq cm` };
  }
  if (t === 4) {
    const b = randInt(2, 8), l = randInt(b+1, 14), p = 2*(l+b), half = p/2;
    return { display: `Rectangle: perimeter = ${p} cm, breadth = ${b} cm.\nFind the length.`,
      steps: [
        genArithStep(`perimeter = ${p} cm`, String(half), `What is half the perimeter?`, half),
        genArithStep(`${half} − ${b}`, String(l), `Subtract the breadth to find the length.`, l)
      ], answer: `${l} cm` };
  }
  if (t === 5) {
    const sides = [2,3,4,5,6,7,8,9,10,11,12], s = sides[randInt(0,sides.length-1)], area = s*s;
    return { display: `Square: area = ${area} sq cm.\nFind the side length.`,
      steps: [genArithStep(`area = ${area} sq cm`, String(s), `What is the side length of this square?`, s)],
      answer: `${s} cm` };
  }
  if (t === 6) {
    const s = randInt(3, 10), p = 4*s, a = s*s;
    return { display: `A square has perimeter ${p} cm.\nFind its area.`,
      steps: [
        genArithStep(`perimeter = ${p} cm`, String(s), `What is the side length? (perimeter ÷ 4)`, s),
        genArithStep(`side = ${s} cm`, String(a), `What is the area of a square with side ${s} cm?`, a)
      ], answer: `${a} sq cm` };
  }
  const b = randInt(3, 8), l = randInt(4, 12), a = l*b;
  return { display: `Rectangle: area = ${a} sq cm, length = ${l} cm.\nFind the breadth.`,
    steps: [genArithStep(`area=${a}, length=${l}`, String(b), `What is the breadth? (area ÷ length)`, b)],
    answer: `${b} cm` };
}

// ── Ch 7: Fractions
function genPracticeFractions() {
  const t = randInt(0, 6);
  if (t === 0) {
    const d = randInt(4,12), n1 = randInt(1,d-2), n2 = randInt(1,d-n1-1), sum = n1+n2;
    const ans = `${sum}/${d}`;
    return { display: `${n1}/${d} + ${n2}/${d}`,
      steps: [genSystemStep(`${n1}/${d} + ${n2}/${d}`, ans, `What is ${n1}/${d} + ${n2}/${d}?`, ans, `${sum+1}/${d}`, `${Math.max(1,sum-1)}/${d}`)],
      answer: ans };
  }
  if (t === 1) {
    const d = randInt(4,12), n1 = randInt(3,d), n2 = randInt(1,n1-1), diff = n1-n2;
    const ans = `${diff}/${d}`;
    return { display: `${n1}/${d} − ${n2}/${d}`,
      steps: [genSystemStep(`${n1}/${d} − ${n2}/${d}`, ans, `What is ${n1}/${d} − ${n2}/${d}?`, ans, `${diff+1}/${d}`, `${Math.max(1,diff-1)}/${d}`)],
      answer: ans };
  }
  if (t === 2) {
    const d = randInt(3,8), n = randInt(1,d*2);
    const ans = n < d ? "Proper" : "Improper", w = n < d ? "Improper" : "Proper";
    return { display: `Is ${n}/${d} a proper or improper fraction?`,
      steps: [genSystemStep(`${n}/${d}`, ans, `Is the numerator smaller than the denominator?`, ans, w, "Mixed")],
      answer: ans };
  }
  if (t === 3) {
    const n = randInt(1,5), d = randInt(2,6), m = randInt(2,5), en = n*m;
    return { display: `${n}/${d} = ___/${d*m}`,
      steps: [genArithStep(`${n}/${d} = ___/${d*m}`, String(en), `The denominator was multiplied by ${m}. What is the missing numerator?`, en)],
      answer: String(en) };
  }
  if (t === 4) {
    const d = randInt(4,10), n1 = randInt(1,d-1), n2 = randInt(1,d-1);
    if (n1 === n2) { return genPracticeFractions(); }
    const sign = n1 > n2 ? ">" : "<", w = sign === ">" ? "<" : ">";
    return { display: `${n1}/${d}  ___  ${n2}/${d}`,
      steps: [genSystemStep(`${n1}/${d} vs ${n2}/${d}`, sign, `Which symbol correctly compares these fractions?`, sign, w, "=")],
      answer: sign };
  }
  if (t === 5) {
    const d = randInt(2,6), w = randInt(2,5), r = randInt(1,d-1), n = w*d+r;
    return { display: `Convert ${n}/${d} to a mixed number.`,
      steps: [
        genArithStep(`${n}/${d}`, String(w), `How many whole groups of ${d} fit into ${n}? (whole part)`, w),
        genArithStep(`${n} − ${w*d}`, String(r), `What is the remainder?`, r)
      ], answer: `${w} and ${r}/${d}` };
  }
  const pairs = [[1,2,3,4,"<"],[2,3,3,4,"<"],[3,4,2,3,">"],[5,6,4,5,">"],[1,3,1,4,">"],[3,5,4,7,">"]];
  const [n1,d1,n2,d2,sign] = pairs[randInt(0,pairs.length-1)];
  const w = sign === ">" ? "<" : ">";
  return { display: `${n1}/${d1}  ___  ${n2}/${d2}`,
    steps: [
      genArithStep(`${n1}/${d1} vs ${n2}/${d2}`, String(n1*d2), `Cross-multiply: what is ${n1} × ${d2}?`, n1*d2),
      genSystemStep(`${n1*d2} vs ${n2*d1}`, sign, `Since ${n1*d2} ${sign} ${n2*d1}, what is ${n1}/${d1} ___ ${n2}/${d2}?`, sign, w, "=")
    ], answer: sign };
}

// ── Ch 8: Playing with Constructions
function genPracticeConstructions() {
  const pool = [
    { q:"A figure with two endpoints is called a ___.", a:"Line segment", w1:"Ray", w2:"Line" },
    { q:"A ray has how many endpoints?", a:"1", w1:"2", w2:"0" },
    { q:"A line extends in how many directions?", a:"Both directions", w1:"One direction", w2:"No direction" },
    { q:"A perpendicular bisector divides a segment into ___ equal parts.", a:"2", w1:"3", w2:"4" },
    { q:"What angle does a perpendicular bisector make?", a:"90°", w1:"45°", w2:"180°" },
    { q:"An angle bisector divides an angle into ___ equal parts.", a:"2", w1:"3", w2:"4" },
    { q:"Which tool is used to draw circles?", a:"Compass", w1:"Ruler", w2:"Protractor" },
    { q:"Which tool measures angles?", a:"Protractor", w1:"Compass", w2:"Set square" },
    { q:"Distance from the centre to any point on a circle is the ___.", a:"Radius", w1:"Diameter", w2:"Chord" },
    { q:"Diameter = ___ × radius.", a:"2", w1:"3", w2:"1" },
    { q:"Perpendicular bisector is perpendicular to the segment at its ___.", a:"Midpoint", w1:"End", w2:"Any point" },
    { q:"Two circles with the same radius are called ___ circles.", a:"Congruent", w1:"Concentric", w2:"Parallel" }
  ];
  const item = pool[randInt(0, pool.length-1)];
  return { display: item.q,
    steps: [genSystemStep(item.q, item.a, item.q, item.a, item.w1, item.w2)],
    answer: item.a };
}

// ── Ch 9: Symmetry
function genPracticeSymmetry() {
  const t = randInt(0, 3);
  if (t === 0) {
    const shapes = [
      {name:"Square",lines:4}, {name:"Rectangle",lines:2}, {name:"Equilateral triangle",lines:3},
      {name:"Regular hexagon",lines:6}, {name:"Isosceles triangle",lines:1},
      {name:"Scalene triangle",lines:0}, {name:"Rhombus",lines:2}, {name:"Regular pentagon",lines:5}
    ];
    const s = shapes[randInt(0, shapes.length-1)];
    return { display: `Shape: ${s.name}`,
      steps: [genArithStep(`${s.name}`, s.lines, `How many lines of symmetry does a ${s.name} have?`, s.lines)],
      answer: String(s.lines) };
  }
  if (t === 1) {
    const letters = [
      {l:"A",sym:"Yes"},{l:"B",sym:"Yes"},{l:"C",sym:"Yes"},{l:"D",sym:"Yes"},
      {l:"F",sym:"No"},{l:"G",sym:"No"},{l:"H",sym:"Yes"},{l:"M",sym:"Yes"},
      {l:"O",sym:"Yes"},{l:"P",sym:"No"},{l:"S",sym:"No"},{l:"T",sym:"Yes"},
      {l:"X",sym:"Yes"},{l:"Z",sym:"No"}
    ];
    const item = letters[randInt(0,letters.length-1)], w = item.sym === "Yes" ? "No" : "Yes";
    return { display: `Letter: ${item.l}`,
      steps: [genSystemStep(`Letter ${item.l}`, item.sym, `Does the letter ${item.l} have a line of symmetry?`, item.sym, w, "Cannot tell")],
      answer: item.sym };
  }
  if (t === 2) {
    const pool = [
      {q:"Reflection symmetry is also called ___ symmetry.", a:"Mirror", w1:"Rotational", w2:"Slide"},
      {q:"A line of symmetry divides a figure into ___ mirror-image halves.", a:"2", w1:"3", w2:"4"},
      {q:"When folded on its line of symmetry, the two halves ___.", a:"Overlap exactly", w1:"Do not overlap", w2:"Rotate"},
      {q:"A circle has ___ lines of symmetry.", a:"Infinite", w1:"4", w2:"1"}
    ];
    const item = pool[randInt(0,pool.length-1)];
    return { display: item.q,
      steps: [genSystemStep(item.q, item.a, item.q, item.a, item.w1, item.w2)],
      answer: item.a };
  }
  const a = randInt(10, 80);
  return { display: `An angle of ${a}° is reflected in a line of symmetry.\nWhat is the reflected angle?`,
    steps: [genSystemStep(`${a}°`, String(a), `Reflection keeps angles unchanged.`, String(a), String(180-a), String(90-a > 0 ? 90-a : 90+a))],
    answer: `${a}°` };
}

// ── Ch 10: The Other Side of Zero (Integers)
function genPracticeIntegers() {
  const t = randInt(0, 6);
  if (t === 0) {
    const a = randInt(3, 12), b = randInt(1, a-1), ans = a - b;
    return { display: `${a} + (−${b})`,
      steps: [genArithStep(`${a} + (−${b})`, String(ans), `What is the value of ${a} + (−${b})?`, ans)],
      answer: String(ans) };
  }
  if (t === 1) {
    const a = randInt(2, 10), b = randInt(1, 8), ans = a + b;
    return { display: `${a} − (−${b})`,
      steps: [genArithStep(`${a} − (−${b})`, String(ans), `What is the value of ${a} − (−${b})?`, ans)],
      answer: String(ans) };
  }
  if (t === 2) {
    const a = randInt(-10, 5), b = randInt(-10, 5);
    if (a === b) { return genPracticeIntegers(); }
    const sign = a > b ? ">" : "<", w = sign === ">" ? "<" : ">";
    return { display: `${a}  ___  ${b}`,
      steps: [genSystemStep(`${a} vs ${b}`, sign, `Compare the integers: ${a} ___ ${b}`, sign, w, "=")],
      answer: sign };
  }
  if (t === 3) {
    const n = randInt(1, 15) * (Math.random() < 0.5 ? 1 : -1), opp = -n;
    return { display: `What is the additive inverse (opposite) of ${n}?`,
      steps: [genArithStep(`opposite of ${n}`, String(opp), `What is the additive inverse of ${n}?`, opp)],
      answer: String(opp) };
  }
  if (t === 4) {
    const a = randInt(-10, -1), b = randInt(1, 15), ans = a + b;
    return { display: `${a} + ${b}`,
      steps: [genArithStep(`${a} + ${b}`, String(ans), `What is ${a} + ${b}?`, ans)],
      answer: String(ans) };
  }
  if (t === 5) {
    const a = randInt(1, 8), b = randInt(1, 8), ans = -(a+b);
    return { display: `(−${a}) + (−${b})`,
      steps: [genArithStep(`(−${a}) + (−${b})`, String(ans), `What is (−${a}) + (−${b})?`, ans)],
      answer: String(ans) };
  }
  const a = randInt(2, 8), b = randInt(a+1, 14), c = randInt(1, 5);
  const step1 = b - a, ans = step1 - c;
  return { display: `−${a} + ${b} − ${c}`,
    steps: [
      genArithStep(`−${a} + ${b}`, String(step1), `First evaluate −${a} + ${b}.`, step1),
      genArithStep(`${step1} − ${c}`, String(ans), `Now evaluate ${step1} − ${c}.`, ans)
    ], answer: String(ans) };
}
