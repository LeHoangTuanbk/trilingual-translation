export function ThemeScript() {
  const themeScript = `
    try {
      const theme = localStorage.getItem('color-theme');
      const isDark = theme === 'dark' || (!theme && matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', isDark);
    } catch {}
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
