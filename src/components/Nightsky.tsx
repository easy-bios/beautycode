import React, { useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import { exampleCode, highlightLanguages } from '../constants';
import { themes } from '../themes';
import { toJpeg } from 'html-to-image';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import Image from 'next/image';
import download from 'downloadjs';

function Example() {
    const [code, setCode] = useState(exampleCode);
    const [language, setLanguage] = useState('auto');
    const [theme, setTheme] = useState('nightsky');
    const [square, setSquare] = useState(false);
    const [image, setImage] = useState('');
    const codeRef = useRef<HTMLDivElement>(null);

    const captureImage = async () => {
        if (codeRef.current === null) return;

        const data = await toJpeg(codeRef.current);

        process.env.NODE_ENV === 'development'
            ? setImage(data)
            : download(data, 'beautycode.jpeg');
    };

    const highligtedCode =
        language === 'auto'
            ? hljs.highlightAuto(code)
            : hljs.highlight(code, { language, ignoreIllegals: true });

    return (
        <>
            <style jsx global>{`
                body {
                    background: ${themes[theme].background};
                    color: ${themes[theme].color};
                }
            `}</style>

            <h1>BeautyCode</h1>
            <p>Create beautiful Code Screenshots in seconds!</p>
            <FormGroup sx={{ width: '100%', gap: '1rem' }}>
                <TextField
                    label="Enter your code here:"
                    multiline
                    minRows={7}
                    variant="outlined"
                    sx={{
                        '& > div': {
                            background: themes[theme].codeBackground,
                            color: themes[theme].codeColor,
                        },
                    }}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />

                <FormControl fullWidth>
                    <InputLabel id="select-language">Language</InputLabel>
                    <Select
                        labelId="select-language"
                        id="language"
                        value={language}
                        label="Language"
                        onChange={(e) => setLanguage(e.target.value)}
                        sx={{
                            '& > div': {
                                background: themes[theme].codeBackground,
                            },
                        }}
                    >
                        <MenuItem value={'auto'} sx={{ fontStyle: 'italic' }}>
                            auto
                        </MenuItem>
                        {Object.entries(highlightLanguages).map(
                            ([key, value]) => {
                                return (
                                    <MenuItem value={key} key={key}>
                                        {value}
                                    </MenuItem>
                                );
                            }
                        )}
                    </Select>
                </FormControl>

                {/* <FormControl fullWidth>
                    <InputLabel id="select-theme">Theme</InputLabel>
                    <Select
                        labelId="select-theme"
                        id="theme"
                        value={theme}
                        label="Theme"
                        onChange={(e) => setTheme(e.target.value)}
                        sx={{
                            '& > div': {
                                background: themes[theme].codeBackground,
                            },
                        }}
                    >
                        {Object.entries(themes).map(([key, value]) => {
                            return (
                                <MenuItem value={key} key={key}>
                                    {value.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl> */}

                <FormControlLabel
                    control={
                        <Checkbox
                            value={square}
                            onChange={(e) => setSquare(e.target.checked)}
                        />
                    }
                    label="Square Image"
                />
            </FormGroup>

            <div
                style={{
                    background: themes[theme].codeBackground,
                    border: '1px solid #fff4',
                    borderRadius: themes[theme].borderRadius,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1em',
                }}
                ref={codeRef}
            >
                <pre
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1em',
                        background: '#0008',
                        border: '1px solid #fff8',
                        borderRadius: '3px',
                        aspectRatio: square ? 1 : 'auto',
                    }}
                >
                    <code
                        style={{
                            padding: 0,
                            background: 'transparent',
                        }}
                        className="hljs"
                        dangerouslySetInnerHTML={{
                            __html: highligtedCode.value,
                        }}
                    ></code>
                </pre>
            </div>

            <Button
                onClick={captureImage}
                variant="contained"
                sx={{ background: 'dodgerblue', color: 'white' }}
            >
                Download as Image
            </Button>

            {image && (
                <Image
                    src={image}
                    width={codeRef.current?.clientWidth}
                    height={codeRef.current?.clientHeight}
                    alt="codeblock image"
                    unoptimized
                />
            )}
        </>
    );
}

export default Example;
