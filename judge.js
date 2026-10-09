const JUDGE_TEAMS = [
  { id: "TM-01", name: "Visual Vibers", university: "KDU" },
  { id: "TM-03", name: "Gmora", university: "University of Moratuwa" },
  { id: "TM-05", name: "Lorem Ipsum Legends", university: "KDU" },
  { id: "TM-06", name: "Nexio", university: "University of Moratuwa" },
  { id: "TM-07", name: "Sputnik", university: "University of Moratuwa" },
  { id: "TM-13", name: "BEYOND INTERFACE", university: "KDU" },
  { id: "TM-17", name: "Nexora", university: "KDU" },
  { id: "TM-27", name: "Voodoo Boys", university: "KDU" },
  { id: "TM-51", name: "CodeXtreme", university: "University of Jaffna" },
  { id: "TM-53", name: "Cyclops", university: "KDU" }
];

const SCORE_CRITERIA = [
  { key: "research_score", label: "Problem framing & research", max: 15, help: "Evidence, audience insight, and clarity of the problem being solved." },
  { key: "usability_score", label: "UX flow & usability", max: 25, help: "Task flow, information architecture, accessibility, and ease of use." },
  { key: "visual_score", label: "Visual design & consistency", max: 20, help: "Hierarchy, typography, color, components, and system coherence." },
  { key: "innovation_score", label: "Innovation & creativity", max: 15, help: "Originality, relevance, and strength of the central product idea." },
  { key: "technical_score", label: "Technical execution", max: 15, help: "Responsiveness, prototype quality, feasibility, and implementation craft." },
  { key: "presentation_score", label: "Presentation & Q&A", max: 10, help: "Storytelling, time discipline, confidence, and quality of responses." }
];

const JUDGE_DIRECTORY = {
  hiran: { email: "hiran.judge@cre8x.app", name: "Hiran Karunananda", title: "Senior Technical Lead, UI/UX", photo: "assets/judge-hiran.png" },
  pasindu: { email: "pasindu.judge@cre8x.app", name: "Pasindu Madushan", title: "Associate UI/UX Lead", photo: "assets/judge-pasindu.png" }
};

const JUDGING_THEME_KEY = "cre8x_theme_v1";
const IDLE_LIMIT_MS = 30 * 60 * 1000;
const backend = window.CRE8X_BACKEND || {};
const client = window.supabase?.createClient?.(backend.url, backend.publishableKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storage: window.sessionStorage }
});

let selectedJudgeCode = "";
let session = null;
let profile = null;
let judgeProfiles = [];
let scoreRows = [];
let activeTeamId = JUDGE_TEAMS[0].id;
let saveTimer = null;
let saveInFlight = false;
let idleTimer = null;

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
const formatScore = value => value == null ? "—" : Number(value).toFixed(2);

function showJudgeToast(message) {
  const toast = $("[data-judge-toast]");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showJudgeToast.timer);
  showJudgeToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function setAuthError(message = "") {
  $("[data-auth-error]").textContent = message;
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(JUDGING_THEME_KEY, theme); } catch (_) {}
  const isLight = theme === "light";
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = isLight ? "#f1eadb" : "#080704";
  const button = $("[data-theme-button]");
  if (button) {
    button.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    button.title = isLight ? "Switch to dark mode" : "Switch to light mode";
  }
  const symbol = $("[data-theme-symbol]");
  if (symbol) symbol.textContent = isLight ? "☾" : "☼";
}

function initTheme() {
  setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  $("[data-theme-button]")?.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light"));
}

