<template>
  <el-dialog
    v-model="dialogShow"
    title="Tips"
    width="30%"
    class="info-modal"
    :modal="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <p id="titleId" :class="titleClass">案件详情</p>

        <el-icon class="el-icon--left" @click="emits('closeModal')"
          ><CircleCloseFilled
        /></el-icon>
      </div>
    </template>
    <template v-if="formData?.length > 0">
      <div v-for="(item, i) in formData">
        <div v-show="checkIndex == i" class="form-box">
          <div>
            <span>调节对象</span>
            <p>{{ item?.accused_client_name || "--" }}</p>
          </div>
          <div>
            <span>被调节对象</span>
            <p>{{ item?.client_name || "--" }}</p>
          </div>
          <div>
            <span>纠纷类型</span>
            <p>{{ item?.case_type_name || "--" }}</p>
          </div>
          <div>
            <span>调解时间</span>
            <p>{{ item?.created_date || "--" }}</p>
          </div>
          <div>
            <span>纠纷发生地(乡、镇)</span>
            <p>{{ item?.parent_area_name || "--" }}</p>
          </div>
          <div>
            <span>纠纷发生地村</span>
            <p>{{ item?.area_name || "--" }}</p>
          </div>
          <div>
            <span>调解员</span>
            <p>{{ item?.mediators_name || "--" }}</p>
          </div>
          <div>
            <span>纠纷内容</span>
            <p>{{ item?.client_remark || "--" }}</p>
          </div>
          <div>
            <span>纠纷材料</span>
            <div class="demo-image">
              <el-carousel
                :loop="false"
                ref="carouselRef"
                :autoplay="false"
                height="100px"
                width="100%"
                arrow="always"
              >
                <el-carousel-item
                  class="el-car-item"
                  v-for="(list, index) in returnData"
                  :key="index"
                >
                  <!-- --{{ index }} --{{ returnData?.length }}
                <div @click="() => index !== 0 && setActiveItem(index + 1)">
                  1212
                </div> -->

                  <el-image
                    v-for="imgList in list"
                    style="width: 140px; height: 100px"
                    :src="imgList?.web_url"
                    :preview-src-list="previewData"
                    :fit="fit"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-teleported="true"
                  />
                  <!-- <div
                  @click="
                    () =>
                      index !== returnData?.length - 1 &&
                      setActiveItem(index - 1)
                  "
                >
                  1212
                </div> -->
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="empty">暂无数据</div>

    <template #footer>
      <span class="dialog-footer" v-if="formData?.length">
        <el-button v-if="checkIndex !== 0" type="primary" @click="before">
          上一个
        </el-button>
        <el-button v-if="formData?.length !== checkIndex + 1" @click="next"
          >下一个</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import { axiosFormData } from "@/utils";

const carouselRef = ref(null);
const previewData = ref([]);
const returnData = ref();
const checkIndex = ref(0);
const emits = defineEmits(["closeModal"]);

const next = () => {
  checkIndex.value = checkIndex.value + 1;
};
const before = () => {
  checkIndex.value = checkIndex.value - 1;
};
// 激活指定索引的轮播项
const setActiveItem = (index) => {
  console.log("index", index);

  if (carouselRef.value) {
    console.log("carouselRef.value", carouselRef.value);
    nextTick(() => {
      carouselRef.value?.[0]?.setActiveItem(index);
    });
  }
};
const dialogShow: WritableComputedRef<boolean> = computed({
  get() {
    return props.show;
  },
  set() {
    return props.show;
  },
});

