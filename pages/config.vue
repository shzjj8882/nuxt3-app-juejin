<template>
  <div :class="{ dark: appConfig.theme.dark }">
    <!-- ... -->
    <!-- 客户端只能访问public里面的key -->
    <p
      class="bg-blue-300 dark:bg-slate-600 dark:text-slate-200"
      @click="appConfig.title = 'hello'"
    >
      runtimeConfig.public.apiBase: {{ runtimeConfig.public.apiBase }}
    </p>
    <!-- ... -->
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig()
console.log('Runtime config:', runtimeConfig)
// 只在服务端才能输出
if (process.server) {
  console.log('API secret:', runtimeConfig.apiSecret)
}
</script>
