import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { route as ziggyRoute } from 'ziggy-js';
import { TooltipProvider } from '@/components/ui/tooltip';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

declare global {
    var route: typeof ziggyRoute;
}
window.route = ziggyRoute;

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const pages = import.meta.glob('./pages/**/*.{tsx,jsx}');
        const path = `./pages/${name}.jsx`;
        const pathTsx = `./pages/${name}.tsx`;

        if (pages[path]) return (await pages[path]()).default;
        if (pages[pathTsx]) return (await pages[pathTsx]()).default;

        console.error(`❌ Página no encontrada: ${name}`);
        console.error('📁 Páginas disponibles:', Object.keys(pages));
        throw new Error(`Page not found: ${name}`);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <TooltipProvider delayDuration={0}>
                <App {...props} />
            </TooltipProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
