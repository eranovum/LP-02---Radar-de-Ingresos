import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Gift, 
  Sparkles, 
  Clock, 
  Lock, 
  HelpCircle, 
  Check, 
  Info,
  TrendingUp,
  Award,
  AlertCircle
} from 'lucide-react';
import DiagnosticSimulator from './components/DiagnosticSimulator';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<'basic' | 'vip'>('vip');

  const openCheckout = (planId: 'basic' | 'vip') => {
    setCheckoutPlan(planId);
    setIsCheckoutOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden antialiased">
      
      {/* Floating Trust Header (Desktop & Mobile optimized) */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo removed per request */}
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Pago 100% Seguro
            </span>
            <button
              onClick={() => scrollToSection('ofertas')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition duration-200"
            >
              Comenzar Ahora
            </button>
          </div>
        </div>
      </header>

      {/* BLOCK 1: Hero Section (DARK Background) */}
      <section className="relative pt-8 pb-16 sm:pb-24 lg:pt-16 lg:pb-32 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-12 right-10 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top Tagline */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/35 text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> El primer filtro de compatibilidad para emprendedores
            </span>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-none mb-3">
              RADAR DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">INGRESOS</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest text-slate-400 mb-8 max-w-2xl mx-auto">
              Acaba con el miedo de elegir el negocio equivocado
            </h2>

            {/* Paragraph Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Descubre en solo 15 minutos cuál es la mejor forma de generar ingresos adicionales según tu dinero, tu tiempo y tus habilidades. Sin perder meses probando ideas que nunca funcionan.
            </p>

            {/* Direct CTA & Pricing Recap (Pre-Simulator) */}
            <div className="mb-14 flex flex-col items-center justify-center gap-3">
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <span className="text-slate-500 line-through">Antes $87</span>
                <span className="text-white font-black text-xl sm:text-2xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                  Hoy solo <span className="text-emerald-400">$25</span>
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Acceso inmediato. Garantía de 7 días.
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                  onClick={() => openCheckout('basic')}
                  className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm uppercase tracking-widest transition duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20"
                >
                  QUIERO DESCUBRIR MI RUTA <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('diagnostico-seccion')}
                  className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 hover:border-slate-700 font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition duration-300"
                >
                  Probar Simulador Gratis
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Diagnostic Tool Section representing [Imagen de la herramienta mostrando el diagnóstico] */}
          <div id="diagnostico-seccion" className="mt-8 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent h-1/3 bottom-0 z-10 pointer-events-none" />
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Vista de la herramienta</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Simulador de Diagnóstico Radar</h2>
            </div>
            
            <DiagnosticSimulator onPlanScroll={() => scrollToSection('ofertas')} />
          </div>

        </div>
      </section>

      {/* BLOCK 2: Key Deliverables (LIGHT Background) */}
      <section className="py-20 bg-slate-50 text-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-emerald-600 text-xs sm:text-sm font-extrabold uppercase tracking-widest">Contenido del Diagnóstico</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Lo que vas a desbloquear
            </h2>
            <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 space-y-6 sm:space-y-8 max-w-2xl mx-auto">
            <div className="flex gap-4 items-start">
              <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0 mt-0.5">
                <Check className="w-5 h-5 font-black" />
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900">Un diagnóstico personalizado</strong> que elimina las ideas que no son compatibles contigo.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0 mt-0.5">
                <Check className="w-5 h-5 font-black" />
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900">Un plan de acción de 30 días</strong> listo para ejecutar desde el primer día.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0 mt-0.5">
                <Check className="w-5 h-5 font-black" />
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900">La ruta con mayor probabilidad de éxito</strong> según tu capital y tiempo disponible.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0 mt-0.5">
                <Check className="w-5 h-5 font-black" />
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900">Ahorro de meses de prueba y error</strong> evitando negocios que no encajan contigo.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0 mt-0.5">
                <Check className="w-5 h-5 font-black" />
              </div>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900">Claridad absoluta</strong> sobre qué hacer después de terminar el diagnóstico.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => scrollToSection('ofertas')}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg transition duration-200"
            >
              Quiero Desbloquear Mi Ruta Ahora
            </button>
          </div>
        </div>
      </section>

      {/* BLOCK 3: Agitation & Problem (DARK/SLATE contrasting background) */}
      <section className="py-20 bg-slate-900 text-slate-100 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-widest">El gran problema digital</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 leading-tight uppercase">
              Deja de adivinar. Empieza con un plan.
            </h2>
            <div className="w-16 h-1 bg-emerald-400 mx-auto mt-4" />
          </div>

          {/* Copy block faithfully reproduced in highly readable, rhythmic editorial spacing */}
          <div className="space-y-6 text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed">
            <p>Cada día aparecen nuevas formas de ganar dinero.</p>
            
            {/* Tag cloud layout for business models to look beautiful */}
            <div className="flex flex-wrap gap-2 py-3 my-4">
              {['Dropshipping', 'Afiliados', 'Amazon', 'IA', 'Criptomonedas', 'Cursos', 'Freelance'].map((model) => (
                <span key={model} className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 font-semibold tracking-wide">
                  {model}
                </span>
              ))}
            </div>

            <p>Todos prometen lo mismo.</p>
            <p className="border-l-4 border-emerald-500 pl-4 py-1 text-white font-medium my-6 italic">
              Pero nadie responde la única pregunta que realmente importa:
              <span className="block text-xl sm:text-2xl font-black text-emerald-400 not-italic mt-1">¿Cuál funciona para TI?</span>
            </p>

            <p>La mayoría pierde meses porque empieza por el negocio equivocado.</p>
            
            <div className="grid grid-cols-2 gap-3 max-w-sm py-4">
              {['Compra cursos.', 'Ve cientos de videos.', 'Invierte dinero.', 'Y termina abandonando.'].map((step, idx) => (
                <div key={idx} className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 text-xs sm:text-sm font-medium text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <p>
              No porque sea incapaz. <br />
              <strong className="text-white font-semibold">Sino porque eligió una ruta incompatible con su realidad.</strong>
            </p>

            <div className="h-px bg-slate-800/80 my-8" />

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 my-8">
              <p className="text-base sm:text-lg text-white font-extrabold uppercase mb-2 text-emerald-400">
                Radar de Ingresos hace exactamente lo contrario.
              </p>
              <p className="text-sm sm:text-base mb-4 text-slate-300">
                Analiza tu situación actual. Tu presupuesto. Tu tiempo libre. Tus habilidades. Y elimina automáticamente todas las opciones que no tienen sentido para ti.
              </p>
              <p className="text-sm sm:text-base font-bold text-slate-200">
                Al final recibes una sola respuesta: La que tiene mayores probabilidades de funcionar para tu caso.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center py-4 text-xs sm:text-sm uppercase tracking-wider text-slate-400 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Sin humo</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Sin teorías</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Sin perder otro año intentándolo descubrirlo por tu cuenta</div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 4: How it Works (LIGHT background with step-by-step cards) */}
      <section className="py-20 bg-white text-slate-900 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 text-xs sm:text-sm font-extrabold uppercase tracking-widest">El Proceso</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Cómo funciona
            </h2>
            <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 hover:shadow-lg transition duration-300 flex flex-col justify-between">
              <div>
                <span className="text-emerald-600 text-xs font-black uppercase tracking-widest block mb-1">Paso 01</span>
                <h3 className="text-xl font-extrabold text-slate-900 mb-4">Diagnóstico Inteligente</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Responde unas preguntas simples sobre tu tiempo disponible, capital, experiencia y objetivos.
                </p>
              </div>
              <div className="text-xs text-slate-500 font-semibold italic mt-6 border-t border-slate-200/80 pt-4">
                En menos de 15 minutos el sistema entiende exactamente tu situación.
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 hover:shadow-lg transition duration-300 flex flex-col justify-between">
              <div>
                <span className="text-emerald-600 text-xs font-black uppercase tracking-widest block mb-1">Paso 02</span>
                <h3 className="text-xl font-extrabold text-slate-900 mb-4">Análisis de Compatibilidad</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Radar de Ingresos compara tu perfil con 15 modelos de negocio digitales.
                </p>
              </div>
              <div className="text-xs text-slate-500 font-semibold italic mt-6 border-t border-slate-200/80 pt-4">
                Descarta automáticamente los que representan demasiado riesgo o requieren más recursos de los que tienes.
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 hover:shadow-lg transition duration-300 flex flex-col justify-between">
              <div>
                <span className="text-emerald-600 text-xs font-black uppercase tracking-widest block mb-1">Paso 03</span>
                <h3 className="text-xl font-extrabold text-slate-900 mb-4">Tu Plan de 30 Días</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Recibes una hoja de ruta clara. Qué hacer. Qué evitar. Qué aprender primero. Y cómo comenzar a validar tu negocio desde la primera semana.
                </p>
              </div>
              <div className="text-xs text-slate-500 font-semibold italic mt-6 border-t border-slate-200/80 pt-4">
                El mapa definitivo para no dar pasos en falso.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 5: Real Example (Soft warning/Highlight background) */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-50/80 border-2 border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute -top-3 -right-3 w-20 h-20 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-600">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-wider">Ejemplo real</h3>
            </div>

            <div className="text-sm sm:text-base text-slate-700 space-y-4 font-medium leading-relaxed">
              <p>
                Imagina que dispones de solo <strong className="text-slate-900">2 horas al día</strong> y <strong className="text-slate-900">$200</strong> para invertir.
              </p>
              <p>
                La mayoría de cursos intentará venderte Amazon FBA o eCommerce.
              </p>
              <p className="text-rose-600 font-bold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100 inline-block text-xs sm:text-sm">
                Radar de Ingresos detectará que esas opciones consumen demasiado capital y demasiado tiempo.
              </p>
              <p>
                En su lugar puede recomendar un modelo basado en servicios digitales, creación de contenido o marketing de afiliados, acompañado de un plan específico para validar la idea durante los siguientes 30 días.
              </p>
              
              <div className="pt-4 border-t border-amber-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p className="text-slate-900 font-bold text-sm sm:text-base">
                  No recibes información genérica. Recibes un camino diseñado para tus condiciones actuales.
                </p>
                <button
                  onClick={() => scrollToSection('ofertas')}
                  className="px-4 py-2 bg-slate-950 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition"
                >
                  Conseguir Mi Ruta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 6: Bonuses (DARK background, premium layout) */}
      <section className="py-20 bg-slate-950 text-slate-100 relative border-t border-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-1">
              <Gift className="w-4 h-4 animate-bounce" /> Oferta Especial Limitada
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 uppercase tracking-tight">
              Además recibirás estos BONOS GRATIS
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3">Al elegir el Plan VIP obtienes acceso ilimitado a todo este material premium sin pagar un centavo extra</p>
            <div className="w-16 h-1 bg-emerald-400 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Bonus 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded text-emerald-400">
                    Bono 1
                  </span>
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20 line-through">
                    Valor: $39
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">Biblioteca de 50 Ideas de Negocios Validadas</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Descubre oportunidades clasificadas por inversión inicial, dificultad y tiempo requerido.
                </p>
                <div className="space-y-1.5 border-t border-slate-950/80 pt-4">
                  {['Negocios desde cero', 'Modelos con baja inversión', 'Ideas para trabajar desde casa', 'Compatible con empleo completo'].map((b) => (
                    <div key={b} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800/40 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                ✓ Incluido Gratis en VIP
              </div>
            </div>

            {/* Bonus 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded text-emerald-400">
                    Bono 2
                  </span>
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20 line-through">
                    Valor: $67
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">Curso: Cómo Validar una Idea Sin Perder Dinero</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Aprende a comprobar si un negocio realmente tiene potencial antes de invertir meses de trabajo.
                </p>
                <div className="space-y-1.5 border-t border-slate-950/80 pt-4">
                  {['Investigación de mercado', 'Validación rápida', 'Errores que debes evitar', 'Cómo encontrar demanda real'].map((b) => (
                    <div key={b} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800/40 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                ✓ Incluido Gratis en VIP
              </div>
            </div>

            {/* Bonus 3 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded text-emerald-400">
                    Bono 3
                  </span>
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20 line-through">
                    Valor: $49
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">Pack de 200 Prompts de IA para Emprendedores</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Prompts listos para usar con ChatGPT y otras herramientas de IA de vanguardia.
                </p>
                <div className="space-y-1.5 border-t border-slate-950/80 pt-4">
                  {['Investigación de nichos', 'Ideas de productos', 'Creación de contenido', 'Ventas y Automatización'].map((b) => (
                    <div key={b} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800/40 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                ✓ Incluido Gratis en VIP
              </div>
            </div>

            {/* Bonus 4 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between md:col-span-1 lg:col-span-1">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded text-emerald-400">
                    Bono 4
                  </span>
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20 line-through">
                    Valor: $27
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">Sistema de Organización de 30 Días</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Una plantilla lista para ejecutar tu plan de acción diario sin perder jamás el enfoque.
                </p>
                <div className="space-y-1.5 border-t border-slate-950/80 pt-4">
                  {['Calendario de ejecución', 'Seguimiento semanal', 'Objetivos diarios', 'Control de progreso visual'].map((b) => (
                    <div key={b} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800/40 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                ✓ Incluido Gratis en VIP
              </div>
            </div>

            {/* Bonus 5 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded text-emerald-400">
                    Bono 5
                  </span>
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20 line-through">
                    Valor: $97
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">Curso Express: Consigue tus Primeros Clientes</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Aprende a generar tus primeras ventas desde cero absoluto, incluso si todavía no tienes audiencia construida.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-slate-950/80 pt-4">
                  {['Estrategias orgánicas efectivas', 'Uso óptimo de Redes Sociales', 'Mensajes y guiones de venta', 'Tácticas de conversión inmediata'].map((b) => (
                    <div key={b} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800/40 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                ✓ Incluido Gratis en VIP
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BLOCK 7: Pricing Section (LIGHT/DARK comparison cards) */}
      <section id="ofertas" className="py-20 bg-slate-900 relative border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-widest">Inversión Mínima, Retorno Máximo</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 uppercase tracking-tight">
              Elige cómo quieres empezar
            </h2>
            <div className="w-16 h-1 bg-emerald-400 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            
            {/* Plan Basico Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full inline-block mb-4">
                  Acceso Esencial
                </span>
                <h3 className="text-2xl font-black text-white mb-2">PLAN BÁSICO</h3>
                <p className="text-xs text-slate-400 mb-6">Determina tu ruta óptima de ingresos y pon en marcha el plan diario.</p>
                
                <div className="flex items-baseline gap-2 mb-6 border-b border-slate-900 pb-6">
                  <span className="text-slate-500 line-through text-base">$87 USD</span>
                  <span className="text-4xl font-black text-white">$25</span>
                  <span className="text-xs text-slate-400">USD / Pago Único</span>
                </div>

                <div className="space-y-4">
                  <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider block">Incluye:</span>
                  {[
                    'Radar de Ingresos Completo',
                    'Diagnóstico personalizado exhaustivo',
                    'Plan de acción estructurado de 30 días',
                    'Acceso inmediato de por vida',
                    'Garantía incondicional de 7 días'
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => openCheckout('basic')}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 hover:border-slate-700 font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition"
                >
                  QUIERO EL PLAN BÁSICO
                </button>
                <span className="text-[10px] text-slate-500 text-center block mt-3">✓ Descarga digital instantánea en formato PDF</span>
              </div>
            </div>

            {/* Plan VIP Card */}
            <div className="bg-slate-950 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-400 transition-all duration-300 relative shadow-2xl shadow-emerald-500/5">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow">
                ¡Opción Recomendada!
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 px-3 py-1 rounded-full inline-block mb-4 mt-1">
                  Kit Completo de Emprendimiento
                </span>
                <h3 className="text-2xl font-black text-white mb-2">PLAN VIP</h3>
                <p className="text-xs text-slate-400 mb-6">Todo lo necesario para validar y conseguir clientes rápidos sin depender de más cursos.</p>
                
                <div className="flex items-baseline gap-2 mb-6 border-b border-slate-900 pb-6">
                  <span className="text-slate-500 line-through text-base">$366 USD</span>
                  <span className="text-4xl font-black text-emerald-400">$47</span>
                  <span className="text-xs text-slate-400">USD / Pago Único</span>
                </div>

                <div className="space-y-4">
                  <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider block">Incluye TODO lo anterior MÁS:</span>
                  {[
                    '✔ Biblioteca de 50 Ideas de Negocios',
                    '✔ Curso de Validación de Ideas Rápida',
                    '✔ Pack de 200 Prompts de IA Premium',
                    '✔ Sistema de Organización Integrado (Notion)',
                    '✔ Curso Express: Consigue Primeros Clientes'
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <strong className="font-semibold text-white">{feat}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-900">
                <p className="text-[11px] text-slate-400 italic mb-4 leading-relaxed">
                  Es la opción elegida por quienes quieren evitar comprar más cursos en el futuro y tener todas las herramientas necesarias desde el primer día.
                </p>
                <button
                  type="button"
                  onClick={() => openCheckout('vip')}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm uppercase tracking-widest transition duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 animate-pulse"
                >
                  QUIERO EL PLAN VIP <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] text-slate-500 text-center block mt-3">✓ Acceso inmediato de por vida. Valor de mercado $366</span>
              </div>
            </div>

          </div>

          {/* Secure Badges */}
          <div className="mt-14 max-w-md mx-auto p-4 bg-slate-950/40 rounded-2xl border border-slate-800 flex items-center justify-center gap-6">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Pago Cifrado SSL
            </div>
            <div className="text-slate-700">|</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Award className="w-4 h-4 text-emerald-400" /> Garantía de 7 Días
            </div>
          </div>

        </div>
      </section>

      {/* BLOCK 8: Summary & Final Push (A contrasting warm background) */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 relative border-t border-slate-850">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-widest">En Resumen</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 leading-tight uppercase">
              Resumiendo
            </h2>
            <div className="w-16 h-1 bg-emerald-400 mx-auto mt-4" />
          </div>

          <div className="space-y-6 text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed">
            <p>Seguir probando negocios al azar tiene un costo.</p>
            <p className="text-white font-semibold">Cada mes perdido significa tiempo, dinero y oportunidades que no vuelven.</p>
            <p>Radar de Ingresos elimina esa incertidumbre.</p>
            <p>En solo unos minutos sabrás exactamente cuál es el mejor camino para ti y tendrás un plan claro para comenzar.</p>

            {/* List with distinct structure */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2.5 my-6">
              {['Sin cursos interminables.', 'Sin información contradictoria.', 'Sin perder otro año buscando respuestas.'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p>Y si durante los primeros 7 días sientes que esta herramienta no era para ti, simplemente solicitas el reembolso.</p>

            {/* Sub-list representing trust */}
            <div className="flex gap-4 sm:gap-6 py-2 text-xs sm:text-sm uppercase font-bold text-slate-400">
              <div>✓ Sin preguntas</div>
              <div>✓ Sin complicaciones</div>
              <div>✓ Sin riesgo</div>
            </div>

            <div className="h-px bg-slate-800/80 my-8" />

            <p className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
              La decisión es sencilla.
            </p>
            <p className="italic text-slate-400">
              Puedes seguir cambiando de idea cada semana...
            </p>
            <p className="text-xl font-extrabold text-emerald-400">
              O descubrir hoy mismo cuál es la ruta con mayores probabilidades de cambiar tus ingresos.
            </p>

            <div className="pt-6">
              <button
                onClick={() => openCheckout('vip')}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm uppercase tracking-widest transition duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30"
              >
                QUIERO ACCEDER AHORA <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 9: About Author (Sleek professional card layout) */}
      <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl flex flex-col md:flex-row items-center gap-8 max-w-3xl mx-auto">
            {/* Visual Author Initials Emblem (instead of a broken external face placeholder) */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-950 text-emerald-400 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg text-2xl sm:text-3xl font-black tracking-widest shrink-0 uppercase">
              RI
            </div>

            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 inline-block">
                El creador
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Sobre el autor</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Este sistema fue creado para ayudar a personas que desean construir una fuente de ingresos adicional sin abandonar su empleo ni invertir grandes cantidades de dinero.
              </p>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Su objetivo es reemplazar la incertidumbre por un plan claro, práctico y adaptado a la realidad de cada usuario, permitiéndole avanzar con confianza desde el primer día.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer with copyright */}
      <footer className="bg-slate-950 text-slate-500 py-10 border-t border-slate-900 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 Radar de Ingresos. Todos los derechos reservados.</p>
          <p className="text-[10px] text-slate-600 max-w-md mx-auto">
            Descargo de responsabilidad: Las proyecciones de ganancias y casos mostrados son simulaciones con fines informativos. Tu éxito individual depende de la ejecución real del plan y esfuerzo.
          </p>
        </div>
      </footer>

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        initialPlanId={checkoutPlan} 
      />

    </div>
  );
}
