import React from 'react';
import { render } from 'react-dom';

import DeletePage from './components/pages/DeletePage';
import IndexPage from './components/pages/IndexPage';
import ArticlePage from './components/pages/ArticlePage';
import AboutPage from './components/pages/AboutPage';
import ErrorPage from './components/pages/ErrorPage';
import NewArticle from './components/pages/NewArticle';

const pages = {
    article: ArticlePage,
    about: AboutPage,
    new: NewArticle,
    edit: NewArticle
};

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pathname: null
        }
    };

    componentWillMount() {
        this.setState({pathname: window.location.pathname});
    }

    render() {
        const {pathname} = this.state;
        const pathBit = pathname.split("/").slice(1)[0];

        // Iterate through pages object
        // Should return a React Component to be used
        let Page = pages[pathBit] || IndexPage;

        return <Page />;
    };
}

render(
    <Main />,
    document.querySelector('body')
);

module.exports = Main;