interface Props {
  show: boolean;
  infoData: any;
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
  infoData: () => {
    return {};
  },
});
const getDataSource = (data) => {
  let newDataList = [];
  let current = 0;
  const ylArr = [];
  if (data && data.length > 0) {
    for (let i = 0; i <= data.length - 1; i++) {
      ylArr.push(data[i].web_url);
      data[i].img = data[i].web_url;
      if (i % 3 !== 0 || i === 0) {
        if (!newDataList[current]) {
          newDataList.push([data[i]]);
        } else {
          newDataList[current].push(data[i]);
        }
      } else {
        current++;
        newDataList.push([data[i]]);
      }
    }
  }
  returnData.value = [...newDataList];
  previewData.value = ylArr;
  console.log("returnData", newDataList, data, ylArr);
};
const formData = ref([]);
//案件详情
const getInfo = async () => {
  try {
    const api =
      "http://app.mdjmlcourt.gov.cn/api/screen/newCaseNoticeFist" +
      "?area_id=" +
      props?.infoData?.info?.area?.parent_area?.id;
    axiosFormData(api).then((res: any) => {
      //   res = {
      //     code: 200,
      //     data: [
      //       {
      //         client_name: "林旭东",
      //         accused_client_name: "徐",
      //         case_type_name: "家事纠纷",
      //         parent_area_name: "八面通镇",
      //         area_name: "太和村",
      //         created_date: "2023-10-14 14:42:26",
      //         mediators_name: "王翠花",
      //         client_remark: "123123123",
      //         files: [
      //           {
      //             id: 198,
      //             file_name: "穆法通_官方微博.jpg",
      //             file_type: "jpg",
      //             file_size: "36173",
      //             url: "images/2023-10-14/TPcIzhi0MuMGLyAp24RXwt05ZUtOnnIRTMOXON2w.jpg",
      //             created_at: "2023-10-14 14:42:26",
      //             case_id: 50,
      //             updated_at: "2023-10-14 14:42:26",
      //             upload_author: "当事人",
      //             web_url:
      //               "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-14/TPcIzhi0MuMGLyAp24RXwt05ZUtOnnIRTMOXON2w.jpg",
      //           },
      //           {
      //             id: 198,
      //             file_name: "穆法通_官方微博.jpg",
      //             file_type: "jpg",
      //             file_size: "36173",
      //             url: "images/2023-10-14/TPcIzhi0MuMGLyAp24RXwt05ZUtOnnIRTMOXON2w.jpg",
      //             created_at: "2023-10-14 14:42:26",
      //             case_id: 50,
      //             updated_at: "2023-10-14 14:42:26",
      //             upload_author: "当事人",
      //             web_url:
      //               "https://img.mp.itc.cn/upload/20170612/72d37f9f668549839d8cdb5d787f7ec3_th.jpg",
      //           },
      //           {
      //             id: 198,
      //             file_name: "穆法通_官方微博.jpg",
      //             file_type: "jpg",
      //             file_size: "36173",
      //             url: "images/2023-10-14/TPcIzhi0MuMGLyAp24RXwt05ZUtOnnIRTMOXON2w.jpg",
      //             created_at: "2023-10-14 14:42:26",
      //             case_id: 50,
      //             updated_at: "2023-10-14 14:42:26",
      //             upload_author: "当事人",
      //             web_url:
      //               "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-14/TPcIzhi0MuMGLyAp24RXwt05ZUtOnnIRTMOXON2w.jpg",
      //           },
      //           {
      //             id: 198,
      //             file_name: "穆法通_官方微博.jpg",
      //             file_type: "jpg",
      //             file_size: "36173",
      //             url: "images/2023-10-14/TPcIzhi0MuMGLyAp24RXwt05ZUtOnnIRTMOXON2w.jpg",
      //             created_at: "2023-10-14 14:42:26",
      //             case_id: 50,
      //             updated_at: "2023-10-14 14:42:26",
      //             upload_author: "当事人",
      //             web_url:
      //               "https://img.mp.itc.cn/upload/20170612/72d37f9f668549839d8cdb5d787f7ec3_th.jpg",
      //           },
      //           {
      //             id: 198,
      //             file_name: "穆法通_官方微博.jpg",
      //             file_type: "jpg",
      //             file_size: "36173",
      //             url: "images/2023-10-14/TPcIzhi0MuMGLyAp24RXwt05ZUtOnnIRTMOXON2w.jpg",
      //             created_at: "2023-10-14 14:42:26",
      //             case_id: 50,
      //             updated_at: "2023-10-14 14:42:26",
      //             upload_author: "当事人",
      //             web_url:
      //               "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-14/TPcIzhi0MuMGLyAp24RXwt05ZUtOnnIRTMOXON2w.jpg",
      //           },
      //         ],
      //       },
      //       {
      //         client_name: "林旭东",
      //         accused_client_name: "徐",
      //         case_type_name: "家事纠纷",
      //         parent_area_name: "八面通镇",
      //         area_name: "太和村",
      //         created_date: "2023-10-14 07:00:08",
      //         mediators_name: "王翠花",
      //         client_remark: "12321312312321",
      //         files: [
      //           {
      //             id: 196,
      //             file_name: "穆法通_官方抖音.jpg",
      //             file_type: "jpg",
      //             file_size: "28588",
      //             url: "images/2023-10-14/L02Gdtn2iyX6gpJPSb93LmOHJUTK6fnLE47SgVTv.jpg",
      //             created_at: "2023-10-14 07:00:07",
      //             case_id: 49,
      //             updated_at: "2023-10-14 07:00:08",
      //             upload_author: "当事人",
      //             web_url:
      //               "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-14/L02Gdtn2iyX6gpJPSb93LmOHJUTK6fnLE47SgVTv.jpg",
      //           },
      //           {
      //             id: 197,
      //             file_name: "穆法通_官方微博.jpg",
      //             file_type: "jpg",
      //             file_size: "36173",
      //             url: "images/2023-10-14/62qwRerIsqkkVzX9Q3szZ9f9DRhfuAA3BAuGGZ0L.jpg",
      //             created_at: "2023-10-14 07:01:25",
      //             case_id: 49,
      //             updated_at: "2023-10-14 07:01:25",
      //             upload_author: "调解员",
      //             web_url:
      //               "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-14/62qwRerIsqkkVzX9Q3szZ9f9DRhfuAA3BAuGGZ0L.jpg",
      //           },
      //         ],
      //       },
      //       {
      //         client_name: "林旭东",
      //         accused_client_name: "徐",
      //         case_type_name: "侵权纠纷",
      //         parent_area_name: "八面通镇",
      //         area_name: "太和村",
      //         created_date: "2023-10-10 06:29:32",
      //         mediators_name: "李狗蛋",
      //         client_remark: "1111111",
      //         files: [
      //           {
      //             id: 178,
      //             file_name: "穆法通_官方微博.jpg",
      //             file_type: "jpg",
      //             file_size: "36173",
      //             url: "images/2023-10-10/wFwDwcQETo4aCXIOdYzuNciPql05YgEm1HCbuH6p.jpg",
      //             created_at: "2023-10-10 06:29:31",
      //             case_id: 43,
      //             updated_at: "2023-10-10 06:29:32",
      //             upload_author: "当事人",
      //             web_url:
      //               "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-10/wFwDwcQETo4aCXIOdYzuNciPql05YgEm1HCbuH6p.jpg",
      //           },
      //           {
      //             id: 179,
      //             file_name: "穆法通_官方抖音.jpg",
      //             file_type: "jpg",
      //             file_size: "28588",
      //             url: "images/2023-10-10/xrXSdRJkKCifpI38VoFlzycddVPICYVRxJwYlMvg.jpg",
      //             created_at: "2023-10-10 06:30:05",
      //             case_id: 43,
      //             updated_at: "2023-10-10 06:30:05",
      //             upload_author: "调解员",
      //             web_url:
      //               "http://app.mdjmlcourt.gov.cn/uploads/images/2023-10-10/xrXSdRJkKCifpI38VoFlzycddVPICYVRxJwYlMvg.jpg",
      //           },
      //         ],
      //       },
      //     ],
      //   };
      if (res.code === 200) {
        formData.value = res.data;
        // 将数组处理成嵌套数组的形式
        getDataSource(res.data[0].files);
      }
      console.log("res", res);
    });
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getInfo();
  //   console.log("modal", props.show, props.infoData.info.area.parent_area.id);
});
</script>
<style lan="scss">
.info-modal {
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  padding: 24px;
  color: #ffffff;
  background: #194574eb;
  border: 1px solid #0196ff;
  border-radius: 8px;
  position: relative;
  .el-carousel__indicators {
    display: none;
    visibility: hidden;
  }
  .form-box .el-carousel__item,
  .form-box .el-carousel__item:nth-child(2n + 1) {
    background: none;
  }
}
</style>
<style lang="scss" scoped>
.empty {
  color: #ffffff;
  margin: 0 auto;
  font-size: 20px;
  margin-top: 20%;
}
.el-carousel {
  width: 100%;
  height: 100px;
}

