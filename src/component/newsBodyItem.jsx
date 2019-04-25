import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/bodyItem.scss'

export class NewsBodyItem extends React.Component {
  render() {
    const props = this.props;
    return (
      <div className='news-body-item'>
        <div className='first-line'>
          <span>{props.index + 1}</span>
          &nbsp;&nbsp;
          <a href={props.data.url}>
            {props.data.title}
          </a>
        </div>
        <div className='second-line'>
          <span>
            by {props.data.by}
          </span>
          &nbsp; | &nbsp;
          <Link to={`/comments/${props.data.id}`} className='comment'>
            comments
          </Link>
        </div>
      </div>
    );
  }
}
