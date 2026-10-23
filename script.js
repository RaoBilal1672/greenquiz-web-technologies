const SECONDS_PER_QUESTION = 30;


let settings = {
  name: "",
  topic: "ALL",
  topicLabel: "All Topics (Mixed)",
  count: 5,
  pass: 50,
  totalTime: 150
};
let questions = [];     
let current = 0;        
let timeLeft = 0;     
let timerId = null;    
let finished = false;   
let result = {};        


const screens = {
  setup: document.getElementById("setupSection"),
  instructions: document.getElementById("instructionsSection"),
  quiz: document.getElementById("quizSection"),
  result: document.getElementById("resultSection")
};

const counterEl = document.getElementById("counter");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("questionText");
const optionsEl = document.getElementById("options");
const navigatorEl = document.getElementById("navigator");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const countSelect = document.getElementById("countSelect");
const timeInput = document.getElementById("timeInput");


function showScreen(name) {
  Object.keys(screens).forEach(function (key) {
    screens[key].classList.toggle("d-none", key !== name);
  });
  window.scrollTo(0, 0);
}


function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return min + ":" + sec;
}

function formatDuration(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return min + " min " + sec + " sec";
}

function getPool(topic) {
  if (topic === "ALL") {
    return Object.values(QUESTION_BANK).flat();
  }
  return QUESTION_BANK[topic];
}

function statusOf(item) {
  if (item.selected === null) return "";
  return item.selected === item.answer ? "correct" : "wrong";
}




function updateTimeField() {
  const minutes = parseInt(countSelect.value) * SECONDS_PER_QUESTION / 60;
  timeInput.value = minutes + " minutes";
}
countSelect.addEventListener("change", updateTimeField);
updateTimeField();


document.getElementById("setupForm").addEventListener("submit", function (event) {
  event.preventDefault();  

  const topic = document.getElementById("topicSelect").value;
  const wanted = parseInt(countSelect.value);
  const available = getPool(topic).length;

  settings.name = document.getElementById("nameInput").value.trim();
  settings.topic = topic;
  settings.topicLabel = (topic === "ALL") ? "All Topics (Mixed)" : topic;
  settings.pass = parseInt(document.getElementById("passSelect").value);


  settings.count = Math.min(wanted, available);
  settings.totalTime = settings.count * SECONDS_PER_QUESTION;

  const notice = document.getElementById("noticeBox");
  if (settings.count < wanted) {
    notice.textContent = "Only " + available + " questions are available for this topic, so the quiz will have " + available + " questions.";
    notice.classList.remove("d-none");
  } else {
    notice.classList.add("d-none");
  }

  document.getElementById("infoTopic").textContent = (topic === "ALL") ? "All Topics" : topic;
  document.getElementById("infoCount").textContent = settings.count;
  document.getElementById("infoTime").textContent = formatTime(settings.totalTime);
  document.getElementById("infoPass").textContent = settings.pass + "%";

  showScreen("instructions");
});

document.getElementById("backBtn").addEventListener("click", function () {
  showScreen("setup");
});

function startQuiz() {
  // Pick random questions and shuffle their options too
  questions = shuffle(getPool(settings.topic)).slice(0, settings.count).map(function (item) {
    const correctText = item.options[item.answer];
    const shuffled = shuffle(item.options);
    return {
      q: item.q,
      options: shuffled,
      answer: shuffled.indexOf(correctText),  
    };
  });

  current = 0;
  finished = false;
  timeLeft = settings.totalTime;

  buildProgressBar();
  showScreen("quiz");
  showQuestion();
  startTimer();
}

document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("retakeBtn").addEventListener("click", startQuiz);   // same settings
document.getElementById("newQuizBtn").addEventListener("click", function () {
  showScreen("setup");
});


function startTimer() {
  clearInterval(timerId);   
  updateTimerText();
  timerId = setInterval(function () {
    timeLeft--;
    updateTimerText();
    if (timeLeft <= 0) {
      finishQuiz(true);     
    }
  }, 1000);
}

