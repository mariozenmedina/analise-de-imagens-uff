const imgUrl = './img/exemplo.jpg';

let img;

new zenImage(imgUrl).then( _ => {
    img =  _;
    
    const canvas = document.getElementById('canvas');
    canvas.width = _.img.width;
    canvas.height = _.img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(_.img, 0, 0);

    let pixelArr = ctx.getImageData(0, 0, _.img.width, _.img.height);
    img.pixelArr = pixelArr.data;

    img.renderHistogram();
    img.showHistogram();

    //Constrast Stretching
    for(var i=0;i<img.pixelArr.length;i+=4){
        let pOut = (img.oneChannel[i/4] - 40) * (255 / (150 - 40) ) + 0 || 0;
        pOut = pOut < 0 ? 0 : Math.floor(pOut);
        img.pixelArr[i] = 255 - pOut;
        img.pixelArr[i+1] = 255 - pOut;
        img.pixelArr[i+2] = 255 - pOut;
        img.pixelArr[i+3] = 255;
    }

    ctx.clearRect(0,0,1000,1000);

    //Generate image
    let iData = new ImageData(img.pixelArr, 1000, 1000);
    ctx.putImageData(iData, 0, 0);

    img.renderHistogram();
    img.showHistogram();
    
});
