const ALLERGEN_KEYWORDS = {
  gluten: [
    'pasta', 'macarrones', 'espaguetis', 'pan', 'harina', 'trigo', 'galletas',
    'bizcocho', 'fideos', 'sopa de fideos', 'lasaña', 'cuscus', 'croquetas',
    'rebozado', 'empanado', 'bread', 'pasta al huevo'
  ],
  lacteos: [
    'leche', 'queso', 'yogur', 'yogurt', 'nata', 'mantequilla', 'bechamel',
    'crema', 'helado', 'cuajada', 'requesón', 'mozzarella', 'parmesano',
    'cheddar', 'emmental', 'queso fresco', 'queso batido'
  ],
  huevos: [
    'huevo', 'tortilla', 'mayonesa', 'hervido', 'revuelto', 'flan',
    'merengue', 'huevos', 'tortilla francesa', 'tortilla de patata'
  ],
  pescado: [
    'merluza', 'salmón', 'atún', 'bacalao', 'pescado', 'lubina', 'dorada',
    'sardinas', 'anchoas', 'bonito', 'rape', 'gallo', 'trucha', 'besugo',
    'caballa', 'jurel', 'pescadilla', 'filete de pescado'
  ],
  mariscos: [
    'gambas', 'langostinos', 'mejillones', 'almejas', 'pulpo', 'calamar',
    'sepia', 'camarones', 'marisco', 'navajas', 'berberechos', 'cazón'
  ],
  frutos_secos: [
    'almendra', 'nuez', 'avellana', 'cacahuete', 'pistacho', 'piñones',
    'anacardos', 'castaña', 'nueces', 'almendras', 'frutos secos'
  ],
  soja: [
    'soja', 'tofu', 'salsa de soja', 'edamame', 'miso', 'tempeh'
  ],
  apio: [
    'apio'
  ],
  mostaza: [
    'mostaza', 'salsa mostaza'
  ],
  sesamo: [
    'sésamo', 'ajonjolí', 'semillas de sésamo', 'tahini'
  ],
  moluscos: [
    'mejillones', 'almejas', 'ostras', 'vieiras', 'caracoles'
  ],
  cacahuetes: [
    'cacahuete', 'cacahuetes', 'crema de cacahuete', 'mantequilla de cacahuete'
  ],
  lupinos: [
    'lupinos', 'altramuces'
  ]
};

const ALLERGEN_INFO = {
  gluten: { name: 'Gluten', icon: 'grain', color: 'bg-amber-100 text-amber-800' },
  lacteos: { name: 'Lácteos', icon: 'water_drop', color: 'bg-blue-100 text-blue-800' },
  huevos: { name: 'Huevos', icon: 'egg', color: 'bg-yellow-100 text-yellow-800' },
  pescado: { name: 'Pescado', icon: 'set_meal', color: 'bg-cyan-100 text-cyan-800' },
  mariscos: { name: 'Mariscos', icon: 'set_meal', color: 'bg-teal-100 text-teal-800' },
  frutos_secos: { name: 'Frutos secos', icon: 'nutrition', color: 'bg-orange-100 text-orange-800' },
  soja: { name: 'Soja', icon: 'eco', color: 'bg-green-100 text-green-800' },
  apio: { name: 'Apio', icon: 'eco', color: 'bg-lime-100 text-lime-800' },
  mostaza: { name: 'Mostaza', icon: 'restaurant', color: 'bg-yellow-100 text-yellow-800' },
  sesamo: { name: 'Sésamo', icon: 'grain', color: 'bg-amber-100 text-amber-800' },
  moluscos: { name: 'Moluscos', icon: 'set_meal', color: 'bg-indigo-100 text-indigo-800' },
  cacahuetes: { name: 'Cacahuetes', icon: 'nutrition', color: 'bg-orange-100 text-orange-800' },
  lupinos: { name: 'Lupinos', icon: 'eco', color: 'bg-emerald-100 text-emerald-800' }
};

export const detectAllergens = (text) => {
  if (!text) return [];
  const lowerText = text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const detected = [];

  for (const [allergen, keywords] of Object.entries(ALLERGEN_KEYWORDS)) {
    for (const keyword of keywords) {
      const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (lowerText.includes(normalizedKeyword)) {
        if (!detected.includes(allergen)) {
          detected.push(allergen);
        }
        break;
      }
    }
  }

  return detected;
};

export const getAllergenInfo = (allergen) => {
  return ALLERGEN_INFO[allergen] || { name: allergen, icon: 'warning', color: 'bg-gray-100 text-gray-800' };
};

export const ALLERGENS_LIST = Object.entries(ALLERGEN_INFO).map(([key, info]) => ({
  id: key,
  ...info
}));

const DAYS_MAP = {
  'lunes': 0, 'martes': 1, 'miercoles': 2, 'miércoles': 2,
  'jueves': 3, 'viernes': 4, 'sabado': 5, 'sábado': 5, 'domingo': 6
};

export const parseMenuText = (text) => {
  if (!text) return [];

  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  const days = [];
  let currentDay = null;

  const dayPattern = /^(lunes|martes|mi[eé]rcoles|jueves|viernes s[áa]bado|domingo)\s*(\d{1,2})?$/i;
  const datePattern = /^(\d{1,2})$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const dayMatch = lowerLine.match(/^(lunes|martes|miercoles|jueves|viernes|sabado|domingo)\s*(\d{1,2})?$/i);

    if (dayMatch) {
      if (currentDay) {
        days.push(currentDay);
      }
      const dayName = line.charAt(0).toUpperCase() + line.slice(1).toLowerCase().replace(/\s+\d+$/, '');
      const dateNum = dayMatch[2] || '';
      currentDay = {
        day: dayName,
        date: dateNum,
        lunch: '',
        dinner: '',
        allergens: []
      };
    } else if (currentDay) {
      if (!currentDay.lunch) {
        currentDay.lunch = line;
      } else if (!currentDay.dinner) {
        if (line.match(/^\d+\s*pax/) || line.includes('min') || line.includes('batch')) {
          // Skip metadata lines like "2 pax · 30 min"
        } else {
          currentDay.dinner = line;
        }
      } else {
        if (!line.match(/^\d+\s*pax/) && !line.includes('min') && !line.includes('batch')) {
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
