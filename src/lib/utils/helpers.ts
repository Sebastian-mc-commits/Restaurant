
export const colors = {
    primaryGreen: '#025928',
    accentYellow: '#F2B705',
    secondaryBrown: '#BF712C',
    primaryOrange: '#F26716',
    lightPeach: '#F2CCB6',
    gray: "#D3D3D3",
    lightGray: "rgba(224, 224, 224, 0.3)"
} as const;

export const colorsForRandom = [
    '#025928',
    '#F2B705',
    '#BF712C',
    '#F26716',
    '#F2CCB6'
] as const;

export default function randomColor() {

    const random = Math.floor(Math.random() * colorsForRandom.length)
    return colorsForRandom[random]
}

export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}