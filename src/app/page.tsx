'use client';

import Example from '../components/Example';
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
                <Example />
            </main>
        </ThemeProvider>
    );
}
