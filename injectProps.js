import React, { PropTypes } from 'react';

const injectProps = (selector = (state) => state) => (WrappedComponent) =>
    class injectProps extends React.Component {

      static contextTypes = {
        store: PropTypes.object,
      };

      constructor(props, context) {
        super(props, context);
        this.store = context.store
      }

      componentWillMount() {
        this.subscription = this.store
        .map(selector)
        .subscribe(::this.setState);
      }

      componentWillUnmount() {
        this.subscription.unsubscribe();
      }

      render() {
          console.log(selector,WrappedComponent);
        return (
          <WrappedComponent { ...this.state } { ...this.props } />
        );
      }
    };

export default injectProps;