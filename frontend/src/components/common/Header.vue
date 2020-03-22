<template>
    <div class="header">
        <div class="header-center">
            <div class="header-logo">
                <img src="../../assets/imgs/logo.png" />
            </div>
            <span class="header-title">
                Performance Review
            </span>
            <div class="header-user">
                {{usertype}}  {{username}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        username() {
            return this.$store.state.username;
        },
        usertype() {
            return this.$store.state.usertype;
        }
    }
};
</script>

<style lang="less">
@font-color: #242323;
.header {
    width: 100vw;
    border-bottom: solid 8px #f03;
    .header-center {
        max-width: 950px;
        margin: 0 auto;
        .header-logo {
            padding: 19px 10px;
            display: inline-block;
            >img {
                width: 140px;
            }
            vertical-align: middle;
        }
        .header-title {
            color: @font-color;
            font-size: 24px;
            vertical-align: middle;
        }
        .header-user {
            float: right;
            line-height: 80px;
            color: #555;
        }
    }
    
}
</style>