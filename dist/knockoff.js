/*!
 * knockoff JavaScript Library v1.0
 * http://github.com/leftslash/knockoff.js
 * Sun Feb 10 11:55:44 EST 2019
 *
 * A lightweight, minimal, zero-dependency,
 * vanilla, old-school JavaScript copy (aka knockoff)
 * of the venerable jQuery utility library.
 *
 * The goal is to provide an identical API but
 * only for those jQuery functions that are necessary
 * and without all of the esoteric bullshit.
 *
 * If/when additional jQuery functionality is 
 * necessary, it will be added, but only when and if.
 *
 * Like my grandpa said, you don't go out and buy
 * an entire tool chest when you start a project.
 * You just buy the tool you need, when you need it.
 *
 */

var knockoff = function(arg) {

  var nodes

  // if this is a static method invocation
  if (typeof this.Object === 'function') {
    return new knockoff(arg)
  }

  if (typeof arg !== 'string') {
    return
  }

  if (arg[0] === '<') {
    var div = document.createElement('div')
    div.innerHTML = arg
    this.nodes = div.childNodes
  } else {
    this.nodes = document.querySelectorAll(arg)
  }

  return this

}

knockoff.prototype.on = function(events, handler) {
  if (this.nodes) {
    this.forEach(function(node) {
      events.split(' ').forEach(function(eventName) {
        node.addEventListener(eventName, handler)
      })
    })
  }
  return this
}

knockoff.prototype.off = function(events, handler) {
  if (this.nodes) {
    this.forEach(function(node) {
      events.split(' ').forEach(function(eventName) {
        node.removeEventListener(eventName, handler)
      })
    })
  }
  return this
}

knockoff.prototype.append = function(knockoff) {
  if (this.nodes) {
    this.nodes.forEach(function(existingNode) {
      if (knockoff && knockoff.nodes) {
        knockoff.nodes.forEach(function(newNode) {
          existingNode.appendChild(newNode)
        })
      }
    })
  }
  return this
}

knockoff.prototype.remove = function(knockoff) {
  if (this.nodes) {
    this.nodes.forEach(function(existingNode) {
      if (knockoff && knockoff.nodes) {
        knockoff.nodes.forEach(function(newNode) {
          existingNode.removeChild(newNode)
        })
      }
    })
  }
  return this
}


knockoff.prototype.val = function(value) {
  if (value == null) {
    return this.nodes && this.nodes[0] && this.nodes[0].getAttribute('value')
  } else {
    if (this.nodes && this.nodes[0]) {
      this.nodes[0].setAttribute('value', value)
    }
  }
  return this
}

knockoff.prototype.addClass = function(classNames) {
  if (this.nodes) {
    this.forEach(function(node) {
      classNames.split(' ').forEach(function(className) {
        node.classList.add(className)
      })
    })
  }
  return this
}

knockoff.prototype.removeClass = function(classNames) {
  if (this.nodes) {
    this.forEach(function(node) {
      classNames.split(' ').forEach(function(className) {
        node.classList.remove(className)
      })
    })
  }
  return this
}

knockoff.prototype.show = function() {
  if (this.nodes) {
    this.forEach(function(node) {
      node.style.display = ''
    })
  }
  return this
}

knockoff.prototype.hide = function() {
  if (this.nodes) {
    this.forEach(function(node) {
      node.style.display = 'none'
    })
  }
  return this
}

knockoff.prototype.forEach = function(fn) {
  if (this.nodes) {
    return this.nodes.forEach(fn)
  }
}

knockoff.$ = $

var $ = knockoff

knockoff.noConflict = function() {
  $ = knockoff.$
}
