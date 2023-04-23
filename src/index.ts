const equations = [
    '8x^2 + 64 x = - 120', // x1 = -5; x2 = -3
    'x^2 + 2x + 1 = 0', // x1 = -1; x2 = -1
    '13x + x^2 = -42' // x1 = -6; x2 = -7
];

const equation = equations[0];

/*
    Checks the sign of the right side of the equation
    * @param {string} rightSide - The right side of the equation
    * @returns {string} - The right side of the equation with the correct sign
*/
const checkRightSideSign = (rightSide: string) => {
    if (rightSide[0] === '-') {
        return '+' + rightSide.slice(1);
    } else if (rightSide[0] === '+') {
        return '-' + rightSide.slice(1);
    } else {
        return '-' + rightSide;
    }
};

/* 
    Solves a quadratic equation
    * @param {string} initEq - The equation to solve
    * @returns {object} - The solutions of the equation
    * @throws {Error} - Invalid equation
*/
const solve: (initEq: string) => { x1: number, x2: number; } = (initEq: string) => {

    // get eq without spaces
    const eqWithoutSpaces = initEq.replaceAll(' ', '');

    // get new eq with 0 on the right side
    const [leftSide, rightSide] = eqWithoutSpaces.split('=');
    if (rightSide !== '0') {
        const newRightSide = '0';
        const newLeftSide = leftSide + checkRightSideSign(rightSide);
        var newEq = newLeftSide + '=' + newRightSide;
    } else {
        var newEq = leftSide + '=' + rightSide;
    }

    // get factors of the eq
    const initFactors = newEq.split(/(?=[+-])/);
    let factors: string[] = initFactors;

    // get a
    let aIdx = 0;
    const getA = factors.map((factor, idx) => {
        if (factor.includes('x^2')) {
            factors = factors.filter((f) => f !== factor);
            let res = factor.slice(0, factor.length - 3);
            if (res === '' || res === '+' || res === '-') {
                res = '1';
            }
            aIdx = idx;
            return res;
        }
    })[aIdx];

    // get b
    let bIdx = 0;
    const getB = factors.map((factor, idx) => {
        if (factor.includes('x')) {
            factors = factors.filter((f) => f !== factor);
            let res = factor.slice(0, factor.length - 1);
            if (res === '' || res === '+' || res === '-') {
                res = '1';
            }
            bIdx = idx;
            return res;
        }
    })[bIdx];

    // throw error if the eq is invalid
    if (getA === undefined || getB === undefined) {
        throw new Error('Invalid equation.');
    }

    // num values of a, b, c
    const a = parseInt(getA);

    const b = parseInt(getB);

    const c = parseInt(factors[0]);

    // solve the eq
    const x1 = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
    const x2 = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);

    return { x1, x2 };
};

equations.forEach((eq) => {
    console.log(eq + '\n' + JSON.stringify(solve(eq)) + '\n');
});