import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// import fetch from 'isomorphic-fetch';
export default class App extends React.Component  {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {word: '',
      items :[]
    };
  }
  componentDidMount() {
    this.UserList();
    this.timerID = setInterval(
      () => this.UserList(),
      30000
    );
  }

  UserList() {
  return $.ajax({
    url: "http://localhost:3001/api/all",
    dataType: 'jsonp',
    type: 'GET',
    success: function(data) {
      this.setState({items: data});
    }.bind(this),
    error: function(xhr, status, err) {
      console.error("http://localhost:3001/api/add", status, err.toString());
    }
  });
}
  handleChange(e) {
    this.setState({word: e.target.value});
  }


 componentWillUnmount() {
   clearInterval(this.timerID);
 }


 dropData(e){
   const number = e.currentTarget.getAttribute('data-number');
   console.log(number);
   $.ajax({
     url: "http://localhost:3001/api/delete?id=" + number,
     dataType: 'jsonp',
     type: 'GET',
     success: function(data) {
       this.UserList();
     }.bind(this),
     error: function(xhr, status, err) {
       console.error("http://localhost:3001/api/delete", status, err.toString());
     }
   });
}




  changeText() {
    console.log(this);
    $.ajax({
      url: "http://localhost:3001/api/add",
      dataType: 'jsonp',
      type: 'POST',
      data: {name : this.state.word},
      success: function(data) {
        this.UserList();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:3001/api/add", status, err.toString());
      }
    });
  }
  render() {
    return (
      <div>
        <h2><label class="col-sm-2 col-form-label">Word:</label></h2>
        <input
          onChange={this.handleChange.bind(this)} />
        <button onClick={this.changeText.bind(this)}>change</button>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>id</th>
              <th>ワード</th>
              <th>ツイート数</th>
              <th>開始日時</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map(item => {
              return (<tr key={item.id}>
                <td>{ item.id }</td>
                <td>{ item.q }</td>
                <td>{ item.tweets_num }</td>
                <td>{ item.create_at }</td>
                <td><button type="button" onClick={this.dropData.bind(this)} data-number={ item.id } >Delete</button></td>
              </tr>);
            })}
            <getList />
          </tbody>
        </table>
      </div>
    );
  }
}


  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
