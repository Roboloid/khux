import React from 'react';
import './style.css';
import Dropdown from './Dropdown';

<Dropdown
    onSelect={(eventKey) => {
    }}
>
    <Dropdown.Toggle
        btnStyle="flat"
    >
        Toggler
    </Dropdown.Toggle>
    <Dropdown.Menu>
        <MenuItem header>Header</MenuItem>
        <MenuItem eventKey={1}>link</MenuItem>
        <MenuItem divider />
        <MenuItem header>Header</MenuItem>
        <MenuItem eventKey={2}>link</MenuItem>
        <MenuItem eventKey={3} disabled>disabled</MenuItem>
        <MenuItem
            eventKey={4}
            title="link with title"
        >
            link with title
        </MenuItem>
        <MenuItem
            eventKey={5}
            active
            onSelect={(eventKey) => {
                alert(`Alert from menu item.\neventKey: ${eventKey}`);
            }}
        >
            link that alerts
        </MenuItem>
    </Dropdown.Menu>
</Dropdown>

export default Dropdown;