function updateTimerText() {
  timerEl.textContent = "⏱ " + formatTime(timeLeft);
  timerEl.classList.toggle("low", timeLeft <= 30);   
}

// ---------- 8. SEGMENTED PROGRESS BAR ----------
function buildProgressBar() {
  progressEl.innerHTML = "";
  questions.forEach(function () {
    const seg = document.createElement("div");
    seg.className = "segment";
    progressEl.appendChild(seg);
  });
}

function updateProgressBar() {
  const segs = progressEl.children;
  questions.forEach(function (item, i) {
    segs[i].className = "segment";
    if (statusOf(item)) segs[i].classList.add(statusOf(item));
    if (i === current) segs[i].classList.add("current");
  });
}

// ---------- 9. NUMBERED NAVIGATION ----------
function updateNavigator() {
  navigatorEl.innerHTML = "";
  questions.forEach(function (item, i) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "qnum";
    btn.textContent = i + 1;
    if (statusOf(item)) btn.classList.add(statusOf(item));
    if (i === current) btn.classList.add("current");
    btn.addEventListener("click", function () {
      current = i;
      showQuestion();
    });
    navigatorEl.appendChild(btn);
  });
}

// ---------- 10. SHOW A QUESTION ----------
function showQuestion() {
  const item = questions[current];

  counterEl.textContent = "Question " + (current + 1) + " of " + questions.length;
  questionEl.textContent = item.q;
  optionsEl.innerHTML = "";

  // Create one button for each of the 4 options
  item.options.forEach(function (text, index) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.textContent = String.fromCharCode(65 + index) + ".  " + text;   // A. B. C. D.

    // If the question is answered: correct option = green, wrong choice = red
    if (item.selected !== null) {
      if (index === item.answer) btn.classList.add("correct");
      else if (index === item.selected) btn.classList.add("wrong");
    }

    btn.addEventListener("click", function () {
      item.selected = index;   // save (or change) the answer
      showQuestion();          // redraw with the new colors
    });
    optionsEl.appendChild(btn);
  });

  prevBtn.disabled = (current === 0);
  nextBtn.disabled = (current === questions.length - 1);

  updateProgressBar();
  updateNavigator();
}

// ---------- 11. PREVIOUS / NEXT / SUBMIT ----------
prevBtn.addEventListener("click", function () {
  if (current > 0) { current--; showQuestion(); }
});

nextBtn.addEventListener("click", function () {
  if (current < questions.length - 1) { current++; showQuestion(); }
});

document.getElementById("submitBtn").addEventListener("click", function () {
  const unanswered = questions.filter(function (item) { return item.selected === null; }).length;
  // Ask for confirmation only if some questions are still unanswered
  if (unanswered > 0 && !confirm("You have " + unanswered + " unanswered question(s). Submit anyway?")) {
    return;
  }
  finishQuiz(false);
});

// ---------- 12. FINISH THE QUIZ ----------
function finishQuiz(timeUp) {
  if (finished) return;     // avoid submitting twice
  finished = true;
  clearInterval(timerId);   // stop the timer

  let correct = 0, wrong = 0, skipped = 0;
  questions.forEach(function (item) {
    if (item.selected === null) skipped++;
    else if (item.selected === item.answer) correct++;
    else wrong++;
  });

  const percent = Math.round((correct / questions.length) * 100);
  result = {
    correct: correct,
    wrong: wrong,
    skipped: skipped,
    percent: percent,
    passed: percent >= settings.pass,
    timeTaken: timeUp ? settings.totalTime : settings.totalTime - timeLeft,
    finishedAt: new Date()
  };

  // Fill the result screen
  document.getElementById("scoreText").textContent = correct + " / " + questions.length;
  document.getElementById("percentText").textContent = percent + "%";
  document.getElementById("timeTakenText").textContent = formatTime(result.timeTaken);
  document.getElementById("correctCount").textContent = correct;
  document.getElementById("wrongCount").textContent = wrong;
  document.getElementById("skippedCount").textContent = skipped;

  const badge = document.getElementById("passBadge");
  badge.textContent = result.passed ? "PASS" : "FAIL";
  badge.className = "pass-badge " + (result.passed ? "pass" : "fail");

  // Friendly heading
  const who = settings.name ? settings.name + ", " : "";
  let message = timeUp ? "Time is up! " : "";
  message += result.passed ? who + "well done!" : who + "keep practicing!";
  document.getElementById("resultMessage").textContent = message.charAt(0).toUpperCase() + message.slice(1);

  buildReview();
  showScreen("result");
}

