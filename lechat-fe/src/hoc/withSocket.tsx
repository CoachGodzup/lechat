import React, {Component} from 'react';
import socketService from '../services/socket';

const withSocket = (WrappedComponent: any) => {
  return class WithSocket extends Component{

    protected socketService = socketService;

    render() {
      return <WrappedComponent {...this.props}>
      </WrappedComponent>
    }
  }
}

export default withSocket;