
// mcdm-evaluation.js

const mcdmCriteria = [];

function renderMCDMCriteria() {
  const list = document.getElementById("mcdm-criteria-list");
  list.innerHTML = '';
  mcdmCriteria.forEach((criterion, index) => {
    const div = document.createElement('div');
    div.className = 'flex gap-2 items-center';
    div.innerHTML = `
      <input type="text" placeholder="準則名稱" value="\${criterion.name}" class="input-field w-1/3"
        onchange="mcdmCriteria[\${index}].name = this.value" />
      <input type="number" min="0" max="10" step="0.1" value="\${criterion.score}"
        class="input-field w-1/4" onchange="mcdmCriteria[\${index}].score = parseFloat(this.value); calculateMCDMScore();" />
      <input type="number" min="0" max="1" step="0.01" value="\${criterion.weight}"
        class="input-field w-1/4" onchange="mcdmCriteria[\${index}].weight = parseFloat(this.value); calculateMCDMScore();" />
      <button onclick="removeMCDMCriterion(\${index})" class="action-button bg-red-500 hover:bg-red-600 text-xs px-2 py-1">刪除</button>
    `;
    list.appendChild(div);
  });
  calculateMCDMScore();
}

function addMCDMCriterion() {
  mcdmCriteria.push({ name: '', score: 5, weight: 0.2 });
  renderMCDMCriteria();
}

function removeMCDMCriterion(index) {
  mcdmCriteria.splice(index, 1);
  renderMCDMCriteria();
}

function calculateMCDMScore() {
  const score = mcdmCriteria.reduce((sum, c) => sum + (c.score * c.weight), 0);
  const scoreDisplay = document.getElementById("mcdm-total-score");
  if (scoreDisplay) scoreDisplay.textContent = score.toFixed(2);
}

function getMCDMScore() {
  return parseFloat(document.getElementById("mcdm-total-score")?.textContent || "0");
}

function getMCDMCriteria() {
  return [...mcdmCriteria];
}

window.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById("add-mcdm-criterion-button");
  if (addButton) {
    addButton.addEventListener("click", addMCDMCriterion);
  }
});
