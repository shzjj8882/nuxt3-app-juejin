export default defineNuxtRouteMiddleware((from,to)=>{
  const userStore = useUser()
  if(!userStore.isLogin){
    return navigateTo("/login?callback=" + to.path)
  }
})
