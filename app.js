const SEED_TEAMS = [
  { id: "TM-01", name: "Visual Vibers", university: "KDU", rank: 3, score: 68.67, members: [
    ["Nabil Ahmad Dilshan Mahmoor", "Team Leader", "D/BSE/24/0006", "Software Engineering", "0761089094"],
    ["Maha Patabendige Behan Ravishka Perera", "Member 2", "D/BSE/24/0022", "Software Engineering", "0763354538"],
    ["Ukwaththage Dulshan Rajeewa", "Member 3", "D/BSE/24/0009", "Software Engineering", "0760036300"],
    ["Ihala Gedara Sankha Bhashana Rupasingha", "Member 4", "D/BSE/24/0023", "Software Engineering", "0703254007"]
  ]},
  { id: "TM-03", name: "Gmora", university: "University of Moratuwa", rank: 7, score: 64.33, members: [
    ["Pasidu Mihiranga Ilamperuma", "Team Leader", "234083R", "Information Technology", "0760554321"],
    ["Wandawa Gamage Kusal Pabasara", "Member 2", "230452R", "Computer Science", "0787720767"],
    ["Kurumbure Gamunu Rathnage Thanoj Buddhima", "Member 3", "234035A", "Information Technology", "0772434352"],
    ["Sasindu Jayamadu Wijewardana", "Member 4", "234241C", "Information Technology", "0767349531"]
  ]},
  { id: "TM-05", name: "Lorem Ipsum Legends", university: "KDU", rank: 1, score: 74, members: [
    ["Tharuka Hasith Senadeera", "Team Leader", "D/BSE/25/0011", "Software Engineering", "0761333198"],
    ["Ashen Etugala", "Member 2", "D/BCS/25/0002", "Computer Science", "0762578944"],
    ["Aqeel Ahamad", "Member 3", "D/DBA/25/0021", "Data Science & Business Analytics", "0762559614"],
    ["Ushan Rashmika", "Member 4", "D/BSE/25/0011", "Software Engineering", "0719949639"]
  ]},
  { id: "TM-06", name: "Nexio", university: "University of Moratuwa", rank: 10, score: 63.67, members: [
    ["S. A. Sahas Samuditha Abeygunarathne", "Team Leader", "234003B", "BSc Hons Information Technology", "0701117241"],
    ["Rashmi Maneka Abeysekera", "Member 2", "234004E", "BSc Hons Information Technology", "0743751133"],
    ["Nallaperuma Danulya", "Member 3", "234043V", "BSc Hons Information Technology", "0710328011"]
  ]},
  { id: "TM-07", name: "Sputnik", university: "University of Moratuwa", rank: 4, score: 68.33, members: [
    ["Kisal Hirusha Kularathna", "Team Leader", "234114P", "Information Technology", "0775917934"],
    ["P M Dulsi Poorma", "Member 2", "234160C", "Information Technology", "0710985234"],
    ["K A D Dehami Divyanjalee", "Member 3", "234059B", "Information Technology", "0771462309"],
    ["Dulan Prabashwara Ekanayaka", "Member 4", "234060U", "Information Technology", "0776277320"]
  ]},
  { id: "TM-13", name: "BEYOND INTERFACE", university: "KDU", rank: 5, score: 67.33, members: [
    ["Damidu Abeysinghe", "Team Leader", "D/BIS/25/0016", "Information Systems", "0763801234"],
    ["Dunya Ellegoda", "Member 2", "D/BIS/25/0027", "Information Systems", "0777163015"],
    ["Sanduni Perera", "Member 3", "D/BIT/25/0018", "Information Technology", "0763890272"],
    ["S H Hansana", "Member 4", "D/BIS/25/0012", "Information Systems", "0765820292"]
  ]},
  { id: "TM-17", name: "Nexora", university: "KDU", rank: 6, score: 65.67, members: [
    ["M. S. T. Ravihari", "Team Leader", "D/BIT/25/0020", "Information Technology", "0701035272"],
    ["R. D. N. Bandara", "Member 2", "D/BIT/25/0064", "Information Technology", "0775551468"],
    ["N. O. K. Silva", "Member 3", "D/BIT/25/0049", "Information Technology", "0712064109"],
    ["R. M. V. K. Rathnayake", "Member 4", "D/BIS/25/0029", "Information Systems", "0743366847"]
  ]},
  { id: "TM-27", name: "Voodoo Boys", university: "KDU", rank: 7, score: 64.33, members: [
    ["T P S D Perera", "Team Leader", "D/BIT/24/0089", "Information Technology", "0704134520"],
    ["D M K V Dissanayake", "Member 2", "D/BIT/24/0032", "Information Technology", "0771002453"],
    ["D R Warnasooriya", "Member 3", "D/BIT/24/0062", "Information Technology", "0774926156"],
    ["K A U C Prabhashwara", "Member 4", "D/BIS/24/0004", "Information Systems", "0772987904"]
  ]},
  { id: "TM-51", name: "CodeXtreme", university: "University of Jaffna", rank: 2, score: 69, members: [
    ["Ahsan Ahamed Rifas", "Team Leader", "2023/E/128", "BSc Engineering", "0757563100"],
    ["Abooayoobu Mohammed Mumeeth", "Member 2", "2023/E/003", "BSc Engineering", "0741519255"],
    ["Mohammathu Kasin Mohammathu Musni", "Member 3", "2024/E/088", "BSc Engineering", "0766440775"]
  ]},
  { id: "TM-53", name: "Cyclops", university: "KDU", rank: 7, score: 64.33, members: [
    ["Nethuli Senanayake", "Team Leader", "D/BSE/25/0018", "Software Engineering", "0714966322"],
    ["S Y N Peiris", "Member 2", "D/BSE/25/0019", "Software Engineering", "0763964524"],
    ["Prabakaran Rohit", "Member 3", "D/BSE/25/0020", "Software Engineering", "0771782532"],
    ["P V Kavinda", "Member 4", "D/BSE/25/0021", "Software Engineering", "0704643812"]
  ]}
];

