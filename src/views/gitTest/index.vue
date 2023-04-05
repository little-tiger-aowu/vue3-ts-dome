<template>
  <div style="width: 100%;height: 550px;" class="app-container">
    <editor style="width: 100%;height: auto" v-model="myValue" :init="init" :disabled="disabled" :id="tinymceId"></editor>
  </div>
</template>
<script setup>
import tinymce from 'tinymce/tinymce'
// import 'tinymce/skins/content/default/content.css'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'; //引入编辑器图标icon，不引入则不显示对应图标
import 'tinymce/models/dom'
import {ref,onMounted,reactive} from 'vue'

const tinymceId = ref("vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""))
const myValue = ref('hello word')
const init = reactive({
  selector: '#' + tinymceId.value,
  paste_preprocess: function(plugin, args) {
    args.content = args.content.replace(/<[^>]+>/g, function(match) {
      if (match.match(/<(p|\/p|br)[^>]*>/gi)) {
        return match;
      }
      return '<span style="color: red">' + match + '</span>';
    });
  },
  language_url: "/tinymce/langs/zh-Hans.js",
  language: "zh-Hans", //语言
  branding: false,
  plugins: 'lists  table',
  toolbar: 'codesample bold italic underline alignleft aligncenter alignright alignjustify fontsize fontfamily | undo redo | formatselect | fontselect | fontsizeselect | forecolor backcolor | bullist numlist outdent indent | lists link table code | removeformat ',
  font_size_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px', //文字大小
  font_family_formats: 'Arial=arial,helvetica,sans-serif; 宋体=SimSun; 鸿雷拙书简体=aaa; 微软雅黑=Microsoft Yahei; Impact=impact,chicago;', //字体
  skin_url: "/tinymce/skins/ui/oxide",
  content_css: '/tinymce/skins/content/default/content.css',
  // setup:(editor) => {
  //   tinymceId.value = editor;
  //   editor.on('init', (ed) => {
  //     console.log('123');
  //     ed.target.editorCommands.execCommand("fontName", false, "鸿雷拙书简体");
  //   });
  // } // 设置默认字体
})

onMounted(()=>{
  tinymce.init({})
})
</script>
