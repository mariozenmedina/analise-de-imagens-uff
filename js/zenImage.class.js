class zenImage {

    img;
    pixelArr = [];
    oneChannel = [];
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

    renderHistogram() {
        //OneChannel
        this.oneChannel = [];
        for(var i=0;i<this.pixelArr.length;i+=4){
            this.oneChannel[i/4] = Math.round(this.pixelArr[i]*.299 + this.pixelArr[i+1]*.587 + this.pixelArr[i+2]*.114);
        }

        //Histogram
        this.histogram = [];
        for(var i=0;i<this.oneChannel.length;i++){
            this.histogram[this.oneChannel[i]] = this.histogram[this.oneChannel[i]]+1 || 1;
        }
    }

    showHistogram() {
        const svg = d3.select('#histograma');
        svg.attr('width', 256 * 3);
        svg.attr('height', 600);
        const rects = svg.selectAll('rect').data(this.histogram);
        const maximo = d3.max(this.histogram);
        rects.enter()
            .append('rect')
        .merge(rects)
            .attr('width', 3)
            .attr('height', (d, i) => d / maximo * 600 || 0)
            .attr('x', (d, i) => i*3)
            .attr('y', d => 600 - d / maximo * 600 || 0);
        rects.exit().remove();
    }

    showCumulativeHistogram() {
        let sum = 0;
        const svg = d3.select('#histograma');
        svg.attr('width', 256 * 3);
        svg.attr('height', 600);
        const rects = svg.selectAll('rect').data(this.histogram);
        const maximo = this.histogram.reduce( (a, b) => a + b );
        rects.enter()
            .append('rect')
        .merge(rects)
            .attr('width', 3)
            .attr('height', (d, i) => {
                if(d){ sum += d };
                const value = sum / maximo * 600 || 0;
                return value;
            })
            .attr('x', (d, i) => i*3)
            .attr('y', (d, i) => {
                if(i==0){ sum = 0; }
                if(d){ sum += d };
                const value = 600 - sum / maximo * 600 || 0;
                return value;
            });
        rects.exit().remove();
    }
}