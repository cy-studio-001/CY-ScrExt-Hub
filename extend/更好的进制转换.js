(function(Scratch) {
    'use strict';

    class BaseConverterExtension {
        getInfo() {
            return {
                id: 'baseconverter',
                name: '进制转换',
                blocks: [
                    {
                        opcode: 'toDecimal',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[NUM] 从[FROM]进制转为十进制',
                        arguments: {
                            NUM: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '1010'
                            },
                            FROM: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            }
                        }
                    },
                    {
                        opcode: 'fromDecimal',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[NUM] 从十进制转为[TO]进制',
                        arguments: {
                            NUM: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '10'
                            },
                            TO: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 16
                            }
                        }
                    },
                    {
                        opcode: 'convertBase',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[NUM] 从[FROM]进制转为[TO]进制',
                        arguments: {
                            NUM: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '1010'
                            },
                            FROM: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            },
                            TO: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 16
                            }
                        }
                    },
                    {
                        opcode: 'isValidBase',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[NUM] 是有效的[BASE]进制数?',
                        arguments: {
                            NUM: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '1010'
                            },
                            BASE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            }
                        }
                    }
                ]
            };
        }

        // 字符集：0-9, a-z
        getDigitChar(value) {
            if (value < 10) {
                return String.fromCharCode(48 + value); // '0'-'9'
            } else {
                return String.fromCharCode(97 + value - 10); // 'a'-'z'
            }
        }

        // 获取字符对应的数值
        getDigitValue(char) {
            const code = char.charCodeAt(0);
            if (code >= 48 && code <= 57) {
                return code - 48; // '0'-'9' -> 0-9
            } else if (code >= 65 && code <= 90) {
                return code - 65 + 10; // 'A'-'Z' -> 10-35
            } else if (code >= 97 && code <= 122) {
                return code - 97 + 10; // 'a'-'z' -> 10-35
            }
            return -1;
        }

        // 字符串加法（用于超大数）
        addStrings(a, b) {
            let i = a.length - 1;
            let j = b.length - 1;
            let carry = 0;
            let result = '';

            while (i >= 0 || j >= 0 || carry > 0) {
                const digitA = i >= 0 ? parseInt(a[i], 10) : 0;
                const digitB = j >= 0 ? parseInt(b[j], 10) : 0;
                const sum = digitA + digitB + carry;
                carry = Math.floor(sum / 10);
                result = (sum % 10) + result;
                i--;
                j--;
            }

            return result;
        }

        // 字符串乘法（数字 * 单位数）
        multiplyByDigit(str, digit) {
            let carry = 0;
            let result = '';

            for (let i = str.length - 1; i >= 0; i--) {
                const product = parseInt(str[i], 10) * digit + carry;
                carry = Math.floor(product / 10);
                result = (product % 10) + result;
            }

            if (carry > 0) {
                result = carry + result;
            }

            return result;
        }

        // 任意进制转十进制（支持超大数）
        toDecimal(args) {
            let num = String(args.NUM).trim();
            const fromBase = Math.max(2, Math.min(36, Math.floor(Number(args.FROM) || 10)));

            if (num === '') return '0';

            // 转换为小写
            num = num.toLowerCase();

            // 验证数字是否有效
            for (let i = 0; i < num.length; i++) {
                const value = this.getDigitValue(num[i]);
                if (value < 0 || value >= fromBase) {
                    return '0';
                }
            }

            // 转换为十进制
            let result = '0';
            for (let i = 0; i < num.length; i++) {
                const digitValue = this.getDigitValue(num[i]);
                
                // result = result * fromBase + digitValue
                result = this.multiplyByDigit(result, fromBase);
                result = this.addStrings(result, digitValue.toString());
            }

            return result;
        }

        // 十进制转任意进制（支持超大数）
        fromDecimal(args) {
            let decimal = String(args.NUM).trim();
            const toBase = Math.max(2, Math.min(36, Math.floor(Number(args.TO) || 10)));

            if (decimal === '' || decimal === '0') return '0';

            // 验证是否为有效的十进制数
            if (!/^\d+$/.test(decimal)) {
                return '0';
            }

            // 转换为目标进制
            let result = '';
            let num = decimal;

            while (num !== '0') {
                // 计算余数
                let remainder = 0;
                let newNum = '';

                for (let i = 0; i < num.length; i++) {
                    const digit = parseInt(num[i], 10);
                    const value = remainder * 10 + digit;
                    const quotient = Math.floor(value / toBase);
                    remainder = value % toBase;

                    if (newNum !== '' || quotient !== 0) {
                        newNum += quotient;
                    }
                }

                num = newNum || '0';
                result = this.getDigitChar(remainder) + result;
            }

            return result;
        }

        // 任意进制转任意进制
        convertBase(args) {
            // 先转为十进制，再从十进制转为目标进制
            const decimal = this.toDecimal({
                NUM: args.NUM,
                FROM: args.FROM
            });

            return this.fromDecimal({
                NUM: decimal,
                TO: args.TO
            });
        }

        // 验证是否为有效的某进制数
        isValidBase(args) {
            let num = String(args.NUM).trim();
            const base = Math.max(2, Math.min(36, Math.floor(Number(args.BASE) || 10)));

            if (num === '') return false;

            // 转换为小写
            num = num.toLowerCase();

            for (let i = 0; i < num.length; i++) {
                const value = this.getDigitValue(num[i]);
                if (value < 0 || value >= base) {
                    return false;
                }
            }

            return true;
        }
    }

    Scratch.extensions.register(new BaseConverterExtension());
})(Scratch);