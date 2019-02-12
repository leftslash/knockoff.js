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

// Constructor
function Knockoff(arg) {

  var nodes

  if (typeof arg !== 'string') {
    return
  }

  // convenience code to allow non-constructor
  // to act as if it was invoked as a constructor
  if (!this instanceof Knockoff) {
    return new Knockoff(arg)
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

// Instance Methods

Knockoff.prototype._forEach = function(items, callback) {
  if (this.nodes) {
    this.forEach(function(node) {
      items.split(' ').forEach(function(item) {
        callback(node, item)
      })
    })
  }
}

Knockoff.prototype.on = function(events, handler) {
  this._forEach(events, function(node, eventName)  {
    node.addEventListener(eventName, handler)
  })
  return this
}

Knockoff.prototype.off = function(events, handler) {
  this._forEach(events, function(node, eventName)  {
    node.removeEventListener(eventName, handler)
  })
  return this
}

Knockoff.prototype.addClass = function(classNames) {
  this._forEach(classNames, function(node, className)  {
    node.classList.add(className)
  })
  return this
}

Knockoff.prototype.removeClass = function(classNames) {
  this._forEach(classNames, function(node, className)  {
    node.classList.remove(className)
  })
  return this
}

Knockoff.prototype.append = function(Knockoff) {
  if (this.nodes) {
    this.nodes.forEach(function(existingNode) {
      if (Knockoff && Knockoff.nodes) {
        Knockoff.nodes.forEach(function(newNode) {
          existingNode.appendChild(newNode)
        })
      }
    })
  }
  return this
}

Knockoff.prototype.remove = function(Knockoff) {
  if (this.nodes) {
    this.nodes.forEach(function(existingNode) {
      if (Knockoff && Knockoff.nodes) {
        Knockoff.nodes.forEach(function(newNode) {
          existingNode.removeChild(newNode)
        })
      }
    })
  }
  return this
}


Knockoff.prototype.val = function(value) {
  if (value == null) {
    return this.nodes && this.nodes[0] && this.nodes[0].getAttribute('value')
  } else {
    if (this.nodes && this.nodes[0]) {
      this.nodes[0].setAttribute('value', value)
    }
  }
  return this
}

Knockoff.prototype.show = function() {
  if (this.nodes) {
    this.forEach(function(node) {
      node.style.display = ''
    })
  }
  return this
}

Knockoff.prototype.hide = function() {
  if (this.nodes) {
    this.forEach(function(node) {
      node.style.display = 'none'
    })
  }
  return this
}

Knockoff.prototype.forEach = function(fn) {
  if (this.nodes) {
    this.nodes.forEach(fn)
  }
  return this
}

// Class (i.e. static) Methods

Knockoff.getJSON(url) = function() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = function() {
      try {
        if (this.status === 200) {
          resolve(JSON.parse(this.response))
        } else {
          reject(`$(this.status) $(this.statusTest)`)
        }
      } catch(e) {
        reject(e.message)
      }
    }
    xhr.onerror = function() {
      reject(`$(this.status) $(this.statusTest)`)
    }
    xhr.send()
  })
}

Knockoff.$ = $

var $ = Knockoff

Knockoff.noConflict = function() {
  $ = Knockoff.$
}
