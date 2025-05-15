// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            openMobileMenu();
        });
            
        // 点击关闭按钮关闭菜单
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                closeMobileMenu();
            });
        }
        
        // 点击导航链接后关闭菜单
        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav a, .mobile-links a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // 按ESC键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // 禁止背景滚动
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // 恢复背景滚动
    }
    
    // 窗口大小变化时处理导航菜单
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            // 在桌面视图下确保移动菜单关闭
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 语言标签交互
    initLanguageTags();
    
    // 聊天界面翻译开关
    initTranslationSwitch();
    
    // 翻译切换按钮
    initTranslationToggle();
    
    // 为聊天消息添加焦点效果
    initChatMessages();
    
    // 处理用户头像显示首字母
    initUserAvatars();
});

/**
 * 初始化语言标签交互效果
 */
function initLanguageTags() {
    const langFlags = document.querySelectorAll('.lang-flag');
    
    // 初始标记第一个语言为active
    if (langFlags.length > 0) {
        langFlags[0].classList.add('active');
    }
    
    // 为每个语言标签添加交互效果
    langFlags.forEach((flag, index) => {
        // 添加延迟动画效果
        flag.style.animationDelay = `${index * 0.1}s`;
        flag.classList.add('animate-in');
        
        flag.addEventListener('click', function() {
            // 移除其他标签的active类
            langFlags.forEach(f => f.classList.remove('active'));
            // 给当前点击的标签添加active类
            this.classList.add('active');
            
            // 获取语言数据
            const langCode = this.querySelector('span').textContent;
            const langName = this.getAttribute('data-lang');
            
            // 在这里可以添加切换语言的逻辑
            console.log(`切换到语言: ${langName} (${langCode})`);
            
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 添加聊天界面动画效果
            animateChatMessages();
            
            // 更新翻译区域语言标记
            updateTranslationLabels(langName);
        });
        
        // 添加悬停焦点效果
        flag.addEventListener('mouseenter', function() {
            // 创建波纹动画
            const ripple = document.createElement('span');
            ripple.className = 'lang-flag-ripple';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // 添加多语言区域的整体交互效果
    const languageFlags = document.querySelector('.language-flags');
    if (languageFlags) {
        languageFlags.addEventListener('mouseenter', function() {
            this.querySelectorAll('.lang-flag').forEach((flag, index) => {
                flag.style.transform = 'translateY(-5px)';
                flag.style.transitionDelay = `${index * 0.05}s`;
            });
        });
        
        languageFlags.addEventListener('mouseleave', function() {
            this.querySelectorAll('.lang-flag').forEach(flag => {
                flag.style.transform = '';
                flag.style.transitionDelay = '';
            });
        });
    }
}

/**
 * 重新触发聊天消息的动画效果
 */
function animateChatMessages() {
    const chatMessages = document.querySelectorAll('.chat-message');
    chatMessages.forEach((message, msgIndex) => {
        // 重置消息动画
        message.style.animation = 'none';
        message.offsetHeight; // 触发重排
        message.style.animation = null;
        message.style.animationName = 'message-appear';
        message.style.animationDuration = '0.5s';
        message.style.animationFillMode = 'forwards';
        message.style.animationDelay = `${msgIndex * 0.3}s`;
        message.style.opacity = '0';
    });
}

/**
 * 根据选中的语言更新翻译标签
 * @param {string} langName 选中的语言名称
 */
function updateTranslationLabels(langName) {
    const translationLabels = document.querySelectorAll('.translation-label span');
    if (langName === 'Chinese') {
        translationLabels.forEach(label => {
            if (label.textContent.includes('英文') || label.textContent.includes('日文')) {
                label.textContent = '翻译为中文';
            }
        });
    } else if (langName === 'English') {
        translationLabels.forEach(label => {
            if (label.textContent.includes('中文') || label.textContent.includes('日文')) {
                label.textContent = '翻译为英文';
            }
        });
    } else if (langName === 'Japanese') {
        translationLabels.forEach(label => {
            if (label.textContent.includes('中文') || label.textContent.includes('英文')) {
                label.textContent = '翻译为日文';
            }
        });
    }
}

/**
 * 初始化翻译开关功能
 */
function initTranslationSwitch() {
    const translationSwitch = document.querySelector('.translations-switch input');
    if (translationSwitch) {
        translationSwitch.addEventListener('change', function() {
            const translationContainers = document.querySelectorAll('.translation-container');
            translationContainers.forEach(container => {
                if (this.checked) {
                    container.style.display = 'block';
                } else {
                    container.style.display = 'none';
                }
            });
        });
    }
}

/**
 * 初始化翻译切换按钮功能
 */
function initTranslationToggle() {
    const translationToggles = document.querySelectorAll('.translation-toggle');
    translationToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const container = this.closest('.translation-container');
            const label = container.querySelector('.translation-label span');
            const text = container.querySelector('.translation-text');
            
            // 这里演示切换中英文，实际应用可以扩展到更多语言
            if (label.textContent.includes('中文')) {
                label.textContent = '翻译为英文';
                text.textContent = 'The translation has been switched to English.';
            } else if (label.textContent.includes('英文')) {
                label.textContent = '翻译为日文';
                text.textContent = '翻訳が日本語に切り替えられました。';
            } else {
                label.textContent = '翻译为中文';
                text.textContent = '翻译已切换为中文。';
            }
            
            // 添加动画效果
            const animation = container.querySelector('.translation-animation');
            animation.style.opacity = '1';
            setTimeout(() => {
                animation.style.opacity = '0.8';
            }, 300);
        });
    });
}