function selectJudge(code) {
  selectedJudgeCode = code;
  $$("[data-judge-choice]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.judgeChoice === code)));
  $("[data-login-button]").disabled = false;
  setAuthError();
  $("[data-password]").focus();
}

function togglePassword() {
  const input = $("[data-password]");
  const button = $("[data-toggle-password]");
  const reveal = input.type === "password";
  input.type = reveal ? "text" : "password";
  button.textContent = reveal ? "HIDE" : "SHOW";
  button.setAttribute("aria-label", reveal ? "Hide password" : "Show password");
}

async function login(event) {
  event.preventDefault();
  if (!client || !selectedJudgeCode) return;
  const passwordInput = $("[data-password]");
  const password = passwordInput.value;
  if (password.length < 12) {
    setAuthError("Enter your complete private access phrase.");
    return;
  }
  const button = $("[data-login-button]");
  button.disabled = true;
  button.querySelector("span").textContent = "Verifying encrypted session…";
  setAuthError();
  const { data, error } = await client.auth.signInWithPassword({ email: JUDGE_DIRECTORY[selectedJudgeCode].email, password });
  passwordInput.value = "";
  button.querySelector("span").textContent = "Unlock judging console";
  button.disabled = false;
  if (error || !data.session) {
    setAuthError("Access was not accepted. Check your judge profile and private phrase.");
    return;
  }
  await openAuthenticatedConsole(data.session);
}

async function getAuthenticatedProfile() {
  const { data, error } = await client.from("judge_profiles").select("user_id,judge_code,display_name,title,photo_path");
  if (error) throw error;
  judgeProfiles = data || [];
  const ownProfile = judgeProfiles.find(item => item.user_id === session.user.id);
  if (!ownProfile) throw new Error("This account is not assigned to the judging panel.");
  return ownProfile;
}

async function openAuthenticatedConsole(authSession) {
  session = authSession;
  try {
    profile = await getAuthenticatedProfile();
    await fetchScores();
  } catch (error) {
    await client.auth.signOut({ scope: "local" });
    session = null;
    setAuthError(error.message || "Panel authorization could not be verified.");
    return;
  }
  const fallback = JUDGE_DIRECTORY[profile.judge_code] || JUDGE_DIRECTORY.hiran;
  $("[data-profile-name]").textContent = profile.display_name;
  $("[data-profile-title]").textContent = profile.title;
  $("[data-session-judge]").textContent = profile.display_name;
  $("[data-profile-image]").src = profile.photo_path || fallback.photo;
  $("[data-profile-image]").alt = profile.display_name;
  $("[data-auth-screen]").hidden = true;
  $("[data-console]").hidden = false;
  activeTeamId = firstIncompleteTeamId() || JUDGE_TEAMS[0].id;
  renderAll();
  resetIdleTimer();
}

async function fetchScores() {
  const { data, error } = await client.from("judge_scores").select("*").order("team_id");
  if (error) throw error;
  scoreRows = data || [];
}

function ownRecord(teamId = activeTeamId) {
  return scoreRows.find(row => row.judge_id === session?.user?.id && row.team_id === teamId) || null;
}

function firstIncompleteTeamId() {
  return JUDGE_TEAMS.find(team => ownRecord(team.id)?.status !== "submitted")?.id || null;
}

function renderAll() {
  renderTeamNav();
  renderScorecard();
  renderProgress();
  renderRanking();
}

function renderTeamNav() {
  const nav = $("[data-team-nav]");
  nav.innerHTML = JUDGE_TEAMS.map((team, index) => {
    const record = ownRecord(team.id);
    const stateClass = record?.status === "submitted" ? "submitted" : record ? "draft" : "";
    const stateLabel = record?.status === "submitted" ? "Submitted" : record ? "Draft saved" : "Not started";
    return `<button class="judge-team-button ${stateClass} ${team.id === activeTeamId ? "active" : ""}" type="button" data-team-id="${team.id}"><span>${String(index + 1).padStart(2,"0")}</span><span><strong>${escapeHtml(team.name)}</strong><small>${team.id} · ${stateLabel}</small></span><i class="team-mark" aria-hidden="true"></i></button>`;
  }).join("");
  nav.querySelectorAll("[data-team-id]").forEach(button => button.addEventListener("click", () => changeTeam(button.dataset.teamId)));
}

async function changeTeam(teamId) {
  if (teamId === activeTeamId) return;
  await flushPendingSave();
  activeTeamId = teamId;
  renderTeamNav();
  renderScorecard();
}

function renderScorecard() {
  const team = JUDGE_TEAMS.find(item => item.id === activeTeamId);
  const record = ownRecord();
  const locked = record?.status === "submitted";
  const index = JUDGE_TEAMS.findIndex(item => item.id === activeTeamId);
  $("[data-team-kicker]").textContent = `FINALIST ${String(index + 1).padStart(2,"0")} · ${team.id}`;
  $("[data-team-name]").textContent = team.name;
  $("[data-team-university]").textContent = team.university;
  $("[data-criteria-list]").innerHTML = SCORE_CRITERIA.map((criterion, criterionIndex) => {
    const score = record?.[criterion.key];
    const percent = score == null ? 0 : Number(score) / criterion.max * 100;
    return `<label class="criterion-row"><span class="criterion-index">${String(criterionIndex + 1).padStart(2,"0")}</span><span class="criterion-copy"><strong>${escapeHtml(criterion.label)}</strong><small>${escapeHtml(criterion.help)}</small></span><input class="criterion-slider" type="range" min="0" max="${criterion.max}" step="1" value="${score ?? 0}" style="--fill:${percent}%" data-score-range="${criterion.key}" ${locked ? "disabled" : ""} aria-label="${escapeHtml(criterion.label)} score"><span class="criterion-value ${locked ? "locked" : ""}"><input type="number" inputmode="numeric" min="0" max="${criterion.max}" step="1" value="${score ?? ""}" data-score-input="${criterion.key}" ${locked ? "disabled" : ""} aria-label="${escapeHtml(criterion.label)} numeric score"><span>/ ${criterion.max}</span></span></label>`;
  }).join("");
  const notes = $("[data-notes]");
  notes.value = record?.notes || "";
  notes.disabled = locked;
  $("[data-note-count]").textContent = `${notes.value.length} / 3000`;
  $("[data-score-status]").textContent = locked ? "SUBMITTED" : record ? "DRAFT SAVED" : "NEW DRAFT";
  $("[data-score-status]").classList.toggle("submitted", locked);
  $("[data-reopen]").hidden = !locked;
  $("[data-submit-score]").hidden = locked;
  $("[data-completion-copy]").textContent = locked ? `Submitted ${formatDate(record.submitted_at)}.` : "Complete all six criteria to submit.";
  bindScoreInputs();
  updateLiveTotal();
}

function bindScoreInputs() {
  $$("[data-score-input]").forEach(input => input.addEventListener("input", () => {
    const criterion = SCORE_CRITERIA.find(item => item.key === input.dataset.scoreInput);
    if (input.value !== "") input.value = Math.max(0, Math.min(criterion.max, Math.round(Number(input.value))));
    const range = $(`[data-score-range="${criterion.key}"]`);
    range.value = input.value || 0;
    range.style.setProperty("--fill", `${Number(range.value) / criterion.max * 100}%`);
    handleDraftChange();
  }));
  $$("[data-score-range]").forEach(range => range.addEventListener("input", () => {
    const criterion = SCORE_CRITERIA.find(item => item.key === range.dataset.scoreRange);
    const input = $(`[data-score-input="${criterion.key}"]`);
    input.value = range.value;
    range.style.setProperty("--fill", `${Number(range.value) / criterion.max * 100}%`);
    handleDraftChange();
  }));
  $("[data-notes]").addEventListener("input", event => {
    $("[data-note-count]").textContent = `${event.target.value.length} / 3000`;
    handleDraftChange();
  });
}

function currentFormData() {
  const data = {};
  SCORE_CRITERIA.forEach(criterion => {
    const value = $(`[data-score-input="${criterion.key}"]`).value;
    data[criterion.key] = value === "" ? null : Number(value);
  });
  data.notes = $("[data-notes]").value.trim();
  return data;
}

function currentTotal(data = currentFormData()) {
  return SCORE_CRITERIA.reduce((total, criterion) => total + Number(data[criterion.key] || 0), 0);
}

function isComplete(data = currentFormData()) {
  return SCORE_CRITERIA.every(criterion => data[criterion.key] != null && Number.isFinite(data[criterion.key]));
}

function updateLiveTotal() {
  const data = currentFormData();
  $("[data-live-total]").textContent = currentTotal(data);
  const complete = isComplete(data);
  const locked = ownRecord()?.status === "submitted";
  $("[data-submit-score]").disabled = !complete || locked || saveInFlight;
  if (!locked) $("[data-completion-copy]").textContent = complete ? "Scorecard complete and ready to submit." : `${SCORE_CRITERIA.filter(item => data[item.key] == null).length} criteria remaining.`;
}

function handleDraftChange() {
  updateLiveTotal();
  setAutosaveState("saving", "SAVING…");
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveDraft(), 620);
}