const STORAGE_KEY = "cre8x_olympus_command_v1";
const RESET_PASSWORD = "16672";
const BACKEND_CONFIG = window.CRE8X_BACKEND || {};
const BACKEND_POLL_MS = 8000;
const normalizeSeed = () => SEED_TEAMS.map(team => ({
  ...team,
  checkedIn: false,
  checkedInAt: null,
  notes: "",
  members: team.members.map((m, index) => ({
    id: `m${index + 1}`, name: m[0], role: m[1], sid: m[2], degree: m[3], phone: m[4],
    present: false, substituted: false
  }))
}));

let state = loadState();
let activeTeamId = new URLSearchParams(location.search).get("team") || state.teams[0].id;
let replacementTarget = null;
let backendReady = false;
let backendRevision = 0;
let backendWriteTimer = null;
let backendWriteInFlight = false;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.teams?.length === 10) return saved;
  } catch (_) {}
  return { teams: normalizeSeed() };
}

function saveState(message) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateGlobalMetrics();
  scheduleBackendSync();
  if (message) showToast(message);
}

function backendHeaders(extra = {}) {
  return { apikey: BACKEND_CONFIG.publishableKey, ...extra };
}

function setBackendStatus(status) {
  document.querySelectorAll(".signal").forEach(indicator => {
    indicator.classList.remove("syncing", "offline");
    if (status !== "online") indicator.classList.add(status);
    const label = status === "online" ? "Live database" : status === "syncing" ? "Syncing data" : "Offline cache";
    indicator.innerHTML = `<i></i> ${label}`;
    indicator.title = status === "online" ? "Connected to the Supabase backend" : status === "syncing" ? "Synchronizing with Supabase" : "Using this browser's local backup";
  });
}

function validRemoteState(candidate) {
  return Array.isArray(candidate?.teams) && candidate.teams.length === SEED_TEAMS.length;
}

async function fetchBackendState({ quiet = false } = {}) {
  if (!BACKEND_CONFIG.url || !BACKEND_CONFIG.publishableKey) return null;
  const response = await fetch(`${BACKEND_CONFIG.url}/rest/v1/registration_state?id=eq.1&select=data,revision,updated_at`, {
    headers: backendHeaders({ Accept: "application/json" }),
    cache: "no-store"
  });
  if (!response.ok) throw new Error(`Backend read failed (${response.status})`);
  const [row] = await response.json();
  if (!row || !validRemoteState(row.data)) return null;
  if (!quiet || Number(row.revision) > backendRevision) {
    backendRevision = Number(row.revision) || 0;
    state = row.data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (!state.teams.some(team => team.id === activeTeamId)) activeTeamId = state.teams[0].id;
    updateGlobalMetrics();
    renderCurrentPage();
  }
  return row;
}

