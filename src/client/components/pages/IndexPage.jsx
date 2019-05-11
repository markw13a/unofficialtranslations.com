import React from 'react';
import axios from 'axios';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';

class IndexPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: {
                value: null,
            }
        };
    };

    // retrieve article data from back-end
    componentDidMount() {
        axios.get('/rest/get')
            .then(value => {
                this.setState({data: {value: value.data.data}});
            });
    };

    render() {
        let {value} = this.state.data;

        return (
            <div className="IndexPage Page"> 
                <NavBar />
                <ArticlesList articles={value} />
                <Footer />
            </div>
        );
    };
}

/**
 * @param articles array of json objects containing info on articles
 */
const ArticlesList = ({articles}) => {
    if( !articles ) return null;

    // want to display newest > oldest
    articles.reverse();

    // Put the stored date string in to a more human-readable form
    const  dateOptions = {year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className="container">
            {articles.map( article => (
                <div className="article">
                    <h2 className="title">{article.targetLanguageTitle}</h2>
                    <div className="imgContainer"><img src={article.image} /></div>
                    <div className="blurb">{article.blurb}</div>
                    <div className="other">
                        <div className="extraInfo">
                            <small className="date">{new Date(article.date).toLocaleDateString("en-UK", dateOptions)}</small>
                        </div>
                        <div className="readMore cta">
                            <a href={'/article/' + article.endpointTitle}>Read More</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

module.exports = IndexPage;