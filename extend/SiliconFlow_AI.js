// SiliconFlow AI扩展 for TurboWarp
class SiliconFlowExtension {
    constructor() {
        this.apiKey = 'sk-tffjrfcmrbfmvkdmjjhkdejisfjgmuksvlazkyxdwtfkqqkk';
        this.model = 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B';
        this.systemPrompt = '你是一个有用的AI助手';
        this.isLoading = false;
        this.lastResponse = ''; // 存储最后一次AI回复
        this.maxTokens = 2048; // 默认上下文用量
        
        // 新增参数设置
        this.maxResponseTokens = 512; // 默认最大回复长度
        this.temperature = 0.7; // 默认随机性
        this.topP = 1.0; // 默认核采样
        this.frequencyPenalty = 0.0; // 默认频率惩罚
        this.presencePenalty = 0.0; // 默认存在惩罚
        
        // 文件相关状态
        this.currentFile = null;
        this.currentFileContent = null;
    }

    getInfo() {
        return {
            id: 'siliconflowai',
            name: 'SiliconFlow AI',
            color1: '#4c6bfe',
            color2: '#4c6bfe',
            blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0MC41MjY0OCIgaGVpZ2h0PSI0MC41MjY0OCIgdmlld0JveD0iMCwwLDQwLjUyNjQ4LDQwLjUyNjQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE5LjczNjc2LC0xNTkuNzM2NzYpIj48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTIxOS43MzY3NiwxODBjMCwtMTEuMTkxMDggOS4wNzIxNywtMjAuMjYzMjQgMjAuMjYzMjQsLTIwLjI2MzI0YzExLjE5MDgsMCAyMC4yNjMyNCw5LjA3MjE3IDIwLjI2MzI0LDIwLjI2MzI0YzAsMTEuMTkwOCAtOS4wNzIxNywyMC4yNjMyNCAtMjAuMjYzMjQsMjAuMjYzMjRjLTExLjE5MDgsMCAtMjAuMjYzMjQsLTkuMDcyMTcgLTIwLjI2MzI0LC0yMC4yNjMyNHoiIGZpbGw9IiM0YzZiZmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNDYuMDg0MzksMTcwLjMwOTM5YzAuMzE2ODksMC43MDk4NCAwLjQ2OTAxLDAuODQ5MjggMS41OTcxNSwxLjUwODQyYzAuNTA3MDMsMC4zMDQyMiAwLjc3MzIyLDAuNTU3NzMgMC45NzYwNCwwLjk2MzM2YzAuMTUyMTEsMC4zMDQyMiAwLjMwNDIyLDAuNTcwNDEgMC4zMjk1NywwLjYwODQ0YzAuMDM4MDMsMC4wMjUzNSAwLjMxNjg5LC0wLjEyNjc2IDAuNjQ2NDYsLTAuMzQyMjVjMC40NjksLTAuMzE2ODkgMC43NzMyMiwtMC40MTgzIDEuNTcxOCwtMC40OTQzNmMxLjExNTQ3LC0wLjExNDA4IDEuNDE5NjksLTAuMjQwODQgMi4wNjYxNSwtMC44NjE5NWMwLjYwODQ0LC0wLjU4MzA5IDAuODc0NjMsLTAuNDgxNjggMC44NzQ2MywwLjM1NDkyYzAsMS4zMTgyOCAtMC44MTEyNSwyLjk0MDc4IC0xLjgxMjY0LDMuNjg4NjVjLTAuNjIxMTEsMC40NDM2NSAtMC45MTI2NiwwLjU3MDQxIC0xLjkyNjcyLDAuODQ5MjhsLTAuNzYwNTUsMC4yMDI4MWwtMC4wNzYwNiwxLjAxNDA2Yy0wLjIyODE2LDIuODc3NCAtMS4zNTYzMSw1LjU1MTk5IC0zLjI3MDM1LDcuNzE5NTVjLTAuMzY3NiwwLjQwNTYzIC0wLjYzMzc5LDAuNzk4NTggLTAuNjIxMTEsMC44NjE5NWMwLjAyNTM1LDAuMDc2MDYgMC4zOTI5NSwwLjI2NjE5IDAuODExMjUsMC40MTgzYzEuMTI4MTQsMC40MzA5OCAxLjgyNTMxLDAuODExMjUgMS44MjUzMSwxLjAwMTM5YzAsMC4xMDE0MSAtMC4xMDE0MSwwLjI5MTU0IC0wLjIxNTQ5LDAuNDQzNjVjLTAuNDMwOTgsMC41MzIzOCAtMi4zNzAzNywwLjYyMTExIC0zLjk0MjE3LDAuMTkxMTRsLTAuNjcxODIsLTAuMTkxMTRsLTAuNjA4NDQsMC40NDM2NWMtMC44MjM5MywwLjYwODQ0IC0xLjkzOTM5LDEuMTQwODIgLTIuOTI4MTEsMS40MTk2OWMtMC42NDY0NiwwLjE3NzQ2IC0xLjI5MjkzLDAuMjI4MTYgLTIuOTc4ODEsMC4yNDA4NGMtMi4xMDQxOCwwIC0yLjE4MDIzLC0wLjAxMjY4IC0zLjM0NjQxLC0wLjQxODNjLTEuNzM2NTgsLTAuNTk1NzYgLTMuMDI5NTEsLTEuNDE5NjkgLTQuMzk4NSwtMi43NTA2NGMtMi4zNTc3LC0yLjMwNjk5IC0zLjM3MTc2LC00LjcyODA3IC0zLjM3MTc2LC03Ljk4NTc0YzAuMDEyNjgsLTIuNDQ2NDMgMC44MTEyNSwtNC40MjM4NSAyLjQ4NDQ1LC02LjA5NzA1YzEuNjczMiwtMS42NzMyIDMuNDczMTYsLTIuMjgxNjQgNi4zNzU5MiwtMi4xNjc1NmMxLjYyMjUsMC4wNzYwNiAxLjcxMTIzLDAuMDYzMzggMi43ODg2NywtMC4zMDQyMmMxLjIxNjg4LC0wLjQxODMgMi45OTE0OCwtMC42MjExMSAzLjMzMzczLC0wLjM2NzZjMC4xNjQ3OSwwLjExNDA4IDAuMTUyMTEsMC4xNTIxMSAtMC4wNTA3LDAuMjc4ODdjLTAuNTA3MDMsMC4yOTE1NCAtMC44MzY2LDAuNzczMjIgLTAuODM2NiwxLjIwNDJjMCwwLjU5NTc2IDAuMTY0NzksMC44NDkyOCAwLjg2MTk1LDEuMzMwOTZjMC4zMjk1NywwLjIyODE2IDEuMzQzNjMsMS4xMjgxNSAyLjI0MzYxLDIuMDAyNzdjMS42MDk4MiwxLjU1OTEyIDIuNDA4NCwyLjE5MjkxIDMuMTU2MjcsMi41MDk4YzAuNDQzNjUsMC4xOTAxNCAwLjQ4MTY4LDAuMTUyMTEgMC43NjA1NSwtMC42NzE4MmwwLjIwMjgxLC0wLjYyMTExbC0wLjczNTIsLTAuNjU5MTRjLTAuMzkyOTUsLTAuMzU0OTIgLTAuODc0NjMsLTAuOTM4MDEgLTEuMDY0NzcsLTEuMjY3NThjLTAuNjcxODIsLTEuMjQyMjMgLTAuNzYwNTUsLTIuOTc4ODEgLTAuMjQwODQsLTQuMTgzMDFjMC4zMjk1NywtMC43NDc4NyAwLjU4MzA4LC0wLjcwOTg0IDAuOTUwNjgsMC4xMjY3NnptLTE4LjI2NTgsNi45NDYzMmMtMC4yMTU0OSwwLjE3NzQ2IC0wLjIwMjgxLDEuMjgwMjUgMC4wMjUzNSwyLjM0NTAyYzAuNjg0NDksMy4yNDUgMi42NDkyNCw2LjA4NDM4IDUuMTU5MDQsNy40NTMzNmMwLjc5ODU3LDAuNDMwOTggMS44NzYwMiwwLjU1NzczIDIuMzE5NjcsMC4yNjYxOWMwLjM5Mjk1LC0wLjI1MzUxIDAuMzkyOTUsLTAuMzQyMjUgLTAuMDEyNjgsLTEuMTY2MTdjLTAuMzU0OTIsLTAuNzM1MiAtMC4zNjc2LC0xLjIyOTU1IDAsLTEuMjkyOTNjMC4zNjc2LC0wLjA3NjA2IDEuNjczMiwwLjY1OTE0IDMuMjQ1LDEuODI1MzFjMS42NDc4NSwxLjIxNjg4IDIuMjMwOTQsMS40NDUwNCAzLjY2MzMsMS40NDUwNGgwLjk2MzM2bC0wLjU3MDQxLC0wLjQ2OWMtMC45ODg3MSwtMC43OTg1NyAtMi4yMTgyNiwtMi4xNDIyMSAtMy4wNTQ4NiwtMy4zNDY0MWMtMi4zNTc3LC0zLjM4NDQzIC0zLjIxOTY1LC00LjM2MDQ3IC00Ljc5MTQ1LC01LjQyNTI0Yy0xLjMwNTYxLC0wLjg4NzMgLTIuNDg0NDUsLTEuMzgxNjYgLTQuMTA2OTUsLTEuNzIzOTFjLTEuMTc4ODUsLTAuMjUzNTEgLTIuNDcxNzgsLTAuMjE1NDkgLTIuODM5MzgsMC4wODg3M3ptMTIuODkxMjcsMC44NDY2MWMtMC4zOTI5NSwwLjMxNjg5IC0wLjIxNTQ5LDAuNjQ2NDYgMC40MTgzLDAuNzQ3ODdjMC43MzUyLDAuMTE0MDggMS4wMTQwNiwwLjQ0MzY1IDAuOTEyNjYsMS4wMzk0MmMtMC4yMjgxNiwxLjMzMDk2IDEuMTUzNSwyLjM0NTAyIDIuMzQ1MDIsMS43MjM5MWMwLjIxNTQ5LC0wLjExNDA4IDAuMzgwMjcsLTAuMjUzNTEgMC4zODAyNywtMC4zMjk1N2MwLC0wLjA3NjA2IC0wLjE5MDE0LC0wLjQ4MTY4IC0wLjQwNTYzLC0wLjkxMjY2Yy0wLjUwNzAzLC0wLjkzODAxIC0xLjQ3MDM5LC0yLjAxNTQ1IC0yLjA1MzQ4LC0xLjI5NDMyYzAuNTcwNDEsLTAuMjY2MTkgLTEuMjQyMjMsLTAuMjUzNTIgLTEuNTk3MTUsMC4wMjUzNXptMCwxLjA5OTgyYzAsMC4zNTQ5MiAwLjI3ODg3LDAuNDgxNjggMC41OTU3NiwwLjI1MzUxYzAuMTc3NDYsLTAuMTM5NDMgMC4yMDI4MSwtMC4yMjgxNiAwLjA4ODczLC0wLjM5Mjk1Yy0wLjI1MzUxLC0wLjQxODMgLTAuNjg0NDksLTAuMzI5NTcgLTAuNjg0NDksMC4xMzk0M3oiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+',
            docsURI: 'https://docs.siliconflow.cn/cn/api-reference/chat-completions/chat-completions', 
            blocks: [
                {
                    opcode: 'setup',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置AI密钥: [KEY] 模型: [MODEL]',
                    arguments: {
                        KEY: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'sk-你的密钥'
                        },
                        MODEL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B'
                        }
                    }
                },
                // === 系统提示词设置 ===
                {
                    opcode: 'setSystemPrompt',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置系统提示词: [PROMPT]',
                    arguments: {
                        PROMPT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '你是一个有用的AI助手'
                        }
                    }
                },
                {
                    opcode: 'getSystemPrompt',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前系统提示词'
                },
                // === 分隔线 ===
                {
                    opcode: 'separator1',
                    blockType: Scratch.BlockType.LABEL,
                    text: '上下文设置'
                },
                // 上下文用量设置
                {
                    opcode: 'setMaxTokens',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置上下文用量 [TOKENS]',
                    arguments: {
                        TOKENS: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 2048
                        }
                    }
                },
                {
                    opcode: 'getMaxTokens',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前上下文用量'
                },
                {
                    opcode: 'setMaxTokensKB',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置上下文用量 [KB] KB',
                    arguments: {
                        KB: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 128
                        }
                    }
                },
                // === 分隔线 ===
                {
                    opcode: 'separator2',
                    blockType: Scratch.BlockType.LABEL,
                    text: '回复控制'
                },
                // 回复长度控制
                {
                    opcode: 'setMaxResponseTokens',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置最大回复长度 [TOKENS] tokens',
                    arguments: {
                        TOKENS: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 512
                        }
                    }
                },
                {
                    opcode: 'getMaxResponseTokens',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前最大回复长度'
                },
                // 随机性控制
                {
                    opcode: 'setTemperature',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置随机性 [TEMP]',
                    arguments: {
                        TEMP: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0.7
                        }
                    }
                },
                {
                    opcode: 'getTemperature',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前随机性'
                },
                // 核采样控制
                {
                    opcode: 'setTopP',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置核采样 [TOP_P]',
                    arguments: {
                        TOP_P: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 1.0
                        }
                    }
                },
                {
                    opcode: 'getTopP',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前核采样'
                },
                // 频率惩罚
                {
                    opcode: 'setFrequencyPenalty',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置频率惩罚 [PENALTY]',
                    arguments: {
                        PENALTY: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0.0
                        }
                    }
                },
                {
                    opcode: 'getFrequencyPenalty',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前频率惩罚'
                },
                // 存在惩罚
                {
                    opcode: 'setPresencePenalty',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置存在惩罚 [PENALTY]',
                    arguments: {
                        PENALTY: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0.0
                        }
                    }
                },
                {
                    opcode: 'getPresencePenalty',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前存在惩罚'
                },
                // 快速设置积木
                {
                    opcode: 'setCreativeMode',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置创意模式'
                },
                {
                    opcode: 'setPreciseMode',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置精确模式'
                },
                {
                    opcode: 'setBalancedMode',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置平衡模式'
                },
                // === 分隔线 ===
                {
                    opcode: 'separator3',
                    blockType: Scratch.BlockType.LABEL,
                    text: '对话功能'
                },
                // === 对话积木 ===
                {
                    opcode: 'simpleChatCommand',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'AI回复 [MESSAGE]',
                    arguments: {
                        MESSAGE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '你好'
                        }
                    }
                },
                {
                    opcode: 'chatWithRoleCommand',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '作为 [ROLE] 回复 [MESSAGE]',
                    arguments: {
                        ROLE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '助手'
                        },
                        MESSAGE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '你好'
                        }
                    }
                },
                {
                    opcode: 'chatWithCustomPromptCommand',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '使用提示词 [PROMPT] 回复 [MESSAGE]',
                    arguments: {
                        PROMPT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '请用中文回答'
                        },
                        MESSAGE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '你好'
                        }
                    }
                },
                {
                    opcode: 'chatWithFileCommand',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'AI分析文件 [FILE_ID] 问题: [QUESTION]',
                    arguments: {
                        FILE_ID: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ''
                        },
                        QUESTION: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '请分析这个文件'
                        }
                    }
                },
                // 获取回答的积木
                {
                    opcode: 'getResponse',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '回答'
                },
                // === 分隔线 ===
                {
                    opcode: 'separator4',
                    blockType: Scratch.BlockType.LABEL,
                    text: '文件功能'
                },
                // 文件选择功能
                {
                    opcode: 'selectFile',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '选择文件'
                },
                {
                    opcode: 'isFileSelected',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '已选择文件？'
                },
                {
                    opcode: 'getFileName',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '文件名'
                },
                {
                    opcode: 'getFileSize',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '文件大小'
                },
                {
                    opcode: 'getFileContent',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '文件内容'
                },
                // === 状态查询 ===
                {
                    opcode: 'separator5',
                    blockType: Scratch.BlockType.LABEL,
                    text: '状态查询'
                },
                {
                    opcode: 'isThinking',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '正在思考？'
                },
                {
                    opcode: 'getModel',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前模型'
                },
                // === 新增：当前API密钥 ===
                {
                    opcode: 'getApiKey',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前API密钥'
                }
            ]
        };
    }

    setup(args) {
        this.apiKey = args.KEY;
        this.model = args.MODEL;
        return '';
    }

    // 系统提示词设置方法
    setSystemPrompt(args) {
        this.systemPrompt = args.PROMPT;
        this.lastResponse = `系统提示词已设置为: ${args.PROMPT}`;
        return '';
    }

    getSystemPrompt() {
        return this.systemPrompt;
    }

    // 设置上下文用量（tokens）
    setMaxTokens(args) {
        const tokens = Number(args.TOKENS);
        if (tokens > 0) {
            this.maxTokens = tokens;
            this.lastResponse = `上下文用量已设置为: ${tokens} tokens`;
        } else {
            this.lastResponse = '错误：上下文用量必须大于0';
        }
        return '';
    }

    // 获取当前上下文用量
    getMaxTokens() {
        return this.maxTokens;
    }

    // 设置上下文用量（KB单位，转换为tokens）
    setMaxTokensKB(args) {
        const kb = Number(args.KB);
        if (kb > 0) {
            const estimatedTokens = Math.floor(kb * 1024 * 0.75);
            this.maxTokens = estimatedTokens;
            this.lastResponse = `上下文用量已设置为: ${kb} KB (约 ${estimatedTokens} tokens)`;
        } else {
            this.lastResponse = '错误：上下文用量必须大于0';
        }
        return '';
    }

    // === 参数设置方法 ===
    
    // 设置最大回复长度
    setMaxResponseTokens(args) {
        const tokens = Number(args.TOKENS);
        if (tokens > 0 && tokens <= 4096) {
            this.maxResponseTokens = tokens;
            this.lastResponse = `最大回复长度已设置为: ${tokens} tokens`;
        } else {
            this.lastResponse = '错误：最大回复长度必须在1-4096之间';
        }
        return '';
    }

    getMaxResponseTokens() {
        return this.maxResponseTokens;
    }

    // 设置随机性（temperature）
    setTemperature(args) {
        const temp = Number(args.TEMP);
        if (temp >= 0.0 && temp <= 2.0) {
            this.temperature = temp;
            this.lastResponse = `随机性已设置为: ${temp}`;
        } else {
            this.lastResponse = '错误：随机性必须在0.0-2.0之间';
        }
        return '';
    }

    getTemperature() {
        return this.temperature;
    }

    // 设置核采样（top_p）
    setTopP(args) {
        const topP = Number(args.TOP_P);
        if (topP >= 0.0 && topP <= 1.0) {
            this.topP = topP;
            this.lastResponse = `核采样已设置为: ${topP}`;
        } else {
            this.lastResponse = '错误：核采样必须在0.0-1.0之间';
        }
        return '';
    }

    getTopP() {
        return this.topP;
    }

    // 设置频率惩罚
    setFrequencyPenalty(args) {
        const penalty = Number(args.PENALTY);
        if (penalty >= -2.0 && penalty <= 2.0) {
            this.frequencyPenalty = penalty;
            this.lastResponse = `频率惩罚已设置为: ${penalty}`;
        } else {
            this.lastResponse = '错误：频率惩罚必须在-2.0-2.0之间';
        }
        return '';
    }

    getFrequencyPenalty() {
        return this.frequencyPenalty;
    }

    // 设置存在惩罚
    setPresencePenalty(args) {
        const penalty = Number(args.PENALTY);
        if (penalty >= -2.0 && penalty <= 2.0) {
            this.presencePenalty = penalty;
            this.lastResponse = `存在惩罚已设置为: ${penalty}`;
        } else {
            this.lastResponse = '错误：存在惩罚必须在-2.0-2.0之间';
        }
        return '';
    }

    getPresencePenalty() {
        return this.presencePenalty;
    }

    // 快速设置模式
    setCreativeMode() {
        this.temperature = 0.9;
        this.topP = 0.9;
        this.frequencyPenalty = 0.1;
        this.presencePenalty = 0.1;
        this.lastResponse = '已设置为创意模式（高随机性，适合创意写作）';
        return '';
    }

    setPreciseMode() {
        this.temperature = 0.2;
        this.topP = 0.1;
        this.frequencyPenalty = 0.0;
        this.presencePenalty = 0.0;
        this.lastResponse = '已设置为精确模式（低随机性，适合事实回答）';
        return '';
    }

    setBalancedMode() {
        this.temperature = 0.7;
        this.topP = 1.0;
        this.frequencyPenalty = 0.0;
        this.presencePenalty = 0.0;
        this.lastResponse = '已设置为平衡模式（适中的随机性）';
        return '';
    }

    // === 新增：获取当前API密钥 ===
    getApiKey() {
        // 为了保护用户安全，只显示前10个字符和后4个字符，中间用*代替
        if (!this.apiKey || this.apiKey === 'sk-你的密钥') {
            return '未设置API密钥';
        }
        
        if (this.apiKey.length <= 14) {
            return this.apiKey; // 如果密钥太短，直接返回
        }
        
        const visibleStart = this.apiKey.substring(0, 10);
        const visibleEnd = this.apiKey.substring(this.apiKey.length - 4);
        const hiddenLength = this.apiKey.length - 14;
        const hiddenPart = '*'.repeat(hiddenLength > 0 ? hiddenLength : 4);
        
        return `${visibleStart}${hiddenPart}${visibleEnd}`;
    }

    // 方形对话积木方法
    async simpleChatCommand(args) {
        this.lastResponse = await this.sendToAI(this.systemPrompt, args.MESSAGE);
        return '';
    }

    async chatWithRoleCommand(args) {
        const rolePrompt = `你是一个${args.ROLE}，请根据你的角色特点来回答问题`;
        this.lastResponse = await this.sendToAI(rolePrompt, args.MESSAGE);
        return '';
    }

    async chatWithCustomPromptCommand(args) {
        this.lastResponse = await this.sendToAI(args.PROMPT, args.MESSAGE);
        return '';
    }

    async chatWithFileCommand(args) {
        const fileId = args.FILE_ID;
        const question = args.QUESTION;

        if (!fileId) {
            this.lastResponse = '错误：请提供有效的文件ID';
            return '';
        }

        this.isLoading = true;

        try {
            const systemMessage = `${this.systemPrompt}\n\n你有一个可用的文件(文件ID: ${fileId})，请根据文件内容回答问题。`;
            const userMessage = `${question}\n\n请参考文件ID: ${fileId} 的内容进行回答。`;

            const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: 'system',
                            content: systemMessage
                        },
                        {
                            role: 'user',
                            content: userMessage
                        }
                    ],
                    stream: false,
                    max_tokens: this.maxResponseTokens,
                    temperature: this.temperature,
                    top_p: this.topP,
                    frequency_penalty: this.frequencyPenalty,
                    presence_penalty: this.presencePenalty
                })
            });

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.choices && data.choices[0] && data.choices[0].message) {
                this.lastResponse = this.cleanThinkTags(data.choices[0].message.content);
            } else {
                this.lastResponse = '错误：没有收到有效回复';
            }

        } catch (error) {
            this.lastResponse = `请求失败: ${error.message}`;
        } finally {
            this.isLoading = false;
        }
        return '';
    }

    // 获取回答的方法
    getResponse() {
        return this.lastResponse || '暂无回复';
    }

    // 直接打开文件选择对话框
    selectFile() {
        return new Promise((resolve) => {
            const callback = (content, file = null) => {
                this.currentFile = file;
                this.currentFileContent = content;
                if (file) {
                    this.lastResponse = `文件已选择: ${file.name} (${this.formatFileSize(file.size)})`;
                } else {
                    this.lastResponse = '未选择文件';
                }
                resolve('');
            };

            let isReadingFile = false;

            const readFile = async (file) => {
                if (isReadingFile) return;
                isReadingFile = true;

                try {
                    const content = await this.readFileAsText(file);
                    callback(content, file);
                } catch (error) {
                    console.error("读取文件失败", error);
                    callback("", null);
                }
            };

            const input = document.createElement("input");
            input.type = "file";
            input.accept = "*/*";
            
            input.addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (file) {
                    readFile(file);
                } else {
                    callback("", null);
                }
            });

            input.addEventListener("cancel", () => {
                callback("", null);
            });

            input.click();
        });
    }

    // 读取文件为文本
    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }

    // 文件信息获取方法
    isFileSelected() {
        return this.currentFile !== null;
    }

    getFileName() {
        return this.currentFile ? this.currentFile.name : '无文件';
    }

    getFileSize() {
        return this.currentFile ? this.formatFileSize(this.currentFile.size) : '0';
    }

    getFileContent() {
        return this.currentFileContent || '';
    }

    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 清除思考标签及其之前的内容
    cleanThinkTags(content) {
        if (typeof content !== 'string') {
            return content;
        }
        
        const thinkEndIndex = content.indexOf('</think>');
        if (thinkEndIndex !== -1) {
            return content.substring(thinkEndIndex + 8);
        }
        
        return content;
    }

    async sendToAI(systemPrompt, userMessage) {
        if (!this.apiKey || this.apiKey === 'sk-你的密钥') {
            return '错误：请先设置正确的API密钥';
        }

        this.isLoading = true;

        try {
            const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt
                        },
                        {
                            role: 'user',
                            content: userMessage
                        }
                    ],
                    stream: false,
                    max_tokens: this.maxResponseTokens,
                    temperature: this.temperature,
                    top_p: this.topP,
                    frequency_penalty: this.frequencyPenalty,
                    presence_penalty: this.presencePenalty
                })
            });

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.choices && data.choices[0] && data.choices[0].message) {
                return this.cleanThinkTags(data.choices[0].message.content);
            } else {
                return '错误：没有收到有效回复';
            }

        } catch (error) {
            return `请求失败: ${error.message}`;
        } finally {
            this.isLoading = false;
        }
    }

    isThinking() {
        return this.isLoading;
    }

    getModel() {
        return this.model;
    }

    // 分隔线方法（空方法）
    separator1() { return ''; }
    separator2() { return ''; }
    separator3() { return ''; }
    separator4() { return ''; }
    separator5() { return ''; }
}

// TurboWarp扩展注册
(function() {
    const extensionInstance = new SiliconFlowExtension();
    
    if (typeof window.ScratchextAddons !== 'undefined') {
        window.ScratchextAddons.extend(extensionInstance);
    } else if (typeof Scratch !== 'undefined' && Scratch.extensions) {
        Scratch.extensions.register(extensionInstance);
    } else {
        setTimeout(() => {
            if (window.ScratchExtensions) {
                window.ScratchExtensions.register('SiliconFlow AI', extensionInstance);
            }
        }, 1000);
    }
})();