async function pushBackendState() {
  if (!backendReady || backendWriteInFlight) return;
  backendWriteInFlight = true;
  setBackendStatus("syncing");
  const revision = Date.now();
  try {
    const response = await fetch(`${BACKEND_CONFIG.url}/rest/v1/registration_state?on_conflict=id`, {
      method: "POST",
      headers: backendHeaders({
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal"
      }),
      body: JSON.stringify({ id: 1, data: state, revision, updated_at: new Date().toISOString() })
    });
    if (!response.ok) throw new Error(`Backend write failed (${response.status})`);
    backendRevision = revision;
    setBackendStatus("online");
  } catch (error) {
    console.warn("Cre8x backend sync paused:", error.message);
    setBackendStatus("offline");
  } finally {
    backendWriteInFlight = false;
  }
}

function scheduleBackendSync() {
  if (!backendReady) return;
  clearTimeout(backendWriteTimer);
  backendWriteTimer = setTimeout(pushBackendState, 260);
}

async function initBackend() {
  if (!BACKEND_CONFIG.url || !BACKEND_CONFIG.publishableKey) {
    setBackendStatus("offline");
    return;
  }
  setBackendStatus("syncing");
  try {
    const row = await fetchBackendState();
    backendReady = true;
    if (!row) await pushBackendState();
    else setBackendStatus("online");
    window.setInterval(async () => {
      if (document.visibilityState !== "visible" || backendWriteInFlight) return;
      try {
        await fetchBackendState({ quiet: true });
        setBackendStatus("online");
      } catch (_) {
        setBackendStatus("offline");
      }
    }, BACKEND_POLL_MS);
  } catch (error) {
    console.warn("Cre8x backend unavailable; local cache remains active:", error.message);
    setBackendStatus("offline");
  }
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function metrics() {
  const members = state.teams.flatMap(t => t.members);
  const checked = state.teams.filter(t => t.checkedIn).length;
  const present = members.filter(m => m.present).length;
  return {
    checked, pending: state.teams.length - checked, present,
    substitutions: members.filter(m => m.substituted).length,
    completion: Math.round(checked / state.teams.length * 100),
    attendance: Math.round(present / members.length * 100)
  };
}

function setText(selector, value) { document.querySelectorAll(selector).forEach(el => { el.textContent = value; }); }
function updateGlobalMetrics() {
  const m = metrics();
  setText("[data-checked-count]", m.checked); setText("[data-pending-count]", m.pending);
  setText("[data-present-count]", m.present); setText("[data-substitution-count]", m.substitutions);
  setText("[data-progress-percent]", `${m.completion}%`); setText("[data-attendance-percent]", `${m.attendance}%`);
  document.querySelectorAll("[data-progress-sigil], [data-report-donut]").forEach(el => el.style.setProperty("--progress", m.completion));
  document.querySelectorAll("[data-progress-bar]").forEach(el => el.style.width = `${m.completion}%`);
  document.querySelectorAll("[data-attendance-bar]").forEach(el => el.style.width = `${m.attendance}%`);
  document.querySelectorAll("[data-pending-bar]").forEach(el => el.style.width = `${100 - m.completion}%`);
  document.querySelectorAll("[data-substitution-bar]").forEach(el => el.style.width = `${Math.min(100, m.substitutions * 12.5)}%`);
}

function showToast(message) {
  const toast = document.querySelector("[data-toast]");
  if (!toast) return;
  toast.textContent = message; toast.classList.add("show");
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function initPreloader() {
  const loader = document.querySelector("[data-preloader]");
  if (!loader) return;

  loader.classList.add("enhanced");
  loader.insertAdjacentHTML("afterbegin", `
    <div class="loader-aurora" aria-hidden="true"></div>
    <div class="loader-particles" aria-hidden="true">${Array.from({ length: 18 }, (_, index) => `<i style="--i:${index}"></i>`).join("")}</div>
    <div class="loader-reticle loader-reticle-a" aria-hidden="true"><i></i></div>
    <div class="loader-reticle loader-reticle-b" aria-hidden="true"><i></i></div>
  `);
  const logo = loader.querySelector(".glitch-logo");
  logo?.insertAdjacentHTML("beforeend", '<span class="logo-sweep" aria-hidden="true"></span>');
  const core = loader.querySelector(".preloader-core");
  core?.insertAdjacentHTML("beforeend", `
    <div class="loader-hud" aria-hidden="true">
      <span><i></i> CORE SYNC</span>
      <b data-loader-progress>00%</b>
      <span>GATEWAY 03.0 <i></i></span>
    </div>
    <div class="loader-sequence" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
  `);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasPlayed = sessionStorage.getItem("cre8x_loader_seen") === "true";
  const minimumDisplay = reducedMotion ? 100 : (hasPlayed ? 850 : 1800);
  const progressLabel = loader.querySelector("[data-loader-progress]");
  let progress = reducedMotion ? 100 : 4;
  let complete = false;
  const paintProgress = value => {
    progress = Math.min(100, Math.round(value));
    loader.style.setProperty("--loader-progress", progress);
    if (progressLabel) progressLabel.textContent = `${String(progress).padStart(2, "0")}%`;
  };
  paintProgress(progress);
  const progressTimer = reducedMotion ? null : setInterval(() => {
    if (complete) return;
    const ceiling = document.readyState === "complete" ? 98 : 89;
    progress = Math.min(ceiling, progress + Math.max(1, Math.round((ceiling - progress) * .13)));
    paintProgress(progress);
  }, 80);
  const reveal = () => {
    setTimeout(() => {
      complete = true;
      if (progressTimer) clearInterval(progressTimer);
      paintProgress(100);
      loader.classList.add("is-complete");
      setTimeout(() => {
        loader.classList.add("is-hidden");
        loader.setAttribute("aria-hidden", "true");
        setTimeout(() => loader.remove(), 700);
      }, reducedMotion ? 0 : 220);
    }, minimumDisplay);
  };
  sessionStorage.setItem("cre8x_loader_seen", "true");
  if (document.readyState === "complete") reveal();
  else window.addEventListener("load", reveal, { once: true });
}

function initShell() {
  updateGlobalMetrics();
  const tick = () => setText("[data-clock]", new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  tick(); setInterval(tick, 30000);
  document.querySelector("[data-menu-toggle]")?.addEventListener("click", () => document.querySelector(".sidebar")?.classList.toggle("open"));
  document.addEventListener("click", event => {
    if (innerWidth <= 820 && document.querySelector(".sidebar.open") && !event.target.closest(".sidebar") && !event.target.closest("[data-menu-toggle]")) document.querySelector(".sidebar").classList.remove("open");
  });
  initFullscreenToggle();
  initSearch();
  document.querySelectorAll("[data-export-csv]").forEach(button => button.addEventListener("click", exportCsv));
  initSecureReset();
}

function initFullscreenToggle() {
  const target = document.documentElement;
  const requestFullscreen = target.requestFullscreen || target.webkitRequestFullscreen;
  const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
  const fullscreenSupported = document.fullscreenEnabled ?? document.webkitFullscreenEnabled ?? Boolean(requestFullscreen);
  const container = document.querySelector(".sidebar-foot");
  if (!container || !requestFullscreen || !exitFullscreen || !fullscreenSupported) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "fullscreen-toggle";
  button.innerHTML = '<i aria-hidden="true">⛶</i><span>Full screen</span>';
  container.prepend(button);

  const update = () => {
    const active = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", active ? "Exit full screen" : "Enter full screen");
    button.title = active ? "Exit full screen" : "Enter full screen";
    button.querySelector("span").textContent = active ? "Exit screen" : "Full screen";
  };

  button.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) await exitFullscreen.call(document);
      else await requestFullscreen.call(target);
    } catch (_) {
      showToast("Full screen was blocked by the browser. Try the button again.");
    }
  });
  document.addEventListener("fullscreenchange", update);
  document.addEventListener("webkitfullscreenchange", update);
  update();
}

