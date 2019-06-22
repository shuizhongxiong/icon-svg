<template>
  <div class="operate-wrapper">
    <div class="operate-detail">
      <div class="detail-preview" :class="svgBg">
        <div class="preview-icon" v-html="operateSvg"></div>
        <div class="preview-handle">
          <div class="handle-color white" @click="changeBg('white')"></div>
          <div class="handle-color black" @click="changeBg('black')"></div>
        </div>
      </div>
      <div class="detail-main">
        <div class="main-group">
          <div class="group-title">Icon size</div>
          <div class="group-content">
            <a-slider
              class="content-slider"
              v-model="config.iconSize"
              :tipFormatter="null"
              :min="16"
              :max="100"
              @change="changeNormal('iconSize')"
            ></a-slider>
            <span class="content-txt">{{config.iconSize}}px</span>
          </div>
        </div>
        <div class="main-group">
          <div class="group-title">Stroke width</div>
          <div class="group-content">
            <a-slider
              class="content-slider"
              v-model="config.strokeWidth"
              :tipFormatter="null"
              :min="1"
              :max="4"
              :step="0.5"
              @change="changeNormal('strokeWidth')"
            ></a-slider>
            <span class="content-txt">{{config.strokeWidth}}px</span>
          </div>
        </div>
        <div class="main-group small-margin-bottom">
          <div class="group-title">Stroke color</div>
          <div class="group-content">
            <a-input
              placeholder="请输入颜色"
              size="small"
              v-model="config.strokeColor"
              :disabled="config.strokeColorDefault"
              @change="changeNormal('strokeColor')"
            ></a-input>
            <div class="stroke-color">
              <span
                :style="{backgroundColor: config.strokeColor}"
                :class="{disabled: config.strokeColorDefault}"
              ></span>
            </div>
          </div>
        </div>
        <div class="main-group">
          <div class="group-title"></div>
          <div class="group-content">
            <a-checkbox
              :checked="config.strokeColorDefault"
              @change="changeStrokeColorDefault"
            >使用默认颜色</a-checkbox>
          </div>
        </div>
        <div class="main-group">
          <div class="group-title">Ends</div>
          <div class="group-content">
            <a-button-group>
              <a-button
                v-for="item of endsList"
                :key="item.name"
                :class="{selected: config.ends === item.name}"
                @click="changebtn('ends', item.name)"
              >
                <a-icon :component="item.svg"/>
              </a-button>
            </a-button-group>
          </div>
        </div>
        <div class="main-group">
          <div class="group-title">Joins</div>
          <div class="group-content">
            <a-button-group>
              <a-button
                v-for="item of joinsList"
                :key="item.name"
                :class="{selected: config.joins === item.name}"
                @click="changebtn('joins', item.name)"
              >
                <a-icon :component="item.svg"/>
              </a-button>
            </a-button-group>
          </div>
        </div>
        <div class="main-code">
          <a-tabs type="card">
            <a-tab-pane tab="SVG" key="SVG">{{operateSvg}}</a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <div class="operate-btns">
      <a-button @click="download">
        <a-icon type="download"/>下载文件
      </a-button>
      <a-button v-clipboard:copy="operateSvg" v-clipboard:success="onCopy">
        <template v-if="!copySuccess">
          <a-icon type="copy"/>复制代码
        </template>
        <template v-if="copySuccess">
          <a-icon type="check"/>复制成功
        </template>
      </a-button>
    </div>
  </div>
</template>

<script>
import ButtSvg from '@/assets/icons/butt.svg'
import RoundSvg from '@/assets/icons/round.svg'
import SquareSvg from '@/assets/icons/square.svg'
import BevelSvg from '@/assets/icons/bevel.svg'
import ArcsSvg from '@/assets/icons/arcs.svg'

