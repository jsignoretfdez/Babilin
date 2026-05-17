const pool = require('../config/db');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const PDFDocument = require('pdfkit');

const cleanText = (text) => {
  if (!text) return '';
  // Fix encoding issues - remove all Ð occurrences aggressively
  let cleaned = text
    .replace(/\u0000/g, '')  // Remove null characters
    .replace(/Ð+/g, '')      // Remove ALL Ð characters (any quantity)
    .replace(/ð/g, 'd')      // Replace ð with d
    .replace(/Ø/g, 'O')     // Replace Ø with O
    .replace(/ø/g, 'o')     // Replace ø with o
    .replace(/Æ/g, 'AE')    // Replace Æ with AE
    .replace(/æ/g, 'ae')    // Replace æ with ae
    .replace(/Œ/g, 'OE')    // Replace Œ with OE
    .replace(/œ/g, 'oe')    // Replace œ with oe
    .replace(/\n\s+/g, '\n') // Remove leading whitespace after newlines
    .replace(/^\s+/g, '')    // Remove leading spaces from entire text
    .replace(/\s+$/g, '')   // Remove trailing spaces
    .trim();
  return cleaned;
};

const uploadProgramming = async (req, res) => {
  try {
    const { classroom, month, year, course, class_info, unit_title, unit_subtitle, unit_description, routines_text, english_text, important_days_text } = req.body;
    
    if (!classroom || !month || !year) {
      return res.status(400).json({ message: 'Aula, mes y año son requeridos.' });
    }

    let pdfPath = null;
    let extractedText = null;

    if (req.file) {
      pdfPath = req.file.path;
      const pdfBuffer = fs.readFileSync(pdfPath);
      const pdfData = await pdfParse(pdfBuffer);
      extractedText = pdfData.text;
    }

    // Clean all text fields before saving to database
    const cleanFields = {
      class_info: cleanText(class_info),
      unit_title: cleanText(unit_title),
      unit_subtitle: cleanText(unit_subtitle),
      unit_description: cleanText(unit_description),
      routines_text: cleanText(routines_text),
      english_text: cleanText(english_text),
      important_days_text: cleanText(important_days_text),
    };

    const result = await pool.query(
      `INSERT INTO programmings 
       (classroom, month, year, course, class_info, unit_title, unit_subtitle, unit_description, routines_text, english_text, important_days_text, pdf_path, extracted_text) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
RETURNING *`,
       [classroom, month, year, course, cleanFields.class_info, cleanFields.unit_title, cleanFields.unit_subtitle, cleanFields.unit_description, cleanFields.routines_text, cleanFields.english_text, cleanFields.important_days_text, pdfPath, extractedText]
    );

    res.status(201).json({
      message: 'Programación guardada correctamente.',
      programming: result.rows[0]
    });
  } catch (error) {
    console.error('Error al guardar programación:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

const updateProgramming = async (req, res) => {
  try {
    const { id } = req.params;
    const { classroom, month, year, course, class_info, unit_title, unit_subtitle, unit_description, routines_text, english_text, important_days_text } = req.body;

    // Clean all text fields before updating
    const cleanFields = {
      class_info: cleanText(class_info),
      unit_title: cleanText(unit_title),
      unit_subtitle: cleanText(unit_subtitle),
      unit_description: cleanText(unit_description),
      routines_text: cleanText(routines_text),
      english_text: cleanText(english_text),
      important_days_text: cleanText(important_days_text),
    };

    const result = await pool.query(
      `UPDATE programmings 
       SET classroom = $1, month = $2, year = $3, course = $4, class_info = $5, 
           unit_title = $6, unit_subtitle = $7, unit_description = $8, 
           routines_text = $9, english_text = $10, important_days_text = $11
       WHERE id = $12 
       RETURNING *`,
      [classroom, month, year, course, cleanFields.class_info, cleanFields.unit_title, cleanFields.unit_subtitle, cleanFields.unit_description, cleanFields.routines_text, cleanFields.english_text, cleanFields.important_days_text, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Programación no encontrada.' });
    }

    res.json({
      message: 'Programación actualizada correctamente.',
      programming: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar programación:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

const getProgrammingByClassroom = async (req, res) => {
  try {
    const { classroom } = req.params;
    const result = await pool.query(
      'SELECT * FROM programmings WHERE classroom = $1 ORDER BY created_at DESC LIMIT 1',
      [classroom]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No hay programación disponible para esta aula.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener programación:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

const getAllProgrammings = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM programmings ORDER BY classroom, created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener programaciones:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

const downloadProgramming = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM programmings WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Programación no encontrada.' });
    }

    const programming = result.rows[0];
    const pdfPath = programming.pdf_path;

    // If PDF doesn't exist (Render ephemeral storage), generate a new one
    if (!pdfPath || !fs.existsSync(pdfPath)) {
      console.log('PDF no encontrado, generando uno nuevo...');
      return generateProgrammingPdf(req, res);
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="programacion-${programming.classroom}-${programming.month}-${programming.year}.pdf"`);
    res.sendFile(path.resolve(pdfPath));
  } catch (error) {
    console.error('Error al descargar programación:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

const generateProgrammingPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM programmings WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Programación no encontrada.' });
    }

    const programming = result.rows[0];

    const classroomNames = {
      ositos: 'Ositos',
      leones: 'Leones',
      monitos: 'Monitos'
    };

    const doc = new PDFDocument({
      size: 'A4',
      margin: 60,
      info: {
        Title: `Programación ${programming.month} ${programming.year} - Aula ${classroomNames[programming.classroom] || programming.classroom}`,
        Author: 'Babilín Escuela Infantil Bilingüe',
      }
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="programacion-${programming.classroom}-${programming.month}-${programming.year}.pdf"`);

    doc.pipe(res);

    const primaryColor = '#486173';
    const secondaryColor = '#7e5449';
    const tertiaryColor = '#506351';
    const errorColor = '#ba1a1a';
    const textColor = '#1b1c1a';
    const primaryContainer = '#bed9ee';
    const tertiaryContainer = '#c5dbc4';
    const secondaryContainer = '#fdc5b6';
    const errorContainer = '#ffdad6';

    const margin = 60;
    const contentWidth = 495;

    let yPos = margin;

    // Title
    doc.fontSize(22).fillColor(primaryColor).font('Helvetica-Bold');
    doc.text(cleanText(programming.unit_title || 'Programación Mensual'), { align: 'center', width: contentWidth });
    if (programming.unit_subtitle) {
      doc.fontSize(14).fillColor('#73787c').font('Helvetica');
      doc.text(cleanText(programming.unit_subtitle), { align: 'center', width: contentWidth });
    }
    yPos = doc.y + 15;

    // Info line
    doc.fontSize(15).fillColor(primaryColor).font('Helvetica');
    doc.text(`Aula ${classroomNames[programming.classroom] || programming.classroom}  •  ${programming.month} ${programming.year}  •  ${programming.course || ''}`, { align: 'center', width: contentWidth });
    yPos = doc.y + 25;

    const drawSection = (title, content, bgColor) => {
      if (!content) return;

      const sectionX = 30;
      const sectionWidth = 535;
      const padX = 25;
      const textWidth = sectionWidth - padX * 2;

      if (yPos > 620) {
        doc.addPage();
        yPos = margin;
      }

      const headerH = 40;
      const sectionY = yPos;

      doc.fontSize(11).fillColor(textColor).font('Helvetica');
      const textH = doc.heightOfString(content, { width: textWidth });

      const sectionH = headerH + 30 + textH + 30;

      doc.roundedRect(sectionX, sectionY, sectionWidth, sectionH, 10).fill('#ffffff');
      doc.roundedRect(sectionX, sectionY, sectionWidth, headerH, 10).fill(bgColor);
      doc.roundedRect(sectionX, sectionY + 30, sectionWidth, 10).fill(bgColor);

      doc.fontSize(13).fillColor(textColor).font('Helvetica-Bold');
      doc.text(title, sectionX + padX, sectionY + 12, { width: textWidth });

      doc.fontSize(11).fillColor(textColor).font('Helvetica');
      doc.text(content, sectionX + padX, sectionY + headerH + 20, { width: textWidth });

      yPos = sectionY + sectionH + 30;
    };

if (programming.unit_description) {
      drawSection('Descripción de la Unidad', cleanText(programming.unit_description), primaryContainer);
    }

    if (programming.routines_text) {
      drawSection('Rutinas y Consejos', cleanText(programming.routines_text), tertiaryContainer);
    }

    if (programming.english_text) {
      drawSection('Inglés', cleanText(programming.english_text), secondaryContainer);
    }

    if (programming.important_days_text) {
      drawSection('Días Importantes este Mes', cleanText(programming.important_days_text), errorContainer);
    }
    if (programming.routines_text) {
      drawSection('Rutinas y Consejos', programming.routines_text, tertiaryContainer);
    }
    if (programming.english_text) {
      drawSection('Inglés', programming.english_text, secondaryContainer);
    }
    if (programming.important_days_text) {
      drawSection('Días Importantes este Mes', programming.important_days_text, errorContainer);
    }

    const footerY = Math.max(yPos + 20, 750);
    doc.moveTo(30, footerY).lineTo(565, footerY).stroke('#c2c7cc');
    doc.fontSize(8).fillColor('#73787c').font('Helvetica');
    doc.text('Babilín Escuela Infantil Bilingüe Chamartín', 60, footerY + 10, { align: 'center', width: contentWidth });
    doc.text(`Generado el ${new Date().toLocaleDateString('es-ES')}`, 60, footerY + 22, { align: 'center', width: contentWidth });

    doc.end();

  } catch (error) {
    console.error('Error al generar PDF:', error);
    res.status(500).json({ message: 'Error al generar el PDF.' });
  }
};

const deleteProgramming = async (req, res) => {
  try {
    const { id } = req.params;

    const progResult = await pool.query('SELECT pdf_path FROM programmings WHERE id = $1', [id]);
    if (progResult.rows.length === 0) {
      return res.status(404).json({ message: 'Programación no encontrada.' });
    }

    const pdfPath = progResult.rows[0].pdf_path;
    if (pdfPath && fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }

    await pool.query('DELETE FROM programmings WHERE id = $1', [id]);

    res.json({ message: 'Programación eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar programación:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

module.exports = { uploadProgramming, updateProgramming, getProgrammingByClassroom, getAllProgrammings, downloadProgramming, generateProgrammingPdf, deleteProgramming };
