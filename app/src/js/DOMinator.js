export class DOMinator{
  constructor(){
    HTMLElement.prototype.removeClass = function(className){
      if (this.classList){
        this.classList.remove(className);
      }else{
        this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }

    HTMLElement.prototype.addClass = function(className){
      if (this.classList)
        this.classList.add(className);
      else
        this.className += ' ' + className;
    }

    HTMLElement.prototype.fadeIn = function(time = 400){
      var el = this;
      el.style.opacity = 0;

      var last = +new Date();
      var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / time;
        last = +new Date();

        if (+el.style.opacity < 1) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
      };

      tick();
    }

    HTMLElement.prototype.fadeOut = function(time = 400){
      var el = this;
      el.style.opacity = 1;

      var last = +new Date();
      var tick = function(){
        el.style.opacity = el.style.opacity - (new Date() - last) / time;
        last = +new Date();

        if (el.style.opacity > 0) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
      };

      tick();
    }

    HTMLElement.prototype.is = function(elem, checkChildren = false){
      var target = this;
      var result = false;

      result = (target === elem);

      if (checkChildren) {
        for (var i = 0; i < elem.children.length; i++) {
          if (elem.children[i] === target) {
            result = true;
          }
        }
      }

      return result;
    }
  }
}

export default new DOMinator();
