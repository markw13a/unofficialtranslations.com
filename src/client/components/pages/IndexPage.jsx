import React from 'react';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';

class IndexPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
        };
    };

    // retrieve article data from back-end
    componentDidMount() {
        fetch('/rest/get')
            .then(res => res.json())
            .then(json => {
                this.setState({data: json.data});
            });
    };

    render() {
        return (
            <div className="IndexPage Page"> 
                <NavBar />
                <ArticlesList data={this.state.data} />
                <Footer />
            </div>
        );
    };
}

/**
 * @param articles array of json objects containing info on articles
 */
const ArticlesList = ({data}) => {
    if( !data ) return null;
    console.warn(data);
    // want to display newest > oldest
    data.reverse();

    // Put the stored date string in to a more human-readable form
    const  dateOptions = {year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className="container">
            {data.map( article => {
                // Just show English version on front-page
                // TODO: Make language something that can just be toggled globally
                const enArticle = article.articles.find( article => article.language === 'en');

                if( !enArticle ) enArticle = article.articles[0];

                const {title, image, id, blurb, date} = enArticle;

                return (
                    <div className="article">
                        <h2 className="title">{title}</h2>
                        <div className="imgContainer"><img src={image} /></div>
                        <div className="blurb">{blurb}</div>
                        <div className="other">
                            <div className="extraInfo">
                                <small className="date">{new Date(date).toLocaleDateString("en-UK", dateOptions)}</small>
                            </div>
                            <div className="readMore cta">
                                <a href={'/article/' + id}>Read More</a>
                            </div>
                        </div>
                    </div>
            )})}
        </div>
    );
};

module.exports = IndexPage;