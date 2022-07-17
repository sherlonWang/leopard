<template>
    <div class="copyright">
        <p class="title">原创文章</p>
        <p class="item">
            <span class="label">版权说明：</span>
            <span class="desc">仅供学习交流使用，转载请保留作者及原文链接</span>
        </p>
        <p class="item">
            <span class="label">作者：</span>
            <span class="desc">{{thisAuthor}}</span>
        </p>
        <p class="item">
            <span class="label">原文链接：</span>
            <a :href="thisLink" target="_blank">
                {{thisLink}}
            </a>
        </p>
        <p class="item">
            <span class="label">许可协议：</span>
            <span class="desc">© 署名-非商业性使用-禁止演绎 4.0 国际协议（<a href="https://zh.wikipedia.org/wiki/%E7%9F%A5%E8%AF%86%E5%85%B1%E4%BA%AB%E8%AE%B8%E5%8F%AF%E5%8D%8F%E8%AE%AE" target="_blank">CC BY-NC-ND 4.0</a>）</span>
        </p>
        <a class="contactme" :href="thisContact" target="_blank">联系我 ✉️</a>

    </div>
</template>

<script>
    export default {
        name: "Copyright",
        props: ['author','link','contact'],
        data(){
            return {
                thisAuthor:'',
                thisLink:'',
                thisContact:''
            }
        },
        created() {
            this.thisAuthor = this.author?this.author:'IT三脚猫';
            this.thisLink = this.link?this.link:'https://imxiaolong.com/';
            this.thisContact = this.contact?this.contact:'https://imxiaolong.com/aboutme/';
        }
    }
</script>

<style scoped>
    .copyright{
        background-color: #282D34;
        padding: 3px 20px 20px 20px;
        border-radius: 10px;
        color: #cfc9c9;
        position: relative;
        margin-bottom: 20px;
    }
    .title{
        font-size: 18px;
        color: #FC9A5F;
    }
    .label{
        font-weight: bold;
    }
    .contactme{
        position: relative;
        float: right;
        margin: -20px 0px;
    }
</style>