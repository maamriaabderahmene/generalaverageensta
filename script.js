const modulesTable = document.getElementById('modules-table');
const generalAverageSpan = document.getElementById('general-average');

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

// To store the currently loaded modules
let currentModules = [];

function loadMI1() {
  loadModules(mi1Modules);
}

function loadMI2() {
  loadModules(mi2Modules);
}

function loadModules(modules) {
  currentModules = modules; // Set the current modules to the loaded ones

  modulesTable.innerHTML = `
    <tr>
      <th>Module</th>
      <th>Coefficient</th>
      <th>TD</th>
      <th>Exam</th>
      <th>Module Average</th>
    </tr>
  `;

  modules.forEach((module, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${module.name}</td>
      <td>${module.coeff}</td>
      <td><input type="number" min="0" max="20" oninput="calculateAverages()" id="td-${index}"></td>
      <td><input type="number" min="0" max="20" oninput="calculateAverages()" id="exam-${index}"></td>
      <td id="module-avg-${index}">0.00</td>
    `;
    modulesTable.appendChild(row);
  });

  generalAverageSpan.textContent = "0.00";
}

function calculateAverages() {
  let totalCoeff = 0;
  let totalWeightedAverage = 0;

  currentModules.forEach((module, index) => {
    const td = parseFloat(document.getElementById(`td-${index}`).value) || 0;
    const exam = parseFloat(document.getElementById(`exam-${index}`).value) || 0;
    const moduleAverage = (0.4 * td) + (0.6 * exam);
    document.getElementById(`module-avg-${index}`).textContent = moduleAverage.toFixed(2);

    totalCoeff += module.coeff;
    totalWeightedAverage += moduleAverage * module.coeff;
  });

  const generalAverage = totalWeightedAverage / totalCoeff;
  generalAverageSpan.textContent = generalAverage.toFixed(2);
}