/**
 * 初始化聊天消息交互效果
 */
function initChatMessages() {
    const chatMessages = document.querySelectorAll('.chat-message');
    chatMessages.forEach(message => {
        message.addEventListener('mouseenter', function() {
            // 高亮当前消息
            this.style.zIndex = '5';
            this.querySelector('.message-bubble').style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
            
            // 显示翻译动画
            const animation = this.querySelector('.translation-animation');
            if (animation) {
                animation.style.opacity = '1';
            }
        });
        
        message.addEventListener('mouseleave', function() {
            // 恢复正常状态
            this.style.zIndex = '1';
            this.querySelector('.message-bubble').style.boxShadow = '';
            
            // 恢复翻译动画
            const animation = this.querySelector('.translation-animation');
            if (animation) {
                animation.style.opacity = '0.8';
            }
        });
    });
}

/**
 * 初始化用户头像，确保显示优雅的头像
 */
function initUserAvatars() {
    const avatars = document.querySelectorAll('.user-avatar');
    
    avatars.forEach(avatar => {
        // 获取data-initials属性
        const fullInitials = avatar.getAttribute('data-initials');
        const imgElement = avatar.querySelector('img');
        
        // 保存原来的非图片子元素，如工具提示
        const childrenToKeep = [];
        Array.from(avatar.children).forEach(child => {
            if (child.tagName !== 'IMG') {
                childrenToKeep.push(child);
            }
        });
        
        // 检查是否有图片元素并且图片URL是否有效
        if (imgElement && imgElement.src) {
            // 创建图片加载错误处理程序
            imgElement.onerror = function() {
                createInitialsAvatar();
                this.style.display = 'none';
            };
            
            // 创建图片加载成功处理程序
            imgElement.onload = function() {
                this.style.display = 'block';
            };
        } else {
            createInitialsAvatar();
        }
        
        // 创建基于首字母的头像
        function createInitialsAvatar() {
            if (fullInitials && fullInitials.length > 0) {
                // 清空头像内容
                avatar.innerHTML = '';
                
                // 获取首字母（支持中文和英文）
                const firstChar = fullInitials.charAt(0);
                
                // 添加首字母文本
                avatar.appendChild(document.createTextNode(firstChar));
                
                // 重新添加要保留的子元素
                childrenToKeep.forEach(child => {
                    avatar.appendChild(child);
                });
            }
        }
        
        // 添加悬停效果
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateZ(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            this.style.borderColor = 'white';
            
            const imgEl = this.querySelector('img');
            if (imgEl) {
                imgEl.style.transform = 'scale(1.1)';
            }
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'translateZ(0)';
            this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            
            const imgEl = this.querySelector('img');
            if (imgEl) {
                imgEl.style.transform = 'scale(1)';
            }
        });
    });
} 