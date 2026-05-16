const pool = require('../config/db');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const PDFDocument = require('pdfkit');

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

    const result = await pool.query(
      `INSERT INTO programmings 
       (classroom, month, year, course, class_info, unit_title, unit_subtitle, unit_description, routines_text, english_text, important_days_text, pdf_path, extracted_text) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
       RETURNING *`,
      [classroom, month, year, course, class_info, unit_title, unit_subtitle, unit_description, routines_text, english_text, important_days_text, pdfPath, extractedText]
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

    const result = await pool.query(
      `UPDATE programmings 
       SET classroom = $1, month = $2, year = $3, course = $4, class_info = $5, 
           unit_title = $6, unit_subtitle = $7, unit_description = $8, 
           routines_text = $9, english_text = $10, important_days_text = $11
       WHERE id = $12 
       RETURNING *`,
      [classroom, month, year, course, class_info, unit_title, unit_subtitle, unit_description, routines_text, english_text, important_days_text, id]
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

    if (!pdfPath || !fs.existsSync(pdfPath)) {
      return res.status(404).json({ message: 'PDF no disponible.' });
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

    const classroomAges = {
      ositos: '0-1 años',
      leones: '1-2 años',
      monitos: '2-3 años'
    };

    // Create PDF
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title: `Programación ${programming.month} ${programming.year} - Aula ${classroomNames[programming.classroom] || programming.classroom}`,
        Author: 'Babilín Escuela Infantil Bilingüe',
      }
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="programacion-${programming.classroom}-${programming.month}-${programming.year}.pdf"`);

    // Pipe PDF to response
    doc.pipe(res);

    // Colors
    const primaryColor = '#486173';
    const secondaryColor = '#7e5449';
    const tertiaryColor = '#506351';
    const errorColor = '#ba1a1a';
    const textColor = '#1b1c1a';
    const lightGray = '#f4f4f0';

    // Header background
    doc.rect(0, 0, 595, 120).fill('#bed9ee');

    // School name
    doc.fontSize(24).fillColor(primaryColor).font('Helvetica-Bold');
    doc.text('Babilín', 50, 40, { align: 'center' });
    doc.fontSize(10).fillColor(textColor).font('Helvetica');
    doc.text('Escuela Infantil Bilingüe', 50, 70, { align: 'center' });

    // Info line
    doc.fontSize(11).fillColor(textColor);
    const classInfo = `Clase: ${programming.class_info || classroomAges[programming.classroom] || programming.classroom}  •  Curso: ${programming.course || '2025/2026'}  •  Mes: ${programming.month} ${programming.year}`;
    doc.text(classInfo, 50, 100, { align: 'center' });

    // Move down
    doc.y = 150;

    // Unit Title Section
    if (programming.unit_title) {
      // Section header background
      doc.rect(40, doc.y - 10, 515, 35).fill('#bed9ee');
      doc.fontSize(14).fillColor(primaryColor).font('Helvetica-Bold');
      doc.text('UNIDAD DIDÁCTICA', 50, doc.y);
      doc.moveDown(0.5);
      
      doc.fontSize(20).fillColor(primaryColor).font('Helvetica-Bold');
      doc.text(programming.unit_title, 50, doc.y);
      doc.moveDown(0.3);
      
      if (programming.unit_subtitle) {
        doc.fontSize(14).fillColor(textColor).font('Helvetica');
        doc.text(programming.unit_subtitle, 50, doc.y);
        doc.moveDown(0.5);
      }

      if (programming.unit_description) {
        doc.fontSize(11).fillColor(textColor).font('Helvetica');
        const descLines = programming.unit_description.split('\n');
        for (const line of descLines) {
          const trimmed = line.trim();
          if (!trimmed) {
            doc.moveDown(0.3);
            continue;
          }
          if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
            doc.text(`  ${trimmed}`, 60, doc.y, { width: 475 });
          } else {
            doc.text(trimmed, 50, doc.y, { width: 495 });
          }
          doc.moveDown(0.2);
        }
      }
      doc.moveDown(0.5);
    }

    // Routines Section
    if (programming.routines_text) {
      doc.rect(40, doc.y - 10, 515, 30).fill('#c5dbc4');
      doc.fontSize(14).fillColor(tertiaryColor).font('Helvetica-Bold');
      doc.text('Rutinas y Consejos', 50, doc.y);
      doc.moveDown(0.5);
      
      doc.fontSize(11).fillColor(textColor).font('Helvetica');
      const routineLines = programming.routines_text.split('\n');
      for (const line of routineLines) {
        const trimmed = line.trim();
        if (!trimmed) {
          doc.moveDown(0.3);
          continue;
        }
        if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
          doc.text(`  ${trimmed}`, 60, doc.y, { width: 475 });
        } else {
          doc.text(trimmed, 50, doc.y, { width: 495 });
        }
        doc.moveDown(0.2);
      }
      doc.moveDown(0.5);
    }

    // English Section
    if (programming.english_text) {
      doc.rect(40, doc.y - 10, 515, 30).fill('#fdc5b6');
      doc.fontSize(14).fillColor(secondaryColor).font('Helvetica-Bold');
      doc.text('Inglés', 50, doc.y);
      doc.moveDown(0.5);
      
      doc.fontSize(11).fillColor(textColor).font('Helvetica');
      const englishLines = programming.english_text.split('\n');
      for (const line of englishLines) {
        const trimmed = line.trim();
        if (!trimmed) {
          doc.moveDown(0.3);
          continue;
        }
        doc.text(trimmed, 50, doc.y, { width: 495 });
        doc.moveDown(0.2);
      }
      doc.moveDown(0.5);
    }

    // Important Days Section
    if (programming.important_days_text) {
      doc.rect(40, doc.y - 10, 515, 30).fill('#ffdad6');
      doc.fontSize(14).fillColor(errorColor).font('Helvetica-Bold');
      doc.text('Días Importantes este Mes', 50, doc.y);
      doc.moveDown(0.5);
      
      doc.fontSize(11).fillColor(textColor).font('Helvetica');
      const daysLines = programming.important_days_text.split('\n');
      for (const line of daysLines) {
        const trimmed = line.trim();
        if (!trimmed) {
          doc.moveDown(0.3);
          continue;
        }
        doc.text(trimmed, 50, doc.y, { width: 495 });
        doc.moveDown(0.2);
      }
    }

    // Footer
    doc.fontSize(8).fillColor('#73787c');
    doc.text('Babilín Escuela Infantil Bilingüe Chamartín', 50, 780, { align: 'center', width: 495 });
    doc.text(`Generado el ${new Date().toLocaleDateString('es-ES')}`, 50, 792, { align: 'center', width: 495 });

    // End PDF
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
