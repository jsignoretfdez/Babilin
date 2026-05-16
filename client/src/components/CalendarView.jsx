import { getAllergenInfo, ALLERGENS_LIST } from '../utils/allergens';

const CalendarView = ({ menuData }) => {
  if (!menuData || menuData.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">restaurant</span>
        <p className="font-body-lg text-on-surface-variant">No hay datos de menú disponibles</p>
      </div>
    );
  }

  const dayColors = {
    'Lunes': 'bg-primary-container/20 border-primary-container/30',
    'Martes': 'bg-tertiary-container/20 border-tertiary-container/30',
    'Miércoles': 'bg-secondary-container/20 border-secondary-container/30',
    'Jueves': 'bg-primary-container/20 border-primary-container/30',
    'Viernes': 'bg-tertiary-container/20 border-tertiary-container/30'
  };

  const dayAccents = {
    'Lunes': 'text-primary',
    'Martes': 'text-tertiary',
    'Miércoles': 'text-secondary',
    'Jueves': 'text-primary',
    'Viernes': 'text-tertiary'
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="glass-card rounded-2xl p-4 shadow-sm">
        <p className="font-label-sm text-on-surface-variant mb-3">Alérgenos detectados:</p>
        <div className="flex flex-wrap gap-2">
          {ALLERGENS_LIST.map(({ id, name, icon, color }) => (
            <span key={id} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
              <span className="material-symbols-outlined text-sm">{icon}</span>
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {menuData.map((day, index) => {
          return (
            <div
              key={index}
              className={`glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                day.isFiesta ? 'opacity-75' : ''
              } ${dayColors[day.day] || 'bg-white/50 border-white'}`}
            >
              {/* Day Header */}
              <div className={`px-4 py-3 border-b border-outline-variant/20 ${day.isFiesta ? 'bg-error-container/30' : ''}`}>
                <div className="flex justify-between items-center">
                  <h3 className={`font-headline-sm text-lg ${dayAccents[day.day] || 'text-primary'}`}>
                    {day.day}
                  </h3>
                  {day.date && (
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-label-lg ${
                      day.isFiesta ? 'bg-error-container text-error' : 'bg-white/70 text-primary'
                    }`}>
                      {day.date}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {day.isFiesta ? (
                  /* Holiday */
                  <div className="text-center py-4">
                    <span className="material-symbols-outlined text-4xl text-error mb-2">celebration</span>
                    <p className="font-headline-sm text-error">Festivo</p>
                    <p className="font-body-sm text-on-surface-variant mt-1">Escuela cerrada</p>
                  </div>
                ) : (
                  /* Normal day with meals */
                  <>
                    {/* Lunch */}
                    {day.lunch && (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="material-symbols-outlined text-tertiary text-lg">restaurant</span>
                          <p className="font-label-sm text-tertiary uppercase tracking-wider">Primero</p>
                        </div>
                        <p className="font-body-md text-on-surface leading-relaxed">{day.lunch}</p>
                      </div>
                    )}

                    {/* Dinner */}
                    {day.dinner && (
                      <div className="pt-3 border-t border-outline-variant/20">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="material-symbols-outlined text-secondary text-lg">dinner_dining</span>
                          <p className="font-label-sm text-secondary uppercase tracking-wider">Segundo</p>
                        </div>
                        <p className="font-body-md text-on-surface leading-relaxed">{day.dinner}</p>
                      </div>
                    )}

                    {/* Allergens */}
                    {day.allergens && day.allergens.length > 0 && (
                      <div className="pt-3 border-t border-outline-variant/20">
                        <p className="font-label-sm text-on-surface-variant mb-2">Alérgenos:</p>
                        <div className="flex flex-wrap gap-1">
                          {day.allergens.map((allergen) => {
                            const info = getAllergenInfo(allergen);
                            return (
                              <span
                                key={allergen}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${info.color}`}
                                title={info.name}
                              >
                                <span className="material-symbols-outlined text-xs">{info.icon}</span>
                                {info.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
