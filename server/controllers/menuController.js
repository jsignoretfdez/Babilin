const pool = require('../config/db');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const ALLERGEN_KEYWORDS = {
  gluten: ['pasta', 'macarrones', 'espaguetis', 'pan', 'harina', 'trigo', 'galletas', 'bizcocho', 'fideos', 'lasaña', 'cuscus', 'croquetas', 'rebozado', 'empanado'],
  lacteos: ['leche', 'queso', 'yogur', 'yogurt', 'nata', 'mantequilla', 'bechamel', 'crema', 'helado', 'cuajada', 'requesón', 'mozzarella', 'parmesano', 'queso fresco'],
  huevos: ['huevo', 'tortilla', 'mayonesa', 'hervido', 'revuelto', 'flan', 'merengue', 'huevos'],
  pescado: ['merluza', 'salmón', 'salm on', 'atún', 'bacalao', 'pescado', 'lubina', 'dorada', 'sardinas', 'anchoas', 'bonito', 'rape', 'gallo', 'trucha', 'besugo', 'caballa', 'jurel', 'pescadilla'],
  mariscos: ['gambas', 'langostinos', 'mejillones', 'almejas', 'pulpo', 'calamar', 'sepia', 'camarones', 'marisco', 'navajas', 'berberechos'],
  frutos_secos: ['almendra', 'nuez', 'avellana', 'cacahuete', 'pistacho', 'piñones', 'anacardos', 'castaña', 'nueces', 'almendras', 'frutos secos'],
  soja: ['soja', 'tofu', 'salsa de soja', 'edamame', 'miso', 'tempeh'],
  apio: ['apio'],
  mostaza: ['mostaza', 'salsa mostaza'],
  sesamo: ['sésamo', 'sesamo', 'ajonjolí', 'ajonjoli', 'semillas de sésamo', 'tahini'],
  moluscos: ['mejillones', 'almejas', 'ostras', 'vieiras', 'caracoles'],
  cacahuetes: ['cacahuete', 'cacahuetes', 'crema de cacahuete', 'mantequilla de cacahuete'],
  lupinos: ['lupinos', 'altramuces']
};

const detectAllergens = (text) => {
  if (!text) return [];
  const normalizedText = text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const detected = [];

  for (const [allergen, keywords] of Object.entries(ALLERGEN_KEYWORDS)) {
    for (const keyword of keywords) {
      const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (normalizedText.includes(normalizedKeyword)) {
        if (!detected.includes(allergen)) {
          detected.push(allergen);
        }
        break;
      }
    }
  }

  return detected;
};

const parseMenuText = (text) => {
  if (!text) return [];

  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  const days = [];

  // Check if this is a table format (header with days of week)
  const headerLine = lines.find(l => 
    l.match(/LUNES/i) && l.match(/MARTES/i)
  );

  if (headerLine) {
    // Table format: parse columns
    return parseTableFormat(lines);
  }

  // Sequential format: day followed by meals
  return parseSequentialFormat(lines);
};

