// Handle form submission for generating a license key
document.getElementById('generateForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form from refreshing the page

  const location = document.getElementById('generateLocation').value;

  fetch('/license/generate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ location })
  })
  .then(response => response.json())
  .then(data => {
      const resultDiv = document.getElementById('generateResult');
      resultDiv.style.display = 'block';
      resultDiv.innerText = `Generated License Key: ${data.licenseKey}`;
  })
  .catch(error => {
      console.error('Error:', error);
  });
});

// Handle form submission for validating a license key
document.getElementById('validateForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form from refreshing the page

  const location = document.getElementById('validateLocation').value;
  const providedKey = document.getElementById('licenseKey').value;

  fetch('/license/validate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ location, providedKey })
  })
  .then(response => response.json())
  .then(data => {
      const resultDiv = document.getElementById('validateResult');
      resultDiv.style.display = 'block';
      resultDiv.innerText = data.valid ? 'License Key is VALID' : 'License Key is INVALID';
  })
  .catch(error => {
      console.error('Error:', error);
  });
});
