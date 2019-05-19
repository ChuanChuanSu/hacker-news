import React from 'react';
import '../styles/header.scss';

const tabs = ['NEW', 'TOP', 'BEST', 'ASK', 'SHOW'];
const tabMap = {
  'NEW': 'new',
  'TOP': 'top',
  'BEST': 'best',
  'ASK': 'ask',
  'SHOW': 'show'
};

export class NewsHeader extends React.Component {
  handleClick = (e) => {
    this.props.onTypeChange(tabMap[e.target.innerText]);
  }

  render() {
    return (
      <header className='news-header'>
        <span className='header-left'>
          <b>Hacker News</b>
        </span>
        <span className='header-right'>
          {
            tabs.map((item, index) =>
              <a
                data-text='newStories'
                onClick={this.handleClick}
                key={index}
              >
                {item}
              </a>
            )
          }
        </span>
      </header>
    )
  }
}
