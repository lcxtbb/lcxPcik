<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="Spu名称:" style="width: 300px;">
                <el-input placeholder="Spu叫啥？" v-model="spuName"></el-input>
            </el-form-item>
            <el-form-item label="Spu品牌:">
                <el-select style="width: 150px;">
                    <el-option value="111"></el-option>
                    <el-option value="121"></el-option>
                    <el-option value="123"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Spu描述:">
                <el-input type="textarea" placeholder="简介是啥啊" v-model="spuDecribe"></el-input>
            </el-form-item>
            <el-form-item label="Spu照片:">
                <el-upload action="/api/admin/product/fileUpload" list-type="picture-card"
                v-model:fileList="">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog>
                    <img w-full alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="Spu销售属性:">
                <el-select style="width: 150px; margin-right: 15px;">
                    <el-option v-for="item in allSaleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-button icon="Plus">添加属性值</el-button>
                <el-table border style="margin-top: 15px;" :data="spuSaleList">
                    <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                    <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
                    <el-table-column label="销售属性值">
                        <template #="{row}">
                            <el-tag type="primary" v-for="item in row.spuSaleAttrValueList" :key="item.id" style="margin: 8px;">{{ item.saleAttrValueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200px">
                        <template #>
                            <el-button icon="Plus"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button>保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { useSpuStore } from '@/store/useSpuStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';

//从 pinia 中获取数据
const { spuName, spuDecribe, spuImgList, spuSaleList, allSaleList} = storeToRefs(useSpuStore())

//
watch(() => spuSaleList.value, () => {

})

//接受父组件传来的事件
const emit = defineEmits(['changeScene'])

//取消按钮,切换场景
const cancel = () => {
    emit('changeScene', 0)
}

//生命周期
onMounted(() => {

})
</script>