function initSecureReset() {
  const triggers = document.querySelectorAll("[data-reset-demo], [data-open-reset]");
  if (!triggers.length) return;

  document.body.insertAdjacentHTML("beforeend", `
    <div class="secure-reset-modal" data-reset-modal aria-hidden="true">
      <section class="secure-reset-card" role="dialog" aria-modal="true" aria-labelledby="reset-title">
        <button class="reset-modal-close" type="button" data-close-reset aria-label="Close reset dialog">×</button>
        <div class="reset-lock" aria-hidden="true"><span></span><i>Ω</i></div>
        <span class="eyebrow">RESTRICTED COMMAND</span>
        <h2 id="reset-title">Reset registration records?</h2>
        <p data-reset-description>Choose whether to restore every team or only one selected team to its original registration state.</p>
        <form data-reset-form>
          <fieldset class="reset-scope">
            <legend>Reset scope</legend>
            <label class="scope-option">
              <input type="radio" name="reset-scope" value="all" checked>
              <span><b>All teams</b><small>Clear the complete registration desk</small></span>
            </label>
            <label class="scope-option">
              <input type="radio" name="reset-scope" value="team">
              <span><b>Selected team</b><small>Keep every other team unchanged</small></span>
            </label>
          </fieldset>
          <div class="reset-team-picker" data-reset-team-picker hidden>
            <label for="reset-team-select">Team to restore</label>
            <div class="reset-select-shell"><span aria-hidden="true">Ω</span><select id="reset-team-select" data-reset-team-select></select><i aria-hidden="true">⌄</i></div>
          </div>
          <label for="reset-password">Command password</label>
          <div class="password-field"><span aria-hidden="true">⌁</span><input id="reset-password" data-reset-password type="password" inputmode="numeric" autocomplete="off" placeholder="Enter access code" required><i aria-hidden="true"></i></div>
          <small class="reset-error" data-reset-error aria-live="polite"></small>
          <div class="reset-actions"><button class="button ghost" type="button" data-close-reset>Cancel</button><button class="button danger-button" type="submit" data-reset-submit>Reset all teams</button></div>
        </form>
        <div class="reset-clearance" aria-hidden="true"><i></i><span>LEVEL Ω CLEARANCE REQUIRED</span><i></i></div>
      </section>
    </div>
  `);

  const modal = document.querySelector("[data-reset-modal]");
  const card = modal.querySelector(".secure-reset-card");
  const input = modal.querySelector("[data-reset-password]");
  const error = modal.querySelector("[data-reset-error]");
  const description = modal.querySelector("[data-reset-description]");
  const teamPicker = modal.querySelector("[data-reset-team-picker]");
  const teamSelect = modal.querySelector("[data-reset-team-select]");
  const submitButton = modal.querySelector("[data-reset-submit]");
  const scopeInputs = modal.querySelectorAll('input[name="reset-scope"]');
  const selectedScope = () => modal.querySelector('input[name="reset-scope"]:checked')?.value || "all";
  const updateScope = () => {
    const isTeam = selectedScope() === "team";
    teamPicker.hidden = !isTeam;
    teamSelect.required = isTeam;
    description.textContent = isTeam
      ? "Only the chosen team's check-in, attendance, substitutions, and desk note will be restored."
      : "Every team's check-in, attendance, substitutions, and desk notes will be restored.";
    submitButton.textContent = isTeam ? "Reset selected team" : "Reset all teams";
  };
  const open = () => {
    input.value = "";
    error.textContent = "";
    card.classList.remove("denied");
    teamSelect.innerHTML = state.teams.map(team => `<option value="${escapeHtml(team.id)}">${escapeHtml(team.id)} · ${escapeHtml(team.name)}</option>`).join("");
    teamSelect.value = state.teams.some(team => team.id === activeTeamId) ? activeTeamId : state.teams[0].id;
    const allScope = modal.querySelector('input[name="reset-scope"][value="all"]');
    if (allScope) allScope.checked = true;
    updateScope();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    setTimeout(() => input.focus(), 80);
  };
  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  triggers.forEach(button => button.addEventListener("click", open));
  scopeInputs.forEach(option => option.addEventListener("change", updateScope));
  modal.querySelectorAll("[data-close-reset]").forEach(button => button.addEventListener("click", close));
  modal.addEventListener("click", event => { if (event.target === modal) close(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("open")) close(); });
  modal.querySelector("[data-reset-form]").addEventListener("submit", event => {
    event.preventDefault();
    if (input.value !== RESET_PASSWORD) {
      error.textContent = "ACCESS DENIED · Incorrect command password";
      card.classList.remove("denied");
      void card.offsetWidth;
      card.classList.add("denied");
      input.select();
      return;
    }
    if (selectedScope() === "team") {
      const cleanTeam = normalizeSeed().find(team => team.id === teamSelect.value);
      const teamIndex = state.teams.findIndex(team => team.id === teamSelect.value);
      if (!cleanTeam || teamIndex < 0) {
        error.textContent = "SELECT A VALID TEAM TO CONTINUE";
        return;
      }
      state.teams.splice(teamIndex, 1, cleanTeam);
      saveState(`${cleanTeam.name} was securely restored to its starting state.`);
    } else {
      state = { teams: normalizeSeed() };
      saveState("All registration records were securely reset.");
    }
    close();
    renderCurrentPage();
  });
}