// ---------- 13. ANSWER REVIEW TABLE (result screen) ----------
function buildReview() {
  const body = document.getElementById("reviewBody");
  body.innerHTML = "";

  questions.forEach(function (item, i) {
    const status = statusOf(item) || "skipped";
    const statusText = { correct: "Correct", wrong: "Incorrect", skipped: "Unanswered" }[status];
    const selectedText = item.selected === null ? "Not answered" : item.options[item.selected];

    const row = document.createElement("tr");

    // Helper: add one cell to the row
    function addCell(label, text, cssClass) {
      const td = document.createElement("td");
      td.setAttribute("data-label", label);   // used for the mobile layout
      td.textContent = text;
      if (cssClass) td.className = cssClass;
      row.appendChild(td);
    }

    addCell("Q#", i + 1, "");
    addCell("Question", item.q, "");
    addCell("Your answer", selectedText, status === "skipped" ? "cell-skipped" : "cell-" + status);
    addCell("Correct answer", item.options[item.answer], "cell-correct");
    addCell("Result", statusText, "cell-" + status);

    body.appendChild(row);
  });
}

// ---------- 14. DOWNLOAD QUIZ REPORT (PDF with tables) ----------
// Uses jsPDF + the jsPDF-AutoTable plugin (both loaded in index.html)
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });   // A4 page

  if (typeof doc.autoTable !== "function") {
    alert("The PDF table library could not be loaded. Please check your internet connection.");
    return;
  }

  // Colors (RGB)
  const navy = [23, 54, 93];
  const green = [21, 128, 61];
  const red = [185, 28, 28];
  const amber = [217, 119, 6];
  const grey = [100, 116, 139];
  const lightGrey = [241, 245, 249];
  const border = [203, 213, 225];
  const dark = [15, 23, 42];

  // ----- Header band -----
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, 210, 36, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("QUIZMASTER", 15, 17);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("WEB TECHNOLOGIES — QUIZ REPORT", 15, 27);

  // ----- Result summary boxes -----
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Quiz Result Summary", 15, 49);

  const boxes = [
    { label: "TOTAL SCORE", value: result.correct + " / " + questions.length, color: navy },
    { label: "PERCENTAGE", value: result.percent + "%", color: navy },
    { label: "CORRECT", value: String(result.correct), color: green },
    { label: "INCORRECT / UNANSWERED", value: result.wrong + " / " + result.skipped, color: red }
  ];
  boxes.forEach(function (box, i) {
    const x = 15 + i * 46;   // 4 boxes, 42 mm wide, 4 mm gap
    doc.setFillColor(lightGrey[0], lightGrey[1], lightGrey[2]);
    doc.setDrawColor(border[0], border[1], border[2]);
    doc.roundedRect(x, 54, 42, 26, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(grey[0], grey[1], grey[2]);
    doc.text(box.label, x + 21, 61, { align: "center" });
    doc.setFontSize(18);
    doc.setTextColor(box.color[0], box.color[1], box.color[2]);
    doc.text(box.value, x + 21, 73, { align: "center" });
  });

  // ----- Quiz information table -----
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Quiz Information", 15, 92);

  doc.autoTable({
    startY: 96,
    margin: { left: 15, right: 15 },
    theme: "grid",
    body: [
      ["Student", settings.name || "Not provided"],
      ["Topic", settings.topicLabel],
      ["Date", result.finishedAt.toLocaleString()],
      ["Time taken", formatDuration(result.timeTaken) + "  (limit " + formatDuration(settings.totalTime) + ")"],
      ["Result", (result.passed ? "PASS" : "FAIL") + "  (passing percentage: " + settings.pass + "%)"]
    ],
    styles: { fontSize: 10, cellPadding: 2.5, lineColor: border, lineWidth: 0.2, textColor: dark },
    columnStyles: {
      0: { fontStyle: "bold", fillColor: lightGrey, cellWidth: 40 },
      1: { cellWidth: 140 }
    },
    // Color the PASS / FAIL text
    didParseCell: function (data) {
      if (data.section === "body" && data.row.index === 4 && data.column.index === 1) {
        data.cell.styles.textColor = result.passed ? green : red;
        data.cell.styles.fontStyle = "bold";
      }
    }
  });

  // ----- Answer review table -----
  let y = doc.lastAutoTable.finalY + 12;
  if (y > 250) {            // not enough space for the heading + some rows
    doc.addPage();
    y = 22;
  }
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Answer Review", 15, y);

  const rows = questions.map(function (item, i) {
    const status = statusOf(item) || "skipped";
    return [
      String(i + 1),
      item.q,
      item.selected === null ? "Not answered" : item.options[item.selected],
      item.options[item.answer],
      { correct: "Correct", wrong: "Incorrect", skipped: "Unanswered" }[status]
    ];
  });

  doc.autoTable({
    startY: y + 4,
    margin: { top: 20, bottom: 22, left: 15, right: 15 },
    theme: "grid",
    head: [["Q#", "Question", "Selected answer", "Correct answer", "Result"]],
    body: rows,
    showHead: "everyPage",          // repeat the header on every page
    rowPageBreak: "avoid",          // do not cut a row in half between pages
    styles: { fontSize: 9, cellPadding: 2.5, overflow: "linebreak", valign: "middle", lineColor: border, lineWidth: 0.2, textColor: dark },
    headStyles: { fillColor: navy, textColor: [255, 255, 255], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {                 // total width = 180 mm (A4 minus margins)
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 66 },
      2: { cellWidth: 40 },
      3: { cellWidth: 40 },
      4: { cellWidth: 24, halign: "center" }
    },
    // Color the "selected answer", "correct answer" and "result" cells
    didParseCell: function (data) {
      if (data.section !== "body") return;
      const status = data.row.raw[4];
      if (data.column.index === 2) {
        data.cell.styles.textColor = status === "Correct" ? green : (status === "Incorrect" ? red : amber);
      }
      if (data.column.index === 3) {
        data.cell.styles.textColor = green;
      }
      if (data.column.index === 4) {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.textColor = status === "Correct" ? green : (status === "Incorrect" ? red : amber);
      }
    }
  });

  // ----- Footer + page numbers on every page -----
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setDrawColor(border[0], border[1], border[2]);
    doc.line(15, 285, 195, 285);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(grey[0], grey[1], grey[2]);
    doc.text("QuizMaster | Web Technologies", 15, 291);
    doc.text("Page " + i + " of " + pages, 195, 291, { align: "right" });
  }

  doc.save("QuizMaster_Report.pdf");
}

document.getElementById("pdfBtn").addEventListener("click", downloadPDF);

// ---------- 15. DARK / LIGHT MODE ----------
// Note: the choice is not stored anywhere, the page starts in light mode.
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
  const root = document.documentElement;
  const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-bs-theme", next);
  themeBtn.textContent = (next === "dark") ? "☀️ Light" : "🌙 Dark";
});
