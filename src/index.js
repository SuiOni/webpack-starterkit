import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import _ from 'lodash';

import printMe from './js/print';
import './scss/main.scss';

require('offline-plugin/runtime').install();

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
UIkit.notification('Hello worudo.');

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');   
    printMe();
    })
}