export default {
  name: 'HomeOperate',
  data () {
    return {
      svgName: '',
      svgBg: 'white',
      operateSvg: '',
      endsList: [
        {
          name: 'butt',
          svg: ButtSvg
        },
        {
          name: 'round',
          svg: RoundSvg
        },
        {
          name: 'square',
          svg: SquareSvg
        }
      ],
      joinsList: [
        {
          name: 'bevel',
          svg: BevelSvg
        },
        {
          name: 'round',
          svg: RoundSvg
        },
        {
          name: 'arcs',
          svg: ArcsSvg
        }
      ],
      config: {
        iconSize: 48,
        strokeWidth: 3,
        strokeColor: '#000000',
        ends: 'square',
        joins: 'arcs',
        strokeColorDefault: false
      },
      copySuccess: false
    }
  },
  props: {
    svg: { name: String, svg: String }
  },
  watch: {
    svg (newVal) {
      if (newVal) {
        this.svgName = newVal.name
        let operateSvg = newVal.svg
        Object.keys(this.config).forEach(d => {
          operateSvg = this.change(d, this.config[d], operateSvg)
        })
        this.operateSvg = operateSvg
      }
    }
  },
  methods: {
    change (type, value, operateSvg) {
      let svg = ''
      switch (type) {
        case 'iconSize':
          svg = operateSvg.replace(
            /width="\d+" height="\d+"/,
            `width="${value}" height="${value}"`
          )
          break
        case 'strokeWidth':
          svg = operateSvg.replace(
            /stroke-width="[\d.]*"/,
            `stroke-width="${value}"`
          )
          break
        case 'strokeColor':
          svg = operateSvg.replace(
            /stroke="[0-9a-zA-Z#]*"/,
            `stroke="${value}"`
          )
          break
        case 'strokeColorDefault':
          svg = operateSvg.replace(
            /stroke="[0-9a-zA-Z#]*"/,
            `stroke="${value ? 'currentColor' : this.config.strokeColor}"`
          )
          break
        case 'ends':
          svg = operateSvg.replace(
            /stroke-linecap="\w+"/,
            `stroke-linecap="${value}"`
          )
          break
        case 'joins':
          svg = operateSvg.replace(
            /stroke-linejoin="\w+"/,
            `stroke-linejoin="${value}"`
          )
          break
        default:
          svg = operateSvg
          break
      }
      return svg
    },
    changeNormal (type) {
      this.operateSvg = this.change(type, this.config[type], this.operateSvg)
    },
    changebtn (type, btnValue) {
      this.config[type] = btnValue
      this.operateSvg = this.change(type, btnValue, this.operateSvg)
    },
    changeStrokeColorDefault () {
      this.config.strokeColorDefault = !this.config.strokeColorDefault
      this.operateSvg = this.change(
        'strokeColorDefault',
        this.config.strokeColorDefault,
        this.operateSvg
      )
    },
    changeBg (bg) {
      if (this.bg === bg) {
        return false
      }
      this.svgBg = bg
    },
    download () {
      const element = document.createElement('a')
      element.setAttribute(
        'href',
        'data:image/svg+xml;charset=utf-8,' +
          encodeURIComponent(this.operateSvg)
      )
      element.setAttribute('download', this.svg.name + '.svg')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      this.loading = false
    },
    onCopy () {
      this.copySuccess = true
      setTimeout(() => {
        this.copySuccess = false
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.operate-wrapper {
  background: #fbfafb;
  .operate-detail {
    overflow-y: auto;
    height: calc(100vh - 57px);
    .detail-preview {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 168px;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px;
      background-size: 21px 21px;
      background-position: -1px -1px;
      &.white {
        background-image: linear-gradient(
            rgba(244, 244, 250, 0.8) 1px,
            transparent 1px
          ),
          linear-gradient(90deg, rgba(244, 244, 250, 0.8) 1px, transparent 0),
          linear-gradient(transparent 1px, #fff 0, #fff 21px, transparent 0);
        .preview-icon {
          border: 1px dashed rgba(0, 0, 0, 0.6);
        }
      }
      &.black {
        background-image: linear-gradient(
            rgba(244, 244, 250, 0.8) 1px,
            transparent 1px
          ),
          linear-gradient(90deg, rgba(244, 244, 250, 0.8) 1px, transparent 0),
          linear-gradient(
            transparent 1px,
            #242424 0,
            #242424 21px,
            transparent 0
          );
        .preview-icon {
          border: 1px dashed rgba(255, 255, 255, 0.6);
        }
      }
      .preview-handle {
        position: absolute;
        top: 12px;
        right: 12px;
        display: flex;
        .handle-color {
          display: flex;
          width: 20px;
          height: 20px;
          margin-left: 6px;
          border-radius: 50%;
          cursor: pointer;
          border: 1px solid rgb(204, 204, 204);
          &.white {
            background: #fff;
          }
          &.black {
            background: #242424;
          }
        }
      }
    }
    .detail-main {
      padding: 24px;
      .main-group {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
        &.small-margin-bottom {
          margin-bottom: 8px;
        }
        .group-title {
          flex-shrink: 0;
          width: 100px;
          font-weight: bold;
        }
        .group-content {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          .selected {
            z-index: 1;
            color: #3a8ee6;
            border-color: #3a8ee6;
            background-color: #ecf5ff;
          }
          .content-slider {
            flex: 1;
            width: 100%;
          }
          .content-txt {
            flex-shrink: 0;
            margin-left: 8px;
            width: 40px;
            text-align: right;
          }
          .stroke-color {
            margin-left: 8px;
            padding: 4px;
            width: 40px;
            height: 28px;
            border: 1px solid rgb(221, 221, 221);
            border-radius: 4px;
            background-color: #fff;
            > span {
              &.disabled {
                opacity: 0.5;
              }
              display: block;
              width: 30px;
              height: 18px;
              border-radius: 2px;
              box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px inset;
            }
          }
        }
      }
      .main-code {
        .ant-tabs-card {
          ::v-deep .ant-tabs-bar {
            margin: 0;
          }
          .ant-tabs-content {
            margin-top: -16px;
            .ant-tabs-tabpane {
              background: #fff;
              padding: 16px;
              border: 1px solid #e8e8e8;
              border-top: 0;
            }
          }
        }
      }
    }
  }
  .operate-btns {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 420px;
    display: flex;
    padding: 12px 24px;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #eeeeee;
    background: #fbfafb;
  }
}
</style>
