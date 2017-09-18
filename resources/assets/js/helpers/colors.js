export default {
    colors: {
        'red': 'bf2d2b',
        'orange': 'b36f2b',
        'yellow': 'b5b52b',
        'green': '44bd2b',
        'aqua': '2bbdb1',
        'blue': '2b50b6',
        'purple': '4e2bb5',
        'gray': '939393',
        'white': 'ffffff',
        
        default: '939393',
    },
    
    nameToHex(name){
        return '#' + (this.colors.hasOwnProperty(name) ? this.colors[name] : this.colors['default']);
    },
    
    hexToName(hex){
        if(hex.charAt(0) === '#'){
            hex = hex.substr(1);
        }
        
        hex = hex.toLowerCase();
        
        return Object.keys(this.colors).find(c => this.colors[c] === hex);
    }
}