function initSearch() {
  const dialog = document.querySelector("[data-search-dialog]");
  const input = document.querySelector("[data-global-search]");
  const results = document.querySelector("[data-search-results]");
  if (!dialog || !input || !results) return;
  const open = () => { dialog.classList.add("open"); dialog.setAttribute("aria-hidden", "false"); setTimeout(() => input.focus(), 30); };
  const close = () => { dialog.classList.remove("open"); dialog.setAttribute("aria-hidden", "true"); input.value = ""; results.innerHTML = "<p>Start typing to search the finalist roster.</p>"; };
  document.querySelectorAll("[data-search-trigger]").forEach(button => button.addEventListener("click", open));
  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); open(); }
    if (event.key === "Escape") close();
  });
  dialog.addEventListener("click", event => { if (event.target === dialog) close(); });
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) { results.innerHTML = "<p>Start typing to search the finalist roster.</p>"; return; }
    const matches = [];
    state.teams.forEach(team => {
      if ([team.id, team.name, team.university].some(v => v.toLowerCase().includes(query))) matches.push({ team, label: team.name, meta: `${team.id} · ${team.university}` });
      team.members.forEach(member => { if ([member.name, member.sid, member.phone].some(v => v.toLowerCase().includes(query))) matches.push({ team, label: member.name, meta: `${member.sid} · ${team.name}` }); });
    });
    results.innerHTML = matches.length ? matches.slice(0, 8).map(match => `<a class="search-result" href="checkin.html?team=${encodeURIComponent(match.team.id)}"><div><strong>${escapeHtml(match.label)}</strong><small>${escapeHtml(match.meta)}</small></div><span>OPEN →</span></a>`).join("") : "<p>No team or delegate matches that search.</p>";
  });
}

