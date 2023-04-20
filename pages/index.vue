<template>
  <div class="flex items-center flex-col gap-2 py-4">
    <!-- 处理请求错误 -->
    <div v-if="error" class="text-red-300">{{ error.message }}</div>
    <!-- 处理加载状态 -->
    <div v-if="pending">加载中...</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id">
        <NuxtLink class="text-lg" :to="`/detail/${post.id}`">{{
          post.title
        }}</NuxtLink>
        <p class="text-slate-500">发布于: {{ post.date }}</p>
      </div>
    </div>
  </div>
  <div>
    <NButton @click="prev">prev</NButton>
    <NButton @click="next">next</NButton>
  </div>
</template>

<script setup lang="ts">
const page = ref(1);
const {
  data: posts,
  pending,
  error,
  refresh, // 获取刷新函数
} = await useFetch(() => `/api/posts?page=${page.value}&size=2`);

const prev = () => {
  page.value--;
  refresh();
}

const next = () => {
  page.value++;
  refresh();
};
</script>
