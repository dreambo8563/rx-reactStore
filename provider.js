import {Component, PropTypes, Children} from 'react';

export default class Provider extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired,
        children: PropTypes.element.isRequired
    }

    static childContextTypes = {
        store: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.store = props.store;
    }

    getChildContext() {
        return {store: this.store};
    }

    render() {
        return Children.only(this.props.children);
    }
}
