// TODO: This all feels quite clunky. Is there a way to simplify things?
// Getting rid of need to maintain "parent state" in InputFields would help greatly
import React, {useEffect, useReducer} from 'react';
import { ControlledFormInput } from '../common/Form';


const NewArticle = () => {
    // Do we want to create a new article or edit an existing one?
    // TODO: Maybe have index place this info in to sone kind of global state?
    const pathBits = window.location.pathname.split("/").slice(1);
    const isEdit = pathBits[0] === 'edit';

    const [state, dispatch] = useReducer(reducer, {
        articles: [],
        id: '', 
        password: ''
    });
    const {articles, id, password} = state;

    // Set up input fields
    useEffect(() => {
        // Pull in data if we are editing existing article        
        if( isEdit ) {
            fetch('/rest/get/?id=' + pathBits[1])
            .then( res => res.json())
            .then( json => {
                // Load article data in to state
                dispatch({type:'addNewArticleArray', articleArray: json.data[0]});
            });
        }
        // Just show an empty set of fields if not 
        else {
            dispatch({type:'addNewArticleArray', articleArray: [{}]})
        }
    }, []);

    return (
        <div>
            <ControlledFormInput 
                onChange={({value}) => dispatch({type:'setData', key: 'id', data: value})} 
                render={ ({value, onChange}) => 
                    <label> id
                        <input type="text" value={value} onChange={onChange} />
                    </label>
                }
            />
            <ControlledFormInput 
                onChange={({value}) => dispatch({type:'setData', key:'password', data: value})} 
                render={ ({value, onChange}) => 
                    <label> password
                        <input type="text" value={value} onChange={onChange} />
                    </label>
                }
            />
            { 
                // Display a set of input fields for each language entered
                articles.map((article, index) => <InputFields key={index} state={state} dispatch={dispatch} index={index} />) 
            }
            <button onClick={() => dispatch({type:'addNewArticleArray', articleArray: [{}]})}> Add a language </button>
            <button onClick={() => submitFn({id, password, articles})}> Submit </button>
        </div>
    );
};


const reducer = (state, action) => {
    switch (action.type) {
        // Generic function for updating any given key in state
        // Could be dangerous if misused, would it really be so bad to have separate setId and setPassword functions?
        case 'setData':
            const {key, data} = action;

            if( !key || data==='undefined') {
                console.warn("Reducer not provided with either data or key", action);
                throw new Error();
            }

            return {
                ...state, 
                [key]: data
            };

        // Insert updated article data in to given array index
        case 'updateArticle':
            const {article, index} = action;

            // Compare index to undefined because 0 is falsy
            if( !article || index === undefined ) {
                console.warn("Reducer not provided with either article or index", action);
                throw new Error();
            }

            // Copy array
            const updatedArticles = [...state.articles];
            // Remove old instance of article and replace with updated version
            updatedArticles.splice(index, 1, article);

            return {
                ...state, 
                articles: updatedArticles
            };

        case 'addNewArticleArray':
            const {articleArray} = action;

            if( !articleArray ) {
                console.warn("Reducer not provided with articleArray", action);
                throw new Error();
            }

            return {
                ...state,
                articles: state.articles.concat(articleArray)
            }
        default: 
            console.warn('Action type not recognised (' + action.type + ')')
    }
};

// Ship data off to back-end
const submitFn = ({id, articles, password}) => {
    if( !id || articles.length === 0) {
        console.warn("Submission blocked: either id or articles is unset", {id, articles});
        return;
    }

    console.warn({id, articles, password});

    fetch('/rest/create', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({id, articles, password})
    });
};

/** 
 * Add data for a new translation
 * Any given article can have as many translations as you please
 * @param articles an array of all article data
 * @param index used to identify where article data should be inserted in to master state
*/
const InputFields = ({state, dispatch, index}) => { 
    const article = state.articles[index];

    return (
        <div className="inputFields">
            <ControlledFormInput 
                initialValue={article.language} 
                onChange={({value}) => dispatch({type:'updateArticle', index, article: {...article, 'language': value}})} 
                render={ ({value, onChange}) => 
                    <label> Language
                        <input type="text" value={value} onChange={onChange} />
                    </label>
                }
            />
            <ControlledFormInput 
                initialValue={article.title} 
                onChange={({value}) => dispatch({type:'updateArticle', index, article: {...article, 'title': value}})} 
                render={ ({value, onChange}) => 
                    <label> Title
                        <input type="text" value={value} onChange={onChange} />
                    </label>
                }
            />
            <ControlledFormInput 
                initialValue={article.blurb} 
                onChange={({value}) => dispatch({type:'updateArticle', index, article: {...article, 'blurb': value}})} 
                render={ ({value, onChange}) => 
                    <label> Blurb
                        <textarea type="text" value={value} onChange={onChange} />
                    </label>
                }
            />
            <ControlledFormInput 
                initialValue={article.link} 
                onChange={({value}) => dispatch({type:'updateArticle', index, article: {...article, 'link': value}})} 
                render={ ({value, onChange}) => 
                    <label> Link
                        <input type="text" value={value} onChange={onChange} />
                    </label>
                }
            />
            <ControlledFormInput 
                initialValue={article.image} 
                onChange={({value}) => dispatch({type:'updateArticle', index, article: {...article, 'image': value}})} 
                render={ ({value, onChange}) => 
                    <label> Image
                        <input type="text" value={value} onChange={onChange} />
                    </label>
                }
            />
            <ControlledFormInput 
                initialValue={article.text} 
                onChange={({value}) => dispatch({type:'updateArticle', index, article: {...article, 'text': value}})} 
                render={ ({value, onChange}) => 
                    <label> Text
                        <textarea type="text" value={value} onChange={onChange} />
                    </label>
                }
            />
            <ControlledFormInput 
                initialValue={article.date} 
                onChange={({value}) => dispatch({type:'updateArticle', index, article: {...article, 'date': value}})} 
                render={ ({value, onChange}) => 
                    <label> Date
                        <input type="text" value={value} onChange={onChange} />
                    </label>
                }
            />
        </div>
    );
};

export default NewArticle;
