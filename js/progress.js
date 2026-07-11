// Progress Stats Controller
document.addEventListener('DOMContentLoaded', async () => {
  const db = await App.getDatabase();
  if (!db || db.length === 0) return;

  const controller = new ProgressController(db);
  controller.init();
});

class ProgressController {
  constructor(db) {
    this.db = db;

    // DOM Elements
    this.streakVal = document.getElementById('prog-streak');
    this.learnedVal = document.getElementById('prog-learned');
    this.topicsVal = document.getElementById('prog-topics');
    this.quizCountVal = document.getElementById('prog-quiz-count');
    this.avgScoreVal = document.getElementById('prog-avg-score');
    this.timeVal = document.getElementById('prog-time');
    
    this.btnReset = document.getElementById('btn-reset-data');
    this.lineChartCanvas = document.getElementById('line-chart-quiz');
    this.chartEmptyState = document.getElementById('chart-quiz-empty');
  }

  init() {
    this.renderStats();
    this.drawDifficultyChart();
    this.drawQuizHistoryChart();

    // Data reset binding
    this.btnReset.addEventListener('click', () => {
      const confirmReset = confirm("Bạn có chắc chắn muốn xóa toàn bộ tiến trình học tập? Tất cả từ đã học, điểm số, chuỗi ngày học sẽ bị mất vĩnh viễn và không thể khôi phục.");
      if (confirmReset) {
        StorageManager.clearAllData();
        App.showToast("Đã đặt lại toàn bộ tiến độ!", "success");
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      }
    });

    // Handle canvas redrawing on theme toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        // Delay slightly for CSS variable transition
        setTimeout(() => {
          this.drawDifficultyChart();
          this.drawQuizHistoryChart();
        }, 200);
      });
    }
  }

  renderStats() {
    const learnedList = StorageManager.getLearnedWords();
    const completedTopics = StorageManager.getCompletedTopics();
    const quizHistory = StorageManager.getQuizHistory();
    const totalWords = this.db.reduce((sum, t) => sum + t.words.length, 0);
    const totalTopics = this.db.length;

    // 1. Streak
    this.streakVal.textContent = StorageManager.getStreak();

    // 2. Learned words
    this.learnedVal.textContent = `${learnedList.length}/${totalWords}`;

    // 3. Completed topics
    this.topicsVal.textContent = `${completedTopics.length}/${totalTopics}`;

    // 4. Quiz count
    this.quizCountVal.textContent = quizHistory.length;

    // 5. Average score
    let avgScore = 0;
    if (quizHistory.length > 0) {
      const sum = quizHistory.reduce((acc, q) => acc + q.percentage, 0);
      avgScore = Math.round(sum / quizHistory.length);
    }
    this.avgScoreVal.textContent = `${avgScore}%`;

    // 6. Active study time formatted (Minutes)
    const minutes = Math.round(StorageManager.getTotalStudyTime() / 60);
    this.timeVal.textContent = minutes > 0 ? `${minutes}m` : '0m';
  }

  // Get active text colors from DOM computed variables
  getThemeColors() {
    const style = getComputedStyle(document.body);
    return {
      textMain: style.getPropertyValue('--text-main').trim() || '#0F172A',
      textMuted: style.getPropertyValue('--text-muted').trim() || '#64748B',
      borderColor: style.getPropertyValue('--border-color').trim() || '#E2E8F0',
      primary: style.getPropertyValue('--primary').trim() || '#2563EB',
      secondary: style.getPropertyValue('--secondary').trim() || '#0EA5E9',
      success: style.getPropertyValue('--success').trim() || '#22C55E',
      danger: style.getPropertyValue('--danger').trim() || '#EF4444',
      warning: style.getPropertyValue('--warning').trim() || '#F59E0B'
    };
  }

  // 1. Draw Difficulty Bar Chart
  drawDifficultyChart() {
    const canvas = document.getElementById('bar-chart-difficulty');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const colors = this.getThemeColors();

    // Reset dimensions for clean High DPI display
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    // Data grouping
    const learnedList = StorageManager.getLearnedWords();
    const categories = {
      easy: { total: 0, learned: 0, color: colors.success },
      medium: { total: 0, learned: 0, color: colors.warning },
      hard: { total: 0, learned: 0, color: colors.danger }
    };

    // Aggregate
    this.db.forEach(t => {
      t.words.forEach(word => {
        const diff = word.difficulty || 'easy';
        if (categories[diff]) {
          categories[diff].total++;
          if (learnedList.includes(word.word)) {
            categories[diff].learned++;
          }
        }
      });
    });

    const labels = ["Dễ (Easy)", "Vừa (Medium)", "Khó (Hard)"];
    const keys = ["easy", "medium", "hard"];

    // Clear Canvas
    ctx.clearRect(0, 0, w, h);

    // Draw Bar settings
    const marginL = 90;
    const marginR = 30;
    const marginT = 20;
    const marginB = 30;
    const chartW = w - marginL - marginR;
    const chartH = h - marginT - marginB;

    const barHeight = 22;
    const barGap = 20;

    // Draw Bars
    keys.forEach((key, i) => {
      const data = categories[key];
      const y = marginT + i * (barHeight + barGap);

      // Label
      ctx.fillStyle = colors.textMain;
      ctx.font = "bold 12px Poppins, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(labels[i], 10, y + barHeight / 2);

      // Background bar track
      ctx.fillStyle = colors.borderColor;
      ctx.beginPath();
      ctx.roundRect(marginL, y, chartW, barHeight, 6);
      ctx.fill();

      // Progress filled bar
      const progressPercent = data.total > 0 ? (data.learned / data.total) : 0;
      const fillWidth = Math.max(chartW * progressPercent, 0);

      if (fillWidth > 0) {
        ctx.fillStyle = data.color;
        ctx.beginPath();
        ctx.roundRect(marginL, y, fillWidth, barHeight, 6);
        ctx.fill();
      }

      // Percentage label text on right
      ctx.fillStyle = colors.textMuted;
      ctx.font = "bold 11px Poppins, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`${data.learned}/${data.total}`, w - 10, y + barHeight / 2);
    });
  }

  // 2. Draw Line Chart of Quiz Scores
  drawQuizHistoryChart() {
    if (!this.lineChartCanvas) return;
    const ctx = this.lineChartCanvas.getContext('2d');
    const colors = this.getThemeColors();

    const quizHistory = StorageManager.getQuizHistory();

    // Show empty placeholder if no attempts
    if (quizHistory.length === 0) {
      this.lineChartCanvas.classList.add('d-none');
      this.chartEmptyState.classList.remove('d-none');
      return;
    }

    this.chartEmptyState.classList.add('d-none');
    this.lineChartCanvas.classList.remove('d-none');

    // Reset dimensions
    const canvas = this.lineChartCanvas;
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    // Filter last 10 quiz attempts
    const dataPoints = quizHistory.slice(-10);

    // Chart margins
    const marginL = 40;
    const marginR = 20;
    const marginT = 20;
    const marginB = 30;
    const chartW = w - marginL - marginR;
    const chartH = h - marginT - marginB;

    ctx.clearRect(0, 0, w, h);

    // Draw horizontal grid lines (Y-axis: 0%, 25%, 50%, 75%, 100%)
    ctx.strokeStyle = colors.borderColor;
    ctx.lineWidth = 1;
    ctx.fillStyle = colors.textMuted;
    ctx.font = "10px Poppins, sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (let i = 0; i <= 4; i++) {
      const yVal = 100 - i * 25;
      const y = marginT + (i / 4) * chartH;
      
      // Grid line
      ctx.beginPath();
      ctx.moveTo(marginL, y);
      ctx.lineTo(w - marginR, y);
      ctx.stroke();

      // Label text
      ctx.fillText(`${yVal}%`, marginL - 8, y);
    }

    // Map point coordinates
    const points = [];
    const count = dataPoints.length;

    dataPoints.forEach((dp, idx) => {
      // X coordinate: divide chart width evenly
      const x = count > 1 
        ? marginL + (idx / (count - 1)) * chartW 
        : marginL + chartW / 2;
      
      // Y coordinate: inverted scale (0% is bottom of chart)
      const y = marginT + (1 - dp.percentage / 100) * chartH;
      points.push({ x, y, val: dp.percentage });
    });

    // 1. Draw area gradient under the curve line
    if (points.length > 0) {
      const grad = ctx.createLinearGradient(0, marginT, 0, h - marginB);
      grad.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
      grad.addColorStop(1, 'rgba(37, 99, 235, 0.00)');

      ctx.beginPath();
      ctx.moveTo(points[0].x, h - marginB);
      points.forEach(pt => {
        ctx.lineTo(pt.x, pt.y);
      });
      ctx.lineTo(points[points.length - 1].x, h - marginB);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // 2. Draw actual connecting line path
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    // 3. Draw circular point markers
    points.forEach((pt, idx) => {
      ctx.fillStyle = colors.primary;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2.5, 0, 2 * Math.PI);
      ctx.fill();

      // Tooltip percentage text above point
      ctx.fillStyle = colors.textMain;
      ctx.font = "bold 10px Poppins, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${pt.val}%`, pt.x, pt.y - 10);

      // X-Axis labels below points (Attempt counter index)
      ctx.fillStyle = colors.textMuted;
      ctx.font = "9px Poppins, sans-serif";
      ctx.fillText(`#${idx + 1}`, pt.x, h - marginB + 14);
    });
  }
}
