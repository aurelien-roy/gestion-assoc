import { rand } from '../helpers/math'

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
    
    request(method, url, data, success, fail){
    
        let request = {
        
            success(fn){
                this.success_fn = fn;
                return this;
            },
            
            fail(fn){
                this.fail_fn = fn;
                return this;
            }
        
        }
        
        // ...
        // ...
        setTimeout(() => {
            if(request.success_fn !== undefined){
                request.success_fn();
            }
        }, rand(100, 1000));
        
        return request;
        
    }
}