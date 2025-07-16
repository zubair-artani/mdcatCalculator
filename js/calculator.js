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

  let fscPercent = (fscMarks / fscTotal) * 0.40;
  let mdcatPercent = (mdcatMarks / mdcatTotal) * 0.50;
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

    matricPercent = (matricMarks / matricTotal) * 0.10;
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

  let output = `
  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
    ${!excludeMatric ? `
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px;">Matric</td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${matricPercent.toFixed(2)}%</td>
      </tr>
    ` : ''}
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">FSc</td>
      <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${fscPercent.toFixed(2)}%</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">MDCAT</td>
      <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${mdcatPercent.toFixed(2)}%</td>
    </tr>
    <tr style="background-color: #d4edda;">
      <td style="border: 1px solid #ccc; padding: 8px;"><strong>Aggregate</strong></td>
      <td style="border: 1px solid #ccc; padding: 8px; text-align: right;"><strong>${aggregate.toFixed(2)}%</strong></td>
    </tr>
  </table>
`;

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