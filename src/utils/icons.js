// High Quality Clean 3D Vector Graphic Illustrations Library

export const FRUIT_SVGS = {
  lemon: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Lemon">
      <ellipse cx="60" cy="108" rx="34" ry="5" fill="#0f172a" opacity="0.12"/>
      <!-- Fat round lemon (easy to read at small size) -->
      <circle cx="60" cy="64" r="36" fill="#f4d03f"/>
      <circle cx="60" cy="64" r="36" fill="#f1c40f" opacity="0.28"/>
      <ellipse cx="46" cy="50" rx="12" ry="18" fill="#fffde7" opacity="0.5" transform="rotate(-30 46 50)"/>
      <ellipse cx="34" cy="48" rx="6" ry="5" fill="#d4a017"/>
      <ellipse cx="86" cy="78" rx="6" ry="5" fill="#d4a017"/>
      <path d="M72 26 Q 92 14, 100 32 Q 84 36, 72 26 Z" fill="#7cb342"/>
      <path d="M74 28 Q 88 20, 96 32" stroke="#558b2f" stroke-width="1.5" fill="none"/>
      <circle cx="70" cy="30" r="3.5" fill="#6d4c41"/>
    </svg>
  `,

  watermelon: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Watermelon">
      <defs>
        <radialGradient id="wm-flesh-3d" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#ff758f"/>
          <stop offset="50%" stop-color="#ff4d6d"/>
          <stop offset="85%" stop-color="#c9184a"/>
          <stop offset="100%" stop-color="#a4133c"/>
        </radialGradient>
        <linearGradient id="wm-rind-3d" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#52b788"/>
          <stop offset="30%" stop-color="#2d6a4f"/>
          <stop offset="100%" stop-color="#1b4332"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="42" ry="8" fill="#0f172a" opacity="0.14"/>
      <g filter="drop-shadow(3px 5px 5px rgba(0,0,0,0.18))">
        <path d="M 12 60 A 48 48 0 0 0 108 60 Z" fill="url(#wm-rind-3d)"/>
        <path d="M 16 60 A 44 44 0 0 0 104 60 Z" fill="#f1faee"/>
        <path d="M 20 60 A 40 40 0 0 0 100 60 Z" fill="url(#wm-flesh-3d)"/>
        <path d="M 26 60 A 34 34 0 0 0 50 88 Q 36 78 26 60 Z" fill="#ffffff" opacity="0.2"/>

        <g fill="#1e293b">
          <path d="M 38 68 C 36 65, 38 62, 40 65 C 42 68, 40 72, 38 72 C 36 72, 36 70, 38 68 Z"/>
          <circle cx="39" cy="66" r="0.8" fill="#ffffff" opacity="0.8"/>
          <path d="M 60 76 C 58 73, 60 70, 62 73 C 64 76, 62 80, 60 80 C 58 80, 58 78, 60 76 Z"/>
          <circle cx="61" cy="74" r="0.8" fill="#ffffff" opacity="0.8"/>
          <path d="M 80 68 C 78 65, 80 62, 82 65 C 84 68, 82 72, 80 72 C 78 72, 78 70, 80 68 Z"/>
          <circle cx="81" cy="66" r="0.8" fill="#ffffff" opacity="0.8"/>
          <path d="M 48 64 C 46 61, 48 58, 50 61 C 52 64, 50 68, 48 68 C 46 68, 46 66, 48 64 Z"/>
          <circle cx="49" cy="62" r="0.8" fill="#ffffff" opacity="0.8"/>
          <path d="M 70 64 C 68 61, 70 58, 72 61 C 74 64, 72 68, 70 68 C 68 68, 68 66, 70 64 Z"/>
          <circle cx="71" cy="62" r="0.8" fill="#ffffff" opacity="0.8"/>
        </g>
      </g>
    </svg>
  `,

  apple: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Green Apple">
      <defs>
        <radialGradient id="ap-body-3d" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#b5e7a0"/>
          <stop offset="30%" stop-color="#70e000"/>
          <stop offset="75%" stop-color="#38b000"/>
          <stop offset="100%" stop-color="#007200"/>
        </radialGradient>
        <linearGradient id="ap-leaf-3d" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9ef01a"/>
          <stop offset="100%" stop-color="#2b9348"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="34" ry="7" fill="#0f172a" opacity="0.14"/>
      <g filter="drop-shadow(3px 5px 5px rgba(0,0,0,0.18))">
        <path d="M 60 30 Q 64 16 72 14" stroke="#4a2c11" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <path d="M 62 22 Q 82 12 84 28 Q 68 34 62 22 Z" fill="url(#ap-leaf-3d)"/>
        <path d="M 62 22 Q 73 24 84 28" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.6"/>
        <path d="M 60 32 C 34 28 16 48 20 74 C 22 95 48 104 60 98 C 72 104 98 95 100 74 C 104 48 86 28 60 32 Z" fill="url(#ap-body-3d)"/>
        <ellipse cx="60" cy="34" rx="8" ry="3" fill="#004b00" opacity="0.3"/>
        <ellipse cx="40" cy="48" rx="8" ry="16" fill="#ffffff" opacity="0.3" transform="rotate(-25 40 48)"/>
      </g>
    </svg>
  `,

  grape: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Grapes">
      <defs>
        <radialGradient id="grp-sphere" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#c77dff"/>
          <stop offset="40%" stop-color="#9d4edd"/>
          <stop offset="85%" stop-color="#5a189a"/>
          <stop offset="100%" stop-color="#240046"/>
        </radialGradient>
        <linearGradient id="grp-vine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#74c69d"/>
          <stop offset="100%" stop-color="#1b4332"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="28" ry="6" fill="#0f172a" opacity="0.14"/>
      <g filter="drop-shadow(3px 5px 5px rgba(0,0,0,0.18))">
        <path d="M 60 30 Q 54 16 40 12" stroke="url(#grp-vine)" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <path d="M 60 30 Q 78 20 86 26 Q 72 36 60 30 Z" fill="url(#grp-vine)"/>

        <circle cx="44" cy="44" r="13" fill="url(#grp-sphere)"/>
        <circle cx="76" cy="44" r="13" fill="url(#grp-sphere)"/>
        <circle cx="60" cy="40" r="13" fill="url(#grp-sphere)"/>

        <circle cx="36" cy="62" r="13" fill="url(#grp-sphere)"/>
        <circle cx="60" cy="60" r="13" fill="url(#grp-sphere)"/>
        <circle cx="84" cy="62" r="13" fill="url(#grp-sphere)"/>

        <circle cx="48" cy="80" r="12" fill="url(#grp-sphere)"/>
        <circle cx="72" cy="80" r="12" fill="url(#grp-sphere)"/>

        <circle cx="60" cy="95" r="11" fill="url(#grp-sphere)"/>

        <circle cx="56" cy="55" r="3" fill="#ffffff" opacity="0.4"/>
        <circle cx="32" cy="57" r="3" fill="#ffffff" opacity="0.4"/>
        <circle cx="80" cy="57" r="3" fill="#ffffff" opacity="0.4"/>
        <circle cx="44" cy="75" r="2.8" fill="#ffffff" opacity="0.4"/>
        <circle cx="68" cy="75" r="2.8" fill="#ffffff" opacity="0.4"/>
        <circle cx="56" cy="90" r="2.5" fill="#ffffff" opacity="0.4"/>
      </g>
    </svg>
  `,

  strawberry: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Strawberry">
      <defs>
        <radialGradient id="sb-body-3d" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ff758f"/>
          <stop offset="35%" stop-color="#ff0054"/>
          <stop offset="75%" stop-color="#d90429"/>
          <stop offset="100%" stop-color="#780000"/>
        </radialGradient>
        <linearGradient id="sb-calyx" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#70e000"/>
          <stop offset="100%" stop-color="#2b9348"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="30" ry="7" fill="#0f172a" opacity="0.14"/>
      <g filter="drop-shadow(3px 5px 5px rgba(0,0,0,0.18))">
        <path d="M 60 102 C 26 86 16 52 28 34 C 36 22 84 22 92 34 C 104 52 94 86 60 102 Z" fill="url(#sb-body-3d)"/>
        <path d="M 32 38 C 28 52 34 76 52 90 Q 36 74 32 38 Z" fill="#ffffff" opacity="0.25"/>

        <g fill="#ffd166">
          <ellipse cx="42" cy="44" rx="2" ry="3"/>
          <ellipse cx="60" cy="42" rx="2" ry="3"/>
          <ellipse cx="78" cy="44" rx="2" ry="3"/>
          <ellipse cx="36" cy="60" rx="2" ry="3"/>
          <ellipse cx="53" cy="62" rx="2" ry="3"/>
          <ellipse cx="70" cy="62" rx="2" ry="3"/>
          <ellipse cx="84" cy="60" rx="2" ry="3"/>
          <ellipse cx="45" cy="78" rx="1.8" ry="2.8"/>
          <ellipse cx="62" cy="80" rx="1.8" ry="2.8"/>
          <ellipse cx="75" cy="78" rx="1.8" ry="2.8"/>
          <ellipse cx="60" cy="92" rx="1.5" ry="2.2"/>
        </g>

        <path d="M 60 28 L 44 14 Q 54 24 60 28 L 76 14 Q 66 24 60 28 Z" fill="url(#sb-calyx)"/>
        <path d="M 60 28 Q 36 28 26 22 Q 40 34 60 28 Z" fill="url(#sb-calyx)"/>
        <path d="M 60 28 Q 84 28 94 22 Q 80 34 60 28 Z" fill="url(#sb-calyx)"/>
        <path d="M 60 28 Q 58 14 52 10" stroke="#38b000" stroke-width="4" fill="none" stroke-linecap="round"/>
      </g>
    </svg>
  `,

  mango: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Mango">
      <defs>
        <radialGradient id="mg-body-3d" cx="30%" cy="30%" r="75%">
          <stop offset="0%" stop-color="#ffe6a7"/>
          <stop offset="30%" stop-color="#ffb703"/>
          <stop offset="70%" stop-color="#fb8500"/>
          <stop offset="100%" stop-color="#d90429"/>
        </radialGradient>
      </defs>
      <ellipse cx="62" cy="106" rx="34" ry="7" fill="#0f172a" opacity="0.14"/>
      <g filter="drop-shadow(3px 5px 5px rgba(0,0,0,0.18))">
        <path d="M 52 24 Q 48 14 40 12" stroke="#4a2c11" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M 52 24 Q 64 14 76 16 Q 66 26 52 24 Z" fill="#38b000"/>
        <path d="M 52 24 C 88 22 100 54 92 80 C 82 106 48 104 34 86 C 18 62 26 28 52 24 Z" fill="url(#mg-body-3d)"/>
        <ellipse cx="46" cy="44" rx="8" ry="18" fill="#ffffff" opacity="0.3" transform="rotate(-20 46 44)"/>
      </g>
    </svg>
  `,

  avocado: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Avocado">
      <defs>
        <linearGradient id="avo-skin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1b4332"/>
          <stop offset="100%" stop-color="#081c15"/>
        </linearGradient>
        <radialGradient id="avo-flesh" cx="50%" cy="65%" r="60%">
          <stop offset="0%" stop-color="#d8f3dc"/>
          <stop offset="60%" stop-color="#b7e4c7"/>
          <stop offset="100%" stop-color="#74c69d"/>
        </radialGradient>
        <radialGradient id="avo-seed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9c6644"/>
          <stop offset="100%" stop-color="#582f0e"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="34" ry="7" fill="#0f172a" opacity="0.14"/>
      <g filter="drop-shadow(3px 5px 5px rgba(0,0,0,0.18))">
        <path d="M 50 15 C 34 15 22 35 22 62 C 22 80 34 88 50 88 C 66 88 78 80 78 62 C 78 35 66 15 50 15 Z" fill="url(#avo-skin)"/>
        <path d="M 50 20 C 37 20 26 38 26 62 C 26 77 36 84 50 84 C 64 84 74 77 74 62 C 74 38 63 20 50 20 Z" fill="url(#avo-flesh)"/>
        <circle cx="50" cy="63" r="15" fill="url(#avo-seed)"/>
        <circle cx="45" cy="58" r="3.5" fill="#ffffff" opacity="0.3"/>
      </g>
    </svg>
  `,

  mangosteen: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Mangosteen">
      <defs>
        <radialGradient id="ms-peel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5a189a"/>
          <stop offset="100%" stop-color="#240046"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="7" fill="#0f172a" opacity="0.14"/>
      <g filter="drop-shadow(3px 5px 5px rgba(0,0,0,0.18))">
        <circle cx="50" cy="22" r="4" fill="#38b000"/>
        <path d="M 50 22 C 38 10 24 26 40 30 Z" fill="#70e000"/>
        <path d="M 50 22 C 62 10 76 26 60 30 Z" fill="#70e000"/>
        <path d="M 50 22 C 34 32 46 40 50 30 Z" fill="#38b000"/>
        <path d="M 50 22 C 66 32 54 40 50 30 Z" fill="#38b000"/>
        <circle cx="50" cy="58" r="30" fill="url(#ms-peel)"/>
        <ellipse cx="38" cy="46" rx="5" ry="10" fill="#ffffff" opacity="0.2" transform="rotate(-20 38 46)"/>
      </g>
    </svg>
  `,

  pineapple: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Pineapple">
      <defs>
        <linearGradient id="pa-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffb703"/>
          <stop offset="100%" stop-color="#fb8500"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="30" ry="6" fill="#0f172a" opacity="0.14"/>
      <g filter="drop-shadow(3px 5px 5px rgba(0,0,0,0.18))">
        <path d="M 50 35 L 35 10 Q 45 22 50 35 Z" fill="#38b000"/>
        <path d="M 50 35 L 65 10 Q 55 22 50 35 Z" fill="#38b000"/>
        <path d="M 50 35 L 50 5 Q 50 20 50 35 Z" fill="#70e000"/>
        <path d="M 50 35 L 26 18 Q 40 28 50 35 Z" fill="#70e000"/>
        <path d="M 50 35 L 74 18 Q 60 28 50 35 Z" fill="#70e000"/>
        <rect x="26" y="34" width="48" height="54" rx="24" fill="url(#pa-body)"/>
        <path d="M 32 44 L 68 76 M 30 58 L 60 84 M 40 36 L 72 64 M 68 44 L 32 76 M 70 58 L 40 84 M 60 36 L 28 64" stroke="#d4a373" stroke-width="2" opacity="0.6"/>
      </g>
    </svg>
  `,

  orange: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Orange">
      <defs>
        <linearGradient id="og-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffaa00"/>
          <stop offset="100%" stop-color="#ff7b00"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="7" fill="#0f172a" opacity="0.14"/>
      <g filter="drop-shadow(3px 5px 5px rgba(0,0,0,0.18))">
        <path d="M 50 20 Q 65 10 70 18 Q 58 26 50 20 Z" fill="#38b000"/>
        <circle cx="50" cy="22" r="2.5" fill="#4a2c11"/>
        <circle cx="50" cy="56" r="32" fill="url(#og-grad)"/>
        <ellipse cx="38" cy="42" rx="5" ry="10" fill="#ffffff" opacity="0.25" transform="rotate(-30 38 42)"/>
      </g>
    </svg>
  `,

  cherry: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Cherry">
      <defs>
        <linearGradient id="ch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff0054"/>
          <stop offset="100%" stop-color="#800020"/>
        </linearGradient>
      </defs>
      <ellipse cx="64" cy="108" rx="40" ry="6" fill="#0f172a" opacity="0.14"/>
      <g filter="drop-shadow(3px 5px 5px rgba(0,0,0,0.18))">
        <path d="M 34 60 C 32 35 48 18 52 14" stroke="#52b788" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M 68 64 C 64 40 52 22 52 14" stroke="#52b788" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M 52 14 Q 66 8 72 16 Q 60 22 52 14 Z" fill="#38b000"/>
        <circle cx="34" cy="66" r="18" fill="url(#ch-grad)"/>
        <circle cx="68" cy="70" r="18" fill="url(#ch-grad)"/>
        <circle cx="28" cy="58" r="4" fill="#ffffff" opacity="0.3"/>
        <circle cx="62" cy="62" r="4" fill="#ffffff" opacity="0.3"/>
      </g>
    </svg>
  `,

  durian: `
    <svg viewBox="0 0 120 120" class="fruit-svg-icon" alt="Durian">
      <defs>
        <radialGradient id="dur-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#aacc00"/>
          <stop offset="100%" stop-color="#55a630"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="36" ry="7" fill="#0f172a" opacity="0.14"/>
      <g filter="drop-shadow(3px 5px 5px rgba(0,0,0,0.18))">
        <path d="M 50 20 Q 48 12 42 10" stroke="#4a2c11" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="50" cy="58" rx="28" ry="32" fill="url(#dur-grad)"/>
        <path d="M 22 58 L 14 56 L 23 50 L 16 42 L 27 42 L 22 32 L 32 36 L 30 26 L 40 32 L 44 22 L 52 30 L 58 22 L 62 32 L 72 28 L 70 38 L 80 36 L 76 46 L 86 48 L 78 56 L 86 62 L 76 66 L 82 74 L 70 74 L 72 84 L 60 80 L 56 90 L 46 84 L 40 92 L 34 82 L 26 86 L 28 76 L 18 72 L 24 66 Z" fill="#2b9348"/>
      </g>
    </svg>
  `
};

export const UI_ICONS = {
  soundOn: `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  soundOff: `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M23 9l-6 6M17 9l6 6"></path></svg>`,
  star: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#ffb703" stroke="#f59e0b" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  trophy: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" fill="#ffb703"></path></svg>`,
  speaker: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  lock: `<svg viewBox="0 0 24 24" width="22" height="22" stroke="#64748b" stroke-width="2" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="#cbd5e1"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  navMatch: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke-dasharray="3 2"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5" stroke-dasharray="3 2"></rect></svg>`,
  navQuiz: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  navMemory: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>`,
  navSorting: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
  navSpelling: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`,
  navBlender: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l1 7a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6L6 3z"></path><path d="M9 21h6"></path><path d="M12 16v5"></path></svg>`,
  navGarden: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-9"></path><path d="M12 13C8 13 5 9 5 5c4 0 7 3 7 8z"></path><path d="M12 13c4 0 7-4 7-8-4 0-7 4-7 8z"></path></svg>`,
  navAlbum: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,

  seedStage: `<svg viewBox="0 0 60 60" width="55" height="55"><ellipse cx="30" cy="46" rx="20" ry="6" fill="#6c584c" opacity="0.6"/><ellipse cx="30" cy="42" r="7" fill="#8d5b4c"/><path d="M 30 38 Q 28 26 22 20 Q 32 24 30 38 Z" fill="#52b788"/><circle cx="30" cy="42" r="3" fill="#582f0e"/></svg>`,
  sproutStage: `<svg viewBox="0 0 60 60" width="65" height="65"><ellipse cx="30" cy="48" rx="22" ry="6" fill="#6c584c" opacity="0.6"/><path d="M 30 46 Q 30 24 30 16" stroke="#40916c" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M 30 28 Q 16 14 10 24 Q 24 28 30 28 Z" fill="#74c69d"/><path d="M 30 20 Q 44 8 50 18 Q 36 22 30 20 Z" fill="#52b788"/></svg>`,
  flowerStage: `<svg viewBox="0 0 60 60" width="65" height="65"><ellipse cx="30" cy="50" rx="22" ry="5" fill="#6c584c" opacity="0.6"/><path d="M 30 48 L 30 14" stroke="#2d6a4f" stroke-width="4" fill="none"/><circle cx="20" cy="18" r="7" fill="#ff70a6"/><circle cx="40" cy="18" r="7" fill="#ff70a6"/><circle cx="30" cy="8" r="7" fill="#ff70a6"/><circle cx="30" cy="28" r="7" fill="#ff70a6"/><circle cx="30" cy="18" r="7" fill="#ffb703"/></svg>`
};
