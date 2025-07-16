function toggleMatricFields() {
  const checkbox = document.getElementById("excludeMatric");
  const matricFields = document.getElementById("matricFields");
  matricFields.style.display = checkbox.checked ? "none" : "block";
}

function calculateAggregate() {
  const excludeMatric = document.getElementById('excludeMatric').checked;

  const fscMarks = parseFloat(document.getElementById('fscMarks').value);
  const fscTotal = parseFloat(document.getElementById('fscTotal').value);
  const mdcatMarks = parseFloat(document.getElementById('mdcatMarks').value);
  const mdcatTotal = parseFloat(document.getElementById('mdcatTotal').value);

  let fscPercent = (fscMarks / fscTotal) * 100;
  let mdcatPercent = (mdcatMarks / mdcatTotal) * 100;
  let matricPercent = 0;

  if (!excludeMatric) {
    const matricMarks = parseFloat(document.getElementById('matricMarks').value);
    const matricTotal = parseFloat(document.getElementById('matricTotal').value);

    if (
      isNaN(matricMarks) || isNaN(matricTotal) ||
      isNaN(fscMarks) || isNaN(fscTotal) ||
      isNaN(mdcatMarks) || isNaN(mdcatTotal)
    ) {
      alert("Please fill in all fields with valid numbers.");
      return;
    }

    matricPercent = (matricMarks / matricTotal) * 100;
  } else {
    if (
      isNaN(fscMarks) || isNaN(fscTotal) ||
      isNaN(mdcatMarks) || isNaN(mdcatTotal)
    ) {
      alert("Please fill in all fields with valid numbers.");
      return;
    }
  }

  let aggregate;
  if (excludeMatric) {
    aggregate = (fscPercent * 0.40) + (mdcatPercent * 0.60);
  } else {
    aggregate = (matricPercent * 0.10) + (fscPercent * 0.40) + (mdcatPercent * 0.50);
  }

  let output = '';
  if (!excludeMatric) {
    output += `Matric %: ${matricPercent.toFixed(2)}%<br>`;
  }
  output += `FSc %: ${fscPercent.toFixed(2)}%<br>`;
  output += `MDCAT %: ${mdcatPercent.toFixed(2)}%<br>`;
  output += `<strong>Aggregate: ${aggregate.toFixed(2)}%</strong>`;

  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = output;
}

function resetFields() {
  document.querySelectorAll("input").forEach(input => {
    if (input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
  document.getElementById("matricFields").style.display = "block";
  document.getElementById('mdcatTotal').value = 210;
  document.getElementById('result').style.display = "none";
}