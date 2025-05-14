// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // 切换菜单图标
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                // 禁止背景滚动
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // 恢复背景滚动
                document.body.style.overflow = '';
            }
        });
        
        // 点击导航链接后关闭菜单
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // 恢复背景滚动
                document.body.style.overflow = '';
            });
        });
    }
    
    // 窗口大小变化时处理导航菜单
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            // 在桌面视图下确保移动菜单关闭
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
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