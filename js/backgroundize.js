/**
 * 返回当前的主题模式（dark或light）
 * @returns {string} 当前的主题模式
 */
function getThemeMode() {
    const theme = localStorage.getItem('Fluid_Color_Scheme');
    console.log('当前主题模式为：', theme || 'dark');
    return theme === 'light' ? 'light' : 'dark';
  }
  
  /**
   * 根据主题模式和设备类型设置背景图片
   * @param {String} themeMode - 'light' 或 'dark'
   */
  function setBackgroundImage(themeMode) {
    const isMobile = window.innerWidth < 768;
    const webBgElement = document.querySelector('#web_bg');
  
    if (isMobile) {
      webBgElement.style.backgroundImage = `var(--mobile-bg-image)`;
    } else if (themeMode === 'dark') {
      webBgElement.style.backgroundImage = `var(--desktop-bg-image-night)`;
    } else {
      webBgElement.style.backgroundImage = `var(--desktop-bg-image-normal)`;
    }
  }
  
  /**
   * 初始化背景图片设置
   * @returns {void}
   */
  function initBackground() {
    const theme = getThemeMode();
    setBackgroundImage(theme);
  }
  
  /**
   * 重置Banner样式，隐藏背景图片和遮罩层
   * @returns {void}
   */
  function resetBannerStyles() {
    document.querySelector("#banner").setAttribute('style', 'background-image: none');
    document.querySelector("#banner .mask").setAttribute('style', 'background-color: rgba(0,0,0,0)');
  }
  
  // 监听主题切换按钮点击事件
  const themeBtn = document.querySelector('#color-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const theme = getThemeMode();
      setBackgroundImage(theme);
      console.log(`切换到${theme === 'light' ? '日间' : '夜间'}模式`);
    });
  }
  
  // 初始化背景和样式
  initBackground();
  resetBannerStyles();
  
  // 监听窗口大小变化，做防抖处理调整背景
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setBackgroundImage(getThemeMode());
    }, 200);
  }, {
    passive: true // 防止默认事件
  });
  
  /**
   * 如果你想实现不同的文章为不同的背景图片，
   * 可以定义一个数组用于存放不同文章的路径，通过pathname判断当前文章路径，设置对应的背景图片。
   * 例如：
   * --------分割线--------
   * const articleBgMap = {
   *   '/article1': 'url(https://example.com/bg1.jpg)',
   *   '/article2': 'url(https://example.com/bg2.jpg)',
   *   '/article3': 'url(https://example.com/bg3.jpg)',
   * };
   * const currentPathname = window.location.pathname;
   * const bgUrl = articleBgMap[currentPathname] || 'url(https://example.com/bg-default.jpg)';
   * document.querySelector('#web_bg').style.backgroundImage = bgUrl;
   * ……略
   * --------分割线--------
   * 诚然，这样做会增加代码量，但可以满足不同文章的背景图片需求。
   * 我不否认会有更好的实现方式，以上仅作参考。
   */
  
  /** 转载请注明出处！
     本博客除特别声明外，均采用「[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)」许可协议。
  —— 本文作者：4rozeN
  —— 原文标题：fluid 全屏背景图随日夜模式切换和正文底页毛玻璃效果
  —— 原文链接：https://4rozen.github.io/archives/Hexo/60191.html
  —— 原文字数：1.1k 字
  */