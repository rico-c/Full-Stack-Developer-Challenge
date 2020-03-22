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
                <el-form ref="form" label-width="90px" v-if="type==='Employee'">
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
            username: null,
            emplyees: []
        };
    },
    created() {
        this.getEmployees();
    },
    methods: {
        jump() {
            // form check
            if (!this.type) {
                this.$notify({
                    type: 'warning',
                    title: 'please select your View Type'
                });
                return;
            }
            if (!this.username && this.type === 'Employee') {
                this.$notify({
                    type: 'warning',
                    title: 'please input your Name'
                });
                return;
            }
             if (!this.emplyees.includes(this.username) && this.type === 'Employee') {
                this.$notify({
                    type: 'warning',
                    title: 'this username has not registered yet,only accept registered user by admin',
                    message: 'please use admin add this emplyee username'
                });
                return;
            }
            // update vuex store
            this.$store.commit('updateUser', {
                username: this.username,
                usertype: this.type
            });
            // router jump
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
        },
        // get employee list to judge if any username is registered
        async getEmployees() {
            try {
                const res = await this.$axios.get(this.$api.getEmployee);
                this.emplyees = res.data.map(i => i.username);
            }
            catch(e) {
                console.error(e);
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