function renderDashboard() {
  const nextTeam = state.teams.find(team => !team.checkedIn);
  setText("[data-next-team-code]", nextTeam?.id || "Ω-10");
  setText("[data-next-team-name]", nextTeam?.name || "All alliances cleared");
  setText("[data-next-team-status]", nextTeam ? "AWAITING CHECK-IN" : "SUMMIT COMPLETE");
  const queue = document.querySelector("[data-queue-list]");
  if (queue) queue.innerHTML = state.teams.slice(0, 6).map((team, index) => `<div class="queue-item"><span class="queue-index">${String(index + 1).padStart(2, "0")}</span><div class="queue-team"><strong>${escapeHtml(team.name)}</strong><small>${escapeHtml(team.id)} · ${escapeHtml(team.university)}</small></div><span class="status-pill ${team.checkedIn ? "checked" : ""}">${team.checkedIn ? "● Verified" : "◇ Awaiting"}</span><a href="checkin.html?team=${team.id}" aria-label="Open ${escapeHtml(team.name)}">→</a></div>`).join("");
  const chart = document.querySelector("[data-pulse-chart]");
  if (chart) chart.innerHTML = state.teams.map(team => { const count = team.members.filter(m => m.present).length; const percent = count / team.members.length * 100; return `<div class="pulse-bar" title="${escapeHtml(team.name)}: ${count}/${team.members.length} present"><i style="--bar:${percent}"></i><span>${escapeHtml(team.id)}</span></div>`; }).join("");
}

function currentTeam() { return state.teams.find(team => team.id === activeTeamId) || state.teams[0]; }
function initCheckin() {
  const select = document.querySelector("[data-team-select]");
  if (!select) return;
  select.innerHTML = state.teams.map(team => `<option value="${team.id}">${team.id} · ${escapeHtml(team.name)} ${team.checkedIn ? "— VERIFIED" : "— AWAITING"}</option>`).join("");
  select.value = currentTeam().id;
  select.addEventListener("change", () => { activeTeamId = select.value; history.replaceState({}, "", `?team=${activeTeamId}`); renderCheckinTeam(); });
  document.querySelector("[data-prev-team]")?.addEventListener("click", () => stepTeam(-1));
  document.querySelector("[data-next-team]")?.addEventListener("click", () => stepTeam(1));
  document.querySelector("[data-mark-all]")?.addEventListener("click", () => { currentTeam().members.forEach(m => m.present = true); saveState("Every delegate in this team is marked present."); renderCheckinTeam(); });
  document.querySelector("[data-confirm-team]")?.addEventListener("click", confirmCurrentTeam);
  document.querySelector("[data-save-note]")?.addEventListener("click", () => { currentTeam().notes = document.querySelector("[data-desk-note]").value.trim(); saveState("Desk note saved."); });
  document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeMemberModal));
  document.querySelector("[data-save-replacement]")?.addEventListener("click", saveReplacement);
  renderCheckinTeam();
}

function stepTeam(direction) {
  let index = state.teams.findIndex(team => team.id === currentTeam().id);
  index = (index + direction + state.teams.length) % state.teams.length;
  activeTeamId = state.teams[index].id;
  const select = document.querySelector("[data-team-select]"); if (select) select.value = activeTeamId;
  history.replaceState({}, "", `?team=${activeTeamId}`); renderCheckinTeam();
}

