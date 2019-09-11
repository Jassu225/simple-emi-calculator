const key = "history";
const localStore = {
    getData: function() {
        let data = window.localStorage.getItem(key);
        if(data) {
            return JSON.parse(data);
        }
        return [];
    },
    push: function(data) {
        if(data) {
            let localData = this.getData();
            localData.push(data);
            window.localStorage.setItem(key, JSON.stringify(localData));
        }
    }
}

export default localStore;