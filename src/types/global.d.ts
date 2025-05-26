// src/types/global.d.ts
declare namespace lucide {
  function createIcons(options?: any): void;
}

interface Window {
  lucide?: typeof lucide;
}