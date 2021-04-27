<template>
    <div class="ad w">
        <div class="box1 w">
            <div class="box1-hd">
                <h3>课程推荐</h3>
            </div>
            <div class="box1-bd clearfix">
                <div class="box1-bd-left">
                    <img :src="adleft" alt="">
                    <p class="tag">广告</p>
                </div>
                <div class="box1-bd-top">
                    <img :src="adtop" alt="">
                    <p class="tag">广告</p>
                </div>
                <ul>
                    <li v-for="item in ad">
                        <div>
                            <img :src="item.imgSrc" alt="">
                            <p class="tag">广告</p>
                            <h4>{{item.des}}</h4>
                            <p><span>{{item.level}}</span> • {{item.viewer}}人在学习</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Ad",
        data() {
            return {
                ad: [{
                    name: 'ad1',
                    imgSrc: require('../imgs/ad/ad-good1.png'),
                    des: 'Android Hybrid APP开发实战 H5+原生！',
                    viewer: '110',
                    level: '初级'
                }, {
                    name: 'ad2',
                    imgSrc: require('../imgs/ad/ad-good2.png'),
                    des: 'Kami2首页界面切换效果',
                    viewer: '120',
                    level: '初级'
                }, {
                    name: 'ad3',
                    imgSrc: require('../imgs/ad/ad-good3.png'),
                    des: 'Unity Profiler入门',
                    viewer: '130',
                    level: '中级'
                }, {
                    name: 'ad4',
                    imgSrc: require('../imgs/ad/ad-good4.png'),
                    des: 'Cocos2d-x 引擎源码中的纹理优化',
                    viewer: '140',
                    level: '高级'
                }
                ],
                adtop: require('../imgs/ad/ad-top.png'),
                adleft: require('../imgs/ad/ad-left.png')
            }
        }
    }
</script>

<style src="../css/common.css"></style>
<style src="../css/ad.css">

</style>