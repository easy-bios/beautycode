import React, { useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import { highlightLanguages } from '../constants';
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

function Example() {
    const [code, setCode] = useState(`function x() {
    var greet = 'Hello World';
    console.log(greet);
}`);
    const [language, setLanguage] = useState('auto');
    const [square, setSquare] = useState(false);
    const [image, setImage] = useState('');
    const codeRef = useRef<HTMLDivElement>(null);

    const captureImage = async () => {
        if (codeRef.current === null) return;

        const data = await toJpeg(codeRef.current);
        setImage(data);
    };

    const highligtedCode =
        language === 'auto'
            ? hljs.highlightAuto(code)
            : hljs.highlight(code, { language, ignoreIllegals: true });

    return (
        <>
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
                            background: 'linear-gradient(-45deg, #08f0, #08f2)',
                        },
                    }}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />

                <FormControl fullWidth>
                    <InputLabel id="select-label">Language</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={language}
                        label="Language"
                        onChange={(e) => setLanguage(e.target.value)}
                        sx={{
                            '& > div': {
                                background:
                                    'linear-gradient(-45deg, #08f0, #08f2)',
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
                    background:
                        'linear-gradient(45deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
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
                        background: '#000b',
                        border: '1px solid white',
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

            <Button onClick={captureImage} variant="contained">
                To Image
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
