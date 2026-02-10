import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeMode = 'auto' | 'day' | 'night';
export type ResolvedTheme = 'day' | 'night';

interface ThemeContextType {
    mode: ThemeMode;
    resolvedTheme: ResolvedTheme;
    setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'sterring-theme-mode';

function getSystemTheme(): ResolvedTheme {
    if (typeof window === 'undefined') return 'night';
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'day' : 'night';
}

function getStoredMode(): ThemeMode {
    if (typeof window === 'undefined') return 'auto';
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'auto' || stored === 'day' || stored === 'night') {
            return stored;
        }
    } catch (e) {
        console.warn('Failed to read theme from localStorage:', e);
    }
    return 'auto';
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
    if (mode === 'auto') {
        return getSystemTheme();
    }
    return mode;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setModeState] = useState<ThemeMode>(getStoredMode);
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(getStoredMode()));

    // Apply theme to document
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', resolvedTheme);

        // Add transition class after initial render to prevent flash
        const timer = setTimeout(() => {
            root.classList.add('theme-transition');
        }, 100);

        return () => clearTimeout(timer);
    }, [resolvedTheme]);

    // Listen to system theme changes when in auto mode
    useEffect(() => {
        if (mode !== 'auto') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

        const handleChange = (e: MediaQueryListEvent) => {
            setResolvedTheme(e.matches ? 'day' : 'night');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [mode]);

    const setMode = (newMode: ThemeMode) => {
        setModeState(newMode);
        setResolvedTheme(resolveTheme(newMode));

        try {
            localStorage.setItem(STORAGE_KEY, newMode);
        } catch (e) {
            console.warn('Failed to save theme to localStorage:', e);
        }
    };

    return (
        <ThemeContext.Provider value={{ mode, resolvedTheme, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