function renderCheckinTeam() {
  const team = currentTeam(); const present = team.members.filter(m => m.present).length;
  const profile = document.querySelector("[data-team-profile]");
  if (profile) profile.innerHTML = `<span class="eyebrow">ACTIVE ALLIANCE</span><div class="team-badge-large"><span>${escapeHtml(team.id)}</span></div><h2>${escapeHtml(team.name)}</h2><span class="institution">${escapeHtml(team.university)}</span><div class="team-meta-list"><div><span>Round I rank</span><b>#${team.rank}</b></div><div><span>Qualifying score</span><b>${team.score.toFixed(2)}</b></div><div><span>Delegation</span><b>${team.members.length} members</b></div><div><span>Present now</span><b>${present} / ${team.members.length}</b></div></div><div class="team-status-large ${team.checkedIn ? "checked" : ""}"><i></i><span>${team.checkedIn ? "TEAM VERIFIED" : "AWAITING CONFIRMATION"}<small>${team.checkedIn ? `Cleared at ${escapeHtml(team.checkedInAt || "desk")}` : "Complete the manifest to clear this team"}</small></span></div>`;
  setText("[data-manifest-title]", `${team.id} manifest`); setText("[data-member-count]", `${present} / ${team.members.length} present`);
  const list = document.querySelector("[data-member-list]");
  if (list) list.innerHTML = team.members.map((member, index) => `<div class="member-row"><span class="member-no">${String(index + 1).padStart(2, "0")}</span><div class="member-identity"><strong>${escapeHtml(member.name)}${member.substituted ? " · REPLACEMENT" : ""}</strong><small>${escapeHtml(member.role)} · ${escapeHtml(member.phone)}</small></div><div class="member-academic"><span>${escapeHtml(member.sid)}</span><small>${escapeHtml(member.degree)}</small></div><button class="attendance-toggle ${member.present ? "" : "absent"}" data-attendance="${member.id}">${member.present ? "● PRESENT" : "○ ABSENT"}</button><button class="more-button" data-replace="${member.id}" aria-label="Replace ${escapeHtml(member.name)}">•••</button></div>`).join("");
  list?.querySelectorAll("[data-attendance]").forEach(button => button.addEventListener("click", () => { const member = team.members.find(m => m.id === button.dataset.attendance); member.present = !member.present; saveState(`${member.name} marked ${member.present ? "present" : "absent"}.`); renderCheckinTeam(); }));
  list?.querySelectorAll("[data-replace]").forEach(button => button.addEventListener("click", () => openMemberModal(team.id, button.dataset.replace)));
  const note = document.querySelector("[data-desk-note]"); if (note) note.value = team.notes || "";
  const select = document.querySelector("[data-team-select]"); if (select) { select.innerHTML = state.teams.map(t => `<option value="${t.id}">${t.id} · ${escapeHtml(t.name)} ${t.checkedIn ? "— VERIFIED" : "— AWAITING"}</option>`).join(""); select.value = team.id; }
}

function confirmCurrentTeam() {
  const team = currentTeam();
  if (!team.members.some(member => member.present)) { showToast("Mark at least one delegate present before confirming."); return; }
  team.checkedIn = true; team.checkedInAt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const note = document.querySelector("[data-desk-note]"); if (note) team.notes = note.value.trim();
  saveState(`${team.name} cleared through the registration gate.`); renderCheckinTeam();
}

function openMemberModal(teamId, memberId) {
  replacementTarget = { teamId, memberId };
  const member = state.teams.find(t => t.id === teamId).members.find(m => m.id === memberId);
  setText("[data-original-member]", member.name);
  document.querySelector("[data-replacement-name]").value = ""; document.querySelector("[data-replacement-id]").value = ""; document.querySelector("[data-replacement-phone]").value = "";
  const modal = document.querySelector("[data-member-modal]"); modal?.classList.add("open"); modal?.setAttribute("aria-hidden", "false");
}
function closeMemberModal() { const modal = document.querySelector("[data-member-modal]"); modal?.classList.remove("open"); modal?.setAttribute("aria-hidden", "true"); replacementTarget = null; }
function saveReplacement() {
  const name = document.querySelector("[data-replacement-name]").value.trim();
  if (!name || !replacementTarget) { showToast("Enter the replacement delegate's name."); return; }
  const team = state.teams.find(t => t.id === replacementTarget.teamId); const member = team.members.find(m => m.id === replacementTarget.memberId);
  member.originalName ||= member.name; member.name = name; member.sid = document.querySelector("[data-replacement-id]").value.trim() || member.sid; member.phone = document.querySelector("[data-replacement-phone]").value.trim() || member.phone; member.substituted = true;
  saveState(`${name} added to ${team.name}.`); closeMemberModal(); renderCheckinTeam();
}

