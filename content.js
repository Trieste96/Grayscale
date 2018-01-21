browser.runtime.onMessage.addListener(request => {
    var body=document.body;
    body.style['filter']='progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)';
    var state = request.state;
    if(state == 1)
    {
        if (!body.style['filter']){
            body.style['-webkit-filter']='grayscale(100)';
            body.style['filter']='grayscale(100)';
        }
        return Promise.resolve({info: "Changed to black"});
    }
    else{
        if (body.style['filter'])
        {
            body.style['-webkit-filter']=null;
            body.style['filter']=null;
        }
        return Promise.resolve({info: "Changed to white"});
    }

});

