const express = require('express');
const router = express.Router();
const jsPDF = require('jspdf');

router.post('/', async (req, res) => {
  const { userId, resumeData } = req.body;
  try {
    const doc = new jsPDF();
    doc.text('Resume', 10, 10);
    doc.text(JSON.stringify(resumeData), 10, 20);
    const pdfBuffer = doc.output('arraybuffer');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;