function setAutosaveState(className, label) {
  const node = $("[data-autosave-state]");
  node.classList.remove("saving", "error");
  if (className) node.classList.add(className);
  node.innerHTML = `<i></i> ${label}`;
  const sync = $("[data-sync-state]");
  if (sync) sync.innerHTML = `<i></i> ${className === "error" ? "SYNC INTERRUPTED" : className === "saving" ? "ENCRYPTED SYNC" : "SECURE SESSION"}`;
}

async function saveDraft({ quiet = false } = {}) {
  clearTimeout(saveTimer);
  saveTimer = null;
  if (!session || ownRecord()?.status === "submitted" || saveInFlight) return;
  saveInFlight = true;
  updateLiveTotal();
  const teamId = activeTeamId;
  const form = currentFormData();
  setAutosaveState("saving", "SAVING…");
  const payload = { judge_id: session.user.id, team_id: teamId, ...form, status: "draft", submitted_at: null };
  const { data, error } = await client.from("judge_scores").upsert(payload, { onConflict: "judge_id,team_id" }).select().single();
  saveInFlight = false;
  if (error) {
    setAutosaveState("error", "NOT SAVED");
    if (!quiet) showJudgeToast("Secure save failed. Check your connection before continuing.");
    updateLiveTotal();
    return false;
  }
  const rowIndex = scoreRows.findIndex(row => row.judge_id === data.judge_id && row.team_id === data.team_id);
  if (rowIndex >= 0) scoreRows[rowIndex] = data; else scoreRows.push(data);
  setAutosaveState("", "SAVED");
  renderTeamNav();
  renderProgress();
  updateLiveTotal();
  return true;
}

