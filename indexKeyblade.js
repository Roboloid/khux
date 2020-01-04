import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './keyblade';
import Dropdown from './src/keyblade';


var displayDropdown = (
      <div style={{display: 'flex', justifyContent: 'center'}} >
        <Dropdown />
      </div>
      );

ReactDOM.render(displayDropdown, document.getElementById('keyblade_dropdown'));

keyblade();