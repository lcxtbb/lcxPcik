<template>
    <div class="trademark">
        <el-card>
            <el-scrollbar>
                <el-button type="primary" icon="Plus" @click="addTrade">添加品牌</el-button>
                <el-table style="margin: 15px 0;" border :data="trademarkArr">
                    <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
                    <el-table-column label="品牌名称" prop="tmName"></el-table-column>
                    <el-table-column label="品牌logo">
                        <template #>
                            <img src="@/assets/images/tx.jpg" style="width: 120px; border-radius: 10px;" />
                        </template>
                    </el-table-column>

                    <el-table-column label="品牌操作">
                        <template #="{ row }">
                            <el-button icon="Edit" style="background-color: lightskyblue;"
                                @click="updateTrade(row)"></el-button>

                            <el-popconfirm title="Are you sure to delete this?" width="250px"
                                @confirm="deleteTrade(row.id)">
                                <template #reference>
                                    <el-button icon="Delete" style="background-color: lightcoral;"></el-button>
                                </template>
                            </el-popconfirm>

                        </template>
                    </el-table-column>

                </el-table>

                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5]"
                    :background="true" layout="prev, pager, next, jumper, ->, total, sizes" :total="total"
                    style="margin-top: 50px;" @current-change=currentChange @size-change=pageSizeChange />
            </el-scrollbar>
        </el-card>

        <!-- 对话框组件 -->
        <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
            <el-form label-width="120px" style="width: 70%;" :model="tradeMarkParms" :rules="rules" ref="formRef">

                <el-form-item label="品牌名称：" prop="tmName">
                    <el-input placeholder="请输入品牌名称" v-model="tradeMarkParms.tmName"></el-input>
                </el-form-item>

                <el-form-item label="品牌logo：" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
                        <img v-if="tradeMarkParms.logoUrl" :src="tradeMarkParms.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>

            </el-form>

            <template #footer>
                <el-button style="background-color: lightcoral;" @click="cancel">取消</el-button>
                <el-button @click="confirm">确定</el-button>
            </template>

        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateTrademar, reqDeleteTrademar, reqGetTrademar } from '@/api/product/tradeMark';
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
//引入ts类型
import type { Records, tradeMark } from '@/api/product/tradeMark/type';
import type { UploadProps } from 'element-plus'

const pageNo = ref<number>(1)//当前页数

const pageSize = ref<number>(3)//每一页数据的条数

const total = ref<number>(0)//已有品牌总个数

const trademarkArr = ref<Records>([])//每一组品牌数据

const dialogFormVisible = ref<boolean>(false)//添加/修改品牌的对话框展示
const dialogTitle = ref<string>('')//对话框的标题

//收集添加/修改品牌的数据
const tradeMarkParms = reactive<tradeMark>({
    logoUrl: '',
    tmName: ''
})

const formRef = ref()//获取表单组件实例

//页数更改的回调函数
const currentChange = () => {
    //v-model 已经绑定对应数据
    getTraderMark()
}

//每一页数据条数更改的回调函数
const pageSizeChange = () => {
    getTraderMark()
}

//获取品牌数据的函数
const getTraderMark = async () => {
    const res = await reqGetTrademar(pageNo.value, pageSize.value)

    if (res.code === 200) {
        total.value = res.data.total
        trademarkArr.value = res.data.records
    }

    console.log(trademarkArr.value)
    return res
}

//添加品牌按钮
const addTrade = () => {
    dialogFormVisible.value = true
    dialogTitle.value = 'add Trademark'

    //清空收集的品牌数据
    tradeMarkParms.logoUrl = ''
    tradeMarkParms.tmName = ''
    delete tradeMarkParms.id

    //清除上一次校验结果
    //因为第一次点击时候 formRef 才需要渲染，此时拿不到 formRef 的实例。所以需要使用 nextTick 或者 可选操作符
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
}

//修改品牌按钮
const updateTrade = (row: tradeMark) => {
    dialogFormVisible.value = true
    dialogTitle.value = 'update Trademark'

    //修改的品牌数据
    tradeMarkParms.logoUrl = row.logoUrl
    tradeMarkParms.tmName = row.tmName
    tradeMarkParms.id = row.id

    //清除上一次的校验结果
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
}

//删除品牌按钮气泡确认框
const deleteTrade = async (id: number) => {
    const res = await reqDeleteTrademar(id)
    if(res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功了'
        })

        //删除成功后重新获取品牌数据
        getTraderMark()
    }else {
        ElMessage({
            type: 'error',
            message: '删除失败了老铁'
        })
    }
}

//上传图片之前的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //需要接受的文件是图片或者动图,且<4M
    if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/jpeg') {
        if (rawFile.size / 1024 / 1024 > 4) {
            ElMessage({
                type: 'error',
                message: '上传的图片资源不能大于4M'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传的需要时JPG/PNG/GIF'
        })
        return false
    }
    return true
}

//上传图片成功的钩子函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    tradeMarkParms.logoUrl = response.data

    //图片上传成功之后，清除图片的校验信息
    formRef.value.clearValidate('logoUrl')
}

//对话框取消按钮
const cancel = () => {
    dialogFormVisible.value = false    //关闭对话框
}

//品牌名称校验规则
const validatorTmName = (_rule: any, value: any, cb: any) => {
    //如果去掉空字符串 长度>=2，就算合法
    if (value.trim().length >= 2) {
        cb()
    } else {
        cb(new Error('名称不合法兄弟'))
    }
}

//品牌logo图片的校验规则
const validatorLogoUrl = (_rule: any, value: any, cb: any) => {
    value ? cb() : cb(new Error('真的需要图片'))
}

//自定义修改/添加数据的表单校验规则
const rules = {
    tmName: [
        //required 表示是否需要校验，trigger 表示触发校验的时机
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, trigger: 'change', validator: validatorLogoUrl }
    ]
}

//对话框确定按钮
const confirm = async () => {
    //进行表单校验。通过继续执行函数
    await formRef.value.validate()

    dialogFormVisible.value = false    //关闭对话框
    const res = await reqAddOrUpdateTrademar(tradeMarkParms)

    //添加/修改品牌成功
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: tradeMarkParms.id ? '修改成功了' : '添加成功了'
        })

        //重新获得品牌数据
        getTraderMark()
    } else {
        ElMessage({
            type: 'error',
            message: '失败了兄弟'
        })
    }
}

//生命周期
onMounted(() => {
    getTraderMark()
})
</script>

<style lang="scss" scoped>

.trademark {
    height: 100%;

    .el-button {
        padding: 0 10px;
        background-color: #396eda;
        color: white;

        &:hover {
            opacity: 0.7;
        }
    }

    .el-card {
        height: 100%;

        .el-scrollbar {
            height: 80vh;
        }
    }

    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

}
</style>

<!-- 品牌选择图片的基本样式 -->
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
