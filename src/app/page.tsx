'use client';

import Nightsky from '../components/Nightsky';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Home() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <main>
                <Nightsky />
            </main>
        </ThemeProvider>
    );
}
