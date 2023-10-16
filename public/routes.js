const app_div = document.getElementById('app');

let routes = {};
let templates = {};


let template = (name, templateFunction) => {
    return template[name] = templateFunction;
};

let route = (path, template) => {
    if(typeof(template) === "function")
    {
        return routes[path] = template;
    }
    else if(typeof(template) === "string")
    {
        return routes[path] = templates[template];
    }
    else
    {
        return;
    }
};

let resolve = (route) => {
    try
    {
        return routes[route];
    }
    catch(e)
    {
        throw new Error(`Route ${route} not found`);
    }
};

let addDevice = () => {
    let div = document.createElement('div');
    let link = document.createElement('a');
    link.href = '#/';
    link.innerText = 'Home';

    div.innerHTML = '<h1>Add a Device</h1>';
    div.appendChild(link);

    app_div.appendChild(div);
};

let router = (evt) => {
    let url = window.location.hash.slice(1) || '/';
    let route = resolve(url);

    route();
}

template('Add a Device', () => {
    addDevice();
})

route('/landing', 'addDevice');

window.addEventListener('load', router);
window.addEventListener('hashchange', router);