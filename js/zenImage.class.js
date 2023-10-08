class zenImage {

    img;
    histogram = [];

    constructor(url) {
        this.url = url;
        return new Promise( (resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                this.img = img;
                resolve(this);
            }
            img.src = url;
        });
    }
}