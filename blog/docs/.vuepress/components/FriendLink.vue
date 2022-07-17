<template>
    <div class="cardList">
        <!--        <button>{{btnName}}</button>-->
        <a :style="{backgroundColor:card.bgColor,color:card.textColor}" :title="card.desc" :href="card.link" target="_blank" class="card" v-for="(card,index) in cards" :key="index">
            <img class="img" :src="card.logo"/>
            <div class="textdiv">
                <p class="name">{{card.title}}</p>
                <p class="desc">{{card.desc.substring(0,9)+'...'}}</p>
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        name: "FriendLink",
        props: ['cardList'],
        data(){
            return {
                cards:[]
            }
        },
        mounted() {
            const that = this;
            console.log("cardList:",that.cardList);
            // let arr = that.cardList.split("|");
            const bgTextColor = [
                {
                    bgColor: '#e76f51',
                    textColor: '#ffe4e4'
                },
                {
                    bgColor: '#f4a261',
                    textColor: '#8a0a0a'
                },
                {
                    bgColor: '#e9c46a',
                    textColor: '#A05F2B'
                },
                {
                    bgColor: '#2a9d8f',
                    textColor: '#143c2a'
                },
                {
                    bgColor: '#264653',
                    textColor: '#cdd5e0'
                },
            ];
            that.cardList.forEach(function (r) {
                setTimeout(function () {

                },100);
                let index = Math.floor(Math.random()*5);
                let card = {};
                card.title = r.title;
                card.desc = r.desc;
                card.logo = r.logo?r.logo:'https://cdn.jsdelivr.net/gh/sherlonWang/imgbed/picgoblog.png';
                card.link = r.link;
                card.bgColor = bgTextColor[index].bgColor;
                card.textColor = bgTextColor[index].textColor;
                if (card.title && card.link) {
                    that.cards.push(card);
                }

            })
        }
    }
</script>

<style scoped>
    .cardList{
        /*margin: -.35rem;*/
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        /*margin: 10px;*/
        margin-top: 25px;
    }
    a {
        text-decoration: none !important;
    }
    .card {
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        /*background-color: #3eaf7c;*/
        width: calc(33.33333% - .7rem);
        margin: .35rem;
        border-radius: 8px;
        /*color: #fff;*/
        box-shadow: 1px 1px 2px 0 rgba(0,0,0,.06);
    }
    .card:hover{
        transform: scale(1.05);
    }
    .img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid #fff;
        margin: 1rem 0 1rem 1rem;
        box-shadow: 3px 2px 5px rgba(0,0,0,.08);
        transition: all .4s;
    }

    .textdiv{
        flex: 1;
        display: inline-block;
        vertical-align: top;
        float: right;
        padding: 1rem 0;
    }

    .textdiv p{
        padding: 0 1rem;
        transition: text-shadow .4s;
        text-align: center;
        /*color: #fff;*/
    }

    .name{
        margin: .2rem 0 .3rem;
    }

    .desc{
        font-size: .8rem;
        line-height: 1.1rem;
        opacity: .8;
        margin-bottom: .2rem;
    }

    @media (max-width: 1320px){
        .card {
            width: calc(50% - .7rem);
        }
    }

    @media (max-width: 500px){
        .card {
            width: calc(100% - .7rem);
        }
    }

</style>
