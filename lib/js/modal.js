/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
'use strict';
var ModalEffects = (function(win) {

    function init() {

        var logger = function(content) {
            return function() {
                var args = Array.prototype.slice.call(arguments);
                var output = args.map(function(arg) {
                    return arg instanceof Error ? arg.message : typeof arg === 'object' ? JSON.stringify(arg) : arg;
                }).join(' ');

                var p = document.createElement('p');
                p.innerHTML = output;
                content.appendChild(p);
            };
        };

        var overlay = document.querySelector('.md-overlay');

        [].slice.call(document.querySelectorAll('.md-trigger')).forEach(function(el, i) {

            var modal = document.querySelector('#' + el.getAttribute('data-modal')),
                close = modal.querySelector('.md-close'),
                modalContent = modal.querySelector('.md-content .message');

            function removeModal(hasPerspective) {
                classie.remove(modal, 'md-show');

                if (hasPerspective) {
                    classie.remove(document.documentElement, 'md-perspective');
                }
            }

            function removeModalHandler() {
                removeModal(classie.has(el, 'md-setperspective'));
            }

            el.addEventListener('click', function(ev) {
                classie.add(modal, 'md-show');
                overlay.removeEventListener('click', removeModalHandler);
                overlay.addEventListener('click', removeModalHandler);

                if (classie.has(el, 'md-setperspective')) {
                    setTimeout(function() {
                        classie.add(document.documentElement, 'md-perspective');
                    }, 25);
                }

                modalContent.innerHTML = '';
                setTimeout(function() {
                    win.console.log = logger(modalContent);
                    try {
                        eval(ev.target.nextSibling.innerText);
                    } catch (e) {
                        var p = document.createElement('p');
                        p.innerHTML = e.message;
                        modalContent.appendChild(p);
                    }
                }, 500);
            });

            close.addEventListener('click', function(ev) {
                ev.stopPropagation();
                removeModalHandler();
            });

        });
    }

    init();

})(window);
