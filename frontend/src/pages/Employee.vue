<template>
    <div class="employee">
        <el-button @click="back">Back</el-button>
        <el-table :data="tableData" stripe empty-text="No employee, please add">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="username" label="Reviews Target" width="150"></el-table-column>
            <el-table-column prop="myReview" label="My Review"></el-table-column>
            <el-table-column width="150">
                <template slot-scope="scope">
                    <el-button
                        class="handle-btn"
                        size="small"
                        type="primary"
                        @click="review(scope.row)"
                    >Update Review</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="Modify Review" :visible.sync="showReview">
            <el-form>
                <el-form-item label="content">
                    <el-input v-model="reviewContent" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showReview = false">Cancel</el-button>
                <el-button type="primary" @click="updateReview">Confirm</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            emplyees: [],
            currentViewTarget: null,
            showReview: false,
            reviewContent: null
        };
    },
    computed: {
        username() {
            return this.$store.state.username;
        },
        tableData() {
            return this.emplyees
                .filter(item => {
                    return item.reviewer.includes(this.username);
                })
                .map(el => {
                    const myContent = el.reviews.filter(j => {
                        return j.reviewer === this.username;
                    });
                    return {
                        username: el.username,
                        myReview: myContent.length ? myContent[0].content : null
                    };
                });
        }
    },
    created() {
        if (!this.username) {
            this.$router.push('/home');
            return;
        }
        this.getEmployees();
    },
    methods: {
        async getEmployees() {
            try {
                const res = await this.$axios.get(this.$api.getEmployee);
                this.emplyees = res.data;
            } catch (e) {
                console.error(e);
            }
        },
        review(row) {
            this.currentViewTarget = row.username;
            this.reviewContent = row.myReview;
            this.showReview = true;
        },
        async updateReview() {
            try {
                const res = await this.$axios.get(this.$api.submitReview, {
                    params: {
                        username: this.currentViewTarget,
                        reviewer: this.username,
                        review: this.reviewContent
                    }
                });
                if (res.code !== 0) {
                    this.$notify({
                        type: 'error',
                        title: res.message
                    });
                    return;
                }
                this.$notify({
                    type: 'success',
                    title: 'add review success'
                });
                this.showReview = false;
                this.getEmployees();
            } catch (e) {
                console.error(e);
            }
        },
        back() {
            this.$router.push('/home');
        }
    }
};
</script>

<style>
.employee {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
}
</style>