import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coins, 
  Clock, 
  Sparkles, 
  Brain, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Lock, 
  Zap,
  Info
} from 'lucide-react';
import { UserProfile, BusinessModel } from '../types';

interface DiagnosticSimulatorProps {
  onPlanScroll: () => void;
}

const BUSINESS_MODELS_DB: Omit<BusinessModel, 'compatibility'>[] = [
  {
    name: "Servicios Digitales con IA",
    category: "Servicios / Freelance",
    description: "Crear contenido, copywriting, traducción o diseño utilizando herramientas de IA para entregar 10 veces más rápido.",
    minCapital: 0,
    minHoursPerDay: 2,
    difficulty: "Bajo",
    pros: ["Casi $0 de inversión inicial", "Resultados rápidos", "Fácil de aprender con IA"],
    cons: ["Vendes tu tiempo", "Requiere hablar con clientes"],
    icon: "Brain"
  },
  {
    name: "Marketing de Afiliados Orgánico",
    category: "Ventas / Productos Digitales",
    description: "Promocionar productos digitales de otras personas a través de videos cortos (TikTok/Reels) sin mostrar tu rostro y ganar comisiones de hasta 80%.",
    minCapital: 50,
    minHoursPerDay: 2,
    difficulty: "Bajo",
    pros: ["Sin inventario ni soporte", "Altas comisiones", "Escalable de forma orgánica"],
    cons: ["Dependencia de algoritmos", "Requiere consistencia diaria"],
    icon: "TrendingUp"
  },
  {
    name: "Agencia de Automatización de Procesos (SaaS/AI)",
    category: "B2B / Agencia",
    description: "Ayudar a empresas locales a automatizar su atención al cliente, agendas de citas o base de datos usando bots de IA y Make.com.",
    minCapital: 100,
    minHoursPerDay: 3,
    difficulty: "Medio",
    pros: ["Ingresos recurrentes altos", "Baja competencia local", "Gran valor percibido"],
    cons: ["Requiere cierta curva técnica", "Llamadas de venta B2B"],
    icon: "Zap"
  },
  {
    name: "Infoproductos y Micro-cursos",
    category: "Educación / Marca Personal",
    description: "Empaquetar un conocimiento específico que ya posees en un PDF, plantilla de Notion o curso corto en video y venderlo en Hotmart.",
    minCapital: 20,
    minHoursPerDay: 2,
    difficulty: "Medio",
    pros: ["100% de margen de ganancia", "Ingresos pasivos continuos", "Construye marca propia"],
    cons: ["Requiere crear contenido", "Curva de aprendizaje en ventas"],
    icon: "Sparkles"
  },
  {
    name: "Dropshipping con Tráfico de Pago",
    category: "eCommerce",
    description: "Vender productos físicos importados de China a través de Shopify, haciendo anuncios en TikTok Ads y sin comprar inventario previo.",
    minCapital: 800,
    minHoursPerDay: 3,
    difficulty: "Alto",
    pros: ["Fácil de automatizar", "Potencial de escala masivo", "Mercado global"],
    cons: ["Requiere capital alto para anuncios", "Márgenes de ganancia reducidos", "Soporte al cliente complejo"],
    icon: "Coins"
  },
  {
    name: "Amazon FBA (Private Label)",
    category: "eCommerce / Retail",
    description: "Fabricar tu propia marca en China y enviarla a las bodegas de Amazon para que ellos la empaqueten, envíen y den soporte técnico.",
    minCapital: 2500,
    minHoursPerDay: 2,
    difficulty: "Alto",
    pros: ["Modelo muy sólido a largo plazo", "Tráfico masivo de Amazon", "Activo de alto valor"],
    cons: ["Inversión inicial muy alta", "Logística compleja", "Márgenes presionados por tarifas"],
    icon: "Lock"
  }
];

