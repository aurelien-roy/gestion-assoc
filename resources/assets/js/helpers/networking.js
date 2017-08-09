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
        console.log('executing')
        
      let item = this.queue[0];
      let self = this;
      
      item.makeRequest(this.request, item.context, {
          isSuccess(){
              console.log('success')
              self.queue.shift()
          },
          isFailure(){
              alert('FAIL!')
          }
      });
      
    },
    
    request(method, url, data, success, fail){
        
        console.log('request started')
    
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