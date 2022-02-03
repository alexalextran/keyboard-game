import React from 'react';

const Mainpage = () => {
    document.addEventListener('keypress', (event) => {
        event.stopImmediatePropagation();
        var name = event.key;
        var code = event.code;
        // Alert the key name and key code on keydown
        console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
      }, false);


    return (
        <div>
            yooyoyyoyoyo
        </div>
    );
}

export default Mainpage;