const parseTableFormat = (lines) => {
  const days = [];
  
  // Find header line index
  const headerIndex = lines.findIndex(l => l.match(/LUNES/i) && l.match(/MARTES/i));
  if (headerIndex === -1) return [];

  // Detect FIESTA days from raw text
  const fiestaDays = new Set();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Check for "FIESTA" on same line as date
    const fiestaMatch = line.match(/^(\d{1,2})\s*FIESTA/i);
    if (fiestaMatch) {
      fiestaDays.add(parseInt(fiestaMatch[1]));
      continue;
    }
    // Check for date on one line and FIESTA on next line
    if (line.match(/^\d{1,2}$/) && i + 1 < lines.length && lines[i + 1].trim().match(/^FIESTA/i)) {
      fiestaDays.add(parseInt(line));
    }
  }

  // Get all lines after header, filter empty and metadata
  const menuLines = [];
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].replace(/\s+/g, ' ').trim();
    if (line && !line.match(/^Lácteo|^Fruta|^ALERGENOS|^MENU|^Ensala|^FRUTA|^\d+\s+pax/i)) {
      menuLines.push(line);
    }
  }
  
  // Find date line indices (lines starting with a number)
  const dateIndices = [];
  for (let i = 0; i < menuLines.length; i++) {
    if (menuLines[i].match(/^\d{1,2}\s+[A-ZÁ-Ú]/)) {
      dateIndices.push(i);
    }
  }
  
  // Process each date block
  for (let d = 0; d < dateIndices.length; d++) {
    const startIdx = dateIndices[d];
    const endIdx = d + 1 < dateIndices.length ? dateIndices[d + 1] : menuLines.length;
    
    // Get all lines for this date block
    const blockLines = [];
    for (let i = startIdx; i < endIdx; i++) {
      blockLines.push(menuLines[i]);
    }
    
    // Clean up lines - remove parenthesized numbers
    const cleanLines = blockLines.map(l => l.replace(/\(\d+\)/g, '').replace(/\s+/g, ' ').trim()).filter(l => l);
    
    // Extract date from first line
    const dateMatch = cleanLines[0]?.match(/^(\d{1,2})\s+(.+)/);
    if (!dateMatch) continue;
    
    const dateNum = dateMatch[1];
    const firstContent = dateMatch[2];
    
    // Replace first line with just content
    cleanLines[0] = firstContent;
    
    // Combine lines into dishes using heuristic
    const dishes = [];
    let currentDish = '';
    
    for (let i = 0; i < cleanLines.length; i++) {
      const line = cleanLines[i];
      
      if (!currentDish) {
        currentDish = line;
        continue;
      }
      
      // Check if current line is a continuation
      const lastWord = currentDish.split(' ').pop().toLowerCase();
      const lineStartsLower = line.match(/^[a-zá-ú]/);
      const lastWordIsPreposition = ['con', 'de', 'del', 'y', 'en', 'a', 'la', 'el', 'las', 'los', 'un', 'una', 'al', 'por', 'para', 'sin', 'sobre'].includes(lastWord);
      
      if (lineStartsLower || lastWordIsPreposition) {
        currentDish += ' ' + line;
      } else {
        dishes.push(currentDish.trim());
        currentDish = line;
      }
    }
    if (currentDish) {
      dishes.push(currentDish.trim());
    }
    
    // Determine lunch and dinner
    let lunch = dishes[0] || '';
    let dinner = dishes[1] || '';
    
    // Determine which day of the week this date falls on
    const dayOfWeek = getDayOfWeek(dateNum, 'Mayo', 2026);
    
    days.push({
      day: dayOfWeek,
      date: dateNum,
      lunch: lunch,
      dinner: dinner,
      allergens: detectAllergens(`${lunch} ${dinner}`),
      isFiesta: false
    });
  }

  // Fill in missing dates (only holidays, skip weekends)
  const filledDays = [];
  if (days.length === 0) return days;
  
  const firstDate = parseInt(days[0].date);
  const lastDate = parseInt(days[days.length - 1].date);
  
  for (let date = firstDate; date <= lastDate; date++) {
    const dayOfWeek = getDayOfWeek(String(date), 'Mayo', 2026);
    const isWeekend = dayOfWeek === 'Sábado' || dayOfWeek === 'Domingo';
    
    // Skip weekends entirely
    if (isWeekend) continue;
    
    const existingDay = days.find(d => parseInt(d.date) === date);
    
    if (existingDay) {
      filledDays.push(existingDay);
    } else {
      // This date is missing - check if it's a holiday
      const isFiesta = fiestaDays.has(date);
      
      filledDays.push({
        day: dayOfWeek,
        date: String(date),
        lunch: '',
        dinner: '',
        allergens: [],
        isFiesta: isFiesta,
        note: isFiesta ? 'Festivo' : ''
      });
    }
  }

  return filledDays;
};

