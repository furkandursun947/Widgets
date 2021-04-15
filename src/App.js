import React, {useState} from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate'
import Route from './components/Route'
import Header from './components/Header'
 


const items = [
    {
        title: 'What is React!',
        content: 'React is beautiful javascript framework man'
    },
    {
        title:'why use react?',
        content: 'Because it is so gooddddd'
    },
    {
        title:'how do you use react?',
        content: 'bla bla bla bla blaaaaa'
    }
]

const options = [
    {
        label: 'the color red',
        value: 'red'
    },
    {
        label: 'the color blue',
        value: 'blue'
    },
    {
        label: 'the color orange',
        value: 'orange'
    }
]




// eslint-disable-next-line import/no-anonymous-default-export
export default() => {
    const [selected, setSelected] = useState(options[0]);
    return (
        <div>
            <Header/>
            <Route path="/">
                <Accordion items={items} />
            </Route>
            <Route path="/list">
                <Search/>
            </Route>
            <Route>
                <Dropdown label="select a color" options={options} selected={selected} onSelectedChange={setSelected} />
            </Route>
            <Route path="/translate">
                <Translate/>
            </Route>
            
        </div>
    );
};