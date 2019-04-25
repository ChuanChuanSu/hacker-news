import React from 'react';
import axios from 'axios';
import CommentItem from './component/commentItem';
import './styles/comment.scss';

export class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storyId: props.match.params.id,
      storyTitle: '',
      comments: [],
      commentCount: 0
    };
  }

  componentDidMount() {
    const { storyId } = this.state;
    axios.get(`http://node-hnapi.herokuapp.com/item/${storyId}`)
      .then(res => {
        this.setState({
          storyTitle: res.data.title,
          comments: res.data.comments,
          commentCount: res.data.comments_count
        })
      });
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    const { storyTitle, comments } = this.state;
    return (
      <div className='comment-container'>
        <header className='container-header'>{storyTitle}</header>
        <section className='container-body'>
        {
          comments.map(item => (
            <CommentItem
              key={item.id}
              data={item}
            ></CommentItem>
          ))
        }
        </section>
      </div>
    )
  }
}

export default Comment;