.el-carousel__indicators {
  display: none;
  visibility: hidden;
}
.el-carousel__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  > div {
    background-color: transparent;
  }
}
.el-carousel__item {
  display: flex;
  flex-direction: row;

  //   padding: 0 20px;
  .el-image {
    margin-right: 10px;
  }
}
:deep(.el-carousel__arrow) {
  visibility: hidden;
  border-radius: 50%;
  background-color: rgb(37 140 255);
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.el-icon--left {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
}
.my-header {
  margin-top: -20px;
  p.el-dialog__title {
    color: #ffffff;
    font-weight: 500;
    font-size: 20px;
    padding: 0;
    margin: 0 auto;
  }
}
.form-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -24px;
  .el-carousel__item {
    background-color: transparent !important;
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    > span,
    p {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      font-size: 16px;
      color: #ffffff;
      padding: 8px 0;
      margin: 0;
      width: calc(100% - 124px);
    }
    span {
      width: 100px;
      justify-content: end;
      margin-right: 24px;
      text-align: right;
    }
  }
  .imgs {
    border: 1px solid #dde7eb;
    height: 100%;
    width: 209px;
    border-radius: 8px;
    overflow: auto;
    position: relative;
    display: flex;
    align-items: center;
    .lunbo {
      height: 152px;
      width: calc(100% - 60px);
      margin: 0 auto;
      .swiper {
        height: 100%;
        .swiper-slide {
          position: relative;
          .yjImg {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
          .similarity {
            position: absolute;
            top: 0;
            right: 0;
            background: linear-gradient(141deg, #ff8782 0%, #e21c15 100%);
            box-shadow: 0px 0px 6px 1px rgba(14, 41, 73, 0.05);
            border-radius: 0px 3px 0px 20px;
            padding: 5px 10px;
            color: #ffffff;
          }
          .opemyjimg {
            width: calc(100% - 10px);
          }
        }
      }
    }

    .swiper-button-next {
      position: absolute;
      left: 4px;
      z-index: 100;
    }
    .swiper-button-prev {
      position: absolute;
      right: 4px;
      z-index: 100;
    }
  }
  .demo-image {
    width: calc(100% - 124px);
  }
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