function initTeams() {
  let filter = "all"; let query = "";
  const render = () => renderTeamGallery(filter, query);
  document.querySelector("[data-team-filter]")?.addEventListener("input", event => { query = event.target.value.toLowerCase().trim(); render(); });
  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => { filter = button.dataset.filter; document.querySelectorAll("[data-filter]").forEach(b => b.classList.toggle("active", b === button)); render(); }));
  render();
}
function renderTeamGallery(filter = "all", query = "") {
  let teams = state.teams.filter(team => filter === "all" || (filter === "checked" ? team.checkedIn : !team.checkedIn));
  if (query) teams = teams.filter(team => [team.id, team.name, team.university].some(v => v.toLowerCase().includes(query)));
  const gallery = document.querySelector("[data-team-gallery]"); if (!gallery) return;
  gallery.innerHTML = teams.length ? teams.map((team, index) => { const present = team.members.filter(m => m.present).length; return `<article class="team-card" data-index="${String(index + 1).padStart(2, "0")}"><div class="team-card-head"><div class="team-id"><span>${escapeHtml(team.id)}</span></div><span class="status-pill ${team.checkedIn ? "checked" : ""}">${team.checkedIn ? "● Verified" : "◇ Awaiting"}</span></div><h2>${escapeHtml(team.name)}</h2><div class="uni">${escapeHtml(team.university)}</div><div class="team-card-stats"><span><small>MEMBERS</small><b>${team.members.length}</b></span><span><small>PRESENT</small><b>${present}</b></span><span><small>RANK</small><b>#${team.rank}</b></span></div><div class="team-card-foot"><small>${team.score.toFixed(2)} QUALIFYING SCORE</small><a href="checkin.html?team=${team.id}">Open desk →</a></div></article>`; }).join("") : "<div class='empty-state'>No alliances match this view.</div>";
}

function renderReports() {
  const institutions = {};
  state.teams.forEach(team => institutions[team.university] = (institutions[team.university] || 0) + team.members.length);
  const max = Math.max(...Object.values(institutions));
  const bars = document.querySelector("[data-institution-bars]");
  if (bars) bars.innerHTML = Object.entries(institutions).sort((a,b) => b[1] - a[1]).map(([name, count]) => `<div class="institution-row"><span title="${escapeHtml(name)}">${escapeHtml(name)}</span><div><i style="width:${count / max * 100}%"></i></div><b>${count}</b></div>`).join("");
  const rows = document.querySelector("[data-report-rows]");
  if (rows) rows.innerHTML = state.teams.map(team => { const present = team.members.filter(m => m.present).length; const subs = team.members.filter(m => m.substituted).length; return `<tr><td>${escapeHtml(team.id)} · ${escapeHtml(team.name)}</td><td>${escapeHtml(team.university)}</td><td><span class="status-pill ${team.checkedIn ? "checked" : ""}">${team.checkedIn ? "Verified" : "Awaiting"}</span></td><td>${present} / ${team.members.length}</td><td>${subs}</td><td class="note-cell" title="${escapeHtml(team.notes)}">${escapeHtml(team.notes || "—")}</td></tr>`; }).join("");
}

function exportCsv() {
  const rows = [["Team ID", "Team Name", "University", "Status", "Member Role", "Member Name", "Attendance", "Phone", "Student ID", "Degree", "Substituted", "Desk Note"]];
  state.teams.forEach(team => team.members.forEach(member => rows.push([team.id, team.name, team.university, team.checkedIn ? "VERIFIED" : "AWAITING", member.role, member.name, member.present ? "PRESENT" : "ABSENT", member.phone, member.sid, member.degree, member.substituted ? "YES" : "NO", team.notes])));
  const csv = rows.map(row => row.map(value => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a");
  link.href = url; link.download = `Cre8x_Olympus_Registration_${new Date().toISOString().slice(0,10)}.csv`; link.click(); URL.revokeObjectURL(url); showToast("Live registration roster exported.");
}

function renderCurrentPage() {
  const page = document.body.dataset.page;
  if (page === "dashboard") renderDashboard();
  if (page === "checkin") renderCheckinTeam();
  if (page === "teams") renderTeamGallery();
  if (page === "reports") renderReports();
}

initPreloader();

document.addEventListener("DOMContentLoaded", () => {
  initShell();
  const page = document.body.dataset.page;
  if (page === "dashboard") renderDashboard();
  if (page === "checkin") initCheckin();
  if (page === "teams") initTeams();
  if (page === "reports") renderReports();
  initBackend();
});
