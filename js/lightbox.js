/* 图片灯箱：点击内容区图片放大查看，点击遮罩或按 ESC 关闭 */
(function () {
    function init() {
        var box = document.createElement('div');
        box.id = 'img-lightbox';
        box.innerHTML = '<span class="lb-close">\u00d7</span><img alt="预览图" />';
        document.body.appendChild(box);
        var bigImg = box.getElementsByTagName('img')[0];

        function open(src) {
            bigImg.src = src;
            box.style.display = 'block';
        }
        function close() {
            box.style.display = 'none';
            bigImg.src = '';
        }

        box.onclick = close;
        bigImg.onclick = function (e) {
            e = e || window.event;
            if (e.stopPropagation) { e.stopPropagation(); }
            return false;
        };
        document.onkeydown = function (e) {
            e = e || window.event;
            var k = e.keyCode || e.which;
            if (k === 27) { close(); }
        };

        /* 只对主内容区(.fwmain)里的图片生效，避免误抓页头logo等 */
        var area = document.querySelector('.fwmain') || document.body;
        var imgs = area.getElementsByTagName('img');
        for (var i = 0; i < imgs.length; i++) {
            (function (img) {
                img.style.cursor = 'zoom-in';
                img.onclick = function (ev) {
                    ev = ev || window.event;
                    /* 图片外层若有<a href>链接，拦截跳转 */
                    var p = img.parentNode;
                    while (p && p !== area) {
                        if (p.tagName === 'A') {
                            if (ev.preventDefault) { ev.preventDefault(); } else { ev.returnValue = false; }
                            break;
                        }
                        p = p.parentNode;
                    }
                    if (ev.stopPropagation) { ev.stopPropagation(); }
                    open(img.getAttribute('src') || img.src);
                    return false;
                };
            })(imgs[i]);
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        window.attachEvent('onload', init);
    }
})();