async function flushPendingSave() {
  if (!saveTimer) return;
  clearTimeout(saveTimer);
  saveTimer = null;
  await saveDraft({ quiet: true });
}

function openSubmitModal() {
  if (!isComplete()) return;
  $("[data-submit-team]").textContent = JUDGE_TEAMS.find(team => team.id === activeTeamId).name;
  $("[data-submit-total]").textContent = currentTotal();
  openModal($("[data-submit-modal]"));
  setTimeout(() => $("[data-confirm-submit]").focus(), 20);
}

async function confirmSubmission() {
  const saved = await saveDraft();
  if (saved === false || !isComplete()) return;
  const { data, error } = await client.from("judge_scores").update({ status: "submitted", submitted_at: new Date().toISOString() }).eq("judge_id", session.user.id).eq("team_id", activeTeamId).select().single();
  if (error) {
    showJudgeToast("Submission could not be sealed. Your draft remains saved.");
    return;
  }
  const rowIndex = scoreRows.findIndex(row => row.judge_id === data.judge_id && row.team_id === data.team_id);
  scoreRows[rowIndex] = data;
  closeModal($("[data-submit-modal]"));
  showJudgeToast(`${JUDGE_TEAMS.find(team => team.id === activeTeamId).name} scorecard submitted.`);
  renderAll();
}

async function reopenScorecard() {
  const { data, error } = await client.from("judge_scores").update({ status: "draft", submitted_at: null }).eq("judge_id", session.user.id).eq("team_id", activeTeamId).select().single();
  if (error) {
    showJudgeToast("This scorecard could not be reopened.");
    return;
  }
  scoreRows[scoreRows.findIndex(row => row.judge_id === data.judge_id && row.team_id === data.team_id)] = data;
  showJudgeToast("Scorecard reopened. Changes will autosave.");
  renderAll();
}

function renderProgress() {
  const mySubmitted = scoreRows.filter(row => row.judge_id === session.user.id && row.status === "submitted").length;
  const panelSubmitted = scoreRows.filter(row => row.status === "submitted").length;
  $("[data-my-progress]").textContent = `${mySubmitted} / ${JUDGE_TEAMS.length}`;
  $("[data-my-progress-bar]").style.width = `${mySubmitted / JUDGE_TEAMS.length * 100}%`;
  $("[data-my-progress-note]").textContent = mySubmitted === JUDGE_TEAMS.length ? "Your panel seat is complete" : `${JUDGE_TEAMS.length - mySubmitted} scorecards remaining`;
  $("[data-panel-progress]").textContent = `${panelSubmitted} / ${JUDGE_TEAMS.length * 2}`;
  $("[data-panel-progress-bar]").style.width = `${panelSubmitted / (JUDGE_TEAMS.length * 2) * 100}%`;
}

