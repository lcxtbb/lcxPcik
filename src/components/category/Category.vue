<template>
    <div>
        <el-card>
            <el-form :inline="true">
                <el-form-item label="一级分类">
                    <el-select placeholder="请选择" style="width: 240px" v-model="c1Id" @change="changeC1Id" :disabled="scene === 0 ? false : true">
                        <el-option v-for="(c1) in c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select placeholder="请选择" style="width: 240px" v-model="c2Id" @change="changeC2Id" :disabled="scene === 0 ? false : true">
                        <el-option v-for="(c2) in c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select placeholder="请选择" style="width: 240px" v-model="c3Id" @change="changeC3Id" :disabled="scene === 0 ? false : true">
                        <el-option v-for="c3 in c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/store/useCategoryStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

//从pinia 中拿到数据和方法
const { getC1Arr, getC2Arr, getC3Arr, clearCategorry, getAttr, clearAllData } = useCategoryStore()
const { c1Arr, c2Arr, c3Arr, c1Id, c2Id, c3Id, scene } = storeToRefs(useCategoryStore())

//一级分类id改变的回调函数
const changeC1Id = () => {
    //通知 pinia 获取二级分类数据
    getC2Arr(c1Id.value)

    //通知 pinia 将三级分类数据赋值为空，并且将二级分类和三级分类初始值赋值为空字符串
    clearCategorry(true)
}

//二级分类id改变的回调函数
const changeC2Id = () => {
    //通知 pinia 获取三级分类数据
    getC3Arr(c2Id.value)

    //通知 pinia 将三级分类初始值赋值为空字符串
    clearCategorry()
}

//三级分类id改变的回调函数
const  changeC3Id = () => {
    //通知 pinia 获得对应的属性数据
    getAttr()
    // console.log(c1Id.value, c2Id.value, c3Id.value)
}

//生命周期
onMounted(() => {
    //通知 pinia 清除所有数据
    clearAllData()
    //通知 pinia 获取一级分类数据
    getC1Arr()
})

</script>