
const {createApp} = Vue

const app = createApp({
    data() {
        return{
            randomP:""
        }
    },
    created() {
        this.getRandomNumber()
    },
    methods: {
        getRandomNumber() {
            this.randomP = Math.floor(Math.random() * 826) + 1;
            console.log(this.randomP);
        }
    }




}).mount('#app')