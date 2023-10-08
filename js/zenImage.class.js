class zenImage {

    url;
    blob;
    uint8Array = [];
    histogram = [];

    constructor(url) {
        this.url = url;
        return new Promise( (resolve, reject) => {
            fetch(url).then( (res) => {
                return res.blob();
            }).then( blob => {
                this.blob = blob;
                let reader = new FileReader();
                reader.onloadend = (arrBuff) => {
                    this.uint8Array = new Uint8Array(reader.result);
                    resolve(this);
                }
                reader.readAsArrayBuffer(blob);
            });
        });
    }

    renderHistogram(svg) {
        for(var i=0;i<this.uint8Array.length;i+=4) {
            //this.histogram[this.uint8Array[i]] = this.histogram[this.uint8Array[i]]+1 || 1;
            this.histogram[i/4] = this.histogram[this.uint8Array[i]]+1 || 1;
        }

        console.log(this.uint8Array);

        /* let d3svg = d3.select(svg);
        const height = d3.max(this.histogram);
        d3svg.attr('width', 800).attr('height', height / 2);
        
        const rects = d3svg.selectAll('rect').data(this.histogram);
        rects.enter()
            .append('rect')
                .attr('width', 800 / 256)
                .attr('height', d => d)
                .attr('x', (d, i) => i)
                .attr('y', d => (height - d)/2) */
    }
}