function buildRanking() {
  const submitted = scoreRows.filter(row => row.status === "submitted");
  const ranking = JUDGE_TEAMS.map(team => {
    const entries = submitted.filter(row => row.team_id === team.id);
    const average = key => entries.length ? entries.reduce((sum, row) => sum + Number(row[key] || 0), 0) / entries.length : null;
    return { ...team, entries, count: entries.length, average: average("total_score"), usability: average("usability_score"), technical: average("technical_score"), visual: average("visual_score") };
  }).sort((a,b) => b.count - a.count || (b.average ?? -1) - (a.average ?? -1) || (b.usability ?? -1) - (a.usability ?? -1) || (b.technical ?? -1) - (a.technical ?? -1) || (b.visual ?? -1) - (a.visual ?? -1) || a.id.localeCompare(b.id));
  ranking.forEach((team,index) => team.rank = index + 1);
  return { ranking, complete: submitted.length === JUDGE_TEAMS.length * 2, submittedCount: submitted.length };
}

function renderRanking() {
  const { ranking, complete, submittedCount } = buildRanking();
  const leader = ranking.find(team => team.count > 0);
  $("[data-ranking-state]").textContent = complete ? "All scorecards sealed. Official result calculated." : `${submittedCount} of ${JUDGE_TEAMS.length * 2} scorecards submitted.`;
  $("[data-leader-sigil] > span").textContent = complete ? "OFFICIAL WINNER" : "PROVISIONAL LEADER";
  $("[data-leader-name]").textContent = leader?.name || "—";
  $("[data-leader-score]").textContent = leader ? formatScore(leader.average) : "0.00";
  $("[data-ranking-list]").innerHTML = ranking.map(team => `<li><span>${String(team.rank).padStart(2,"0")}</span><div><strong>${escapeHtml(team.name)}</strong><small>${team.count}/2 JUDGES SUBMITTED</small></div><b>${team.average == null ? "—" : formatScore(team.average)}</b></li>`).join("");
  renderReport();
}

function renderReport() {
  const { ranking, complete } = buildRanking();
  const leader = ranking.find(team => team.count > 0);
  const winner = $("[data-report-winner]");
  winner.querySelector("span").textContent = complete ? "OFFICIAL WINNER" : "PROVISIONAL LEADER";
  winner.querySelector("strong").textContent = leader?.name || "Awaiting scores";
  winner.querySelector("small").textContent = leader ? `${formatScore(leader.average)} / 100` : "0.00 / 100";
  $("[data-report-subtitle]").textContent = complete ? "All twenty authenticated scorecards are submitted." : "Live consolidated results; rankings remain provisional until all scorecards are submitted.";
  $("[data-report-rows]").innerHTML = ranking.map(team => {
    const hiran = scoreRows.find(row => row.team_id === team.id && row.status === "submitted" && profileCodeForRow(row) === "hiran");
    const pasindu = scoreRows.find(row => row.team_id === team.id && row.status === "submitted" && profileCodeForRow(row) === "pasindu");
    return `<tr><td>#${team.rank}</td><td>${escapeHtml(team.id)} · ${escapeHtml(team.name)}</td><td>${formatScore(hiran?.total_score)}</td><td>${formatScore(pasindu?.total_score)}</td><td>${formatScore(team.average)}</td><td>${team.count} / 2</td></tr>`;
  }).join("");
  const submitted = scoreRows.filter(row => row.status === "submitted");
  $("[data-criteria-report]").innerHTML = SCORE_CRITERIA.map(criterion => {
    const average = submitted.length ? submitted.reduce((sum,row) => sum + Number(row[criterion.key] || 0),0) / submitted.length : null;
    return `<article><span>${escapeHtml(criterion.label)}</span><strong>${average == null ? "—" : average.toFixed(2)} <small>/ ${criterion.max}</small></strong></article>`;
  }).join("");
}

function profileCodeForRow(row) {
  return judgeProfiles.find(item => item.user_id === row.judge_id)?.judge_code || "unknown";
}

