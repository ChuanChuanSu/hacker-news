import React from 'react';
import { NewsHeader } from './component/newsHeader'
import { NewsBody } from './component/newsBody'
import './styles/app.scss';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentType: 'new'
    };
  }

  handleTypeChange = (type) => {
    this.setState({
      currentType: type
    })
  }

  render() {
    const type = this.state.currentType;
    return (
      <div>
        <NewsHeader
          type={type}
          onTypeChange={this.handleTypeChange}
        />
        <NewsBody
          currentType={type}
        />
      </div>
    )
  }
}

export default App;
