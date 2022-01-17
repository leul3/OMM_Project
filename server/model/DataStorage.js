//var fetch = require('node-fetch');

class DataStorage {

    // the server's "database"
    images = {
        doge:    {
            id: 1,
            name: "doge",
            link: "../public/images/doge.jpeg" //
        }
    }

    // returns ids of all images
    getAllImages(){
        return Object.keys(this.images);
    }

    // returns image metadata
    getImageById(id){
        let image = this.images[id]
        return {
            id: image.id,
            name: image.name,
            link: image.link
        }

    }
}
module.exports = DataStorage;
