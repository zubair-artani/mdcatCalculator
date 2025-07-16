function calculateAggregate() {
  const matricMarks = parseFloat(document.getElementById('matricMarks').value);
  const matricTotal = parseFloat(document.getElementById('matricTotal').value);
  const fscMarks = parseFloat(document.getElementById('fscMarks').value);
  const fscTotal = parseFloat(document.getElementById('fscTotal').value);
  const mdcatMarks = parseFloat(document.getElementById('mdcatMarks').value);
  const mdcatTotal = parseFloat(document.getElementById('mdcatTotal').value);

  if (
    isNaN(matricMarks) || isNaN(matricTotal) ||
    isNaN(fscMarks) || isNaN(fscTotal) ||
    isNaN(mdcatMarks) || isNaN(mdcatTotal)
  ) {
    alert("Please fill in all fields with valid numbers.");
    return;
  }

  const matricPercent = (matricMarks / matricTotal) * 100;
  const fscPercent = (fscMarks / fscTotal) * 100;
  const mdcatPercent = (mdcatMarks / mdcatTotal) * 100;

  const aggregate = (matricPercent * 0.10) + (fscPercent * 0.40) + (mdcatPercent * 0.50);

  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  resultDiv.innerText = `Your MDCAT Aggregate is: ${aggregate.toFixed(2)}%`;
}

function resetFields() {
  document.querySelectorAll("input").forEach(input => input.value = "");
  document.getElementById('mdcatTotal').value = 210;
  document.getElementById('result').style.display = "none";
}