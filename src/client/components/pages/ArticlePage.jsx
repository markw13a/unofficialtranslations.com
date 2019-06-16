import React, {useEffect, useState} from 'react';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';

const ArticlePage = () => {
    const [data, setData] = useState();
    // Show English article by default
    const [language, setLanguage] = useState('en');

    let articleName = window.location.pathname.match(/article\/([^\/]*$)/);
    articleName = articleName && articleName[1];

    useEffect(() => {
        fetch('/rest/get/?id=' + articleName)
        .then(res => res.json())
        .then( json => setData(json.data[0]));
    }, [articleName]);

    if( !data ) return 'Article not found';

    return (
        <div className="ArticlePage Page"> 
            <NavBar />
            <div className="container">
                <div className="other">
                    <LanguageSwitcher articles={data.articles} language={language} setLanguage={setLanguage} />
                    <a href={data.link} target="_blank">Original article >></a>                      
                </div>
                <Article articles={data.articles} language={language} />
            </div> 
            <Footer />
        </div>
    );
};

/**
 * @param articles json object containing article data
 */
const Article = ({articles, language}) => {
    const articleData = articles.find( article => article.language === language);

    if( !articleData ) return 'An error has occurred: no data found for the language selected'

    return (
            <div className="article">
                <h2 className="title">{articleData.title}</h2>
                <div className="imgContainer"><img src={articleData.image} /></div>                    
                <div className="blurb"><small>{articleData.blurb}</small></div>
                <div className="text" dangerouslySetInnerHTML={{__html: articleData.text}} />
            </div>
    );
};


const LanguageSwitcher = ({articles, language, setLanguage}) => (
        <div className="languageSwitcher"> 
            {
                articles.map( article => (
                    <label for={article.language} className={language === article.language ? 'checked' : ''}>
                        <input type="checkbox" id={article.language} name={article.language} onChange={() => setLanguage(article.language)} />
                        {article.language}
                   </label>
                ))
            }
        </div>
);

module.exports = ArticlePage;