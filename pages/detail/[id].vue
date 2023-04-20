

<template>
  <div class="p-5">
    <div v-if="error">{{ errorMsg }}</div>
    <div v-else-if="pending">加载中...</div>
    <div v-else>
      <h1 class="text-2xl">{{ data?.title }}</h1>
      <div v-html="data?.content"></div>
      <div class="py-2">
        <NInput v-model:value="value" type="textarea" placeholder="输入评论" />
        <NButton @click="onSubmit">发送</NButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtError } from "nuxt/app";
definePageMeta({
  middleware:['auth']
})
const route = useRoute();
const router = useRouter();
const fetchPost = () => $fetch(`/api/posts/${route.params.id}`);
const { data, pending, error } = await useAsyncData(fetchPost);
const errorMsg = computed(() => (error.value as NuxtError).data.statusMessage);
watchEffect(() => {
  // error 存在，则显示错误页
  if (unref(error)) {
    showError(errorMsg.value as string);
  }
});
const value = useState("comment", () => "");
const store = useUser();
const { isLogin } = storeToRefs(store);
const onSubmit = () => {
  if (isLogin.value) {
    value.value = "";
  } else {
    router.push("/login?callback=" + route.path);
  }
};
</script>
