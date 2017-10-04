window.deepCopy = function(o){
    
    if(o === null){
        return null;
    }
    
    if(typeof o.clone === 'function'){
        return o.clone();
    }
    
    let output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object") ? deepCopy(v) : v;
    }
    
    return output;
}