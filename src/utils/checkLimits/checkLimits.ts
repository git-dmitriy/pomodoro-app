type arguments = {
    value: number;
    max: number;
    min: number;
}

export function checkLimits({value, max, min}:arguments) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}