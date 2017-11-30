import React, { Component } from 'react';
import * as firebase from 'firebase';

const injectFirebaseData = (DataComponent, getRef, withKey = false) => {
  return class extends Component {
    state = {
      loading: true,
      data: {}
    };

    currentUser = null;

    getRef = () => getRef(this.props, this.currentUser);

    componentDidMount = () => {
      this.currentUser = firebase.auth().currentUser;
      this.getRef().on('value', (snapshot) => {
        const data = snapshot.val();
        if (data !== null && withKey) data.key = snapshot.key;
        this.setState({
          loading: false,
          data
        });
      });
    };

    componentWillUnmount = () => {
      this.getRef().off();
      this.currentUser = null;
    };

    render = () => (
      <DataComponent
        loading={this.state.loading}
        data={this.state.data}
        {...this.props}
      />
    );
  }
};

export default injectFirebaseData;
