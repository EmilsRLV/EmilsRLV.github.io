var app = new Vue({
    el: '#app',
    data: {
        videoOn: false,
        deviceW: window.innerWidth,
        deviceH: window.innerHeight,
        asp: [2400/1802,5616/3744,3456/4608,3148/2147,4896/3264,1864/1243,2000/1414,5472/3648,585/350],
        imgW: ['calc(100% + 10px)','calc(100% + 10px)','calc(100% + 10px)','calc(100% + 10px)','calc(100% + 10px)','calc(100% + 10px)','calc(100% + 10px)','calc(100% + 10px)'],
        imgH: ['auto','auto','auto','auto','auto','auto','auto','auto'],
        peoples: 0,
        pageText: [
            [
                'JAPĀNAS KULTŪRAS REĢIONS 126,900 milj',
                'JAPĀŅI 98.5%',
                'MAZĀKUMTAUTĪBAS 1.5%',
                'ĶOREJIEŠI 0.5%',
                'ĶĪNIEŠI 0.4%',
                'PĀRĒJIE 0.6%'
            ]
        ],
        pictures: false
    },
    created: function () {
        
    },
    computed: {
        
    },
    mounted: function () {
        this.$nextTick(function () {
            window.addEventListener('resize', this.resizeWindo);
            this.resizeWindo();
        })
    },
    methods: {
        resizeWindo: function () {
            this.deviceW = window.innerWidth;
            this.deviceH = window.innerHeight;
            var prop=this.deviceW/this.deviceH;
            if(prop<this.asp[0]){
                this.imgH[1]="calc(100% + 10px)";   
                this.imgW[1]="auto";
            }else{
                this.imgW[1]="calc(100% + 10px)";   
                this.imgH[1]="auto";
            }
            if(prop<this.asp[1]){
                this.imgH[2]="calc(100% + 10px)";   
                this.imgW[2]="auto";
            }else{
                this.imgW[2]="calc(100% + 10px)";   
                this.imgH[2]="auto";
            }
            if(prop<this.asp[2]){
                this.imgH[3]="calc(100% + 10px)";   
                this.imgW[3]="auto";
            }else{
                this.imgW[3]="calc(100% + 10px)";   
                this.imgH[3]="auto";
            }
            if(prop<this.asp[3]){
                this.imgH[4]="calc(100% + 10px)";   
                this.imgW[4]="auto";
            }else{
                this.imgW[4]="calc(100% + 10px)";   
                this.imgH[4]="auto";
            }
            if(prop<this.asp[4]){
                this.imgH[5]="calc(100% + 10px)";   
                this.imgW[5]="auto";
            }else{
                this.imgW[5]="calc(100% + 10px)";   
                this.imgH[5]="auto";
            }
            if(prop<this.asp[5]){
                this.imgH[6]="calc(100% + 10px)";   
                this.imgW[6]="auto";
            }else{
                this.imgW[6]="calc(100% + 10px)";   
                this.imgH[6]="auto";
            }
            if(prop<this.asp[6]){
                this.imgH[7]="calc(100% + 10px)";   
                this.imgW[7]="auto";
            }else{
                this.imgW[7]="calc(100% + 10px)";   
                this.imgH[7]="auto";
            }
            this.$forceUpdate();
        },      
        resize: function(elem){
            console.log($(elem.target));
        }
    }
})
