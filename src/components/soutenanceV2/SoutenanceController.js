import act1 from './Act1_Intro.js';
import act2 from './Act2_Diagnostic.js';
import act3 from './Act3_Prescription.js';
import act4 from './Act4_Garanties.js';
import act5 from './Act5_Budget.js';

// TEMP for now while we build them:
const allSlides = [
  ...act1,
  ...act2,
  ...act3,
  ...act4,
  ...act5
];

export default function SoutenanceController(state) {
  const currentStep = state.soutenanceV2Step || 1;
  const subStep = state.soutenanceV2SubStep || 0;
  const slide = allSlides[currentStep - 1];

  if (!slide) {
    return `<div class="p-8 text-white h-screen flex items-center justify-center bg-[#08090c] text-2xl font-mono text-slate-500">Fin de la présentation</div>`;
  }

  // Calculate progress
  const progressPct = ((currentStep - 1) / Math.max(allSlides.length - 1, 1)) * 100;

  return `
    <div class="h-screen w-full flex flex-col bg-[#08090c] text-slate-200 overflow-hidden font-sans relative selection:bg-emerald-500/30 selection:text-white">
      
      <!-- Subtle Background Glows -->
      <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <!-- Header V2 -->
      <header class="h-16 shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-transparent relative z-10">
         <div class="flex items-center gap-4">
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            <span class="text-emerald-400 font-bold tracking-widest text-[10px] uppercase">${slide.actName}</span>
            <span id="presentation-timer" class="ml-4 font-mono text-[11px] tracking-widest text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded border border-white/10 hidden">00:00</span>
         </div>
         <button id="btn-quit-v2" class="px-4 py-1.5 text-xs font-semibold bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-lg text-slate-400 hover:text-red-400 transition-all flex items-center gap-2">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            Quitter V2
         </button>
      </header>

      <!-- Main Slide Container -->
      <main class="flex-1 min-h-0 relative flex items-center justify-center px-12 py-8 z-10">
         <div class="w-full h-full relative" id="v2-slide-container">
            ${slide.render(state)}
         </div>
      </main>

      <!-- Footer V2 (Controls & Progress) -->
      <footer class="h-20 shrink-0 border-t border-white/5 flex flex-col justify-end bg-transparent relative z-10">
          
          <!-- Progress Bar Top Edge -->
          <div class="w-full h-1 bg-slate-900 absolute top-0 left-0">
             <div class="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 ease-out" style="width: ${progressPct}%"></div>
          </div>

          <div class="flex items-center justify-between px-8 h-full pb-2">
            <!-- Left: Counters -->
            <div class="flex items-center gap-3">
               <span class="text-[10px] text-slate-500 font-mono tracking-widest font-bold">SLIDE ${String(currentStep).padStart(2, '0')}</span>
               <span class="text-slate-700">/</span>
               <span class="text-[10px] text-slate-600 font-mono tracking-widest">${String(allSlides.length).padStart(2, '0')}</span>
            </div>
            
            <!-- Center: Controls -->
            <div class="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
               <button id="btn-v2-prev" class="text-slate-500 hover:text-white p-2 bg-white/5 hover:bg-white/10 rounded-xl transition ${(currentStep === 1 && subStep === 0) ? 'opacity-30 cursor-not-allowed' : ''}">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
               </button>
               <span class="text-[11px] text-white font-semibold tracking-wider px-4 uppercase min-w-[200px] text-center">${slide.label}</span>
               <button id="btn-v2-next" class="text-slate-500 hover:text-white p-2 bg-white/5 hover:bg-white/10 rounded-xl transition ${(currentStep === allSlides.length && subStep === (slide.subSteps || 0)) ? 'opacity-30 cursor-not-allowed' : ''}">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
               </button>
            </div>

            <!-- Right: Watermark -->
            <div class="text-[10px] text-slate-600 uppercase font-black tracking-widest flex items-center gap-2">
               GSBLAB <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span> 2026
            </div>
          </div>
      </footer>
    </div>
  `;
}

export function bindSoutenanceEvents(renderApp) {
  const btnQuit = document.getElementById('btn-quit-v2');
  if (btnQuit) {
    btnQuit.addEventListener('click', () => {
      window.appState.isSoutenanceV2 = false;
      renderApp();
    });
  }

  // --- Timer Logic ---
  const currentStep = window.appState.soutenanceV2Step || 1;
  const currentSubStep = window.appState.soutenanceV2SubStep || 0;
  
  if (currentStep === 1) {
      window.appState.presentationStartTime = null;
      window.appState.presentationEndTime = null;
  } else if (currentStep === 2 && !window.appState.presentationStartTime) {
      window.appState.presentationStartTime = Date.now();
      window.appState.presentationEndTime = null;
  }
  
  if (currentStep === allSlides.length && currentSubStep === 4) {
      if (window.appState.presentationStartTime && !window.appState.presentationEndTime) {
          window.appState.presentationEndTime = Date.now();
      }
  } else {
      window.appState.presentationEndTime = null;
  }

  const updateTimer = () => {
      const timerEl = document.getElementById('presentation-timer');
      if (!timerEl) return;
      
      if (!window.appState.presentationStartTime) {
          timerEl.classList.add('hidden');
          return;
      }
      timerEl.classList.remove('hidden');
      
      const end = window.appState.presentationEndTime || Date.now();
      const diff = Math.floor((end - window.appState.presentationStartTime) / 1000);
      const m = String(Math.floor(diff / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      timerEl.innerText = `${m}:${s}`;
      
      if (window.appState.presentationEndTime) {
         timerEl.classList.add('text-emerald-400');
         timerEl.classList.remove('text-slate-400');
      } else {
         timerEl.classList.remove('text-emerald-400');
         timerEl.classList.add('text-slate-400');
      }
  };

  if (window.presentationTimerInterval) {
      clearInterval(window.presentationTimerInterval);
  }
  updateTimer();
  window.presentationTimerInterval = setInterval(updateTimer, 1000);
  // --- End Timer Logic ---

  const navigate = (dir) => {
     const currentSlide = allSlides[window.appState.soutenanceV2Step - 1];
     const maxSubSteps = currentSlide?.subSteps || 0;
     let subStep = window.appState.soutenanceV2SubStep || 0;

     // Handle internal sub-steps
     if (dir === 1 && subStep < maxSubSteps) {
         window.appState.soutenanceV2SubStep = subStep + 1;
         renderApp();
         return;
     } else if (dir === -1 && subStep > 0) {
         window.appState.soutenanceV2SubStep = subStep - 1;
         renderApp();
         return;
     }

     // Handle slide-to-slide navigation
     let next = window.appState.soutenanceV2Step + dir;
     if (next >= 1 && next <= allSlides.length) {
         window.appState.soutenanceV2Step = next;
         // If moving backwards, go to the LAST sub-step of the previous slide
         const nextSlide = allSlides[next - 1];
         window.appState.soutenanceV2SubStep = (dir === -1 && nextSlide.subSteps) ? nextSlide.subSteps : 0;
         renderApp();
     }
  };

  const btnPrev = document.getElementById('btn-v2-prev');
  const btnNext = document.getElementById('btn-v2-next');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => navigate(-1));
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => navigate(1));
  }
}
