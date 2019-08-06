import React from 'react';
import { render } from 'react-dom';

import IndexPage from './components/pages/IndexPage';
import ArticlePage from './components/pages/ArticlePage';
import AboutPage from './components/pages/AboutPage';
import NewArticle from './components/pages/NewArticle';

const pages = {
    article: ArticlePage,
    about: AboutPage,
    new: NewArticle,
    edit: NewArticle
};

const Main = () => {
    const pathname = window.location.pathname;
    const pathBit = pathname.split("/").slice(1)[0];

    // Should return a React Component to be used
    let Page = pages[pathBit] || IndexPage;

    return <Page />;
};

render(
    <Main />,
    document.querySelector('body')
);

export default Main;