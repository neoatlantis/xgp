/*
 * Load cached briefings of keys from storage.
 */

import { $desktop$ } from "xgp/channels";


function parse_entry(entry){
    let data = this.deserialize(entry);
    let ret = _.clone(data.brief);

    ret.is_private = !_.isNil(_.get(data, "private"));
    ret.is_public  = !_.isNil(_.get(data, "public"));

    return ret;
}



export default async function(){
    this.cache = new Map();

    for(let i=0; i<this.driver.length; i++){
        let key = this.driver.key(i);
        if(key.length < 10) continue; // TODO better check UUID format

        try{
            this.cache.set(
                key,
                parse_entry.call(this, await this.driver.getItem(key))
            );
        } catch(e){
            console.log(e);
            continue;
        }
    }

    $desktop$.publish("keyring.refresh");
}
