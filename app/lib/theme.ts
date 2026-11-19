export const THEME_STORAGE_KEY = 'theme'

// Roda no <head> antes da pintura para aplicar o tema salvo (ou o do sistema)
// sem "piscar" o modo claro ao carregar a página.
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`
