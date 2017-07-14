import faker from 'faker';

export default {
    
    state: {
        activities: [],
    },
    
    generateActivity(){
        this.state.activities.push({
            id: this.state.activities.length,
            name: faker.name.jobTitle(),
            day: faker.date.weekday(),
        });
        
        window.activities = this.state.activities;
    }
}