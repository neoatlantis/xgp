import { $desktop$ } from "xgp/channels";
import until from "xgp/lib/until";

let result = null;
let error = null;
let has_result = false;

$desktop$.subscribe("password.result", (password)=>{
    result = password;
    error = false;
    has_result = true;
});

$desktop$.subscribe("password.error", ()=>{
    result = null;
    error = true;
    has_result = true;
})

export default async function get_password(opts){
    has_result = false;
    error = result = null;

    $desktop$.publish("password.prompt", opts);
    await until(()=>has_result);
    return new Promise((resolve, reject)=>{
        if(error) return reject(new Error("Failed getting password."));
        resolve(result);
        result = null;
    })
}