export default function DiagnosticSimulator({ onPlanScroll }: DiagnosticSimulatorProps) {
  const [profile, setProfile] = useState<UserProfile>({
    capital: 200,
    hours: 2,
    experience: 'Principiante',
    preferredArea: 'Sin preferencia'
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<BusinessModel[] | null>(null);
  const [progress, setProgress] = useState(0);

  const handleCalculate = () => {
    setIsCalculating(true);
    setProgress(0);
    setResults(null);

    // Dynamic loader simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const calculated = calculateCompatibility(profile);
            setResults(calculated);
            setIsCalculating(false);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const calculateCompatibility = (prof: UserProfile): BusinessModel[] => {
    return BUSINESS_MODELS_DB.map((model) => {
      let score = 100;

      // 1. Capital validation (Critical)
      if (prof.capital < model.minCapital) {
        // Severe penalty if under minimal investment needed
        const diff = model.minCapital - prof.capital;
        if (diff > 1000) score -= 65;
        else if (diff > 500) score -= 45;
        else score -= 30;
      } else {
        // Bonus for having optimal capital
        score += 5;
      }

      // 2. Time available validation (Critical)
      if (prof.hours < model.minHoursPerDay) {
        const diffTime = model.minHoursPerDay - prof.hours;
        score -= diffTime * 15;
      } else {
        score += 5;
      }

      // 3. Experience level alignment
      if (prof.experience === 'Principiante') {
        if (model.difficulty === 'Alto') score -= 30;
        if (model.difficulty === 'Medio') score -= 10;
        if (model.difficulty === 'Bajo') score += 15;
      } else if (prof.experience === 'Intermedio') {
        if (model.difficulty === 'Alto') score -= 10;
        if (model.difficulty === 'Medio') score += 15;
        if (model.difficulty === 'Bajo') score += 5;
      } else if (prof.experience === 'Avanzado') {
        score += 15; // Higher experience accommodates any difficulty
      }

      // 4. Area Match
      if (prof.preferredArea !== 'Sin preferencia') {
        if (prof.preferredArea === 'Servicios' && model.category.includes('Servicios')) score += 15;
        if (prof.preferredArea === 'Ventas' && model.category.includes('Ventas')) score += 15;
        if (prof.preferredArea === 'eCommerce' && model.category.includes('eCommerce')) score += 15;
      }

      // Normalize bounds
      const finalCompatibility = Math.max(15, Math.min(99, score));

      return {
        ...model,
        compatibility: finalCompatibility
      };
    })
    // Sort by highest compatibility
    .sort((a, b) => b.compatibility - a.compatibility);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Bajo': return 'bg-accent/10 text-accent border border-accent/25';
      case 'Medio': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Alto': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getModelIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-primary" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-primary" />;
      case 'Zap': return <Zap className="w-5 h-5 text-primary" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-primary" />;
      case 'Coins': return <Coins className="w-5 h-5 text-primary" />;
      case 'Lock': return <Lock className="w-5 h-5 text-primary" />;
      default: return <Sparkles className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div id="diagnostico-interactivo" className="w-full max-w-4xl mx-auto bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8 border-b border-slate-800 pb-5">
        <div className="p-2 bg-primary/10 rounded-xl border border-primary/30">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider">Radar de Ingresos Simulator</h3>
          <p className="text-xs sm:text-sm text-slate-400">Configura tu perfil para un diagnóstico preliminar inmediato</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isCalculating && !results && (
          <motion.div
            key="configurator"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Input Controls */}
            <div className="space-y-6">
              {/* Capital Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-primary" /> Capital para Invertir
                  </label>
                  <span className="text-base font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
                    {profile.capital === 5000 ? '+$5,000' : profile.capital === 0 ? '$0 USD' : `$${profile.capital} USD`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={profile.capital > 1000 ? 1000 : profile.capital}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setProfile(prev => ({ ...prev, capital: val === 1000 ? 1500 : val }));
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>$0 (Sin Capital)</span>
                  <span>$250</span>
                  <span>$500</span>
                  <span>$1,000+</span>
                </div>
                <div className="flex gap-2 items-center mt-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                  <button
                    type="button"
                    onClick={() => setProfile(prev => ({ ...prev, capital: 50 }))}
                    className={`px-2 py-1 text-xs rounded transition-all ${profile.capital === 50 ? 'bg-primary text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    Bajo ($50)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfile(prev => ({ ...prev, capital: 300 }))}
                    className={`px-2 py-1 text-xs rounded transition-all ${profile.capital === 300 ? 'bg-primary text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    Medio ($300)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfile(prev => ({ ...prev, capital: 2500 }))}
                    className={`px-2 py-1 text-xs rounded transition-all ${profile.capital === 2500 ? 'bg-primary text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    Alto ($2500+)
                  </button>
                </div>
              </div>

              {/* Hours Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> Tiempo Disponible Diario
                  </label>
                  <span className="text-base font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
                    {profile.hours} {profile.hours === 1 ? 'hora' : 'horas'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={profile.hours}
                  onChange={(e) => setProfile(prev => ({ ...prev, hours: Number(e.target.value) }))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1 hora (Mínimo)</span>
                  <span>4 horas</span>
                  <span>8 horas (Completo)</span>
                </div>
              </div>
            </div>

            {/* Experience & Area Selectors */}
            <div className="space-y-6">
              {/* Experience Select */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" /> Tu Nivel de Experiencia
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Principiante', 'Intermedio', 'Avanzado'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, experience: lvl }))}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all duration-200 uppercase tracking-wider text-center ${
                        profile.experience === lvl
                          ? 'bg-primary text-white border-primary shadow-md shadow-primary/10'
                          : 'bg-slate-800/40 text-slate-400 border-slate-700/60 hover:border-slate-600 hover:text-slate-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Área que más te llama la atención
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Sin preferencia', label: 'Sin preferencia' },
                    { id: 'Servicios', label: 'Servicios de IA' },
                    { id: 'Ventas', label: 'Marketing/Afiliados' },
                    { id: 'eCommerce', label: 'eCommerce/Tiendas' }
                  ].map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, preferredArea: area.id }))}
                      className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all duration-200 text-left ${
                        profile.preferredArea === area.id
                          ? 'bg-primary/15 text-primary border-primary/60'
                          : 'bg-slate-800/40 text-slate-400 border-slate-700/60 hover:border-slate-600 hover:text-slate-200'
                      }`}
                    >
                      {area.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="md:col-span-2 border-t border-slate-800 pt-6 mt-2">
              <button
                type="button"
                onClick={handleCalculate}
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm sm:text-base uppercase tracking-wider transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                Analizar Mi Perfil Ahora <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-center text-[10px] text-slate-500 mt-3 flex items-center justify-center gap-1">
                <Info className="w-3.5 h-3.5" /> Simulador gratuito basado en los parámetros del algoritmo Radar de Ingresos
              </p>
            </div>
          </motion.div>
        )}

        {isCalculating && (
          <motion.div
            key="calculator-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 flex flex-col items-center justify-center min-h-[350px]"
          >
            <div className="relative w-24 h-24 mb-6">
              {/* Spinner */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-primary animate-spin" />
              <div className="absolute inset-3 rounded-full bg-slate-950 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>
            
            <h4 className="text-lg font-bold text-white text-center mb-2 uppercase tracking-wide">
              Escaneando Modelos de Negocio...
            </h4>
            
            <div className="w-full max-w-xs bg-slate-800 h-2 rounded-full overflow-hidden mt-2 mb-4">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-xs text-slate-400 space-y-1 h-6 text-center italic">
              {progress < 30 && "Cruzando presupuesto con costes de infraestructura..."}
              {progress >= 30 && progress < 70 && "Analizando tiempo disponible para evitar sobrecarga..."}
              {progress >= 70 && progress < 100 && "Calculando nivel de dificultad técnica de 15 rutas..."}
              {progress === 100 && "¡Diagnóstico listo!"}
            </div>
          </motion.div>
        )}

        {!isCalculating && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Top recommendation banner */}
            <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest bg-primary text-white px-2 py-0.5 rounded uppercase">
                  Recomendación Principal
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                  {results[0].name}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Tu perfil es ideal para este modelo según tus {profile.hours} horas diarias y presupuesto de ${profile.capital}.
                </p>
              </div>
              <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-primary/30 text-center self-stretch sm:self-auto flex sm:flex-col justify-between sm:justify-center items-center gap-2">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Compatibilidad</span>
                <span className="text-2xl font-black text-primary leading-none">
                  {results[0].compatibility}%
                </span>
              </div>
            </div>

            {/* Results Grid - Top 3 models */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.slice(0, 3).map((model, idx) => (
                <div 
                  key={model.name}
                  className={`bg-slate-950/60 border rounded-2xl p-5 relative transition-all duration-300 hover:border-slate-700 ${
                    idx === 0 ? 'border-primary/50 shadow-lg shadow-primary/5' : 'border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-slate-900 rounded-lg border border-slate-800">
                        {getModelIcon(model.icon)}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white tracking-tight leading-tight">{model.name}</h5>
                        <span className="text-[10px] text-slate-500 font-medium">{model.category}</span>
                      </div>
                    </div>
                    {idx > 0 && (
                      <span className="text-xs font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                        {model.compatibility}%
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4 h-12 overflow-hidden">
                    {model.description}
                  </p>

                  <div className="flex items-center gap-3 mb-4 text-[11px] border-y border-slate-900 py-2">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Coins className="w-3.5 h-3.5 text-primary/80" />
                      <span>Inversión: <strong>{model.minCapital === 0 ? '$0' : `+$${model.minCapital}`}</strong></span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-primary/80" />
                      <span>Mínimo: <strong>{model.minHoursPerDay}h/día</strong></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${getDifficultyColor(model.difficulty)}`}>
                        Dificultad {model.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Pros checklist */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent">Ventajas clave:</span>
                    {model.pros.slice(0, 2).map((pro, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span className="truncate">{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Lock Overlay section representing limited trial version */}
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-amber-500/20 rounded-2xl p-5 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                <AlertCircle className="w-5 h-5 text-amber-500/50" />
              </div>
              <h5 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-1">Diagnóstico Parcial Desbloqueado</h5>
              <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed mb-4">
                El sistema de diagnóstico completo analiza tu compatibilidad contra <strong>15 modelos digitales</strong>, detecta riesgos críticos de abandono y genera automáticamente tu <strong>Hoja de Ruta de 30 Días</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  type="button"
                  onClick={onPlanScroll}
                  className="px-5 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 shadow-md shadow-primary/20"
                >
                  <Lock className="w-3.5 h-3.5" /> Desbloquear Mi Hoja de Ruta de 30 Días
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setResults(null);
                  }}
                  className="text-xs text-slate-400 hover:text-white underline font-semibold transition"
                >
                  Probar con otro presupuesto
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
