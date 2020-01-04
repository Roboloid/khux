import React from 'react';
import ReactDOM from 'react-dom';

const e = React.createElement;

class kbDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.keyblades = { 
        keybladeList: [
          {
            id: 1,
            title: 'Starlight',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 2,
            title: 'Treasure Trove',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 3,
            title: 'Lady Luck',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 4,
            title: 'Three Wishes',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 5,
            title: 'Olympia',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 6,
            title: 'Divine Rose',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 7,
            title: 'Moogle O\' Glory',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 8,
            title: 'Sleeping Lion',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 9,
            title: 'Counterpoint',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 10,
            title: 'Stroke of Midnight',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 11,
            title: 'Fenrir',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 12,
            title: 'Darkgnaw',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 13,
            title: 'Missing Ache',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 14,
            title: 'Fairy Stars',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 15,
            title: 'Diamond Dust',
            selected: false,
            key: 'keyblade'
          },
          {
            id: 16,
            title: 'BadGuyBreaker',
            selected: false,
            key: 'keyblade'
          }
        ]
    };
  }

  handleClickOutisde()  {
    this.setState({
        listOpen: false
    })
  }

  toggleList()  {
      this.setState(prevState =>    ({
          listOpen: !prevState.listOpen
      }))
  }

  render() {

    const{list} = this.props
    const{listOpen, headerTitle} = this.state

    return(
        <div className="dd-wrapper">
            <div className="dd-header" onClick={() => this.toggleList()}>
                <div className="dd-header-title">{headerTitle}</div>
                {listOpen
                    ? <FontAwesome name="angle-up" size="2x"/>
                    : <FontAwesome name="angle-down" size="2x"/>    
                }
            </div>
            {listOpen && <ul className="dd-list">
                {list.map((item) => (
                    <li className="dd-list-item" key={item.id} >{item.title}</li>
                ))}
            </ul>}
        </div>
    )
  }
}

export default kbDropdown

const domContainer = document.querySelector('#keyblade_dropdown');
ReactDOM.render(e(kbDropdown), domContainer);