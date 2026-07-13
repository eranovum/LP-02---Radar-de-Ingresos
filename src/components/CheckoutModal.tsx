import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  Check, 
  Download, 
  Sparkles, 
  X, 
  Gift, 
  ArrowRight,
  TrendingUp,
  FileText,
  Bookmark,
  Calendar,
  MessageSquare,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Plan } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId: 'basic' | 'vip';
}

export default function CheckoutModal({ isOpen, onClose, initialPlanId }: CheckoutModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'vip'>(initialPlanId);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cardNum, setCardNum] = useState('4242 •••• •••• 4242');
  const [cvv, setCvv] = useState('***');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync initial plan
  useEffect(() => {
    setSelectedPlan(initialPlanId);
  }, [initialPlanId, isOpen]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setError('Por favor, completa tu nombre y correo electrónico.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate payment gateway connection
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  const getPrice = () => {
    return selectedPlan === 'vip' ? 47 : 25;
  };

  const getOriginalPrice = () => {
    return selectedPlan === 'vip' ? 366 : 87;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl relative z-10 overflow-hidden text-slate-100 flex flex-col md:flex-row my-8 max-h-[90vh] md:max-h-none overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-950/40 hover:bg-slate-950 transition z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <>
                {/* Left Side: Order Summary & Bonuses (Dynamic) */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/40 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1 mb-2">
                      <ShieldCheck className="w-4 h-4 text-primary" /> Resumen de Compra Segura
                    </span>
                    <h3 className="text-xl font-extrabold text-white mb-4">Tu Acceso a Radar de Ingresos</h3>

                    {/* Plan Selector Toggle */}
                    <div className="grid grid-cols-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 mb-6">
                      <button
                        type="button"
                        onClick={() => setSelectedPlan('basic')}
                        className={`py-2 text-xs font-bold rounded-lg transition-all ${
                          selectedPlan === 'basic'
                            ? 'bg-slate-800 text-white shadow'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Plan Básico ($25)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPlan('vip')}
                        className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                          selectedPlan === 'vip'
                            ? 'bg-primary text-white shadow font-extrabold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Plan VIP ($47) <Sparkles className="w-3 h-3 animate-bounce" />
                      </button>
                    </div>

                    {/* Included Deliverables List */}
                    <div className="space-y-3.5 mb-6">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Incluido en tu compra:</span>
                      
                      <div className="flex gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-200 block">Radar de Ingresos Completo</strong>
                          <span className="text-xs text-slate-400">Diagnóstico interactivo contra 15 modelos.</span>
                        </div>
                      </div>

                      <div className="flex gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-200 block">Tu Plan de Acción de 30 Días</strong>
                          <span className="text-xs text-slate-400">Guía paso a paso lista para ejecutar.</span>
                        </div>
                      </div>

                      {/* VIP bonuses list */}
                      {selectedPlan === 'vip' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-3 pt-3 border-t border-slate-800/80"
                        >
                          <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-1">
                            <Gift className="w-3.5 h-3.5" /> Bonos VIP Activados (Ahorro Masivo):
                          </span>
                          
                          <div className="flex gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>Bono 1: 50 Ideas de Negocios Validadas <strong className="text-amber-400">($39)</strong></span>
                          </div>
                          
                          <div className="flex gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>Bono 2: Curso Validar Sin Perder Dinero <strong className="text-amber-400">($67)</strong></span>
                          </div>

                          <div className="flex gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>Bono 3: 200 Prompts de IA para Emprendedores <strong className="text-amber-400">($49)</strong></span>
                          </div>

                          <div className="flex gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>Bono 4: Sistema de Organización de 30 Días <strong className="text-amber-400">($27)</strong></span>
                          </div>

                          <div className="flex gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>Bono 5: Curso Express: Consigue Clientes <strong className="text-amber-400">($97)</strong></span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Pricing recap */}
                  <div className="border-t border-slate-800 pt-5 mt-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm text-slate-400">Valor Real:</span>
                      <span className="text-sm text-slate-500 line-through">${getOriginalPrice()} USD</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-base font-extrabold text-white">Pago Único Hoy:</span>
                      <span className="text-3xl font-black text-accent">${getPrice()} USD</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Sin suscripciones recurrentes. Garantía de reembolso por 7 días.
                    </p>
                  </div>
                </div>

                {/* Right Side: Secure Checkout Form */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Paso Final</h4>
                    <p className="text-xs text-slate-400 mb-6">Rellena los campos para recibir tu acceso de manera inmediata en tu correo.</p>

                    <form onSubmit={handleCheckout} className="space-y-4">
                      {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-xs flex gap-2 items-center">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Nombre Completo</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Juan Pérez"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary transition"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Correo Electrónico</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="juan@ejemplo.com"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary transition"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Método de Pago Seguro (Simulador)</label>
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <CreditCard className="w-5 h-5 text-primary" />
                            <div>
                              <input
                                type="text"
                                disabled
                                value={cardNum}
                                className="bg-transparent text-sm text-slate-300 w-36 focus:outline-none focus:border-none"
                              />
                              <span className="text-[10px] text-slate-500 block">Tarjeta en modo Sandbox</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">CVV: {cvv}</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-500 leading-relaxed text-center py-2">
                        Esta es una transacción simulada segura. Al hacer clic abajo, simularás la activación inmediata del producto y accederás a las herramientas del plan.
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-xl text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-55"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            Procesando Conexión Segura...
                          </>
                        ) : (
                          <>
                            Adquirir {selectedPlan === 'vip' ? 'Plan VIP' : 'Plan Básico'} <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  <div className="flex items-center justify-center gap-6 text-[10px] text-slate-500 mt-6 pt-4 border-t border-slate-800/60">
                    <div className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-primary" /> Secure SSL
                    </div>
                    <div>•</div>
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" /> 7 Días de Garantía
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Success Panel: Immersive Digital Product Dashboard Preview */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full p-6 sm:p-10 flex flex-col items-center text-center relative"
              >
                <div className="p-3 bg-primary/10 rounded-full border border-primary/30 text-primary mb-4 animate-bounce">
                  <Sparkles className="w-10 h-10" />
                </div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-primary mb-1">¡Acceso Concedido Exitosamente!</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">¡Bienvenido a Radar de Ingresos, {name}!</h3>
                <p className="text-sm text-slate-400 max-w-lg mt-2 mb-8">
                  Hemos enviado un correo de bienvenida a <strong className="text-slate-200">{email}</strong> con tus credenciales de por vida. Ya puedes comenzar a utilizar tus herramientas e informes interactivos abajo:
                </p>

                {/* Digital Assets Mock Container */}
                <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-5 text-left mb-8 max-w-3xl">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-900">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-xs font-bold uppercase text-white tracking-widest">Mi Escritorio de Miembro — Plan {selectedPlan.toUpperCase()}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Deliverable 1 */}
                    <div className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex gap-3 items-start transition duration-200">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <strong className="text-xs font-bold text-white block truncate">Radar de Ingresos Completo</strong>
                        <span className="text-[10px] text-slate-400 block mb-2">Diagnóstico inteligente ilimitado</span>
                        <a 
                          href="#diagnostico-interactivo" 
                          onClick={onClose}
                          className="text-[11px] font-bold text-primary hover:text-primary-dark flex items-center gap-0.5"
                        >
                          Ir al simulador completo <ChevronRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Deliverable 2 */}
                    <div className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex gap-3 items-start transition duration-200">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Download className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <strong className="text-xs font-bold text-white block truncate">Plan de Acción (30 Días)</strong>
                        <span className="text-[10px] text-slate-400 block mb-2">Hoja de ruta PDF estructurada</span>
                        <button 
                          onClick={() => triggerToast('✓ Descargando "Radar_De_Ingresos_Plan_30_Dias_v2.pdf" (1.8MB)')}
                          className="text-[11px] font-bold text-primary hover:text-primary-dark flex items-center gap-0.5"
                        >
                          Descargar PDF (Gratis) <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* VIP Bonuses if VIP */}
                    {selectedPlan === 'vip' ? (
                      <>
                        <div className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex gap-3 items-start transition duration-200">
                          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                            <Bookmark className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <strong className="text-xs font-bold text-white block truncate">50 Ideas & Guía Validación</strong>
                            <span className="text-[10px] text-slate-400 block mb-2">Biblioteca premium integrada</span>
                            <button 
                              onClick={() => triggerToast('✓ Abriendo Biblioteca de 50 Ideas de Negocios Validadas en tu navegador')}
                              className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-0.5"
                            >
                              Explorar Biblioteca <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex gap-3 items-start transition duration-200">
                          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <strong className="text-xs font-bold text-white block truncate">Sistema 30 Días & 200 Prompts</strong>
                            <span className="text-[10px] text-slate-400 block mb-2">Plantillas listas para copiar</span>
                            <button 
                              onClick={() => triggerToast('✓ Descargando plantilla de Notion para organización y pack de prompts')}
                              className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-0.5"
                            >
                              Descargar Pack <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="sm:col-span-2 bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-center">
                        <p className="text-xs text-slate-400">
                          Adquiriste el <strong>Plan Básico</strong>. ¿Quieres actualizar y desbloquear la Biblioteca de 50 Ideas, el Pack de 200 Prompts de IA y los Cursos de Ventas y Validación por solo <strong>$22 USD adicionales</strong>?
                        </p>
                        <button
                          onClick={() => setSelectedPlan('vip')}
                          className="mt-3.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition"
                        >
                          Actualizar a Plan VIP por $22
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs uppercase tracking-wider font-bold rounded-xl transition"
                  >
                    Cerrar Escritorio
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerToast('Soporte Radar de Ingresos: Conectando con agente soporte...')}
                    className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs uppercase tracking-wider font-bold rounded-xl transition"
                  >
                    ¿Necesitas Ayuda? Soporte 24/7
                  </button>
                </div>

                {toastMessage && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-950 border border-primary/50 text-white text-xs py-2.5 px-5 rounded-xl shadow-2xl flex items-center gap-2 font-semibold">
                    <Sparkles className="w-4 h-4 text-primary shrink-0 animate-pulse" />
                    <span>{toastMessage}</span>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
