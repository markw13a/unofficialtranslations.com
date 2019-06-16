// TODO: This all feels quite clunky. Is there a way to simplify things?
// Getting rid of need to maintain "parent state" in InputFields would help greatly
import React, {useState, useEffect} from 'react';
import { ControlledFormInput } from '../common/Form';

/** 
 * Add data for a new translation
 * Any given article can have as many translations as you please
 * @param articles an array of all article data
 * @param index used to identify where article data should be inserted in to master state
*/
const InputFields = ({index, setArticles, articles, defaultValues={}}) => { 
    const [article, setArticle] = useState(defaultValues);
    // Update data held locally and by parent
    const onChange = ({key, value}) => {
        const updatedArticle = {...article, [key]: value};
        setArticle(updatedArticle);

        // Update parent copy
        articles[index] = updatedArticle;
        setArticles(articles);
    };

    return (
        <div className="inputFields">
            <ControlledFormInput defaultValue={defaultValues.language} onChange={({value}) => onChange({key: 'language', value})} render={ ({value, onChange}) => 
                <label> Language
                    <input type="text" value={value} onChange={onChange} />
                </label>}
            />
            <ControlledFormInput defaultValue={defaultValues.title} onChange={({value}) => onChange({key: 'title', value})} render={ ({value, onChange}) => 
                <label> Title
                    <input type="text" value={value} onChange={onChange} />
                </label>}
            />
            <ControlledFormInput defaultValue={defaultValues.blurb} onChange={({value}) => onChange({key: 'blurb', value})} render={ ({value, onChange}) => 
                <label> Blurb
                    <textarea type="text" value={value} onChange={onChange} />
                </label>}
            />
            <ControlledFormInput defaultValue={defaultValues.link} onChange={({value}) => onChange({key: 'link', value})} render={ ({value, onChange}) => 
                <label> Link
                    <input type="text" value={value} onChange={onChange} />
                </label>}
            />
            <ControlledFormInput defaultValue={defaultValues.image} onChange={({value}) => onChange({key: 'image', value})} render={ ({value, onChange}) => 
                <label> Image
                    <input type="text" value={value} onChange={onChange} />
                </label>}
            />
            <ControlledFormInput defaultValue={defaultValues.text} onChange={({value}) => onChange({key: 'text', value})} render={ ({value, onChange}) => 
                <label> Text
                    <textarea type="text" value={value} onChange={onChange} />
                </label>}
            />
            <ControlledFormInput defaultValue={defaultValues.date} onChange={({value}) => onChange({key: 'date', value})} render={ ({value, onChange}) => 
                <label> Date
                    <input type="text" value={value} onChange={onChange} />
                </label>}
            />
        </div>
    );
};

const NewArticle = () => {
    // Pass these to InputFields components. They will insert their state so that we can easily access data on submission
    const [articles, setArticles] = useState([]);

    const [id, setid] = useState(''); 
    const [password, setPassword] = useState('');

    // Show one set of fields by default
    const [inputFieldsArray, setInputFieldsArray] = useState([]);

    // Display another set of input fields
    const onClick = () => {
        setInputFieldsArray([...inputFieldsArray, <InputFields index={inputFieldsArray.length} setArticles={setArticles} articles={articles} />]);
    };

    // Set up input fields
    useEffect(() => {
        // TODO: Maybe have index place this info in to sone kind of global state?
        const pathBits = window.location.pathname.split("/").slice(1);
        const isEdit = pathBits[0] === 'edit';

        // Pull in data if we are editing existing article        
        if( isEdit ) {
            fetch('/rest/get/?id=' + pathBits[1])
            .then( res => res.json())
            .then( json => {
                // Input fields with pre-loaded data
                const {articles} = json.data[0];
                setInputFieldsArray(
                    articles.map( (article, index) => <InputFields index={index} defaultValues={article} setArticles={setArticles} articles={articles} />)
                );
            });
        } else {
            // Just show an empty set of fields if not 
            setInputFieldsArray([<InputFields index={0} setArticles={setArticles} articles={articles} />]);
        }
    }, []);

    const submitFn = () => {
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

    return (
        <div>
            <ControlledFormInput onChange={({value}) => setid(value)} render={ ({value, onChange}) => 
                <label> id
                    <input type="text" value={value} onChange={onChange} />
                </label>}
            />
            <ControlledFormInput onChange={({value}) => setPassword(value)} render={ ({value, onChange}) => 
                <label> password
                    <input type="text" value={value} onChange={onChange} />
                </label>}
            />
            { inputFieldsArray.map((inputFields, i) => <div key={i}>{inputFields}</div>) }
            <button onClick={onClick}> Add a language </button>
            <button onClick={submitFn}> Submit </button>
        </div>
    );
};

module.exports = NewArticle;
