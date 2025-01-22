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
                            <template #="{ row }">
                                <el-button icon="Edit" @click="addAOrUpateAttr(row)"
                                    style="background-color: lightskyblue; margin-right: 10px;"></el-button>

                                <el-popconfirm title="Are you sure to delete this?" width="250px" @confirm="removeAttr(row.id)">
                                    <template #reference>
                                        <el-button icon="Delete" style="background-color: lightcoral;"></el-button>
                                    </template>
                                </el-popconfirm>
                            </template>
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
                        <template #="{ row, $index }">
                            <!-- 每次模板改变，将 input 实例存入数组中 -->
                            <el-input :ref="(vc) => inputRef[$index] = vc" v-model="row.valueName" v-if="row.flag"
                                @blur="toLook(row)">{{ row.valueName }}</el-input>
                            <div class="look" v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #="{ _ , $index }">
                            <el-button icon="Delete" style="background-color: lightcoral;"
                                @click="removeAttrValue($index)"></el-button>
                        </template>
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
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
//引入ts类型
import type { Attr } from '@/api/product/attr/type';
import { reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr';
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

//属性值组件实例的数组
const inputRef = ref<any>([])

//三级分类 id 改变时候获取属性
watch(() => c3Id.value, () => {
    c3Id.value ? getAttr() : ''
})

//添加或修改属性的回调
const addAOrUpateAttr = (data?: Attr) => {
    changeScene(1)    //更改页面显示

    //重置初始数据，将对应三级分类的id赋值到属性参数
    attrParams.attrName = ''
    attrParams.attrValueList = []
    attrParams.categoryId = c3Id.value

    //重置 input 实例数组数据
    inputRef.value = []

    //把初始数据 赋值为 实参的参数,要深拷贝
    if(data) {
        Object.assign(attrParams, JSON.parse(JSON.stringify(data)))
    }
}

//删除已有属性的回调
const removeAttr = async (id: number) => {
    const res = await reqDeleteAttr(id)
    if(res.code === 200) {
        ElMessage({
            type: 'success',
            message: '成功了'
        })
        //重新获取数据
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: '这能成功？'
        })
    }
}

//添加属性值的回调
const addAttrValue = () => {
    //每一次点击添加一个基础属性值
    attrParams.attrValueList.push({
        valueName: '',
        flag: true    //控制每一个属性值编辑模式和切换模式的查看
    })

    //模板改变之后，最后一个输入框聚焦（即为新加的属性值输入框）
    nextTick(() => {
        inputRef.value.at(-1).focus()
    })

}

//属性值 input 失焦切换到查看模式
const toLook = (row: any) => {
    //如果属性值为空，不让转换到查看模式
    if (row.valueName.trim() === '') return

    row.flag = false
}

//点击查看模式切换到编辑模式
const toEdit = (row: any, index: number) => {
    row.flag = true
    //模板改变之后让 input 聚焦
    nextTick(() => {
        inputRef.value[index].focus()
    })
}

//删除属性值的回调
const removeAttrValue = (index: number) => {
    attrParams.attrValueList.splice(index, 1)    //将对应的属性值删掉
    inputRef.value.splice(index, 1)    //将对应的 input 实例删掉
}

//保存属性的回调
const saveAttr = async () => {
    //处理属性中的属性值为空，或者重复的数据
    attrParams.attrValueList = attrParams.attrValueList.filter(item => item.valueName.trim() !== '')    //去除空字符串
        //通过index去重，findexIndex 找到只能是对应的第一个值,其他都会过滤掉。self为原数组
        .filter((item, index, self) =>
            index === self.findIndex(t => t.valueName.trim() === item.valueName.trim()))

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

    .look {
        font-family: 楷体;
    }
}
</style>