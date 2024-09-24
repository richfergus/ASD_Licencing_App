const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Function to generate a license key based on location and current GMT hour
function generateConfigLicenseKey(location) {
    const currentDateTime = new Date().toISOString(); // Get current date and time in GMT (UTC) format
    const currentDate = currentDateTime.split('T')[0]; // Extract the date (YYYY-MM-DD)
    const currentHour = currentDateTime.split('T')[1].split(':')[0]; // Extract the hour (HH)
    const data = `${location}:${currentDate}:${currentHour}`; // Combine location, date, and hour
    const hash = crypto.createHash('sha256').update(data).digest('hex'); // Create a SHA-256 hash
    return hash;
}

// Function to validate a license key based on location and current GMT hour
function validateConfigLicenseKey(location, providedKey) {
    const currentDateTime = new Date().toISOString(); // Get current date and time in GMT (UTC) format
    const currentDate = currentDateTime.split('T')[0]; // Extract the date (YYYY-MM-DD)
    const currentHour = currentDateTime.split('T')[1].split(':')[0]; // Extract the hour (HH)
    const data = `${location}:${currentDate}:${currentHour}`; // Combine location, date, and hour
    const expectedKey = crypto.createHash('sha256').update(data).digest('hex'); // Generate the expected hash

    // Compare the provided key with the expected key
    return expectedKey === providedKey;
}

// Route to generate a license key
router.post('/generate', (req, res) => {
    const { location } = req.body;

    if (!location) {
        return res.status(400).json({ message: 'Location is required' });
    }

    const licenseKey = generateConfigLicenseKey(location);
    res.json({ licenseKey });
});

// Route to validate a license key
router.post('/validate', (req, res) => {
    const { location, providedKey } = req.body;

    if (!location || !providedKey) {
        return res.status(400).json({ message: 'Location and License Key are required' });
    }

    const isValid = validateConfigLicenseKey(location, providedKey);
    res.json({ valid: isValid });
});

module.exports = router;
