
export const colors = [
    '#025928',
    '#F2B705',
    '#BF712C',
    '#F26716',
    '#F2CCB6'
];

export default function randomColor() {

    const random = Math.floor(Math.random() * colors.length)
    return colors[random]
}