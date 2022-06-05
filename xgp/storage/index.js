let ready = false;

async function _wait_till_ready(){
    if(ready) return;
    await new Promise((resolve, reject)=>{
        function check(){
            if(ready) return resolve();
            setTimeout(check, 300);
        }
        check();
    });
}

async function init(){
    ready = true;
    return true;
}

async function get(key){
    await _wait_till_ready();
    return JSON.parse(localStorage.getItem(key));
}

async function set(key, value){
    await _wait_till_ready();
    return localStorage.setItem(key, JSON.stringify(value));
}

async function remove(key){
    await _wait_till_ready();
    return localStorage.removeItem(key);
}

async function key(i){
    await _wait_till_ready();
    return localStorage.key(i);
}

async function length(){
    await _wait_till_ready();
    return localStorage.length;
}

export default {
    init,
    get, set, remove, key, length
}
