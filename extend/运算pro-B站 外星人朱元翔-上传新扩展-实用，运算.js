class MathOperationsExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: 'mathOperations',
            name: '数学运算',
            color1: '#4a6cd4',
            color2: '#3652b0',
            blockIconURI: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC41Mzk1IDIuMDczNjFDMTEuMDUxNyAyLjE4NzQyIDExLjM3NDYgMi42OTQ4OSAxMS4yNjA4IDMuMjA3MDdMOC41OTM0NSAxNS4yMTAyQzguNDc5NjMgMTUuNzIyNCA3Ljk3MjE2IDE2LjA0NTMgNy40NTk5OSAxNS45MzE1QzYuOTQ3ODEgMTUuODE3NyA2LjYyNDg3IDE1LjMxMDIgNi43Mzg2OSAxNC43OThMOS40MDYwNSAyLjc5NDlDOS41MTk4NyAyLjI4MjcyIDEwLjAyNzMgMS45NTk3OSAxMC41Mzk1IDIuMDczNjFaTTYuMzM3MyA0Ljk5NjU5QzYuNzA4MyA1LjM2NzU5IDYuNzA4MyA1Ljk2OTEgNi4zMzczIDYuMzQwMUwzLjY3NDg1IDkuMDAyNTVMNi4zMzczIDExLjY2NUM2LjcwODMgMTIuMDM2IDYuNzA4MyAxMi42Mzc1IDYuMzM3MyAxMy4wMDg1QzUuOTY2MyAxMy4zNzk1IDUuMzY0OCAxMy4zNzk1IDQuOTkzOCAxMy4wMDg1TDEuNjU5NiA5LjY3NDNDMS4yODg2IDkuMzAzMyAxLjI4ODYgOC43MDE3OSAxLjY1OTYgOC4zMzA4TDQuOTkzOCA0Ljk5NjU5QzUuMzY0OCA0LjYyNTYgNS45NjYzIDQuNjI1NiA2LjMzNzMgNC45OTY1OVpNMTEuNjYyMiA0Ljk5NjU5QzEyLjAzMzIgNC42MjU2IDEyLjYzNDcgNC42MjU2IDEzLjAwNTcgNC45OTY1OUwxNi4zMzk5IDguMzMwOEMxNi43MTA5IDguNzAxNzkgMTYuNzEwOSA5LjMwMzMgMTYuMzM5OSA5LjY3NDNMMTMuMDA1NyAxMy4wMDg1QzEyLjYzNDcgMTMuMzc5NSAxMi4wMzMyIDEzLjM3OTUgMTEuNjYyMiAxMy4wMDg1QzExLjI5MTIgMTIuNjM3NSAxMS4yOTEyIDEyLjAzNiAxMS42NjIyIDExLjY2NUwxNC4zMjQ2IDkuMDAyNTVMMTEuNjYyMiA2LjM0MDFDMTEuMjkxMiA1Ljk2OTEgMTEuMjkxMiA1LjM2NzU5IDExLjY2MjIgNC45OTY1OVoiIGZpbGw9IiNGRjk3MzAiLz4KPC9zdmc+Cg==",
            menuIconURI: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC41Mzk1IDIuMDczNjFDMTEuMDUxNyAyLjE4NzQyIDExLjM3NDYgMi42OTQ4OSAxMS4yNjA4IDMuMjA3MDdMOC41OTM0NSAxNS4yMTAyQzguNDc5NjMgMTUuNzIyNCA3Ljk3MjE2IDE2LjA0NTMgNy40NTk5OSAxNS45MzE1QzYuOTQ3ODEgMTUuODE3NyA2LjYyNDg3IDE1LjMxMDIgNi43Mzg2OSAxNC43OThMOS40MDYwNSAyLjc5NDlDOS41MTk4NyAyLjI4MjcyIDEwLjAyNzMgMS45NTk3OSAxMC41Mzk1IDIuMDczNjFaTTYuMzM3MyA0Ljk5NjU5QzYuNzA4MyA1LjM2NzU5IDYuNzA4MyA1Ljk2OTEgNi4zMzczIDYuMzQwMUwzLjY3NDg1IDkuMDAyNTVMNi4zMzczIDExLjY2NUM2LjcwODMgMTIuMDM2IDYuNzA4MyAxMi42Mzc1IDYuMzM3MyAxMy4wMDg1QzUuOTY2MyAxMy4zNzk1IDUuMzY0OCAxMy4zNzk1IDQuOTkzOCAxMy4wMDg1TDEuNjU5NiA5LjY3NDNDMS4yODg2IDkuMzAzMyAxLjI4ODYgOC43MDE3OSAxLjY1OTYgOC4zMzA4TDQuOTkzOCA0Ljk5NjU5QzUuMzY0OCA0LjYyNTYgNS45NjYzIDQuNjI1NiA2LjMzNzMgNC45OTY1OVpNMTEuNjYyMiA0Ljk5NjU5QzEyLjAzMzIgNC42MjU2IDEyLjYzNDcgNC42MjU2IDEzLjAwNTcgNC45OTY1OUwxNi4zMzk5IDguMzMwOEMxNi43MTA5IDguNzAxNzkgMTYuNzEwOSA5LjMwMzMgMTYuMzM5OSA5LjY3NDNMMTMuMDA1NyAxMy4wMDg1QzEyLjYzNDcgMTMuMzc5NSAxMi4wMzMyIDEzLjM3OTUgMTEuNjYyMiAxMy4wMDg1QzExLjI5MTIgMTIuNjM3NSAxMS4yOTEyIDEyLjAzNiAxMS42NjIyIDExLjY2NUwxNC4zMjQ2IDkuMDAyNTVMMTEuNjYyMiA2LjM0MDFDMTEuMjkxMiA1Ljk2OTEgMTEuMjkxMiA1LjM2NzU5IDExLjY2MjIgNC45OTY1OVoiIGZpbGw9IiNGRjk3MzAiLz4KPC9zdmc+Cg==",
            blocks: [
                // 基础算术运算 (10个)
                {
                    opcode: 'add',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] + [B]',
                    arguments: {
                        A: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        B: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'subtract',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] - [B]',
                    arguments: {
                        A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },
                {
                    opcode: 'multiply',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] × [B]',
                    arguments: {
                        A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },
                {
                    opcode: 'divide',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] ÷ [B]',
                    arguments: {
                        A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
                    }
                },
                {
                    opcode: 'modulus',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] 除以 [B] 的余数',
                    arguments: {
                        A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
                    }
                },
                {
                    opcode: 'power',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] 的 [B] 次方',
                    arguments: {
                        A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'square',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的平方',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'cube',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的立方',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
                    }
                },
                {
                    opcode: 'increment',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 加 1',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },
                {
                    opcode: 'decrement',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 减 1',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },

                // 高级数学函数 (10个)
                {
                    opcode: 'squareRoot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的平方根',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 }
                    }
                },
                {
                    opcode: 'cubeRoot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的立方根',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 8 }
                    }
                },
                {
                    opcode: 'nthRoot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的 [root] 次方根',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 },
                        root: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'absolute',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的绝对值',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: -5 }
                    }
                },
                {
                    opcode: 'round',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 四舍五入',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.7 }
                    }
                },
                {
                    opcode: 'floor',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 向下取整',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.7 }
                    }
                },
                {
                    opcode: 'ceil',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 向上取整',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.2 }
                    }
                },
                {
                    opcode: 'logarithm',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的自然对数',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
                    }
                },
                {
                    opcode: 'log10',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的常用对数',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
                    }
                },
                {
                    opcode: 'exponential',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'e 的 [num] 次方',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
                    }
                },

                // 三角函数 (10个)
                {
                    opcode: 'sin',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[角度] 的正弦值',
                    arguments: {
                        角度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },
                {
                    opcode: 'cos',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[角度] 的余弦值',
                    arguments: {
                        角度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },
                {
                    opcode: 'tan',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[角度] 的正切值',
                    arguments: {
                        角度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },
                {
                    opcode: 'asin',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[值] 的反正弦值',
                    arguments: {
                        值: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },
                {
                    opcode: 'acos',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[值] 的反余弦值',
                    arguments: {
                        值: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
                    }
                },
                {
                    opcode: 'atan',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[值] 的反正切值',
                    arguments: {
                        值: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },
                {
                    opcode: 'degrees',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[弧度] 转换为角度',
                    arguments: {
                        弧度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.1416 }
                    }
                },
                {
                    opcode: 'radians',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[角度] 转换为弧度',
                    arguments: {
                        角度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 180 }
                    }
                },
                {
                    opcode: 'hypot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[x] 和 [y] 的斜边长度',
                    arguments: {
                        x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
                        y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'atan2',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[y] / [x] 的反正切值',
                    arguments: {
                        y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
                    }
                },

                // 数论函数 (10个)
                {
                    opcode: 'gcd',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[a] 和 [b] 的最大公约数',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 12 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 18 }
                    }
                },
                {
                    opcode: 'lcm',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[a] 和 [b] 的最小公倍数',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 6 }
                    }
                },
                {
                    opcode: 'isPrime',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[num] 是质数吗',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 7 }
                    }
                },
                {
                    opcode: 'factorial',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的阶乘',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
                    }
                },
                {
                    opcode: 'isEven',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[num] 是偶数吗',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'isOdd',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[num] 是奇数吗',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'isInteger',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[num] 是整数吗',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
                    }
                },
                {
                    opcode: 'nextPrime',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 之后的下一个质数',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
                    }
                },
                {
                    opcode: 'previousPrime',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 之前的上一个质数',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
                    }
                },
                {
                    opcode: 'sumDigits',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的各位数字之和',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 123 }
                    }
                },

                // 统计与概率 (10个)
                {
                    opcode: 'average',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[list] 的平均值',
                    arguments: {
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [1, 2, 3, 4, 5] }
                    }
                },
                {
                    opcode: 'sum',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[list] 的总和',
                    arguments: {
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [1, 2, 3, 4, 5] }
                    }
                },
                {
                    opcode: 'product',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[list] 的乘积',
                    arguments: {
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [1, 2, 3, 4] }
                    }
                },
                {
                    opcode: 'minimum',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[list] 的最小值',
                    arguments: {
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [3, 1, 4, 1, 5] }
                    }
                },
                {
                    opcode: 'maximum',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[list] 的最大值',
                    arguments: {
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [3, 1, 4, 1, 5] }
                    }
                },
                {
                    opcode: 'range',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[list] 的范围（最大值-最小值）',
                    arguments: {
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [3, 1, 4, 1, 5] }
                    }
                },
                {
                    opcode: 'median',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[list] 的中位数',
                    arguments: {
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [3, 1, 4, 1, 5] }
                    }
                },
                {
                    opcode: 'mode',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[list] 的众数',
                    arguments: {
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [3, 1, 4, 1, 5] }
                    }
                },
                {
                    opcode: 'randomInt',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[min] 到 [max] 之间的随机整数',
                    arguments: {
                        min: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        max: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
                    }
                },
                {
                    opcode: 'randomFloat',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[min] 到 [max] 之间的随机小数',
                    arguments: {
                        min: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        max: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
                    }
                },

                // 其他数学函数 (10个)
                {
                    opcode: 'clamp',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 限制在 [min] 到 [max] 之间',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
                        min: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        max: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
                    }
                },
                {
                    opcode: 'mapRange',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[value] 从 [inMin]-[inMax] 映射到 [outMin]-[outMax]',
                    arguments: {
                        value: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.5 },
                        inMin: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        inMax: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        outMin: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        outMax: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
                    }
                },
                {
                    opcode: 'sign',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的符号（正数为1，负数为-1，零为0）',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
                    }
                },
                {
                    opcode: 'reciprocal',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的倒数',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
                    }
                },
                {
                    opcode: 'squaredDifference',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[a] 和 [b] 的平方差',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'cubeDifference',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[a] 和 [b] 的立方差',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'squaredSum',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[a] 和 [b] 的平方和',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'fibonacci',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '第 [n] 个斐波那契数',
                    arguments: {
                        n: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
                    }
                },
                {
                    opcode: 'distance',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '点 ([x1],[y1]) 到点 ([x2],[y2]) 的距离',
                    arguments: {
                        x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
                        y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'percent',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[value] 的 [percent]%',
                    arguments: {
                        value: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                        percent: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
                    }
                },

                // 新增：分数运算（5个）
                {
                    opcode: 'addFraction',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[a]/[b] + [c]/[d]',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                        c: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'subtractFraction',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[a]/[b] - [c]/[d]',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                        c: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'multiplyFraction',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[a]/[b] × [c]/[d]',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                        c: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'divideFraction',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[a]/[b] ÷ [c]/[d]',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                        c: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'fractionToDecimal',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[numerator]/[denominator] 转小数',
                    arguments: {
                        numerator: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        denominator: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
                    }
                },

                // 新增：复数运算（4个）
                {
                    opcode: 'addComplex',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '([a]+[b]i) + ([c]+[d]i)',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                        c: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
                        d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'multiplyComplex',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '([a]+[b]i) × ([c]+[d]i)',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                        c: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
                        d: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'complexModulus',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '([a]+[b]i) 的模长',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'complexConjugate',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '([a]+[b]i) 的共轭复数',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },

                // 新增：单位转换（5个）
                {
                    opcode: 'cmToInch',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[cm] 厘米转英寸',
                    arguments: {
                        cm: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
                    }
                },
                {
                    opcode: 'inchToCm',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[inch] 英寸转厘米',
                    arguments: {
                        inch: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'celsiusToFahrenheit',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[celsius]℃ 转华氏度',
                    arguments: {
                        celsius: { type: Scratch.ArgumentType.NUMBER, defaultValue: 25 }
                    }
                },
                {
                    opcode: 'fahrenheitToCelsius',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[fahrenheit]℉ 转摄氏度',
                    arguments: {
                        fahrenheit: { type: Scratch.ArgumentType.NUMBER, defaultValue: 77 }
                    }
                },
                {
                    opcode: 'kgToPound',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[kg] 千克转磅',
                    arguments: {
                        kg: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
                    }
                },

                // 新增：数据统计进阶（4个）
                {
                    opcode: 'variance',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[list] 的方差',
                    arguments: {
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [1, 2, 3, 4, 5] }
                    }
                },
                {
                    opcode: 'standardDeviation',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[list] 的标准差',
                    arguments: {
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [1, 2, 3, 4, 5] }
                    }
                },
                {
                    opcode: 'uniqueList',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[list] 去重后',
                    arguments: {
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [1, 2, 2, 3, 3, 3] }
                    }
                },
                {
                    opcode: 'countInList',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[target] 在 [list] 中出现次数',
                    arguments: {
                        target: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                        list: { type: Scratch.ArgumentType.LIST, defaultValue: [1, 2, 2, 3, 3, 3] }
                    }
                },

                // 新增：高级数论（4个）
                {
                    opcode: 'primeFactors',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 的质因数分解',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 12 }
                    }
                },
                {
                    opcode: 'eulerFunction',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '欧拉函数 φ([num])',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 6 }
                    }
                },
                {
                    opcode: 'areCoprime',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[a] 和 [b] 互质吗',
                    arguments: {
                        a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 8 },
                        b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 }
                    }
                },
                {
                    opcode: 'combination',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '组合数 C([n],[k])',
                    arguments: {
                        n: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
                        k: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
                    }
                },

                // 新增：实用计算（8个）
                {
                    opcode: 'circleArea',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '半径 [radius] 的圆面积',
                    arguments: {
                        radius: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
                    }
                },
                {
                    opcode: 'circleCircumference',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '半径 [radius] 的圆周长',
                    arguments: {
                        radius: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
                    }
                },
                {
                    opcode: 'rectangleArea',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '长 [length] 宽 [width] 的矩形面积',
                    arguments: {
                        length: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 },
                        width: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
                    }
                },
                {
                    opcode: 'triangleArea',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '底 [base] 高 [height] 的三角形面积',
                    arguments: {
                        base: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 },
                        height: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
                    }
                },
                {
                    opcode: 'roundToDecimal',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[num] 保留 [decimalPlaces] 位小数',
                    arguments: {
                        num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.14159 },
                        decimalPlaces: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
                    }
                },
                {
                    opcode: 'slope',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '点([x1],[y1])到点([x2],[y2])的斜率',
                    arguments: {
                        x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                        x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
                        y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'calculatePercentage',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[part] 占 [total] 的百分比',
                    arguments: {
                        part: { type: Scratch.ArgumentType.NUMBER, defaultValue: 25 },
                        total: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
                    }
                },
                {
                    opcode: 'fibonacciSequence',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '斐波那契数列前 [n] 项',
                    arguments: {
                        n: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
                    }
                }
            ]
        };
    }

    // 原有积木的实现代码
    add(args) { return args.A + args.B; }
    subtract(args) { return args.A - args.B; }
    multiply(args) { return args.A * args.B; }
    divide(args) { return args.B === 0 ? 0 : args.A / args.B; }
    modulus(args) { return args.B === 0 ? 0 : args.A % args.B; }
    power(args) { return Math.pow(args.A, args.B); }
    square(args) { return args.num * args.num; }
    cube(args) { return args.num * args.num * args.num; }
    increment(args) { return args.num + 1; }
    decrement(args) { return args.num - 1; }

    squareRoot(args) { return Math.sqrt(Math.max(0, args.num)); }
    cubeRoot(args) { return Math.cbrt(args.num); }
    nthRoot(args) { 
        if (args.num < 0 && args.root % 2 === 0) return NaN;
        return args.root === 0 ? 1 : Math.pow(Math.abs(args.num), 1 / args.root) * (args.num < 0 ? -1 : 1);
    }
    absolute(args) { return Math.abs(args.num); }
    round(args) { return Math.round(args.num); }
    floor(args) { return Math.floor(args.num); }
    ceil(args) { return Math.ceil(args.num); }
    logarithm(args) { return args.num <= 0 ? 0 : Math.log(args.num); }
    log10(args) { return args.num <= 0 ? 0 : Math.log10(args.num); }
    exponential(args) { return Math.exp(args.num); }

    sin(args) { return Math.sin(this.radians({角度: args.角度})); }
    cos(args) { return Math.cos(this.radians({角度: args.角度})); }
    tan(args) { return Math.tan(this.radians({角度: args.角度})); }
    asin(args) { return this.degrees({弧度: Math.asin(Math.max(-1, Math.min(1, args.值)))}); }
    acos(args) { return this.degrees({弧度: Math.acos(Math.max(-1, Math.min(1, args.值)))}); }
    atan(args) { return this.degrees({弧度: Math.atan(args.值)}); }
    degrees(args) { return args.弧度 * (180 / Math.PI); }
    radians(args) { return args.角度 * (Math.PI / 180); }
    hypot(args) { return Math.hypot(args.x, args.y); }
    atan2(args) { return this.degrees({弧度: Math.atan2(args.y, args.x)}); }

    gcd(args) {
        let a = Math.abs(args.a);
        let b = Math.abs(args.b);
        while (b) {
            const t = b;
            b = a % b;
            a = t;
        }
        return a;
    }
    lcm(args) {
        if (args.a === 0 || args.b === 0) return 0;
        return Math.abs(args.a * args.b) / this.gcd(args);
    }
    isPrime(args) {
        const num = Math.abs(Math.round(args.num));
        if (num <= 1) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }
    factorial(args) {
        const num = Math.floor(args.num);
        if (num < 0) return 0;
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        return result;
    }
    isEven(args) { return args.num % 2 === 0; }
    isOdd(args) { return args.num % 2 !== 0; }
    isInteger(args) { return Number.isInteger(args.num); }
    nextPrime(args) {
        let num = Math.floor(args.num) + 1;
        while (true) {
            if (this.isPrime({num})) return num;
            num++;
        }
    }
    previousPrime(args) {
        let num = Math.floor(args.num) - 1;
        while (num >= 2) {
            if (this.isPrime({num})) return num;
            num--;
        }
        return 2;
    }
    sumDigits(args) {
        let num = Math.abs(args.num);
        let sum = 0;
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        return sum;
    }

    average(args) {
        const list = args.list.filter(x => !isNaN(x));
        return list.length === 0 ? 0 : this.sum({list}) / list.length;
    }
    sum(args) {
        return args.list.reduce((acc, val) => acc + (isNaN(val) ? 0 : val), 0);
    }
    product(args) {
        return args.list.reduce((acc, val) => acc * (isNaN(val) ? 1 : val), 1);
    }
    minimum(args) {
        const list = args.list.filter(x => !isNaN(x));
        return list.length === 0 ? 0 : Math.min(...list);
    }
    maximum(args) {
        const list = args.list.filter(x => !isNaN(x));
        return list.length === 0 ? 0 : Math.max(...list);
    }
    range(args) {
        return this.maximum(args) - this.minimum(args);
    }
    median(args) {
        const list = args.list.filter(x => !isNaN(x)).sort((a, b) => a - b);
        const mid = Math.floor(list.length / 2);
        return list.length % 2 === 0 ? (list[mid - 1] + list[mid]) / 2 : list[mid];
    }
    mode(args) {
        const list = args.list.filter(x => !isNaN(x));
        if (list.length === 0) return 0;
        
        const counts = {};
        let maxCount = 0;
        let mode = list[0];
        
        for (const num of list) {
            counts[num] = (counts[num] || 0) + 1;
            if (counts[num] > maxCount) {
                maxCount = counts[num];
                mode = num;
            }
        }
        return mode;
    }
    randomInt(args) {
        const min = Math.ceil(args.min);
        const max = Math.floor(args.max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    randomFloat(args) {
        return Math.random() * (args.max - args.min) + args.min;
    }

    clamp(args) {
        return Math.max(args.min, Math.min(args.max, args.num));
    }
    mapRange(args) {
        return (args.value - args.inMin) * (args.outMax - args.outMin) / 
               (args.inMax - args.inMin) + args.outMin;
    }
    sign(args) {
        if (args.num > 0) return 1;
        if (args.num < 0) return -1;
        return 0;
    }
    reciprocal(args) {
        return args.num === 0 ? 0 : 1 / args.num;
    }
    squaredDifference(args) {
        return this.square({num: args.a}) - this.square({num: args.b});
    }
    cubeDifference(args) {
        return this.cube({num: args.a}) - this.cube({num: args.b});
    }
    squaredSum(args) {
        return this.square({num: args.a}) + this.square({num: args.b});
    }
    fibonacci(args) {
        const n = Math.max(0, Math.floor(args.n));
        if (n === 0) return 0;
        if (n === 1) return 1;
        
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            const c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
    distance(args) {
        return this.hypot({x: args.x2 - args.x1, y: args.y2 - args.y1});
    }
    percent(args) {
        return args.value * (args.percent / 100);
    }

    // 新增功能的实现代码
    // 一、分数运算
    addFraction(args) {
        const numerator = args.a * args.d + args.c * args.b;
        const denominator = args.b * args.d;
        const gcdVal = this.gcd({a: numerator, b: denominator});
        return `${numerator / gcdVal}/${denominator / gcdVal}`;
    }
    subtractFraction(args) {
        const numerator = args.a * args.d - args.c * args.b;
        const denominator = args.b * args.d;
        const gcdVal = this.gcd({a: Math.abs(numerator), b: denominator});
        return `${numerator / gcdVal}/${denominator / gcdVal}`;
    }
    multiplyFraction(args) {
        const numerator = args.a * args.c;
        const denominator = args.b * args.d;
        const gcdVal = this.gcd({a: numerator, b: denominator});
        return `${numerator / gcdVal}/${denominator / gcdVal}`;
    }
    divideFraction(args) {
        if (args.c === 0) return "0/1";
        const numerator = args.a * args.d;
        const denominator = args.b * args.c;
        const gcdVal = this.gcd({a: numerator, b: denominator});
        return `${numerator / gcdVal}/${denominator / gcdVal}`;
    }
    fractionToDecimal(args) {
        if (args.denominator === 0) return 0;
        return (args.numerator / args.denominator).toFixed(4);
    }

    // 二、复数运算
    addComplex(args) {
        const real = args.a + args.c;
        const imag = args.b + args.d;
        return imag >= 0 ? `${real}+${imag}i` : `${real}${imag}i`;
    }
    multiplyComplex(args) {
        const real = args.a * args.c - args.b * args.d;
        const imag = args.a * args.d + args.b * args.c;
        return imag >= 0 ? `${real}+${imag}i` : `${real}${imag}i`;
    }
    complexModulus(args) {
        return Math.sqrt(args.a **2 + args.b** 2).toFixed(4);
    }
    complexConjugate(args) {
        return args.b >= 0 ? `${args.a}-${args.b}i` : `${args.a}+${Math.abs(args.b)}i`;
    }

    // 三、单位转换
    cmToInch(args) {
        return (args.cm / 2.54).toFixed(2);
    }
    inchToCm(args) {
        return (args.inch * 2.54).toFixed(2);
    }
    celsiusToFahrenheit(args) {
        return (args.celsius * 1.8 + 32).toFixed(1);
    }
    fahrenheitToCelsius(args) {
        return ((args.fahrenheit - 32) / 1.8).toFixed(1);
    }
    kgToPound(args) {
        return (args.kg / 0.4536).toFixed(2);
    }

    // 四、数据统计进阶
    variance(args) {
        const list = args.list.filter(x => !isNaN(x));
        if (list.length < 2) return 0;
        const avg = this.average({list});
        const sumSqDiff = list.reduce((acc, val) => acc + (val - avg) **2, 0);
        return (sumSqDiff / (list.length - 1)).toFixed(4);
    }
    standardDeviation(args) {
        return Math.sqrt(parseFloat(this.variance(args))).toFixed(4);
    }
    uniqueList(args) {
        const unique = [...new Set(args.list.filter(x => !isNaN(x)))];
        return unique.join(",");
    }
    countInList(args) {
        const list = args.list.filter(x => !isNaN(x));
        return list.filter(val => val === args.target).length;
    }

    // 五、高级数论
    primeFactors(args) {
        let num = Math.abs(Math.floor(args.num));
        if (num < 2) return "无质因数";
        const factors = [];
        while (num % 2 === 0) {
            factors.push(2);
            num /= 2;
        }
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            while (num % i === 0) {
                factors.push(i);
                num /= i;
            }
        }
        if (num > 2) factors.push(num);
        return factors.join("×");
    }
    eulerFunction(args) {
        let n = Math.abs(Math.floor(args.num));
        if (n === 0) return 0;
        let result = n;
        for (let p = 2; p * p <= n; p++) {
            if (n % p === 0) {
                while (n % p === 0) n /= p;
                result -= result / p;
            }
        }
        if (n > 1) result -= result / n;
        return Math.floor(result);
    }
    areCoprime(args) {
        return this.gcd({a: args.a, b: args.b}) === 1;
    }
    combination(args) {
        const n = Math.floor(args.n);
        const k = Math.floor(args.k);
        if (k < 0 || k > n) return 0;
        if (k === 0 || k === n) return 1;
        const minK = Math.min(k, n - k);
        let result = 1;
        for (let i = 1; i <= minK; i++) {
            result = result * (n - minK + i) / i;
        }
        return Math.floor(result);
    }

    // 六、实用计算
    circleArea(args) {
        if (args.radius < 0) return 0;
        return (Math.PI * args.radius** 2).toFixed(2);
    }
    circleCircumference(args) {
        if (args.radius < 0) return 0;
        return (2 * Math.PI * args.radius).toFixed(2);
    }
    rectangleArea(args) {
        if (args.length < 0 || args.width < 0) return 0;
        return args.length * args.width;
    }
    triangleArea(args) {
        if (args.base < 0 || args.height < 0) return 0;
        return (args.base * args.height / 2).toFixed(2);
    }
    roundToDecimal(args) {
        const decimalPlaces = Math.max(0, Math.floor(args.decimalPlaces));
        return parseFloat(args.num).toFixed(decimalPlaces);
    }
    slope(args) {
        if (args.x2 === args.x1) return "无穷大（垂直直线）";
        return ((args.y2 - args.y1) / (args.x2 - args.x1)).toFixed(4);
    }
    calculatePercentage(args) {
        if (args.total === 0) return 0;
        return ((args.part / args.total) * 100).toFixed(2) + "%";
    }
    fibonacciSequence(args) {
        const n = Math.max(1, Math.floor(args.n));
        const sequence = [0, 1];
        if (n === 1) return "0";
        if (n === 2) return "0,1";
        for (let i = 2; i < n; i++) {
            sequence.push(sequence[i-1] + sequence[i-2]);
        }
        return sequence.join(",");
    }
}

Scratch.extensions.register(new MathOperationsExtension());
