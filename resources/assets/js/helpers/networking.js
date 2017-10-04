import { rand } from '../helpers/math'
import axios from 'axios'
import auth from './../store/auth'

export default {
    
    queue: [],
    
    addToQueue(item){
        this.queue.push(item);
        
        if(this.queue.length === 1){
            this.execute();
        }
    },
    
    execute(){
        if(this.queue.length) {
    
            let item = this.queue[0];
            let self = this;
    
            item.makeRequest(this.request, item.context, {
                isSuccess() {
                    if(item.callback !== undefined){
                        item.callback(true);
                    }
                    
                    self.queue.shift()
                    self.execute();
                },
                isFailure() {
                    if(item.callback !== undefined){
                        item.callback(false);
                    }
                    alert('FAIL!')
                }
            });
        }
      
    },
    
    request(method, url, data){
        
        return new Promise((resolve, reject) => {
            
            axios({
                method,
                url,
                data,
    
                baseURL: '/api/',
        
                headers: {
                    'Authorization': 'Bearer ' + auth.accessToken()
                },
            })
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
        
    }
}