function exportReportCsv() {
  const { ranking, complete } = buildRanking();
  const headers = ["Rank","Team ID","Team Name","University","Hiran Total","Pasindu Total","Panel Average","Submitted Judges",...SCORE_CRITERIA.map(item => `${item.label} Average`),"Hiran Notes","Pasindu Notes","Result Status"];
  const rows = [headers];
  ranking.forEach(team => {
    const entries = team.entries;
    const hiran = entries.find(row => profileCodeForRow(row) === "hiran");
    const pasindu = entries.find(row => profileCodeForRow(row) === "pasindu");
    const criterionAverages = SCORE_CRITERIA.map(criterion => entries.length ? (entries.reduce((sum,row) => sum + Number(row[criterion.key] || 0),0) / entries.length).toFixed(2) : "");
    rows.push([team.rank,team.id,team.name,team.university,hiran?.total_score ?? "",pasindu?.total_score ?? "",team.average == null ? "" : team.average.toFixed(2),team.count,...criterionAverages,hiran?.notes || "",pasindu?.notes || "",complete && team.rank === 1 ? "WINNER" : complete ? "FINAL" : "PROVISIONAL"]);
  });
  const csv = rows.map(row => row.map(value => `"${String(value ?? "").replaceAll('"','""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob(["\ufeff",csv],{type:"text/csv;charset=utf-8"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = `Cre8x_3.0_Judging_Report_${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showJudgeToast("Encrypted panel data exported to this device.");
}

function openModal(modal) {
  modal.hidden = false;
  modal.inert = false;
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.setAttribute("aria-hidden","true");
  modal.inert = true;
  modal.hidden = true;
  document.body.style.overflow = "";
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}).format(new Date(value));
}

async function signOut(message = "Secure session ended.") {
  clearTimeout(idleTimer);
  await flushPendingSave();
  await client?.auth.signOut({ scope: "local" });
  session = null; profile = null; judgeProfiles = []; scoreRows = [];
  $("[data-console]").hidden = true;
  $("[data-auth-screen]").hidden = false;
  selectedJudgeCode = "";
  $$("[data-judge-choice]").forEach(button => button.setAttribute("aria-pressed","false"));
  $("[data-login-button]").disabled = true;
  setAuthError(message);
}

function resetIdleTimer() {
  if (!session) return;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => signOut("Session closed after 30 minutes of inactivity."), IDLE_LIMIT_MS);
}

function stepTeam(direction) {
  const index = JUDGE_TEAMS.findIndex(team => team.id === activeTeamId);
  const nextIndex = (index + direction + JUDGE_TEAMS.length) % JUDGE_TEAMS.length;
  changeTeam(JUDGE_TEAMS[nextIndex].id);
}

function bindEvents() {
  $$("[data-judge-choice]").forEach(button => button.addEventListener("click", () => selectJudge(button.dataset.judgeChoice)));
  $("[data-toggle-password]").addEventListener("click", togglePassword);
  $("[data-login-form]").addEventListener("submit", login);
  $("[data-signout]").addEventListener("click", () => signOut());
  $("[data-submit-score]").addEventListener("click", openSubmitModal);
  $("[data-cancel-submit]").addEventListener("click", () => closeModal($("[data-submit-modal]")));
  $("[data-confirm-submit]").addEventListener("click", confirmSubmission);
  $("[data-reopen]").addEventListener("click", reopenScorecard);
  $("[data-prev-team]").addEventListener("click", () => stepTeam(-1));
  $("[data-next-team]").addEventListener("click", () => stepTeam(1));
  $("[data-open-report]").addEventListener("click", () => { renderReport(); openModal($("[data-report-modal]")); setTimeout(() => $("[data-close-report]").focus(),20); });
  $("[data-close-report]").addEventListener("click", () => closeModal($("[data-report-modal]")));
  $$("[data-export-report]").forEach(button => button.addEventListener("click", exportReportCsv));
  $("[data-print-report]").addEventListener("click", () => window.print());
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (!$("[data-submit-modal]").hidden) closeModal($("[data-submit-modal]"));
    if (!$("[data-report-modal]").hidden) closeModal($("[data-report-modal]"));
  });
  ["pointerdown","keydown","touchstart"].forEach(type => document.addEventListener(type, resetIdleTimer,{passive:true}));
}

async function initJudgePortal() {
  initTheme();
  bindEvents();
  if (!client) {
    setAuthError("Secure judging service could not load. Check the connection and refresh.");
    $$("[data-judge-choice]").forEach(button => button.disabled = true);
    return;
  }
  const { data } = await client.auth.getSession();
  if (data.session) await openAuthenticatedConsole(data.session);
}

document.addEventListener("DOMContentLoaded", initJudgePortal);
