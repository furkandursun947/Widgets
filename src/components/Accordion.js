import React, {useState} from 'react'


const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    // usestate in içindeki değer, initial deger oluyor. Mesela counter setCounter yapıp
    // usestate(0) dersen counter 0 demiş oluyorsun default olarak
    // activeIndex state imiz, setActiveIndex ise setter
    const onTitleClick = (index) => {
        //console.log("title clicked", index);
        setActiveIndex(index);
    }   
    const renderedItems = items.map((item, index) => {
        const active = index === activeIndex ? 'active' : '';
        return (

            // react fragment, no extra element key tutmak için ideal
            <React.Fragment key={item.title}>   
                <div className={`title ${active}`} onClick={() => onTitleClick(index)
                }>
                    <i className="drowdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        );
    });
    return(
        <div className="ui styled accordion">
            {renderedItems}
        </div>
    );
};

export default Accordion;