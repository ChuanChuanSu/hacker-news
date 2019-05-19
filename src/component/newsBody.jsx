import React from 'react';
import { NewsBodyItem } from './newsBodyItem';
import hackerNews from 'hacker-news-jsdk-class';

import '../styles/body.scss'


hackerNews.getList('new').then((res) => {
  console.log(res);
});

export class NewsBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newStories: [],
      newStoryIds: [],
      topStories: [],
      topStoryIds: [],
      bestStories: [],
      bestStoryIds: [],
      askStories: [],
      askStoryIds: [],
      showStories: [],
      showStoryIds: [],
      currentData: [],
      currentType: 'new',
      currentIndex: {
        new: 0,
        best: 0,
        top: 0,
        ask: 0,
        show: 0,
      },
      totalPages: {
        new: 0,
        best: 0,
        top: 0,
        ask: 0,
        show: 0,
      }
    };
  }

  componentDidMount() {
    hackerNews.getList('new')
      .then(res => {
        this.setState({
          newStoryIds: res.data,
          totalPages: {
            new: Math.ceil(res.data.length / 30),
            best: 0,
            top: 0,
            ask: 0,
            show: 0,
          }
        })

        let promiseArr = [];
        for (let i = 0; i < 30; i++) {
          promiseArr.push(hackerNews.getItem(res.data[i]));
        }

        let arr = Promise.all(promiseArr)
        arr.then(res => {
          let item = [];
          res.forEach(res => {
            item.push(res.data);
          })
          this.setState({
            newStories: item,
            currentData: item.slice()
          })
        })
      })
  }

  componentWillReceiveProps(nextProps) {
    const { currentIndex } = this.state;
    let StoryIds = this.state[nextProps.currentType + 'StoryIds'];
    const index = currentIndex[nextProps.currentType];
    const endIndex = StoryIds.length < (index + 1) * 30 - 1 ? StoryIds.length : (index + 1) * 30;

    if (nextProps.currentType !== this.state.currentType) {
      this.setState({
        currentType: nextProps.currentType
      })

      if (this.state[nextProps.currentType + 'Stories'][index * 30]) {
        this.setState({
          currentData: this.state[nextProps.currentType + 'Stories'].slice(index * 30, endIndex)
        })
      }
      else {
        hackerNews.getList(nextProps.currentType)
          .then(res => {
            let { totalPages } = this.state;
            totalPages[nextProps.currentType] = Math.ceil(res.data.length / 30);
            this.setState({
              [nextProps.currentType + 'StoryIds']: res.data,
              totalPages,
            });
            let promiseArr = [];
            for (let i = 0; i < 30; i++) {
              promiseArr.push(hackerNews.getItem(res.data[i]));
            }
            let arr = Promise.all(promiseArr);
            arr.then(res => {
              let item = [];
              res.forEach(res => {
                item.push(res.data);
              });
              this.setState({
                [nextProps.currentType + 'Stories']: item,
                currentData: item.slice()
              });
            });
          });
      }
    }
  }

  pageJump = (x) => {
    let { currentIndex, currentType, totalPages } = this.state;
    let currentIds = this.state[currentType + 'StoryIds'];
    let currentStories = this.state[currentType + 'Stories'];
    
    if ((x === -1 && currentIndex[currentType] > 0) || (x === 1 && currentIndex[currentType] < totalPages[currentType] - 1)) {
      currentIndex[currentType] = currentIndex[currentType] + x;
      this.setState({
        currentIndex
      });
      const index = currentIndex[currentType];
      let stories = this.state[currentType + 'Stories'];
      let StoryIds = this.state[currentType + 'StoryIds'];
      const endIndex = StoryIds.length < (index + 1) * 30 - 1 ? StoryIds.length : (index + 1) * 30;

      if (stories[index * 30]) {
        this.setState({
          currentData: stories.slice(index * 30, endIndex)
        });
      } else {
        let promiseArr = [];
        for (let i = index * 30; i < endIndex; i++) {
          promiseArr.push(hackerNews.getItem(currentIds[i]));
        }
        let arr = Promise.all(promiseArr);
        arr.then(res => {
          res.forEach((item, no) => {
            currentStories[index * 30 + no] = item.data;
          });
          this.setState({
            [currentType + 'Stories']: currentStories,
            currentData: currentStories.slice(index * 30, endIndex)
          });
        });
      }
    }
  }

  render() {
    let { currentData, currentIndex, totalPages, currentType } = this.state;
    return (
      <div className='news-body'>
        <div className='page-turner'>
          <div className='page-back' onClick={ () => { this.pageJump(-1) }}>&lt;pre</div>
          <div>{currentIndex[currentType] + 1}/{totalPages[currentType]}</div>
          <div className='page-forward' onClick={ () => { this.pageJump(1) }}>&gt;pre</div>
        </div>
        {
          currentData.map((data, index) => {
            return data ? (
              <NewsBodyItem
                key={data.id}
                index={currentIndex[currentType] * 30 + index}
                data={data}
              />
            ) : null;
          })
        }
      </div>
    )
  }
}
