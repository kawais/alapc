<template>
  <div class="admin-diy-admin">
    <div class="admin-pages-list" v-loading="!diyThemes">
      <theme-item @deleteTheme="deleteTheme" @makeTheme="makeTheme" @setDefault="setDefault" v-for="(theme,index) in diyThemes" :defautTheme="defaultTheme" :theme="theme" :key="index"></theme-item>
    </div>
    <delete-theme ref="zkRootDelete" @afterDelete="init"></delete-theme>
    <make-theme ref="zkRootMake" @afterMake="afterMake"></make-theme>
    <set-Default ref="zkRootSetDefault" @afterSetDefault="init"></set-Default>
  </div>
</template>

<script>
  import themeItem from './style/item'
  import deleteTheme from './style/delete'
  import makeTheme from './style/make'
  import setDefault from './style/set'
  import diyHttp from '@/service/core/diy.http'
  import service from './style/service'
  import './var.scss'
  export default {
    components: {
      themeItem,
      deleteTheme,
      setDefault,
      makeTheme
    },
    data () {
      return {
        defaultTheme: null,
        diyThemes: null // 远程模板
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var response = await this.$api.httpGet('/api/theme/getDefaultTheme', this.widget.value)
        if (response.status === 1) {
          this.defaultTheme = response.result
        }
        var para = {
          ...this.widget.value
        }
        response = await diyHttp.post('/api/DiyClient/GetAdminTheme', para)
        if (response.status === 1) {
          this.diyThemes = response.result.result
        } else {
          this.$api.alert(response.message)
        }
      },
      async makeTheme (theme) {
        this.$refs.zkRootMake.init(theme)
      },
      async deleteTheme (theme) {
        this.$refs.zkRootDelete.init(theme)
      },
      async setDefault (theme) {
        await this.$refs.zkRootSetDefault.init(theme, this.defaultTheme)
      },
      async afterMake (theme) {
        this.init()
        service.diy(this, theme)
      }
    }
  }
</script>
