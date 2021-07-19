<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div class="appiy-main">
      <h4>我的产品</h4>
      <span class="product-name" @click="productShow = true">{{ applyProduct.name }}</span>
      <div class="treaty">
        <p>
          重要须知━请认真阅读：本《最终用户许可协议》（以下称《协议》）是您（单一实体）与 xxx系统之间有关上述xxx系统软件产品的法律协议。 本“软件产品”包括计算机软件，并可能包括相关媒体、印刷材料和“联机”或电子文档（“软件产品”）。本“软件产品”还包括对xxx系统提供给您的原“软件产品”的任何更新和补充资料。任何与本“软件产品”一同提供给您的并与单独一份最终用户许可证相关的软件产品是根据那份许可协议中的条款而授予您。您一旦安装、复制、下载、访问或以其它方式使用“软件产品”，即表示您同意接受本《协议》各项条款的约束。如您不同意本《协议》中的条款，请不要安装或使用“软件产品”；但您可将其退回原购买处，并获得全额退款。 软件产品许可证 本“软件产品”受袒护著作权法及国际著作权条约和其它知识产权法和条约的保护。本“软件产品”只许可使用，而不出售。 1．许可证的授予。本《协议》授予您下列权利：．应用软件。您可在单一一台计算机上安装、使用、访问、显示、运行或以其它方 式互相作用于（“运行”）本“软件产品” （或适用于同一操作系统的任何前版本）的一份副本。运行“软件产品”的计算机的主要用户可以制作另一份副本，仅供在其在安装到公司其他电脑管理注册后的同一项目之用。 ．储存／网络用途。您还可以在您公司的其它计算机上运行“软件产品”但仅限于注册时所添之项目，您必须为增加的每个项目获得一份许可证。 ．保留权利。未明示授予的一切其它权利均为XXX有限公司所有。 2．其它权利和限制的说明。 ．试用版本。仅限于试用，如需正式使用，必须注册成为正式版。 ．组件的分隔。本“软件产品”是作为单一产品而被授予使用许可的。您不得将 其组成部分分开在多台计算机上使用。 ．商标。本《协议》不授予您有关任何xxx系统商标或服务商标的任何 权利。 ．出租。不得出租、租赁或出借本“软件产品”。
        </p>
      </div>
      <div class="upload">上传合同章</div>
    </div>
    <van-button>提交</van-button>
    <van-popup v-model="productShow" position="bottom">
      <van-picker
        title="选择产品"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'ApplyContract',
  data: () => ({
    headerTitle: '合同申请',
    applyProduct: {
      name: '请选择',
      value: ''
    },
    columns: [
      {
        id: 1,
        text: '阿宝云'
      },
      {
        id: 2,
        text: '金融NLP'
      }
    ],
    productShow: false
  }),
  methods: {
    onConfirm(value) {
      this.applyProduct.name = value.text
      this.applyProduct.value = value.id
      this.productShow = false
    },
    onCancel() {
      this.productShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.appiy-main {
  position: relative;
  height:  calc(100% - 14rem);
  margin: .833rem .833rem 0 .833rem;
  background: #fff;
  border-radius: .667rem;
  padding: 1.4167rem 1rem 0 2rem;
  box-sizing: border-box;
  h4 {
    height: 1.667rem;
    line-height: 1.667rem;
    margin-bottom: 16px;
    font-size: 1.167rem;
    font-weight: 400;
    color: #000;
  }
  .product-name {
    position: absolute;
    top: 1.4167rem;
    right: 4rem;
    height: 1.4167rem;
    line-height: 1.4167rem;
    &:after {
      position: absolute;
      right: -1.5rem;
      top: .5rem;
      content:'';
      border-width:.5rem;
      border-style:solid;
      border-color:#3C51FF transparent transparent transparent;
    }
  }
  .treaty {
    height:  calc(100% - 8rem);
    overflow: auto;
    padding-right: 1rem;
    p {
      line-height: 1.4167rem;
      text-align: justify;
    }
  }
  .upload {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    height: 4.4167rem;
    line-height: 4.4167rem;
    font-size: 1.167rem;
    font-weight: 600;
    color: #3C51FF;
  }
}
.van-button {
  margin-top: 2.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 20.8333rem;
  background: #3C51FF;
  color: #fff;
  border-radius: 1.667rem;
  font-size: 1.167rem;
  z-index: 1;
}
</style>
