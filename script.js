const modulesTable = document.getElementById('modules-table');
const generalAverageSpan = document.getElementById('general-average');

// Module lists
const mi1Modules = [
  { name: "Electricity", coeff: 3 },
  { name: "Office Tools and Web", coeff: 1 },
  { name: "Mathematical Analysis 1", coeff: 5 },
  { name: "Algorithmics and Static Data Structures", coeff: 5 },
  { name: "Computer Architecture 1", coeff: 4 },
  { name: "Algebra 1", coeff: 3 },
  { name: "Introduction to Operating Systems 1", coeff: 3 },
  { name: "Written Expression (FRANCAIS)", coeff: 2 }
];

const mi2Modules = [
  { name: "Business Economics", coeff: 2 },
  { name: "Mathematical Analysis 3", coeff: 5 },
  { name: "Computer Architecture 2", coeff: 4 },
  { name: "Fundamental Electronics 2", coeff: 4 },
  { name: "English 2", coeff: 2 },
  { name: "Algebra 3", coeff: 3 },
  { name: "File Structures and Data Structures", coeff: 4 },
  { name: "Probability and Statistics 1", coeff: 4 }
];

const st1Modules = [
  { name: "Analyse 1", coeff: 6 },
  { name: "Algèbre 1", coeff: 3 },
  { name: "Probabilités-Statistiques", coeff: 3 },
  { name: "Physiques 1", coeff: 5 },
  { name: "Chimie 1", coeff: 5 },
  { name: "Informatique 1", coeff: 3 },
  { name: "Dessin technique", coeff: 1 },
  { name: "Ingénierie humaine 1", coeff: 1 },
  { name: "Economie générale", coeff: 1 },
  { name: "Anglais 1", coeff: 1 },
  { name: "Français 1", coeff: 1 }
];

const st2Modules = [
  { name: "Analyse 3", coeff: 4 },
  { name: "Analyse numérique 1", coeff: 2 },
  { name: "Physiques 3", coeff: 4 },
  { name: "Chimie 3", coeff: 3 },
  { name: "Mécanique rationelle 1", coeff: 3 },
  { name: "Electricité générale", coeff: 3 },
  { name: "Mécanique des fluides", coeff: 3 },
  { name: "Informatique 3", coeff: 3 },
  { name: "Ingénierie 1", coeff: 3 },
  { name: "Techniques d’expression 1", coeff: 1 },
  { name: "Anglais 3", coeff: 1 }
];

// Load functions
function loadMI1() {
  loadModules(mi1Modules);
}

function loadMI2() {
  loadModules(mi2Modules);
}

function loadST1() {
  loadModules(st1Modules);
}

function loadST2() {
  loadModules(st2Modules);
}

// Populate the table dynamically
function loadModules(modules) {
  // Clear the table
  modulesTable.innerHTML = `
    <tr>
      <th>Module</th>
      <th>Coefficient</th>
      <th>TD</th>
      <th>Exam</th>
      <th>Module Average</th>
    </tr>
  `;

  // Add rows for each module
  modules.forEach((module, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${module.name}</td>
      <td>${module.coeff}</td>
      <td><input type="number" min="0" max="20" oninput="calculateAverages(${JSON.stringify(modules)})" id="td-${index}"></td>
      <td><input type="number" min="0" max="20" oninput="calculateAverages(${JSON.stringify(modules)})" id="exam-${index}"></td>
      <td id="module-avg-${index}">0.00</td>
    `;
    modulesTable.appendChild(row);
  });

  // Reset general average
  generalAverageSpan.textContent = "0.00";
}

// Calculate module and general averages
function calculateAverages() {
  // Determine which module set is currently loaded
  const tableRows = Array.from(modulesTable.rows).slice(1); // Skip header row
  const modules = tableRows.map((row, index) => ({
    coeff: parseInt(row.cells[1].textContent), // Coefficient from the table
    tdInput: document.getElementById(`td-${index}`),
    examInput: document.getElementById(`exam-${index}`),
    avgCell: row.cells[4]
  }));

  let totalCoeff = 0;
  let totalWeightedAverage = 0;

  modules.forEach(({ coeff, tdInput, examInput, avgCell }) => {
    const td = parseFloat(tdInput.value) || 0;
    const exam = parseFloat(examInput.value) || 0;
    const moduleAverage = (0.4 * td) + (0.6 * exam);
    avgCell.textContent = moduleAverage.toFixed(2);

    totalCoeff += coeff;
    totalWeightedAverage += moduleAverage * coeff;
  });

  const generalAverage = totalCoeff ? totalWeightedAverage / totalCoeff : 0;
  generalAverageSpan.textContent = generalAverage.toFixed(2);
}
