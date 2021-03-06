
 function getTitle (vm) {
   const { title } = vm.$options
   if (title) {
     return typeof title === 'function'
     ? title.call(vm)
     : title
   }
 }

 const serverTitleMixin = {
   created () {
     const title = getTitle(this)
     if (title) {
       this.$ssrContext.title = `Vue HN | ${title}`
     }
   }
 }

 const clientTitleMixin = {
   mounted () {
     const title = getTitle(this)
     if (title) {
       document.title = `Vue HN | ${title}`
     }
   }
 }

 export const titleMixin = process.env.VUE_ENV === 'server'
 ? serverTitleMixin
 : clientTitleMixin

 export const HTTPStatusMixin = {
   created () {
     if (this.$ssrContext && this.$options.HTTPStatus) {
       this.$ssrContext.HTTPStatus = this.$options.HTTPStatus
     }
   }
 }
