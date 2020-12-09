import React, {Component} from 'react';

const withCookie = (WrappedComponent: any) => {
  return class WithCookie extends Component{

    render() {
      return <WrappedComponent {...this.props}>
      </WrappedComponent>
    }
  }
}

export default withCookie;