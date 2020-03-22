<template>
    <div class="admin">
        <el-button @click="back">Back</el-button>
        <el-button @click="dialogFormVisible = true" type="primary" class="add-employee">Add Employee</el-button>
        <el-dialog title="Add Employee" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="Employee Name">
                    <el-input v-model="newName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="uploadNewEmployee">Confirm</el-button>
            </div>
        </el-dialog>
        <el-dialog title="Add Reviewer" :visible.sync="addReviewerVisible">
            <el-form>
                <el-form-item label="Reviewer Name">
                    <el-select v-model="reviewerName" placeholder="select reviewerName">
                        <el-option
                            v-for="item in tableData.map(i => i.username)"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addReviewerVisible = false">Cancel</el-button>
                <el-button type="primary" @click="addReviewer">Confirm</el-button>
            </div>
        </el-dialog>

        <el-table :data="tableData" stripe empty-text="No employee, please add">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="username" label="Employee Name" width="150"></el-table-column>
            <el-table-column prop="reviews" label="Reviews">
                <template slot-scope="scope">
                    <div class="review-list">
                        <div
                            v-for="review in scope.row.reviews"
                            :key="review.reviewer"
                            class="review-item"
                        >
                            <span>
                                <span class="review-title">reviewer:</span>
                                {{review.reviewer}}
                            </span>
                            <br />
                            <span>
                                <span class="review-title">content:</span>
                                {{review.content}}
                            </span>
                            <br />
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="reviewer" label="Reviewer" width="120">
                <template slot-scope="scope">{{scope.row.reviewer.join(',')}}</template>
            </el-table-column>
            <el-table-column width="150">
                <template slot-scope="scope">
                    <el-button
                        class="handle-btn"
                        size="small"
                        type="primary"
                        @click="openAddReviewerDialog(scope.row.username)"
                    >AddReviewer</el-button>
                    <el-button
                        class="handle-btn"
                        size="small"
                        type="info"
                        @click="deleteEmployee(scope.row.username)"
                    >DeleteEmployee</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            addReviewerVisible: false,
            newName: null,
            reviewerName: null,
            reviewText: null,
            addReviewerTarget: false
        };
    },
    created() {
        this.refreshData();
    },
    methods: {
        async uploadNewEmployee() {
            try {
                if (!this.newName) {
                    this.$notify({
                        type: 'warning',
                        title: 'please input name'
                    });
                    return;
                }
                this.dialogFormVisible = false;
                const res = await this.$axios.get(this.$api.addEmployee, {
                    params: {
                        username: this.newName
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
                    title: 'success'
                });
                this.refreshData();
            } catch (e) {
                console.error(e);
            }
        },
        async refreshData() {
            try {
                const res = await this.$axios.get(this.$api.getEmployee);
                if (res.code !== 0) {
                    this.$notify({
                        type: 'error',
                        title: res.message
                    });
                    return;
                }
                this.tableData = res.data;
            } catch (e) {
                console.error(e);
            }
        },
        async deleteEmployee(username) {
            try {
                const res = await this.$axios.get(this.$api.deleteEmployee, {
                    params: {
                        username
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
                    title: 'delete success'
                });
                this.refreshData();
            } catch (e) {
                console.error(e);
            }
        },
        openAddReviewerDialog(username) {
            this.addReviewerVisible = true;
            this.addReviewerTarget = username;
        },
        async addReviewer() {
            try {
                this.addReviewerVisible = false;
                const res = await this.$axios.get(this.$api.addReviewer, {
                    params: {
                        username: this.addReviewerTarget,
                        reviewer: this.reviewerName
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
                    title: 'add reviewer success'
                });
                this.refreshData();
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

<style lang="scss" scoped>
.admin {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    .handle-btn {
        width: 120px;
        margin: 5px;
    }
    .add-employee {
        float: right;
    }
    .review-list {
        .review-item {
            border-bottom: 1px solid #ebeef5;
            .review-title {
                color: #949393;
            }
        }
        .review-item:last-child {
            border-bottom: none;
        }
    }
}
</style>