import React from 'react';
import '../styles/commentItem.scss'

export class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.data.user,
      content: props.data.content,
      time: props.data.time_ago,
      children: props.data.comments
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    const { user, content, time, children } = this.state;
    return (
      <section className='comment-body'>
        <header className='comment-mes'>
          <b>{user}</b>&nbsp;&nbsp;&nbsp;
          <div className='mes-time'>{time}</div>
        </header>
        <article className='comment-content'>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </article>
        {
          children.map(item => (
            <CommentItem
              key={item.id}
              data={item}
            ></CommentItem>
          ))
        }
      </section>
    )
  }
}

export default CommentItem;
