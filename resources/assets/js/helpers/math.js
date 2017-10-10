const TIME_REGEXP = /^(2[0-3]|[0-1]?[0-9])[:h]([0-5]?[0-9])$/i

export function rand(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function zerosOffset(v, n = 2){
    let i = (Math.log10((v ^ (v >> 31)) - (v >> 31)) | 0) + 1; // nb de chiffres de v
    while(i < n){
        v = '0' + v;
        i++;
    }
    
    return v;
}

export class Time{
    
    constructor(h, m){
        if(arguments.length === 1){
            if(typeof(h) === 'string'){
                let r = TIME_REGEXP.exec(h);
                h = parseInt(r[1]);
                m = parseInt(r[2]);
            }else{
                m = 0;
            }
            
        }
        
        this.h = h;
        this.m = m;
    }
    
    toString(){
        return this.h + 'h' + (this.m ? zerosOffset(this.m) : '');
    }
    
    toInputString(){
        return zerosOffset(this.h) + ':' + zerosOffset(this.m);
    }
    
    addHours(h){
        this.h = (this.h + h) % 24;
        return this;
    }
    
    gt(time){
        return (this.h > time.h ? true : (this.h === time.h ? this.m > time.m : false));
    }

    compare(time) {
        if (this.h === time.h)
            return this.h - time.h;
        else
            return this.m - time.m;
    }
    
    clone(){
        return new Time(this.h, this.m);
    }
}