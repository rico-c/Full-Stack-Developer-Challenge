<template>
    <div class="home">
        <div class="main-area">
            <div class="login-form">
                <el-form ref="form" label-width="90px">
                    <el-form-item label="Your View">
                        <el-radio v-model="type" label="Admin">Admin</el-radio>
                        <el-radio v-model="type" label="Employee">Employee</el-radio>
                    </el-form-item>
                </el-form>
                <el-form ref="form" label-width="90px">
                    <el-form-item label="Your Name">
                        <el-input v-model="username" placeholder="input your name"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" label-width="90px">
                    <el-form-item>
                        <el-button type="primary" @click="jump">Login</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: null,
            username: null
        };
    },
    methods: {
        jump() {
            if (!this.type) {
                this.$notify({
                    type: 'warning',
                    title: 'please select your View Type'
                });
                return;
            }
            if (!this.username) {
                this.$notify({
                    type: 'warning',
                    title: 'please input your Name'
                });
                return;
            }
            this.$store.commit('updateUser', {
                username: this.username
            });
            switch (this.type) {
                case 'Admin':
                    this.$router.push({
                        path: '/Admin'
                    });
                    break;
                case 'Employee':
                    this.$router.push({
                        path: '/Employee'
                    });
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.home {
    background-image: url('../assets/imgs/bg.png');
    background-repeat: no-repeat;
    width: 100%;
    background-size: cover;
    min-height: 800px;
    .main-area {
        max-width: 950px;
        margin: 0 auto;
        .login-form {
            width: 350px;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            position: relative;
            top: 100px;
        }
    }
}
</style>