<script setup lang="ts">
interface IPost { userId: number, id: number, title: string, body: string }
const posts = ref<IPost[]>([])
onMounted(async () => {
  try {
    const result = await $fetch<IPost[]>('https://jsonplaceholder.typicode.com/posts')
    posts.value = result
  } catch (error) {
    console.log('Fetch', error);
  }
})
</script>

<template>
  <div>
    <h2>Page</h2>

    <UISection />

    <ul class="list">
      <li
        v-for="post of posts"
        :key="`post-number-${post.id}`"
        class="list__post"
      >
        <h4>{{ post.title }}</h4>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: block;
  padding: 0 20px;

  &__post {
    border-bottom: 2px solid rgb(73, 73, 73);
    background-color: beige;
  }
}
</style>