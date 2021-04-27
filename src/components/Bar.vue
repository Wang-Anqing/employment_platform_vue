<template>
    <div class="banner clearfix">
        <div class="ww w">
            <!--          左侧导航栏模块-->
            <section class="subnav">
                <ul>
                    <li v-for="item in subnavList">
                        <router-link :to="{path:'/joblist',query:{jobkind: item.name}}">
                            <a href="">{{ item.name }}<span>&gt;</span></a>
                        </router-link>
                    </li>
                </ul>
            </section>
            <!--          轮播图模块-->
            <section class="middlenav">
                <div class="swiper">
                    <section class="swiper-item">
                        <router-link :to="{path:'/jobdetail',query:{id: swiperItem[currentIndex].id}}">
                            <img :src="swiperItem[currentIndex].postSrc">
                        </router-link>
                    </section>
                    <section class="swiper-page" v-if="this.swiperItem.length > 1">
                        <ul>
                            <li @click="gotoPage(prevIndex)"><a>&lt;</a></li>
                            <li v-for="(item,index) in swiperItem" @click="gotoPage(index)"
                                :class="{'current':currentIndex == index}"><a>{{index+1}}</a></li>
                            <li @click="gotoPage(nextIndex)"><a>&gt;</a></li>
                        </ul>
                    </section>
                </div>
            </section>
            <!--          右侧榜单部分-->
            <section class="rankList">
                <h2>热投榜</h2>
                <div class="rankList-bd">
                    <ul>
                        <li v-for="item in rankListItem">
                            <router-link :to="{path:'/jobdetail',query:{company: item.name}}">
                                <h4>{{item.name}}</h4>
                                <p>{{item.des}}</p>
                            </router-link>
                        </li>
                    </ul>
                    <router-link to="/ranklist">
                        <a href="" class="more">查看榜单详情</a>
                    </router-link>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import {setInterval, clearInterval} from 'timers';

    export default {
        name: "Index",
        components: {},
        data() {
            return {
                //左侧导航栏数据
                subnavList: [
                    {
                    name: '前端开发',
                    route: ''
                }, {
                    name: 'Java开发',
                    route: ''
                }, {
                    name: '安卓开发',
                    route: ''
                }, {
                    name: 'IOS开发',
                    route: ''
                }, {
                    name: '软件测试',
                    route: ''
                }, {
                    name: 'UI设计',
                    route: ''
                }, {
                    name: '实施工程师',
                    route: ''
                }, {
                    name: '产品经理',
                    route: ''
                }, {
                    name: '项目经理',
                    route: ''
                }
                ],
                jobkind: '',
                //轮播图图片列表
                swiperItem: [{
                  companyName:'',
                  postSrc:''
                }],
                //轮播图的默认加载图片
                currentIndex: 0,
                //轮播图切换事件
                timer: null,
                //banner中热投榜数据
                rankListItem: [{
                    //公司名称
                    name: 'Qualcomm 高通',
                    //公司招聘简介
                    des: '2021暑期实习生招聘'
                }, {
                    name: 'Shopee',
                    des: '2021春季校园招聘'
                }, {
                    name: '好未来',
                    des: '2021校招补录及实习生招聘'
                }]
            }
        },
        methods: {
            gotoPage(index) {
                this.currentIndex = index;
            }
        },
        computed: {
            //上一张
            prevIndex() {
                if (this.currentIndex == 0) {
                    return this.swiperItem.length - 1;
                } else {
                    return this.currentIndex - 1;
                }
            },
            //下一张
            nextIndex() {
                if (this.currentIndex == this.swiperItem.length - 1) {
                    return 0;
                } else {
                    return this.currentIndex + 1;
                }
            }
        },
        created() {
            this.timer = setInterval(() => {
                this.gotoPage(this.nextIndex)
            }, 3000)
          let _this = this;
          axios.get('/api/init/swiper').then(res => {
            _this.swiperItem = res.data
            console.log(res)
          })

        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>


<style scoped>
@import "../css/common.css";
@import "../css/index-banner.css";
</style>