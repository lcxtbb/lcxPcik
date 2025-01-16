<template>
    <div class="attr">

        <Category :scene="scene" />

        <el-card style="margin-top: 10px;">
            <div v-show="scene === 0">
                <el-button icon="Plus" style="margin-bottom: 20px;" :disabled="c3Id ? false : true"
                    @click="addAOrUpateAttr()">添加品牌属性</el-button>
                <div style="border-bottom: 1px solid lightgray;"></div>

                <el-scrollbar max-height="450px">
                    <el-table border :data="attrList">
                        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                        <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                        <el-table-column label="属性值名称">
                            <template #="{ row }">
                                <el-tag type="primary" v-for="item in row.attrValueList" :key="item.id"
                                    style="margin: 8px;">{{ item.valueName }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200px">
                            <el-button icon="Edit" @click="addAOrUpateAttr()"
                                style="background-color: lightskyblue; margin-right: 10px;"></el-button>

                            <el-popconfirm title="Are you sure to delete this?" width="250px">
                                <template #reference>
                                    <el-button icon="Delete" style="background-color: lightcoral;"></el-button>
                                </template>
                            </el-popconfirm>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
            </div>

            <div v-show="scene === 1">
                <el-form :inline="true">
                    <el-form-item label="属性名称：">
                        <el-input placeholder="属性名称是什么呢" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>

                <el-button icon="Plus" :disabled="attrParams.attrName ? false : true"
                    @click="addAttrValue">添加属性值</el-button>
                <el-button @click="cancel">取消</el-button>

                <el-table border style="margin: 20px 0;" :data="attrParams.attrValueList">
                    <el-table-column label="序号" type="index" width="80px"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row }">
                            <el-input v-model="row.valueName">{{ row.valueName }}</el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <el-popconfirm title="Are you sure to delete this?" width="250px">
                            <template #reference>
                                <el-button icon="Delete" style="background-color: lightcoral;"></el-button>
                            </template>
                        </el-popconfirm>
                    </el-table-column>
                </el-table>

                <el-button :disabled="attrParams.attrValueList.length >= 1 ? false : true"
                    @click="saveAttr">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import Category from '@/components/category/Category.vue';
import { useCategoryStore } from '@/store/useCategoryStore';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';
//引入ts类型
import type { Attr } from '@/api/product/attr/type';
import { reqAddOrUpdateAttr } from '@/api/product/attr';
import { ElMessage } from 'element-plus';

//从 pinia 中拿到属性的数据
const { attrList, c3Id, scene } = storeToRefs(useCategoryStore())
const { changeScene, getAttr } = useCategoryStore()

//添加属性的初始数据
let attrParams = reactive<Attr>({
    attrName: '',    //属性名称
    attrValueList: [],    //属性值的数组
    categoryId: '',    //对应的三级分类的id
    categoryLevel: 3    //
})

//添加或修改属性的回调
const addAOrUpateAttr = (data?: Attr) => {
    changeScene(1)    //更改页面显示

    //重置初始数据，将对应三级分类的id赋值到属性参数
    attrParams = {
        attrName: '',    //属性名称
        attrValueList: [],    //属性值的数组
        categoryId: c3Id.value,    //对应的三级分类的id
        categoryLevel: 3    //
    }


    if (data) {

    }
}

//添加属性值的回调
const addAttrValue = () => {
    //每一次点击添加一个基础属性值
    attrParams.attrValueList.push({
        valueName: ''
    })
}

//保存属性的回调
const saveAttr = async () => {
    const res = await reqAddOrUpdateAttr(attrParams)
    if (res.code === 200) {
        //重新获取对应分类的id
        getAttr()
        //更改页面
        changeScene(0)
        //提示
        ElMessage({
            type: 'success',
            message: '添加成功了啊'
        })
    } else {
        ElMessage({
            type: 'error',
            message: '怎么失败了老铁'
        })
    }

}

//添加品牌的取消的函数
const cancel = () => {
    changeScene(0)    //更改页面显示 
}

//生命周期
onMounted(() => {
    changeScene(0)
})
</script>

<style lang="scss" scoped>
.attr {
    height: 100%;

    .el-button {
        padding: 0 10px;
        background-color: #396eda;
        color: white;

        &:hover {
            opacity: 0.7;
        }
    }

    .is-disabled {
        opacity: .7;
    }
}
</style>