<template>
    <div class="spu">
        <Category />
        <el-card style='margin-top: 15px;'>
            <el-scrollbar max-height="500px">
                <div v-show="scene === 0">
                    <el-button :disabled="c3Id ? false : true" @click="addOrUpdateSpu()">添加spu</el-button>
                    <el-table border style="margin: 15px 0;" :data="spuArr">
                        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                        <el-table-column label="Spu名称" width="200px" prop="spuName"></el-table-column>
                        <el-table-column label="属性值名称" prop="description" show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作" width="300px">
                            <template #="{ row }">
                                <el-button icon="Plus" style="background-color: lightskyblue; margin-right: 10px;"
                                    title="添加Sku" @click="addOrUpdateSpu()"></el-button>
                                <el-button icon="Edit" style="background-color: lightsalmon; margin-right: 10px;"
                                    title="修改Spu" @click="addOrUpdateSpu(row)"></el-button>
                                <el-button icon="View" style="background-color: lightgray; margin-right: 10px;"
                                    title="查看Sku列表">
                                </el-button>

                                <el-popconfirm title="Are you sure to delete this?" width="250px">
                                    <template #reference>
                                        <el-button icon="Delete" style="background-color: lightcoral;"></el-button>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                        :background="true" layout="prev, pager, next, jumper, ->, total, sizes" :total="total"
                        style="margin-top: 50px;" @current-change=currentChange @size-change=pageSizeChange />
                </div>
                <SpuForm v-show="scene === 1" @changeScene="changeScene"/>
                <SkuForm v-show="scene === 2"/>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqGetSpu } from '@/api/product/spu';
import Category from '@/components/category/Category.vue';
import { useCategoryStore } from '@/store/useCategoryStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import SkuForm from './SkuForm.vue';
import SpuForm from './SpuForm.vue';
//引入 ts 类型
import type { Records, SpuData } from '@/api/product/spu/type';
import { useSpuStore } from '@/store/useSpuStore';

const pageNo = ref<number>(1)//当前页数
const pageSize = ref<number>(3)//每一页数据的条数
const total = ref<number>(0)//已有品牌总个数
const spuArr = ref<Records>([])//获取的spu的数据
const scene = ref<number>(0)//控制场景切换的数据

//引入 pinia 中的数据和方法
const { c3Id } = storeToRefs(useCategoryStore())
const { getAllResData, getUpdateData } = useSpuStore()

//监听 c3Id 变化时候通知 pinia 发送请求
watch(() => c3Id.value, () => {
    //如果 c3Id 为空，清空数据
    if (!c3Id.value) {
        spuArr.value = []
        pageNo.value = 1
        total.value = 0
        return
    }
    scene.value = 0 //场景改为0
    pageNo.value = 1 //c3Id 改变时候将页数改为 1
    getSpu()
})

//获取数据的发送的请求
const getSpu = async () => {
    const res = await reqGetSpu(pageNo.value, pageSize.value, c3Id.value)
    console.log(res)
    if (res.code === 200) {
        spuArr.value = res.data.records
        total.value = res.data.total
    }
}

//添加/修改Spu的回调
const addOrUpdateSpu = (row?: SpuData) => {
    scene.value = 1    //改变场景

    //通知 pinia 获取数据
    getAllResData(row?.id)
    if(row) {
        //通知 pinia 获取数据
        getUpdateData(row.spuName, row.description)
    }
}

//自子组件的自定义事件（切换场景）
const changeScene = (val:number) => {
    scene.value = val
}

//页数改变的回调
const currentChange = () => {
    getSpu()
}

//page-size 改变的回调
const pageSizeChange = () => {
    //page-size改变时候将页数改为1
    pageNo.value = 1

    //重新获取数据
    getSpu()
}
</script>

<style lang="scss" scoped>

:deep(.el-button) {
        padding: 0 10px;
        background-color: #396eda;
        color: white;

        &:hover {
            opacity: 0.7;
        }
}

:deep(.is-disabled) {
        opacity: .7;
    }

.spu {
    height: 100%;

}
</style>