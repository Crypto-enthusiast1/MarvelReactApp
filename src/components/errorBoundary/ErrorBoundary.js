import { Component } from 'react';

class ErrorBoundary extends Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false, errorInfo: null };
   }

   componentDidCatch(error, errorInfo) {
      this.setState({ hasError: true, errorInfo });
      console.log(error, errorInfo);
   }

   render() {
      if (this.state.hasError) {
         return <h1>Something went wrong.</h1>;
      }

      return this.props.children;
   }
}

export default ErrorBoundary;
