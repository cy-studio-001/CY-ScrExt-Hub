/**
 * Scratch高级数学运算扩展
 * 提供丰富的数学计算公式和函数，扩展Scratch的数学计算能力
 */
class BetterMathExtension {
    /**
     * 扩展构造函数
     * @param {Runtime} runtime - Scratch运行时实例
     */
    constructor(runtime) {
        this.runtime = runtime;
        console.log('高级数学运算扩展已初始化');
    }

    /**
     * 返回扩展元数据信息
     * @returns {Object} 扩展配置对象
     */
    getInfo() {
        return {
            id: "betterMathExtension",
            name: "高级数学运算",
            color1: "#6C5CE7",
            color2: "#A29BFE",
            blocks: [
                // 基础运算增强
                {
                    opcode: 'power',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[BASE]的[EXPONENT]次方',
                    arguments: {
                        BASE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2'
                        },
                        EXPONENT: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3'
                        }
                    }
                },
                {
                    opcode: 'squareRoot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]的平方根',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '16'
                        }
                    }
                },
                {
                    opcode: 'cubeRoot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]的立方根',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '8'
                        }
                    }
                },
                
                // 三角函数
                {
                    opcode: 'sine',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[ANGLE]度的正弦值',
                    arguments: {
                        ANGLE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '30'
                        }
                    }
                },
                {
                    opcode: 'cosine',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[ANGLE]度的余弦值',
                    arguments: {
                        ANGLE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '60'
                        }
                    }
                },
                {
                    opcode: 'tangent',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[ANGLE]度的正切值',
                    arguments: {
                        ANGLE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '45'
                        }
                    }
                },
                
                // 对数和指数
                {
                    opcode: 'naturalLog',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]的自然对数',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2.718'
                        }
                    }
                },
                {
                    opcode: 'log10',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]的常用对数(以10为底)',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '100'
                        }
                    }
                },
                {
                    opcode: 'exponential',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'e的[NUMBER]次方',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                
                // 统计计算
                {
                    opcode: 'randomIntegerRange',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[MIN]到[MAX]之间的随机整数',
                    arguments: {
                        MIN: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        MAX: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '100'
                        }
                    }
                },
                {
                    opcode: 'absoluteValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]的绝对值',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '-5'
                        }
                    }
                },
                {
                    opcode: 'roundTo',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]四舍五入到[DECIMALS]位小数',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3.14159'
                        },
                        DECIMALS: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2'
                        }
                    }
                },
                
                // 向量和几何计算
                {
                    opcode: 'distanceBetween',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '点([X1],[Y1])到点([X2],[Y2])的距离',
                    arguments: {
                        X1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3'
                        },
                        Y2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '4'
                        }
                    }
                },
                {
                    opcode: 'angleBetween',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '点([X1],[Y1])到点([X2],[Y2])的角度',
                    arguments: {
                        X1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        Y2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                
                // 高级数学函数
                {
                    opcode: 'factorial',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]的阶乘',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '5'
                        }
                    }
                },
                {
                    opcode: 'modulo',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[DIVIDEND]除以[DIVISOR]的余数',
                    arguments: {
                        DIVIDEND: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        DIVISOR: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3'
                        }
                    }
                },
                {
                    opcode: 'gcd',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A]和[B]的最大公约数',
                    arguments: {
                        A: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '12'
                        },
                        B: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '18'
                        }
                    }
                },
                {
                    opcode: 'lcm',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A]和[B]的最小公倍数',
                    arguments: {
                        A: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '4'
                        },
                        B: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '6'
                        }
                    }
                },
                
                // 进制转换
                {
                    opcode: 'decimalToBinary',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '十进制数[NUMBER]转换为二进制',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '10'
                        }
                    }
                },
                {
                    opcode: 'decimalToHex',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '十进制数[NUMBER]转换为十六进制',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '255'
                        }
                    }
                },
                
                // 高级统计函数
                {
                    opcode: 'median',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '计算[LIST]的中位数',
                    arguments: {
                        LIST: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1,3,5,7,9'
                        }
                    }
                },
                {
                    opcode: 'average',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '计算[LIST]的平均值',
                    arguments: {
                        LIST: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1,2,3,4,5'
                        }
                    }
                },
                {
                    opcode: 'standardDeviation',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '计算[LIST]的标准差',
                    arguments: {
                        LIST: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1,2,3,4,5'
                        }
                    }
                },
                
                // 几何计算
                {
                    opcode: 'circleArea',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '半径为[RADIUS]的圆面积',
                    arguments: {
                        RADIUS: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '5'
                        }
                    }
                },
                {
                    opcode: 'rectangleArea',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '长[LENGTH]宽[WIDTH]的矩形面积',
                    arguments: {
                        LENGTH: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '4'
                        },
                        WIDTH: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3'
                        }
                    }
                },
                {
                    opcode: 'triangleArea',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '底[BASE]高[HEIGHT]的三角形面积',
                    arguments: {
                        BASE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '6'
                        },
                        HEIGHT: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '4'
                        }
                    }
                },
                {
                    opcode: 'cubeVolume',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '边长为[SIDE]的立方体体积',
                    arguments: {
                        SIDE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3'
                        }
                    }
                },
                {
                    opcode: 'sphereVolume',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '半径为[RADIUS]的球体体积',
                    arguments: {
                        RADIUS: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '5'
                        }
                    }
                },
                
                // 高级数学函数
                {
                    opcode: 'hyperbolicSine',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[X]的双曲正弦值',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'hyperbolicCosine',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[X]的双曲余弦值',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'hyperbolicTangent',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[X]的双曲正切值',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'sign',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]的符号函数',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '-5'
                        }
                    }
                },
                {
                    opcode: 'floor',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]向下取整',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3.7'
                        }
                    }
                },
                {
                    opcode: 'ceiling',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]向上取整',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3.2'
                        }
                    }
                },
                
                // 数论函数
                {
                    opcode: 'isPrime',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[NUMBER]是否为素数',
                    arguments: {
                        NUMBER: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '17'
                        }
                    }
                },
                {
                    opcode: 'fibonacci',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '第[N]个斐波那契数',
                    arguments: {
                        N: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '10'
                        }
                    }
                },
                
                // 单位转换
                {
                    opcode: 'celsiusToFahrenheit',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[C]摄氏度转换为华氏度',
                    arguments: {
                        C: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'fahrenheitToCelsius',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[F]华氏度转换为摄氏度',
                    arguments: {
                        F: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '32'
                        }
                    }
                },
                {
                    opcode: 'metersToFeet',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[M]米转换为英尺',
                    arguments: {
                        M: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'feetToMeters',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[FT]英尺转换为米',
                    arguments: {
                        FT: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3.28'
                        }
                    }
                }
            ]
        };
    }

    // 基础运算增强
    power(args) {
        const base = parseFloat(args.BASE) || 0;
        const exponent = parseFloat(args.EXPONENT) || 0;
        return Math.pow(base, exponent);
    }

    squareRoot(args) {
        const number = parseFloat(args.NUMBER) || 0;
        return Math.sqrt(Math.abs(number)); // 取绝对值防止负数
    }

    cubeRoot(args) {
        const number = parseFloat(args.NUMBER) || 0;
        // 使用Math.cbrt(ES6+)或Math.pow(number, 1/3)实现立方根
        return Math.cbrt ? Math.cbrt(number) : Math.pow(number, 1/3);
    }

    // 三角函数（角度转弧度）
    sine(args) {
        const angle = parseFloat(args.ANGLE) || 0;
        return Math.sin(angle * Math.PI / 180);
    }

    cosine(args) {
        const angle = parseFloat(args.ANGLE) || 0;
        return Math.cos(angle * Math.PI / 180);
    }

    tangent(args) {
        const angle = parseFloat(args.ANGLE) || 0;
        // 避免在90度或270度附近计算tan值
        if (Math.abs(angle % 180 - 90) < 0.1) {
            return Infinity; // 接近无穷大
        }
        return Math.tan(angle * Math.PI / 180);
    }

    // 对数和指数
    naturalLog(args) {
        const number = parseFloat(args.NUMBER) || 0;
        return number > 0 ? Math.log(number) : 0; // 确保参数为正数
    }

    log10(args) {
        const number = parseFloat(args.NUMBER) || 0;
        return number > 0 ? Math.log10(number) : 0; // 确保参数为正数
    }

    exponential(args) {
        const number = parseFloat(args.NUMBER) || 0;
        // 限制结果范围，防止溢出
        const result = Math.exp(number);
        return isFinite(result) ? result : 0;
    }

    // 统计计算
    randomIntegerRange(args) {
        const min = Math.floor(parseFloat(args.MIN) || 0);
        const max = Math.floor(parseFloat(args.MAX) || 100);
        // 确保min <= max
        const lower = Math.min(min, max);
        const upper = Math.max(min, max);
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }

    absoluteValue(args) {
        const number = parseFloat(args.NUMBER) || 0;
        return Math.abs(number);
    }

    roundTo(args) {
        const number = parseFloat(args.NUMBER) || 0;
        const decimals = Math.max(0, Math.floor(parseFloat(args.DECIMALS) || 0)); // 确保小数位数为非负整数
        const factor = Math.pow(10, decimals);
        return Math.round(number * factor) / factor;
    }

    // 向量和几何计算
    distanceBetween(args) {
        const x1 = parseFloat(args.X1) || 0;
        const y1 = parseFloat(args.Y1) || 0;
        const x2 = parseFloat(args.X2) || 0;
        const y2 = parseFloat(args.Y2) || 0;
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    angleBetween(args) {
        const x1 = parseFloat(args.X1) || 0;
        const y1 = parseFloat(args.Y1) || 0;
        const x2 = parseFloat(args.X2) || 0;
        const y2 = parseFloat(args.Y2) || 0;
        const dx = x2 - x1;
        const dy = y2 - y1;
        // 计算弧度，然后转换为角度
        let angle = Math.atan2(dy, dx) * 180 / Math.PI;
        // 确保角度在0-360范围内
        if (angle < 0) angle += 360;
        return angle;
    }

    // 高级数学函数
    factorial(args) {
        const number = Math.floor(parseFloat(args.NUMBER) || 0);
        // 确保是正整数
        if (number < 0) return 0;
        if (number === 0 || number === 1) return 1;
        
        let result = 1;
        for (let i = 2; i <= number; i++) {
            result *= i;
            // 防止数值过大溢出
            if (!isFinite(result)) return Infinity;
        }
        return result;
    }

    modulo(args) {
        const dividend = parseFloat(args.DIVIDEND) || 0;
        const divisor = parseFloat(args.DIVISOR) || 1;
        // 处理除数为0的情况
        if (divisor === 0) return 0;
        return dividend % divisor;
    }

    gcd(args) {
        let a = Math.abs(parseInt(args.A) || 0);
        let b = Math.abs(parseInt(args.B) || 0);
        
        // 使用欧几里得算法计算最大公约数
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    lcm(args) {
        const a = Math.abs(parseInt(args.A) || 0);
        const b = Math.abs(parseInt(args.B) || 0);
        
        // 利用公式：最小公倍数 = |a*b| / 最大公约数
        if (a === 0 || b === 0) return 0;
        return Math.abs(a * b) / this.gcd({A: a, B: b});
    }

    // 进制转换
    decimalToBinary(args) {
        const number = parseInt(args.NUMBER) || 0;
        return number.toString(2); // 转换为二进制字符串
    }

    decimalToHex(args) {
        const number = parseInt(args.NUMBER) || 0;
        return number.toString(16).toUpperCase(); // 转换为十六进制并大写
    }

    // 高级统计函数
    median(args) {
        // 将逗号分隔的字符串转换为数字数组
        const listStr = args.LIST || '';
        const numbers = listStr.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
        
        if (numbers.length === 0) return 0;
        
        // 排序数组
        numbers.sort((a, b) => a - b);
        
        const mid = Math.floor(numbers.length / 2);
        // 如果数组长度为偶数，取中间两个数的平均值
        return numbers.length % 2 === 0 ? (numbers[mid - 1] + numbers[mid]) / 2 : numbers[mid];
    }

    average(args) {
        const listStr = args.LIST || '';
        const numbers = listStr.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
        
        if (numbers.length === 0) return 0;
        
        const sum = numbers.reduce((acc, val) => acc + val, 0);
        return sum / numbers.length;
    }

    standardDeviation(args) {
        const listStr = args.LIST || '';
        const numbers = listStr.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
        
        if (numbers.length <= 1) return 0;
        
        // 计算平均值
        const avg = this.average(args);
        // 计算方差
        const variance = numbers.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / numbers.length;
        // 返回标准差
        return Math.sqrt(variance);
    }

    // 几何计算
    circleArea(args) {
        const radius = parseFloat(args.RADIUS) || 0;
        if (radius < 0) return 0;
        return Math.PI * radius * radius;
    }

    rectangleArea(args) {
        const length = parseFloat(args.LENGTH) || 0;
        const width = parseFloat(args.WIDTH) || 0;
        if (length < 0 || width < 0) return 0;
        return length * width;
    }

    triangleArea(args) {
        const base = parseFloat(args.BASE) || 0;
        const height = parseFloat(args.HEIGHT) || 0;
        if (base < 0 || height < 0) return 0;
        return 0.5 * base * height;
    }

    cubeVolume(args) {
        const side = parseFloat(args.SIDE) || 0;
        if (side < 0) return 0;
        return side * side * side;
    }

    sphereVolume(args) {
        const radius = parseFloat(args.RADIUS) || 0;
        if (radius < 0) return 0;
        return (4 / 3) * Math.PI * Math.pow(radius, 3);
    }

    // 高级数学函数
    hyperbolicSine(args) {
        const x = parseFloat(args.X) || 0;
        // 使用Math.sinh(ES6+)或自己实现双曲正弦
        return Math.sinh ? Math.sinh(x) : (Math.exp(x) - Math.exp(-x)) / 2;
    }

    hyperbolicCosine(args) {
        const x = parseFloat(args.X) || 0;
        // 使用Math.cosh(ES6+)或自己实现双曲余弦
        return Math.cosh ? Math.cosh(x) : (Math.exp(x) + Math.exp(-x)) / 2;
    }

    hyperbolicTangent(args) {
        const x = parseFloat(args.X) || 0;
        // 使用Math.tanh(ES6+)或自己实现双曲正切
        return Math.tanh ? Math.tanh(x) : (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
    }

    sign(args) {
        const number = parseFloat(args.NUMBER) || 0;
        return number > 0 ? 1 : (number < 0 ? -1 : 0);
    }

    floor(args) {
        const number = parseFloat(args.NUMBER) || 0;
        return Math.floor(number);
    }

    ceiling(args) {
        const number = parseFloat(args.NUMBER) || 0;
        return Math.ceil(number);
    }

    // 数论函数
    isPrime(args) {
        const number = Math.floor(parseFloat(args.NUMBER) || 0);
        
        // 小于2的数不是素数
        if (number <= 1) return false;
        // 2和3是素数
        if (number <= 3) return true;
        // 能被2或3整除的数不是素数
        if (number % 2 === 0 || number % 3 === 0) return false;
        
        // 检查到平方根
        const sqrtNum = Math.sqrt(number);
        for (let i = 5; i <= sqrtNum; i += 6) {
            if (number % i === 0 || number % (i + 2) === 0) return false;
        }
        
        return true;
    }

    fibonacci(args) {
        let n = Math.floor(parseFloat(args.N) || 0);
        
        // 处理负数或0的情况
        if (n <= 0) return 0;
        // 限制计算范围，防止数值过大
        if (n > 70) return Infinity;
        
        let a = 0, b = 1, temp;
        for (let i = 1; i < n; i++) {
            temp = a + b;
            a = b;
            b = temp;
            // 检查溢出
            if (!isFinite(b)) return Infinity;
        }
        
        return b;
    }

    // 单位转换
    celsiusToFahrenheit(args) {
        const celsius = parseFloat(args.C) || 0;
        return (celsius * 9/5) + 32;
    }

    fahrenheitToCelsius(args) {
        const fahrenheit = parseFloat(args.F) || 0;
        return (fahrenheit - 32) * 5/9;
    }

    metersToFeet(args) {
        const meters = parseFloat(args.M) || 0;
        return meters * 3.28084; // 1米 = 3.28084英尺
    }

    feetToMeters(args) {
        const feet = parseFloat(args.FT) || 0;
        return feet / 3.28084; // 1英尺 = 0.3048米
    }
}

// 注册扩展
Scratch.extensions.register(new BetterMathExtension());