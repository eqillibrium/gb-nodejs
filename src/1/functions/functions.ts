export const isPrime = (number: number): boolean => {
    if (number < 2) {
        return false
    }

    for (let i: number = 2; i <= number / 2; i++) {
        if (number % i === 0) {
            return false
        }
    }

    return true;
};

export const toNumber = (number: number | string): number | boolean => {
    let num = Number(number)
    if (!isNaN(num)) {
        return num
    }
    return false
}

export const getArgvVarsAsNums = (): number[] | [] => {
    let nums: number[] = []
    process.argv.forEach((el, idx) => {
        if (idx >= 2) {
            let num = toNumber(el)
            if(typeof num === "number") {
                nums.push(num)
            }
        }
    })
    return nums
}
