const imgUrl = './img/exemplo2.jpg';

let img;

new zenImage(imgUrl).then( _ => {
    img =  _;
    
    const canvas = document.getElementById('canvas');
    canvas.width = _.img.width;
    canvas.height = _.img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(_.img, 0, 0);

    pixelArr = ctx.getImageData(0, 0, _.img.width, _.img.height);
    img.histogram = pixelArr.data;
});
