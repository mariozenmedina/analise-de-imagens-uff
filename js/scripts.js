const imgUrl = './img/exemplo2.jpg';
const svg = document.getElementById('histograma');

let image = new zenImage(imgUrl).then( _ => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    }
    img.src = _.url;

    _.renderHistogram(svg);
});
