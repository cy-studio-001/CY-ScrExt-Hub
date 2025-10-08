// Scratch登录弹窗扩展
// 支持设置是否需要密码、自定义标题和颜色
(function(Scratch) {
  'use strict';

  // 主扩展类
  class LoginDialogExtension {
    constructor() {
      this.dialogCount = 0;
      this.lastNoPasswordResult = '';
      this.lastWithPasswordResult = '';
      this.isLoginComplete = false;
      this.loginPromise = null;
    }

    // 创建登录弹窗并返回Promise
    showLoginDialog(options) {
      return new Promise((resolve) => {
        this.dialogCount++;
        const dialogId = `login-dialog-${this.dialogCount}`;
        
        // 创建弹窗容器
        const dialogContainer = document.createElement('div');
        dialogContainer.id = dialogId;
        dialogContainer.style.position = 'fixed';
        dialogContainer.style.top = '0';
        dialogContainer.style.left = '0';
        dialogContainer.style.width = '100%';
        dialogContainer.style.height = '100%';
        dialogContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        dialogContainer.style.display = 'flex';
        dialogContainer.style.justifyContent = 'center';
        dialogContainer.style.alignItems = 'center';
        dialogContainer.style.zIndex = '10000';
        dialogContainer.style.fontFamily = 'Arial, sans-serif';
        
        // 创建弹窗主体
        const dialog = document.createElement('div');
        dialog.style.backgroundColor = options.bgColor || '#ffffff';
        dialog.style.borderRadius = '8px';
        dialog.style.padding = '20px';
        dialog.style.minWidth = '300px';
        dialog.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        
        // 创建标题
        const title = document.createElement('h2');
        title.innerText = options.title || '登录';
        title.style.color = options.titleColor || '#000000';
        title.style.marginTop = '0';
        title.style.textAlign = 'center';
        
        // 创建表单
        const form = document.createElement('form');
        
        // 创建用户名输入框
        const usernameContainer = document.createElement('div');
        usernameContainer.style.marginBottom = '15px';
        
        const usernameLabel = document.createElement('label');
        usernameLabel.innerText = options.usernameLabel || '用户名:';
        usernameLabel.style.display = 'block';
        usernameLabel.style.marginBottom = '5px';
        usernameLabel.style.color = options.labelColor || '#000000';
        
        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.placeholder = '请输入用户名';
        usernameInput.style.width = '100%';
        usernameInput.style.padding = '8px';
        usernameInput.style.border = `1px solid ${options.inputBorderColor || '#cccccc'}`;
        usernameInput.style.borderRadius = '4px';
        usernameInput.style.boxSizing = 'border-box';
        
        usernameContainer.appendChild(usernameLabel);
        usernameContainer.appendChild(usernameInput);
        
        // 密码输入框（如果需要）
        let passwordContainer = null;
        let passwordInput = null;
        
        if (options.requirePassword) {
          passwordContainer = document.createElement('div');
          passwordContainer.style.marginBottom = '15px';
          
          const passwordLabel = document.createElement('label');
          passwordLabel.innerText = options.passwordLabel || '密码:';
          passwordLabel.style.display = 'block';
          passwordLabel.style.marginBottom = '5px';
          passwordLabel.style.color = options.labelColor || '#000000';
          
          passwordInput = document.createElement('input');
          passwordInput.type = 'password';
          passwordInput.placeholder = '请输入密码';
          passwordInput.style.width = '100%';
          passwordInput.style.padding = '8px';
          passwordInput.style.border = `1px solid ${options.inputBorderColor || '#cccccc'}`;
          passwordInput.style.borderRadius = '4px';
          passwordInput.style.boxSizing = 'border-box';
          
          passwordContainer.appendChild(passwordLabel);
          passwordContainer.appendChild(passwordInput);
        }
        
        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.gap = '10px';
        
        // 创建确认按钮
        const confirmButton = document.createElement('button');
        confirmButton.type = 'button';
        confirmButton.innerText = options.confirmText || '登录';
        confirmButton.style.padding = '8px 16px';
        confirmButton.style.backgroundColor = options.confirmColor || '#4CAF50';
        confirmButton.style.color = 'white';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '4px';
        confirmButton.style.cursor = 'pointer';
        
        // 创建取消按钮
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.innerText = options.cancelText || '取消';
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.backgroundColor = options.cancelColor || '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';
        
        // 组装弹窗
        buttonContainer.appendChild(confirmButton);
        buttonContainer.appendChild(cancelButton);
        
        form.appendChild(usernameContainer);
        if (passwordContainer) {
          form.appendChild(passwordContainer);
        }
        form.appendChild(buttonContainer);
        
        dialog.appendChild(title);
        dialog.appendChild(form);
        dialogContainer.appendChild(dialog);
        
        // 添加到页面
        document.body.appendChild(dialogContainer);
        
        // 自动聚焦到用户名输入框
        usernameInput.focus();
        
        // 确认按钮点击事件
        confirmButton.addEventListener('click', () => {
          const username = usernameInput.value.trim();
          const result = { username };
          
          if (options.requirePassword && passwordInput) {
            result.password = passwordInput.value;
          }
          
          document.body.removeChild(dialogContainer);
          resolve(result);
        });
        
        // 取消按钮点击事件
        cancelButton.addEventListener('click', () => {
          document.body.removeChild(dialogContainer);
          resolve(null);
        });
        
        // 按ESC键关闭弹窗
        const handleEscape = (event) => {
          if (event.key === 'Escape') {
            document.body.removeChild(dialogContainer);
            resolve(null);
            document.removeEventListener('keydown', handleEscape);
          }
        };
        
        document.addEventListener('keydown', handleEscape);
        
        // 点击弹窗外部关闭（可选）
        if (options.closeOnOutsideClick !== false) {
          dialogContainer.addEventListener('click', (event) => {
            if (event.target === dialogContainer) {
              document.body.removeChild(dialogContainer);
              resolve(null);
            }
          });
        }
        
        // 按Enter键确认
        form.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            confirmButton.click();
          }
        });
      });
    }

    // 登录弹窗积木（无密码）
    async showLoginNoPassword(args) {
      const options = {
        title: args.title || '登录',
        requirePassword: false,
        usernameLabel: args.usernameLabel || '用户名:',
        bgColor: args.bgColor || '#ffffff',
        titleColor: args.titleColor || '#000000',
        labelColor: args.labelColor || '#000000',
        inputBorderColor: args.inputBorderColor || '#cccccc',
        confirmText: args.confirmText || '登录',
        confirmColor: args.confirmColor || '#4CAF50',
        cancelText: args.cancelText || '取消',
        cancelColor: args.cancelColor || '#f44336',
        closeOnOutsideClick: args.closeOnOutsideClick !== 'false'
      };
      
      const result = await this.showLoginDialog(options);
      return result ? result.username : '';
    }

    // 登录弹窗积木（有密码）
    async showLoginWithPassword(args) {
      const options = {
        title: args.title || '登录',
        requirePassword: true,
        usernameLabel: args.usernameLabel || '用户名:',
        passwordLabel: args.passwordLabel || '密码:',
        bgColor: args.bgColor || '#ffffff',
        titleColor: args.titleColor || '#000000',
        labelColor: args.labelColor || '#000000',
        inputBorderColor: args.inputBorderColor || '#cccccc',
        confirmText: args.confirmText || '登录',
        confirmColor: args.confirmColor || '#4CAF50',
        cancelText: args.cancelText || '取消',
        cancelColor: args.cancelColor || '#f44336',
        closeOnOutsideClick: args.closeOnOutsideClick !== 'false'
      };
      
      const result = await this.showLoginDialog(options);
      if (result) {
        // 使用分隔符将用户名和密码连接起来，便于在Scratch中拆分
        return `${result.username}|${result.password}`;
      }
      return '';
    }

    // 拆分用户名和密码的积木
    splitCredentials(args) {
      const credentials = args.credentials || '';
      const parts = credentials.split('|');
      
      if (parts.length >= 2) {
        if (args.part === '用户名') {
          return parts[0];
        } else if (args.part === '密码') {
          return parts[1];
        }
      }
      return '';
    }

    // 扩展信息和积木定义
    getInfo() {
      return {
        id: 'loginDialogExtension',
        name: '登录弹窗',
        color1: '#64B5F6',
        color2: '#2196F3',
        blocks: [
          // 命令类型：显示登录弹窗（可选择是否需要密码）
          {
            opcode: 'showLoginDialogCmd',
            blockType: Scratch.BlockType.COMMAND,
            text: '显示登录弹窗 标题 [TITLE] 需密码 [REQUIRE_PASSWORD]',
            arguments: {
              TITLE: {type: Scratch.ArgumentType.STRING, defaultValue: '登录'},
              REQUIRE_PASSWORD: {
                type: Scratch.ArgumentType.STRING,
                menu: 'PASSWORD_OPTIONS',
                defaultValue: '没有'
              }
            }
          },
          
          // 报告类型：获取登录结果
          {
            opcode: 'getLoginResult',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取登录[PART]',
            arguments: {
              PART: {
                type: Scratch.ArgumentType.STRING,
                menu: 'LOGIN_PARTS',
                defaultValue: '用户名'
              }
            }
          },
          
          // 报告类型：拆分凭证
          {
            opcode: 'splitCredentials',
            blockType: Scratch.BlockType.REPORTER,
            text: '从 [CREDENTIALS] 中获取 [PART]',
            arguments: {
              CREDENTIALS: {type: Scratch.ArgumentType.STRING, defaultValue: ''},
              PART: {
                type: Scratch.ArgumentType.STRING,
                menu: 'CREDENTIAL_PARTS',
                defaultValue: '用户名'
              }
            }
          },
          
          // 更高级的登录弹窗（可自定义更多选项）
          {
            opcode: 'advancedLoginDialog',
            blockType: Scratch.BlockType.REPORTER,
            text: '高级登录弹窗 标题 [TITLE] 需密码 [REQUIRE_PASSWORD] 用户名标签 [USERNAME_LABEL] 密码标签 [PASSWORD_LABEL] 背景色 [BG_COLOR] 标题色 [TITLE_COLOR] 标签色 [LABEL_COLOR] 确认色 [CONFIRM_COLOR] 取消色 [CANCEL_COLOR]',
            arguments: {
              TITLE: {type: Scratch.ArgumentType.STRING, defaultValue: '登录'},
              REQUIRE_PASSWORD: {
                type: Scratch.ArgumentType.STRING,
                menu: 'PASSWORD_OPTIONS',
                defaultValue: '有'
              },
              USERNAME_LABEL: {type: Scratch.ArgumentType.STRING, defaultValue: '用户名:'},
              PASSWORD_LABEL: {type: Scratch.ArgumentType.STRING, defaultValue: '密码:'},
              BG_COLOR: {type: Scratch.ArgumentType.STRING, defaultValue: '#ffffff'},
              TITLE_COLOR: {type: Scratch.ArgumentType.STRING, defaultValue: '#000000'},
              LABEL_COLOR: {type: Scratch.ArgumentType.STRING, defaultValue: '#000000'},
              CONFIRM_COLOR: {type: Scratch.ArgumentType.STRING, defaultValue: '#4CAF50'},
              CANCEL_COLOR: {type: Scratch.ArgumentType.STRING, defaultValue: '#f44336'}
            }
          },
          
          // 条件类型：是否已完成登录
          {
            opcode: 'isLoggedIn',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '是否已完成登录',
            arguments: {}
          },
          
          // 命令类型：重置登录状态
          {
            opcode: 'resetLoginStatus',
            blockType: Scratch.BlockType.COMMAND,
            text: '重置登录状态',
            arguments: {}
          },
          
          // 报告类型：获取用户名输入（圆形积木）
          {
            opcode: 'getFirstInputValue',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取用户名输入',
            arguments: {}
          },
          
          // 报告类型：获取密码输入（圆形积木）
          {
            opcode: 'getSecondInputValue',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取密码输入',
            arguments: {}
          }
        ],
        menus: {
          CREDENTIAL_PARTS: ['用户名', '密码'],
          LOGIN_PARTS: ['用户名', '密码', '完整凭证'],
          PASSWORD_OPTIONS: ['有', '没有']
        }
      };
    }

    // 命令类型弹窗的实现（合并版本）
    showLoginDialogCmd(args) {
      this.isLoginComplete = false;
      // 将字符串参数转换为布尔值
      const requirePassword = args.REQUIRE_PASSWORD === '有';
      // 根据参数决定调用哪个方法
      if (requirePassword) {
        this.loginPromise = this.showLoginWithPassword({title: args.TITLE}).then(result => {
          this.lastWithPasswordResult = result;
          this.lastNoPasswordResult = result ? result.split('|')[0] : '';
          this.isLoginComplete = true;
          return result;
        });
      } else {
        this.loginPromise = this.showLoginNoPassword({title: args.TITLE}).then(result => {
          this.lastNoPasswordResult = result;
          this.isLoginComplete = true;
          return result;
        });
      }
    }
    
    // 获取第一个输入框内容
    getFirstInputValue() {
      // 第一个输入框始终是用户名
      return this.lastNoPasswordResult || '';
    }
    
    // 获取第二个输入框内容
    getSecondInputValue() {
      // 第二个输入框是密码
      if (this.lastWithPasswordResult) {
        const parts = this.lastWithPasswordResult.split('|');
        return parts.length >= 2 ? parts[1] : '';
      }
      return '';
    }

    // 获取登录结果（合并版本）
    getLoginResult(args) {
      const part = args.PART;
      if (part === '用户名') {
        return this.lastNoPasswordResult || '';
      } else if (part === '密码') {
        if (this.lastWithPasswordResult) {
          const parts = this.lastWithPasswordResult.split('|');
          return parts.length >= 2 ? parts[1] : '';
        }
        return '';
      } else if (part === '完整凭证') {
        return this.lastWithPasswordResult || this.lastNoPasswordResult || '';
      }
      return '';
    }

    // 高级登录弹窗
    async advancedLoginDialog(args) {
      // 将字符串参数转换为布尔值
      const requirePassword = args.REQUIRE_PASSWORD === '有';
      
      const options = {
        title: args.TITLE,
        requirePassword: requirePassword,
        usernameLabel: args.USERNAME_LABEL || '用户名:',
        bgColor: args.BG_COLOR,
        titleColor: args.TITLE_COLOR,
        labelColor: args.LABEL_COLOR,
        confirmColor: args.CONFIRM_COLOR,
        cancelColor: args.CANCEL_COLOR
      };
      
      // 仅当需要密码时设置密码标签
      if (requirePassword) {
        options.passwordLabel = args.PASSWORD_LABEL || '密码:';
      }
      
      const result = await this.showLoginDialog(options);
      if (result) {
        if (requirePassword) {
          // 需要密码时，合并用户名和密码并更新状态
          this.lastWithPasswordResult = `${result.username}|${result.password}`;
          this.isLoginComplete = true;
          return this.lastWithPasswordResult;
        } else {
          // 不需要密码时，仅更新用户名并返回
          this.lastNoPasswordResult = result.username;
          this.isLoginComplete = true;
          return this.lastNoPasswordResult;
        }
      }
      return '';
    }
    
    // 重置登录状态
    resetLoginStatus() {
      this.lastNoPasswordResult = '';
      this.lastWithPasswordResult = '';
      this.isLoginComplete = false;
      this.loginPromise = null;
    }

    // 检查是否已完成登录
    isLoggedIn() {
      return this.isLoginComplete;
    }
  }

  // 注册扩展
  Scratch.extensions.register(new LoginDialogExtension());
})(Scratch);