// Turbowarp弹窗扩展
class BeautifulModalExtension {
    constructor(runtime) {
        this.runtime = runtime;
        // 存储弹窗状态
        this.modalElement = null;
        this.resolvePromise = null;
        this.modalResult = null;
        console.log('美观弹窗扩展已初始化');
    }

    getInfo() {
        return {
            id: 'beautifulModal',
            name: '美观弹窗',
            color1: '#007bff',
            color2: '#0056b3',
            blocks: [
                {
                    opcode: 'showModal',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '显示弹窗 标题:[TITLE] 内容:[CONTENT]',
                    arguments: {
                        TITLE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '弹窗标题'
                        },
                        CONTENT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '这是弹窗内容'
                        }
                    }
                },
                {
                    opcode: 'showModalWithButtons',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '显示带按钮的弹窗 标题:[TITLE] 内容:[CONTENT] 确定按钮:[CONFIRM] 取消按钮:[CANCEL]',
                    arguments: {
                        TITLE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '确认操作'
                        },
                        CONTENT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '您确定要执行此操作吗？'
                        },
                        CONFIRM: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '确定'
                        },
                        CANCEL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '取消'
                        }
                    }
                },
                {
                    opcode: 'showAlert',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '显示提示框 [CONTENT]',
                    arguments: {
                        CONTENT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '提示信息'
                        }
                    }
                }
            ]
        };
    }

    // 创建弹窗DOM元素的私有方法
    _createModalElement(title, content, confirmText, cancelText, isAlert = false) {
        // 如果已有弹窗存在，先移除
        if (this.modalElement) {
            this._removeModalElement();
        }

        // 创建样式
        const style = document.createElement('style');
        style.textContent = `
            .turbowarp-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease-out;
            }
            .turbowarp-modal-container {
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                width: 90%;
                max-width: 500px;
                overflow: hidden;
                animation: slideIn 0.3s ease-out;
            }
            .turbowarp-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                background-color: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
            }
            .turbowarp-modal-title {
                font-size: 18px;
                font-weight: 600;
                color: #2c3e50;
                margin: 0;
            }
            .turbowarp-modal-close {
                background: none;
                border: none;
                font-size: 24px;
                color: #6c757d;
                cursor: pointer;
                padding: 0;
                width: 32px;
                height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            .turbowarp-modal-close:hover {
                background-color: #e9ecef;
                color: #dc3545;
            }
            .turbowarp-modal-content {
                padding: 24px;
                line-height: 1.6;
                color: #495057;
            }
            .turbowarp-modal-footer {
                display: flex;
                justify-content: flex-end;
                gap: 12px;
                padding: 16px 24px;
                background-color: #f8f9fa;
                border-top: 1px solid #e9ecef;
            }
            .turbowarp-modal-btn {
                padding: 8px 16px;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .turbowarp-modal-btn-primary {
                background-color: #007bff;
                color: white;
            }
            .turbowarp-modal-btn-primary:hover {
                background-color: #0056b3;
                transform: translateY(-1px);
            }
            .turbowarp-modal-btn-secondary {
                background-color: #6c757d;
                color: white;
            }
            .turbowarp-modal-btn-secondary:hover {
                background-color: #5a6268;
                transform: translateY(-1px);
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
        document.head.appendChild(style);

        // 创建弹窗元素
        const overlay = document.createElement('div');
        overlay.className = 'turbowarp-modal-overlay';

        const container = document.createElement('div');
        container.className = 'turbowarp-modal-container';

        const header = document.createElement('div');
        header.className = 'turbowarp-modal-header';

        const titleElement = document.createElement('h2');
        titleElement.className = 'turbowarp-modal-title';
        titleElement.textContent = title;

        const closeButton = document.createElement('button');
        closeButton.className = 'turbowarp-modal-close';
        closeButton.textContent = '×';
        closeButton.setAttribute('aria-label', '关闭');

        const contentElement = document.createElement('div');
        contentElement.className = 'turbowarp-modal-content';
        contentElement.textContent = content;

        const footer = document.createElement('div');
        footer.className = 'turbowarp-modal-footer';

        if (isAlert) {
            // 提示框只显示一个确定按钮
            const okButton = document.createElement('button');
            okButton.className = 'turbowarp-modal-btn turbowarp-modal-btn-primary';
            okButton.textContent = '确定';
            okButton.addEventListener('click', () => {
                this.modalResult = 'ok';
                if (this.resolvePromise) {
                    this.resolvePromise('ok');
                }
                this._removeModalElement();
            });
            footer.appendChild(okButton);
        } else {
            // 带按钮的弹窗显示确定和取消按钮
                const cancelButton = document.createElement('button');
                cancelButton.className = 'turbowarp-modal-btn turbowarp-modal-btn-secondary';
                cancelButton.textContent = cancelText || '取消';
                cancelButton.addEventListener('click', () => {
                    this.modalResult = false;
                    if (this.resolvePromise) {
                        this.resolvePromise(false);
                    }
                    this._removeModalElement();
                });

                const confirmButton = document.createElement('button');
                confirmButton.className = 'turbowarp-modal-btn turbowarp-modal-btn-primary';
                confirmButton.textContent = confirmText || '确定';
                confirmButton.addEventListener('click', () => {
                    this.modalResult = true;
                    if (this.resolvePromise) {
                        this.resolvePromise(true);
                    }
                    this._removeModalElement();
                });

            footer.appendChild(cancelButton);
            footer.appendChild(confirmButton);
        }

        // 组装弹窗
        header.appendChild(titleElement);
        header.appendChild(closeButton);
        container.appendChild(header);
        container.appendChild(contentElement);
        container.appendChild(footer);
        overlay.appendChild(container);

        // 绑定关闭事件
        closeButton.addEventListener('click', () => {
            this.modalResult = false;
            if (this.resolvePromise) {
                this.resolvePromise(false);
            }
            this._removeModalElement();
        });

        // 点击遮罩层关闭弹窗
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.modalResult = false;
                if (this.resolvePromise) {
                    this.resolvePromise(false);
                }
                this._removeModalElement();
            }
        });

        // 添加到文档中
        document.body.appendChild(overlay);

        // 存储弹窗元素引用
        this.modalElement = overlay;

        // 按ESC键关闭弹窗
        this._handleEscKey = (e) => {
            if (e.key === 'Escape' && this.modalElement) {
                this.modalResult = false;
                if (this.resolvePromise) {
                    this.resolvePromise(false);
                }
                this._removeModalElement();
            }
        };
        document.addEventListener('keydown', this._handleEscKey);

        return overlay;
    }

    // 移除弹窗DOM元素的私有方法
    _removeModalElement() {
        if (this.modalElement) {
            // 移除事件监听器
            document.removeEventListener('keydown', this._handleEscKey);
            // 移除弹窗元素
            this.modalElement.remove();
            this.modalElement = null;
        }
    }

    // 显示普通弹窗（命令积木）
    showModal(args) {
        const title = args.TITLE.toString();
        const content = args.CONTENT.toString();
        this._createModalElement(title, content, '确定', '关闭');
    }

    // 显示带返回值的弹窗（报告积木）
    showModalWithButtons(args) {
        const title = args.TITLE.toString();
        const content = args.CONTENT.toString();
        const confirmText = args.CONFIRM.toString();
        const cancelText = args.CANCEL.toString();

        // 创建一个Promise来等待用户的选择
        return new Promise((resolve) => {
            this.resolvePromise = resolve;
            this._createModalElement(title, content, confirmText, cancelText);
        });
    }

    // 显示提示框（命令积木）
    showAlert(args) {
        const content = args.CONTENT.toString();
        this._createModalElement('提示', content, '确定', '', true);
    }
}

// 注册扩展
Scratch.extensions.register(new BeautifulModalExtension());