;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-duihua" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M794.88 167.04 229.12 167.04c-55.68 0-101.12 45.44-101.12 101.12l0 362.24c0 55.68 45.44 101.12 101.12 101.12l23.68 0-14.08 152.96 231.04-152.96 325.12 0c55.68 0 101.12-45.44 101.12-101.12L896 268.16C896 212.48 850.56 167.04 794.88 167.04zM832 630.4c0 20.48-16.64 37.12-37.12 37.12L450.56 667.52l-135.68 89.6 8.32-89.6L229.12 667.52c-20.48 0-37.12-16.64-37.12-37.12L192 268.16c0-20.48 16.64-37.12 37.12-37.12l565.76 0c20.48 0 37.12 16.64 37.12 37.12L832 630.4z"  ></path>' +
    '' +
    '<path d="M337.92 449.92m-51.2 0a8 8 0 1 0 102.4 0 8 8 0 1 0-102.4 0Z"  ></path>' +
    '' +
    '<path d="M514.56 449.92m-51.2 0a8 8 0 1 0 102.4 0 8 8 0 1 0-102.4 0Z"  ></path>' +
    '' +
    '<path d="M691.2 449.92m-51.2 0a8 8 0 1 0 102.4 0 8 8 0 1 0-102.4 0Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)