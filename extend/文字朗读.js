class AutoTTS {
  constructor() {
    this.audioContext = null;
    this.gainNode = null;
    this.synth = window.speechSynthesis;
    this.voiceCache = new Map();
    this.queue = [];
    this.isSpeaking = false;

    // 静默初始化语音引擎
    this.initializeEngine();
  }

  async initializeEngine() {
    // 延迟加载音频上下文
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
      latencyHint: 'interactive'
    });
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = 3.0;

    // 后台加载语音列表
    const loadVoices = () => {
      if (this.synth.getVoices().length > 0) {
        this.synth.getVoices().forEach(voice => {
          this.voiceCache.set(voice.lang, voice);
        });
        return;
      }
      setTimeout(loadVoices, 100);
    };
    loadVoices();
  }

  getInfo() {
    return {
      id: 'autoTTS',
      name: 'TTS',
      blocks: [
        {
          opcode: 'speak',
          blockType: Scratch.BlockType.COMMAND,
          text: '朗读文本 [TEXT] 语言 [LANG]',
          arguments: {
            TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '自动播放测试' },
            LANG: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'zh-CN',
              menu: 'langMenu'
            }
          }
        },
                {
                    opcode: 'designer',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '作者信息'
                }
      ],
      menus: {
        langMenu: {
          items: ['zh-CN', 'en-US', 'ja-JP', 'ko-KR'].map(lang => ({
            text: lang,
            value: lang
          }))
        }
      }
    };
  }

designer() {
        return this.lastResult || '圆粽子yuanzongzi。https://space.bilibili.com/3546825153841333';
    }

  async processUtterance(text, lang) {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.voiceCache.get(lang) || this.voiceCache.values().next().value;
      utterance.volume = 1.0;
      utterance.onend = resolve;
      this.synth.speak(utterance);
    });
  }

  async speak(args) {
    const text = Scratch.Cast.toString(args.TEXT);
    const lang = Scratch.Cast.toString(args.LANG);
    
    try {
      // 自动恢复音频上下文状态
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const mediaStream = await this.processUtterance(text, lang);
      const source = this.audioContext.createMediaStreamSource(mediaStream);
      source.connect(this.gainNode);

      setTimeout(() => {
        source.disconnect();
      }, 5000); // 自动清理时间根据实际情况调整
    } catch (error) {
      console.error('自动播放失败:', error);
    }
  }
}

// 自动注册扩展
if (typeof Scratch !== 'undefined') {
  Scratch.extensions.register(new AutoTTS());
}
