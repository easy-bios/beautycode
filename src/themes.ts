type Theme = {
    name: string;
    background: string;
    color: string;
    codeBackground: string;
    codeColor: string;
    borderRadius: number | string;
};

export const themes: { [key: string]: Theme } = {
    nightsky: {
        name: 'Nightsky',
        background:
            'radial-gradient(circle at top left, #08f0, #08f2), #202030',
        color: 'white',
        codeBackground: 'linear-gradient(-45deg, #08f0, #08f2), #202030',
        codeColor: 'white',
        borderRadius: 3,
    },
    daylight: {
        name: 'Daylight',
        background: 'radial-gradient(circle at top left, #feb, #fff), #fff',
        color: 'white',
        codeBackground: 'linear-gradient(-45deg, #feb, #fff), #fff',
        codeColor: '#282828',
        borderRadius: 3,
    },
};