const getDayOfWeek = (dateStr, month, year) => {
  const dateNum = parseInt(dateStr);
  if (isNaN(dateNum)) return 'Lunes';
  
  const monthMap = {
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
    'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  };
  
  const monthNum = monthMap[month.toLowerCase()] || 0;
  const date = new Date(year, monthNum, dateNum);
  const dayNum = date.getDay();
  
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return dayNames[dayNum];
};

const parseSequentialFormat = (lines) => {
  const days = [];
  let currentDay = null;
  let skipNext = false;

  for (let i = 0; i < lines.length; i++) {
    if (skipNext) {
      skipNext = false;
      continue;
    }

    const line = lines[i];
    const normalizedLine = line.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const dayMatch = normalizedLine.match(/^(lunes|martes|miercoles|jueves|viernes|sabado|domingo)\s*(\d{1,2})?$/i);

    if (dayMatch) {
      if (currentDay) {
        days.push(currentDay);
      }

      const dayNameMap = {
        'lunes': 'Lunes', 'martes': 'Martes', 'miercoles': 'Miércoles',
        'jueves': 'Jueves', 'viernes': 'Viernes', 'sabado': 'Sábado', 'domingo': 'Domingo'
      };

      const dayKey = normalizedLine.replace(/\s+\d+$/, '').trim();
      const dayName = dayNameMap[dayKey] || line.charAt(0).toUpperCase() + line.slice(1).toLowerCase().replace(/\s+\d+$/, '');
      const dateNum = dayMatch[2] || '';

      currentDay = {
        day: dayName,
        date: dateNum,
        lunch: '',
        dinner: '',
        allergens: []
      };
    } else if (currentDay) {
      if (line.match(/^\d+\s*pax/) || line.includes('min') || line.includes('batch') || line.includes('·')) {
        continue;
      }

      if (!currentDay.lunch) {
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        if (nextLine && !nextLine.match(/^\d+\s*pax/) && !nextLine.includes('min') && !nextLine.match(/^(lunes|martes|miercoles|jueves|viernes|sabado|domingo)/i)) {
          currentDay.lunch = line + ' ' + nextLine;
          skipNext = true;
        } else {
          currentDay.lunch = line;
        }
      } else if (!currentDay.dinner) {
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        if (nextLine && !nextLine.match(/^\d+\s*pax/) && !nextLine.includes('min') && !nextLine.match(/^(lunes|martes|miercoles|jueves|viernes|sabado|domingo)/i)) {
          currentDay.dinner = line + ' ' + nextLine;
          skipNext = true;
        } else {
          currentDay.dinner = line;
        }
      }
    }
  }

  if (currentDay) {
    days.push(currentDay);
  }

  for (const day of days) {
    const allText = `${day.lunch} ${day.dinner}`;
    day.allergens = detectAllergens(allText);
  }

  return days;
};

const uploadMenu = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha proporcionado ningún archivo PDF.' });
    }

    const { month, year } = req.body;
    if (!month || !year) {
      return res.status(400).json({ message: 'Mes y año son requeridos.' });
    }

    const pdfPath = req.file.path;
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(pdfBuffer);
    const extractedText = pdfData.text;

    const parsedData = parseMenuText(extractedText);

    const result = await pool.query(
      'INSERT INTO menus (month, year, pdf_path, extracted_text, parsed_data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [month, year, pdfPath, extractedText, JSON.stringify(parsedData)]
    );

    res.status(201).json({
      message: 'Menú subido correctamente.',
      menu: result.rows[0]
    });
  } catch (error) {
    console.error('Error al subir menú:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

const getMenus = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menus ORDER BY year DESC, created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener menús:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

const getCurrentMenu = async (req, res) => {
  try {
    const now = new Date();
    const currentMonth = now.toLocaleString('es-ES', { month: 'long' });
    const currentYear = now.getFullYear();

    let result = await pool.query(
      'SELECT * FROM menus WHERE LOWER(month) = LOWER($1) AND year = $2 ORDER BY created_at DESC LIMIT 1',
      [currentMonth, currentYear]
    );

    if (result.rows.length === 0) {
      result = await pool.query('SELECT * FROM menus ORDER BY created_at DESC LIMIT 1');
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No hay menús disponibles.' });
    }

    const menu = result.rows[0];
    if ((!menu.parsed_data || menu.parsed_data.length === 0) && menu.extracted_text) {
      const parsedData = parseMenuText(menu.extracted_text);
      await pool.query('UPDATE menus SET parsed_data = $1 WHERE id = $2', [JSON.stringify(parsedData), menu.id]);
      menu.parsed_data = parsedData;
    }

    res.json(menu);
  } catch (error) {
    console.error('Error al obtener menú actual:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM menus WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Menú no encontrado.' });
    }

    const menu = result.rows[0];
    if ((!menu.parsed_data || menu.parsed_data.length === 0) && menu.extracted_text) {
      const parsedData = parseMenuText(menu.extracted_text);
      await pool.query('UPDATE menus SET parsed_data = $1 WHERE id = $2', [JSON.stringify(parsedData), menu.id]);
      menu.parsed_data = parsedData;
    }

    res.json(menu);
  } catch (error) {
    console.error('Error al obtener menú:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

const downloadMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM menus WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Menú no encontrado.' });
    }

    const menu = result.rows[0];
    const pdfPath = menu.pdf_path;

    if (!pdfPath || !fs.existsSync(pdfPath)) {
      return res.status(404).json({ message: 'PDF no disponible.' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="menu-${menu.month}-${menu.year}.pdf"`);
    res.sendFile(path.resolve(pdfPath));
  } catch (error) {
    console.error('Error al descargar menú:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menuResult = await pool.query('SELECT pdf_path FROM menus WHERE id = $1', [id]);
    if (menuResult.rows.length === 0) {
      return res.status(404).json({ message: 'Menú no encontrado.' });
    }

    const pdfPath = menuResult.rows[0].pdf_path;
    if (pdfPath && fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }

    await pool.query('DELETE FROM menus WHERE id = $1', [id]);

    res.json({ message: 'Menú eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar menú:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

module.exports = { uploadMenu, getMenus, getCurrentMenu, getMenuById, downloadMenu, deleteMenu };
