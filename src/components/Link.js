import React from 'react'


const Link = ({className, href, children}) =>{
    const onClick = (event) =>{
        if(event.metaKey || event.ctrlKey){     //macos ve windows da yeni sekmede açma linkleri
            return;
        }
        event.preventDefault();
        // url changed kodu, react componentlerine url nin değiştigini bildirir ve o url ye götürür.
        window.history.pushState({}, '', href);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };
    return <a onClick={onClick} className={className} href={href}>{children}</a>
};

export default Link;